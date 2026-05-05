<?php
header("Content-Type: application/json; charset=utf-8");

$result = [
    'php_version' => phpversion(),
    'extensions' => [],
    'db_file_exists' => false,
    'db_path' => '',
    'db_writable' => false,
    'pdo_available' => false,
    'sqlite_available' => false,
    'error' => null
];

// Проверяем расширения
$result['extensions'] = get_loaded_extensions();
$result['pdo_available'] = extension_loaded('pdo');
$result['sqlite_available'] = extension_loaded('pdo_sqlite') || extension_loaded('sqlite3');

// Проверяем файл БД
$dbPath = __DIR__ . "/contacts.db";
$result['db_path'] = $dbPath;
$result['db_file_exists'] = file_exists($dbPath);

if (file_exists($dbPath)) {
    $result['db_writable'] = is_writable($dbPath);
    $result['db_size'] = filesize($dbPath);
    $result['db_permissions'] = substr(sprintf('%o', fileperms($dbPath)), -4);
}

// Пробуем подключиться
if ($result['pdo_available'] && $result['sqlite_available'] && $result['db_file_exists']) {
    try {
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Пробуем сделать запрос
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM contacts");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $result['db_connection'] = 'OK';
        $result['contacts_count'] = $row['cnt'];
        
        // Проверяем все таблицы
        $tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll(PDO::FETCH_ASSOC);
        $result['tables'] = array_column($tables, 'name');
        
    } catch (Exception $e) {
        $result['db_connection'] = 'ERROR';
        $result['error'] = $e->getMessage();
    }
} else {
    $result['db_connection'] = 'Cannot connect - missing extensions or DB file';
}

echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);