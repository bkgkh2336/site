import { Phone, Menu, X, Send } from "lucide-react"
import Section from "../Section/Section"
import Text from "../Text/Text"
import { HeaderContainer, Header_, Logo, Nav, ContactInfo, MobileActions, MobileContactInfo, MobileMenuButton, MobileMenu, MobileMenuOverlay } from "./styled"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface HeaderProps {
    ref?: React.RefObject<HTMLDivElement | null>
}

const Header = (props: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <MobileMenuOverlay 
                onClick={closeMobileMenu} 
                style={{ display: isMobileMenuOpen ? 'block' : 'none' }} 
            />
            <HeaderContainer>
                <Header_ ref={props.ref} as="header" role="banner">
                <Logo onClick={() => navigate('/')}>
                    <img
                        style={{ height: 50 }}
                        src="/logo.png"
                        alt="Логотип КЖУП Буда-Кошелёвский коммунальник"
                    />
                    <Text bold="bolder" className="full-name">КЖУП "Буда-Кошелёвский <br /> коммунальник"</Text>
                    <Text bold="bolder" className="short-name">КЖУП</Text>
                </Logo>
                
                <Nav as="nav" role="navigation" aria-label="Основная навигация">
                    <Section list={[]} caption="Главная" url=" " currentPath={currentPath} />
                    <Section
                        caption="Услуги и тарифы"
                        url="services"
                        currentPath={currentPath}
                    />
                    <Section 
                        caption="Для граждан"
                        currentPath={currentPath}
                        list={[
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
                        ]}
                    />
                    <Section 
                        caption="Пресс-центр"
                        currentPath={currentPath}
                        list={[
                            { caption: 'Новости', url: 'news' },
                            { caption: 'Статьи', url: 'news/articles' },
                            { caption: 'Полезно знать', url: 'news/useful_to_know' }
                        ]}
                    />
                    <Section caption="Документы" url='documents' currentPath={currentPath} />
                    <Section
                        currentPath={currentPath}
                        list={[
                            { caption: 'О нас', url: 'about_us' },
                            { caption: 'Реквизиты', url: 'requisites' },
                            { caption: 'Режим работы', url: 'work_schedule' },
                            { caption: 'Контакты', url: 'contacts' },
                            { caption: 'Вакансии', url: 'https://gsz.gov.by/registration/vacancy-search/?business_entity=121431' },
                        ]}
                        caption="О нас"
                    />
                </Nav>
                
                <ContactInfo>
                    <Phone style={{ width: '1rem', height: '1rem', color: '#28a745' }} aria-hidden="true" />
                    <a href="tel:+375233674507" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text bold="bold">+375 2336 7-45-07</Text>
                    </a>
                    <Send style={{ width: '1rem', height: '1rem', color: '#0088cc', marginLeft: '10px' }} aria-hidden="true" />
                    <a href="https://t.me/bkgkhBy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Text bold="bold">Telegram</Text>
                    </a>
                </ContactInfo>

                    <MobileContactInfo href="tel:+375233674507" aria-label="Позвонить">
                        <Phone size={20} />
                        <span>+375 2336 7-45-07</span>
                    </MobileContactInfo>
                    <MobileContactInfo href="https://t.me/bkgkhBy" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ color: '#0088cc' }}>
                        <Send size={20} />
                    </MobileContactInfo>

                    <MobileMenuButton onClick={toggleMobileMenu} aria-label="Меню">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </MobileMenuButton>
                    
                    <MobileActions>
                        <MobileContactInfo href="tel:+375233674507" aria-label="Позвонить">
                            <Phone size={18} />
                            <span>+375 2336 7-45-07</span>
                        </MobileContactInfo>
                        <MobileContactInfo href="https://t.me/bkgkhBy" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ color: '#0088cc' }}>
                            <Send size={18} />
                        </MobileContactInfo>
                        <MobileMenuButton onClick={toggleMobileMenu} aria-label="Меню">
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </MobileMenuButton>
                    </MobileActions>
                </Header_>

                {isMobileMenuOpen && (
                    <MobileMenu onClick={(e) => e.stopPropagation()}>
                        <div>
                            <Section 
                                list={[]} 
                                caption="Главная" 
                                url=" " 
                                isMobileMenu={true} 
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                            />
                            <Section
                                caption="Услуги и тарифы"
                                url="services"
                                isMobileMenu={true}
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                            />
                            <Section 
                                caption="Для граждан"
                                isMobileMenu={true}
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                                list={[
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
                                ]}
                            />
                            <Section 
                                caption="Пресс-центр"
                                isMobileMenu={true}
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                                list={[
                                    { caption: 'Новости', url: 'news' },
                                    { caption: 'Статьи', url: 'news/articles' },
                                    { caption: 'Полезно знать', url: 'news/useful_to_know' }
                                ]}
                            />
                            <Section 
                                caption="Документы" 
                                url='documents' 
                                isMobileMenu={true}
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                            />
                            <Section
                                isMobileMenu={true}
                                onNavigate={closeMobileMenu}
                                currentPath={currentPath}
                                list={[
                                    { caption: 'О нас', url: 'about_us' },
                                    { caption: 'Реквизиты', url: 'requisites' },
                                    { caption: 'Режим работы', url: 'work_schedule' },
                                    { caption: 'Контакты', url: 'contacts' },
                                    { caption: 'Вакансии', url: 'https://gsz.gov.by/registration/vacancy-search/?business_entity=121431' },
                                ]}
                                caption="О нас"
                            />
                            <div style={{ padding: '15px 10px', borderTop: '1px solid rgba(40, 167, 69, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <ContactInfo>
                                    <Phone style={{ width: '1rem', height: '1rem', color: '#28a745' }} aria-hidden="true" />
                                    <a href="tel:+375233674507" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Text bold="bold">+375 2336 7-45-07</Text>
                                    </a>
                                </ContactInfo>
                                <ContactInfo>
                                    <Send style={{ width: '1rem', height: '1rem', color: '#0088cc' }} aria-hidden="true" />
                                    <a href="https://t.me/bkgkhBy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Text bold="bold">Мы в Telegram</Text>
                                    </a>
                                </ContactInfo>
                            </div>
                        </div>
                    </MobileMenu>
                )}
            </HeaderContainer>
        </>
    )
}

export default Header