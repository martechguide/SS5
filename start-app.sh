#!/bin/bash
# CloudPanel Node.js App Startup Script

echo "Starting Educational Platform on CloudPanel..."

# Navigate to app directory
cd /home/learnherefree/htdocs/learnherefree.online

# Set environment variables
export NODE_ENV=production
export PORT=3000
export DATABASE_URL="mysql://eduuser:Golu@917008@localhost:3306/eduplatform"

# Install dependencies (if not done)
echo "Installing dependencies..."
npm install --production

# Start the application
echo "Starting Node.js application..."
node server/index.js

echo "Application should be running on port 3000"
echo "Access via: http://learnherefree.online"