<?php
// Database connection test for CloudPanel
echo "<h2>Server Configuration Test</h2>";

echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";
echo "<p><strong>Server Software:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p><strong>Document Root:</strong> " . $_SERVER['DOCUMENT_ROOT'] . "</p>";
echo "<p><strong>Script Name:</strong> " . $_SERVER['SCRIPT_NAME'] . "</p>";

// Test database connection
$host = 'localhost';
$database = 'eduplatform';
$username = 'eduplatform';
$password = 'Learning@2025';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<p style='color: green;'><strong>Database Connection:</strong> SUCCESS</p>";
    
    // Test table creation
    $sql = "CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "<p style='color: green;'><strong>Table Creation:</strong> SUCCESS</p>";
    
} catch(PDOException $e) {
    echo "<p style='color: red;'><strong>Database Error:</strong> " . $e->getMessage() . "</p>";
}

echo "<h3>PHP Extensions:</h3>";
$extensions = ['pdo', 'pdo_mysql', 'session', 'json'];
foreach($extensions as $ext) {
    $status = extension_loaded($ext) ? 'LOADED' : 'NOT LOADED';
    $color = extension_loaded($ext) ? 'green' : 'red';
    echo "<p style='color: $color;'>$ext: $status</p>";
}

echo "<h3>Directory Permissions:</h3>";
$dir = __DIR__;
echo "<p><strong>Current Directory:</strong> $dir</p>";
echo "<p><strong>Is Writable:</strong> " . (is_writable($dir) ? 'YES' : 'NO') . "</p>";
echo "<p><strong>Directory Contents:</strong></p>";
echo "<pre>";
print_r(scandir($dir));
echo "</pre>";
?>