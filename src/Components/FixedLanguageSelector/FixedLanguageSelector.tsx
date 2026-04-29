import { useState, useRef, useEffect } from "react";
import FlagSvg from "../FlagSvg/FlagSvg";
import { ChevronDown, Eye } from "lucide-react";
import AccessibilityPanel from "../AccessibilityPanel/AccessibilityPanel";
import { getCurrentLanguage, setLanguage, initGoogleTranslate, type Language } from "../../utils/googleTranslate";
import { 
    Container, 
    SelectorButton, 
    Dropdown, 
    LanguageOption,
    LanguageCode,
    AccessibilityButton
} from "./styled";

const languages = {
    ru: { code: 'RU', name: 'Русский', countryCode: 'ru' as const },
    be: { code: 'BY', name: 'Беларуская', countryCode: 'by' as const },
    en: { code: 'EN', name: 'English', countryCode: 'gb' as const }
};

const FixedLanguageSelector = () => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(getCurrentLanguage);
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

    const handleLanguageChange = async (lang: Language) => {
        if (lang === currentLanguage) {
            setIsOpen(false);
            return;
        }
        // Загружаем Google Translate при первой смене языка
        await initGoogleTranslate();
        setCurrentLanguage(lang);
        setIsOpen(false);
        await setLanguage(lang);
    };

    return (
        <Container ref={dropdownRef}>
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
                <FlagSvg country={languages[currentLanguage].countryCode} />
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
                        $isActive={currentLanguage === key}
                        style={{ display: currentLanguage === key ? 'none' : 'flex' }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLanguageChange(key as Language);
                        }}
                        href="#"
                    >
                        <FlagSvg country={lang.countryCode} />
                        <LanguageCode>{lang.code}</LanguageCode>
                    </LanguageOption>
                ))}
            </Dropdown>
        </Container>
    );
};

export default FixedLanguageSelector;
