import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  password: varchar("password"), // for local authentication
  role: varchar("role").default("user"), // user, admin
  status: varchar("status").default("active"), // active, pending, blocked
  isEmailVerified: boolean("is_email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Whitelisted emails for access control
export const whitelistedEmails = pgTable("whitelisted_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Batches (e.g., "Batch 2025", "Advanced Batch")
export const batches = pgTable("batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses within batches (e.g., "JEE Main", "NEET Preparation")
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: text("description"),
  thumbnailUrl: varchar("thumbnail_url"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subjects within courses (e.g., "Mathematics", "Physics")
export const subjects = pgTable("subjects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon").default("fas fa-book"),
  color: varchar("color").default("blue"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Videos within subjects
// YouTube videos table (keep existing)
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subjectId: varchar("subject_id").references(() => subjects.id, { onDelete: "cascade" }), // nullable - videos can exist at batch level
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }), // nullable - videos can exist at batch level
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  youtubeVideoId: varchar("youtube_video_id").notNull(),
  duration: integer("duration_seconds"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Multi-platform videos table (new)
export const multiPlatformVideos = pgTable("multi_platform_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  subjectId: varchar("subject_id").references(() => subjects.id, { onDelete: "cascade" }), // nullable - videos can exist at batch level
  courseId: varchar("course_id").references(() => courses.id, { onDelete: "cascade" }), // nullable - videos can exist at batch level
  batchId: varchar("batch_id").notNull().references(() => batches.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  platform: varchar("platform", { length: 50 }).notNull(), // vimeo, facebook, dailymotion, twitch, peertube, rumble
  videoUrl: varchar("video_url").notNull(), // original URL
  videoId: varchar("video_id").notNull(), // extracted video ID for embedding
  thumbnail: varchar("thumbnail"), // thumbnail URL
  duration: integer("duration_seconds"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User progress tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  videoId: varchar("video_id").notNull().references(() => videos.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  watchTimeSeconds: integer("watch_time_seconds").default(0),
  lastWatchedAt: timestamp("last_watched_at").defaultNow(),
});



// Relations
export const batchesRelations = relations(batches, ({ many }) => ({
  courses: many(courses),
  subjects: many(subjects),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  batch: one(batches, {
    fields: [courses.batchId],
    references: [batches.id],
  }),
  subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  batch: one(batches, {
    fields: [subjects.batchId],
    references: [batches.id],
  }),
  course: one(courses, {
    fields: [subjects.courseId],
    references: [courses.id],
  }),
  videos: many(videos),
  multiPlatformVideos: many(multiPlatformVideos),
}));

export const videosRelations = relations(videos, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [videos.subjectId],
    references: [subjects.id],
  }),
  userProgress: many(userProgress),
}));

export const multiPlatformVideosRelations = relations(multiPlatformVideos, ({ one }) => ({
  subject: one(subjects, {
    fields: [multiPlatformVideos.subjectId],
    references: [subjects.id],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  video: one(videos, {
    fields: [userProgress.videoId],
    references: [videos.id],
  }),
}));



// Schemas for validation
export const insertBatchSchema = createInsertSchema(batches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMultiPlatformVideoSchema = createInsertSchema(multiPlatformVideos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWhitelistedEmailSchema = createInsertSchema(whitelistedEmails).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
});

// User authentication schemas
export const signupSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
});

export const loginSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});













// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Batch = typeof batches.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Subject = typeof subjects.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type MultiPlatformVideo = typeof multiPlatformVideos.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type WhitelistedEmail = typeof whitelistedEmails.$inferSelect;

export type InsertBatch = z.infer<typeof insertBatchSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type InsertMultiPlatformVideo = z.infer<typeof insertMultiPlatformVideoSchema>;
export type InsertWhitelistedEmail = z.infer<typeof insertWhitelistedEmailSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
