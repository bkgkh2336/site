import { useEffect, useRef, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../Text/Text";
import Section_tooltip from "../Section_tooltip/Section_tooltip";
import { TooltipItem } from "../Section_tooltip/styled";
import Button from "../Button/Button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionProps {
    src?: string,
    caption: string;
    list?: ListProps[];
    url?: string;
    isMobileMenu?: boolean;
    onNavigate?: () => void;
    currentPath?: string;
}

interface ListProps {
    caption: string;
    url: string;
}

const Section = (props: SectionProps) => {
    const [isVisibleCard, setIsVisibleCard] = useState(false);
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Проверяем активность раздела
    const isActive = () => {
        if (!props.currentPath) return false;
        
        // Нормализуем текущий путь
        const normalizedCurrentPath = props.currentPath.startsWith('/') ? props.currentPath : `/${props.currentPath}`;
        
        // Проверка прямого URL раздела
        if (props.url) {
            const trimmedUrl = props.url.trim();
            
            // Пропускаем внешние ссылки
            if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
                return false;
            }
            
            // Нормализуем URL
            const normalizedUrl = trimmedUrl === '' || trimmedUrl === ' ' 
                ? '/' 
                : (trimmedUrl.startsWith('/') ? trimmedUrl : `/${trimmedUrl}`);
            
            // Проверяем точное совпадение
            if (normalizedCurrentPath === normalizedUrl) {
                return true;
            }
        }
        
        // Проверяем совпадение с любым URL из списка подразделов
        if (props.list && props.list.length > 0) {
            return props.list.some(item => {
                // Пропускаем внешние ссылки
                if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
                    return false;
                }
                
                const normalizedItemUrl = item.url.startsWith('/') ? item.url : `/${item.url}`;
                return normalizedCurrentPath === normalizedItemUrl;
            });
        }
        
        return false;
    };

    const active = isActive();

    const isExternalUrl = (url: string) => {
        return url.startsWith('http://') || url.startsWith('https://');
    };

    const normalizePath = (url: string) => {
        const trimmed = url.trim();
        const base = trimmed === '' || trimmed === ' '
            ? '/'
            : (trimmed.startsWith('/') ? trimmed : `/${trimmed}`);
        return base.length > 1 ? base.replace(/\/+$/, '') : base;
    };

    // Активен ли конкретный подпункт: точное совпадение или вложенная страница
    const isItemActive = (itemUrl: string) => {
        if (!props.currentPath || isExternalUrl(itemUrl)) return false;
        const current = normalizePath(props.currentPath);
        const item = normalizePath(itemUrl);
        return current === item || (item !== '/' && current.startsWith(`${item}/`));
    };

    const handleNavigation = (url: string) => {
        // Закрываем меню перед навигацией
        if (props.onNavigate) {
            props.onNavigate();
        }
        
        if (isExternalUrl(url)) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            navigate(url);
        }
    };

    const handleClick = (e?: React.MouseEvent) => {
        // Останавливаем propagation чтобы не закрыть меню
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        
        if (props.isMobileMenu && props.list && props.list.length > 0) {
            // В мобильном меню переключаем раскрытие списка
            setIsMobileExpanded(!isMobileExpanded);
        } else if (props.url) {
            // Если есть URL и это не подменю, переходим
            handleNavigation(props.url);
        }
    };

    // Открытие/закрытие дропдауна с защитой от гонки:
    // возврат на пункт за время закрытия отменяет таймер
    const handleMouseEnter = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
        setIsVisibleCard(true);
    };

    const handleMouseLeave = () => {
        hideTimerRef.current = setTimeout(() => {
            setIsVisibleCard(false);
            hideTimerRef.current = null;
        }, 300);
    };

    const cancelHideTimer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    // Закрытие дропдауна кликом мимо и по Escape (пока он открыт)
    useEffect(() => {
        if (!isVisibleCard) {
            return;
        }

        const handleDocumentClick = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                cancelHideTimer();
                setIsVisibleCard(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                cancelHideTimer();
                setIsVisibleCard(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisibleCard]);

    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }
        };
    }, []);

    // Клик по разделу: подменю — toggle, обычный пункт — навигация
    const handleRootClick = () => {
        if (props.list && props.list.length > 0) {
            cancelHideTimer();
            setIsVisibleCard(visible => !visible);
        } else if (props.url) {
            handleNavigation(props.url);
        }
    };

    // Для мобильного меню используем click вместо hover
    if (props.isMobileMenu) {
        return (
            <div style={{ width: '100%' }}>
                <Button 
                    style={{ 
                        boxShadow: 'none',
                        width: '100%',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                    onClick={handleClick}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: active ? '#28a745' : 'inherit' }}>
                        {props.src && (
                            <img
                                style={{ height: 30 }}
                                src={props.src}
                                alt={props.caption}
                            />
                        )}
                        <Text>{props.caption}</Text>
                    </div>
                    {props.list && props.list.length > 0 && (
                        isMobileExpanded ? 
                            <ChevronUp size={18} /> : 
                            <ChevronDown size={18} />
                    )}
                </Button>
                {isMobileExpanded && props.list && props.list.length > 0 && (
                    <div style={{ 
                        paddingLeft: '20px', 
                        marginTop: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        {props.list.map((item) => (
                            <Button
                                key={item.caption}
                                style={{ 
                                    width: "100%",
                                    backgroundColor: '#f8f9fa'
                                }}
                                onClick={() => handleNavigation(item.url)}
                            >
                                <Text style={{ 
                                    textAlign: 'left',
                                    width: '100%',
                                    display: 'block',
                                    fontSize: '0.9rem'
                                }}>
                                    {item.caption}
                                </Text>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Для desktop меню оставляем hover
    return (
        <div
            ref={rootRef}
            onClick={handleRootClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Button style={{ boxShadow: 'none' }}>
                {props.src &&
                    <img
                        style={{ height: 30 }}
                        src={props.src}
                        alt={props.caption}
                    />}
                <Text style={{ color: active ? '#28a745' : 'inherit', fontWeight: active ? '700' : 'normal' }}>
                    {props.caption}
                </Text>
                {props.list && props.list.length > 0 &&
                    <ChevronDown
                        size={14}
                        style={{
                            marginLeft: 2,
                            verticalAlign: 'middle',
                            color: active ? '#28a745' : '#6c757d',
                            transform: isVisibleCard ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                        }}
                    />}
            </Button>
            {props.list && props.list.length > 0 &&
                <Section_tooltip $visible={isVisibleCard}>
                    {props.list.map((item) => (
                        <TooltipItem
                            key={item.caption}
                            $active={isItemActive(item.url)}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNavigation(item.url);
                                setIsVisibleCard(false);
                            }}
                        >
                            {item.caption}
                        </TooltipItem>
                    ))}
                </Section_tooltip>
            }
        </div>
    )
}

export default memo(Section);