import { Phone, Send } from "lucide-react"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Section from "../Section/Section"
import Text from "../Text/Text"
import {
    HeaderContainer, Header_, Logo, Nav, ContactInfo, MobileActions, MobileContactInfo,
    HamburgerButton, HamburgerIcon, BottomSheet, BottomSheetHandle, BottomSheetHandleBar,
    BottomSheetContent, SheetDivider,
    MobileMenuOverlay
} from "./styled"
import styled from "styled-components"

const SheetHeaderBtn = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 14px 12px;
    background: ${({ $active }) => $active ? 'rgba(40, 167, 69, 0.08)' : 'transparent'};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: ${({ $active }) => $active ? 700 : 500};
    color: ${({ $active }) => $active ? '#28a745' : '#333'};
    text-align: left;
    transition: all 0.2s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    &:hover {
        background: rgba(40, 167, 69, 0.06);
    }
    
    &:active {
        background: rgba(40, 167, 69, 0.12);
    }
    
    @media (max-width: 480px) {
        padding: 12px 10px;
        font-size: 0.95rem;
    }
`;

const SheetSubmenuBtn = styled.button<{ $active: boolean }>`
    display: block;
    width: 100%;
    padding: 12px 12px;
    background: ${({ $active }) => $active ? 'rgba(40, 167, 69, 0.1)' : 'transparent'};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: ${({ $active }) => $active ? 600 : 400};
    color: ${({ $active }) => $active ? '#28a745' : '#555'};
    text-align: left;
    transition: all 0.2s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    &:hover {
        background: rgba(40, 167, 69, 0.06);
    }
    
    &:active {
        background: rgba(40, 167, 69, 0.12);
    }
    
    @media (max-width: 480px) {
        padding: 10px;
        font-size: 0.85rem;
    }
`;

const SheetChevron = styled.span<{ $open: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(${({ $open }) => $open ? 180 : 0}deg);
    flex-shrink: 0;
`;

const SheetSubmenuWrap = styled.div<{ $open: boolean }>`
    max-height: ${({ $open }) => $open ? '500px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    opacity: ${({ $open }) => $open ? 1 : 0};
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 12px;
`;

interface HeaderProps {
    ref?: React.RefObject<HTMLDivElement | null>
}

const Header = (props: HeaderProps) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const sheetRef = useRef<HTMLDivElement>(null);

    const openBottomSheet = useCallback(() => {
        setIsBottomSheetOpen(true);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overscrollBehavior = 'none';
        document.body.style.overscrollBehavior = 'none';
    }, []);

    const closeBottomSheet = useCallback(() => {
        setIsBottomSheetOpen(false);
        setExpandedSection(null);
        document.body.style.overflow = '';
        document.documentElement.style.overscrollBehavior = '';
        document.body.style.overscrollBehavior = '';
    }, []);

    const toggleBottomSheet = useCallback(() => {
        if (isBottomSheetOpen) {
            closeBottomSheet();
        } else {
            openBottomSheet();
        }
    }, [isBottomSheetOpen, closeBottomSheet, openBottomSheet]);

    const toggleSection = useCallback((caption: string) => {
        setExpandedSection(prev => prev === caption ? null : caption);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isBottomSheetOpen) {
                closeBottomSheet();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isBottomSheetOpen, closeBottomSheet]);

    useEffect(() => {
        if (!isBottomSheetOpen) {
            document.body.style.overflow = '';
            document.documentElement.style.overscrollBehavior = '';
            document.body.style.overscrollBehavior = '';
        }
    }, [isBottomSheetOpen]);

    useEffect(() => {
        if (!isBottomSheetOpen) return;
        const sheet = sheetRef.current;
        if (!sheet) return;

        let startY = 0;
        let lastY = 0;
        let currentY = 0;
        let dragging = false;
        let decided = false;

        const onTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
            lastY = startY;
            currentY = 0;
            dragging = false;
            decided = false;
        };

        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0].clientY;
            const dyFromStart = y - startY;
            const deltaScroll = lastY - y;
            lastY = y;

            const target = e.target instanceof Node ? e.target : null;
            const insideSheet = !!(target && sheet.contains(target));

            if (!insideSheet) {
                e.preventDefault();
                return;
            }

            if (!decided) {
                if (Math.abs(dyFromStart) < 8) return;
                decided = true;
                if (dyFromStart > 0 && sheet.scrollTop <= 0) {
                    dragging = true;
                    sheet.style.transition = 'none';
                }
            }

            if (dragging) {
                currentY = Math.max(0, dyFromStart);
                sheet.style.transform = `translateY(${currentY}px)`;
                e.preventDefault();
                return;
            }

            const atTop = sheet.scrollTop <= 0;
            const atBottom = sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 1;
            const canScroll = (deltaScroll < 0 && !atTop) || (deltaScroll > 0 && !atBottom);
            if (!canScroll) {
                e.preventDefault();
            }
        };

        const onTouchEnd = () => {
            if (dragging) {
                sheet.style.transition = '';
                sheet.style.transform = '';
                if (currentY > 80) {
                    closeBottomSheet();
                }
            }
            dragging = false;
            decided = false;
            currentY = 0;
        };

        const onWheel = (e: WheelEvent) => {
            const atTop = sheet.scrollTop <= 0;
            const atBottom = sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 1;
            const canScroll = (e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom);
            if (!canScroll) {
                e.preventDefault();
            }
        };

        sheet.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
        document.addEventListener('wheel', onWheel, { passive: false });
        return () => {
            sheet.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
            document.removeEventListener('wheel', onWheel);
            sheet.style.transition = '';
            sheet.style.transform = '';
        };
    }, [isBottomSheetOpen, closeBottomSheet]);

    const menuSections = useMemo(() => [
        { caption: "Главная", url: " " },
        { caption: "Услуги и тарифы", url: "services" },
        { caption: "Для граждан", list: [
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
        ]},
        { caption: "Пресс-центр", list: [
            { caption: 'Новости', url: 'news' },
            { caption: 'Статьи', url: 'news/articles' },
            { caption: 'Полезно знать', url: 'news/useful_to_know' }
        ]},
        { caption: "Документы", url: 'documents' },
        { caption: "О нас", list: [
            { caption: 'О нас', url: 'about_us' },
            { caption: 'Реквизиты', url: 'requisites' },
            { caption: 'Режим работы', url: 'work_schedule' },
            { caption: 'Контакты', url: 'contacts' },
            { caption: 'Вакансии', url: 'https://gsz.gov.by/registration/vacancy-search/?business_entity=121431' },
        ]},
    ], []);

    const isSectionActive = useCallback((section: { url?: string; list?: { url: string }[] }) => {
        if (section.url !== undefined) {
            const target = section.url.trim() === '' ? '/' : section.url;
            return currentPath === target;
        }
        return section.list?.some(item => item.url === currentPath) || false;
    }, [currentPath]);

    return (
        <>
            <HeaderContainer>
                <Header_
                    ref={props.ref}
                    as="header"
                    role="banner"
                    onClick={() => {
                        if (isBottomSheetOpen) closeBottomSheet();
                    }}
                >
                    <Logo onClick={() => navigate('/')}>
                        <img style={{ height: 50 }} src="/logo.png" alt="Логотип КЖУП Буда-Кошелёвский коммунальник" />
                        <Text bold="bolder" className="full-name">КЖУП "Буда-Кошелёвский <br /> коммунальник"</Text>
                        <Text bold="bolder" className="short-name">КЖУП</Text>
                    </Logo>

                    <Nav as="nav" role="navigation" aria-label="Основная навигация">
                        <Section list={[]} caption="Главная" url=" " currentPath={currentPath} />
                        <Section caption="Услуги и тарифы" url="services" currentPath={currentPath} />
                        <Section caption="Для граждан" currentPath={currentPath} list={[
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
                        ]} />
                        <Section caption="Пресс-центр" currentPath={currentPath} list={[
                            { caption: 'Новости', url: 'news' },
                            { caption: 'Статьи', url: 'news/articles' },
                            { caption: 'Полезно знать', url: 'news/useful_to_know' }
                        ]} />
                        <Section caption="Документы" url='documents' currentPath={currentPath} />
                        <Section currentPath={currentPath} list={[
                            { caption: 'О нас', url: 'about_us' },
                            { caption: 'Реквизиты', url: 'requisites' },
                            { caption: 'Режим работы', url: 'work_schedule' },
                            { caption: 'Контакты', url: 'contacts' },
                            { caption: 'Вакансии', url: 'https://gsz.gov.by/registration/vacancy-search/?business_entity=121431' },
                        ]} caption="О нас" />
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

                    <HamburgerButton onClick={toggleBottomSheet} aria-label={isBottomSheetOpen ? "Закрыть меню" : "Открыть меню"}>
                        <HamburgerIcon $open={isBottomSheetOpen}>
                            <span />
                            <span />
                            <span />
                        </HamburgerIcon>
                    </HamburgerButton>

                    <MobileActions>
                        <MobileContactInfo href="tel:+375233674507" aria-label="Позвонить">
                            <Phone size={18} />
                            <span>+375 2336 7-45-07</span>
                        </MobileContactInfo>
                        <MobileContactInfo href="https://t.me/bkgkhBy" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ color: '#0088cc' }}>
                            <Send size={18} />
                        </MobileContactInfo>
                    </MobileActions>
                </Header_>
            </HeaderContainer>

            <MobileMenuOverlay
                className={isBottomSheetOpen ? 'visible' : ''}
                onClick={closeBottomSheet}
            />

            <BottomSheet ref={sheetRef} $open={isBottomSheetOpen}>
                <BottomSheetHandle data-sheet-handle>
                    <BottomSheetHandleBar />
                </BottomSheetHandle>

                <BottomSheetContent>
                    {menuSections.map((section, index) => {
                        const hasSubmenu = section.list && section.list.length > 0;
                        const isExpanded = expandedSection === section.caption;
                        const isActive = isSectionActive(section);

                        return (
                            <div key={section.caption} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <SheetHeaderBtn $active={isActive} onClick={() => {
                                    if (hasSubmenu) {
                                        toggleSection(section.caption);
                                    } else if (section.url && section.url !== ' ') {
                                        navigate(section.url === ' ' ? '/' : section.url);
                                        closeBottomSheet();
                                    }
                                }}>
                                    <span>{section.caption}</span>
                                    {hasSubmenu && (
                                        <SheetChevron $open={isExpanded}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </SheetChevron>
                                    )}
                                </SheetHeaderBtn>
                                {hasSubmenu && (
                                    <SheetSubmenuWrap $open={isExpanded}>
                                        {section.list.map((item) => (
                                            <SheetSubmenuBtn
                                                key={item.caption}
                                                $active={currentPath === item.url}
                                                onClick={() => {
                                                    if (item.url.startsWith('http')) {
                                                        window.open(item.url, '_blank', 'noopener,noreferrer');
                                                    } else {
                                                        navigate(item.url);
                                                    }
                                                    closeBottomSheet();
                                                }}
                                            >
                                                {item.caption}
                                            </SheetSubmenuBtn>
                                        ))}
                                    </SheetSubmenuWrap>
                                )}
                                {index < menuSections.length - 1 && <SheetDivider />}
                            </div>
                        );
                    })}
                </BottomSheetContent>

            </BottomSheet>
        </>
    )
}

export default Header
