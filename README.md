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

# 3. Разработка (Vite + PHP с router.php, API через прокси)
npm run dev:full
```

Сайт откроется на `http://localhost:5173`, API — на
`http://localhost:8000/backend/api.php/api/...`.

Без заполненного `backend/.env` сайт работает публично, но вход в админку
отдаёт 500 (fail-closed — так задумано).

---

## Режимы запуска

```bash
npm run dev              Vite + PHP без router.php (API через Vite-прокси не работает)
npm run dev:full         Vite + PHP с router.php (полноценный API и чистые URL в dev)
npm run php              только PHP-сервер без router.php (порт 8000)
npm run lint             ESLint
npm run typecheck        проверка типов (tsc -b)
npm run test             JS/TS-тесты (Vitest)
npm run test:php         PHP-тесты API и SEO (php backend/tests/*.php)
npm run build            sitemap.xml + сборка в dist/ (+ .htaccess, seo.php, seoConfig.json)
npm run build:analyze    отчёт о размерах чанков (vite-bundle-visualizer)
npm run generate:sitemap только пересобрать public/sitemap.xml
npm run prepare-deploy   сборка + api.php/.htaccess в dist/ — БД и .env НЕ кладёт
npm run prepare-deploy:first  то же + contacts.db — только для первой заливки
```

---

## Тесты и CI

- **Vitest** — чистые функции без DOM/сети: `src/**/*.test.ts`, `scripts/**/*.test.{js,ts}`
  (конфиг `vitest.config.ts`, отдельный от `vite.config.ts`). Запуск: `npm test`.
- **PHP-тесты** — без внешних зависимостей, обычные скрипты с `exit(1)` при провале:
  - `backend/tests/unit.php` — санитайзер статей (`sanitizeArticleBody`,
    `cleanBlockFields`, `isSafeArticleUrl`, `sanitizeCustomContent`) и медиа-хелперы
    (`isLocalMediaPath`, `articleEmbeddedPaths`). В `backend/api.php` для этого есть
    тест-хук: при константе `BK_TESTING` файл только объявляет функции (без роутинга и БД).
  - `backend/tests/seo.php` — smoke-тест `seo.php`: запускает его в подпроцессе
    (`seo_render.php`) на разных URL и проверяет title/canonical/OG/JSON-LD и 404.
    Кейсы со статьями пропускаются, если нет `backend/contacts.db`.
  - `backend/tests/api.php` — роутинг и CRUD `api.php` на ВРЕМЕННОЙ базе (боевую
    `contacts.db` не трогает): публичное чтение, отказ без сессии, создание/изменение/
    удаление, вырезание тегов, санитайзер тела статьи и каскадное удаление тарифов.
    Каждый запрос идёт в подпроцесс (`api_request.php`); путь к БД подменяется через
    `BK_DB_PATH`, сессия подделывается валидным токеном.
  - Запуск: `npm run test:php` (нужен PHP в PATH).
- **CI** — `.github/workflows/ci.yml`: frontend (`typecheck` → `lint` → `test` → `build`)
  и backend (`php -l backend/api.php` + `php -l seo.php` + `php backend/tests/unit.php`
  + `php backend/tests/seo.php` + `php backend/tests/api.php`).
- **Хуки перед коммитом** (husky + lint-staged, ставятся через `prepare` при `npm install`):
  на изменённые `*.ts/tsx` прогоняется `eslint --fix`, затем `typecheck` и `vitest` —
  поломка не уезжает в коммит. Конфиг — `.husky/pre-commit` и `lint-staged` в `package.json`.


---

## Git, LFS и что нельзя коммитить

- **Не коммитить:** `backend/.env` (секреты), `backend/contacts.db` и другие
  серверные `*.db` / `*.sqlite` — они в `.gitignore`. На сервер БД попадает
  только через `prepare-deploy:first`, а `.env` создаётся на сервере вручную.
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
│   ├── App.tsx                   # Корневой компонент (роутер + routeTitles)
│   ├── functions.ts              # GetData() + сортировка руководства
│   ├── accessibility.css         # Настройки версии для слабовидящих
│   ├── Components/               # Header, Footer, Breadcrumbs, Section, ...
│   ├── Pages/                    # Страницы
│   │   ├── Main/                 # Главная
│   │   ├── Contacts/             # Контакты (руководство = is_primary)
│   │   ├── Services/             # Услуги (11 подстраниц)
│   │   ├── News/                 # Пресс-центр (статьи из БД)
│   │   ├── Manager/              # Админ-панель (/manager)
│   │   └── ...                   # Остальные страницы
│   ├── data/
│   │   ├── menu.ts               # Меню сайта (структура + активные пункты)
│   │   ├── articles.ts           # Типы статей и реестр кастомных layout-ов
│   │   └── seoConfig.json        # Мета маршрутов (общий источник для фронта и seo.php)
│   └── utils/seoConfig.ts        # SEO-конфигурация (импортирует seoConfig.json)
├── backend/                      # PHP-бэкенд
│   ├── api.php                   # REST API (~1000 строк)
│   ├── contacts.db               # SQLite (ВНЕ git)
│   ├── .env                      # Секреты (ВНЕ git), см. .env.example
│   ├── .env.example              # Шаблон секретов
│   ├── .htaccess                 # Отдаёт только api.php (всё остальное — 403)
│   ├── generate_hash.php         # Генератор bcrypt-хеша пароля
│   ├── router.php                # Альтернативный dev-роутер (npm-скрипты используют корневой)
│   ├── tests/                    # PHP-тесты: unit.php, seo.php, api.php
│   └── check_*.php, seed_*.php, migrate_*.php  # Dev-скрипты (на прод не нужны)
├── public/                       # Статика (копируется в dist как есть)
│   ├── uploads/, contacts/, departments/   # Картинки из админки
│   ├── documents/, news/, articles/   # Файлы и картинки разделов
│   ├── cemetries/                     # Документы раздела кладбищ (так в коде)
│   ├── useful_to_know/GSZ/       # Видео (LFS)
│   └── sitemap.xml               # Автогенерируется при сборке
├── scripts/generate-sitemap.js   # Список URL для sitemap (правится вручную)
├── scripts/organize-public.js    # Проверка структуры public/ (ничего не перемещает)
├── router.php                    # Dev-роутер: /backend → backend/api.php, остальное → SPA
├── seo.php                       # Server-side meta: вкладывает title/OG/JSON-LD в index.html
├── .htaccess                     # SPA-роутинг через seo.php + запрет *.php (кроме api.php, seo.php)
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
2. В `src/App.tsx`: `const MyNewPage = lazy(...)`, `<Route>` и заголовок
   в `routeTitles` (он же обновляет `document.title`)
3. В `src/data/seoConfig.json` — SEO-метаданные (единый источник для
   `SEO`-компонента и `seo.php`; `src/utils/seoConfig.ts` только импортирует JSON)
4. Меню — в `src/data/menu.ts` (там же нормализация путей и подсветка
   активного пункта; `Header` и `Section` читают его оттуда)
5. URL — в `scripts/generate-sitemap.js` (sitemap собирается из этого списка,
   а не из БД)

### SEO и превью в соцсетях

Мета-теги (title, description, OG/Twitter, canonical) для каждой страницы
формируются на сервере в `seo.php` и попадают прямо в HTML. Без этого
Telegram, VK и поисковые боты (они не исполняют JS) видели бы один общий
заголовок и логотип на всех страницах.

- **Статика** (`/contacts`, `/tariffs`, ...) — из `src/data/seoConfig.json`.
  Это единый источник: тот же файл импортирует `src/utils/seoConfig.ts`
  для клиентской навигации (компонент `SEO`).
- **Статьи** (`/news/...`, `/news/articles/...`, `/news/useful_to_know/...`) —
  из SQLite (`articles.title/summary/cover`), поэтому превью корректны и для
  новостей, добавленных через админку без пересборки. Для статей отдаётся
  JSON-LD `NewsArticle`.

`seo.php` читает собранный `index.html` и подменяет теги; при любой ошибке
отдаёт исходный каркас (сайт не падает). `.htaccess` направляет все
не-файловые маршруты в `seo.php` (`DirectoryIndex seo.php index.html`).

> Мета статьи можно уточнить вручную: добавьте её путь в
> `src/data/seoConfig.json` — но он приоритетнее данных из БД, а `og:image`
> всё равно возьмётся из обложки статьи.

### Стили

Стили — через `styled-components`, свой `styled.ts` у каждой страницы;
глобальные — `src/App.css` и `src/accessibility.css`:

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

### Версия для слабовидящих

Компонент `AccessibilityPanel` (кнопка — в `FixedLanguageSelector`) хранит
настройки в `localStorage` и выставляет атрибуты на `<html>`:

- `data-font-size` — `small` / `medium` / `large`;
- `data-color-scheme` — `default` / `black-on-white` / `white-on-black` / `blue-on-white`;
- `data-letter-spacing` — `true` / `false`;
- `data-images-enabled` — `true` / `false`.

Стили — в `src/accessibility.css` (селекторы `:root[data-...]`).

---

## Backend: PHP + SQLite

### API

Единый файл `backend/api.php`, все пути — через `/backend/api.php/api/...`.

**Публичное чтение (GET):**
```
GET /backend/api.php/api/contacts                    контакты (is_primary=1 — руководство)
GET /backend/api.php/api/articles                    новости/статьи
GET /backend/api.php/api/{table}                     только таблицы из белого списка
GET /backend/api.php/api/transport_services          JOIN: население и бюджет
GET /backend/api.php/api/transport_jur_services      JOIN: юрлица
GET /backend/api.php/api/transport_other_services    JOIN: прочие
```

**Авторизация и запись:**
```
POST   /backend/api.php/api/login                    вход (пароль из .env; 5 неудач → 429 на 15 минут)
GET    /backend/api.php/api/verify                   проверить сессию
POST   /backend/api.php/api/logout                   выход
POST   /backend/api.php/api/{table}                  создать запись
PUT    /backend/api.php/api/{table}/id               обновить запись
DELETE /backend/api.php/api/{table}/id               удалить запись
POST   /backend/api.php/api/upload                   contacts/departments — картинки; documents — PDF/DOC/XLS/…;
                                                     news — картинки в /news|/articles|/useful_to_know/<slug>/
POST   /backend/api.php/api/cleanup                  удалить осиротевшие картинки в uploads/, departments/, contacts/
POST   /backend/api.php/api/cleanup-file             удалить несохранённый файл
```

**Таблицы:** `contacts`, `phone_contacts`, `departments`, `phone_departments`,
`documents_group`, `documents`, `articles`.

Тарифы услуг: `ventilation_services`, `waste_services`, `electro_services`,
`grass_services`, `heating_services`, `plumbing_services`, `el_inst_services`.

Транспорт: `transport_population_and_budget` + `transport_price_population_and_budget`,
`transport_jur` + `transport_price_jur`, `transport_other` + `transport_price_other`.

В текущей `backend/contacts.db` также есть пустые legacy-таблицы
`translations` и `schedule_reception` — фронтенд их не использует (график
приёма собирается из `contacts` и `src/Pages/ScheduleForms/ScheduleForms.tsx`).

Колонки-флаги (`is_primary`, `is_fax`, `is_external`) API всегда отдаёт
**числами** — на хостинге pdo_sqlite возвращает их строками, нормализация
делается в GET-роуте. На фронте используй `Number(x.flag) === 1`.

### `backend/.env` (см. `.env.example`)

```
SESSION_SECRET=...          HMAC-ключ сессий (bin2hex(random_bytes(32)))
ADMIN_PASSWORD_HASH=$2y$... bcrypt-хеш пароля (php backend/generate_hash.php)
SESSION_EXPIRY=604800      срок жизни сессии, сек (7 дней; пусто/0 -> 7 дней)
APP_ENV=production         зарезервировано, api.php его пока не читает
```

Без `.env` или с пустыми ключами вход всегда 500 — сайт публично жив,
админка закрыта (fail-closed).

### Защита

- `backend/.htaccess`: из папки бэкенда доступен только `api.php`
  (`.env`, БД, dev-скрипты — 403); корневой `.htaccess` запрещает любые `*.php`
  кроме `/backend/api.php` и `/seo.php`.
- Rate-limit входа: 5 неудач подряд → блок IP на 15 минут, сброс при успехе.
- Сессия: HMAC-подписанный токен, срок — `SESSION_EXPIRY` (по умолчанию 7 дней);
  при активности кука продлевается автоматически (sliding expiration).

### Админ-панель

`/manager`, вход — пароль из `.env`. Реализовано:

- **Контакты и отделы** — телефоны, картинки, галочка «Руководящий состав»
  (`is_primary`);
- **Услуги** — тарифы всех услуг и транспорта (`ServicesManager`, таблицы
  `*_services` и `transport_*`);
- **Документы** — группы и файлы (PDF, DOC/DOCX, XLS/XLSX, RTF, ODT/ODS);
- **Новости/статьи** — TipTap-редактор: текст, таблицы, картинки/галереи,
  видео, внешние ссылки, расписание публикации, блочный `custom_content`.

График приёма в админке не редактируется: ФИО и должности берутся из
`contacts`, а время приёма зашито в `src/Pages/ScheduleForms/ScheduleForms.tsx`
(таблица `schedule_reception` пустая; API держит её в whitelist, но страница
графика её не читает).

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
├── seo.php, seoConfig.json    # server-side meta (копируются из корня и src/data)
├── public-файлы...            # logo, uploads, documents, news, articles, cemetries, sitemap.xml...
├── .htaccess                  # SPA-роутинг через seo.php + запрет php
└── backend/
    ├── api.php                # копия из backend/
    ├── .htaccess              # доступен только api.php
    └── contacts.db            # ТОЛЬКО в prepare-deploy:first
```

> `backend/.env` **не попадает в `dist/`** — он создаётся/хранится на сервере
> вручную (см. `.env.example`). Не заливайте локальный `.env`: другой
> `SESSION_SECRET` разлогинивает админку, а другой пароль меняет вход.

### Автодеплой (GitHub Actions + FTP, опционально)

`.github/workflows/deploy.yml` при пуше в `main` (и вручную через
`workflow_dispatch`) сам прогоняет `typecheck`/`test`/`build` и заливает сайт
на Plesk по FTP. Пока он **выключен** — включается, когда в репозитории заданы:

- секреты (**Settings → Secrets and variables → Actions → Secrets**):
  `FTP_SERVER` (хост), `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_SERVER_DIR` (путь к веб-руту, напр. `/httpdocs/`);
- переменная (**… → Variables**): `DEPLOY_ENABLED` = `true`.

Workflow собирает `dist/`, добавляет `backend/api.php` и `backend/.htaccess` и заливает,
**не трогая** на сервере `.env` и `contacts.db` (`dangerous-clean-slate: false` + exclude).
Можно запустить вручную: **Actions → Deploy → Run workflow**.

### Требования к хостингу

- PHP **7.4+** с pdo_sqlite (на хостинге 7.4.33)
- Apache с mod_rewrite (Plesk: nginx+Apache)
- Каталог сайта (`dist/`) доступен на запись: `uploads/`, `contacts/`,
  `departments/`, `documents/`, `news/`, `articles/`, `useful_to_know/`
  и файл `backend/contacts.db`
- PHP может писать в `sys_get_temp_dir()` — там хранится счётчик попыток входа
  (rate-limit), сессии живут в подписанной куке и на диск не пишутся

### Типовые ошибки

| Симптом | Причина |
|---|---|
| Все запросы API → 500 `no such table` | В `dist/backend/` нет `contacts.db` (залит без `:first`) или она пустая |
| Вход → 500 | Нет `backend/.env` или пустые `SESSION_SECRET`/`ADMIN_PASSWORD_HASH` |
| Вход проходит, но сохранение → «сессия истекла» (401) | Пустой/нулевой `SESSION_EXPIRY` в серверном `.env` (кука истекает сразу); теперь трактуется как 7 дней — залить новый `api.php`. Также проверить, что вход и сохранение на одном хосте (`bkgkh.by` vs `www.bkgkh.by`) |
| 403 на `.env`/скрипты | Это защита, а не ошибка |
| 500 при сохранении статьи | В `api.php` появилась функция PHP 8+ (на хостинге PHP 7.4) |
| Ломается после заливки только `assets/` | Чанки и `index.html` должны обновляться **вместе**; заливай весь `dist/` |
| В Telegram/поиске у всех страниц один заголовок | Не залиты `seo.php`/`seoConfig.json` или старый `.htaccess` — маршруты идут мимо `seo.php` |

---

## Типовые задачи

### Сменить логотип
Заменить `public/logo.png`.

### Добавить/убрать пункт меню
`src/data/menu.ts` — одна структура для десктопа и мобилки, активный пункт
определяется автоматически (самый глубокий совпавший путь).

### Изменить расписание приёма (график)
`src/Pages/ScheduleForms/ScheduleForms.tsx` (таблица ~85-113, карточки-ссылки
~121-183); карточка `ScheduleLinkCard` в `styled.ts`. ФИО/должности приходят
из `contacts`, время приёма и телефоны зашиты в компоненте.

### Контакты в футере/шапке
`src/Components/Header/Header.tsx` (блоки `ContactInfo` и `MobileContactInfo`)
и `src/Components/Footer/Footer.tsx` (`FooterContactBlock`).

### Новые тарифы на услуги
Админка `/manager` → вкладка «Услуги» (`ServicesManager`): разделы
`*_services` и `transport_*`. Альтернатива — Sqlite Viewer →
`backend/contacts.db` → те же таблицы.

### SEO-тайтлы и мета
`src/data/seoConfig.json` — единый источник для фронта и `seo.php`. Статьям
мета собирается автоматически из БД; для ручного уточнения добавьте путь в
JSON.

`public/sitemap.xml` собирается из **статического списка** в
`scripts/generate-sitemap.js` — новая статья/страница попадёт в sitemap только
после добавления её URL туда (и пересборки).

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
