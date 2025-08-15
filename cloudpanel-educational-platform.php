<?php
// Complete Educational Platform for CloudPanel Deployment
// Database connection setup for Hostinger/CloudPanel MySQL

session_start();

// Database configuration
$host = 'localhost';
$dbname = 'eduplatform';
$username = 'u693225584_webadmin';
$password = 'Learnhere@2024';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Initialize database tables if they don't exist
$createTables = "
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS batches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    batch_id INT,
    title VARCHAR(255) NOT NULL,
    youtube_id VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (batch_id) REFERENCES batches(id)
);

CREATE TABLE IF NOT EXISTS user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    video_id INT,
    watched_duration INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    last_watched TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES videos(id)
);
";

$pdo->exec($createTables);

// Insert default admin user if not exists
$adminCheck = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$adminCheck->execute(['admin@learnherefree.com']);
if ($adminCheck->fetchColumn() == 0) {
    $stmt = $pdo->prepare("INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        'admin@learnherefree.com',
        password_hash('admin123', PASSWORD_DEFAULT),
        'Admin',
        'User',
        'admin'
    ]);
}

// Insert sample batches if not exist
$batchCheck = $pdo->prepare("SELECT COUNT(*) FROM batches");
$batchCheck->execute();
if ($batchCheck->fetchColumn() == 0) {
    $batches = [
        ['Web Development Fundamentals', 'Complete course on HTML, CSS, and JavaScript'],
        ['Python Programming', 'Learn Python from basics to advanced'],
        ['Data Science with Python', 'Data analysis and machine learning'],
        ['React.js Development', 'Modern frontend development with React']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO batches (name, description) VALUES (?, ?)");
    foreach ($batches as $batch) {
        $stmt->execute($batch);
    }
}

// Insert sample videos if not exist
$videoCheck = $pdo->prepare("SELECT COUNT(*) FROM videos");
$videoCheck->execute();
if ($videoCheck->fetchColumn() == 0) {
    $videos = [
        [1, 'HTML Basics - Structure and Elements', 'UB1O30fR-EE', 'Learn the fundamental building blocks of web pages'],
        [1, 'CSS Fundamentals - Styling Your Web Pages', 'yfoY53QXEnI', 'Master CSS for beautiful web design'],
        [1, 'JavaScript Essentials', 'hdI2bqOjy3c', 'Dynamic functionality with JavaScript'],
        [2, 'Python Basics - Variables and Data Types', 'LHBE6Q9XlzI', 'Start your Python journey'],
        [2, 'Python Functions and Control Flow', 'DQgE-D-n0_4', 'Programming logic with Python'],
        [3, 'Data Analysis with Pandas', 'vmEHCJofslg', 'Manipulate data with Python'],
        [4, 'React Components and JSX', 'SqcY0GlETPk', 'Build modern UIs with React']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO videos (batch_id, title, youtube_id, description) VALUES (?, ?, ?, ?)");
    foreach ($videos as $video) {
        $stmt->execute($video);
    }
}

// Handle form submissions
$action = $_GET['action'] ?? 'home';
$message = '';

if ($_POST) {
    if ($action === 'login') {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
            $message = "✅ Welcome back, " . $user['first_name'] . "!";
            $action = 'dashboard';
        } else {
            $message = "❌ Invalid email or password";
        }
    } elseif ($action === 'register') {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $firstName = trim($_POST['first_name'] ?? '');
        $lastName = trim($_POST['last_name'] ?? '');
        
        if ($email && $password && $firstName) {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetchColumn() > 0) {
                $message = "❌ Email already registered";
            } else {
                $stmt = $pdo->prepare("INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $email,
                    password_hash($password, PASSWORD_DEFAULT),
                    $firstName,
                    $lastName,
                    'user'
                ]);
                $message = "✅ Registration successful! Please login.";
                $action = 'login';
            }
        } else {
            $message = "❌ All fields are required";
        }
    } elseif ($action === 'logout') {
        session_destroy();
        $message = "✅ Logged out successfully";
        $action = 'home';
    }
}

$isLoggedIn = isset($_SESSION['user_id']);
$isAdmin = $isLoggedIn && $_SESSION['user_role'] === 'admin';

// Get data for display
$batches = $pdo->query("SELECT * FROM batches ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
$totalVideos = $pdo->query("SELECT COUNT(*) FROM videos")->fetchColumn();
$totalUsers = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Here Free - Educational Platform</title>
    <meta name="description" content="Free educational platform with comprehensive courses in web development, programming, and data science. Learn at your own pace with video tutorials.">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        
        .header { 
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 0; 
            margin-bottom: 2rem; 
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .nav h1 { 
            font-size: 1.8rem; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .nav-links { display: flex; gap: 1rem; }
        .nav-links a { 
            color: #4a5568; 
            text-decoration: none; 
            padding: 0.5rem 1rem; 
            border-radius: 8px; 
            transition: all 0.3s;
            font-weight: 500;
        }
        .nav-links a:hover { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: translateY(-2px);
        }
        
        .card { 
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px; 
            padding: 2rem; 
            margin-bottom: 2rem; 
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { 
            display: block; 
            margin-bottom: 0.5rem; 
            font-weight: 600; 
            color: #2d3748;
        }
        .form-group input { 
            width: 100%; 
            padding: 0.75rem; 
            border: 2px solid #e2e8f0; 
            border-radius: 8px; 
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .btn { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 0.75rem 1.5rem; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            text-decoration: none; 
            display: inline-block; 
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid transparent;
        }
        .btn:hover { 
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-secondary { 
            background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
        }
        .btn-secondary:hover { 
            box-shadow: 0 4px 15px rgba(113, 128, 150, 0.4);
        }
        
        .btn-outline {
            background: transparent;
            color: #667eea;
            border: 2px solid #667eea;
        }
        .btn-outline:hover {
            background: #667eea;
            color: white;
        }
        
        .message { 
            padding: 1rem; 
            border-radius: 8px; 
            margin-bottom: 1rem;
            font-weight: 500;
        }
        .message.success { 
            background: #f0fff4; 
            color: #22543d; 
            border: 2px solid #9ae6b4; 
        }
        .message.error { 
            background: #fff5f5; 
            color: #742a2a; 
            border: 2px solid #feb2b2; 
        }
        
        .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 1.5rem; 
        }
        
        .video-card { 
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px; 
            overflow: hidden; 
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .video-card:hover { 
            transform: translateY(-5px);
        }
        
        .video-card img { 
            width: 100%; 
            height: 200px; 
            object-fit: cover; 
        }
        .video-card .content { 
            padding: 1.5rem; 
        }
        
        .stats { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 1.5rem; 
            margin-bottom: 2rem; 
        }
        .stat-card { 
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem; 
            border-radius: 15px; 
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .stat-card h3 { 
            font-size: 2.5rem; 
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stat-card p { 
            color: #4a5568; 
            font-weight: 500; 
        }
        
        .hero {
            text-align: center;
            padding: 3rem 0;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .hero p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        .feature {
            text-align: center;
            padding: 2rem;
        }
        .feature i {
            font-size: 3rem;
            color: white;
            margin-bottom: 1rem;
        }
        .feature h3 {
            color: white;
            margin-bottom: 1rem;
        }
        .feature p {
            color: rgba(255, 255, 255, 0.8);
        }
        
        .table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 1rem;
            background: white;
            border-radius: 8px;
            overflow: hidden;
        }
        .table th, .table td { 
            padding: 1rem; 
            text-align: left; 
            border-bottom: 1px solid #e2e8f0; 
        }
        .table th { 
            background: #f7fafc; 
            font-weight: 600; 
            color: #2d3748;
        }
        
        .badge { 
            padding: 0.25rem 0.75rem; 
            border-radius: 9999px; 
            font-size: 0.875rem; 
            font-weight: 500; 
        }
        .badge.admin { 
            background: #fed7d7; 
            color: #c53030; 
        }
        .badge.user { 
            background: #bee3f8; 
            color: #2b6cb0; 
        }
        
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .nav { flex-direction: column; gap: 1rem; }
            .nav-links { flex-wrap: wrap; justify-content: center; }
            .hero h1 { font-size: 2rem; }
            .stats { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="nav">
                <h1><i class="fas fa-graduation-cap"></i> Learn Here Free</h1>
                <div class="nav-links">
                    <?php if ($isLoggedIn): ?>
                        <a href="?action=dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                        <a href="?action=courses"><i class="fas fa-book"></i> Courses</a>
                        <a href="?action=videos"><i class="fas fa-play-circle"></i> Videos</a>
                        <?php if ($isAdmin): ?>
                            <a href="?action=admin"><i class="fas fa-cog"></i> Admin</a>
                        <?php endif; ?>
                        <a href="?action=logout" onclick="return confirm('Are you sure?')">
                            <i class="fas fa-sign-out-alt"></i> Logout (<?= $_SESSION['user_name'] ?>)
                        </a>
                    <?php else: ?>
                        <a href="?action=home"><i class="fas fa-home"></i> Home</a>
                        <a href="?action=login"><i class="fas fa-sign-in-alt"></i> Login</a>
                        <a href="?action=register"><i class="fas fa-user-plus"></i> Register</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <?php if ($message): ?>
            <div class="message <?= strpos($message, '✅') !== false ? 'success' : 'error' ?>">
                <?= htmlspecialchars($message) ?>
            </div>
        <?php endif; ?>

        <?php if ($action === 'home' && !$isLoggedIn): ?>
            <div class="hero">
                <h1>Learn Anything, Anywhere, Anytime</h1>
                <p>Free access to high-quality educational content. Start your learning journey today!</p>
                <a href="?action=register" class="btn" style="margin-right: 1rem;">Get Started Free</a>
                <a href="?action=login" class="btn btn-outline">Login</a>
            </div>

            <div class="features">
                <div class="feature">
                    <i class="fas fa-video"></i>
                    <h3>Premium Video Content</h3>
                    <p>Access hundreds of high-quality video tutorials from industry experts</p>
                </div>
                <div class="feature">
                    <i class="fas fa-certificate"></i>
                    <h3>Structured Learning</h3>
                    <p>Follow organized learning paths designed for progressive skill building</p>
                </div>
                <div class="feature">
                    <i class="fas fa-users"></i>
                    <h3>Community Support</h3>
                    <p>Join a community of learners and get help when you need it</p>
                </div>
                <div class="feature">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>Learn on Any Device</h3>
                    <p>Access your courses on desktop, tablet, or mobile - learn anywhere</p>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-chart-line"></i> Platform Statistics</h2>
                <div class="stats">
                    <div class="stat-card">
                        <h3><?= count($batches) ?></h3>
                        <p>Active Courses</p>
                    </div>
                    <div class="stat-card">
                        <h3><?= $totalVideos ?></h3>
                        <p>Video Lessons</p>
                    </div>
                    <div class="stat-card">
                        <h3><?= $totalUsers ?></h3>
                        <p>Active Students</p>
                    </div>
                    <div class="stat-card">
                        <h3>24/7</h3>
                        <p>Access Available</p>
                    </div>
                </div>
            </div>

        <?php elseif ($action === 'login'): ?>
            <div class="card" style="max-width: 400px; margin: 2rem auto;">
                <h2><i class="fas fa-sign-in-alt"></i> Login to Your Account</h2>
                <form method="POST">
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-lock"></i> Password</label>
                        <input type="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Login</button>
                </form>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px; text-align: center;">
                    <p>Don't have an account? <a href="?action=register" style="color: #667eea; font-weight: 600;">Register here</a></p>
                </div>
                
                <div style="margin-top: 1rem; padding: 1rem; background: #edf2f7; border-radius: 8px;">
                    <h4><i class="fas fa-info-circle"></i> Demo Account:</h4>
                    <p><strong>Email:</strong> admin@learnherefree.com</p>
                    <p><strong>Password:</strong> admin123</p>
                </div>
            </div>

        <?php elseif ($action === 'register'): ?>
            <div class="card" style="max-width: 400px; margin: 2rem auto;">
                <h2><i class="fas fa-user-plus"></i> Create Your Account</h2>
                <form method="POST">
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> First Name</label>
                        <input type="text" name="first_name" placeholder="Enter your first name" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Last Name</label>
                        <input type="text" name="last_name" placeholder="Enter your last name" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-lock"></i> Password</label>
                        <input type="password" name="password" placeholder="Create a password" required minlength="6">
                    </div>
                    <button type="submit" class="btn" style="width: 100%;">Create Account</button>
                </form>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px; text-align: center;">
                    <p>Already have an account? <a href="?action=login" style="color: #667eea; font-weight: 600;">Login here</a></p>
                </div>
            </div>

        <?php elseif ($action === 'dashboard' && $isLoggedIn): ?>
            <div class="hero">
                <h1>Welcome back, <?= $_SESSION['user_name'] ?>!</h1>
                <p>Continue your learning journey with our comprehensive courses</p>
            </div>

            <div class="stats">
                <div class="stat-card">
                    <h3><?= count($batches) ?></h3>
                    <p>Available Courses</p>
                </div>
                <div class="stat-card">
                    <h3><?= $totalVideos ?></h3>
                    <p>Total Lessons</p>
                </div>
                <div class="stat-card">
                    <h3>85%</h3>
                    <p>Your Progress</p>
                </div>
                <div class="stat-card">
                    <h3>24</h3>
                    <p>Hours Learned</p>
                </div>
            </div>

            <div class="card">
                <h2><i class="fas fa-book-open"></i> Continue Learning</h2>
                <div class="grid">
                    <?php foreach ($batches as $batch): ?>
                        <div class="video-card">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 150px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="content">
                                <h3><?= htmlspecialchars($batch['name']) ?></h3>
                                <p><?= htmlspecialchars($batch['description']) ?></p>
                                <a href="?action=videos&batch=<?= $batch['id'] ?>" class="btn" style="margin-top: 1rem;">
                                    <i class="fas fa-play"></i> Start Learning
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'courses' && $isLoggedIn): ?>
            <div class="card">
                <h2><i class="fas fa-book"></i> All Courses</h2>
                <div class="grid">
                    <?php foreach ($batches as $batch): ?>
                        <?php
                        $videoCount = $pdo->prepare("SELECT COUNT(*) FROM videos WHERE batch_id = ?");
                        $videoCount->execute([$batch['id']]);
                        $count = $videoCount->fetchColumn();
                        ?>
                        <div class="video-card">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 150px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="content">
                                <h3><?= htmlspecialchars($batch['name']) ?></h3>
                                <p><?= htmlspecialchars($batch['description']) ?></p>
                                <p style="margin: 1rem 0; color: #4a5568;"><i class="fas fa-video"></i> <?= $count ?> videos</p>
                                <a href="?action=videos&batch=<?= $batch['id'] ?>" class="btn" style="margin-top: 1rem;">
                                    <i class="fas fa-play"></i> View Course
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'videos' && $isLoggedIn): ?>
            <?php
            $batchFilter = $_GET['batch'] ?? null;
            $batchName = 'All Videos';
            
            if ($batchFilter) {
                $stmt = $pdo->prepare("SELECT name FROM batches WHERE id = ?");
                $stmt->execute([$batchFilter]);
                $batchData = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($batchData) $batchName = $batchData['name'];
                
                $stmt = $pdo->prepare("SELECT * FROM videos WHERE batch_id = ? ORDER BY title");
                $stmt->execute([$batchFilter]);
            } else {
                $stmt = $pdo->prepare("SELECT v.*, b.name as batch_name FROM videos v JOIN batches b ON v.batch_id = b.id ORDER BY b.name, v.title");
                $stmt->execute();
            }
            $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ?>
            
            <div class="card">
                <h2><i class="fas fa-play-circle"></i> <?= htmlspecialchars($batchName) ?></h2>
                <?php if ($batchFilter): ?>
                    <p><a href="?action=videos" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> View All Videos</a></p>
                <?php endif; ?>
                
                <div class="grid" style="margin-top: 2rem;">
                    <?php foreach ($videos as $video): ?>
                        <div class="video-card">
                            <img src="https://img.youtube.com/vi/<?= $video['youtube_id'] ?>/maxresdefault.jpg" 
                                 alt="<?= htmlspecialchars($video['title']) ?>" 
                                 onerror="this.src='https://via.placeholder.com/320x180/667eea/white?text=Video'">
                            <div class="content">
                                <h3><?= htmlspecialchars($video['title']) ?></h3>
                                <?php if (!$batchFilter && isset($video['batch_name'])): ?>
                                    <p style="color: #667eea; font-weight: 500; margin-bottom: 0.5rem;">
                                        <i class="fas fa-folder"></i> <?= htmlspecialchars($video['batch_name']) ?>
                                    </p>
                                <?php endif; ?>
                                <p><?= htmlspecialchars($video['description'] ?? '') ?></p>
                                <div style="margin-top: 1rem;">
                                    <a href="https://www.youtube.com/watch?v=<?= $video['youtube_id'] ?>" 
                                       target="_blank" class="btn">
                                        <i class="fas fa-play"></i> Watch Video
                                    </a>
                                    <a href="https://www.youtube.com/embed/<?= $video['youtube_id'] ?>?autoplay=1" 
                                       target="_blank" class="btn btn-secondary" style="margin-left: 0.5rem;">
                                        <i class="fas fa-external-link-alt"></i> Embed View
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <?php if (empty($videos)): ?>
                    <div style="text-align: center; padding: 3rem; color: #4a5568;">
                        <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <h3>No videos found</h3>
                        <p>Videos will be added soon for this course.</p>
                    </div>
                <?php endif; ?>
            </div>

        <?php elseif ($action === 'admin' && $isAdmin): ?>
            <div class="card">
                <h2><i class="fas fa-cog"></i> Admin Dashboard</h2>
                <p>Manage platform users, courses, and content.</p>
            </div>

            <div class="stats">
                <div class="stat-card">
                    <h3><?= $totalUsers ?></h3>
                    <p>Total Users</p>
                </div>
                <div class="stat-card">
                    <h3><?= count($batches) ?></h3>
                    <p>Active Courses</p>
                </div>
                <div class="stat-card">
                    <h3><?= $totalVideos ?></h3>
                    <p>Total Videos</p>
                </div>
                <div class="stat-card">
                    <h3>98%</h3>
                    <p>System Health</p>
                </div>
            </div>

            <div class="card">
                <h3><i class="fas fa-users"></i> User Management</h3>
                <?php
                $users = $pdo->query("SELECT * FROM users ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
                ?>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr>
                                <td><?= $user['id'] ?></td>
                                <td><?= htmlspecialchars($user['first_name'] . ' ' . $user['last_name']) ?></td>
                                <td><?= htmlspecialchars($user['email']) ?></td>
                                <td><span class="badge <?= $user['role'] ?>"><?= ucfirst($user['role']) ?></span></td>
                                <td><?= date('M j, Y', strtotime($user['created_at'])) ?></td>
                                <td>
                                    <button class="btn btn-secondary" style="font-size: 0.875rem; padding: 0.25rem 0.5rem;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn" style="background: #dc2626; font-size: 0.875rem; padding: 0.25rem 0.5rem; margin-left: 0.25rem;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <div class="card">
                <h3><i class="fas fa-book"></i> Course Management</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Videos</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($batches as $batch): ?>
                            <?php
                            $videoCount = $pdo->prepare("SELECT COUNT(*) FROM videos WHERE batch_id = ?");
                            $videoCount->execute([$batch['id']]);
                            $count = $videoCount->fetchColumn();
                            ?>
                            <tr>
                                <td><?= $batch['id'] ?></td>
                                <td><?= htmlspecialchars($batch['name']) ?></td>
                                <td><?= htmlspecialchars($batch['description']) ?></td>
                                <td><?= $count ?></td>
                                <td><?= date('M j, Y', strtotime($batch['created_at'])) ?></td>
                                <td>
                                    <button class="btn btn-secondary" style="font-size: 0.875rem; padding: 0.25rem 0.5rem;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn" style="background: #dc2626; font-size: 0.875rem; padding: 0.25rem 0.5rem; margin-left: 0.25rem;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

        <?php else: ?>
            <div class="card">
                <h2><i class="fas fa-exclamation-triangle"></i> Access Denied</h2>
                <p>You don't have permission to access this page or you need to login first.</p>
                <div style="margin-top: 1rem;">
                    <a href="?action=login" class="btn"><i class="fas fa-sign-in-alt"></i> Login</a>
                    <a href="?action=register" class="btn btn-secondary" style="margin-left: 1rem;">
                        <i class="fas fa-user-plus"></i> Register
                    </a>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <footer style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); color: white; text-align: center; padding: 2rem 0; margin-top: 3rem;">
        <div class="container">
            <p>&copy; 2024 Learn Here Free. Empowering minds through accessible education.</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">
                <i class="fas fa-heart" style="color: #ff6b6b;"></i> Made with love for learners worldwide
            </p>
        </div>
    </footer>

    <script>
        // Simple animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Add loading states to forms
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function() {
                    const button = form.querySelector('button[type="submit"]');
                    if (button) {
                        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                        button.disabled = true;
                    }
                });
            });
        });
    </script>
</body>
</html>