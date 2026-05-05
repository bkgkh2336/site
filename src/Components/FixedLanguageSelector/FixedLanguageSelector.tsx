import { useState, useRef, useEffect } from "react";
import FlagSvg from "../FlagSvg/FlagSvg";
import { ChevronDown, Eye } from "lucide-react";
import AccessibilityPanel from "../AccessibilityPanel/AccessibilityPanel";
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

type Lang = keyof typeof languages;

// Helper to get language from cookie
function getLangFromCookie(): Lang | null {
    const match = document.cookie.match(/googtrans=\/auto\/(\w+)/);
    if (match && match[1]) {
        const lang = match[1] as Lang;
        if (lang in languages) return lang;
    }
    return null;
}

const FixedLanguageSelector = () => {
    const [currentLanguage, setCurrentLanguage] = useState<Lang>(() => {
        // First try cookie, then localStorage, fallback to 'ru'
        return getLangFromCookie() || 
               (localStorage.getItem('jkx_language') as Lang | null) || 
               'ru';
    });
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

    useEffect(() => {
        localStorage.setItem('jkx_language', currentLanguage);
    }, [currentLanguage]);

    const handleLanguageChange = (lang: Lang) => {
        if (lang === currentLanguage) {
            setIsOpen(false);
            return;
        }
        setCurrentLanguage(lang);
        setIsOpen(false);

        // Set Google Translate cookie and reload page
        document.cookie = `googtrans=/auto/${lang}; path=/; max-age=3600`;
        window.location.reload();
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
                            handleLanguageChange(key as Lang);
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
