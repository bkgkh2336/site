<?php
// Router for /backend requests
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Only handle /backend requests
if (strpos($requestUri, '/backend') === 0) {
    // Remove /backend prefix (first 8 characters)
    $newPath = substr($requestUri, 8);
    
    // Full path to the file in backend/ folder
    $backendFile = __DIR__ . '/backend' . $newPath;
    
    // If the requested file exists and is a file (not directory)
    if (file_exists($backendFile) && is_file($backendFile)) {
        $ext = strtolower(pathinfo($backendFile, PATHINFO_EXTENSION));
        
        // If it's api.php, we want to route it through the API handler
        if (basename($backendFile) === 'api.php') {
            // Set REQUEST_URI to the path after /backend
            $_SERVER['REQUEST_URI'] = $newPath;
            require_once $backendFile;
            exit;
        }
        
        // For other PHP files, execute them directly
        if ($ext === 'php') {
            require_once $backendFile;
            exit;
        }
        
        // For non-PHP files, serve with appropriate Content-Type
        $mimeTypes = [
            'json' => 'application/json',
            'txt' => 'text/plain',
            'log' => 'text/plain',
            'db' => 'application/octet-stream',
            'sqlite' => 'application/octet-stream',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'html' => 'text/html'
        ];
        $contentType = $mimeTypes[$ext] ?? (mime_content_type($backendFile) ?: 'application/octet-stream');
        header('Content-Type: ' . $contentType);
        echo file_get_contents($backendFile);
        exit;
    }
    
    // If no file exists, assume it's an API request
    // Set REQUEST_URI to the path after /backend
    $_SERVER['REQUEST_URI'] = $newPath;
    require_once __DIR__ . '/backend/api.php';
    exit;
}

// If accessed without /backend prefix, return 404
http_response_code(404);
echo 'Not Found';