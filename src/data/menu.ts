export interface MenuItem {
    caption: string;
    url: string;
}

export interface MenuSection {
    caption: string;
    url?: string;
    list?: MenuItem[];
}

export const menuSections: MenuSection[] = [
    { caption: "Главная", url: " " },
    { caption: "Услуги и тарифы", url: "services" },
    {
        caption: "Для граждан",
        list: [
            { caption: 'График приема', url: 'schedule_forms' },
            { caption: 'Служба 115', url: 'service_115' },
            { caption: 'Платежи через систему ЕРИП', url: 'payment' },
            { caption: 'Обращения граждан и юр. лиц', url: 'appeals' },
            { caption: 'Административные процедуры', url: 'administrative_procedures' },
            { caption: 'Продажа и аренда', url: 'sale_and_lease' },
            { caption: 'Тарифы ЖКУ', url: 'tariffs' },
            { caption: 'Заготовка BMP', url: 'blank_bmp' },
            { caption: 'Планы и графики', url: 'plans_and_schedules' },
            { caption: 'Безналичные жилищные субсидии', url: 'non_cash_housing_subsidies' },
            { caption: 'Информация о сфере ЖКХ', url: 'information_about_communal' },
            { caption: 'Помощь инвалидам', url: 'assistance_disabilities' },
            { caption: 'Опросы', url: 'surveys' },
            { caption: 'Кибербезопасность', url: 'cybersecurity' },
        ],
    },
    {
        caption: "Пресс-центр",
        list: [
            { caption: 'Новости', url: 'news' },
            { caption: 'Статьи', url: 'news/articles' },
            { caption: 'Полезно знать', url: 'news/useful_to_know' },
        ],
    },
    { caption: "Документы", url: 'documents' },
    {
        caption: "О нас",
        list: [
            { caption: 'О нас', url: 'about_us' },
            { caption: 'Реквизиты', url: 'requisites' },
            { caption: 'Режим работы', url: 'work_schedule' },
            { caption: 'Контакты', url: 'contacts' },
            { caption: 'Вакансии', url: 'https://gsz.gov.by/registration/vacancy-search/?business_entity=121431' },
        ],
    },
];

/** Путь меню: ведущий слэш, без хвостовых слэшей (кроме корня). */
export const normalizeMenuPath = (path: string): string => {
    const trimmed = path.trim();
    const base = trimmed === '' || trimmed === ' ' ? '/' : trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return base.length > 1 ? base.replace(/\/+$/, '') : base;
};

export const isExternalMenuUrl = (url: string): boolean => /^https?:\/\//.test(url);

/** Точное совпадение пункта меню с текущим путём или вложенная страница. */
export const isMenuItemActive = (itemUrl: string, currentPath: string): boolean => {
    if (isExternalMenuUrl(itemUrl)) return false;
    const current = normalizeMenuPath(currentPath);
    const item = normalizeMenuPath(itemUrl);
    return current === item || (item !== '/' && current.startsWith(`${item}/`));
};

/**
 * Активный подпункт текущего раздела: из всех совпавших (включая вложенные
 * страницы) берётся самый глубокий — /news/articles/... подсвечивает
 * «Статьи», а не одновременно «Статьи» и «Новости».
 */
export const getActiveMenuItem = (list: MenuItem[] | undefined, currentPath: string): MenuItem | null => {
    if (!list || list.length === 0) return null;
    let best: MenuItem | null = null;
    for (const item of list) {
        if (!isMenuItemActive(item.url, currentPath)) continue;
        if (!best || normalizeMenuPath(item.url).length > normalizeMenuPath(best.url).length) {
            best = item;
        }
    }
    return best;
};
