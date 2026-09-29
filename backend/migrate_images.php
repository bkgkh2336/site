<?php
// Миграция: переносит картинки из public/uploads в public/{contacts,departments}
// и обновляет пути src в БД. Запуск: php migrate_images.php

$pdo = new PDO('sqlite:' . __DIR__ . '/contacts.db');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$map = ['contacts' => 'contacts', 'departments' => 'departments'];
$moved = 0;

foreach ($map as $table => $dir) {
    $rows = $pdo->query("SELECT id, src FROM $table WHERE src LIKE '/uploads/%'")->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $r) {
        $filename = basename($r['src']);
        $from = __DIR__ . "/../public/uploads/$filename";
        $toDir = __DIR__ . "/../public/$dir/";

        if (!is_dir($toDir)) {
            mkdir($toDir, 0755, true);
        }
        if (file_exists($from)) {
            rename($from, $toDir . $filename);
        }

        $newSrc = "/$dir/$filename";
        $pdo->prepare("UPDATE $table SET src = ? WHERE id = ?")->execute([$newSrc, $r['id']]);
        $moved++;
        echo "$table#{$r['id']}: $r[src] -> $newSrc\n";
    }
}

echo "Migrated: $moved\n";
