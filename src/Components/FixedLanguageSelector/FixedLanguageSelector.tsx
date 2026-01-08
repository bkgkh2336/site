import { useState, useRef, useEffect } from "react";
import Flag from "react-world-flags";
import { ChevronDown, Eye } from "lucide-react";
import AccessibilityPanel from "../AccessibilityPanel/AccessibilityPanel";
import { 
    Container, 
    SelectorButton, 
    Dropdown, 
    LanguageOption,
    FlagWrapper,
    LanguageCode,
    AccessibilityButton
} from "./styled";

export type Language = 'ru' | 'be' | 'en';

const languages = {
    ru: { code: 'RU', name: 'Русский', countryCode: 'RU' },
    be: { code: 'BY', name: 'Беларуская', countryCode: 'BY' },
    en: { code: 'EN', name: 'English', countryCode: 'GB' }
};

const FixedLanguageSelector = () => {
    const getCurrentLang = (): Language => {
        try {
            const stored = localStorage.getItem('yt-widget');
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed.lang || 'ru';
            }
        } catch (e) {
            console.error('Error reading language from localStorage:', e);
        }
        return 'ru';
    };

    const [currentLanguage] = useState<Language>(getCurrentLang());
    const [isOpen, setIsOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Container ref={dropdownRef}>
            {/* Скрытый div для виджета Яндекса */}
            <div id="ytWidget" style={{ display: 'none' }}></div>
            
            {/* Кнопка версии для слабовидящих */}
            <AccessibilityButton 
                onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
                aria-label="Версия для слабовидящих"
                title="Версия для слабовидящих"
            >
                <Eye size={20} />
            </AccessibilityButton>
            
            <AccessibilityPanel 
                isOpen={isAccessibilityOpen} 
                onClose={() => setIsAccessibilityOpen(false)} 
            />
            
            <SelectorButton
                onClick={() => setIsOpen(!isOpen)}
                $isOpen={isOpen}
                aria-label="Выбор языка"
                aria-expanded={isOpen}
                data-lang-active
                data-current-lang={currentLanguage}
            >
                <FlagWrapper>
                    <Flag 
                        code={languages[currentLanguage].countryCode} 
                        style={{ width: '24px', height: '18px', borderRadius: '2px' }}
                    />
                </FlagWrapper>
                <LanguageCode>{languages[currentLanguage].code}</LanguageCode>
                <ChevronDown 
                    className="chevron-icon"
                    style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }} 
                />
            </SelectorButton>

            <Dropdown $isOpen={isOpen}>
                {Object.entries(languages).map(([key, lang]) => (
                    <LanguageOption
                        key={key}
                        data-ya-lang={key}
                        $isActive={currentLanguage === key}
                        style={{ display: currentLanguage === key ? 'none' : 'flex' }}
                    >
                        <FlagWrapper>
                            <Flag 
                                code={lang.countryCode} 
                                style={{ width: '24px', height: '18px', borderRadius: '2px' }}
                            />
                        </FlagWrapper>
                        <LanguageCode>{lang.code}</LanguageCode>
                    </LanguageOption>
                ))}
            </Dropdown>
        </Container>
    );
};

export default FixedLanguageSelector;