// Production Database Configuration for Hostinger MySQL
const mysql = require('mysql2/promise');
const { drizzle } = require('drizzle-orm/mysql2');

// MySQL connection for Hostinger
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_db_user',
  password: process.env.DB_PASSWORD || 'your_db_password',
  database: process.env.DB_NAME || 'your_db_name',
  port: process.env.DB_PORT || 3306,
  ssl: false // Hostinger usually doesn't require SSL for localhost connections
});

// Initialize Drizzle with MySQL
const db = drizzle(connection);

module.exports = { db, connection };