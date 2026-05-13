<?php
$pdo = new PDO('sqlite:contacts.db');
$result = $pdo->query("PRAGMA table_info(departments)");
print_r($result->fetchAll(PDO::FETCH_ASSOC));
