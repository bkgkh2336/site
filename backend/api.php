<?php
// 1. Настройки CORS и заголовки для безопасности
// Настройка CORS
$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isProduction = APP_ENV === 'production';

if ($isProduction) {
    // В продакшене разрешаем только указанные домены
    $allowedOrigins = array_filter(array_map('trim', explode(',', getenv('CORS_ORIGINS') ?: '')));
    if (!empty($allowedOrigins) && in_array($allowedOrigin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $allowedOrigin");
    }
} else {
    // В режиме разработки разрешаем localhost
    $devOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
    ];
    if (in_array($allowedOrigin, $devOrigins)) {
        header("Access-Control-Allow-Origin: $allowedOrigin");
    }
}
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // Разрешаем куки
header("Content-Type: application/json; charset=utf-8");

// Если это проверочный запрос (preflight), сразу отвечаем "ОК"
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Отключаем отображение ошибок в продакшене
ini_set("display_errors", 0);
error_reporting(0);

// Загрузка переменных окружения из .env файла
function loadEnv($path) {
    if (!file_exists($path)) return false;
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        
        list($name, $value) = array_map('trim', explode('=', $line, 2));
        if ($name && $value) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
    return true;
}

// Загружаем .env
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    loadEnv($envPath);
}

// Секретный ключ для токена сессии (из .env или дефолтный для разработки)
define('SESSION_SECRET', getenv('SESSION_SECRET') ?: 'dev-secret-key-change-in-production');
define('SESSION_EXPIRY', (int)(getenv('SESSION_EXPIRY') ?: 3600)); // 1 час по умолчанию
define('APP_ENV', getenv('APP_ENV') ?: 'development');

/**
 * Генерация токена сессии
 */
function generateSessionToken($data) {
    $payload = json_encode([
        'user' => $data['user'] ?? 'admin',
        'role' => $data['role'] ?? 'administrator',
        'exp' => time() + SESSION_EXPIRY
    ]);
    
    $signature = hash_hmac('sha256', $payload, SESSION_SECRET, true);
    return base64_encode($payload) . '.' . base64_encode($signature);
}

/**
 * Валидация токена сессии из куки
 */
function validateSessionToken($token) {
    if (empty($token)) return null;
    
    $parts = explode('.', $token);
    if (count($parts) !== 2) return null;
    
    [$payloadB64, $signatureB64] = $parts;
    
    $payload = base64_decode($payloadB64);
    $signature = base64_decode($signatureB64);
    
    // Проверяем подпись
    $expectedSignature = hash_hmac('sha256', $payload, SESSION_SECRET, true);
    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }
    
    $data = json_decode($payload, true);
    
    // Проверяем срок действия
    if (!isset($data['exp']) || $data['exp'] < time()) {
        return null;
    }
    
    return $data;
}

/**
 * Проверка авторизации через httpOnly куки
 */
function checkAuth() {
    // Получаем токен из куки
    $token = $_COOKIE['admin_session'] ?? '';
    
    if (empty($token)) {
        return null;
    }
    
    return validateSessionToken($token);
}

/**
 * Отправка ответа об ошибке авторизации
 */
function authError() {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

/**
 * Удаление файла изображения, если он не используется
 */
function deleteImageIfUnused($imagePath, $pdo, $currentContactId = null) {
    if (empty($imagePath)) return false;
    
    // Извлекаем имя файла из пути (например, "/uploads/filename.jpg")
    $filename = basename($imagePath);
    $filePath = __DIR__ . '/../public/uploads/' . $filename;
    
    if (!file_exists($filePath)) return false;
    
    // Проверяем, используется ли фото в таблице contacts
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM contacts WHERE src = ? AND id != ?");
    $stmt->execute([$imagePath, $currentContactId ?? 0]);
    $count = $stmt->fetchColumn();
    
    // Проверяем, используется ли фото в таблице departments
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM departments WHERE src = ?");
    $stmt->execute([$imagePath]);
    $count += $stmt->fetchColumn();
    
    if ($count == 0) {
        unlink($filePath);
        return true;
    }
    
    return false;
}

// 2. Пути к базе и JSON (файлы лежат в той же папке backend/)
$dbPath = __DIR__ . "/contacts.db";

// Список всех таблиц из твоего старого server.js
$validTables = [
    "contacts", "phone_contacts", "departments", "phone_departments",
    "documents_group", "documents", "ventilation_services", "waste_services",
    "electro_services", "grass_services", "heating_services", "plumbing_services",
    "el_inst_services", "transport_price_population_and_budget",
    "transport_population_and_budget", "transport_price_jur", "transport_jur",
    "transport_price_other", "transport_other", "schedule_reception"
];

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 3. Умное определение маршрута (чтобы не было undefined в React)
    $requestUri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

    // Ищем, какая таблица запрошена после /api/
    $afterApi = (strpos($requestUri, "/api/") !== false)
                ? substr($requestUri, strpos($requestUri, "/api/") + 5)
                : $requestUri;

    $parts = explode("/", trim($afterApi, "/"));
    $tableName = $parts[0] ?? "";
    $id = $parts[1] ?? null;

    $method = $_SERVER["REQUEST_METHOD"];

    // --- РОУТ: Авторизация (/api/login) ---
    if ($tableName === "login" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $password = $data["password"] ?? "";
        
        // Хеш пароля (в продакшене должен быть в БД или .env)
        // Сгенерируйте хеш: php generate_hash.php "ваш_пароль"
        $passwordHash = '$2y$12$rarAoqlerZubcUTgR3ExDuLflIMyH22F5xnLbrCg1p38DQcpv5Q5C';
        
        if (password_verify($password, $passwordHash)) {
            $sessionToken = generateSessionToken([
                'user' => 'admin',
                'role' => 'administrator'
            ]);
            
            // Устанавливаем httpOnly куку
            $isSecure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
            setcookie(
                'admin_session',
                $sessionToken,
                [
                    'expires' => time() + SESSION_EXPIRY,
                    'path' => '/',
                    'domain' => '', // Автоматически из текущего домена
                    'secure' => $isSecure, // true в продакшене (HTTPS)
                    'httponly' => true, // Недоступно через JavaScript
                    'samesite' => 'Lax' // Защита от CSRF
                ]
            );
            
            echo json_encode(["success" => true, "message" => "Logged in"]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Неверный пароль"]);
        }
        exit;
    }
    
    // --- РОУТ: Проверка сессии (/api/verify) ---
    if ($tableName === "verify" && $method === "GET") {
        $user = checkAuth();
        if ($user) {
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid or expired session"]);
        }
        exit;
    }
    
    // --- РОУТ: Выход (/api/logout) ---
    if ($tableName === "logout" && $method === "POST") {
        // Удаляем куку
        setcookie(
            'admin_session',
            '',
            [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '',
                'secure' => false, // true в продакшене
                'httponly' => true,
                'samesite' => 'Lax'
            ]
        );
        echo json_encode(["success" => true, "message" => "Logged out"]);
        exit;
    }
    
    // --- РОУТ: Очистка неиспользуемых файлов (/api/cleanup) ---
    if ($tableName === "cleanup" && $method === "POST") {
        $user = checkAuth();
        if (!$user) {
            authError();
        }
        
        $uploadDir = __DIR__ . '/../public/uploads/';
        if (!is_dir($uploadDir)) {
            echo json_encode(["success" => true, "message" => "No uploads directory"]);
            exit;
        }
        
        // Получаем все файлы из папки uploads
        $files = scandir($uploadDir);
        $deletedCount = 0;
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            
            $filePath = $uploadDir . $file;
            if (!is_file($filePath)) continue;
            
            $imagePath = '/uploads/' . $file;
            
            // Проверяем, используется ли файл
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM contacts WHERE src = ?");
            $stmt->execute([$imagePath]);
            $count = $stmt->fetchColumn();
            
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM departments WHERE src = ?");
            $stmt->execute([$imagePath]);
            $count += $stmt->fetchColumn();
            
            if ($count == 0) {
                unlink($filePath);
                $deletedCount++;
            }
        }
        
        echo json_encode(["success" => true, "message" => "Cleanup completed", "deleted" => $deletedCount]);
        exit;
    }
    
    // --- РОУТ: Загрузка изображений (/api/upload) ---
    if ($tableName === "upload" && $method === "POST") {
        // Проверяем авторизацию
        $user = checkAuth();
        if (!$user) {
            authError();
        }
        
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No image uploaded"]);
            exit;
        }
        
        $file = $_FILES['image'];
        $fileName = basename($file['name']);
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        // Проверяем расширение
        $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($fileExt, $allowedExts)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid file type"]);
            exit;
        }
        
        // Генерируем уникальное имя файла
        $newFileName = uniqid() . '_' . time() . '.' . $fileExt;
        $uploadPath = __DIR__ . '/../public/uploads/' . $newFileName;
        
        // Создаем директорию если не существует
        $uploadDir = dirname($uploadPath);
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            echo json_encode([
                "success" => true, 
                "path" => "/uploads/" . $newFileName,
                "filename" => $newFileName
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to upload file"]);
        }
        exit;
    }

    // --- РОУТ: Транспортные услуги (сложные JOIN) ---
    if ($method === "GET") {
        if ($tableName === "transport_services") {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price_no_nds FROM transport_price_population_and_budget tp JOIN transport_population_and_budget t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if ($tableName === "transport_jur_services") {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_jur tp JOIN transport_jur t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if ($tableName === "transport_other_services") {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_other tp JOIN transport_other t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
    }

    // --- РОУТ: Универсальные таблицы (GET, POST, PUT, DELETE) ---
    if (in_array($tableName, $validTables)) {
        if ($method === "GET") {
            $stmt = $pdo->query("SELECT * FROM $tableName");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data ?: []); // Если пусто, возвращаем [], а не null
        }
        elseif ($method === "POST") {
            // Проверяем авторизацию для POST запросов
            $user = checkAuth();
            if (!$user) {
                authError();
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            if (!empty($data)) {
                // Whitelist разрешенных полей для каждой таблицы
                $allowedFields = [
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src', 'is_primary'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'description', 'head', 'phone', 'email'],
                    'phone_departments' => ['id_department', 'phone', 'is_fax'],
                    'documents_group' => ['name', 'description'],
                    'documents' => ['name', 'group_id', 'file_path', 'description'],
                    'ventilation_services' => ['name', 'description', 'price', 'unit'],
                    'waste_services' => ['name', 'description', 'price', 'unit'],
                    'electro_services' => ['name', 'description', 'price', 'unit'],
                    'grass_services' => ['name', 'description', 'price', 'unit'],
                    'heating_services' => ['name', 'description', 'price', 'unit'],
                    'plumbing_services' => ['name', 'description', 'price', 'unit'],
                    'el_inst_services' => ['name', 'description', 'price', 'unit'],
                    'transport_price_population_and_budget' => ['id_transport', 'unit', 'price_no_nds'],
                    'transport_population_and_budget' => ['name', 'description'],
                    'transport_price_jur' => ['id_transport', 'unit', 'price'],
                    'transport_jur' => ['name', 'description'],
                    'transport_price_other' => ['id_transport', 'unit', 'price'],
                    'transport_other' => ['name', 'description'],
                    'schedule_reception' => ['day', 'time_start', 'time_end', 'description']
                ];
                
                $tableAllowedFields = $allowedFields[$tableName] ?? [];
                $fields = []; 
                $placeholders = [];
                $values = [];
                
                foreach ($data as $key => $val) {
                    if (!in_array($key, $tableAllowedFields)) {
                        continue;
                    }
                    $sanitizedVal = is_string($val) ? strip_tags($val) : $val;
                    $fields[] = $key;
                    $placeholders[] = '?';
                    $values[] = $sanitizedVal;
                }
                
                if (empty($fields)) {
                    http_response_code(400);
                    echo json_encode(["error" => "No valid fields"]);
                    exit;
                }
                
                $sql = "INSERT INTO $tableName (" . implode(", ", $fields) . ") VALUES (" . implode(", ", $placeholders) . ")";
                $pdo->prepare($sql)->execute($values);
                echo json_encode(["message" => "Created", "id" => $pdo->lastInsertId()]);
            }
        } 
        elseif ($method === "PUT" && $id) {
            // Проверяем авторизацию для PUT запросов
            $user = checkAuth();
            if (!$user) {
                authError();
            }
            
            $data = json_decode(file_get_contents("php://input"), true);
            if (!empty($data)) {
                // НЕ ТРОГАТЬ
                $allowedFields = [
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'description', 'email', 'src'],
                    'phone_departments' => ['id_department', 'phone', 'is_fax'],
                    'documents_group' => ['name', 'description'],
                    'documents' => ['name', 'group_id', 'file_path', 'description'],
                    'ventilation_services' => ['name', 'description', 'price', 'unit'],
                    'waste_services' => ['name', 'description', 'price', 'unit'],
                    'electro_services' => ['name', 'description', 'price', 'unit'],
                    'grass_services' => ['name', 'description', 'price', 'unit'],
                    'heating_services' => ['name', 'description', 'price', 'unit'],
                    'plumbing_services' => ['name', 'description', 'price', 'unit'],
                    'el_inst_services' => ['name', 'description', 'price', 'unit'],
                    'transport_price_population_and_budget' => ['id_transport', 'unit', 'price_no_nds'],
                    'transport_population_and_budget' => ['name', 'description'],
                    'transport_price_jur' => ['id_transport', 'unit', 'price'],
                    'transport_jur' => ['name', 'description'],
                    'transport_price_other' => ['id_transport', 'unit', 'price'],
                    'transport_other' => ['name', 'description'],
                    'schedule_reception' => ['day', 'time_start', 'time_end', 'description']
                ];
                
                $tableAllowedFields = $allowedFields[$tableName] ?? [];
                $fields = []; 
                $values = [];
                
                // Получаем текущие данные контакта (для проверки старого фото)
                $oldData = null;
                if ($tableName === 'contacts') {
                    $stmt = $pdo->prepare("SELECT src FROM $tableName WHERE id = ?");
                    $stmt->execute([$id]);
                    $oldData = $stmt->fetch(PDO::FETCH_ASSOC);
                }
                
                foreach ($data as $key => $val) {
                    if ($key === "id") continue;
                    // Проверяем, что поле разрешено
                    if (!in_array($key, $tableAllowedFields)) {
                        continue; // Пропускаем неразрешенные поля
                    }
                    // Базовая санитизация значений
                    $sanitizedVal = is_string($val) ? strip_tags($val) : $val;
                    $fields[] = "$key = ?"; 
                    $values[] = $sanitizedVal;
                }
                
                if (empty($fields)) {
                    http_response_code(400);
                    echo json_encode(["error" => "No valid fields to update"]);
                    exit;
                }
                
                $values[] = $id;
                $sql = "UPDATE $tableName SET " . implode(", ", $fields) . " WHERE id = ?";
                $pdo->prepare($sql)->execute($values);
                
                // Если обновляли поле src и оно изменилось, удаляем старое фото
                if (($tableName === 'contacts' || $tableName === 'departments') && $oldData) {
                    $newSrc = $data['src'] ?? '';
                    if (($oldData['src'] ?? '') !== $newSrc) {
                        deleteImageIfUnused($oldData['src'] ?? '', $pdo, $id);
                    }
                }
                
                echo json_encode(["message" => "Updated", "id" => $id]);
            }
        }
        elseif ($method === "DELETE" && $id) {
            // Проверяем авторизацию для DELETE запросов
            $user = checkAuth();
            if (!$user) {
                authError();
            }
            
            // Получаем данные контакта перед удалением (для фото)
            $oldData = null;
            if ($tableName === 'contacts' || $tableName === 'departments') {
                $stmt = $pdo->prepare("SELECT src FROM $tableName WHERE id = ?");
                $stmt->execute([$id]);
                $oldData = $stmt->fetch(PDO::FETCH_ASSOC);
            }
            
            $sql = "DELETE FROM $tableName WHERE id = ?";
            $pdo->prepare($sql)->execute([$id]);
            
            // Удаляем фото, если оно не используется другими записями
            if ($oldData && !empty($oldData['src'])) {
                deleteImageIfUnused($oldData['src'], $pdo);
            }
            
            echo json_encode(["message" => "Deleted"]);
        }
    } else {
        // Если таблица не найдена, возвращаем пустой массив, чтобы React не падал с ошибкой .length
        echo json_encode([]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage(), "trace" => "DB error"]);
}
