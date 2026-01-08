import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../Text/Text";
import Section_tooltip from "../Section_tooltip/Section_tooltip";
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
    const [isHidingCard, setIsHidingCard] = useState(false);
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);
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
            console.log('Toggling mobile menu expansion:', !isMobileExpanded);
            setIsMobileExpanded(!isMobileExpanded);
        } else if (props.url) {
            // Если есть URL и это не подменю, переходим
            handleNavigation(props.url);
        }
    };

    useEffect(() => {
        if (isHidingCard) {
            setTimeout(() => {
                setIsVisibleCard(false);
                setIsHidingCard(false);
            }, 300);
        }
    }, [isHidingCard]);

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
            onClick={() => props.url && handleNavigation(props.url)}
            onMouseEnter={() => setIsVisibleCard(true)}
            onMouseLeave={() => setIsHidingCard(true)}
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
            </Button>
            {isVisibleCard && props.list && props.list.length > 0 &&
                <Section_tooltip isHidingCard={isHidingCard}>
                    {props.list.map((item) => (
                        <Button
                            key={item.caption}
                            style={{ width: "100%" }}
                            onClick={() => handleNavigation(item.url)}
                        >
                            <Text
                                style={{
                                    textAlign: 'left',
                                    width: '100%',
                                    display: 'block'
                                }}
                            >
                                {item.caption}
                            </Text>
                        </Button>
                    ))}
                </Section_tooltip>
            }
        </div>
    )
}

export default memo(Section);