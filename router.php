<?php
// Простой маршрутизатор для PHP-сервера
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Если запрос начинается с /backend или /api.php, перенаправляем на backend/api.php
if (strpos($requestUri, '/backend') === 0 || strpos($requestUri, '/api.php') === 0) {
    // Если запрос начинается с /backend, убираем /backend из пути
    if (strpos($requestUri, '/backend') === 0) {
        $newPath = substr($requestUri, 8); // удаляем первые 8 символов "/backend"
    } else {
        // Если запрос уже начинается с /api.php, используем его как есть
        $newPath = $requestUri;
    }

    // Перенаправляем запрос на backend/api.php
    $_SERVER['REQUEST_URI'] = $newPath;
    require_once __DIR__ . '/backend/api.php';
    exit;
}

// Для всех остальных запросов - возвращаем index.html (для SPA)
header('Content-Type: text/html');
echo file_get_contents(__DIR__ . '/index.html');
