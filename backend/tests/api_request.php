<?php
/**
 * Хелпер для теста backend/tests/api.php: выполняет ОДИН запрос к api.php в
 * отдельном процессе (как seo_render.php для seo.php), потому что api.php в
 * конце вызывает exit() и не годится для include в тест-раннер.
 *
 * Путь к тестовой БД и секрет сессии передаются через переменные окружения
 * (BK_DB_PATH, SESSION_SECRET) — их ставит вызывающий тест через proc_open.
 *
 * argv: [1]=HTTP-метод  [2]=путь (/api/contacts/1)  [3]=файл с телом JSON (или '')  [4]=cookie сессии (или '')
 */
$method = isset($argv[1]) ? $argv[1] : 'GET';
$uri = isset($argv[2]) ? $argv[2] : '/';
$bodyFile = isset($argv[3]) ? $argv[3] : '';
$cookie = isset($argv[4]) ? $argv[4] : '';

$_SERVER['REQUEST_METHOD'] = $method;
$_SERVER['REQUEST_URI'] = $uri;
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
$_SERVER['HTTP_ORIGIN'] = 'https://bkgkh.by';

if ($cookie !== '') {
    $_COOKIE['admin_session'] = $cookie;
}

$body = ($bodyFile !== '' && is_file($bodyFile)) ? (string)file_get_contents($bodyFile) : '';
define('BK_REQUEST_BODY', $body);

include __DIR__ . '/../api.php';
