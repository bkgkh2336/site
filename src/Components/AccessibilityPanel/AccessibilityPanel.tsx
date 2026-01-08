import { useState, useEffect } from 'react';
import { Eye, X, Type, Palette, Image, RotateCcw } from 'lucide-react';
import {
    Panel,
    PanelHeader,
    PanelTitle,
    CloseButton,
    PanelContent,
    SettingGroup,
    SettingLabel,
    ButtonGroup,
    SettingButton,
    ResetButton
} from './styled';

export type FontSize = 'small' | 'medium' | 'large';
export type ColorScheme = 'default' | 'black-on-white' | 'white-on-black' | 'blue-on-white';

export interface AccessibilitySettings {
    fontSize: FontSize;
    colorScheme: ColorScheme;
    letterSpacing: boolean;
    imagesEnabled: boolean;
}

const defaultSettings: AccessibilitySettings = {
    fontSize: 'medium',
    colorScheme: 'default',
    letterSpacing: false,
    imagesEnabled: true,
};

interface AccessibilityPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccessibilityPanel = ({ isOpen, onClose }: AccessibilityPanelProps) => {
    const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

    // Загрузка настроек из localStorage
    useEffect(() => {
        const saved = localStorage.getItem('accessibilitySettings');
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse accessibility settings', e);
            }
        }
    }, []);

    // Применение настроек к документу
    useEffect(() => {
        const root = document.documentElement;
        
        // Размер шрифта
        root.setAttribute('data-font-size', settings.fontSize);
        
        // Цветовая схема
        root.setAttribute('data-color-scheme', settings.colorScheme);
        
        // Межбуквенный интервал
        root.setAttribute('data-letter-spacing', settings.letterSpacing.toString());
        
        // Изображения
        root.setAttribute('data-images-enabled', settings.imagesEnabled.toString());
        
        // Сохранение в localStorage
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }, [settings]);

    const updateSetting = <K extends keyof AccessibilitySettings>(
        key: K,
        value: AccessibilitySettings[K]
    ) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.removeItem('accessibilitySettings');
    };

    if (!isOpen) return null;

    return (
        <Panel>
            <PanelHeader>
                <PanelTitle>
                    <Eye size={20} />
                    Настройки для слабовидящих
                </PanelTitle>
                <CloseButton onClick={onClose}>
                    <X size={20} />
                </CloseButton>
            </PanelHeader>

            <PanelContent>
                {/* Размер шрифта */}
                <SettingGroup>
                    <SettingLabel>
                        <Type size={18} />
                        Размер шрифта
                    </SettingLabel>
                    <ButtonGroup>
                        <SettingButton
                            $active={settings.fontSize === 'small'}
                            onClick={() => updateSetting('fontSize', 'small')}
                        >
                            А
                        </SettingButton>
                        <SettingButton
                            $active={settings.fontSize === 'medium'}
                            onClick={() => updateSetting('fontSize', 'medium')}
                            style={{ fontSize: '1.1rem' }}
                        >
                            А
                        </SettingButton>
                        <SettingButton
                            $active={settings.fontSize === 'large'}
                            onClick={() => updateSetting('fontSize', 'large')}
                            style={{ fontSize: '1.3rem' }}
                        >
                            А
                        </SettingButton>
                    </ButtonGroup>
                </SettingGroup>

                {/* Цветовая схема */}
                <SettingGroup>
                    <SettingLabel>
                        <Palette size={18} />
                        Цветовая схема
                    </SettingLabel>
                    <ButtonGroup>
                        <SettingButton
                            $active={settings.colorScheme === 'default'}
                            onClick={() => updateSetting('colorScheme', 'default')}
                        >
                            Обычная
                        </SettingButton>
                        <SettingButton
                            $active={settings.colorScheme === 'black-on-white'}
                            onClick={() => updateSetting('colorScheme', 'black-on-white')}
                        >
                            Ч/Б
                        </SettingButton>
                        <SettingButton
                            $active={settings.colorScheme === 'white-on-black'}
                            onClick={() => updateSetting('colorScheme', 'white-on-black')}
                        >
                            Б/Ч
                        </SettingButton>
                        <SettingButton
                            $active={settings.colorScheme === 'blue-on-white'}
                            onClick={() => updateSetting('colorScheme', 'blue-on-white')}
                        >
                            С/Б
                        </SettingButton>
                    </ButtonGroup>
                </SettingGroup>

                {/* Межбуквенный интервал */}
                <SettingGroup>
                    <SettingLabel>
                        <Type size={18} />
                        Межбуквенный интервал
                    </SettingLabel>
                    <ButtonGroup>
                        <SettingButton
                            $active={!settings.letterSpacing}
                            onClick={() => updateSetting('letterSpacing', false)}
                        >
                            Обычный
                        </SettingButton>
                        <SettingButton
                            $active={settings.letterSpacing}
                            onClick={() => updateSetting('letterSpacing', true)}
                        >
                            Увеличенный
                        </SettingButton>
                    </ButtonGroup>
                </SettingGroup>

                {/* Изображения */}
                <SettingGroup>
                    <SettingLabel>
                        <Image size={18} />
                        Изображения
                    </SettingLabel>
                    <ButtonGroup>
                        <SettingButton
                            $active={settings.imagesEnabled}
                            onClick={() => updateSetting('imagesEnabled', true)}
                        >
                            Показать
                        </SettingButton>
                        <SettingButton
                            $active={!settings.imagesEnabled}
                            onClick={() => updateSetting('imagesEnabled', false)}
                        >
                            Скрыть
                        </SettingButton>
                    </ButtonGroup>
                </SettingGroup>

                {/* Кнопка сброса */}
                <ResetButton onClick={resetSettings}>
                    <RotateCcw size={18} />
                    Сбросить настройки
                </ResetButton>
            </PanelContent>
        </Panel>
    );
};

export default AccessibilityPanel;