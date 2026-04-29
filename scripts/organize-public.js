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
  
  // Перемещаем только директории (assets, articles, departments и т.д.)
  if (fs.statSync(src).isDirectory()) {
    const dest = path.join(publicDir, item);
    // Удаляем старую директорию если она существует
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true });
    }
    fs.renameSync(src, dest);
    console.log(`✅ Каталог ${item} перемещен в public/${item}`);
    movedCount++;
  }
}

if (movedCount === 0) {
  console.log('✅ Нет директорий для перемещения (возможно, уже на месте)');
} else {
  console.log(`✅: Перемещено ${movedCount} директорий в public/`);
}