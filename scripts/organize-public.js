import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
  console.error('❌ Папка public не найдена. Выполните сборку сначала.');
  process.exit(1);
}

const items = fs.readdirSync(publicDir);
let movedCount = 0;

for (const item of items) {
  // Пропускаем корневые файлы и папки которые должны остаться на месте
  if (item === 'index.html' || item === 'assets' || item === 'public' || item === '.htaccess') {
    continue;
  }

  const src = path.join(publicDir, item);
  
  // Пропускаем директории - они уже в правильном месте
  if (fs.statSync(src).isDirectory()) {
    console.log(`✅ Каталог ${item} уже на месте`);
    movedCount++;
  }
}

if (movedCount === 0) {
  console.log('✅ Нет директорий для перемещения (возможно, уже на месте)');
} else {
  console.log(`✅: Перемещено ${movedCount} директорий в public/`);
}