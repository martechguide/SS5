<?php
// PHP Version and Environment Check for Educational Platform

echo "<h1>🔧 Server Environment Check</h1>";

// PHP Version Check
echo "<h2>📌 PHP Information</h2>";
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "<p><strong>Server Software:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p><strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "</p>";

// Check if Node.js is available
echo "<h2>📌 Node.js Check</h2>";
$node_version = shell_exec('node --version 2>&1');
if ($node_version) {
    echo "<p style='color: green;'><strong>✅ Node.js:</strong> " . trim($node_version) . "</p>";
} else {
    echo "<p style='color: red;'><strong>❌ Node.js:</strong> Not found or not accessible</p>";
}

// Check npm
$npm_version = shell_exec('npm --version 2>&1');
if ($npm_version) {
    echo "<p style='color: green;'><strong>✅ NPM:</strong> " . trim($npm_version) . "</p>";
} else {
    echo "<p style='color: red;'><strong>❌ NPM:</strong> Not found or not accessible</p>";
}

// Database Extensions Check
echo "<h2>📌 Database Support</h2>";
if (extension_loaded('pdo_mysql')) {
    echo "<p style='color: green;'><strong>✅ MySQL PDO:</strong> Available</p>";
} else {
    echo "<p style='color: red;'><strong>❌ MySQL PDO:</strong> Not available</p>";
}

if (extension_loaded('mysqli')) {
    echo "<p style='color: green;'><strong>✅ MySQLi:</strong> Available</p>";
} else {
    echo "<p style='color: red;'><strong>❌ MySQLi:</strong> Not available</p>";
}

// Check required PHP extensions
echo "<h2>📌 Required Extensions</h2>";
$required_extensions = ['json', 'session', 'curl', 'openssl', 'mbstring'];
foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "<p style='color: green;'><strong>✅ $ext:</strong> Available</p>";
    } else {
        echo "<p style='color: red;'><strong>❌ $ext:</strong> Not available</p>";
    }
}

// File Permissions Check
echo "<h2>📌 File Permissions</h2>";
$check_dirs = ['.', 'uploads', 'temp', 'logs'];
foreach ($check_dirs as $dir) {
    if (is_dir($dir)) {
        $perms = substr(sprintf('%o', fileperms($dir)), -4);
        if (is_writable($dir)) {
            echo "<p style='color: green;'><strong>✅ $dir/:</strong> Writable ($perms)</p>";
        } else {
            echo "<p style='color: orange;'><strong>⚠️ $dir/:</strong> Read-only ($perms)</p>";
        }
    } else {
        echo "<p style='color: gray;'><strong>ℹ️ $dir/:</strong> Directory not found</p>";
    }
}

// Memory and Limits
echo "<h2>📌 Server Limits</h2>";
echo "<p><strong>Memory Limit:</strong> " . ini_get('memory_limit') . "</p>";
echo "<p><strong>Max Execution Time:</strong> " . ini_get('max_execution_time') . " seconds</p>";
echo "<p><strong>Upload Max Size:</strong> " . ini_get('upload_max_filesize') . "</p>";
echo "<p><strong>Post Max Size:</strong> " . ini_get('post_max_size') . "</p>";

// Test Database Connection (if configured)
echo "<h2>📌 Database Connection Test</h2>";
if (file_exists('.env')) {
    echo "<p style='color: green;'><strong>✅ .env file:</strong> Found</p>";
    // Parse .env file
    $env = parse_ini_file('.env');
    if (isset($env['DB_HOST']) && isset($env['DB_USER'])) {
        try {
            $pdo = new PDO(
                "mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']}", 
                $env['DB_USER'], 
                $env['DB_PASSWORD']
            );
            echo "<p style='color: green;'><strong>✅ Database:</strong> Connection successful</p>";
        } catch (PDOException $e) {
            echo "<p style='color: red;'><strong>❌ Database:</strong> " . $e->getMessage() . "</p>";
        }
    }
} else {
    echo "<p style='color: orange;'><strong>⚠️ .env file:</strong> Not found</p>";
}

// Recommendations
echo "<h2>🎯 Recommendations</h2>";
if (version_compare(phpversion(), '8.0', '<')) {
    echo "<p style='color: orange;'>⚠️ Consider upgrading to PHP 8.0+ for better performance</p>";
}

if (!$node_version) {
    echo "<p style='color: red;'>❌ Node.js is required for this application. Please enable it in your hosting panel.</p>";
}

echo "<hr>";
echo "<p><small>Generated on: " . date('Y-m-d H:i:s') . "</small></p>";
echo "<p><small>For Educational Platform Deployment Check</small></p>";
?>