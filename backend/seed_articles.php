<?php
/**
 * Seed the articles table from seed_articles.json (idempotent: skips existing section+slug).
 * Usage: php backend/seed_articles.php
 */

$dbPath = __DIR__ . '/contacts.db';
$jsonPath = __DIR__ . '/seed_articles.json';

if (!file_exists($jsonPath)) {
    fwrite(STDERR, "seed_articles.json not found\n");
    exit(1);
}

$json = file_get_contents($jsonPath);
$rows = json_decode($json, true);
if (!is_array($rows) || count($rows) === 0) {
    fwrite(STDERR, "invalid JSON: " . json_last_error_msg() . "\n");
    exit(1);
}

$pdo = new PDO('sqlite:' . $dbPath);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec('CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT DEFAULT \'\',
    published_at TEXT,
    cover TEXT DEFAULT \'\',
    gallery TEXT DEFAULT \'[]\',
    body TEXT DEFAULT \'\',
    custom_content TEXT DEFAULT \'\',
    is_external INTEGER DEFAULT 0,
    external_url TEXT DEFAULT \'\',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, slug)
)');

$exists = $pdo->prepare('SELECT 1 FROM articles WHERE section = ? AND slug = ?');
$insert = $pdo->prepare('INSERT INTO articles
    (section, slug, title, summary, published_at, cover, gallery, body, is_external, external_url, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(section, slug) DO UPDATE SET
        title = excluded.title,
        summary = excluded.summary,
        published_at = excluded.published_at,
        cover = excluded.cover,
        gallery = excluded.gallery,
        body = excluded.body,
        is_external = excluded.is_external,
        external_url = excluded.external_url,
        sort_order = excluded.sort_order');

$updated = 0;
$inserted = 0;
$skipped = 0;
foreach ($rows as $r) {
    $section = (string)$r['section'];
    $slug = (string)$r['slug'];
    $exists->execute([$section, $slug]);
    $existed = (bool)$exists->fetchColumn();
    $insert->execute([
        $section,
        $slug,
        (string)$r['title'],
        (string)($r['summary'] ?? ''),
        $r['published_at'] ?? null,
        (string)($r['cover'] ?? ''),
        (string)($r['gallery'] ?? '[]'),
        (string)($r['body'] ?? ''),
        (int)($r['is_external'] ?? 0),
        (string)($r['external_url'] ?? ''),
        (int)($r['sort_order'] ?? 0)
    ]);
    if ($existed) $updated++; else $inserted++;
}

$count = $pdo->query('SELECT COUNT(*) FROM articles')->fetchColumn();
echo "seeded: inserted=$inserted updated=$updated total=$count\n";
