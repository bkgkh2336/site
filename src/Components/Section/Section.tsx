import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import Section_tooltip from "../Section_tooltip/Section_tooltip";
import { TooltipItem } from "../Section_tooltip/styled";
import Button from "../Button/Button";
import { Button_ } from "../Button/styled";
import { ChevronDown } from "lucide-react";
import { getActiveMenuItem, normalizeMenuPath } from "../../data/menu";

interface SectionProps {
    src?: string,
    caption: string;
    list?: ListProps[];
    url?: string;
    currentPath?: string;
}

interface ListProps {
    caption: string;
    url: string;
}

const Section = (props: SectionProps) => {
    const [isVisibleCard, setIsVisibleCard] = useState(false);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const isExternalUrl = (url: string) => {
        return url.startsWith('http://') || url.startsWith('https://');
    };

    // Подпункт, которому соответствует текущий путь: точное совпадение или
    // вложенная страница; среди совпавших активен самый глубокий, поэтому
    // /news/articles/... подсвечивает «Статьи», а не вместе с «Новости»
    const activeItem = props.currentPath ? getActiveMenuItem(props.list, props.currentPath) : null;

    // Проверяем активность раздела
    const isActive = () => {
        if (!props.currentPath) return false;

        // Проверка прямого URL раздела (внешние ссылки пропускаем)
        if (props.url && !isExternalUrl(props.url)) {
            if (normalizeMenuPath(props.currentPath) === normalizeMenuPath(props.url)) {
                return true;
            }
        }

        // Раздел с подпунктами: активен, когда совпал хотя бы один подпункт,
        // включая вложенные страницы вроде /news/articles/...
        if (props.list && props.list.length > 0) {
            return activeItem !== null;
        }

        return false;
    };

    const active = isActive();

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

    // Клик по разделу: подменю — toggle, обычный пункт уже ушёл ссылкой выше
    const handleRootClick = () => {
        cancelHideTimer();
        setIsVisibleCard(visible => !visible);
    };

    // Пункт без подпунктов — обычная ссылка (контекстное меню, «открыть в новой вкладке»)
    if (!props.list || props.list.length === 0) {
        const label = (
            <>
                {props.src && (
                    <img
                        style={{ height: 30 }}
                        src={props.src}
                        alt={props.caption}
                    />
                )}
                <Text style={{ color: active ? '#28a745' : 'inherit', fontWeight: active ? '700' : 'normal' }}>
                    {props.caption}
                </Text>
            </>
        );

        if (props.url && isExternalUrl(props.url)) {
            return (
                <Button_ as="a" href={props.url} target="_blank" rel="noopener noreferrer" style={{ boxShadow: 'none' }}>
                    {label}
                </Button_>
            );
        }

        if (props.url) {
            return (
                <Button_ as={Link} to={normalizeMenuPath(props.url)} style={{ boxShadow: 'none' }}>
                    {label}
                </Button_>
            );
        }

        return <Button_ style={{ boxShadow: 'none' }}>{label}</Button_>;
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
                    {props.list.map((item) => {
                        const close = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            setIsVisibleCard(false);
                        };
                        if (isExternalUrl(item.url)) {
                            return (
                                <TooltipItem
                                    key={item.caption}
                                    as="a"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    $active={activeItem?.url === item.url}
                                    onClick={close}
                                >
                                    {item.caption}
                                </TooltipItem>
                            );
                        }
                        return (
                            <TooltipItem
                                key={item.caption}
                                as={Link}
                                to={normalizeMenuPath(item.url)}
                                $active={activeItem?.url === item.url}
                                onClick={close}
                            >
                                {item.caption}
                            </TooltipItem>
                        );
                    })}
                </Section_tooltip>
            }
        </div>
    )
}

export default memo(Section);