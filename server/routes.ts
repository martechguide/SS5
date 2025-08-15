import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { setupSimpleAuth, isAuthenticated as simpleAuth } from "./simpleAuth";
import path from "path";
import fs from "fs";
import { z } from "zod";
import { extractFileMetadata, generateThumbnailUrl } from "./fileMetadata";
import { 
  insertBatchSchema, 
  insertCourseSchema,
  insertSubjectSchema, 
  insertVideoSchema,
  insertWhitelistedEmailSchema,
  insertUserProgressSchema,
  insertMultiPlatformVideoSchema,
  signupSchema,
  loginSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple Auth middleware (temporary for immediate use)
  setupSimpleAuth(app);
  
  // Replit Auth middleware (for production)
  // await setupAuth(app);

  // PHP Preview routes - serve static HTML files
  app.get('/php-preview.php', (req, res) => {
    const phpFile = path.join(process.cwd(), 'php-preview.php');
    if (fs.existsSync(phpFile)) {
      res.setHeader('Content-Type', 'text/html');
      res.sendFile(phpFile);
    } else {
      res.status(404).send('PHP Preview file not found');
    }
  });

  // Admin panel preview
  app.get('/admin-preview.php', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Learn Here Free</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #1e293b; }
        .user-info { display: flex; align-items: center; gap: 1rem; }
        .main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .stat-value { font-size: 2rem; font-weight: bold; color: #1e293b; }
        .stat-label { color: #64748b; margin-top: 0.5rem; }
        .section { background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; }
        .section-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }
        .nav-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; }
        .nav-tab { padding: 0.75rem 1.5rem; border: none; background: none; cursor: pointer; color: #64748b; border-bottom: 2px solid transparent; }
        .nav-tab.active { color: #3b82f6; border-bottom-color: #3b82f6; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
        .table th { background-color: #f8fafc; font-weight: 600; }
        .badge { padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 500; }
        .badge-success { background-color: #dcfce7; color: #166534; }
        .badge-warning { background-color: #fef3c7; color: #92400e; }
        .btn { padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer; font-size: 0.875rem; }
        .btn-primary { background-color: #3b82f6; color: white; }
        .btn-danger { background-color: #ef4444; color: white; }
        .preview-banner { background: #fef3c7; border: 1px solid #d97706; color: #92400e; padding: 0.75rem 1rem; text-align: center; font-size: 0.875rem; font-weight: 500; }
    </style>
</head>
<body>
    <div class="preview-banner">🔧 Admin Panel Preview - Full PHP Admin Dashboard</div>
    
    <header class="header">
        <div class="header-content">
            <div class="logo">Learn Here Free - Admin</div>
            <div class="user-info">
                <span>SPGuide 4you (Admin)</span>
                <button class="btn btn-danger">Logout</button>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">127</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">94</div>
                <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">4</div>
                <div class="stat-label">Total Batches</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">156</div>
                <div class="stat-label">Total Videos</div>
            </div>
        </div>

        <div class="nav-tabs">
            <button class="nav-tab active">Dashboard</button>
            <button class="nav-tab">Users</button>
            <button class="nav-tab">Batches</button>
            <button class="nav-tab">Videos</button>
            <button class="nav-tab">Analytics</button>
            <button class="nav-tab">Monetization</button>
        </div>

        <div class="section">
            <h3 class="section-title">Recent Users</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SPGuide 4you</td>
                        <td>spguide4you@gmail.com</td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td>2025-08-12</td>
                        <td>
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Test User</td>
                        <td>test@example.com</td>
                        <td><span class="badge badge-warning">Pending</span></td>
                        <td>2025-08-11</td>
                        <td>
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</body>
</html>
    `);
  });

  // Files and Batch management preview
  app.get('/files-preview.php', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Files Management - Learn Here Free</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #1e293b; }
        .breadcrumb { display: flex; align-items: center; gap: 0.5rem; color: #64748b; }
        .main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .toolbar { background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .btn { padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer; font-size: 0.875rem; }
        .btn-primary { background-color: #3b82f6; color: white; }
        .btn-success { background-color: #10b981; color: white; }
        .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
        .file-item { background: white; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; cursor: pointer; transition: transform 0.2s; }
        .file-item:hover { transform: translateY(-2px); }
        .file-icon { font-size: 3rem; margin-bottom: 0.5rem; }
        .file-name { font-weight: 500; margin-bottom: 0.25rem; }
        .file-meta { font-size: 0.75rem; color: #64748b; }
        .preview-banner { background: #fef3c7; border: 1px solid #d97706; color: #92400e; padding: 0.75rem 1rem; text-align: center; font-size: 0.875rem; font-weight: 500; }
    </style>
</head>
<body>
    <div class="preview-banner">📁 Files Management Preview - Upload and organize your educational content</div>
    
    <header class="header">
        <div class="header-content">
            <div class="logo">Learn Here Free - Files</div>
            <div class="breadcrumb">
                <a href="/php-preview.php">Home</a> → <span>Files</span>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="toolbar">
            <button class="btn btn-primary">Upload Files</button>
            <button class="btn btn-success">New Folder</button>
        </div>

        <div class="file-grid">
            <div class="file-item">
                <div class="file-icon">📁</div>
                <div class="file-name">Medical Lectures</div>
                <div class="file-meta">4 videos • 2.3 GB</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📁</div>
                <div class="file-name">Web Development</div>
                <div class="file-meta">12 videos • 5.7 GB</div>
            </div>
            <div class="file-item">
                <div class="file-icon">🎥</div>
                <div class="file-name">intro-video.mp4</div>
                <div class="file-meta">156 MB • MP4</div>
            </div>
            <div class="file-item">
                <div class="file-icon">📄</div>
                <div class="file-name">course-notes.pdf</div>
                <div class="file-meta">2.4 MB • PDF</div>
            </div>
        </div>
    </main>
</body>
</html>
    `);
  });

  // Password-based authentication routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const validationResult = signupSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: validationResult.error.errors 
        });
      }

      const { email, firstName, lastName, password } = validationResult.data;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Create new user
      const newUser = await storage.createUser({
        email,
        firstName,
        lastName,
        password
      });

      // Create session
      (req as any).session.userId = newUser.id;
      (req as any).session.user = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      };

      res.status(201).json({ 
        message: "Account created successfully", 
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: "Account creation failed" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: validationResult.error.errors 
        });
      }

      const { email, password } = validationResult.data;

      // Authenticate user
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Create session
      (req as any).session.userId = user.id;
      (req as any).session.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };

      res.json({ 
        message: "Login successful", 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Both GET and POST for logout compatibility
  app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.redirect('/?error=logout_failed');
      }
      res.redirect('/');
    });
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Password reset route for existing users without passwords
  app.post('/api/auth/set-password', async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      
      if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password required" });
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Hash new password
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await storage.upsertUser({
        ...user,
        password: hashedPassword
      });

      res.json({ message: "Password set successfully. You can now login." });
    } catch (error) {
      console.error('Set password error:', error);
      res.status(500).json({ message: "Failed to set password" });
    }
  });

  // Auth routes (handled by simpleAuth now)
  
  // Simple login page route
  app.get('/simple-login', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Learn Here Free</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-container { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .logo { text-align: center; margin-bottom: 2rem; }
        .logo h1 { color: #4f46e5; font-size: 1.75rem; font-weight: bold; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #374151; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-size: 1rem; transition: border-color 0.2s; }
        .form-group input:focus { outline: none; border-color: #4f46e5; }
        .login-btn { width: 100%; background: #4f46e5; color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; font-size: 1rem; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .login-btn:hover { background: #4338ca; }
        .login-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        .message { margin-top: 1rem; padding: 0.75rem; border-radius: 0.5rem; text-align: center; }
        .message.success { background: #dcfce7; color: #166534; }
        .message.error { background: #fef2f2; color: #dc2626; }
        .admin-note { background: #fef3c7; color: #92400e; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1rem; font-size: 0.875rem; text-align: center; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <h1>Learn Here Free</h1>
            <p>Educational Video Platform</p>
        </div>
        
        <div class="admin-note">
            Use <strong>spguide4you@gmail.com</strong> for admin access
        </div>
        
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required placeholder="Enter your email">
            </div>
            
            <button type="submit" class="login-btn" id="loginBtn">
                Login / Sign Up
            </button>
        </form>
        
        <div id="message" class="message" style="display: none;"></div>
    </div>

    <script>
        const form = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const loginBtn = document.getElementById('loginBtn');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (!email) return;

            loginBtn.disabled = true;
            loginBtn.textContent = 'Logging in...';
            messageDiv.style.display = 'none';

            try {
                const response = await fetch('/api/simple-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.className = 'message success';
                    messageDiv.textContent = 'Login successful! Redirecting...';
                    messageDiv.style.display = 'block';
                    
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = error.message || 'Login failed. Please try again.';
                messageDiv.style.display = 'block';
            } finally {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login / Sign Up';
            }
        });
    </script>
</body>
</html>
    `);
  });

  // Admin-only user management routes
  app.get('/api/admin/users', simpleAuth, async (req: any, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch('/api/admin/users/:id/status', simpleAuth, async (req: any, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['active', 'blocked', 'pending'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const updatedUser = await storage.updateUserStatus(id, status);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  app.delete('/api/admin/users/:id', simpleAuth, async (req: any, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const { id } = req.params;
      await storage.deleteUser(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });



  // Batch routes
  app.get("/api/batches/:batchId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { batchId } = req.params;
      const batch = await storage.getBatch(batchId);
      
      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
      
      res.json(batch);
    } catch (error) {
      console.error("Error fetching batch:", error);
      res.status(500).json({ message: "Failed to fetch batch" });
    }
  });

  app.get("/api/batches", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const batches = await storage.getBatches();
      res.json(batches);
    } catch (error) {
      console.error("Error fetching batches:", error);
      res.status(500).json({ message: "Failed to fetch batches" });
    }
  });

  app.post("/api/batches", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const batchData = insertBatchSchema.parse(req.body);
      const batch = await storage.createBatch(batchData);
      res.json(batch);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid batch data", errors: error.errors });
      }
      console.error("Error creating batch:", error);
      res.status(500).json({ message: "Failed to create batch" });
    }
  });

  app.patch("/api/batches/:batchId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { batchId } = req.params;
      const batchData = insertBatchSchema.partial().parse(req.body);
      const batch = await storage.updateBatch(batchId, batchData);
      res.json(batch);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid batch data", errors: error.errors });
      }
      console.error("Error updating batch:", error);
      res.status(500).json({ message: "Failed to update batch" });
    }
  });

  app.delete("/api/batches/:batchId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { batchId } = req.params;
      await storage.deleteBatch(batchId);
      res.json({ message: "Batch deleted successfully" });
    } catch (error) {
      console.error("Error deleting batch:", error);
      res.status(500).json({ message: "Failed to delete batch" });
    }
  });

  // Course routes  
  app.get("/api/batches/:batchId/courses", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { batchId } = req.params;
      const courses = await storage.getCoursesByBatch(batchId);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.post("/api/batches/:batchId/courses", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { batchId } = req.params;
      const courseData = insertCourseSchema.parse({
        ...req.body,
        batchId
      });
      const course = await storage.createCourse(courseData);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid course data", errors: error.errors });
      }
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  app.patch("/api/courses/:courseId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { courseId } = req.params;
      const courseData = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(courseId, courseData);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid course data", errors: error.errors });
      }
      console.error("Error updating course:", error);
      res.status(500).json({ message: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:courseId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { courseId } = req.params;
      await storage.deleteCourse(courseId);
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ message: "Failed to delete course" });
    }
  });

  app.get("/api/courses/:courseId/subjects", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { courseId } = req.params;
      const subjects = await storage.getSubjectsByCourse(courseId);
      res.json(subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  app.post("/api/courses/:courseId/subjects", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      const { courseId } = req.params;
      // Get course to ensure batchId is available
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      const subjectData = insertSubjectSchema.parse({
        ...req.body,
        batchId: course.batchId,
        courseId
      });
      const subject = await storage.createSubject(subjectData);
      res.json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      }
      console.error("Error creating subject:", error);
      res.status(500).json({ message: "Failed to create subject" });
    }
  });

  // Subject routes
  app.get("/api/subjects/:subjectId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { subjectId } = req.params;
      const subject = await storage.getSubject(subjectId);
      
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      res.json(subject);
    } catch (error) {
      console.error("Error fetching subject:", error);
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  app.get("/api/batches/:batchId/subjects", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { batchId } = req.params;
      const subjects = await storage.getSubjectsByBatch(batchId);
      res.json(subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  app.post("/api/batches/:batchId/subjects", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { batchId } = req.params;
      const subjectData = insertSubjectSchema.parse({
        ...req.body,
        batchId
      });
      const subject = await storage.createSubject(subjectData);
      res.json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      }
      console.error("Error creating subject:", error);
      res.status(500).json({ message: "Failed to create subject" });
    }
  });

  // Subject update and delete routes
  app.patch("/api/subjects/:subjectId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { subjectId } = req.params;
      const subjectData = insertSubjectSchema.partial().parse(req.body);
      const subject = await storage.updateSubject(subjectId, subjectData);
      res.json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      }
      console.error("Error updating subject:", error);
      res.status(500).json({ message: "Failed to update subject" });
    }
  });

  app.delete("/api/subjects/:subjectId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { subjectId } = req.params;
      await storage.deleteSubject(subjectId);
      res.json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.error("Error deleting subject:", error);
      res.status(500).json({ message: "Failed to delete subject" });
    }
  });

  // Video routes
  app.get("/api/videos/:videoId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { videoId } = req.params;
      const video = await storage.getVideo(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      
      res.json(video);
    } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });

  app.get("/api/subjects/:subjectId/videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { subjectId } = req.params;
      const videos = await storage.getVideosBySubject(subjectId);
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  app.post("/api/subjects/:subjectId/videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { subjectId } = req.params;
      const videoData = insertVideoSchema.parse({
        ...req.body,
        subjectId
      });
      const video = await storage.createVideo(videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  // Route for creating videos directly at batch level (when no subject is selected)
  app.post("/api/batches/:batchId/videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { batchId } = req.params;
      const videoData = insertVideoSchema.parse({
        ...req.body,
        batchId,
        subjectId: null // Allow videos without subjects when created at batch level
      });
      const video = await storage.createVideo(videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Failed to create video" });
    }
  });

  // Video update and delete routes
  app.patch("/api/videos/:videoId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { videoId } = req.params;
      const videoData = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(videoId, videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      console.error("Error updating video:", error);
      res.status(500).json({ message: "Failed to update video" });
    }
  });

  app.delete("/api/videos/:videoId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const { videoId } = req.params;
      await storage.deleteVideo(videoId);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });

  // Multi-platform video routes
  app.get("/api/multi-platform-videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const videos = await storage.getAllMultiPlatformVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching multi-platform videos:", error);
      res.status(500).json({ message: "Failed to fetch multi-platform videos" });
    }
  });

  app.post("/api/multi-platform-videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const videoData = insertMultiPlatformVideoSchema.parse(req.body);
      const video = await storage.createMultiPlatformVideo(videoData);
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      console.error("Error creating multi-platform video:", error);
      res.status(500).json({ message: "Failed to create multi-platform video" });
    }
  });

  app.get("/api/subjects/:subjectId/multi-platform-videos", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { subjectId } = req.params;
      const videos = await storage.getMultiPlatformVideosBySubject(subjectId);
      res.json(videos);
    } catch (error) {
      console.error("Error fetching multi-platform videos:", error);
      res.status(500).json({ message: "Failed to fetch multi-platform videos" });
    }
  });

  app.get("/api/multi-platform-videos/:videoId", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Access denied" });
      // }

      const { videoId } = req.params;
      const video = await storage.getMultiPlatformVideo(videoId);
      
      if (!video) {
        return res.status(404).json({ message: "Multi-platform video not found" });
      }
      
      res.json(video);
    } catch (error) {
      console.error("Error fetching multi-platform video:", error);
      res.status(500).json({ message: "Failed to fetch multi-platform video" });
    }
  });

  // Admin routes for email whitelist management
  app.get("/api/admin/whitelist", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const whitelistedEmails = await storage.getWhitelistedEmails();
      res.json(whitelistedEmails);
    } catch (error) {
      console.error("Error fetching whitelist:", error);
      res.status(500).json({ message: "Failed to fetch whitelist" });
    }
  });

  app.post("/api/admin/whitelist", simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      
      // Temporarily allow all authenticated users for demo
      // if (!user || !(await storage.isEmailWhitelisted(user.email!))) {
      //   return res.status(403).json({ message: "Admin access required" });
      // }

      const emailData = insertWhitelistedEmailSchema.parse(req.body);
      const whitelistedEmail = await storage.addWhitelistedEmail(emailData);
      res.json(whitelistedEmail);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email data", errors: error.errors });
      }
      console.error("Error adding email to whitelist:", error);
      res.status(500).json({ message: "Failed to add email to whitelist" });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}