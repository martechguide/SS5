<?php
session_start();

// Simple login check
$logged_in = isset($_SESSION['user']);

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['email'] === 'admin@learnherefree.com' && $_POST['password'] === 'admin123') {
        $_SESSION['user'] = 'admin';
        $logged_in = true;
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Learn Here Free - Educational Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .login-form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; margin: 50px auto; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }
        .btn { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; }
        .btn:hover { background: #1d4ed8; }
        .dashboard { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .course-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
        .course-card { background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .video-container { position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 20px 0; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 10px; }
        .logout { float: right; background: #dc2626; }
        .logout:hover { background: #b91c1c; }
    </style>
</head>
<body>
    <div class="container">
        <?php if (!$logged_in): ?>
            <div class="login-form">
                <h2 style="text-align: center; margin-bottom: 30px; color: #2563eb;">Login to Learn Here Free</h2>
                <form method="POST">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" required placeholder="admin@learnherefree.com">
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" required placeholder="admin123">
                    </div>
                    <button type="submit" name="login" class="btn">Login</button>
                </form>
                <p style="text-align: center; margin-top: 20px; color: #666;">
                    Demo Login: admin@learnherefree.com / admin123
                </p>
            </div>
        <?php else: ?>
            <div class="header">
                <h1>Welcome to Learn Here Free</h1>
                <p>Your Educational Journey Starts Here</p>
                <a href="?logout=1" class="btn logout">Logout</a>
            </div>
            
            <div class="dashboard">
                <h2>Available Courses</h2>
                
                <div class="course-grid">
                    <div class="course-card">
                        <h3>Web Development Fundamentals</h3>
                        <p>Learn HTML, CSS, and JavaScript from scratch</p>
                        <div class="video-container">
                            <iframe src="https://www.youtube-nocookie.com/embed/UB1O30fR-EE" 
                                    title="HTML Tutorial" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    
                    <div class="course-card">
                        <h3>React.js Mastery</h3>
                        <p>Build modern web applications with React</p>
                        <div class="video-container">
                            <iframe src="https://www.youtube-nocookie.com/embed/Ke90Tje7VS0" 
                                    title="React Tutorial" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    
                    <div class="course-card">
                        <h3>Node.js Backend Development</h3>
                        <p>Server-side programming with Node.js</p>
                        <div class="video-container">
                            <iframe src="https://www.youtube-nocookie.com/embed/TlB_eWDSMt4" 
                                    title="Node.js Tutorial" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    
                    <div class="course-card">
                        <h3>Database Design</h3>
                        <p>Learn SQL and database management</p>
                        <div class="video-container">
                            <iframe src="https://www.youtube-nocookie.com/embed/HXV3zeQKqGY" 
                                    title="SQL Tutorial" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>