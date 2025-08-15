import { type Express, type RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Simple email-based authentication system
export function setupSimpleAuth(app: Express) {
  // Session configuration
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: sessionTtl,
    },
  }));

  // Login route
  app.post('/api/simple-login', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: "Valid email required" });
      }

      // Auto-create user if doesn't exist
      let user = await storage.getUserByEmail?.(email);
      
      if (!user) {
        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          email: email,
          firstName: email.split('@')[0],
          lastName: '',
          role: email === 'spguide4you@gmail.com' ? 'admin' : 'user', // Make your email admin
          profileImageUrl: null
        };
        
        user = await storage.upsertUser(newUser);
      }

      // Create session
      (req as any).session.userId = user.id;
      (req as any).session.user = user;
      
      res.json({ success: true, user });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Logout route
  app.post('/api/simple-logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  // Get current user
  app.get('/api/auth/user', async (req, res) => {
    try {
      const session = req.session as any;
      
      if (!session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await storage.getUser(session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error('Auth check error:', error);
      res.status(500).json({ message: "Auth check failed" });
    }
  });
}

// Simple auth middleware
export const isAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const session = req.session as any;
    
    if (!session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await storage.getUser(session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: "Authentication failed" });
  }
};