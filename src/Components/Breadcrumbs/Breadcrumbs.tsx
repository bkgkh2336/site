import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbsContainer, BreadcrumbsList, BreadcrumbItem, BreadcrumbLink, BreadcrumbText } from './styled';

interface PageConfig {
    name: string;
    parent?: { name: string; url?: string }[];
}

interface PageMap {
    [key: string]: PageConfig;
}

// Структура на основе Header меню
const pageHierarchy: PageMap = {
    // Услуги и тарифы
    '/services': { name: 'Услуги и тарифы' },
    '/ventilation_services': { name: 'Вентиляция и дымовые каналы', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/waste_services': { name: 'Вывоз мусора', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/electro_services': { name: 'Электрофизические измерения', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/grass_services': { name: 'Скашивание травы', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/heating_services': { name: 'Отопление', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/plumbing_services': { name: 'Водопровод и канализация', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/el_inst_services': { name: 'Электромонтажные работы', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/transport_services': { name: 'Транспорт для населения', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/transport_jur_services': { name: 'Транспорт для юр. лиц', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/transport_other_services': { name: 'Прочие транспортные услуги', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    '/cemetery_services': { name: 'Документы по обращению с отходами', parent: [{ name: 'Услуги и тарифы', url: '/services' }] },
    
    // Для граждан
    '/schedule_forms': { name: 'График приема', parent: [{ name: 'Для граждан' }] },
    '/service_115': { name: 'Служба 115', parent: [{ name: 'Для граждан' }] },
    '/payment': { name: 'Платежи через систему ЕРИП', parent: [{ name: 'Для граждан' }] },
    '/appeals': { name: 'Обращения граждан и юр. лиц', parent: [{ name: 'Для граждан' }] },
    '/administrative_procedures': { name: 'Административные процедуры', parent: [{ name: 'Для граждан' }] },
    '/sale_and_lease': { name: 'Продажа и аренда', parent: [{ name: 'Для граждан' }] },
    '/tariffs': { name: 'Тарифы ЖКУ', parent: [{ name: 'Для граждан' }] },
    '/blank_bmp': { name: 'Заготовка BMP', parent: [{ name: 'Для граждан' }] },
    '/plans_and_schedules': { name: 'Планы и графики', parent: [{ name: 'Для граждан' }] },
    '/non_cash_housing_subsidies': { name: 'Безналичные жилищные субсидии', parent: [{ name: 'Для граждан' }] },
    '/information_about_communal': { name: 'Информация о сфере ЖКХ', parent: [{ name: 'Для граждан' }] },
    '/assistance_disabilities': { name: 'Помощь инвалидам', parent: [{ name: 'Для граждан' }] },
    '/surveys': { name: 'Опросы', parent: [{ name: 'Для граждан' }] },
    '/cybersecurity': { name: 'Кибербезопасность', parent: [{ name: 'Для граждан' }] },
    
    // Пресс-центр
    '/news': { name: 'Новости', parent: [{ name: 'Пресс-центр' }] },
    '/news/union_conference': { name: 'Прошла отчетная профсоюзная конференция', parent: [{ name: 'Пресс-центр' }, { name: 'Новости', url: '/news' }] },
    '/news/useful_to_know': { name: 'Полезно знать', parent: [{ name: 'Пресс-центр' }] },
    '/news/useful_to_know/phone_scammers': { name: 'Телефонные мошенники', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/safe_internet_cards': { name: 'Безопасность в сети', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/pomogut_by': { name: 'Pomogut BY', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/boiler_safety': { name: 'Безопасность котлов', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/composting_guide': { name: 'Компостирование', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/waste_containers_guide': { name: 'Контейнеры для отходов', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/waste_removal_guide': { name: 'Вывоз коммунальных отходов', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/yard_recycling_guide': { name: 'Раздельный сбор отходов', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/useful_to_know/landscaping_guide': { name: 'Благоустройство', parent: [{ name: 'Пресс-центр' }, { name: 'Полезно знать', url: '/news/useful_to_know' }] },
    '/news/articles': { name: 'Статьи', parent: [{ name: 'Пресс-центр' }] },
    '/news/articles/boiler_maintenance': { name: 'Профилактика и уход за котельными установками', parent: [{ name: 'Пресс-центр' }, { name: 'Статьи', url: '/news/articles' }] },
    '/news/articles/attractions_safety': { name: 'Аттракцион должен быть безопасным!', parent: [{ name: 'Пресс-центр' }, { name: 'Статьи', url: '/news/articles' }] },
    
    // Документы
    '/documents': { name: 'Документы' },
    
    // О нас
    '/about_us': { name: 'О нас', parent: [{ name: 'О нас' }] },
    '/requisites': { name: 'Реквизиты', parent: [{ name: 'О нас' }] },
    '/work_schedule': { name: 'Режим работы', parent: [{ name: 'О нас' }] },
    '/contacts': { name: 'Контакты', parent: [{ name: 'О нас' }] },
};

const Breadcrumbs = () => {
    const location = useLocation();

    // Не показываем на главной странице
    if (location.pathname === '/') {
        return null;
    }

    const pageConfig = pageHierarchy[location.pathname];
    
    // Если страница не найдена в конфигурации, не показываем breadcrumbs
    if (!pageConfig) {
        return null;
    }

    // Собираем полный путь breadcrumbs
    const breadcrumbItems: Array<{ name: string; url?: string }> = [];
    
    // Добавляем родителей
    if (pageConfig.parent) {
        breadcrumbItems.push(...pageConfig.parent);
    }
    
    // Добавляем текущую страницу
    breadcrumbItems.push({ name: pageConfig.name, url: location.pathname });

    return (
        <BreadcrumbsContainer>
            <BreadcrumbsList>
                <BreadcrumbItem>
                    <BreadcrumbLink to="/">
                        <Home size={16} />
                        <span>Главная</span>
                    </BreadcrumbLink>
                    <ChevronRight size={16} />
                </BreadcrumbItem>

                {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;

                    return (
                        <BreadcrumbItem key={item.url || item.name}>
                            {isLast ? (
                                <BreadcrumbText>{item.name}</BreadcrumbText>
                            ) : (
                                <>
                                    {item.url ? (
                                        <BreadcrumbLink to={item.url}>
                                            {item.name}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbText as="span" style={{ fontWeight: 500, color: '#5a6c7d' }}>
                                            {item.name}
                                        </BreadcrumbText>
                                    )}
                                    <ChevronRight size={16} />
                                </>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbsList>
        </BreadcrumbsContainer>
    );
};

export default Breadcrumbs;