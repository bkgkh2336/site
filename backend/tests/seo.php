<?php
/**
 * Smoke-тест seo.php: проверяет, что серверная подстановка мета-тегов реально
 * работает — то, что видят Telegram/Яндекс без исполнения JS.
 *
 * seo.php завершается через exit(), поэтому рендер запускается в отдельном
 * процессе (backend/tests/seo_render.php). БД для статей может отсутствовать
 * (gitignored) — тогда кейсы со статьями пропускаются.
 *
 * Запуск: php backend/tests/seo.php   (нужен index.html в корне, он в git)
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

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

function render($path) {
    $cmd = escapeshellarg(PHP_BINARY)
        . ' ' . escapeshellarg(__DIR__ . '/seo_render.php')
        . ' ' . escapeshellarg($path);
    return (string)shell_exec($cmd);
}

// Повторяет seoEscape() из seo.php: теги в выдаче HTML-экранированы.
function esc($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

$template = __DIR__ . '/../../index.html';
$configPath = __DIR__ . '/../../src/data/seoConfig.json';

if (!function_exists('shell_exec')) {
    echo "shell_exec отключён — пропуск SEO smoke-теста\n";
    exit(0);
}
if (!is_readable($template)) {
    echo "index.html не найден — пропуск SEO smoke-теста\n";
    exit(0);
}

$config = is_readable($configPath)
    ? json_decode(file_get_contents($configPath), true)
    : null;
if (!is_array($config)) {
    $config = array();
}

echo "статические маршруты\n";
foreach (array('/', '/contacts', '/services', '/payment') as $route) {
    if (!isset($config[$route]['title'])) {
        continue;
    }
    $expectedTitle = $config[$route]['title'];
    $html = render($route);

    check("$route: <title> из конфига", strpos($html, '<title>' . esc($expectedTitle) . '</title>') !== false);
    check("$route: <link rel=canonical> абсолютный", strpos($html, '<link rel="canonical" href="https://bkgkh.by' . $route . '"') !== false);
    check("$route: og:url = canonical", strpos($html, '<meta property="og:url" content="https://bkgkh.by' . $route . '" />') !== false);

    if (!empty($config[$route]['description'])) {
        check("$route: meta description из конфига", strpos($html, 'content="' . esc($config[$route]['description']) . '"') !== false);
    }
}

echo "\nкорень\n";
$home = render('/');
check('/: og:image абсолютный', strpos($home, '<meta property="og:image" content="https://bkgkh.by/logo.png" />') !== false);
check('/: есть JSON-LD не для статьи (og:type=website)', strpos($home, 'content="website"') !== false);

echo "\nнесуществующий файл\n";
$missing = render('/no-such-file.jpg');
check('/no-such-file.jpg -> 404', strpos($missing, '404 Not Found') !== false);

$dbPath = __DIR__ . '/../contacts.db';
if (is_readable($dbPath)) {
    echo "\nстатья из БД\n";
    $article = render('/news/articles/boiler_low_temperature');
    check('статья: og:type=article', strpos($article, '<meta property="og:type" content="article" />') !== false);
    check('статья: есть JSON-LD NewsArticle', strpos($article, '"@type":"NewsArticle"') !== false);
    check('статья: canonical абсолютный', strpos($article, '<link rel="canonical" href="https://bkgkh.by/news/articles/boiler_low_temperature"') !== false);
} else {
    echo "\ncontacts.db нет — кейсы со статьями пропущены\n";
}

if ($failures > 0) {
    echo "\n$failures проверка(и) провалена\n";
    exit(1);
}
echo "\nSEO smoke: всё ok\n";
