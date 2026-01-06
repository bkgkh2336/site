import { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import { 
    AccessibilityButton, 
    BVIPanel, 
    BVIPanelHeader, 
    BVIPanelContent,
    BVISection,
    BVISectionTitle,
    BVIButtonGroup,
    BVIButton,
    BVIResetButton
} from './styled';

interface BVISettings {
    colorScheme: 'default' | 'black-white' | 'white-black' | 'blue-lightblue' | 'brown-beige' | 'green-darkgreen';
    fontSize: 'normal' | 'large' | 'extra-large';
    letterSpacing: 'normal' | 'medium' | 'large';
    lineHeight: 'normal' | 'medium' | 'large';
    imagesEnabled: boolean;
}

const defaultSettings: BVISettings = {
    colorScheme: 'default',
    fontSize: 'normal',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    imagesEnabled: true
};

const AccessibilityToggle = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [settings, setSettings] = useState<BVISettings>(defaultSettings);

    useEffect(() => {
        // Загружаем настройки из localStorage
        const saved = localStorage.getItem('bvi-settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
                applySettings(parsed);
            } catch (e) {
                console.error('Error loading BVI settings:', e);
            }
        }
    }, []);

    const applySettings = (newSettings: BVISettings) => {
        const body = document.body;
        
        // Удаляем все предыдущие классы BVI
        body.classList.remove(
            'bvi-color-black-white', 'bvi-color-white-black', 
            'bvi-color-blue-lightblue', 'bvi-color-brown-beige', 'bvi-color-green-darkgreen',
            'bvi-font-large', 'bvi-font-extra-large',
            'bvi-spacing-medium', 'bvi-spacing-large',
            'bvi-lineheight-medium', 'bvi-lineheight-large',
            'bvi-images-disabled'
        );

        // Применяем новые настройки
        if (newSettings.colorScheme !== 'default') {
            body.classList.add(`bvi-color-${newSettings.colorScheme}`);
        }
        
        if (newSettings.fontSize !== 'normal') {
            body.classList.add(`bvi-font-${newSettings.fontSize}`);
        }
        
        if (newSettings.letterSpacing !== 'normal') {
            body.classList.add(`bvi-spacing-${newSettings.letterSpacing}`);
        }
        
        if (newSettings.lineHeight !== 'normal') {
            body.classList.add(`bvi-lineheight-${newSettings.lineHeight}`);
        }
        
        if (!newSettings.imagesEnabled) {
            body.classList.add('bvi-images-disabled');
        }

        // Добавляем общий класс, если хотя бы одна настройка активна
        const isActive = newSettings.colorScheme !== 'default' || 
                        newSettings.fontSize !== 'normal' || 
                        newSettings.letterSpacing !== 'normal' || 
                        newSettings.lineHeight !== 'normal' || 
                        !newSettings.imagesEnabled;
        
        if (isActive) {
            body.classList.add('bvi-active');
        } else {
            body.classList.remove('bvi-active');
        }
    };

    const updateSettings = (key: keyof BVISettings, value: any) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        applySettings(newSettings);
        localStorage.setItem('bvi-settings', JSON.stringify(newSettings));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        applySettings(defaultSettings);
        localStorage.removeItem('bvi-settings');
    };

    const isBVIActive = settings.colorScheme !== 'default' || 
                       settings.fontSize !== 'normal' || 
                       settings.letterSpacing !== 'normal' || 
                       settings.lineHeight !== 'normal' || 
                       !settings.imagesEnabled;

    return (
        <>
            <AccessibilityButton
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                $isActive={isBVIActive}
                aria-label="Версия для слабовидящих"
                title="Версия для слабовидящих"
            >
                <Eye style={{ width: '20px', height: '20px' }} />
            </AccessibilityButton>

            {isPanelOpen && (
                <BVIPanel>
                    <BVIPanelHeader>
                        <h3>Версия для слабовидящих</h3>
                        <button 
                            onClick={() => setIsPanelOpen(false)}
                            aria-label="Закрыть панель"
                        >
                            <X size={20} />
                        </button>
                    </BVIPanelHeader>

                    <BVIPanelContent>
                        <BVISection>
                            <BVISectionTitle>Цветовая схема</BVISectionTitle>
                            <BVIButtonGroup>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'default'}
                                    onClick={() => updateSettings('colorScheme', 'default')}
                                >
                                    Обычная
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'black-white'}
                                    onClick={() => updateSettings('colorScheme', 'black-white')}
                                    style={{ background: '#000', color: '#fff' }}
                                >
                                    Ч/Б
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'white-black'}
                                    onClick={() => updateSettings('colorScheme', 'white-black')}
                                    style={{ background: '#fff', color: '#000', border: '1px solid #000' }}
                                >
                                    Б/Ч
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'blue-lightblue'}
                                    onClick={() => updateSettings('colorScheme', 'blue-lightblue')}
                                    style={{ background: '#063462', color: '#9DD1FF' }}
                                >
                                    Синий
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'brown-beige'}
                                    onClick={() => updateSettings('colorScheme', 'brown-beige')}
                                    style={{ background: '#4D4B43', color: '#F7F3D6' }}
                                >
                                    Коричневый
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.colorScheme === 'green-darkgreen'}
                                    onClick={() => updateSettings('colorScheme', 'green-darkgreen')}
                                    style={{ background: '#3B5323', color: '#A9E44D' }}
                                >
                                    Зеленый
                                </BVIButton>
                            </BVIButtonGroup>
                        </BVISection>

                        <BVISection>
                            <BVISectionTitle>Размер шрифта</BVISectionTitle>
                            <BVIButtonGroup>
                                <BVIButton
                                    $isActive={settings.fontSize === 'normal'}
                                    onClick={() => updateSettings('fontSize', 'normal')}
                                >
                                    Обычный
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.fontSize === 'large'}
                                    onClick={() => updateSettings('fontSize', 'large')}
                                >
                                    Крупный
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.fontSize === 'extra-large'}
                                    onClick={() => updateSettings('fontSize', 'extra-large')}
                                >
                                    Очень крупный
                                </BVIButton>
                            </BVIButtonGroup>
                        </BVISection>

                        <BVISection>
                            <BVISectionTitle>Межбуквенный интервал</BVISectionTitle>
                            <BVIButtonGroup>
                                <BVIButton
                                    $isActive={settings.letterSpacing === 'normal'}
                                    onClick={() => updateSettings('letterSpacing', 'normal')}
                                >
                                    Обычный
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.letterSpacing === 'medium'}
                                    onClick={() => updateSettings('letterSpacing', 'medium')}
                                >
                                    Средний
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.letterSpacing === 'large'}
                                    onClick={() => updateSettings('letterSpacing', 'large')}
                                >
                                    Большой
                                </BVIButton>
                            </BVIButtonGroup>
                        </BVISection>

                        <BVISection>
                            <BVISectionTitle>Межстрочный интервал</BVISectionTitle>
                            <BVIButtonGroup>
                                <BVIButton
                                    $isActive={settings.lineHeight === 'normal'}
                                    onClick={() => updateSettings('lineHeight', 'normal')}
                                >
                                    Обычный
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.lineHeight === 'medium'}
                                    onClick={() => updateSettings('lineHeight', 'medium')}
                                >
                                    Средний
                                </BVIButton>
                                <BVIButton
                                    $isActive={settings.lineHeight === 'large'}
                                    onClick={() => updateSettings('lineHeight', 'large')}
                                >
                                    Большой
                                </BVIButton>
                            </BVIButtonGroup>
                        </BVISection>

                        <BVISection>
                            <BVISectionTitle>Изображения</BVISectionTitle>
                            <BVIButtonGroup>
                                <BVIButton
                                    $isActive={settings.imagesEnabled}
                                    onClick={() => updateSettings('imagesEnabled', true)}
                                >
                                    Включены
                                </BVIButton>
                                <BVIButton
                                    $isActive={!settings.imagesEnabled}
                                    onClick={() => updateSettings('imagesEnabled', false)}
                                >
                                    Выключены
                                </BVIButton>
                            </BVIButtonGroup>
                        </BVISection>

                        <BVIResetButton onClick={resetSettings}>
                            Сбросить настройки
                        </BVIResetButton>
                    </BVIPanelContent>
                </BVIPanel>
            )}
        </>
    );
};

export default AccessibilityToggle;