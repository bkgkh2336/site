<?php
// 1. Настройки CORS и заголовки для безопасности мобильных браузеров
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

// Если это проверочный запрос (preflight), сразу отвечаем "ОК"
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Включаем отображение ошибок для отладки (потом можно будет выключить)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 2. Пути к базе и JSON (файлы лежат в той же папке backend/)
$dbPath = __DIR__ . '/contacts.db';
$vacanciesPath = __DIR__ . '/vacancies.json';

// Список всех таблиц из твоего старого server.js
$validTables = [
    'contacts', 'phone_contacts', 'departments', 'phone_departments',
    'documents_group', 'documents', 'ventilation_services', 'waste_services',
    'electro_services', 'grass_services', 'heating_services', 'plumbing_services',
    'el_inst_services', 'transport_price_population_and_budget',
    'transport_population_and_budget', 'transport_price_jur', 'transport_jur',
    'transport_price_other', 'transport_other', 'schedule_reception'
];

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 3. Умное определение маршрута (чтобы не было undefined в React)
    $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    // Ищем, какая таблица запрошена после /api/
    $afterApi = (strpos($requestUri, '/api/') !== false) 
                ? substr($requestUri, strpos($requestUri, '/api/') + 5) 
                : $requestUri;

    $parts = explode('/', trim($afterApi, '/'));
    $tableName = $parts[0] ?? '';
    $id = $parts[1] ?? null;

    $method = $_SERVER['REQUEST_METHOD'];

    // --- РОУТ: Вакансии (/api/scrape) ---
    if ($tableName === 'scrape') {
        echo file_exists($vacanciesPath) ? file_get_contents($vacanciesPath) : json_encode([]);
        exit;
    }

    // --- РОУТ: Транспортные услуги (сложные JOIN) ---
    if ($method === 'GET') {
        if ($tableName === 'transport_services') {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price_no_nds FROM transport_price_population_and_budget tp JOIN transport_population_and_budget t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if ($tableName === 'transport_jur_services') {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_jur tp JOIN transport_jur t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
        if ($tableName === 'transport_other_services') {
            $sql = "SELECT tp.id, t.name, tp.unit, tp.price FROM transport_price_other tp JOIN transport_other t ON tp.id_transport = t.id ORDER BY t.name, tp.id";
            echo json_encode($pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC));
            exit;
        }
    }

    // --- РОУТ: Универсальные таблицы (GET и PUT) ---
    if (in_array($tableName, $validTables)) {
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM $tableName");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data ?: []); // Если пусто, возвращаем [], а не null
        } 
        elseif ($method === 'PUT' && $id) {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!empty($data)) {
                $fields = []; $values = [];
                foreach ($data as $key => $val) {
                    if ($key === 'id') continue;
                    $fields[] = "$key = ?"; $values[] = $val;
                }
                $values[] = $id;
                $sql = "UPDATE $tableName SET " . implode(', ', $fields) . " WHERE id = ?";
                $pdo->prepare($sql)->execute($values);
                echo json_encode(["message" => "Updated"]);
            }
        }
    } else {
        // Если таблица не найдена, возвращаем пустой массив, чтобы React не падал с ошибкой .length
        echo json_encode([]);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage(), "trace" => "DB error"]);
}