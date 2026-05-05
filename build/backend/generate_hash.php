<?php
/**
 * Скрипт для генерации хеша пароля
 * Использование: php generate_hash.php "ваш_пароль"
 */

if ($argc < 2) {
    echo "Использование: php generate_hash.php \"ваш_пароль\"\n";
    exit(1);
}

$password = $argv[1];
$hash = password_hash($password, PASSWORD_BCRYPT);

echo "Пароль: $password\n";
echo "Хеш: $hash\n";
echo "\nВставьте этот хеш в api.php в переменную \$passwordHash\n";