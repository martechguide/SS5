<?php
// PHP Preview Version of Educational Platform
// This demonstrates the platform functionality using PHP instead of Node.js

session_start();

// Mock database simulation
class MockDatabase {
    private $users = [
        ['id' => 1, 'email' => 'admin@test.com', 'password' => password_hash('admin123', PASSWORD_DEFAULT), 'role' => 'admin'],
        ['id' => 2, 'email' => 'user@test.com', 'password' => password_hash('user123', PASSWORD_DEFAULT), 'role' => 'user']
    ];
    
    private $batches = [
        ['id' => 1, 'name' => 'Web Development', 'description' => 'Complete web development course'],
        ['id' => 2, 'name' => 'Data Science', 'description' => 'Learn data science and analytics']
    ];
    
    private $videos = [
        ['id' => 1, 'batch_id' => 1, 'title' => 'HTML Basics', 'youtube_id' => 'UB1O30fR-EE'],
        ['id' => 2, 'batch_id' => 1, 'title' => 'CSS Fundamentals', 'youtube_id' => 'yfoY53QXEnI'],
        ['id' => 3, 'batch_id' => 2, 'title' => 'Python for Data Science', 'youtube_id' => 'LHBE6Q9XlzI']
    ];
    
    public function getUsers() { return $this->users; }
    public function getBatches() { return $this->batches; }
    public function getVideos() { return $this->videos; }
    
    public function getUserByEmail($email) {
        foreach ($this->users as $user) {
            if ($user['email'] === $email) return $user;
        }
        return null;
    }
}

$db = new MockDatabase();

// Handle actions
$action = $_GET['action'] ?? 'home';
$message = '';

if ($_POST) {
    if ($action === 'login') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $user = $db->getUserByEmail($email);
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            $message = "✅ Login successful! Welcome " . $user['email'];
            $action = 'dashboard';
        } else {
            $message = "❌ Invalid credentials";
        }
    } elseif ($action === 'logout') {
        session_destroy();
        $message = "✅ Logged out successfully";
        $action = 'home';
    }
}

$isLoggedIn = isset($_SESSION['user_id']);
$isAdmin = $isLoggedIn && $_SESSION['user_role'] === 'admin';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Educational Platform - PHP Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 1rem 0; margin-bottom: 2rem; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .nav h1 { font-size: 1.5rem; }
        .nav-links { display: flex; gap: 1rem; }
        .nav-links a { color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; transition: background 0.3s; }
        .nav-links a:hover { background: rgba(255,255,255,0.2); }
        .card { background: white; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
        .btn { background: #2563eb; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; font-size: 1rem; transition: background 0.3s; }
        .btn:hover { background: #1d4ed8; }
        .btn-secondary { background: #6b7280; }
        .btn-secondary:hover { background: #4b5563; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #b91c1c; }
        .message { padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
        .message.success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
        .message.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        .video-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .video-card img { width: 100%; height: 200px; object-fit: cover; }
        .video-card .content { padding: 1rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 8px; text-align: center; }
        .stat-card h3 { font-size: 2rem; margin-bottom: 0.5rem; }
        .table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .table th, .table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
        .table th { background: #f9fafb; font-weight: 600; }
        .badge { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; }
        .badge.admin { background: #fef3c7; color: #92400e; }
        .badge.user { background: #dbeafe; color: #1e40af; }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <h1>🎓 Educational Platform</h1>
                <div class="nav-links">
                    <?php if ($isLoggedIn): ?>
                        <a href="?action=dashboard">Dashboard</a>
                        <a href="?action=videos">Videos</a>
                        <?php if ($isAdmin): ?>
                            <a href="?action=admin">Admin Panel</a>
                        <?php endif; ?>
                        <a href="?action=logout" onclick="return confirm('Are you sure?')">Logout (<?= $_SESSION['user_email'] ?>)</a>
                    <?php else: ?>
                        <a href="?action=home">Home</a>
                        <a href="?action=login">Login</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <?php if ($message): ?>
            <div class="message <?= strpos($message, '✅') !== false ? 'success' : 'error' ?>">
                <?= htmlspecialchars($message) ?>
            </div>
        <?php endif; ?>

        <?php if ($action === 'home' && !$isLoggedIn): ?>
            <div class="card">
                <h2>🌟 Welcome to Educational Platform</h2>
                <p>Access thousands of educational videos and courses. Learn at your own pace with our comprehensive learning management system.</p>
                <p style="margin-top: 1rem;">
                    <a href="?action=login" class="btn">Get Started - Login</a>
                </p>
            </div>

            <div class="grid">
                <div class="card">
                    <h3>📚 Comprehensive Courses</h3>
                    <p>Access structured learning paths with video lessons, quizzes, and assignments.</p>
                </div>
                <div class="card">
                    <h3>🎥 High-Quality Videos</h3>
                    <p>Professional video content from industry experts and experienced educators.</p>
                </div>
                <div class="card">
                    <h3>📊 Track Progress</h3>
                    <p>Monitor your learning journey with detailed progress tracking and analytics.</p>
                </div>
            </div>

        <?php elseif ($action === 'login'): ?>
            <div class="card" style="max-width: 400px; margin: 0 auto;">
                <h2>🔐 Login to Your Account</h2>
                <form method="POST">
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Login</button>
                </form>
                
                <div style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 4px;">
                    <h4>Demo Credentials:</h4>
                    <p><strong>Admin:</strong> admin@test.com / admin123</p>
                    <p><strong>User:</strong> user@test.com / user123</p>
                </div>
            </div>

        <?php elseif ($action === 'dashboard' && $isLoggedIn): ?>
            <div class="stats">
                <div class="stat-card">
                    <h3><?= count($db->getBatches()) ?></h3>
                    <p>Available Courses</p>
                </div>
                <div class="stat-card">
                    <h3><?= count($db->getVideos()) ?></h3>
                    <p>Total Videos</p>
                </div>
                <div class="stat-card">
                    <h3>85%</h3>
                    <p>Completion Rate</p>
                </div>
                <div class="stat-card">
                    <h3>12</h3>
                    <p>Hours Watched</p>
                </div>
            </div>

            <div class="card">
                <h2>📚 Your Courses</h2>
                <div class="grid">
                    <?php foreach ($db->getBatches() as $batch): ?>
                        <div class="video-card">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 120px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                                📚
                            </div>
                            <div class="content">
                                <h3><?= htmlspecialchars($batch['name']) ?></h3>
                                <p><?= htmlspecialchars($batch['description']) ?></p>
                                <a href="?action=videos&batch=<?= $batch['id'] ?>" class="btn" style="margin-top: 1rem;">View Videos</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'videos' && $isLoggedIn): ?>
            <div class="card">
                <h2>🎥 Video Library</h2>
                <div class="grid">
                    <?php 
                    $videos = $db->getVideos();
                    $batchFilter = $_GET['batch'] ?? null;
                    if ($batchFilter) {
                        $videos = array_filter($videos, function($video) use ($batchFilter) {
                            return $video['batch_id'] == $batchFilter;
                        });
                    }
                    ?>
                    <?php foreach ($videos as $video): ?>
                        <div class="video-card">
                            <img src="https://img.youtube.com/vi/<?= $video['youtube_id'] ?>/maxresdefault.jpg" alt="<?= htmlspecialchars($video['title']) ?>">
                            <div class="content">
                                <h3><?= htmlspecialchars($video['title']) ?></h3>
                                <a href="https://www.youtube.com/watch?v=<?= $video['youtube_id'] ?>" target="_blank" class="btn">Watch Video</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'admin' && $isAdmin): ?>
            <div class="card">
                <h2>⚙️ Admin Dashboard</h2>
                <p>Manage users, courses, and platform settings.</p>
            </div>

            <div class="card">
                <h3>👥 User Management</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($db->getUsers() as $user): ?>
                            <tr>
                                <td><?= $user['id'] ?></td>
                                <td><?= htmlspecialchars($user['email']) ?></td>
                                <td><span class="badge <?= $user['role'] ?>"><?= ucfirst($user['role']) ?></span></td>
                                <td>
                                    <button class="btn btn-secondary" style="font-size: 0.875rem; padding: 0.5rem;">Edit</button>
                                    <button class="btn btn-danger" style="font-size: 0.875rem; padding: 0.5rem;">Delete</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <h3>📚 Course Management</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($db->getBatches() as $batch): ?>
                            <tr>
                                <td><?= $batch['id'] ?></td>
                                <td><?= htmlspecialchars($batch['name']) ?></td>
                                <td><?= htmlspecialchars($batch['description']) ?></td>
                                <td>
                                    <button class="btn btn-secondary" style="font-size: 0.875rem; padding: 0.5rem;">Edit</button>
                                    <button class="btn btn-danger" style="font-size: 0.875rem; padding: 0.5rem;">Delete</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

        <?php else: ?>
            <div class="card">
                <h2>🚫 Access Denied</h2>
                <p>You don't have permission to access this page.</p>
                <a href="?action=login" class="btn">Login</a>
            </div>
        <?php endif; ?>
    </div>

    <footer style="background: #374151; color: white; text-align: center; padding: 2rem 0; margin-top: 3rem;">
        <div class="container">
            <p>&copy; 2024 Educational Platform. Built with PHP for demonstration purposes.</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">Production version will use Node.js with React frontend and MySQL database.</p>
        </div>
    </footer>
</body>
</html>