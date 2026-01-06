import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { 
    LanguageSelectorContainer, 
    LanguageButton, 
    LanguageDropdown, 
    LanguageOption,
    CurrentLanguage
} from "./styled";

export type Language = 'ru' | 'be' | 'en';

interface LanguageSelectorProps {
    isMobile?: boolean;
}

const languages = {
    ru: { code: 'RU', name: 'Русский', flag: '🇷🇺', color: '#0039A6' },
    be: { code: 'BY', name: 'Беларуская', flag: '🇧🇾', color: '#CD163F' },
    en: { code: 'EN', name: 'English', flag: '🇬🇧', color: '#012169' }
};

const LanguageSelector = ({ isMobile = false }: LanguageSelectorProps) => {
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
        <LanguageSelectorContainer ref={dropdownRef} $isMobile={isMobile}>
            <div id="ytWidget" style={{ display: 'none' }}></div>
            
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
                    <span className="flag-indicator" style={{ backgroundColor: languages[currentLanguage].color }}></span>
                    <span className="code">{languages[currentLanguage].code}</span>
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
                {Object.entries(languages).map(([key, lang]) => (
                    <LanguageOption
                        key={key}
                        data-ya-lang={key}
                        $isActive={currentLanguage === key}
                        $isMobile={isMobile}
                        style={{ display: currentLanguage === key ? 'none' : 'flex' }}
                    >
                        <span className="flag-indicator" style={{ backgroundColor: lang.color }}></span>
                        <span className="code">{lang.code}</span>
                    </LanguageOption>
                ))}
            </LanguageDropdown>
        </LanguageSelectorContainer>
    );
};

export default LanguageSelector;