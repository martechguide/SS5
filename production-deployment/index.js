var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  batches: () => batches,
  batchesRelations: () => batchesRelations,
  courses: () => courses,
  coursesRelations: () => coursesRelations,
  insertBatchSchema: () => insertBatchSchema,
  insertCourseSchema: () => insertCourseSchema,
  insertMultiPlatformVideoSchema: () => insertMultiPlatformVideoSchema,
  insertSubjectSchema: () => insertSubjectSchema,
  insertUserProgressSchema: () => insertUserProgressSchema,
  insertVideoSchema: () => insertVideoSchema,
  insertWhitelistedEmailSchema: () => insertWhitelistedEmailSchema,
  loginSchema: () => loginSchema,
  multiPlatformVideos: () => multiPlatformVideos,
  multiPlatformVideosRelations: () => multiPlatformVideosRelations,
  sessions: () => sessions,
  signupSchema: () => signupSchema,
  subjects: () => subjects,
  subjectsRelations: () => subjectsRelations,
  userProgress: () => userProgress,
  userProgressRelations: () => userProgressRelations,
  users: () => users,
  videos: () => videos,
  videosRelations: () => videosRelations,
  whitelistedEmails: () => whitelistedEmails
});
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  password: varchar("password"),
  // for local authentication
  role: varchar("role").default("user"),
  // user, admin
  status: varchar("status").default("active"),
  // active, pending, blocked
  isEmailVerified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var whitelistedEmails = pgTable("whitelisted_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow()
});
var batches = pgTable("batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var subjects = pgTable("subjects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon").default("fas fa-book"),
  color: varchar("color").default("blue"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subjectId: varchar("subject_id").references(() => subjects.id, { onDelete: "cascade" }),
  // nullable - videos can exist at batch level
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }),
  // nullable - videos can exist at batch level
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  youtubeVideoId: varchar("youtube_video_id").notNull(),
  duration: integer("duration_seconds"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var multiPlatformVideos = pgTable("multi_platform_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subjectId: varchar("subject_id").references(() => subjects.id, { onDelete: "cascade" }),
  // nullable - videos can exist at batch level
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }),
  // nullable - videos can exist at batch level
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  platform: varchar("platform", { length: 50 }).notNull(),
  // vimeo, facebook, dailymotion, twitch, peertube, rumble
  videoUrl: varchar("video_url").notNull(),
  // original URL
  videoId: varchar("video_id").notNull(),
  // extracted video ID for embedding
  thumbnail: varchar("thumbnail"),
  // thumbnail URL
  duration: integer("duration_seconds"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  videoId: varchar("video_id").notNull().references(() => videos.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  watchTimeSeconds: integer("watch_time_seconds").default(0),
  lastWatchedAt: timestamp("last_watched_at").defaultNow()
});
var batchesRelations = relations(batches, ({ many }) => ({
  courses: many(courses),
  subjects: many(subjects)
}));
var coursesRelations = relations(courses, ({ one, many }) => ({
  batch: one(batches, {
    fields: [courses.batchId],
    references: [batches.id]
  }),
  subjects: many(subjects)
}));
var subjectsRelations = relations(subjects, ({ one, many }) => ({
  batch: one(batches, {
    fields: [subjects.batchId],
    references: [batches.id]
  }),
  course: one(courses, {
    fields: [subjects.courseId],
    references: [courses.id]
  }),
  videos: many(videos),
  multiPlatformVideos: many(multiPlatformVideos)
}));
var videosRelations = relations(videos, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [videos.subjectId],
    references: [subjects.id]
  }),
  userProgress: many(userProgress)
}));
var multiPlatformVideosRelations = relations(multiPlatformVideos, ({ one }) => ({
  subject: one(subjects, {
    fields: [multiPlatformVideos.subjectId],
    references: [subjects.id]
  })
}));
var userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id]
  }),
  video: one(videos, {
    fields: [userProgress.videoId],
    references: [videos.id]
  })
}));
var insertBatchSchema = createInsertSchema(batches).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertMultiPlatformVideoSchema = createInsertSchema(multiPlatformVideos).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertWhitelistedEmailSchema = createInsertSchema(whitelistedEmails).omit({
  id: true,
  createdAt: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true
});
var signupSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true
});
var loginSchema = createInsertSchema(users).pick({
  email: true,
  password: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, isNull, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.email,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }
  async updateUserStatus(id, status) {
    const [user] = await db.update(users).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return user;
  }
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id));
  }
  // Authentication operations
  async createUser(userData) {
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user] = await db.insert(users).values({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
      role: "user",
      status: "active",
      isEmailVerified: false
    }).returning();
    return user;
  }
  async authenticateUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) {
      return null;
    }
    const bcrypt = await import("bcrypt");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    if (user.status !== "active") {
      return null;
    }
    return user;
  }
  // Email whitelist operations
  async isEmailWhitelisted(email) {
    const [result] = await db.select().from(whitelistedEmails).where(eq(whitelistedEmails.email, email));
    return !!result;
  }
  async getWhitelistedEmails() {
    return await db.select().from(whitelistedEmails);
  }
  async addWhitelistedEmail(emailData) {
    const [email] = await db.insert(whitelistedEmails).values(emailData).returning();
    return email;
  }
  async removeWhitelistedEmail(email) {
    await db.delete(whitelistedEmails).where(eq(whitelistedEmails.email, email));
  }
  // Batch operations
  async getBatches() {
    return await db.select().from(batches).where(eq(batches.isActive, true));
  }
  async getBatch(id) {
    const [batch] = await db.select().from(batches).where(eq(batches.id, id));
    return batch;
  }
  async createBatch(batchData) {
    const [batch] = await db.insert(batches).values(batchData).returning();
    return batch;
  }
  async updateBatch(id, batchData) {
    const [batch] = await db.update(batches).set({ ...batchData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(batches.id, id)).returning();
    return batch;
  }
  async deleteBatch(id) {
    await db.update(batches).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(batches.id, id));
  }
  // Course operations
  async getCoursesByBatch(batchId) {
    return await db.select().from(courses).where(eq(courses.batchId, batchId)).orderBy(courses.orderIndex);
  }
  async getCourse(id) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }
  async createCourse(courseData) {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }
  async updateCourse(id, courseData) {
    const [course] = await db.update(courses).set({ ...courseData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(courses.id, id)).returning();
    return course;
  }
  async deleteCourse(id) {
    await db.update(courses).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(courses.id, id));
  }
  // Subject operations
  async getSubjectsByCourse(courseId) {
    const subjectsWithCount = await db.select({
      id: subjects.id,
      name: subjects.name,
      description: subjects.description,
      batchId: subjects.batchId,
      courseId: subjects.courseId,
      orderIndex: subjects.orderIndex,
      icon: subjects.icon,
      color: subjects.color,
      createdAt: subjects.createdAt,
      updatedAt: subjects.updatedAt,
      videoCount: sql2`COALESCE(COUNT(${videos.id}), 0)`.as("videoCount")
    }).from(subjects).leftJoin(videos, and(eq(videos.subjectId, subjects.id), eq(videos.isActive, true))).where(eq(subjects.courseId, courseId)).groupBy(subjects.id).orderBy(subjects.orderIndex);
    return subjectsWithCount;
  }
  async getSubjectsByBatch(batchId) {
    const subjectsWithCount = await db.select({
      id: subjects.id,
      name: subjects.name,
      description: subjects.description,
      batchId: subjects.batchId,
      courseId: subjects.courseId,
      orderIndex: subjects.orderIndex,
      icon: subjects.icon,
      color: subjects.color,
      createdAt: subjects.createdAt,
      updatedAt: subjects.updatedAt,
      videoCount: sql2`COALESCE(COUNT(${videos.id}), 0)`.as("videoCount")
    }).from(subjects).leftJoin(videos, and(eq(videos.subjectId, subjects.id), eq(videos.isActive, true))).where(and(eq(subjects.batchId, batchId), isNull(subjects.courseId))).groupBy(subjects.id).orderBy(subjects.orderIndex);
    return subjectsWithCount;
  }
  async getSubject(id) {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject;
  }
  async createSubject(subjectData) {
    const [subject] = await db.insert(subjects).values(subjectData).returning();
    return subject;
  }
  async updateSubject(id, subjectData) {
    const [subject] = await db.update(subjects).set({ ...subjectData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(subjects.id, id)).returning();
    return subject;
  }
  async deleteSubject(id) {
    await db.delete(subjects).where(eq(subjects.id, id));
  }
  // Video operations
  async getVideosBySubject(subjectId) {
    return await db.select().from(videos).where(and(eq(videos.subjectId, subjectId), eq(videos.isActive, true))).orderBy(videos.orderIndex);
  }
  async getVideo(id) {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video;
  }
  async createVideo(videoData) {
    const [video] = await db.insert(videos).values(videoData).returning();
    return video;
  }
  async updateVideo(id, videoData) {
    const [video] = await db.update(videos).set({ ...videoData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(videos.id, id)).returning();
    return video;
  }
  async deleteVideo(id) {
    await db.update(videos).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(videos.id, id));
  }
  // Multi-platform video operations
  async getAllMultiPlatformVideos() {
    return await db.select().from(multiPlatformVideos).where(eq(multiPlatformVideos.isActive, true)).orderBy(multiPlatformVideos.createdAt);
  }
  async getMultiPlatformVideosBySubject(subjectId) {
    return await db.select().from(multiPlatformVideos).where(and(eq(multiPlatformVideos.subjectId, subjectId), eq(multiPlatformVideos.isActive, true))).orderBy(multiPlatformVideos.orderIndex);
  }
  async getMultiPlatformVideo(id) {
    const [video] = await db.select().from(multiPlatformVideos).where(eq(multiPlatformVideos.id, id));
    return video;
  }
  async createMultiPlatformVideo(videoData) {
    const [video] = await db.insert(multiPlatformVideos).values(videoData).returning();
    return video;
  }
  async updateMultiPlatformVideo(id, videoData) {
    const [video] = await db.update(multiPlatformVideos).set({ ...videoData, updatedAt: /* @__PURE__ */ new Date() }).where(eq(multiPlatformVideos.id, id)).returning();
    return video;
  }
  async deleteMultiPlatformVideo(id) {
    await db.update(multiPlatformVideos).set({ isActive: false, updatedAt: /* @__PURE__ */ new Date() }).where(eq(multiPlatformVideos.id, id));
  }
  // User progress operations
  async getUserProgress(userId, videoId) {
    const [progress] = await db.select().from(userProgress).where(and(eq(userProgress.userId, userId), eq(userProgress.videoId, videoId)));
    return progress;
  }
  async updateUserProgress(progressData) {
    const [progress] = await db.insert(userProgress).values(progressData).onConflictDoUpdate({
      target: [userProgress.userId, userProgress.videoId],
      set: {
        ...progressData,
        lastWatchedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return progress;
  }
  async getUserProgressBySubject(userId, subjectId) {
    const result = await db.select({
      id: userProgress.id,
      userId: userProgress.userId,
      videoId: userProgress.videoId,
      completed: userProgress.completed,
      watchTimeSeconds: userProgress.watchTimeSeconds,
      lastWatchedAt: userProgress.lastWatchedAt
    }).from(userProgress).innerJoin(videos, eq(userProgress.videoId, videos.id)).where(and(eq(userProgress.userId, userId), eq(videos.subjectId, subjectId)));
    return result;
  }
};
var storage = new DatabaseStorage();

// server/simpleAuth.ts
import session from "express-session";
import connectPg from "connect-pg-simple";
function setupSimpleAuth(app2) {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  app2.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      // Set to true in production with HTTPS
      maxAge: sessionTtl
    }
  }));
  app2.post("/api/simple-login", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ message: "Valid email required" });
      }
      let user = await storage.getUserByEmail?.(email);
      if (!user) {
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          firstName: email.split("@")[0],
          lastName: "",
          role: email === "spguide4you@gmail.com" ? "admin" : "user",
          // Make your email admin
          profileImageUrl: null
        };
        user = await storage.upsertUser(newUser);
      }
      req.session.userId = user.id;
      req.session.user = user;
      res.json({ success: true, user });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.post("/api/simple-logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true });
    });
  });
  app2.get("/api/auth/user", async (req, res) => {
    try {
      const session2 = req.session;
      if (!session2.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await storage.getUser(session2.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ message: "Auth check failed" });
    }
  });
}
var isAuthenticated = async (req, res, next) => {
  try {
    const session2 = req.session;
    if (!session2.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await storage.getUser(session2.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// server/routes.ts
import path from "path";
import fs from "fs";
import { z } from "zod";
async function registerRoutes(app2) {
  setupSimpleAuth(app2);
  app2.get("/php-preview.php", (req, res) => {
    const phpFile = path.join(process.cwd(), "php-preview.php");
    if (fs.existsSync(phpFile)) {
      res.setHeader("Content-Type", "text/html");
      res.sendFile(phpFile);
    } else {
      res.status(404).send("PHP Preview file not found");
    }
  });
  app2.get("/admin-preview.php", (req, res) => {
    res.setHeader("Content-Type", "text/html");
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
    <div class="preview-banner">\u{1F527} Admin Panel Preview - Full PHP Admin Dashboard</div>
    
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
  app2.get("/files-preview.php", (req, res) => {
    res.setHeader("Content-Type", "text/html");
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
    <div class="preview-banner">\u{1F4C1} Files Management Preview - Upload and organize your educational content</div>
    
    <header class="header">
        <div class="header-content">
            <div class="logo">Learn Here Free - Files</div>
            <div class="breadcrumb">
                <a href="/php-preview.php">Home</a> \u2192 <span>Files</span>
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
                <div class="file-icon">\u{1F4C1}</div>
                <div class="file-name">Medical Lectures</div>
                <div class="file-meta">4 videos \u2022 2.3 GB</div>
            </div>
            <div class="file-item">
                <div class="file-icon">\u{1F4C1}</div>
                <div class="file-name">Web Development</div>
                <div class="file-meta">12 videos \u2022 5.7 GB</div>
            </div>
            <div class="file-item">
                <div class="file-icon">\u{1F3A5}</div>
                <div class="file-name">intro-video.mp4</div>
                <div class="file-meta">156 MB \u2022 MP4</div>
            </div>
            <div class="file-item">
                <div class="file-icon">\u{1F4C4}</div>
                <div class="file-name">course-notes.pdf</div>
                <div class="file-meta">2.4 MB \u2022 PDF</div>
            </div>
        </div>
    </main>
</body>
</html>
    `);
  });
  app2.post("/api/auth/signup", async (req, res) => {
    try {
      const validationResult = signupSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid input",
          errors: validationResult.error.errors
        });
      }
      const { email, firstName, lastName, password } = validationResult.data;
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      const newUser = await storage.createUser({
        email,
        firstName,
        lastName,
        password
      });
      req.session.userId = newUser.id;
      req.session.user = {
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
      console.error("Signup error:", error);
      res.status(500).json({ message: "Account creation failed" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const validationResult = loginSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          message: "Invalid input",
          errors: validationResult.error.errors
        });
      }
      const { email, password } = validationResult.data;
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.session.userId = user.id;
      req.session.user = {
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
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.redirect("/?error=logout_failed");
      }
      res.redirect("/");
    });
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });
  app2.post("/api/auth/set-password", async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password required" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const bcrypt = await import("bcrypt");
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.upsertUser({
        ...user,
        password: hashedPassword
      });
      res.json({ message: "Password set successfully. You can now login." });
    } catch (error) {
      console.error("Set password error:", error);
      res.status(500).json({ message: "Failed to set password" });
    }
  });
  app2.get("/simple-login", (req, res) => {
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
  app2.get("/api/admin/users", isAuthenticated, async (req, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.patch("/api/admin/users/:id/status", isAuthenticated, async (req, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      const { id } = req.params;
      const { status } = req.body;
      if (!["active", "blocked", "pending"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const updatedUser = await storage.updateUserStatus(id, status);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  });
  app2.delete("/api/admin/users/:id", isAuthenticated, async (req, res) => {
    try {
      const currentUser = req.user;
      if (currentUser?.role !== "admin") {
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
  app2.get("/api/batches/:batchId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.get("/api/batches", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const batches2 = await storage.getBatches();
      res.json(batches2);
    } catch (error) {
      console.error("Error fetching batches:", error);
      res.status(500).json({ message: "Failed to fetch batches" });
    }
  });
  app2.post("/api/batches", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.patch("/api/batches/:batchId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.delete("/api/batches/:batchId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { batchId } = req.params;
      await storage.deleteBatch(batchId);
      res.json({ message: "Batch deleted successfully" });
    } catch (error) {
      console.error("Error deleting batch:", error);
      res.status(500).json({ message: "Failed to delete batch" });
    }
  });
  app2.get("/api/batches/:batchId/courses", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { batchId } = req.params;
      const courses2 = await storage.getCoursesByBatch(batchId);
      res.json(courses2);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  app2.post("/api/batches/:batchId/courses", isAuthenticated, async (req, res) => {
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
  app2.patch("/api/courses/:courseId", isAuthenticated, async (req, res) => {
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
  app2.delete("/api/courses/:courseId", isAuthenticated, async (req, res) => {
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
  app2.get("/api/courses/:courseId/subjects", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { courseId } = req.params;
      const subjects2 = await storage.getSubjectsByCourse(courseId);
      res.json(subjects2);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });
  app2.post("/api/courses/:courseId/subjects", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { courseId } = req.params;
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
  app2.get("/api/subjects/:subjectId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.get("/api/batches/:batchId/subjects", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { batchId } = req.params;
      const subjects2 = await storage.getSubjectsByBatch(batchId);
      res.json(subjects2);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });
  app2.post("/api/batches/:batchId/subjects", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.patch("/api/subjects/:subjectId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.delete("/api/subjects/:subjectId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { subjectId } = req.params;
      await storage.deleteSubject(subjectId);
      res.json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.error("Error deleting subject:", error);
      res.status(500).json({ message: "Failed to delete subject" });
    }
  });
  app2.get("/api/videos/:videoId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.get("/api/subjects/:subjectId/videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { subjectId } = req.params;
      const videos2 = await storage.getVideosBySubject(subjectId);
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.post("/api/subjects/:subjectId/videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.post("/api/batches/:batchId/videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { batchId } = req.params;
      const videoData = insertVideoSchema.parse({
        ...req.body,
        batchId,
        subjectId: null
        // Allow videos without subjects when created at batch level
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
  app2.patch("/api/videos/:videoId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.delete("/api/videos/:videoId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { videoId } = req.params;
      await storage.deleteVideo(videoId);
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Failed to delete video" });
    }
  });
  app2.get("/api/multi-platform-videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const videos2 = await storage.getAllMultiPlatformVideos();
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching multi-platform videos:", error);
      res.status(500).json({ message: "Failed to fetch multi-platform videos" });
    }
  });
  app2.post("/api/multi-platform-videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.get("/api/subjects/:subjectId/multi-platform-videos", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const { subjectId } = req.params;
      const videos2 = await storage.getMultiPlatformVideosBySubject(subjectId);
      res.json(videos2);
    } catch (error) {
      console.error("Error fetching multi-platform videos:", error);
      res.status(500).json({ message: "Failed to fetch multi-platform videos" });
    }
  });
  app2.get("/api/multi-platform-videos/:videoId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  app2.get("/api/admin/whitelist", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      const whitelistedEmails2 = await storage.getWhitelistedEmails();
      res.json(whitelistedEmails2);
    } catch (error) {
      console.error("Error fetching whitelist:", error);
      res.status(500).json({ message: "Failed to fetch whitelist" });
    }
  });
  app2.post("/api/admin/whitelist", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
