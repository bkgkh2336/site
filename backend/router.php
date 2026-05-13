<?php
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$docRoot = dirname(__DIR__);
$filePath = $docRoot . $requestUri;

if (strpos($requestUri, '/backend') === 0 || strpos($requestUri, '/api.php') === 0) {
    if (strpos($requestUri, '/backend') === 0) {
        $newPath = substr($requestUri, 8);
    } else {
        $newPath = $requestUri;
    }

    $_SERVER['REQUEST_URI'] = $newPath;
    require_once __DIR__ . '/api.php';
    exit;
}

// Если это файл — отдаём как есть
if (is_file($filePath)) {
    return false;
}

// Если это папка с index файлом — отдаём её
if (is_dir($filePath) && (is_file($filePath . '/index.html') || is_file($filePath . '/index.php'))) {
    return false;
}

// Всё остальное — SPA
header('Content-Type: text/html');
echo file_get_contents($docRoot . '/index.html');
