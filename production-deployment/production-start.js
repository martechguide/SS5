#!/usr/bin/env node

// Simple production starter without database dependencies
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Educational Platform Starting...');
console.log('Environment:', process.env.NODE_ENV || 'production');
console.log('Port:', process.env.PORT || 5000);

// Set production environment
process.env.NODE_ENV = 'production';

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        platform: 'Educational Learning Platform'
    });
});

// API test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Educational Platform API is running!',
        version: '1.0.0',
        features: ['Course Management', 'Video Learning', 'User Progress']
    });
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all handler for React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
const port = parseInt(process.env.PORT || '5000', 10);
const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
    console.log(`✅ Educational Platform running on port ${port}`);
    console.log(`🌐 Access at: http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🧪 API test: http://localhost:${port}/api/test`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});