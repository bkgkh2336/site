<?php
// 1. РќР°СЃС‚СЂРѕР№РєРё CORS Рё Р·Р°РіРѕР»РѕРІРєРё Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё
$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://bkgkh.by', 'https://www.bkgkh.by'];

if (in_array($allowedOrigin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
} else {
    // Р Р°Р·СЂРµС€Р°РµРј Р»РѕРєР°Р»СЊРЅСѓСЋ СЂР°Р·СЂР°Р±РѕС‚РєСѓ, РµСЃР»Рё РЅСѓР¶РЅРѕ, РёР»Рё РѕСЃС‚Р°РІР»СЏРµРј РїСѓСЃС‚РѕР№ Р·Р°РіРѕР»РѕРІРѕРє
    header("Access-Control-Allow-Origin: https://bkgkh.by");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

// Р•СЃР»Рё СЌС‚Рѕ preflight-Р·Р°РїСЂРѕСЃ, СЃСЂР°Р·Сѓ РѕС‚РґР°РµРј 200 OK
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// РћС‚РєР»СЋС‡Р°РµРј РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ РѕС€РёР±РѕРє РІ РїСЂРѕРґР°РєС€РµРЅРµ (Р±РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ)
ini_set("display_errors", 0);
error_reporting(0);

// РЎРµРєСЂРµС‚РЅС‹Р№ РєР»СЋС‡ РґР»СЏ РїРѕРґРїРёСЃРё СЃРµСЃСЃРёР№ (РР—РњР•РќРРўР• Р­РўР РЎРРњР’РћР›Р« РќРђ РЎР’РћР РџР•Р Р•Р” Р”Р•РџР›РћР•Рњ)
define('SESSION_SECRET', 'bkgkh_secure_prod_key_2026_x92F8mQpZ');
define('SESSION_EXPIRY', 3600); // 1 С‡Р°СЃ

/**
 * Р“РµРЅРµСЂР°С†РёСЏ С‚РѕРєРµРЅР° СЃРµСЃСЃРёРё (HMAC-SHA256)
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
 * Р’Р°Р»РёРґР°С†РёСЏ С‚РѕРєРµРЅР° СЃРµСЃСЃРёРё РёР· РєСѓРєРё
 */
function validateSessionToken($token) {
    if (empty($token)) return null;
    
    $parts = explode('.', $token);
    if (count($parts) !== 2) return null;
    
    [$payloadB64, $signatureB64] = $parts;
    
    $payload = base64_decode($payloadB64);
    $signature = base64_decode($signatureB64);
    
    // РџСЂРѕРІРµСЂСЏРµРј РїРѕРґРїРёСЃСЊ РЅР° РїРѕРґР»РёРЅРЅРѕСЃС‚СЊ
    $expectedSignature = hash_hmac('sha256', $payload, SESSION_SECRET, true);
    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }
    
    $data = json_decode($payload, true);
    
    // РџСЂРѕРІРµСЂСЏРµРј С‚Р°Р№РјС€С‚Р°РјРї Р¶РёР·РЅРё СЃРµСЃСЃРёРё
    if (!isset($data['exp']) || $data['exp'] < time()) {
        return null;
    }
    
    return $data;
}

/**
 * РџСЂРѕРІРµСЂРєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё С‡РµСЂРµР· httpOnly РєСѓРєРё
 */
function checkAuth() {
    $token = $_COOKIE['admin_session'] ?? '';
    if (empty($token)) return null;
    return validateSessionToken($token);
}

/**
 * РћС€РёР±РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё
 */
function authError() {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

/**
 * Р¤Р°Р№Р» РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РµС‰С‘ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РІ contacts РёР»Рё departments.
 * РљР°РЅРґРёРґР°С‚С‹ РїРѕРєСЂС‹РІР°СЋС‚ РІСЃРµ РёСЃС‚РѕСЂРёС‡РµСЃРєРёРµ С„РѕСЂРјР°С‚С‹ С…СЂР°РЅРµРЅРёСЏ: 'reception.png',
 * '/uploads/...', '/departments/...', '/contacts/...'.
 */
function imageStillUsed($filename, $pdo, $excludeContactId = null) {
    $candidates = [
        $filename,
        "/uploads/$filename",
        "/departments/$filename",
        "/contacts/$filename"
    ];
    $ph = implode(",", array_fill(0, count($candidates), "?"));

    $sql = "SELECT COUNT(*) FROM contacts WHERE src IN ($ph)";
    $params = $candidates;
    if ($excludeContactId !== null) {
        $sql .= " AND id != ?";
        $params[] = $excludeContactId;
    }
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $count = (int)$stmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM departments WHERE src IN ($ph)");
    $stmt->execute($candidates);
    $count += (int)$stmt->fetchColumn();

    return $count > 0;
}

/**
 * РќР°Р№С‚Рё С„Р°Р№Р» РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РІ РѕРґРЅРѕР№ РёР· РґРёСЂРµРєС‚РѕСЂРёР№ public/{uploads,departments,contacts}
 */
function findImageFile($filename) {
    foreach (['uploads', 'departments', 'contacts'] as $dir) {
        $path = __DIR__ . "/../public/$dir/$filename";
        if (file_exists($path)) {
            return $path;
        }
    }
    return null;
}

/**
 * РЈРґР°Р»РµРЅРёРµ С„Р°Р№Р»Р° РёР·РѕР±СЂР°Р¶РµРЅРёСЏ, РµСЃР»Рё РѕРЅ Р±РѕР»СЊС€Рµ РЅРµ РїСЂРёРІСЏР·Р°РЅ РЅРё Рє С‡РµРјСѓ
 */
function deleteImageIfUnused($imagePath, $pdo, $currentContactId = null) {
    if (empty($imagePath)) return false;

    $filename = basename($imagePath);
    $filePath = findImageFile($filename);
    if ($filePath === null) return false;

    if (imageStillUsed($filename, $pdo, $currentContactId)) return false;

    unlink($filePath);
    return true;
}

/**
 * РЈРґР°Р»РµРЅРёРµ С„Р°Р№Р»Р° РґРѕРєСѓРјРµРЅС‚Р°, РµСЃР»Рё РЅР° РЅРµРіРѕ Р±РѕР»СЊС€Рµ РЅРµ СЃСЃС‹Р»Р°РµС‚СЃСЏ РЅРё РѕРґРЅР° Р·Р°РїРёСЃСЊ.
 * РџРѕРґРґРµСЂР¶РёРІР°РµС‚ РёСЃС‚РѕСЂРёС‡РµСЃРєРёР№ С„РѕСЂРјР°С‚ 'documents/...' Рё РЅРѕРІС‹Р№ '/documents/...'.
 */
function deleteDocumentFileIfUnused($srcPath, $pdo) {
    if (empty($srcPath)) return false;

    $filename = basename($srcPath);
    $filePath = __DIR__ . "/../public/documents/" . $filename;
    if (!file_exists($filePath)) return false;

    $candidates = [$filename, "documents/$filename", "/documents/$filename"];
    $ph = implode(",", array_fill(0, count($candidates), "?"));
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM documents WHERE src IN ($ph)");
    $stmt->execute($candidates);
    if ((int)$stmt->fetchColumn() > 0) return false;

    unlink($filePath);
    return true;
}

// 2. РџСѓС‚СЊ Рє Р±Р°Р·Рµ РґР°РЅРЅС‹С… SQLite
$dbPath = __DIR__ . "/contacts.db";

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

    // 3. Р РѕСѓС‚РёРЅРі Р·Р°РїСЂРѕСЃРѕРІ
    $requestUri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

    $afterApi = (strpos($requestUri, "/api/") !== false)
                ? substr($requestUri, strpos($requestUri, "/api/") + 5)
                : $requestUri;

    $parts = explode("/", trim($afterApi, "/"));
    $tableName = $parts[0] ?? "";
    $id = $parts[1] ?? null;

    $method = $_SERVER["REQUEST_METHOD"];

    // --- Р РћРЈРў: РђРІС‚РѕСЂРёР·Р°С†РёСЏ (/api/login) ---
    if ($tableName === "login" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $password = $data["password"] ?? "";
        
        // Р’Р°С€ С‚РµРєСѓС‰РёР№ СЂР°Р±РѕС‡РёР№ С…РµС€ РїР°СЂРѕР»СЏ
        $passwordHash = '$2y$12$rarAoqlerZubcUTgR3ExDuLflIMyH22F5xnLbrCg1p38DQcpv5Q5C';
        
        if (password_verify($password, $passwordHash)) {
            $sessionToken = generateSessionToken([
                'user' => 'admin',
                'role' => 'administrator'
            ]);
            
            $isSecure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
            setcookie(
                'admin_session',
                $sessionToken,
                [
                    'expires' => time() + SESSION_EXPIRY,
                    'path' => '/',
                    'domain' => '', 
                    'secure' => $isSecure, 
                    'httponly' => true, // Р—Р°С‰РёС‚Р° РѕС‚ РєСЂР°Р¶Рё С‚РѕРєРµРЅР° С‡РµСЂРµР· XSS / JS
                    'samesite' => 'Lax'
                ]
            );
            
            echo json_encode(["success" => true, "message" => "Logged in"]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "РќРµРІРµСЂРЅС‹Р№ РїР°СЂРѕР»СЊ"]);
        }
        exit;
    }
    
    // --- Р РћРЈРў: РџСЂРѕРІРµСЂРєР° СЃРµСЃСЃРёРё (/api/verify) ---
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
    
    // --- Р РћРЈРў: Р’С‹С…РѕРґ (/api/logout) ---
    if ($tableName === "logout" && $method === "POST") {
        setcookie(
            'admin_session',
            '',
            [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '',
                'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
                'httponly' => true,
                'samesite' => 'Lax'
            ]
        );
        echo json_encode(["success" => true, "message" => "Logged out"]);
        exit;
    }
    
    // --- Р РћРЈРў: РћС‡РёСЃС‚РєР° РјСѓСЃРѕСЂРЅС‹С… РёР·РѕР±СЂР°Р¶РµРЅРёР№ (/api/cleanup) ---
    if ($tableName === "cleanup" && $method === "POST") {
        $user = checkAuth();
        if (!$user) authError();
        
        $deletedCount = 0;
        
        foreach (['uploads', 'departments', 'contacts'] as $dir) {
            $dirPath = __DIR__ . "/../public/$dir/";
            if (!is_dir($dirPath)) continue;
            
            $files = scandir($dirPath);
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') continue;
                if (!is_file($dirPath . $file)) continue;
                
                if (imageStillUsed($file, $pdo)) continue;
                
                unlink($dirPath . $file);
                $deletedCount++;
            }
        }
        
        echo json_encode(["success" => true, "message" => "Cleanup completed", "deleted" => $deletedCount]);
        exit;
    }
    
    // --- Р РћРЈРў: Р—Р°РіСЂСѓР·РєР° РєР°СЂС‚РёРЅРѕРє Рё РґРѕРєСѓРјРµРЅС‚РѕРІ (/api/upload) ---
    if ($tableName === "upload" && $method === "POST") {
        $user = checkAuth();
        if (!$user) authError();
        
        $type = $_POST['type'] ?? '';
        if (!in_array($type, ['contacts', 'departments', 'documents'], true)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid upload type"]);
            exit;
        }
        
        $file = $_FILES['file'] ?? $_FILES['image'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "No file uploaded"]);
            exit;
        }
        
        $fileName = basename($file['name']);
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        $allowedExts = $type === 'documents'
            ? ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rtf', 'odt', 'ods']
            : ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        if (!in_array($fileExt, $allowedExts)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid file type"]);
            exit;
        }
        
        $uploadDir = __DIR__ . "/../public/$type/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        if ($type === 'documents') {
            // Р”РѕРєСѓРјРµРЅС‚С‹ вЂ” С‡РµР»РѕРІРµРєРѕС‡РёС‚Р°РµРјРѕРµ РёРјСЏ С„Р°Р№Р»Р°, РґРµРґСѓРїР»РёРєР°С†РёСЏ РїСЂРё СЃРѕРІРїР°РґРµРЅРёРё
            $base = pathinfo($fileName, PATHINFO_FILENAME);
            $base = preg_replace('/[^\p{L}\p{N}\s._-]+/u', '', $base);
            $base = trim(preg_replace('/\s+/', ' ', $base));
            if ($base === '') $base = 'document_' . time();
            $newFileName = $base . '.' . $fileExt;
            $i = 1;
            while (file_exists($uploadDir . $newFileName) && $i < 1000) {
                $newFileName = $base . ' (' . $i . ').' . $fileExt;
                $i++;
            }
        } else {
            $newFileName = uniqid() . '_' . time() . '.' . $fileExt;
        }
        
        if (move_uploaded_file($file['tmp_name'], $uploadDir . $newFileName)) {
            echo json_encode([
                "success" => true, 
                "path" => "/" . $type . "/" . $newFileName,
                "filename" => $newFileName
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to upload file"]);
        }
        exit;
    }

    // --- Р РћРЈРў: РЈРґР°Р»РµРЅРёРµ РЅРµСЃРѕС…СЂР°РЅС‘РЅРЅРѕРіРѕ С„Р°Р№Р»Р° (/api/cleanup-file) ---
    if ($tableName === "cleanup-file" && $method === "POST") {
        $user = checkAuth();
        if (!$user) authError();
        
        $data = json_decode(file_get_contents("php://input"), true);
        $src = $data['src'] ?? '';
        if (!empty($src)) {
            if (str_starts_with($src, '/documents/') || str_starts_with($src, 'documents/')) {
                deleteDocumentFileIfUnused($src, $pdo);
            } else {
                deleteImageIfUnused($src, $pdo);
            }
        }
        echo json_encode(["success" => true]);
        exit;
    }

    // --- Р РћРЈРў: РўСЂР°РЅСЃРїРѕСЂС‚РЅС‹Рµ JOIN-Р·Р°РїСЂРѕСЃС‹ ---
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

    // --- Р РћРЈРў: CRUD РѕРїРµСЂР°С†РёРё ---
    if (in_array($tableName, $validTables)) {
        if ($method === "GET") {
            $stmt = $pdo->query("SELECT * FROM $tableName");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data ?: []);
        }
        elseif ($method === "POST") {
            $user = checkAuth();
            if (!$user) authError();
            
            $data = json_decode(file_get_contents("php://input"), true);
            if (!empty($data)) {
                $allowedFields = [
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src', 'is_primary'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'email', 'src'],
                    'phone_departments' => ['id_department', 'phone', 'is_fax'],
                    'documents_group' => ['name'],
                    'documents' => ['name', 'id_group', 'src'],
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
                $fields = []; $placeholders = []; $values = [];
                
                foreach ($data as $key => $val) {
                    if (!in_array($key, $tableAllowedFields)) continue;
                    $fields[] = $key;
                    $placeholders[] = '?';
                    $values[] = is_string($val) ? strip_tags($val) : $val;
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
            $user = checkAuth();
            if (!$user) authError();
            
            $data = json_decode(file_get_contents("php://input"), true);
            if (!empty($data)) {
                $allowedFields = [
                    'contacts' => ['name', 'surname', 'patronymic', 'job_title', 'email', 'src', 'is_primary'],
                    'phone_contacts' => ['contact_id', 'phone'],
                    'departments' => ['name', 'email', 'src'],
                    'phone_departments' => ['id_department', 'phone', 'is_fax'],
                    'documents_group' => ['name'],
                    'documents' => ['name', 'id_group', 'src'],
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
                $fields = []; $values = [];
                
                $oldData = null;
                if (in_array($tableName, ['contacts', 'departments', 'documents'])) {
                    $stmt = $pdo->prepare("SELECT src FROM $tableName WHERE id = ?");
                    $stmt->execute([$id]);
                    $oldData = $stmt->fetch(PDO::FETCH_ASSOC);
                }
                
                foreach ($data as $key => $val) {
                    if ($key === "id") continue;
                    if (!in_array($key, $tableAllowedFields)) continue;
                    $fields[] = "$key = ?"; 
                    $values[] = is_string($val) ? strip_tags($val) : $val;
                }
                
                if (empty($fields)) {
                    http_response_code(400);
                    echo json_encode(["error" => "No valid fields to update"]);
                    exit;
                }
                
                $values[] = $id;
                $sql = "UPDATE $tableName SET " . implode(", ", $fields) . " WHERE id = ?";
                $pdo->prepare($sql)->execute($values);
                
                if ($oldData && ($tableName === 'contacts' || $tableName === 'departments')) {
                    $newSrc = $data['src'] ?? '';
                    if (($oldData['src'] ?? '') !== $newSrc) {
                        deleteImageIfUnused($oldData['src'] ?? '', $pdo, $id);
                    }
                }
                if ($oldData && $tableName === 'documents') {
                    $newSrc = $data['src'] ?? '';
                    if (($oldData['src'] ?? '') !== $newSrc) {
                        deleteDocumentFileIfUnused($oldData['src'] ?? '', $pdo);
                    }
                }
                
                echo json_encode(["message" => "Updated", "id" => $id]);
            }
        }
        elseif ($method === "DELETE" && $id) {
            $user = checkAuth();
            if (!$user) authError();
            
            $oldData = null;
            if (in_array($tableName, ['contacts', 'departments', 'documents'])) {
                $stmt = $pdo->prepare("SELECT src FROM $tableName WHERE id = ?");
                $stmt->execute([$id]);
                $oldData = $stmt->fetch(PDO::FETCH_ASSOC);
            }
            
            $sql = "DELETE FROM $tableName WHERE id = ?";
            $pdo->prepare($sql)->execute([$id]);
            
            if ($oldData && !empty($oldData['src'])) {
                if ($tableName === 'documents') {
                    deleteDocumentFileIfUnused($oldData['src'], $pdo);
                } else {
                    deleteImageIfUnused($oldData['src'], $pdo);
                }
            }
            
            echo json_encode(["message" => "Deleted"]);
        }
    } else {
        echo json_encode([]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage(), "trace" => "DB error"]);
}