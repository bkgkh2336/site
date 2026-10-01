# КЖУП «Буда-Кошелёвский коммунальник» — Сайт

- **Прод:** https://bkgkh.by
- **Тест:** `develop.bkgkh.by` (открывается через «Предпросмотр» в Plesk)
- **Репозиторий:** https://github.com/bkgkh2336/site (ветка `main`)

---

## Технологический стек

| Компонент | Технология |
|---|---|
| Фреймворк | React 19 + TypeScript |
| Сборщик | Vite 6 |
| Стили | styled-components 6 |
| Редактор в админке | TipTap 3 (WYSIWYG для статей) |
| Иконки | lucide-react |
| Роутинг | react-router-dom v7 |
| Бэкенд | PHP без фреймворка, **совместим с PHP 7.4** (на хостинге 7.4.33) |
| База данных | SQLite (pdo_sqlite) |
| Хостинг | Plesk (nginx + Apache, `.htaccess`), деплой по FTP |
| Крупные файлы | Git LFS (`*.mp4`, `*.MP4`) |

> **Важно для правок в `backend/api.php`:** хостинг работает на PHP 7.4 —
> нельзя использовать функции PHP 8+ (`str_starts_with`, `str_contains`,
> `array_is_list`, `?->`, `match`...). Иначе — фатал и 500, который не ловится
> `catch (Exception)`. Проверяй совместимость после каждой правки бэкенда.

---

## Быстрый старт

```bash
# 1. Зависимости
npm install

# 2. Настройка бэкенда
cp backend/.env.example backend/.env
php backend/generate_hash.php "ваш_пароль"
# → вписать хеш в backend/.env: ADMIN_PASSWORD_HASH=$2y$...

# 3. Разработка (фронт + PHP-сервер на :8000, прокси из vite)
npm run dev
```

Сайт откроется на `http://localhost:5173`, API — на `http://localhost:8000`.

Без заполненного `backend/.env` сайт работает публично, но вход в админку
отдаёт 500 (fail-closed — так задумано).

---

## Режимы запуска

```bash
npm run dev              фронт + PHP-сервер (localhost:8000)
npm run dev:full         то же, но PHP через router.php (чистые URL в dev)
npm run php              только PHP-сервер (порт 8000)
npm run lint             ESLint
npm run build            sitemap.xml + сборка в dist/
npm run prepare-deploy   сборка + api.php/.env/.htaccess в dist/ — БД НЕ кладёт
npm run prepare-deploy:first  то же + contacts.db — только для первого заливки
```

---

## Git, LFS и что нельзя коммитить

- **Никогда в git:** `backend/.env` (секреты), `*.db` / `*.sqlite` (состояние
  сервера) — это в `.gitignore`; на сервер они попадают только через
  `prepare-deploy:first` (БД) и вручную (`.env` копируется скриптом).
- **Видео** (`*.mp4`, `*.MP4`) — через **Git LFS**: в истории git только
  указатели (~130 байт), байты уходят в LFS-хранилище GitHub (лимит 1 ГБ,
  занято ~324 МБ). Клонирующим нужен установленный `git-lfs`.
- Тестовые/сторонние ветки `opencode/*` в репозиторий не попадают.

---

## Структура проекта

```
site/
├── src/                          # Исходники фронтенда
│   ├── main.tsx                  # Точка входа
│   ├── App.tsx                   # Корневой компонент (роутер)
│   ├── functions.ts              # GetData() + сортировка руководства
│   ├── Components/               # Header, Footer, Breadcrumbs, Section, ...
│   ├── Pages/                    # Страницы
│   │   ├── Main/                 # Главная
│   │   ├── Contacts/             # Контакты (руководство = is_primary)
│   │   ├── Services/             # Услуги (11 подстраниц)
│   │   ├── News/                 # Пресс-центр (статьи из БД)
│   │   ├── Manager/              # Админ-панель (/manager)
│   │   └── ...                   # Остальные страницы
│   ├── data/
│   │   └── menu.ts               # Меню сайта (структура + активные пункты)
│   └── utils/seoConfig.ts        # SEO-конфигурация
├── backend/                      # PHP-бэкенд
│   ├── api.php                   # REST API (~850 строк)
│   ├── contacts.db               # SQLite (ВНЕ git)
│   ├── .env                      # Секреты (ВНЕ git), см. .env.example
│   ├── .htaccess                 # Отдаёт только api.php (всё остальное — 403)
│   ├── generate_hash.php         # Генератор bcrypt-хеша пароля
│   └── router.php                # Рouter для dev-сервера
├── public/                       # Статика (копируется в dist как есть)
│   ├── uploads/, contacts/, departments/   # Картинки из админки
│   ├── documents/, news/         # PDF и картинки новостей
│   ├── useful_to_know/GSZ/       # Видео (LFS)
│   └── sitemap.xml               # Автогенерируется при сборке
├── scripts/generate-sitemap.js
├── .htaccess                     # SPA-роутинг + запрет *.php (кроме backend/api.php)
├── .gitattributes                # LFS-трекинг видео
└── package.json
```

---

## Frontend: как это работает

### Страницы

Каждая страница — React-компонент в `src/Pages/`: `MyPage.tsx` (логика +
вёрстка) и `styled.ts` (styled-components).

**Чтобы добавить новую страницу:**
1. Создать `src/Pages/MyNewPage/MyNewPage.tsx` + `styled.ts`
2. В `src/App.tsx`: `const MyNewPage = lazy(...)` + `<Route>`
3. В `src/utils/seoConfig.ts` — SEO-метаданные
4. Меню — в `src/data/menu.ts` (там же нормализация путей и подсветка
   активного пункта; `Header` и `Section` читают его оттуда)

### Стили

Все стили — через `styled-components`, свой `styled.ts` у каждой страницы:

```tsx
import styled from 'styled-components';
export const MyBlock = styled.div`
    color: #333;
    @media (max-width: 768px) { ... }
`;
```

### Иконки

`lucide-react`, tree-shake-ятся при сборке: `import { Phone, Send } from 'lucide-react';`
Список: https://lucide.dev/icons

### Тёмная тема для слабовидящих

CSS-классы на `<body>`: `.bvi-mode`, `.bvi-mode-dark`, `.bvi-mode-light`,
управляются компонентом `AccessibilityPanel`.

---

## Backend: PHP + SQLite

### API

Единый файл `backend/api.php`, все пути — через `/backend/api.php/api/...`.

**Публичное чтение (GET):**
```
GET /backend/api.php/api/contacts       контакты (is_primary=1 → руководство)
GET /backend/api.php/api/articles       новости/статьи
GET /backend/api.php/api/{table}        любая таблица
```

**С авторизацией (POST/PUT/DELETE):**
```
POST   /api/login          вход (пароль из .env; 5 неудач → 429 на 15 минут)
POST   /api/{table}        создать запись
PUT    /api/{table}/id     обновить запись
DELETE /api/{table}/id     удалить запись
POST   /api/upload         загрузить изображение (contacts/departments/documents/news)
POST   /api/cleanup        удалить осиротевшие картинки
```

**Таблицы:** contacts, phone_contacts, departments, phone_departments,
documents_group, documents, articles (+ schedule_reception, тарифы услуг:
ventilation/waste/electro/grass/heating/plumbing/el_inst/transport_*).

Колонки-флаги (`is_primary`, `is_fax`, `is_external`) API всегда отдаёт
**числами** — на хостинге pdo_sqlite возвращает их строками, нормализация
делается в GET-роуте. На фронте используй `Number(x.flag) === 1`.

### `backend/.env` (см. `.env.example`)

```
SESSION_SECRET=...          HMAC-ключ сессий (bin2hex(random_bytes(32)))
ADMIN_PASSWORD_HASH=$2y$... bcrypt-хеш пароля (php backend/generate_hash.php)
SESSION_EXPIRY=3600
APP_ENV=production
```

Без `.env` или с пустыми ключами вход всегда 500 — сайт публично жив,
админка закрыта (fail-closed).

### Защита

- `backend/.htaccess`: из папки бэкенда доступен только `api.php`
  (`.env`, БД, dev-скрипты — 403); корневой `.htaccess` запрещает любые `*.php`
  кроме `/backend/api.php`.
- Rate-limit входа: 5 неудач подряд → блок IP на 15 минут, сброс при успехе.
- Сессия: HMAC-подписанный токен, срок — `SESSION_EXPIRY`.

### Админ-панель

`/manager`, вход — пароль из `.env`. Реализовано:

- **Контакты и отделы** — телефоны, картинки, галочка «Руководящий состав»
  (`is_primary`);
- **Документы** — группы и PDF;
- **Новости/статьи** — TipTap-редактор: текст, таблицы, картинки/галереи,
  видео, внешние ссылки, расписание публикации.

Тарифы услуг и графики приёма правятся напрямую в SQLite
(например, Sqlite Viewer + `backend/contacts.db`).

---

## Сборка и деплой

```bash
# Обновление (БД на сервере НЕ трогаем):
npm run prepare-deploy

# Первый залив на чистый сервер (кладёт contacts.db):
npm run prepare-deploy:first
```

`prepare-deploy` собирает в `dist/`:

```
dist/
├── index.html, assets/        # собранный фронт (хеш-имена чанков!)
├── public-файлы...            # logo, uploads, documents, news, sitemap.xml...
├── .htaccess                  # SPA-роутинг + запрет php
└── backend/
    ├── api.php                # копия из backend/
    ├── .env                   # копия секретов
    ├── .htaccess              # доступен только api.php
    └── contacts.db            # ТОЛЬКО в prepare-deploy:first
```

### Требования к хостингу

- PHP **7.4+** с pdo_sqlite (на хостинге 7.4.33)
- Apache с mod_rewrite (Plesk: nginx+Apache)
- `backend/` доступен на запись (сессии, загрузки, БД)

### Типовые ошибки

| Симптом | Причина |
|---|---|
| Все запросы API → 500 `no such table` | В `dist/backend/` нет `contacts.db` (залит без `:first`) или она пустая |
| Вход → 500 | Нет `backend/.env` или пустые `SESSION_SECRET`/`ADMIN_PASSWORD_HASH` |
| 403 на `.env`/скрипты | Это защита, а не ошибка |
| 500 при сохранении статьи | В `api.php` появилась функция PHP 8+ (на хостинге PHP 7.4) |
| Ломается после заливки только `assets/` | Чанки и `index.html` должны обновляться **вместе**; заливай весь `dist/` |

---

## Типовые задачи

### Сменить логотип
Заменить `public/logo.png`.

### Добавить/убрать пункт меню
`src/data/menu.ts` — одна структура для десктопа и мобилки, активный пункт
определяется автоматически (самый глубокий совпавший путь).

### Изменить расписание приёма (график)
`src/Pages/ScheduleForms/ScheduleForms.tsx` (таблица КЖУП ~строки 96-104,
карточки-ссылки ~120-161); карточка `ScheduleLinkCard` в `styled.ts`.

### Контакты в футере/шапке
`src/Components/Footer/Footer.tsx`, `src/Components/Header/Header.tsx`
(блоки `ContactInfo` и `MobileContactInfo`).

### Новые тарифы на услуги
Sqlite Viewer → `backend/contacts.db` → таблицы `*_services`,
`transport_*`. Или через админку, если это контакты/документы/новости.

### SEO-тайтлы
`src/utils/seoConfig.ts`.

### Новая картинка/PDF
Положить в `public/` (или подпапку), после сборки доступно по URL.

### Ссылка на Telegram
`src/Components/Footer/Footer.tsx` и `src/Components/Header/Header.tsx`.

---

## Загрузка изменений на хостинг

1. Собрать: `npm run prepare-deploy` (первый раз — `prepare-deploy:first`).
2. FTP: загрузить **всё содержимое `dist/`** в каталог `develop.bkgkh.by`
   (с перезаписью).
3. Открыть тест: Plesk → домен `develop.bkgkh.by` → кнопка **«Предпросмотр»**
   (как обычный сайт тест не открывается).
4. Проверить: главная, контакты (руководство), вход в `/manager`,
   сохранение любой новости.
5. Если всё в порядке — скопировать файлы из `develop.bkgkh.by` в каталог
   публичного сайта (Plesk, файловый менеджер) и проверить bkgkh.by.

> При обновлении **не заливать** `contacts.db` (команда `prepare-deploy` её
> и не кладёт) — иначе затрутся правки, сделанные через админку на проде.
