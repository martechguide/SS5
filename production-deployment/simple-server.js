// Simple server without database - just to get site working first
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple mock data for testing
const mockBatches = [
  { id: 1, name: 'Web Development', description: 'HTML, CSS, JavaScript' },
  { id: 2, name: 'Python Programming', description: 'Python from basics' },
  { id: 3, name: 'Data Science', description: 'Data analysis with Python' }
];

const mockVideos = [
  { id: 1, batch_id: 1, title: 'HTML Basics', youtube_id: 'UB1O30fR-EE', description: 'Learn HTML' },
  { id: 2, batch_id: 1, title: 'CSS Styling', youtube_id: 'yfoY53QXEnI', description: 'Master CSS' },
  { id: 3, batch_id: 2, title: 'Python Variables', youtube_id: 'LHBE6Q9XlzI', description: 'Python basics' }
];

// API Routes
app.get('/api/batches', (req, res) => {
  res.json(mockBatches);
});

app.get('/api/batches/:id/videos', (req, res) => {
  const batchId = parseInt(req.params.id);
  const videos = mockVideos.filter(v => v.batch_id === batchId);
  res.json(videos);
});

app.get('/api/auth/user', (req, res) => {
  res.json({ 
    id: 1, 
    email: 'demo@learnherefree.com', 
    first_name: 'Demo', 
    last_name: 'User',
    role: 'admin' 
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Educational Platform is running!',
    timestamp: new Date().toISOString()
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = parseInt(process.env.PORT || '5000', 10);
const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Educational Platform running on port ${port}`);
  console.log(`🌐 Visit: http://localhost:${port}`);
});

export default app;