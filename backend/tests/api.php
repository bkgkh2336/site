<?php
/**
 * Тесты роутинга и CRUD backend/api.php на ВРЕМЕННОЙ базе (боевую contacts.db
 * не трогаем). Каждый запрос выполняется в отдельном процессе через
 * backend/tests/api_request.php, потому что api.php завершается через exit().
 *
 * Сессия админа подделывается: тест генерирует валидный токен тем же
 * алгоритмом (HMAC-SHA256), что и api.php, и подставляет его в куку.
 *
 * Запуск: php backend/tests/api.php   (нужны pdo_sqlite и proc_open)
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

if (!extension_loaded('pdo_sqlite')) {
    echo "pdo_sqlite не подключён — пропуск тестов api.php\n";
    exit(0);
}
if (!function_exists('proc_open')) {
    echo "proc_open отключён — пропуск тестов api.php\n";
    exit(0);
}

$runner = __DIR__ . '/api_request.php';
$secret = 'test-secret-' . sha1((string)microtime(true));
$tmpDir = sys_get_temp_dir() . '/bkgkh_api_' . uniqid();
$dbPath = $tmpDir . '/test.db';
$bodyFile = $tmpDir . '/body.json';

if (!mkdir($tmpDir, 0777, true) && !is_dir($tmpDir)) {
    echo "Не удалось создать временный каталог $tmpDir\n";
    exit(1);
}
register_shutdown_function(function () use ($tmpDir) {
    if (!is_dir($tmpDir)) return;
    foreach (glob($tmpDir . '/*') as $f) {
        @unlink($f);
    }
    @rmdir($tmpDir);
});

$failures = 0;
function check($name, $cond) {
    global $failures;
    if ($cond) {
        echo "  ok   $name\n";
    } else {
        echo "  FAIL $name\n";
        $failures++;
    }
}

// --- Временная БД: схема + сиды -------------------------------------------
function testPdo() {
    global $dbPath;
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    return $pdo;
}

function dbSetup() {
    $pdo = testPdo();
    $pdo->exec("CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, patronymic TEXT, job_title TEXT, email TEXT, src TEXT, is_primary INTEGER)");
    $pdo->exec("CREATE TABLE departments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, src TEXT)");
    $pdo->exec("CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, section TEXT, slug TEXT, title TEXT, summary TEXT, published_at TEXT, cover TEXT, gallery TEXT, body TEXT, custom_content TEXT, is_external INTEGER, external_url TEXT, sort_order INTEGER)");
    $pdo->exec("CREATE TABLE transport_population_and_budget (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
    $pdo->exec("CREATE TABLE transport_price_population_and_budget (id INTEGER PRIMARY KEY AUTOINCREMENT, id_transport INTEGER, unit TEXT, price_no_nds TEXT)");

    $pdo->exec("INSERT INTO contacts (name, surname, is_primary) VALUES ('Старый', 'Контакт', 1)");
    $pdo->exec("INSERT INTO transport_population_and_budget (name) VALUES ('Тестовая услуга')");
    $pdo->exec("INSERT INTO transport_price_population_and_budget (id_transport, unit, price_no_nds) VALUES (1, 'м3', '10.00')");
}

function countRows($table) {
    return (int)testPdo()->query("SELECT COUNT(*) FROM $table")->fetchColumn();
}

function fetchOne($table, $where, $params) {
    $stmt = testPdo()->prepare("SELECT * FROM $table WHERE $where LIMIT 1");
    $stmt->execute($params);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row === false ? null : $row;
}

// --- Генерация валидного токена сессии (как в api.php) --------------------
function makeToken($secret) {
    $payload = json_encode([
        'user' => 'admin',
        'role' => 'administrator',
        'exp' => time() + 3600,
    ]);
    $signature = hash_hmac('sha256', $payload, $secret, true);
    return base64_encode($payload) . '.' . base64_encode($signature);
}

// --- Выполнение запроса в отдельном процессе ------------------------------
function request($method, $uri, $body = null, $cookie = '') {
    global $dbPath, $secret, $bodyFile, $runner;

    file_put_contents($bodyFile, $body === null ? '' : json_encode($body, JSON_UNESCAPED_UNICODE));

    $env = array_merge(getenv(), [
        'BK_DB_PATH' => $dbPath,
        'SESSION_SECRET' => $secret,
        'ADMIN_PASSWORD_HASH' => '',
    ]);

    $cmd = [PHP_BINARY, $runner, $method, $uri, ($body === null ? '' : $bodyFile), $cookie];
    $descriptors = [1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $proc = proc_open($cmd, $descriptors, $pipes, null, $env);
    if (!is_resource($proc)) {
        return ['out' => '', 'err' => 'proc_open failed', 'exit' => -1];
    }
    $out = stream_get_contents($pipes[1]);
    $err = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $exit = proc_close($proc);

    return ['out' => $out, 'err' => $err, 'exit' => $exit];
}

dbSetup();
$token = makeToken($secret);

// 1. Публичное чтение
echo "чтение\n";
$data = json_decode(request('GET', '/api/contacts')['out'], true);
check('GET /api/contacts без входа -> массив с сидом', is_array($data) && count($data) === 1);
check('GET /api/contacts -> is_primary приведён к int', is_array($data) && $data[0]['is_primary'] === 1);

$data = json_decode(request('GET', '/api/articles')['out'], true);
check('GET /api/articles -> пустой массив', $data === []);

$data = json_decode(request('GET', '/api/nope')['out'], true);
check('GET неизвестной таблицы -> пустой массив', $data === []);

// 2. Защита: без сессии писать нельзя
echo "\nавторизация\n";
$before = countRows('contacts');
$data = json_decode(request('POST', '/api/contacts', ['name' => 'Хакер'])['out'], true);
check('POST без сессии -> отказ', is_array($data) && ($data['message'] ?? '') === 'Unauthorized');
check('POST без сессии не создаёт запись', countRows('contacts') === $before);

// 3. Создание с сессией: strip_tags + игнор полей вне белого списка
echo "\nсоздание / изменение / удаление\n";
$res = request('POST', '/api/contacts', ['name' => '<b>Пётр</b>', 'surname' => 'Иванов', 'is_primary' => 1, 'hacked' => 'x'], $token);
$data = json_decode($res['out'], true);
check('POST с сессией -> Created', is_array($data) && ($data['message'] ?? '') === 'Created');

$row = fetchOne('contacts', 'surname = ?', ['Иванов']);
check('POST: теги вырезаны из строки (name = Пётр)', $row !== null && $row['name'] === 'Пётр');
check('POST: поле вне белого списка не создаёт колонку', $row !== null && !array_key_exists('hacked', $row));

$id = $row['id'];
$data = json_decode(request('PUT', '/api/contacts/' . $id, ['name' => 'Сидор'], $token)['out'], true);
check('PUT с сессией -> Updated', is_array($data) && ($data['message'] ?? '') === 'Updated');
$row = fetchOne('contacts', 'id = ?', [$id]);
check('PUT изменил запись', $row !== null && $row['name'] === 'Сидор');

$data = json_decode(request('DELETE', '/api/contacts/' . $id, null, $token)['out'], true);
check('DELETE с сессией -> Deleted', is_array($data) && ($data['message'] ?? '') === 'Deleted');
check('DELETE удалил запись', fetchOne('contacts', 'id = ?', [$id]) === null);

// 4. Статья: тело проходит санитайзер
$data = json_decode(request('POST', '/api/articles', [
    'section' => 'news',
    'slug' => 'test-slug',
    'title' => 'Заголовок',
    'body' => '<p>ок</p><script>alert(1)</script>',
], $token)['out'], true);
check('POST статьи -> Created', is_array($data) && ($data['message'] ?? '') === 'Created');
$art = fetchOne('articles', 'slug = ?', ['test-slug']);
check('POST статьи: <script> вырезан из body', $art !== null && strpos($art['body'], '<script') === false);
check('POST статьи: текст сохранён', $art !== null && strpos($art['body'], 'ок') !== false);

// 5. Каскад: удаление транспортной услуги удаляет её тарифы
$data = json_decode(request('DELETE', '/api/transport_population_and_budget/1', null, $token)['out'], true);
check('DELETE транспортной услуги -> Deleted', is_array($data) && ($data['message'] ?? '') === 'Deleted');
check('DELETE услуги каскадно удалил тарифы', countRows('transport_price_population_and_budget') === 0);

if ($failures > 0) {
    echo "\n$failures проверка(и) провалена\n";
    exit(1);
}
echo "\nAPI-тесты: всё ok\n";
