<?php
// 1. Настройки CORS и заголовки безопасности
$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://bkgkh.by', 'https://www.bkgkh.by'];

if (in_array($allowedOrigin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
} else {
    // Разрешаем локальную разработку, если нужно, или оставляем пустой заголовок
    header("Access-Control-Allow-Origin: https://bkgkh.by");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

// Если это preflight-запрос, сразу отдаем 200 OK
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Отключаем отображение ошибок в продакшене (безопасность)
ini_set("display_errors", 0);
error_reporting(0);

// Секретный ключ для подписи сессий (ИЗМЕНИТЕ ЭТИ СИМВОЛЫ НА СВОИ ПЕРЕД ДЕПЛОЕМ)
define('SESSION_SECRET', 'bkgkh_secure_prod_key_2026_x92F8mQpZ');
define('SESSION_EXPIRY', 3600); // 1 час

/**
 * Генерация токена сессии (HMAC-SHA256)
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
    
    // Проверяем подпись на подлинность
    $expectedSignature = hash_hmac('sha256', $payload, SESSION_SECRET, true);
    if (!hash_equals($expectedSignature, $signature)) {
        return null;
    }
    
    $data = json_decode($payload, true);
    
    // Проверяем таймштамп жизни сессии
    if (!isset($data['exp']) || $data['exp'] < time()) {
        return null;
    }
    
    return $data;
}

/**
 * Проверка авторизации через httpOnly куки
 */
function checkAuth() {
    $token = $_COOKIE['admin_session'] ?? '';
    if (empty($token)) return null;
    return validateSessionToken($token);
}

/**
 * Ошибка авторизации
 */
function authError() {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

/**
 * Whitelist-based sanitizer for article HTML bodies (TipTap output).
 * Keeps semantic tags/attributes, drops scripts/styles and dangerous URLs.
 */
function isSafeArticleUrl($url) {
    $url = trim($url);
    if ($url === '') return false;
    if (preg_match('#^(https?:)?//#i', $url)) return true;
    if (preg_match('#^(mailto|tel):#i', $url)) return true;
    if ($url[0] === '/') return true;
    if (preg_match('#^(\./|\.\./)#', $url)) return true;
    if (preg_match('#^data:image/(png|jpe?g|gif|webp);base64,#i', $url)) return true;
    return false;
}

function sanitizeArticleBody($html) {
    if (!is_string($html) || $html === '') return '';

    $allowed = [
        'p' => [], 'br' => [], 'strong' => [], 'b' => [], 'em' => [], 'i' => [],
        'u' => [], 's' => [], 'strike' => [], 'sub' => [], 'sup' => [],
        'h2' => [], 'h3' => [], 'h4' => [], 'h5' => [],
        'ul' => [], 'ol' => ['start'], 'li' => [],
        'blockquote' => [], 'hr' => [], 'code' => [], 'pre' => [],
        'a' => ['href', 'target', 'rel'],
        'img' => ['src', 'alt', 'title', 'width', 'height'],
        'video' => ['src', 'controls', 'width', 'height', 'poster'],
        'source' => ['src', 'type'],
        'figure' => [], 'figcaption' => [],
        'table' => [], 'thead' => [], 'tbody' => [], 'tr' => [],
        'colgroup' => [], 'col' => [],
        'th' => ['colspan', 'rowspan'], 'td' => ['colspan', 'rowspan'],
        'span' => ['style'],
        'div' => ['data-block', 'data-payload']
    ];
    $removeWhole = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta'];

    $safeUrl = 'isSafeArticleUrl';

    $safeStyle = function ($style) {
        $keep = [];
        foreach (explode(';', $style) as $decl) {
            $pos = strpos($decl, ':');
            if ($pos === false) continue;
            $prop = strtolower(trim(substr($decl, 0, $pos)));
            $val = trim(substr($decl, $pos + 1));
            if (!in_array($prop, ['color', 'background-color', 'font-weight', 'font-style', 'text-decoration', 'text-align', 'font-family', 'font-size'], true)) continue;
            if (!preg_match('~^[a-z0-9#%,.\s()\'"]+$~i', $val)) continue;
            $keep[] = $prop . ': ' . $val;
        }
        return $keep ? implode('; ', $keep) : null;
    };

    $filterNode = function ($node) use (&$filterNode, $allowed, $removeWhole, $safeUrl, $safeStyle) {
        if ($node->nodeType === XML_ELEMENT_NODE) {
            $tag = strtolower($node->nodeName);

            if (in_array($tag, $removeWhole, true)) {
                $node->parentNode->removeChild($node);
                return;
            }

            if (!isset($allowed[$tag])) {
                // unwrap: move children up, drop the element itself
                $parent = $node->parentNode;
                while ($node->firstChild) {
                    $parent->insertBefore($node->firstChild, $node);
                }
                $parent->removeChild($node);
                return;
            }

            $allowedAttrs = $allowed[$tag];
            $attrs = [];
            foreach ($node->attributes as $attr) {
                $attrs[] = $attr->name;
            }
            foreach ($attrs as $name) {
                $lower = strtolower($name);
                if ($lower === 'class' || $lower === 'id' || str_starts_with($lower, 'on')) {
                    $node->removeAttribute($name);
                    continue;
                }
                if (!in_array($lower, $allowedAttrs, true)) {
                    $node->removeAttribute($name);
                    continue;
                }
                $value = $node->getAttribute($name);
                if (($lower === 'href' || $lower === 'src' || $lower === 'poster') && !$safeUrl($value)) {
                    $node->removeAttribute($name);
                    continue;
                }
                if ($lower === 'style') {
                    $safe = $safeStyle($value);
                    if ($safe === null) {
                        $node->removeAttribute($name);
                    } else {
                        $node->setAttribute($name, $safe);
                    }
                }
                if ($lower === 'target') {
                    $rel = preg_split('/\s+/', trim($node->getAttribute('rel')), -1, PREG_SPLIT_NO_EMPTY);
                    $rel = array_unique(array_merge($rel, ['noopener', 'noreferrer']));
                    $node->setAttribute('rel', implode(' ', $rel));
                }
            }

            // Custom structural block: validate the marker and sanitize the
            // JSON payload stored in data-payload (it wraps a content block).
            if ($tag === 'div' && $node->hasAttribute('data-block')) {
                $blockType = $node->getAttribute('data-block');
                if (!preg_match('/^[a-z][a-z0-9_]*$/', $blockType)) {
                    $node->removeAttribute('data-block');
                    $node->removeAttribute('data-payload');
                } else {
                    $decoded = json_decode($node->getAttribute('data-payload'), true);
                    if (is_array($decoded) && isset($decoded['type']) && is_string($decoded['type'])) {
                        $encoded = json_encode(cleanBlockFields($decoded), JSON_UNESCAPED_UNICODE);
                        if ($encoded !== false && strlen($encoded) <= 80000) {
                            $node->setAttribute('data-payload', $encoded);
                        } else {
                            $node->removeAttribute('data-payload');
                        }
                    } else {
                        $node->removeAttribute('data-payload');
                    }
                }
            }
        }

        $children = [];
        foreach ($node->childNodes as $child) {
            $children[] = $child;
        }
        foreach ($children as $child) {
            $filterNode($child);
        }
    };

    $html = '<?xml encoding="utf-8" ?><div id="__w">' . $html . '</div>';
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $root = $dom->getElementsByTagName('div')->item(0);
    if (!$root) return '';

    $children = [];
    foreach ($root->childNodes as $child) {
        $children[] = $child;
    }
    foreach ($children as $child) {
        $filterNode($child);
    }

    $out = '';
    foreach ($root->childNodes as $child) {
        $out .= $dom->saveHTML($child);
    }
    return $out;
}

/**
 * Clean a single incoming value for the articles table.
 */
function cleanArticleValue($key, $val) {
    if (!is_string($val)) return $val;
    if ($key === 'body') return sanitizeArticleBody($val);
    if ($key === 'custom_content') return sanitizeCustomContent($val);
    return strip_tags($val);
}

/**
 * Clean one content block (array) coming from custom_content JSON or from a
 * body's data-payload attribute: rich text keys go through the body
 * sanitizer, plain strings are stripped of tags, href/src must be safe URLs.
 */
function cleanBlockFields($block) {
    if (!is_array($block)) return [];
    $richKeys = ['html', 'paragraphs', 'steps'];
    $walk = function ($node, $key = '') use (&$walk, $richKeys) {
        $out = [];
        foreach ($node as $k => $v) {
            $childKey = is_int($k) ? $key : $k;
            if (is_array($v)) {
                $out[$k] = $walk($v, $childKey);
            } elseif (is_string($v)) {
                if (($childKey === 'href' || $childKey === 'src') && !isSafeArticleUrl($v)) {
                    $out[$k] = '';
                } elseif (in_array($childKey, $richKeys, true) || ($key === 'paragraphs' && $k === 'text')) {
                    $out[$k] = sanitizeArticleBody($v);
                } else {
                    $out[$k] = strip_tags($v);
                }
            } else {
                $out[$k] = $v;
            }
        }
        return $out;
    };
    return $walk($block);
}

/**
 * Sanitize custom_content: a JSON array of content blocks.
 * Invalid JSON is rejected (empty array).
 */
function sanitizeCustomContent($json) {
    $blocks = json_decode($json, true);
    if (!is_array($blocks)) return '[]';
    $clean = [];
    foreach ($blocks as $block) {
        if (!is_array($block) || !isset($block['type']) || !is_string($block['type'])) continue;
        $clean[] = cleanBlockFields($block);
    }
    $encoded = json_encode($clean, JSON_UNESCAPED_UNICODE);
    if ($encoded === false || strlen($encoded) > 400000) return '[]';
    return $encoded;
}

/**
 * Файл изображения ещё используется в contacts или departments.
 * Кандидаты покрывают все исторические форматы хранения: 'reception.png',
 * '/uploads/...', '/departments/...', '/contacts/...'.
 */
function imageStillUsed($filename, $pdo, $excludeContactId = null) {
    $candidates = [
        $filename,
        "/uploads/$filename",
        "/departments/$filename",
        "/contacts/$filename",
        "/news/$filename"
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

    $like = '%' . $filename . '%';
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM articles WHERE cover IN ($ph) OR gallery LIKE ? OR body LIKE ? OR custom_content LIKE ?");
    $stmt->execute(array_merge($candidates, [$like, $like, $like]));
    $count += (int)$stmt->fetchColumn();

    return $count > 0;
}

/**
 * Найти файл изображения в одной из директорий public/{uploads,departments,contacts}
 */
function findImageFile($filename) {
    foreach (['uploads', 'departments', 'contacts', 'news'] as $dir) {
        $path = __DIR__ . "/../public/$dir/$filename";
        if (file_exists($path)) {
            return $path;
        }
    }
    return null;
}

/**
 * Удаление файла изображения, если он больше не привязан ни к чему
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
 * Удаление файла документа, если на него больше не ссылается ни одна запись.
 * Поддерживает исторический формат 'documents/...' и новый '/documents/...'.
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

// 2. Путь к базе данных SQLite
$dbPath = __DIR__ . "/contacts.db";

$validTables = [
    "contacts", "phone_contacts", "departments", "phone_departments",
    "documents_group", "documents", "ventilation_services", "waste_services",
    "electro_services", "grass_services", "heating_services", "plumbing_services",
    "el_inst_services", "transport_price_population_and_budget",
    "transport_population_and_budget", "transport_price_jur", "transport_jur",
    "transport_price_other", "transport_other", "schedule_reception",
    "articles"
];

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Runtime migration: blocks content for custom-layout articles
    $hasCustomContent = false;
    foreach ($pdo->query("PRAGMA table_info(articles)") as $col) {
        if ($col["name"] === "custom_content") { $hasCustomContent = true; break; }
    }
    if (!$hasCustomContent) {
        $pdo->exec("ALTER TABLE articles ADD COLUMN custom_content TEXT DEFAULT ''");
    }

    // 3. Роутинг запросов
    $requestUri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

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
        
        // Ваш текущий рабочий хеш пароля
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
                    'httponly' => true, // Защита от кражи токена через XSS / JS
                    'samesite' => 'Lax'
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
    
    // --- РОУТ: Очистка мусорных изображений (/api/cleanup) ---
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
    
    // --- РОУТ: Загрузка картинок и документов (/api/upload) ---
    if ($tableName === "upload" && $method === "POST") {
        $user = checkAuth();
        if (!$user) authError();
        
        $type = $_POST['type'] ?? '';
        if (!in_array($type, ['contacts', 'departments', 'documents', 'news'], true)) {
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
            // Документы — человекочитаемое имя файла, дедупликация при совпадении
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

    // --- РОУТ: Удаление несохранённого файла (/api/cleanup-file) ---
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

    // --- РОУТ: Транспортные JOIN-запросы ---
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

    // --- РОУТ: CRUD операции ---
    if (in_array($tableName, $validTables)) {
        if ($method === "GET") {
            $sql = $tableName === "articles"
                ? "SELECT * FROM articles ORDER BY COALESCE(published_at, '0000-00-00') DESC, sort_order ASC, id ASC"
                : "SELECT * FROM $tableName";
            $stmt = $pdo->query($sql);
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
                    'schedule_reception' => ['day', 'time_start', 'time_end', 'description'],
                    'articles' => ['section', 'slug', 'title', 'summary', 'published_at', 'cover', 'gallery', 'body', 'custom_content', 'is_external', 'external_url', 'sort_order']
                ];
                
                $tableAllowedFields = $allowedFields[$tableName] ?? [];
                $fields = []; $placeholders = []; $values = [];
                
                foreach ($data as $key => $val) {
                    if (!in_array($key, $tableAllowedFields)) continue;
                    $fields[] = $key;
                    $placeholders[] = '?';
                    $values[] = $tableName === 'articles'
                        ? cleanArticleValue($key, $val)
                        : (is_string($val) ? strip_tags($val) : $val);
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
                    'schedule_reception' => ['day', 'time_start', 'time_end', 'description'],
                    'articles' => ['section', 'slug', 'title', 'summary', 'published_at', 'cover', 'gallery', 'body', 'custom_content', 'is_external', 'external_url', 'sort_order']
                ];
                
                $tableAllowedFields = $allowedFields[$tableName] ?? [];
                $fields = []; $values = [];
                
                $oldData = null;
                if (in_array($tableName, ['contacts', 'departments', 'documents'])) {
                    $stmt = $pdo->prepare("SELECT src FROM $tableName WHERE id = ?");
                    $stmt->execute([$id]);
                    $oldData = $stmt->fetch(PDO::FETCH_ASSOC);
                }
                if ($tableName === 'articles') {
                    $stmt = $pdo->prepare("SELECT cover FROM articles WHERE id = ?");
                    $stmt->execute([$id]);
                    $oldData = $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
                }
                
                foreach ($data as $key => $val) {
                    if ($key === "id") continue;
                    if (!in_array($key, $tableAllowedFields)) continue;
                    $fields[] = "$key = ?"; 
                    $values[] = $tableName === 'articles'
                        ? cleanArticleValue($key, $val)
                        : (is_string($val) ? strip_tags($val) : $val);
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
                if ($oldData && $tableName === 'articles') {
                    $newCover = $data['cover'] ?? '';
                    if (($oldData['cover'] ?? '') !== $newCover) {
                        deleteImageIfUnused($oldData['cover'] ?? '', $pdo);
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
            if ($tableName === 'articles') {
                $stmt = $pdo->prepare("SELECT cover FROM articles WHERE id = ?");
                $stmt->execute([$id]);
                $oldData = $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
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
            if ($oldData && !empty($oldData['cover'])) {
                deleteImageIfUnused($oldData['cover'], $pdo);
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