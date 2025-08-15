import {
  users,
  batches,
  courses,
  subjects,
  videos,
  multiPlatformVideos,
  userProgress,
  whitelistedEmails,
  type User,
  type UpsertUser,
  type Batch,
  type Course,
  type Subject,
  type Video,
  type MultiPlatformVideo,
  type UserProgress,
  type WhitelistedEmail,
  type InsertBatch,
  type InsertCourse,
  type InsertSubject,
  type InsertVideo,
  type InsertMultiPlatformVideo,
  type InsertWhitelistedEmail,
  type InsertUserProgress,
  type SignupData,
  type LoginData,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, isNull, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) these are mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserStatus(id: string, status: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  // Authentication operations
  createUser(userData: SignupData): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
  
  // Email whitelist operations
  isEmailWhitelisted(email: string): Promise<boolean>;
  getWhitelistedEmails(): Promise<WhitelistedEmail[]>;
  addWhitelistedEmail(email: InsertWhitelistedEmail): Promise<WhitelistedEmail>;
  removeWhitelistedEmail(email: string): Promise<void>;
  
  // Batch operations
  getBatches(): Promise<Batch[]>;
  getBatch(id: string): Promise<Batch | undefined>;
  createBatch(batch: InsertBatch): Promise<Batch>;
  updateBatch(id: string, batch: Partial<InsertBatch>): Promise<Batch>;
  deleteBatch(id: string): Promise<void>;
  
  // Course operations
  getCoursesByBatch(batchId: string): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course>;
  deleteCourse(id: string): Promise<void>;
  
  // Subject operations
  getSubjectsByCourse(courseId: string): Promise<Subject[]>;
  getSubjectsByBatch(batchId: string): Promise<Subject[]>;
  getSubject(id: string): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  updateSubject(id: string, subject: Partial<InsertSubject>): Promise<Subject>;
  deleteSubject(id: string): Promise<void>;
  
  // Video operations  
  getVideosBySubject(subjectId: string): Promise<Video[]>;
  getVideo(id: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, video: Partial<InsertVideo>): Promise<Video>;
  deleteVideo(id: string): Promise<void>;
  
  // Multi-platform video operations
  getAllMultiPlatformVideos(): Promise<MultiPlatformVideo[]>;
  getMultiPlatformVideosBySubject(subjectId: string): Promise<MultiPlatformVideo[]>;
  getMultiPlatformVideo(id: string): Promise<MultiPlatformVideo | undefined>;
  createMultiPlatformVideo(video: InsertMultiPlatformVideo): Promise<MultiPlatformVideo>;
  updateMultiPlatformVideo(id: string, video: Partial<InsertMultiPlatformVideo>): Promise<MultiPlatformVideo>;
  deleteMultiPlatformVideo(id: string): Promise<void>;
  
  // User progress operations
  getUserProgress(userId: string, videoId: string): Promise<UserProgress | undefined>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  

  

}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserStatus(id: string, status: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ status, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  // Authentication operations
  async createUser(userData: SignupData): Promise<User> {
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const [user] = await db
      .insert(users)
      .values({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
        role: "user",
        status: "active",
        isEmailVerified: false
      })
      .returning();
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    const bcrypt = await import('bcrypt');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    // Check if user is active
    if (user.status !== "active") {
      return null;
    }

    return user;
  }

  // Email whitelist operations
  async isEmailWhitelisted(email: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(whitelistedEmails)
      .where(eq(whitelistedEmails.email, email));
    return !!result;
  }

  async getWhitelistedEmails(): Promise<WhitelistedEmail[]> {
    return await db.select().from(whitelistedEmails);
  }

  async addWhitelistedEmail(emailData: InsertWhitelistedEmail): Promise<WhitelistedEmail> {
    const [email] = await db
      .insert(whitelistedEmails)
      .values(emailData)
      .returning();
    return email;
  }

  async removeWhitelistedEmail(email: string): Promise<void> {
    await db.delete(whitelistedEmails).where(eq(whitelistedEmails.email, email));
  }

  // Batch operations
  async getBatches(): Promise<Batch[]> {
    return await db.select().from(batches).where(eq(batches.isActive, true));
  }

  async getBatch(id: string): Promise<Batch | undefined> {
    const [batch] = await db.select().from(batches).where(eq(batches.id, id));
    return batch;
  }

  async createBatch(batchData: InsertBatch): Promise<Batch> {
    const [batch] = await db.insert(batches).values(batchData).returning();
    return batch;
  }

  async updateBatch(id: string, batchData: Partial<InsertBatch>): Promise<Batch> {
    const [batch] = await db
      .update(batches)
      .set({ ...batchData, updatedAt: new Date() })
      .where(eq(batches.id, id))
      .returning();
    return batch;
  }

  async deleteBatch(id: string): Promise<void> {
    await db.update(batches)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(batches.id, id));
  }

  // Course operations
  async getCoursesByBatch(batchId: string): Promise<Course[]> {
    return await db
      .select()
      .from(courses)
      .where(eq(courses.batchId, batchId))
      .orderBy(courses.orderIndex);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  async updateCourse(id: string, courseData: Partial<InsertCourse>): Promise<Course> {
    const [course] = await db
      .update(courses)
      .set({ ...courseData, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  async deleteCourse(id: string): Promise<void> {
    await db.update(courses)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(courses.id, id));
  }

  // Subject operations
  async getSubjectsByCourse(courseId: string): Promise<(Subject & { videoCount: number })[]> {
    const subjectsWithCount = await db
      .select({
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
        videoCount: sql<number>`COALESCE(COUNT(${videos.id}), 0)`.as('videoCount')
      })
      .from(subjects)
      .leftJoin(videos, and(eq(videos.subjectId, subjects.id), eq(videos.isActive, true)))
      .where(eq(subjects.courseId, courseId))
      .groupBy(subjects.id)
      .orderBy(subjects.orderIndex);
    
    return subjectsWithCount;
  }
  
  async getSubjectsByBatch(batchId: string): Promise<(Subject & { videoCount: number })[]> {
    const subjectsWithCount = await db
      .select({
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
        videoCount: sql<number>`COALESCE(COUNT(${videos.id}), 0)`.as('videoCount')
      })
      .from(subjects)
      .leftJoin(videos, and(eq(videos.subjectId, subjects.id), eq(videos.isActive, true)))
      .where(and(eq(subjects.batchId, batchId), isNull(subjects.courseId)))
      .groupBy(subjects.id)
      .orderBy(subjects.orderIndex);
    
    return subjectsWithCount;
  }

  async getSubject(id: string): Promise<Subject | undefined> {
    const [subject] = await db.select().from(subjects).where(eq(subjects.id, id));
    return subject;
  }

  async createSubject(subjectData: InsertSubject): Promise<Subject> {
    const [subject] = await db.insert(subjects).values(subjectData).returning();
    return subject;
  }

  async updateSubject(id: string, subjectData: Partial<InsertSubject>): Promise<Subject> {
    const [subject] = await db
      .update(subjects)
      .set({ ...subjectData, updatedAt: new Date() })
      .where(eq(subjects.id, id))
      .returning();
    return subject;
  }

  async deleteSubject(id: string): Promise<void> {
    await db.delete(subjects).where(eq(subjects.id, id));
  }

  // Video operations
  async getVideosBySubject(subjectId: string): Promise<Video[]> {
    return await db
      .select()
      .from(videos)
      .where(and(eq(videos.subjectId, subjectId), eq(videos.isActive, true)))
      .orderBy(videos.orderIndex);
  }

  async getVideo(id: string): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video;
  }

  async createVideo(videoData: InsertVideo): Promise<Video> {
    const [video] = await db.insert(videos).values(videoData).returning();
    return video;
  }

  async updateVideo(id: string, videoData: Partial<InsertVideo>): Promise<Video> {
    const [video] = await db
      .update(videos)
      .set({ ...videoData, updatedAt: new Date() })
      .where(eq(videos.id, id))
      .returning();
    return video;
  }

  async deleteVideo(id: string): Promise<void> {
    await db.update(videos)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(videos.id, id));
  }

  // Multi-platform video operations
  async getAllMultiPlatformVideos(): Promise<MultiPlatformVideo[]> {
    return await db
      .select()
      .from(multiPlatformVideos)
      .where(eq(multiPlatformVideos.isActive, true))
      .orderBy(multiPlatformVideos.createdAt);
  }

  async getMultiPlatformVideosBySubject(subjectId: string): Promise<MultiPlatformVideo[]> {
    return await db
      .select()
      .from(multiPlatformVideos)
      .where(and(eq(multiPlatformVideos.subjectId, subjectId), eq(multiPlatformVideos.isActive, true)))
      .orderBy(multiPlatformVideos.orderIndex);
  }

  async getMultiPlatformVideo(id: string): Promise<MultiPlatformVideo | undefined> {
    const [video] = await db.select().from(multiPlatformVideos).where(eq(multiPlatformVideos.id, id));
    return video;
  }

  async createMultiPlatformVideo(videoData: InsertMultiPlatformVideo): Promise<MultiPlatformVideo> {
    const [video] = await db.insert(multiPlatformVideos).values(videoData).returning();
    return video;
  }

  async updateMultiPlatformVideo(id: string, videoData: Partial<InsertMultiPlatformVideo>): Promise<MultiPlatformVideo> {
    const [video] = await db
      .update(multiPlatformVideos)
      .set({ ...videoData, updatedAt: new Date() })
      .where(eq(multiPlatformVideos.id, id))
      .returning();
    return video;
  }

  async deleteMultiPlatformVideo(id: string): Promise<void> {
    await db.update(multiPlatformVideos)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(multiPlatformVideos.id, id));
  }

  // User progress operations
  async getUserProgress(userId: string, videoId: string): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.videoId, videoId)));
    return progress;
  }

  async updateUserProgress(progressData: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db
      .insert(userProgress)
      .values(progressData)
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.videoId],
        set: {
          ...progressData,
          lastWatchedAt: new Date(),
        },
      })
      .returning();
    return progress;
  }

  async getUserProgressBySubject(userId: string, subjectId: string): Promise<UserProgress[]> {
    const result = await db
      .select({
        id: userProgress.id,
        userId: userProgress.userId,
        videoId: userProgress.videoId,
        completed: userProgress.completed,
        watchTimeSeconds: userProgress.watchTimeSeconds,
        lastWatchedAt: userProgress.lastWatchedAt,
      })
      .from(userProgress)
      .innerJoin(videos, eq(userProgress.videoId, videos.id))
      .where(and(eq(userProgress.userId, userId), eq(videos.subjectId, subjectId)));
    
    return result;
  }













}

export const storage = new DatabaseStorage();
