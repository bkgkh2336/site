<?php
// 1. Настройки CORS (чтобы React мог стучаться к PHP)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// Если это preflight-запрос браузера, просто отвечаем OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Пути к файлам
$dbPath = __DIR__ . '/contacts.db';
$vacanciesPath = __DIR__ . '/vacancies.json';

// Список разрешенных таблиц (как в твоем VALID_TABLES)
$validTables = [
    'contacts', 'phone_contacts', 'departments', 'phone_departments',
    'documents_group', 'documents', 'ventilation_services', 'waste_services',
    'electro_services', 'grass_services', 'heating_services', 'plumbing_services',
    'el_inst_services', 'transport_price_population_and_budget',
    'transport_population_and_budget', 'transport_price_jur', 'transport_jur',
    'transport_price_other', 'transport_other', 'schedule_reception'
];

try {
    // Подключение к SQLite
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $uri = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    // --- РОУТ: /api/scrape (Чтение JSON) ---
    if (strpos($uri, '/api/scrape') !== false) {
        if (file_exists($vacanciesPath)) {
            echo file_get_contents($vacanciesPath);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Data not ready"]);
        }
        exit;
    }

    // --- РОУТ: Сложные запросы (JOIN) ---
    if ($method === 'GET') {
        if (strpos($uri, '/api/transport_services') !== false) {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price_no_nds FROM transport_price_population_and_budget tp JOIN transport_population_and_budget t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if (strpos($uri, '/api/transport_jur_services') !== false) {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_jur tp JOIN transport_jur t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if (strpos($uri, '/api/transport_other_services') !== false) {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_other tp JOIN transport_other t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
    }

    // --- РОУТ: Динамические таблицы /api/:table ---
    // Извлекаем имя таблицы из URL
    preg_match('/\/api\/([^\/]+)/', $uri, $matches);
    $tableName = $matches[1] ?? '';

    if (in_array($tableName, $validTables)) {
        // GET /api/:table
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM $tableName");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } 
        // PUT /api/:table/:id
        elseif ($method === 'PUT') {
            preg_match('/\/api\/[^\/]+\/(\d+)/', $uri, $idMatches);
            $id = $idMatches[1] ?? null;
            $data = json_decode(file_get_contents('php://input'), true);

            if ($id && !empty($data)) {
                $fields = [];
                $values = [];
                foreach ($data as $key => $val) {
                    $fields[] = "$key = ?";
                    $values[] = $val;
                }
                $values[] = $id;
                $sql = "UPDATE $tableName SET " . implode(', ', $fields) . " WHERE id = ?";
                $pdo->prepare($sql)->execute($values);
                echo json_encode(["message" => "Updated successfully"]);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Invalid ID or data"]);
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid table or route"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}