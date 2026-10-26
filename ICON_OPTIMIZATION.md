# Автоматическая оптимизация иконок Lucide React

## Как это работает

### В режиме разработки (`npm run dev` / `npm run dev:full`)
- Используются обычные импорты: `import { Phone, Send } from "lucide-react"`
- Быстрая горячая перезагрузка (HMR)
- Удобная разработка без лишних изменений кода

### В продакшене (npm run build)
Vite автоматически оптимизирует иконки благодаря настройкам в `vite.config.ts`:

1. **Tree-shaking**: Удаляются все неиспользуемые иконки из финального бандла
2. **Code splitting**: Иконки выделяются в отдельный чанк `icons-*.js`
3. **Минификация**: Код иконок сжимается Terser

## Результат оптимизации

### До оптимизации:
- Импорт всей библиотеки `lucide-react` тянет все 1000+ иконок
- Это сотни килобайт несжатого JS

### После оптимизации:
- Только реально используемые иконки: ~22 KB (несжатый) / ~7.4 KB (gzip)
- Чанк `icons-*.js` в текущей сборке — 22.06 KB raw

## Используемые иконки в проекте

Иконки импортируются по именам, поэтому в сборку попадают только реально
используемые. Сейчас в `src/` **100 импортируемых имён** (включая админку).

### Публичная часть
- **Main.tsx (17):** Home, Phone, Clock, ShieldCheck, Trash2, Wind, Zap,
  Sprout, Flame, Droplet, ArrowRight, Users, Award, HeadphonesIcon, FileText,
  Calendar, CreditCard
- **Header.tsx (2):** Phone, Send
- **Footer.tsx (4):** Copyright, Mail, MapPin, Send
- **Services (10):** Wind, Zap, PlugZap, Flame, Droplet, Trash2, Sprout, Truck,
  Cross, File (`serviceConfigs.ts`, `Services.tsx`)
- **Общие компоненты:** Breadcrumbs — ChevronRight, Home; Section — ChevronDown;
  ImageLightbox — X, ChevronLeft, ChevronRight; ScrollToTopButton — ArrowUp;
  ViewToggle — LayoutGrid, Table; AccessibilityPanel — Eye, X, Type, Palette,
  Image, RotateCcw; FixedLanguageSelector — Eye; Contacts — Mail, Phone, Printer;
  NotFound — Home, Phone, Search, ArrowLeft; Documents — FileText, Download,
  FileX, Folder, Search
- **Страницы:** WorkSchedule — MapPin, Clock, Calendar, Building2, FileText, Fuel;
  Requisites — Building2, MapPin, Phone, CreditCard, User, FileText, Copy, Check;
  Service115 — Phone, Clock; ScheduleForms — Phone, Building2, ExternalLink;
  Cemetery_services — FileText, Download; News/Articles — Calendar, ExternalLink;
  PlansAndSchedules/InformationAboutCommunal — FileText, ExternalLinkIcon;
  Appeals/Surveys/BlankBmp — ExternalLinkIcon; Cybersecurity — Shield,
  AlertTriangle; AssistanceDisabilities — Phone
- **customContent.ts (блоки статей):** AlertCircle, AlertTriangle, Battery, Bell,
  Brush, Check, CheckCircle, CheckCircle2, ClipboardList, Clock, Flame, Image,
  MapPin, Search, Shield, ShieldCheck, Thermometer, UserCheck, Users, Wind,
  Wrench, XCircle

### Админка (`/manager`)
- **Manager.tsx:** Users, Wrench, FileText, Newspaper, LogIn, LogOut, Lock, User
- **RichTextEditor.tsx:** Bold, Italic, Underline, Strikethrough, Heading2,
  Heading3, Heading4, List, ListOrdered, Quote, Minus, Link2, Unlink, ImagePlus,
  Table2, Undo2, Redo2, Film, Eraser, Plus
- **ContactsManager.tsx:** Pencil, Plus, Crown, Users, Building2, Trash2, User
- **DocumentsManager.tsx:** Pencil, Plus, Folder, FileText, ExternalLink, Trash2
- **NewsManager.tsx:** Pencil, Plus, Newspaper, BookOpen, FileText, ExternalLink,
  Trash2, Calendar, Code2, Globe
- **ServicesManager.tsx:** Wind, Zap, Flame, Droplets, Wrench, Trash2, Trees,
  Truck, Search, Plus, Pencil, X, Save
- **EditForms:** ArrowDown, ArrowUp, ChevronDown, ChevronUp, Plus, Trash2, Upload,
  X, Save, FileText, ImageIcon, Eye, Pencil, Calendar, ImageOff
- **Modal.tsx:** X

`@tiptap`/`prosemirror` вынесены в отдельный чанк `editor-*.js`, который
загружается только на `/manager`.

## Как добавить новую иконку

Просто используйте обычный импорт:

```tsx
import { NewIcon } from "lucide-react";

function Component() {
  return <NewIcon size={24} />;
}
```

Vite автоматически включит только эту иконку в сборку! ✨

## Проверка размера бандла

### Команда для анализа:
```bash
npm run build:analyze
```

Это создаст визуальную карту размеров всех чанков, где вы увидите:
- Размер чанка `icons-*.js`
- Какие иконки включены
- Общий размер бандла

### Ориентиры по текущей сборке (`dist/assets`, имена с хешами):
- `icons-*.js`: ~22 KB raw / ~7.4 KB gzip
- `react-vendor-*.js`: ~224 KB raw / ~72 KB gzip
- `styled-*.js`: два чанка, ~26 и ~49 KB raw / ~10 и ~9 KB gzip
- `index-*.js`: ~93 KB raw / ~21 KB gzip
- `editor-*.js`: ~434 KB raw / ~128 KB gzip — грузится только в админке
- Все чанки вместе: ~1.2 MB raw / ~360 KB gzip

Цифры зависят от версии зависимостей и состава страниц — сверяйтесь с
`npm run build:analyze`.

## Дополнительные оптимизации

### 1. Индивидуальные импорты

Технически можно импортировать иконку напрямую:

```tsx
import Phone from 'lucide-react/dist/esm/icons/phone';
```

Но при текущей настройке Vite tree-shaking уже удаляет неиспользуемые иконки,
поэтому заметного выигрыша это не даёт. Реальный размер проверяйте через
`npm run build:analyze`.

### 2. Lazy loading для редких иконок

Если какая-то иконка используется очень редко:

```tsx
import { lazy, Suspense } from 'react';

const RareIcon = lazy(() => import('lucide-react/dist/esm/icons/rare-icon'));

function Component() {
  return (
    <Suspense fallback={<div>...</div>}>
      <RareIcon size={24} />
    </Suspense>
  );
}
```

## Мониторинг

После каждого деплоя проверяйте:

```bash
# 1. Размер бандла
npm run build
ls -lh dist/assets/*.js

# 2. Анализ содержимого
npm run build:analyze
```

## Вывод

- ✅ Используйте обычные импорты в коде
- ✅ Vite автоматически оптимизирует при сборке
- ✅ В сборку попадают только используемые иконки
- ✅ Никаких ручных изменений не требуется

**Итог:** чанк `icons-*.js` в текущей сборке — ~22 KB raw / ~7.4 KB gzip
(вместо сотен KB при импорте всей библиотеки).