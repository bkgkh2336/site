import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { 
    LanguageSelectorContainer, 
    LanguageButton, 
    LanguageDropdown, 
    LanguageOption,
    CurrentLanguage
} from "./styled";

interface LanguageSelectorProps {
    isMobile?: boolean;
}

type LangKey = 'ru' | 'be' | 'en';
const languages: Record<LangKey, { code: string; name: string; flag: string; color: string }> = {
    ru: { code: 'RU', name: 'Русский', flag: '🇷🇺', color: '#0039A6' },
    be: { code: 'BY', name: 'Беларуская', flag: '🇧🇾', color: '#CD163F' },
    en: { code: 'EN', name: 'English', flag: '🇬🇧', color: '#012169' }
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
    type CurrentLang = keyof typeof languages;
    const [currentLanguage, setCurrentLanguage] = useState<CurrentLang>('ru');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load saved language on mount
    useEffect(() => {
        const saved = localStorage.getItem('jkx_language') as CurrentLang | null;
        if (saved && saved in languages) {
            setCurrentLanguage(saved);
        }
    }, []);

    // Persist language on change
    useEffect(() => {
        localStorage.setItem('jkx_language', currentLanguage);
    }, [currentLanguage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentLang = languages[currentLanguage];

    // Update document language attribute to help Google Translate detect source/target language
    useEffect(() => {
        const codeMap: Record<"ru"|"be"|"en", string> = {
            ru: 'ru',
            be: 'be',
            en: 'en'
        };
        document.documentElement.lang = codeMap[currentLanguage];
    }, [currentLanguage]);

    return (
        <LanguageSelectorContainer ref={dropdownRef} $isMobile={isMobile}>
            <LanguageButton 
                onClick={() => setIsOpen(!isOpen)}
                $isOpen={isOpen}
                $isMobile={isMobile}
                aria-label="Выбор языка"
                aria-expanded={isOpen}
                data-lang-active
                data-current-lang={currentLanguage}
            >
                <CurrentLanguage $isMobile={isMobile}>
                    <span className="flag-indicator" style={{ backgroundColor: currentLang?.color }}></span>
                    <span className="code">{currentLang?.code}</span>
                </CurrentLanguage>
                <ChevronDown 
                    className="chevron-icon"
                    style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }} 
                />
            </LanguageButton>

            <LanguageDropdown $isOpen={isOpen} $isMobile={isMobile}>
                {Object.entries(languages).map(([key, lang]) => {
                    const k = key as LangKey;
                    const isActive = currentLanguage === k;
                    return (
                        <LanguageOption
                            key={key}
                            $isActive={isActive}
                            $isMobile={isMobile}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentLanguage(k);
                                setIsOpen(false);
                            }}
                            href="#"
                        >
                            <span className="flag-indicator" style={{ backgroundColor: lang.color }}></span>
                            <span className="code">{lang.code}</span>
                        </LanguageOption>
                    );
                })}
            </LanguageDropdown>
        </LanguageSelectorContainer>
    );
};

export default LanguageSelector;
