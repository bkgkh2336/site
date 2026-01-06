/**
 * Скрипт для извлечения переводов из компонентов
 * Сканирует файлы и находит вызовы t() функции, создавая список всех используемых ключей
 * 
 * Использование:
 * node scripts/extract-translations.js
 */

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src');
const OUTPUT_FILE = path.join(__dirname, '../translations-keys.json');

// Регулярное выражение для поиска вызовов t()
const T_FUNCTION_REGEX = /t\(['"`]([^'"`]+)['"`]\s*,\s*['"`]([^'"`]+)['"`]\)/g;

function scanDirectory(dir, translations = {}) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Пропускаем node_modules и другие служебные папки
      if (!['node_modules', 'dist', 'build', '.git'].includes(file)) {
        scanDirectory(filePath, translations);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Читаем содержимое файла
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Ищем все вызовы t()
      let match;
      while ((match = T_FUNCTION_REGEX.exec(content)) !== null) {
        const [, key, defaultValue] = match;
        
        if (!translations[key]) {
          translations[key] = {
            ru: defaultValue,
            files: []
          };
        }
        
        if (!translations[key].files.includes(filePath)) {
          translations[key].files.push(filePath);
        }
      }
    }
  });
  
  return translations;
}

// Запускаем сканирование
console.log('Сканирование компонентов...');
const translations = scanDirectory(COMPONENTS_DIR);

// Сортируем по ключам
const sortedTranslations = Object.keys(translations)
  .sort()
  .reduce((acc, key) => {
    acc[key] = translations[key];
    return acc;
  }, {});

// Сохраняем результат
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedTranslations, null, 2), 'utf-8');

console.log(`\nНайдено ${Object.keys(translations).length} ключей перевода`);
console.log(`Результат сохранен в: ${OUTPUT_FILE}`);

// Выводим статистику по разделам
const sections = {};
Object.keys(translations).forEach(key => {
  const section = key.split('.')[0];
  sections[section] = (sections[section] || 0) + 1;
});

console.log('\nСтатистика по разделам:');
Object.entries(sections)
  .sort(([, a], [, b]) => b - a)
  .forEach(([section, count]) => {
    console.log(`  ${section}: ${count} ключей`);
  });