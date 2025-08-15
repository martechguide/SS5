-- Complete Database Setup for CloudPanel Educational Platform
-- Run these commands in CloudPanel phpMyAdmin

-- Drop existing tables to start fresh
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS batches;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create sessions table (required for PHP sessions)
CREATE TABLE sessions (
    sid VARCHAR(255) PRIMARY KEY,
    sess TEXT NOT NULL,
    expire INT NOT NULL,
    INDEX IDX_session_expire (expire)
);

-- Create batches table
CREATE TABLE batches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT,
    title VARCHAR(255) NOT NULL,
    youtube_id VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batches(id)
);

-- Create user progress table
CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    video_id INT,
    watched_duration INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    last_watched TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES videos(id)
);

-- Insert admin user (password: admin123)
INSERT INTO users (email, password, first_name, last_name, role) VALUES 
('admin@learnherefree.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin');

-- Insert sample student
INSERT INTO users (email, password, first_name, last_name, role) VALUES 
('student@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Test', 'Student', 'user');

-- Insert sample batches
INSERT INTO batches (name, description) VALUES 
('Web Development Fundamentals', 'Complete course on HTML, CSS, and JavaScript'),
('Python Programming', 'Learn Python from basics to advanced'),
('Data Science with Python', 'Data analysis and machine learning'),
('React.js Development', 'Modern frontend development with React');

-- Insert sample videos
INSERT INTO videos (batch_id, title, youtube_id, description) VALUES 
(1, 'HTML Basics - Structure and Elements', 'UB1O30fR-EE', 'Learn the fundamental building blocks of web pages'),
(1, 'CSS Fundamentals - Styling Your Web Pages', 'yfoY53QXEnI', 'Master CSS for beautiful web design'),
(1, 'JavaScript Essentials', 'hdI2bqOjy3c', 'Dynamic functionality with JavaScript'),
(2, 'Python Basics - Variables and Data Types', 'LHBE6Q9XlzI', 'Start your Python journey'),
(2, 'Python Functions and Control Flow', 'DQgE-D-n0_4', 'Programming logic with Python'),
(3, 'Data Analysis with Pandas', 'vmEHCJofslg', 'Manipulate data with Python'),
(4, 'React Components and JSX', 'SqcY0GlETPk', 'Build modern UIs with React');