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
