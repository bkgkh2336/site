<?php
/**
 * seo.php — серверная подстановка SEO-мета в каркас SPA.
 *
 * Сайт — это SPA: Apache отдаёт один и тот же index.html на все маршруты,
 * а заголовок/описание/OG рисует React уже после загрузки JS. Краулеры и
 * соцсети (Telegram, VK, Яндекс) JS не исполняют и видят только сырой HTML.
 * Этот скрипт читает собранный index.html и подставляет в <head> корректные
 * title/description/keywords/OG/Twitter/canonical/JSON-LD для конкретного
 * маршрута: статика — из src/data/seoConfig.json, статьи — из SQLite.
 *
 * Хостинг работает на PHP 7.4 — используем только совместимые конструкции.
 */

// Каркас страницы (собранный Vite index.html) лежит рядом со скриптом.
$templatePath = __DIR__ . '/index.html';

// При любой ошибке отдаём исходный каркас как есть — сайт не должен падать.
function seoFallback($templatePath) {
    if (is_readable($templatePath)) {
        header('Content-Type: text/html; charset=utf-8');
        readfile($templatePath);
        exit;
    }
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'index.html not found';
    exit;
}

if (!is_readable($templatePath)) {
    seoFallback($templatePath);
}

try {
    $SITE_NAME = 'КЖУП "Буда-Кошелёвский коммунальник"';

    $defaultTitle = $SITE_NAME;
    $defaultDescription = 'КЖУП "Буда-Кошелёвский коммунальник" — надежный партнер в сфере жилищно-коммунальных услуг Буда-Кошелёво: вывоз мусора, отопление, водоснабжение, электромонтаж. Диспетчерская служба 115 работает круглосуточно.';
    $defaultKeywords = 'жкх буда-кошелёво, коммунальные услуги, буда-кошелёвский коммунальник, вывоз мусора, отопление, водоснабжение, служба 115';

    // --- 1. Определяем запрошенный путь -------------------------------------
    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
    $path = parse_url($uri, PHP_URL_PATH);
    if (!is_string($path) || $path === '') {
        $path = '/';
    }
    $path = '/' . trim($path, '/'); // без хвостового слеша, всегда с ведущим

    // --- 2. Базовый origin для абсолютных URL og/canonical -------------------
    $https = (!empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off');
    $scheme = $https ? 'https' : 'http';
    $host = (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== '')
        ? $_SERVER['HTTP_HOST']
        : 'bkgkh.by';
    $origin = $scheme . '://' . $host;
    $canonical = $origin . ($path === '/' ? '/' : $path);

    // --- 3. Мета по умолчанию -----------------------------------------------
    $meta = array(
        'title' => $defaultTitle,
        'description' => $defaultDescription,
        'keywords' => $defaultKeywords,
        'ogImage' => '/logo.png',
        'ogType' => 'website',
    );

    // --- 4. Статические маршруты из общего JSON -----------------------------
    $config = seoLoadConfig(__DIR__);
    if (isset($config[$path]) && is_array($config[$path])) {
        $c = $config[$path];
        if (!empty($c['title'])) $meta['title'] = $c['title'];
        if (!empty($c['description'])) $meta['description'] = $c['description'];
        if (!empty($c['keywords'])) $meta['keywords'] = $c['keywords'];
    }

    // --- 5. Статьи: динамика из базы (section + slug) ------------------------
    $article = null;
    $articleSection = null;
    if (preg_match('~^/news/(articles|useful_to_know)/([A-Za-z0-9_-]+)$~', $path, $m)) {
        $articleSection = $m[1];
        $article = seoFindArticle(__DIR__, $articleSection, $m[2]);
    } elseif (preg_match('~^/news/([A-Za-z0-9_-]+)$~', $path, $m)) {
        $articleSection = 'news';
        $article = seoFindArticle(__DIR__, 'news', $m[1]);
    }

    $isArticle = false;
    if (is_array($article)) {
        $isArticle = true;
        // Нет курируемого описания — собираем из базы.
        if (!isset($config[$path])) {
            $t = trim(isset($article['title']) ? $article['title'] : '');
            if ($t !== '') $meta['title'] = $t . ' - ' . $SITE_NAME;
            $d = trim(isset($article['summary']) ? $article['summary'] : '');
            if ($d !== '') $meta['description'] = $d;
        }
        if (!empty($article['cover'])) $meta['ogImage'] = $article['cover'];
        $meta['ogType'] = 'article';
    }

    // --- 6. Файлы с расширением, для которых нет маршрута -> 404 ------------
    if (!$isArticle && !isset($config[$path]) && preg_match('~\.[A-Za-z0-9]{1,5}$~', $path)) {
        http_response_code(404);
        header('Content-Type: text/plain; charset=utf-8');
        echo '404 Not Found';
        exit;
    }

    // Абсолютный URL картинки (может быть локальным путём или внешним URL).
    $ogImage = $meta['ogImage'];
    if ($ogImage !== '' && $ogImage[0] === '/') {
        $ogImage = $origin . $ogImage;
    }

    // --- 7. Подставляем теги в <head> ---------------------------------------
    $html = file_get_contents($templatePath);

    $html = seoSetTitle($html, $meta['title']);
    $html = seoSetMeta($html, 'name', 'title', $meta['title']);
    $html = seoSetMeta($html, 'name', 'description', $meta['description']);
    $html = seoSetMeta($html, 'name', 'keywords', $meta['keywords']);
    $html = seoSetMeta($html, 'property', 'og:title', $meta['title']);
    $html = seoSetMeta($html, 'property', 'og:description', $meta['description']);
    $html = seoSetMeta($html, 'property', 'og:type', $meta['ogType']);
    $html = seoSetMeta($html, 'property', 'og:image', $ogImage);
    $html = seoSetMeta($html, 'property', 'og:url', $canonical);
    $html = seoSetMeta($html, 'property', 'og:site_name', $SITE_NAME);
    $html = seoSetMeta($html, 'name', 'twitter:title', $meta['title']);
    $html = seoSetMeta($html, 'name', 'twitter:description', $meta['description']);
    $html = seoSetMeta($html, 'name', 'twitter:image', $ogImage);
    $html = seoSetCanonical($html, $canonical);

    // JSON-LD для статей — расширенные сниппеты в поиске.
    if ($isArticle) {
        $ld = array(
            '@context' => 'https://schema.org',
            '@type' => 'NewsArticle',
            'headline' => trim(isset($article['title']) ? $article['title'] : ''),
            'description' => trim(isset($article['summary']) ? $article['summary'] : ''),
            'image' => array($ogImage),
            'mainEntityOfPage' => $canonical,
            'datePublished' => isset($article['published_at']) ? $article['published_at'] : '',
            'author' => array('@type' => 'Organization', 'name' => $SITE_NAME),
            'publisher' => array(
                '@type' => 'Organization',
                'name' => $SITE_NAME,
                'logo' => array('@type' => 'ImageObject', 'url' => $origin . '/logo.png'),
            ),
        );
        // Не отдаём пустые значения (schema.org их не любит).
        $ld = array_filter($ld, function ($v) {
            return $v !== '' && $v !== null && $v !== array();
        });
        $html = seoSetJsonLd($html, $ld);
    }

    header('Content-Type: text/html; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo $html;
} catch (Exception $e) {
    seoFallback($templatePath);
}

// ---------------------------------------------------------------------------
// Вспомогательные функции
// ---------------------------------------------------------------------------

/**
 * Читает единый JSON с мета-тегами маршрутов. В dev-режиме файл лежит в
 * src/data/, в собранном dist/ — рядом со скриптом.
 */
function seoLoadConfig($baseDir) {
    $candidates = array(
        $baseDir . '/seoConfig.json',
        $baseDir . '/src/data/seoConfig.json',
    );
    foreach ($candidates as $candidate) {
        if (!is_readable($candidate)) continue;
        $raw = file_get_contents($candidate);
        $data = json_decode($raw, true);
        if (is_array($data)) return $data;
    }
    return array();
}

/**
 * Ищет статью в SQLite по разделу и slug. Возвращает строку или null.
 */
function seoFindArticle($baseDir, $section, $slug) {
    $dbPath = $baseDir . '/backend/contacts.db';
    if (!is_readable($dbPath)) return null;
    try {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $pdo->prepare('SELECT title, summary, cover, published_at FROM articles WHERE section = ? AND slug = ? LIMIT 1');
        $stmt->execute(array($section, $slug));
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? $row : null;
    } catch (Exception $e) {
        return null;
    }
}

function seoEscape($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

/**
 * Заменяет первый <title>...</title>. Если тега нет — вставляет перед </head>.
 */
function seoSetTitle($html, $title) {
    $replacement = '<title>' . seoEscape($title) . '</title>';
    $count = 0;
    $result = preg_replace_callback('~<title>.*?</title>~is', function () use ($replacement) {
        return $replacement;
    }, $html, 1, $count);
    if ($count === 0) {
        $result = seoInsertBeforeHead($html, $replacement);
    }
    return $result === null ? $html : $result;
}

/**
 * Ставит content у <meta name|property="key">. Если тега нет — вставляет
 * новый перед </head>. Работает независимо от порядка атрибутов и переносов.
 */
function seoSetMeta($html, $attr, $key, $content) {
    $replacement = '<meta ' . $attr . '="' . $key . '" content="' . seoEscape($content) . '" />';
    $pattern = '~<meta\b[^>]*\b' . preg_quote($attr, '~') . '\s*=\s*(["\'])' . preg_quote($key, '~') . '\1[^>]*>~is';
    $count = 0;
    $result = preg_replace_callback($pattern, function () use ($replacement) {
        return $replacement;
    }, $html, 1, $count);
    if ($count === 0) {
        $result = seoInsertBeforeHead($html, $replacement);
    }
    return $result === null ? $html : $result;
}

function seoSetCanonical($html, $url) {
    $replacement = '<link rel="canonical" href="' . seoEscape($url) . '" />';
    $count = 0;
    $result = preg_replace_callback('~<link\b[^>]*\brel\s*=\s*(["\'])canonical\1[^>]*>~is', function () use ($replacement) {
        return $replacement;
    }, $html, 1, $count);
    if ($count === 0) {
        $result = seoInsertBeforeHead($html, $replacement);
    }
    return $result === null ? $html : $result;
}

function seoSetJsonLd($html, $data) {
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    if ($json === false) return $html;
    $replacement = '<script type="application/ld+json" id="seo-jsonld">' . $json . '</script>';
    $count = 0;
    $result = preg_replace_callback('~<script\b[^>]*\bid\s*=\s*(["\'])seo-jsonld\1[^>]*>.*?</script>~is', function () use ($replacement) {
        return $replacement;
    }, $html, 1, $count);
    if ($count === 0) {
        $result = seoInsertBeforeHead($html, $replacement);
    }
    return $result === null ? $html : $result;
}

function seoInsertBeforeHead($html, $tag) {
    $count = 0;
    $result = preg_replace_callback('~</head>~i', function () use ($tag) {
        return '  ' . $tag . "\n</head>";
    }, $html, 1, $count);
    return $result === null ? $html : $result;
}
