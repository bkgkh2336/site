<?php
// Idempotent migration: create the articles table for the news system.
$pdo = new PDO('sqlite:' . __DIR__ . '/contacts.db');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$pdo->exec("
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL DEFAULT 'news',
    slug TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    summary TEXT,
    published_at TEXT,
    cover TEXT,
    gallery TEXT,
    body TEXT,
    is_external INTEGER NOT NULL DEFAULT 0,
    external_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    UNIQUE(section, slug)
)
");

$tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='articles'")->fetchAll(PDO::FETCH_ASSOC);
echo $tables ? "OK: table articles exists\n" : "FAIL\n";
