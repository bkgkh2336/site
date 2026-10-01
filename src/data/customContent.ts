import {
    AlertCircle, AlertTriangle, Battery, Bell, Brush, Check, CheckCircle,
    CheckCircle2, ClipboardList, Clock, Flame, Image, MapPin, Search, Shield,
    ShieldCheck, Thermometer, UserCheck, Users, Wind, Wrench, XCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type BlockType =
    | 'heading'
    | 'paragraph'
    | 'intro'
    | 'quote'
    | 'info'
    | 'link'
    | 'gallery'
    | 'people'
    | 'agenda'
    | 'card'
    | 'cards'
    | 'list'
    | 'steps'
    | 'stats'
    | 'warning'
    | 'author'
    | 'final';

export interface GalleryImage {
    src: string;
    alt?: string;
}

export type Block =
    | { type: 'heading'; text: string; icon?: string }
    | { type: 'paragraph'; html: string }
    | { type: 'intro'; icon?: string; html: string }
    | { type: 'quote'; icon?: string; html: string }
    | { type: 'info'; items: { icon: string; html: string }[] }
    | { type: 'link'; text: string; href: string }
    | { type: 'gallery'; items: GalleryImage[] }
    | { type: 'people'; items: { name: string; role: string }[] }
    | { type: 'agenda'; title?: string; icon?: string; intro?: string; items: string[] }
    | { type: 'card'; icon?: string; title: string; html: string; variant?: 'default' | 'warning' }
    | { type: 'cards'; style?: 'default' | 'maintenance'; items: { icon?: string; title: string; html: string; variant?: 'default' | 'green' | 'yellow' }[] }
    | { type: 'list'; title?: string; titleIcon?: string; items: { icon?: string; html: string }[] }
    | { type: 'steps'; items: { html: string }[] }
    | { type: 'stats'; label?: string; items: { number: string; main: string; sub?: string }[] }
    | { type: 'warning'; icon?: string; html: string }
    | { type: 'author'; lines: { text: string; kind?: 'role' | 'name' | 'strong' }[] }
    | { type: 'final'; title?: string; paragraphs: { text: string }[]; cta?: string };

export type FieldDesc =
    | { key: string; kind: 'text'; label: string; placeholder?: string }
    | { key: string; kind: 'textarea'; label: string; placeholder?: string }
    | { key: string; kind: 'richtext'; label: string }
    | { key: string; kind: 'icon'; label: string }
    | { key: string; kind: 'select'; label: string; options: { value: string; label: string }[] }
    | { key: string; kind: 'list'; label: string; itemLabel: string; itemFields: FieldDesc[] }
    | { key: string; kind: 'textlist'; label: string; hint?: string }
    | { key: string; kind: 'gallery'; label: string };

export interface BlockSchema {
    label: string;
    fields: FieldDesc[];
}

const cardVariantField = (key: string): FieldDesc => ({
    key,
    kind: 'select',
    label: 'Стиль',
    options: [
        { value: 'default', label: 'Обычный' },
        { value: 'warning', label: 'Предупреждение' },
        { value: 'green', label: 'Зелёный' },
        { value: 'yellow', label: 'Жёлтый' }
    ]
});

export const BLOCK_SCHEMAS: Record<BlockType, BlockSchema> = {
    heading: {
        label: 'Заголовок раздела',
        fields: [
            { key: 'text', kind: 'text', label: 'Текст заголовка' },
            { key: 'icon', kind: 'icon', label: 'Иконка' }
        ]
    },
    paragraph: {
        label: 'Текст',
        fields: [{ key: 'html', kind: 'richtext', label: 'Текст абзаца' }]
    },
    intro: {
        label: 'Вступление',
        fields: [
            { key: 'icon', kind: 'icon', label: 'Иконка' },
            { key: 'html', kind: 'richtext', label: 'Текст' }
        ]
    },
    quote: {
        label: 'Цитата',
        fields: [
            { key: 'icon', kind: 'icon', label: 'Иконка' },
            { key: 'html', kind: 'richtext', label: 'Текст' }
        ]
    },
    info: {
        label: 'Блок «Место / Время»',
        fields: [
            {
                key: 'items',
                kind: 'list',
                label: 'Строки',
                itemLabel: 'Строка',
                itemFields: [
                    { key: 'icon', kind: 'icon', label: 'Иконка' },
                    { key: 'html', kind: 'richtext', label: 'Текст' }
                ]
            }
        ]
    },
    link: {
        label: 'Кнопка-ссылка',
        fields: [
            { key: 'text', kind: 'text', label: 'Текст кнопки' },
            { key: 'href', kind: 'text', label: 'Ссылка', placeholder: 'https://...' }
        ]
    },
    gallery: {
        label: 'Фотогалерея',
        fields: [{ key: 'items', kind: 'gallery', label: 'Изображения' }]
    },
    people: {
        label: 'Участники',
        fields: [
            {
                key: 'items',
                kind: 'list',
                label: 'Участники',
                itemLabel: 'Участник',
                itemFields: [
                    { key: 'name', kind: 'text', label: 'Имя' },
                    { key: 'role', kind: 'textarea', label: 'Должность / роль' }
                ]
            }
        ]
    },
    agenda: {
        label: 'Повестка дня',
        fields: [
            { key: 'title', kind: 'text', label: 'Заголовок' },
            { key: 'icon', kind: 'icon', label: 'Иконка' },
            { key: 'intro', kind: 'textarea', label: 'Вступительный текст' },
            { key: 'items', kind: 'textlist', label: 'Пункты повестки' }
        ]
    },
    card: {
        label: 'Карточка-выделение',
        fields: [
            { key: 'icon', kind: 'icon', label: 'Иконка' },
            { key: 'title', kind: 'text', label: 'Заголовок' },
            { key: 'html', kind: 'richtext', label: 'Текст' },
            cardVariantField('variant')
        ]
    },
    cards: {
        label: 'Карточки (сетка)',
        fields: [
            {
                key: 'style',
                kind: 'select',
                label: 'Стиль сетки',
                options: [
                    { value: 'default', label: 'С карточками размещения' },
                    { value: 'maintenance', label: 'С иконками обслуживания' }
                ]
            },
            {
                key: 'items',
                kind: 'list',
                label: 'Карточки',
                itemLabel: 'Карточка',
                itemFields: [
                    { key: 'icon', kind: 'icon', label: 'Иконка' },
                    { key: 'title', kind: 'text', label: 'Заголовок' },
                    { key: 'html', kind: 'richtext', label: 'Текст' },
                    cardVariantField('variant')
                ]
            }
        ]
    },
    list: {
        label: 'Список с иконками',
        fields: [
            { key: 'title', kind: 'text', label: 'Заголовок' },
            { key: 'titleIcon', kind: 'icon', label: 'Иконка заголовка' },
            {
                key: 'items',
                kind: 'list',
                label: 'Элементы',
                itemLabel: 'Элемент',
                itemFields: [
                    { key: 'icon', kind: 'icon', label: 'Иконка' },
                    { key: 'html', kind: 'richtext', label: 'Текст' }
                ]
            }
        ]
    },
    steps: {
        label: 'Шаги (нумерованные)',
        fields: [
            {
                key: 'items',
                kind: 'list',
                label: 'Шаги',
                itemLabel: 'Шаг',
                itemFields: [{ key: 'html', kind: 'richtext', label: 'Текст шага' }]
            }
        ]
    },
    stats: {
        label: 'Статистика (числа)',
        fields: [
            { key: 'label', kind: 'text', label: 'Подпись блока' },
            {
                key: 'items',
                kind: 'list',
                label: 'Показатели',
                itemLabel: 'Показатель',
                itemFields: [
                    { key: 'number', kind: 'text', label: 'Число' },
                    { key: 'main', kind: 'text', label: 'Подпись' },
                    { key: 'sub', kind: 'text', label: 'Доп. подпись' }
                ]
            }
        ]
    },
    warning: {
        label: 'Предупреждение',
        fields: [
            { key: 'icon', kind: 'icon', label: 'Иконка' },
            { key: 'html', kind: 'richtext', label: 'Текст' }
        ]
    },
    author: {
        label: 'Автор / подпись',
        fields: [
            {
                key: 'lines',
                kind: 'list',
                label: 'Строки',
                itemLabel: 'Строка',
                itemFields: [
                    { key: 'text', kind: 'text', label: 'Текст' },
                    {
                        key: 'kind',
                        kind: 'select',
                        label: 'Стиль',
                        options: [
                            { value: '', label: 'Обычный' },
                            { value: 'strong', label: 'Полужирный' },
                            { value: 'role', label: 'Должность' },
                            { value: 'name', label: 'Имя' }
                        ]
                    }
                ]
            }
        ]
    },
    final: {
        label: 'Итоговый блок',
        fields: [
            { key: 'title', kind: 'text', label: 'Заголовок' },
            {
                key: 'paragraphs',
                kind: 'list',
                label: 'Абзацы',
                itemLabel: 'Абзац',
                itemFields: [{ key: 'text', kind: 'richtext', label: 'Текст' }]
            },
            { key: 'cta', kind: 'text', label: 'Призыв в конце' }
        ]
    }
};

export const CUSTOM_PAGE_BLOCK_TYPES: Record<string, BlockType[]> = {
    'news/union_conference': ['heading', 'paragraph', 'people', 'agenda', 'gallery'],
    'news/cleanup_day': ['heading', 'paragraph', 'gallery'],
    'news/unified_safety_day': ['heading', 'paragraph', 'info', 'link'],
    'news/safety_day_passed': ['heading', 'paragraph', 'gallery'],
    'articles/boiler_maintenance': ['paragraph', 'intro', 'card', 'list', 'warning', 'author'],
    'articles/attractions_safety': ['paragraph', 'intro', 'card', 'quote', 'author'],
    'articles/autonomous_fire_detectors': [
        'paragraph', 'intro', 'heading', 'stats', 'info', 'cards', 'list', 'steps', 'warning', 'final'
    ]
};

export const customPageKey = (section: string, slug: string) => `${section}/${slug}`;

/** Every structural block the unified editor can insert into any article. */
export const ALL_BLOCK_TYPES = Object.keys(BLOCK_SCHEMAS) as BlockType[];

const CUSTOM_ICONS: Record<string, LucideIcon> = {
    AlertCircle, AlertTriangle, Battery, Bell, Brush, Check, CheckCircle,
    CheckCircle2, ClipboardList, Clock, Flame, Image, MapPin, Search, Shield,
    ShieldCheck, Thermometer, UserCheck, Users, Wind, Wrench, XCircle
};

export const CUSTOM_ICON_NAMES = Object.keys(CUSTOM_ICONS);

export const getCustomIcon = (name?: string): LucideIcon | undefined =>
    name ? CUSTOM_ICONS[name] : undefined;

/**
 * Page components render block HTML inside styled <p> elements,
 * so top-level <p> wrappers from the WYSIWYG editor are flattened.
 */
export const inlineHtml = (html: string): string =>
    html
        .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
        .replace(/<p[^>]*>/gi, '')
        .replace(/<\/p>/gi, '');

/** True when paragraph html contains block-level markup that needs a <div> wrapper. */
export const hasBlockHtml = (html: string): boolean =>
    /<(h[1-6]|ul|ol|table|blockquote|hr|div|video|figure|pre|iframe)\b/i.test(inlineHtml(html));

export const createBlock = (type: BlockType): Block => {
    switch (type) {
        case 'heading': return { type, text: '', icon: undefined };
        case 'paragraph': return { type, html: '' };
        case 'intro': return { type, icon: undefined, html: '' };
        case 'quote': return { type, icon: undefined, html: '' };
        case 'info': return { type, items: [{ icon: 'MapPin', html: '' }] };
        case 'link': return { type, text: '', href: '' };
        case 'gallery': return { type, items: [] };
        case 'people': return { type, items: [{ name: '', role: '' }] };
        case 'agenda': return { type, title: '', intro: '', items: [''] };
        case 'card': return { type, icon: undefined, title: '', html: '', variant: 'default' };
        case 'cards': return { type, style: 'default', items: [{ icon: undefined, title: '', html: '', variant: 'default' }] };
        case 'list': return { type, title: '', items: [{ icon: undefined, html: '' }] };
        case 'steps': return { type, items: [{ html: '' }] };
        case 'stats': return { type, label: '', items: [{ number: '', main: '', sub: '' }] };
        case 'warning': return { type, icon: undefined, html: '' };
        case 'author': return { type, lines: [{ text: '' }] };
        case 'final': return { type, title: '', paragraphs: [{ text: '' }], cta: '' };
    }
};
