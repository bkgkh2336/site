# КЖУП «Буда-Кошелёвский коммунальник» — Сайт

Сайт компании: **https://bkgkh.by**

---

## Технологический стек

| Компонент | Технология |
|---|---|
| Фреймворк | React 19 + TypeScript |
| Сборщик | Vite 6 |
| Стили | styled-components |
| Роутинг | react-router-dom v7 |
| Иконки | lucide-react |
| Бэкенд | PHP (без фреймворка) |
| База данных | SQLite |
| Деплой | Apache (.htaccess) |

---

## Быстрый старт

```bash
# 1. Установка зависимостей
npm install

# 2. Настройка бэкенда
cd backend
cp .env.example .env   # отредактировать .env
php generate_hash.php "ваш_пароль"  # сгенерировать хеш пароля
# Вставить полученный хеш в .env: PASSWORD_HASH=...

# 3. Запуск в разработке
cd ..
npm run dev
```

Сайт откроется на `http://localhost:5173`.

---

## Режимы запуска

```bash
npm run dev:full          запуск фронта и PHP-сервера одновременно
npm run dev               запуск фронта
npm run php               запуск только PHP-сервера (порт 8000)
npm run prepare-deploy    сборка в dist/, создание папки build/
```

---

## Структура проекта

```
JKX/
├── src/                          # Исходники фронтенда
│   ├── main.tsx                  # Точка входа
│   ├── App.tsx                   # Корневой компонент (роутер, 49 маршрутов)
│   ├── functions.ts              # Функция GetData() для запросов к API
│   ├── accessibility.css         # Стили для слабовидящих
│   ├── App.css                   # Глобальные стили
│   ├── vite-env.d.ts
│   ├── Components/               # Переиспользуемые компоненты
│   │   ├── Header/               # Шапка: навигация + телефон + Telegram
│   │   ├── Footer/               # Подвал: копирайт + контакты + Telegram
│   │   ├── Breadcrumbs/          # Хлебные крошки
│   │   ├── ExternalLink/         # Ссылка на внешний ресурс
│   │   └── ...                   # 30+ компонентов
│   ├── Pages/                    # Страницы
│   │   ├── Main/                 # Главная
│   │   ├── ScheduleForms/        # График приёма
│   │   ├── WorkSchedule/         # Режим работы
│   │   ├── Contacts/             # Контакты
│   │   ├── Services/             # Услуги (11 подстраниц)
│   │   ├── ForCitizens/          # Для граждан (14 подстраниц)
│   │   ├── News/                 # Пресс-центр
│   │   ├── Documents/            # Документы
│   │   ├── Manager/              # Админ-панель
│   │   └── ...                   # Остальные страницы
│   └── utils/
│       └── seoConfig.ts          # SEO-конфигурация (тайтлы, описания)
├── backend/                      # PHP-бэкенд
│   ├── api.php                   # REST API (470 строк)
│   ├── contacts.db               # SQLite база данных
│   ├── .env                      # Переменные окружения
│   └── generate_hash.php         # Генератор пароля
├── public/                       # Статические файлы
│   ├── logo.png
│   ├── sitemap.xml               # Автогенерируется при сборке
│   ├── robots.txt
│   ├── uploads/                  # Загруженные через админку изображения
│   ├── documents/                # PDF-документы
│   └── news/                     # Изображения для новостей
├── scripts/
│   └── generate-sitemap.js       # Генератор sitemap.xml
├── .htaccess                     # Apache: SPA-роутинг + кэширование + Gzip
├── vite.config.ts
└── tsconfig.json
```

---

## Frontend: как это работает

### Страницы

Каждая страница — это React-компонент в `src/Pages/`. Состоит из:
- `MyPage.tsx` — логика и вёрстка
- `styled.ts` — styled-components стили

**Чтобы добавить новую страницу:**
1. Создать папку `src/Pages/MyNewPage/` с `MyNewPage.tsx` и `styled.ts`
2. В `src/App.tsx`:
   - Добавить import: `const MyNewPage = lazy(() => import('./Pages/MyNewPage/MyNewPage'));`
   - Добавить `<Route>` внутри `<Routes>`
3. В `src/utils/seoConfig.ts` — добавить SEO-метаданные
4. В `src/Components/Header/Header.tsx` — добавить пункт меню (если нужно)
5. В `src/Components/Breadcrumbs/Breadcrumbs.tsx` — добавить хлебные крошки (если нужно)

### Стили

Все стили — через `styled-components`. Каждая страница/компонент имеет свой `styled.ts` с экспортами:
```tsx
import styled from 'styled-components';
export const MyBlock = styled.div`
    color: #333;
    @media (max-width: 768px) { ... }
`;
```

### Иконки

Используется библиотека `lucide-react`. Иконки tree-shake-ятся при сборке.
```tsx
import { Phone, Send, Building2 } from 'lucide-react';
<Phone size={20} color="#28a745" />
```

Полный список иконок: https://lucide.dev/icons

### Тёмная тема для слабовидящих

Реализована через CSS-классы на `<body>`:
- `.bvi-mode` — увеличенный шрифт
- `.bvi-mode-dark` — тёмный фон + белый текст
- `.bvi-mode-light` — светлый фон + чёрный текст

Управляется компонентом `AccessibilityPanel`.

---

## Backend: PHP + SQLite

### API

Единый файл: `backend/api.php`

**Без авторизации (GET, чтение):**
```
GET /backend/api.php/api/contacts          — все контакты
GET /backend/api.php/api/departments       — все отделы
GET /backend/api.php/api/documents         — все документы
GET /backend/api.php/api/{table}           — любая таблица
```

**С авторизацией (POST/PUT/DELETE):**
```
POST   /backend/api.php/api/login          — вход (пароль из .env)
POST   /backend/api.php/api/contacts       — создать контакт
PUT    /backend/api.php/api/contacts/5     — обновить контакт
DELETE /backend/api.php/api/contacts/5     — удалить контакт
POST   /backend/api.php/api/upload         — загрузить изображение
POST   /backend/api.php/api/cleanup        — удалить осиротевшие картинки
```

**Таблицы БД:** contacts, phone_contacts, departments, phone_departments, documents_group, documents, schedule_reception, ventilation_services, waste_services, electro_services, grass_services, heating_services, plumbing_services, el_inst_services, transport_price_population_and_budget, transport_population_and_budget, transport_price_jur, transport_jur, transport_price_other, transport_other.

### Настройка бэкенда

Файл `backend/.env`:
```
SESSION_SECRET=случайная_строка
SESSION_EXPIRY=3600
PASSWORD_HASH=хеш_пароля_php_generate_hash
CORS_ORIGINS=https://bkgkh.by,https://www.bkgkh.by
APP_ENV=production
```

Сгенерировать хеш пароля:
```bash
cd backend
php generate_hash.php "мой_пароль"
```

### Админ-панель

Доступна по адресу `/manager` после авторизации. Позволяет:
- Управлять контактами и отделами
- Загружать изображения
Остальной функционал не реализован.

Вход: пароль, указанный в `backend/.env`.

---

## Сборка и деплой

```bash
# 1. Собрать фронт
npm run build

# 2. Подготовить к деплою (копирует dist + backend + .htaccess)
npm run assemble

# 3. Или всё одной командой:
npm run prepare-deploy
```

После `assemble` всё будет в папке `build/`:
```
build/
├── dist/            # Собранный фронтенд (index.html + assets/)
├── dist/backend/    # PHP-бэкенд + contacts.db
├── .htaccess        # Правила Apache
```

### Требования к хостингу

- Apache с mod_rewrite
- PHP 8.x с расширением SQLite (pdo_sqlite)
- `.htaccess` уже настроен для SPA-роутинга

### Структура на сервере

```
public_html/
├── index.html          # из dist/
├── assets/             # из dist/assets/
├── backend/            # PHP + .env + contacts.db
├── .htaccess
├── logo.png
├── uploads/            # загруженные изображения
├── documents/          # PDF-документы
└── sitemap.xml
```

Если бэкенд отдаёт 404:
- Убедитесь, что в `backend/.env` `APP_ENV=production` (иначе показываются ошибки)
- Проверьте права на `backend/contacts.db` (должен быть доступен на запись для PHP)
- Проверьте пути в `.htaccess`

---

## Типовые задачи

### Как сменить логотип

Заменить `public/logo.png` (на сервере — в корне сайта).

### Как добавить/убрать пункт меню

Файл `src/Components/Header/Header.tsx`:
- Найти блок `<Section caption="Для граждан">`
- Добавить или удалить элемент в массиве `list`
- Сделать то же самое в мобильном меню (блок `<MobileMenu>`)

### Как изменить расписание приёма (график)

- Таблица-расписание КЖУП: `src/Pages/ScheduleForms/ScheduleForms.tsx` (строки 96-104)
- Карточки-ссылки (райисполком, ГО ЖКХ, Министерство): там же, строки 120-161
- Карточка в стиле styled-components: экспорт `ScheduleLinkCard` в `src/Pages/ScheduleForms/styled.ts`

### Как изменить контакты в футере

Файл `src/Components/Footer/Footer.tsx`.

### Как изменить контакты в шапке

Файл `src/Components/Header/Header.tsx`, блок `ContactInfo` (desktop) и `MobileContactInfo` (mobile).

### Как добавить новые тарифы на услуги

Скачать Sqlite Viewer и загрузить БД `backend/contacts.db`, затем в ней менять таблицы.

### Как поменять SEO-тайтлы

Файл `src/utils/seoConfig.ts`.

### Как добавить новую картинку/PDF

Положить в `public/` или подпапку (`public/documents/`, `public/news/`).
Доступно по URL: `/название_файла.pdf`.

### Как заменить ссылку на Telegram

Файлы:
- `src/Components/Footer/Footer.tsx` — футер
- `src/Components/Header/Header.tsx` — шапка (desktop + mobile)

---

## Загрузка изменений на хостинг

1. В проекте выполните команду:

```bash
npm run prepare-deploy
```

После выполнения команды будет создана (или обновлена) папка `dist/`.

2. Подключитесь к хостингу по FTP (url - bkgkh.by).

3. Загрузите **всё содержимое** папки `dist/` в каталог `develop.bkgkh.by` (тестовый домен).

> **Важно:** `develop.bkgkh.by` предназначен только для проверки изменений и не открывается как обычный сайт.

4. Чтобы открыть тестовую версию сайта:

   * войдите в Plesk;
   * найдите домен `develop.bkgkh.by`;
   * наведите курсор на кнопку **«Предпросмотр»** и нажмите её.

5. Проверьте, что сайт работает корректно и изменения отображаются без ошибок.

6. Если всё в порядке, скопируйте файлы из `develop.bkgkh.by` в `public.bkgkh.by` (публичный сайт).
