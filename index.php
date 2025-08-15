<?php
// Simple Educational Platform without Database (File-based storage)
// This will work even without database connection

session_start();

// Mock data (no database required)
$users = [
    'admin@learnherefree.com' => [
        'password' => password_hash('admin123', PASSWORD_DEFAULT),
        'name' => 'Admin User',
        'role' => 'admin'
    ],
    'student@test.com' => [
        'password' => password_hash('student123', PASSWORD_DEFAULT),
        'name' => 'Test Student',
        'role' => 'user'
    ]
];

$courses = [
    ['id' => 1, 'name' => 'Web Development Fundamentals', 'description' => 'Complete course on HTML, CSS, and JavaScript'],
    ['id' => 2, 'name' => 'Python Programming', 'description' => 'Learn Python from basics to advanced'],
    ['id' => 3, 'name' => 'Data Science with Python', 'description' => 'Data analysis and machine learning'],
    ['id' => 4, 'name' => 'React.js Development', 'description' => 'Modern frontend development with React']
];

$videos = [
    ['id' => 1, 'course_id' => 1, 'title' => 'HTML Basics - Structure and Elements', 'youtube_id' => 'UB1O30fR-EE'],
    ['id' => 2, 'course_id' => 1, 'title' => 'CSS Fundamentals - Styling Your Web Pages', 'youtube_id' => 'yfoY53QXEnI'],
    ['id' => 3, 'course_id' => 1, 'title' => 'JavaScript Essentials', 'youtube_id' => 'hdI2bqOjy3c'],
    ['id' => 4, 'course_id' => 2, 'title' => 'Python Basics - Variables and Data Types', 'youtube_id' => 'LHBE6Q9XlzI'],
    ['id' => 5, 'course_id' => 2, 'title' => 'Python Functions and Control Flow', 'youtube_id' => 'DQgE-D-n0_4'],
    ['id' => 6, 'course_id' => 3, 'title' => 'Data Analysis with Pandas', 'youtube_id' => 'vmEHCJofslg'],
    ['id' => 7, 'course_id' => 4, 'title' => 'React Components and JSX', 'youtube_id' => 'SqcY0GlETPk']
];

// Handle form submissions
$action = $_GET['action'] ?? 'home';
$message = '';

if ($_POST) {
    if ($action === 'login') {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        
        if (isset($users[$email]) && password_verify($password, $users[$email]['password'])) {
            $_SESSION['user_email'] = $email;
            $_SESSION['user_name'] = $users[$email]['name'];
            $_SESSION['user_role'] = $users[$email]['role'];
            $message = "✅ Welcome back, " . $users[$email]['name'] . "!";
            $action = 'dashboard';
        } else {
            $message = "❌ Invalid email or password";
        }
    } elseif ($action === 'logout') {
        session_destroy();
        $message = "✅ Logged out successfully";
        $action = 'home';
    }
}

$isLoggedIn = isset($_SESSION['user_email']);
$isAdmin = $isLoggedIn && $_SESSION['user_role'] === 'admin';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Here Free - Educational Platform</title>
    <meta name="description" content="Free educational platform with comprehensive courses in web development, programming, and data science.">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
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
        
        .nav-links { display: flex; gap: 1rem; flex-wrap: wrap; }
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
            margin: 0.25rem;
        }
        .btn:hover { 
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-secondary { 
            background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
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
        
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .nav { flex-direction: column; gap: 1rem; }
            .nav-links { justify-content: center; }
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
                        <a href="?action=logout" onclick="return confirm('Are you sure?')">
                            <i class="fas fa-sign-out-alt"></i> Logout (<?= $_SESSION['user_name'] ?>)
                        </a>
                    <?php else: ?>
                        <a href="?action=home"><i class="fas fa-home"></i> Home</a>
                        <a href="?action=login"><i class="fas fa-sign-in-alt"></i> Login</a>
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
                <a href="?action=login" class="btn">Get Started - Login</a>
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
                        <h3><?= count($courses) ?></h3>
                        <p>Active Courses</p>
                    </div>
                    <div class="stat-card">
                        <h3><?= count($videos) ?></h3>
                        <p>Video Lessons</p>
                    </div>
                    <div class="stat-card">
                        <h3>1000+</h3>
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
                
                <div style="margin-top: 1rem; padding: 1rem; background: #edf2f7; border-radius: 8px;">
                    <h4><i class="fas fa-info-circle"></i> Demo Accounts:</h4>
                    <p><strong>Admin:</strong> admin@learnherefree.com / admin123</p>
                    <p><strong>Student:</strong> student@test.com / student123</p>
                </div>
            </div>

        <?php elseif ($action === 'dashboard' && $isLoggedIn): ?>
            <div class="hero">
                <h1>Welcome back, <?= $_SESSION['user_name'] ?>!</h1>
                <p>Continue your learning journey with our comprehensive courses</p>
            </div>

            <div class="stats">
                <div class="stat-card">
                    <h3><?= count($courses) ?></h3>
                    <p>Available Courses</p>
                </div>
                <div class="stat-card">
                    <h3><?= count($videos) ?></h3>
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
                    <?php foreach ($courses as $course): ?>
                        <div class="video-card">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 150px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-play-circle" style="font-size: 3rem; color: white;"></i>
                            </div>
                            <div class="content">
                                <h3><?= htmlspecialchars($course['name']) ?></h3>
                                <p><?= htmlspecialchars($course['description']) ?></p>
                                <a href="?action=videos&course_id=<?= $course['id'] ?>" class="btn">Start Learning</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'courses' && $isLoggedIn): ?>
            <div class="card">
                <h2><i class="fas fa-book"></i> Available Courses</h2>
                <div class="grid">
                    <?php foreach ($courses as $course): ?>
                        <div class="video-card">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 200px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-graduation-cap" style="font-size: 4rem; color: white;"></i>
                            </div>
                            <div class="content">
                                <h3><?= htmlspecialchars($course['name']) ?></h3>
                                <p><?= htmlspecialchars($course['description']) ?></p>
                                <a href="?action=videos&course_id=<?= $course['id'] ?>" class="btn">View Videos</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

        <?php elseif ($action === 'videos' && $isLoggedIn): ?>
            <?php 
            $course_id = $_GET['course_id'] ?? null;
            $video_id = $_GET['video_id'] ?? null;
            
            if ($video_id) {
                $current_video = array_filter($videos, fn($v) => $v['id'] == $video_id);
                $current_video = reset($current_video);
            }
            
            $course_videos = $course_id ? array_filter($videos, fn($v) => $v['course_id'] == $course_id) : $videos;
            $current_course = $course_id ? array_filter($courses, fn($c) => $c['id'] == $course_id) : null;
            $current_course = $current_course ? reset($current_course) : null;
            ?>
            
            <?php if ($current_video): ?>
                <div class="card">
                    <h2><i class="fas fa-play-circle"></i> <?= htmlspecialchars($current_video['title']) ?></h2>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe 
                            src="https://www.youtube-nocookie.com/embed/<?= $current_video['youtube_id'] ?>?rel=0&modestbranding=1&showinfo=0" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div style="margin-top: 1rem;">
                        <a href="?action=videos&course_id=<?= $course_id ?>" class="btn btn-secondary">Back to Course</a>
                    </div>
                </div>
            <?php endif; ?>
            
            <div class="card">
                <h2><i class="fas fa-video"></i> 
                    <?= $current_course ? htmlspecialchars($current_course['name']) . ' - Videos' : 'All Videos' ?>
                </h2>
                <div class="grid">
                    <?php foreach ($course_videos as $video): ?>
                        <div class="video-card">
                            <img src="https://img.youtube.com/vi/<?= $video['youtube_id'] ?>/maxresdefault.jpg" 
                                 alt="<?= htmlspecialchars($video['title']) ?>">
                            <div class="content">
                                <h3><?= htmlspecialchars($video['title']) ?></h3>
                                <a href="?action=videos&course_id=<?= $course_id ?>&video_id=<?= $video['id'] ?>" class="btn">
                                    <i class="fas fa-play"></i> Watch Video
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>