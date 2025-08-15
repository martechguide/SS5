-- CloudPanel Database Setup for Educational Platform
-- Run these SQL commands in your database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(500),
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'blocked', 'pending') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create sessions table (required for authentication)
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR(255) PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP NOT NULL,
  INDEX IDX_session_expire (expire)
);

-- Create batches table
CREATE TABLE IF NOT EXISTS batches (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  batch_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(500),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  course_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  subject_id VARCHAR(255),
  batch_id VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_video_id VARCHAR(255),
  duration INT DEFAULT 0,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
);

-- Create multi-platform videos table
CREATE TABLE IF NOT EXISTS multi_platform_videos (
  id VARCHAR(255) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  platform ENUM('youtube', 'vimeo', 'facebook', 'dailymotion', 'twitch', 'instagram', 'tiktok') NOT NULL,
  video_id VARCHAR(255) NOT NULL,
  video_url VARCHAR(500) NOT NULL,
  duration INT DEFAULT 0,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (id, email, password, first_name, last_name, role, status) 
VALUES (
  'admin-001', 
  'admin@learnherefree.online', 
  '$2b$10$rQqpkrppZICJXaqGr4ctLuKbN.lzKVKM5R7IWXDkfOmgDHWvDnOSu', 
  'Admin', 
  'User', 
  'admin', 
  'active'
);

-- Insert sample batch
INSERT IGNORE INTO batches (id, name, description, is_active) 
VALUES (
  'batch-001', 
  'Web Development Course', 
  'Complete web development course with modern technologies',
  true
);

-- Insert sample course
INSERT IGNORE INTO courses (id, batch_id, name, description, order_index, is_active) 
VALUES (
  'course-001',
  'batch-001', 
  'Frontend Development', 
  'Learn HTML, CSS, JavaScript and React',
  1,
  true
);

-- Insert sample subject
INSERT IGNORE INTO subjects (id, course_id, name, description, order_index) 
VALUES (
  'subject-001',
  'course-001', 
  'HTML Fundamentals', 
  'Learn HTML basics and semantic markup',
  1
);

-- Insert sample video
INSERT IGNORE INTO videos (id, subject_id, batch_id, title, description, youtube_video_id, order_index) 
VALUES (
  'video-001',
  'subject-001',
  'batch-001', 
  'HTML Introduction', 
  'Introduction to HTML and web development',
  'UB1O30fR-EE',
  1
);