<?php
/**
 * Unit-тесты чистых PHP-хелперов из backend/api.php: санитайзер статей
 * (XSS/безопасные URL) и определение локальных медиа-путей.
 *
 * Запуск: php backend/tests/unit.php
 * PHP 7.4+ (совпадает с продом). БД и сеть не нужны.
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Минимальное окружение до include: api.php читает эти ключи на старте.
define('BK_TESTING', true);
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['REQUEST_URI'] = '/';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';

require __DIR__ . '/../api.php';

// api.php глушит ошибки для прода — возвращаем их для тестов.
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

echo "isSafeArticleUrl\n";
check('https://...', isSafeArticleUrl('https://a.b/c') === true);
check('http://...', isSafeArticleUrl('http://a.b/c') === true);
check('протокол-относительный //', isSafeArticleUrl('//cdn/a.js') === true);
check('локальный /path', isSafeArticleUrl('/uploads/a.png') === true);
check('./path', isSafeArticleUrl('./a.png') === true);
check('../path', isSafeArticleUrl('../a.png') === true);
check('tel:', isSafeArticleUrl('tel:+375291234567') === true);
check('mailto:', isSafeArticleUrl('mailto:a@b.c') === true);
check('data:image base64', isSafeArticleUrl('data:image/png;base64,iVBORw0KGgo=') === true);
check('javascript:', isSafeArticleUrl('javascript:alert(1)') === false);
check('data:text/html', isSafeArticleUrl('data:text/html,<script>x</script>') === false);
check('пусто', isSafeArticleUrl('   ') === false);

echo "\nsanitizeArticleBody\n";
$out = sanitizeArticleBody('<p>Привет</p><script>alert(1)</script>');
check('удаляет <script> вместе с содержимым', strpos($out, '<script') === false && strpos($out, 'alert(1)') === false);
check('сохраняет текст (UTF-8)', strpos($out, 'Привет') !== false);

$out = sanitizeArticleBody('<img src="/news/a.jpg" onerror="alert(1)">');
check('снимает onerror-обработчик', stripos($out, 'onerror') === false);
check('сохраняет безопасный src', strpos($out, '/news/a.jpg') !== false);

$out = sanitizeArticleBody('<a href="javascript:alert(1)" target="_blank">x</a>');
check('снимает javascript: href', stripos($out, 'javascript:') === false);
check('добавляет rel=noopener при target', strpos($out, 'noopener') !== false);

$out = sanitizeArticleBody('<div class="x" onclick="y()">t</div>');
check('снимает class и инлайн-события', stripos($out, 'class=') === false && stripos($out, 'onclick') === false);

$out = sanitizeArticleBody('<span style="color: red">a</span>');
check('сохраняет безопасный style', strpos($out, 'color: red') !== false);
$out = sanitizeArticleBody('<p style="background:url(javascript:alert(1))">a</p>');
check('вырезает небезопасный style', stripos($out, 'javascript') === false);

$out = sanitizeArticleBody('<table><tbody><tr><td colspan="2">1</td></tr></tbody></table>');
check('сохраняет таблицы и colspan', strpos($out, '<table') !== false && strpos($out, '<td') !== false && strpos($out, 'colspan') !== false);

check('не-строка -> пусто', sanitizeArticleBody(null) === '');

echo "\ncleanBlockFields\n";
$b = cleanBlockFields(['type' => 'link', 'href' => 'javascript:alert(1)', 'text' => '<b>x</b>']);
check('небезопасный href -> пустая строка', $b['href'] === '');
check('текстовое поле очищается от тегов', $b['text'] === 'x');

$b = cleanBlockFields(['type' => 'paragraph', 'html' => '<p>a</p><script>y</script>']);
check('rich-поле html санитизируется', strpos($b['html'], '<script') === false);

$b = cleanBlockFields(['type' => 'link', 'href' => 'https://a.b/c']);
check('безопасный href сохраняется', $b['href'] === 'https://a.b/c');

check('не-массив -> пустой массив', cleanBlockFields('nope') === []);

echo "\nsanitizeCustomContent\n";
check('невалидный JSON -> []', sanitizeCustomContent('{oops') === '[]');
check('не массив -> []', sanitizeCustomContent('"str"') === '[]');
$clean = sanitizeCustomContent('[{"type":"text","html":"<p>a</p>"}]');
check('валидный блок сохраняется', strpos($clean, '"type":"text"') !== false && strpos($clean, 'a') !== false);
$clean = sanitizeCustomContent('[{"type":"x","html":"<script>y</script>"}]');
check('script вырезается из блоков', strpos($clean, '<script') === false);
$clean = sanitizeCustomContent('[{"nope":1},{"type":"text","html":"ok"}]');
check('блок без type отбрасывается', strpos($clean, '"nope"') === false);
check('пустой JSON-массив -> []', sanitizeCustomContent('[]') === '[]');

echo "\nisLocalMediaPath\n";
check('локальная картинка', isLocalMediaPath('/news/a.jpg') === true);
check('локальное видео', isLocalMediaPath('/useful_to_know/x.mp4') === true);
check('внешний URL', isLocalMediaPath('https://a.b/a.jpg') === false);
check('протокол-относительный //', isLocalMediaPath('//a.b/a.jpg') === false);
check('выход из каталога ..', isLocalMediaPath('/a/../b.jpg') === false);
check('не медиа-тип', isLocalMediaPath('/news/a.txt') === false);
check('пусто', isLocalMediaPath('') === false);

echo "\narticleEmbeddedPaths\n";
$paths = articleEmbeddedPaths(
    '/news/cover.jpg',
    json_encode([['src' => '/news/g1.jpg'], ['src' => 'https://ext/g2.jpg']]),
    '<p><img src="/news/body.jpg"><a href="/news/only-link.jpg">x</a></p><video src="/news/v.mp4" poster="/news/p.jpg"></video>',
    json_encode([['type' => 'gallery', 'items' => [['src' => '/news/c.jpg']]]])
);
sort($paths);
check(
    'собраны локальные встроенные файлы (без <a href>)',
    $paths === ['/news/body.jpg', '/news/c.jpg', '/news/cover.jpg', '/news/g1.jpg', '/news/p.jpg', '/news/v.mp4']
);
check(
    'href-ссылка не считается встроенной',
    articleEmbeddedPaths('', '', '<a href="/news/only-link.jpg">x</a>', '') === []
);
check(
    'внешние пути игнорируются',
    articleEmbeddedPaths('', json_encode([['src' => 'https://ext/g2.jpg']]), '', '') === []
);

if ($failures > 0) {
    echo "\n$failures проверка(и) провалена\n";
    exit(1);
}
echo "\nPHP unit: всё ok\n";
