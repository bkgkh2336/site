<?php
// 1. Настройки CORS и заголовки для безопасности
// Ограничиваем CORS конкретным доменом (замените на ваш домен в продакшене)
$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
// В продакшене раскомментируйте и укажите ваш домен:
// $allowedOrigins = ['https://yourdomain.com', 'https://www.yourdomain.com'];
// if (in_array($allowedOrigin, $allowedOrigins)) {
//     header("Access-Control-Allow-Origin: $allowedOrigin");
// }
header("Access-Control-Allow-Origin: *"); // Временно для разработки
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

// Если это проверочный запрос (preflight), сразу отвечаем "ОК"
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Отключаем отображение ошибок в продакшене
ini_set("display_errors", 0);
error_reporting(0);

// Секретный ключ для JWT (в продакшене должен быть в .env файле)
define('JWT_SECRET', 'your-super-secret-key-change-this-in-production-2026');
define('JWT_EXPIRY', 3600); // 1 час

/**
 * Генерация JWT токена
 */
function generateJWT($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload['iat'] = time();
    $payload['exp'] = time() + JWT_EXPIRY;
    $payload = json_encode($payload);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, JWT_SECRET, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}

/**
 * Валидация JWT токена
 */
function validateJWT($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return null;
    }
    
    [$base64Header, $base64Payload, $base64Signature] = $parts;
    
    // Проверяем подпись
    $signature = base64_decode(str_replace(['-', '_'], ['+', '/'], $base64Signature));
    $expectedSignature = hash_hmac('sha256', $base64Header . "." . $base64Payload, JWT_SECRET, true);
    
    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }
    
    // Декодируем payload
    $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $base64Payload)), true);
    
    // Проверяем срок действия
    if (!isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }
    
    return $payload;
}

/**
 * Проверка авторизации из заголовка
 */
function checkAuth() {
    // Пробуем получить заголовок Authorization разными способами
    $authHeader = '';
    
    // Способ 1: через getallheaders()
    $headers = @getallheaders();
    if ($headers && isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } elseif ($headers && isset($headers['authorization'])) {
        $authHeader = $headers['authorization'];
    }
    
    // Способ 2: через $_SERVER
    if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
           $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    // Способ 3: через REDIRECT_HTTP_AUTHORIZATION
    if (empty($authHeader) && isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
    
    error_log("=== AUTH CHECK START ===");
    error_log("Auth header: " . $authHeader);
    
    if (empty($authHeader)) {
        error_log("No Authorization header found");
        error_log("=== AUTH CHECK END (NO HEADER) ===");
        return null;
    }
    
    if (!preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        error_log("No Bearer token found in header");
        error_log("=== AUTH CHECK END (NO TOKEN) ===");
        return null;
    }
    
    $token = $matches[1];
    error_log("Token found: " . substr($token, 0, 30) . "...");
    error_log("Token length: " . strlen($token));
    
    $result = validateJWT($token);
    error_log("JWT validation result: " . ($result ? "valid" : "invalid"));
    
    if (!$result) {
        error_log("JWT validation failed - checking token parts...");
        $parts = explode('.', $token);
        error_log("Token parts count: " . count($parts));
        if (count($parts) === 3) {
            error_log("Header: " . $parts[0]);
            error_log("Payload: " . $parts[1]);
            error_log("Signature: " . $parts[2]);
        }
    }
    
    error_log("=== AUTH CHECK END ===");
    return $result;
}

/**
 * Отправка ответа об ошибке авторизации
 */
function authError() {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
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
            $token = generateJWT([
                'user' => 'admin',
                'role' => 'administrator'
            ]);
            echo json_encode(["success" => true, "token" => $token]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Неверный пароль"]);
        }
        exit;
    }
    
    // --- РОУТ: Проверка токена (/api/verify) ---
    if ($tableName === "verify" && $method === "GET") {
        $user = checkAuth();
        if ($user) {
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
        }
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
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'description', 'head', 'phone', 'email', 'src'],
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
                // Whitelist разрешенных полей для каждой таблицы
                $allowedFields = [
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'description', 'head', 'phone', 'email'],
                    'phone_departments' => ['name', 'phone', 'description'],
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
                echo json_encode(["message" => "Updated"]);
            }
        }
        elseif ($method === "DELETE" && $id) {
            // Проверяем авторизацию для DELETE запросов
            $user = checkAuth();
            if (!$user) {
                authError();
            }
            
            $sql = "DELETE FROM $tableName WHERE id = ?";
            $pdo->prepare($sql)->execute([$id]);
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
