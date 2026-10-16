<?php
/**
 * Хелпер для smoke-теста seo.php: подставляет REQUEST_URI из argv и включает
 * рендер. Запускается из backend/tests/seo.php в отдельном процессе, потому что
 * seo.php завершает работу через exit() и не подходит для include в тест-раннере.
 *
 * Использование: php backend/tests/seo_render.php /contacts
 */
$_SERVER['REQUEST_URI'] = isset($argv[1]) ? $argv[1] : '/';
$_SERVER['HTTP_HOST'] = 'bkgkh.by';
$_SERVER['SERVER_NAME'] = 'bkgkh.by';
$_SERVER['HTTPS'] = 'on';
$_SERVER['REQUEST_METHOD'] = 'GET';

include __DIR__ . '/../../seo.php';
