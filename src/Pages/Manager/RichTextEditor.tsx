import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TableKit } from '@tiptap/extension-table';
import { TextStyle, Color, FontFamily, FontSize, BackgroundColor } from '@tiptap/extension-text-style';
import styled from 'styled-components';
import {
    Bold, Italic, Underline, Strikethrough,
    Heading2, Heading3, Heading4,
    List, ListOrdered, Quote, Minus,
    Link2, Unlink, ImagePlus, Table2, Undo2, Redo2, Film, Eraser
} from 'lucide-react';
import Video from './VideoNode';
import FontWeight from './FontWeightAttr';
import { articleBodyCss } from '../../styles/articleBody';

const Toolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px;
    background: #f8f9fa;
    border-bottom: 1px solid #eef1f4;
    border-radius: 10px 10px 0 0;
`;

const ToolGroup = styled.div`
    display: flex;
    gap: 2px;
    padding-right: 6px;
    margin-right: 2px;
    border-right: 1px solid #dee2e6;

    &:last-child {
        border-right: none;
        padding-right: 0;
        margin-right: 0;
    }
`;

const ToolButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 6px;
    background: ${({ $active }) => ($active ? '#28a745' : 'transparent')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#495057')};
    cursor: pointer;
    transition: background 0.12s ease, color 0.12s ease;

    &:hover {
        background: ${({ $active }) => ($active ? '#218838' : '#e9ecef')};
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;

const FontSelect = styled.select`
    height: 30px;
    padding: 0 4px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    font-size: 13px;
    font-family: inherit;
    color: #495057;
    cursor: pointer;
    max-width: 132px;

    &:hover {
        background: #e9ecef;
    }

    &:focus {
        outline: none;
        border-color: #28a745;
        background: #ffffff;
    }
`;

const PaletteWrap = styled.div`
    position: relative;
    display: flex;
`;

const SwatchTrigger = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;

    &:hover {
        background: #e9ecef;
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const TextSwatchLabel = styled.span<{ $color: string }>`
    font-size: 15px;
    font-weight: 700;
    line-height: 1;
    text-decoration: underline;
    text-decoration-color: ${({ $color }) => $color};
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
`;

const BgSwatchLabel = styled.span<{ $color: string | null }>`
    width: 15px;
    height: 15px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    background: ${({ $color }) =>
        $color ||
        'repeating-conic-gradient(#dee2e6 0% 25%, #ffffff 0% 50%) 50% / 8px 8px'};
`;

const SwatchPanel = styled.div<{ $align?: 'left' | 'right' }>`
    position: absolute;
    top: calc(100% + 6px);
    ${({ $align }) => ($align === 'right' ? 'right: 0;' : 'left: 0;')}
    z-index: 40;
    width: 190px;
    padding: 10px;
    background: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
`;

const PanelTitle = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #6c757d;
    margin-bottom: 8px;
`;

const SwatchGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 5px;
`;

const Swatch = styled.button<{ $color: string; $active?: boolean }>`
    aspect-ratio: 1;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    background: ${({ $color }) => $color};
    cursor: pointer;
    ${({ $active }) =>
        $active ? 'outline: 2px solid #28a745; outline-offset: 1px;' : ''}

    &:hover {
        transform: scale(1.15);
    }
`;

const PanelFooter = styled.div`
    display: flex;
    gap: 6px;
    margin-top: 9px;
    align-items: stretch;

    button, label {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 5px 6px;
        font-size: 12px;
        font-family: inherit;
        color: #495057;
        background: #f1f3f5;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        white-space: nowrap;
    }

    button:hover, label:hover {
        background: #e9ecef;
    }

    input[type='color'] {
        width: 22px;
        height: 16px;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }
`;

const FONT_OPTIONS = ['Arial', 'Verdana', 'Tahoma', 'Segoe UI', 'Lato', 'Georgia', 'Times New Roman', 'Courier New'];
const SIZE_OPTIONS = ['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px'];

const TEXT_SWATCHES = [
    '#212529', '#495057', '#6c757d', '#adb5bd', '#dc3545', '#fd7e14', '#ffc107', '#198754',
    '#20c997', '#007bff', '#6f42c1', '#e83e8c', '#000000', '#ffffff', '#f1a9a9', '#8d6e63'
];

const BG_SWATCHES = [
    '#ffffff', '#f8f9fa', '#e9ecef', '#d6d8db', '#fff3cd', '#ffe5d0', '#f8d7da', '#d1ecf1',
    '#d4edda', '#e2d9f3', '#ffff00', '#c3e6cb', '#f5c6cb', '#cce5ff', '#212529', '#dc3545'
];

const toHex = (value?: string | null): string => {
    if (!value) return '#212529';
    if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
    const m = value.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
    if (!m) return '#212529';
    return '#' + [1, 2, 3].map(i => Number(m[i]).toString(16).padStart(2, '0')).join('');
};

const EditorBox = styled.div`
    border: 1px solid #ced4da;
    border-top: none;
    border-radius: 0 0 10px 10px;
    background: #ffffff;

    .rte-content {
        padding: 14px 16px;
        min-height: 280px;
        max-height: 55vh;
        overflow-y: auto;
    }

    .rte-content .ProseMirror {
        outline: none;
        min-height: 280px;

        ${articleBodyCss}

        p.is-empty::before,
        p.tiptap-empty::before,
        .is-empty[data-placeholder]::before,
        .tiptap-empty[data-placeholder]::before {
            content: attr(data-placeholder);
            color: #adb5bd;
            float: left;
            height: 0;
            pointer-events: none;
        }
    }
`;

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    onImageUpload: (file: File) => Promise<string | null>;
    placeholder?: string;
    disabled?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    content,
    onChange,
    onImageUpload,
    placeholder = 'Текст статьи…',
    disabled = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [, setTick] = useState(0);
    const [palette, setPalette] = useState<'text' | 'bg' | null>(null);

    const editor: Editor | null = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                link: { openOnClick: false }
            }),
            TextStyle,
            Color,
            FontFamily,
            FontSize,
            BackgroundColor,
            FontWeight,
            Image.configure({ inline: false, allowBase64: false }),
            Video,
            TableKit.configure({ table: { resizable: false } }),
            Placeholder.configure({ placeholder })
        ],
        content,
        editable: !disabled,
        shouldRerenderOnTransaction: true,
        onUpdate: ({ editor: e }) => {
            onChange(e.getHTML());
            setTick(t => t + 1);
        },
        onSelectionUpdate: () => {
            setTick(t => t + 1);
        }
    });

    useEffect(() => {
        if (editor && editor.isEditable !== !disabled) {
            editor.setEditable(!disabled);
        }
    }, [editor, disabled]);

    useEffect(() => {
        if (palette === null) return;
        const handle = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('[data-palette]')) setPalette(null);
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [palette]);

    if (!editor) return null;

    const insertImage = async (file: File) => {
        const path = await onImageUpload(file);
        if (path && editor) {
            editor.chain().focus().setImage({ src: path, alt: file.name }).run();
            setTick(t => t + 1);
        }
    };

    const setLink = () => {
        const prev = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Ссылка (URL):', prev || 'https://');
        if (url === null) return;
        if (url.trim() === '') {
            editor.chain().focus().unsetLink().run();
        } else {
            editor.chain().focus().setLink({ href: url.trim() }).run();
        }
        setTick(t => t + 1);
    };

    const insertVideo = () => {
        const src = window.prompt('Путь к видео (например /useful_to_know/video.mp4):', 'https://');
        if (!src || !src.trim()) return;
        editor
            .chain()
            .focus()
            .insertContent({
                type: 'video',
                attrs: { src: src.trim(), controls: true, width: '100%' }
            })
            .run();
        setTick(t => t + 1);
    };

    const textStyle = editor.getAttributes('textStyle') as {
        fontFamily?: string | null;
        fontSize?: string | null;
        color?: string | null;
        backgroundColor?: string | null;
    };
    const curFont = String(textStyle.fontFamily || '').replace(/['"]/g, '').trim();
    const curSize = String(textStyle.fontSize || '').trim();
    const fonts = curFont && !FONT_OPTIONS.includes(curFont) ? [curFont, ...FONT_OPTIONS] : FONT_OPTIONS;
    const sizes = curSize && !SIZE_OPTIONS.includes(curSize) ? [curSize, ...SIZE_OPTIONS] : SIZE_OPTIONS;

    const changeFont = (value: string) => {
        const chain = editor.chain().focus();
        (value ? chain.setFontFamily(value) : chain.unsetFontFamily()).run();
        setTick(t => t + 1);
    };

    const changeSize = (value: string) => {
        const chain = editor.chain().focus();
        (value ? chain.setFontSize(value) : chain.unsetFontSize()).run();
        setTick(t => t + 1);
    };

    const changeTextColor = (value: string) => {
        editor.chain().focus().setColor(value).run();
        setTick(t => t + 1);
    };

    const changeBackgroundColor = (value: string) => {
        editor.chain().focus().setBackgroundColor(value).run();
        setTick(t => t + 1);
    };

    const resetTextStyles = () => {
        editor.chain().focus().unsetFontFamily().unsetFontSize().unsetColor().unsetBackgroundColor().run();
        setTick(t => t + 1);
    };

    const curColor = textStyle.color || null;
    const curBg = textStyle.backgroundColor || null;

    const btn = (
        title: string,
        active: boolean,
        icon: React.ReactNode,
        onClick: () => void,
        disabled = false
    ) => (
        <ToolButton
            type="button"
            title={title}
            aria-label={title}
            $active={active}
            disabled={disabled}
            onMouseDown={e => e.preventDefault()}
            onClick={onClick}
        >
            {icon}
        </ToolButton>
    );

    const tableActive = editor.isActive('table');

    return (
        <div>
            <Toolbar>
                <ToolGroup>
                    {btn('Отменить', false, <Undo2 />, () => editor.chain().focus().undo().run(), !editor.can().undo())}
                    {btn('Повторить', false, <Redo2 />, () => editor.chain().focus().redo().run(), !editor.can().redo())}
                </ToolGroup>
                <ToolGroup>
                    <FontSelect
                        title="Шрифт"
                        aria-label="Шрифт"
                        value={curFont}
                        onChange={e => changeFont(e.target.value)}
                    >
                        <option value="">Шрифт</option>
                        {fonts.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </FontSelect>
                    <FontSelect
                        title="Размер шрифта"
                        aria-label="Размер шрифта"
                        value={curSize}
                        onChange={e => changeSize(e.target.value)}
                    >
                        <option value="">Размер</option>
                        {sizes.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </FontSelect>
                    <PaletteWrap data-palette>
                        <SwatchTrigger
                            type="button"
                            title="Цвет текста"
                            aria-label="Цвет текста"
                            aria-expanded={palette === 'text'}
                            disabled={disabled}
                            onClick={() => setPalette(p => (p === 'text' ? null : 'text'))}
                        >
                            <TextSwatchLabel $color={curColor || '#adb5bd'}>A</TextSwatchLabel>
                        </SwatchTrigger>
                        {palette === 'text' && (
                            <SwatchPanel $align="left">
                                <PanelTitle>Цвет текста</PanelTitle>
                                <SwatchGrid>
                                    {TEXT_SWATCHES.map(c => (
                                        <Swatch
                                            key={c}
                                            type="button"
                                            title={c}
                                            $color={c}
                                            $active={!!curColor && toHex(curColor) === c}
                                            onClick={() => {
                                                changeTextColor(c);
                                                setPalette(null);
                                            }}
                                        />
                                    ))}
                                </SwatchGrid>
                                <PanelFooter>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor.chain().focus().unsetColor().run();
                                            setTick(t => t + 1);
                                            setPalette(null);
                                        }}
                                    >
                                        Авто
                                    </button>
                                    <label title="Свой цвет">
                                        Другой
                                        <input
                                            type="color"
                                            value={toHex(curColor)}
                                            onChange={e => {
                                                changeTextColor(e.target.value);
                                                setPalette(null);
                                            }}
                                        />
                                    </label>
                                </PanelFooter>
                            </SwatchPanel>
                        )}
                    </PaletteWrap>
                    <PaletteWrap data-palette>
                        <SwatchTrigger
                            type="button"
                            title="Цвет фона (выделение)"
                            aria-label="Цвет фона (выделение)"
                            aria-expanded={palette === 'bg'}
                            disabled={disabled}
                            onClick={() => setPalette(p => (p === 'bg' ? null : 'bg'))}
                        >
                            <BgSwatchLabel $color={curBg} />
                        </SwatchTrigger>
                        {palette === 'bg' && (
                            <SwatchPanel $align="right">
                                <PanelTitle>Цвет фона (выделение)</PanelTitle>
                                <SwatchGrid>
                                    {BG_SWATCHES.map(c => (
                                        <Swatch
                                            key={c}
                                            type="button"
                                            title={c}
                                            $color={c}
                                            $active={!!curBg && toHex(curBg) === c}
                                            onClick={() => {
                                                changeBackgroundColor(c);
                                                setPalette(null);
                                            }}
                                        />
                                    ))}
                                </SwatchGrid>
                                <PanelFooter>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor.chain().focus().unsetBackgroundColor().run();
                                            setTick(t => t + 1);
                                            setPalette(null);
                                        }}
                                    >
                                        Авто
                                    </button>
                                    <label title="Свой цвет">
                                        Другой
                                        <input
                                            type="color"
                                            value={toHex(curBg)}
                                            onChange={e => {
                                                changeBackgroundColor(e.target.value);
                                                setPalette(null);
                                            }}
                                        />
                                    </label>
                                </PanelFooter>
                            </SwatchPanel>
                        )}
                    </PaletteWrap>
                    {btn('Сбросить шрифт и цвет', false, <Eraser />, resetTextStyles)}
                </ToolGroup>
                <ToolGroup>
                    {btn('Полужирный', editor.isActive('bold'), <Bold />, () => editor.chain().focus().toggleBold().run())}
                    {btn('Курсив', editor.isActive('italic'), <Italic />, () => editor.chain().focus().toggleItalic().run())}
                    {btn('Подчёркнутый', editor.isActive('underline'), <Underline />, () => editor.chain().focus().toggleUnderline().run())}
                    {btn('Зачёркнутый', editor.isActive('strike'), <Strikethrough />, () => editor.chain().focus().toggleStrike().run())}
                </ToolGroup>
                <ToolGroup>
                    {btn('Заголовок 2', editor.isActive('heading', { level: 2 }), <Heading2 />, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
                    {btn('Заголовок 3', editor.isActive('heading', { level: 3 }), <Heading3 />, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
                    {btn('Заголовок 4', editor.isActive('heading', { level: 4 }), <Heading4 />, () => editor.chain().focus().toggleHeading({ level: 4 }).run())}
                </ToolGroup>
                <ToolGroup>
                    {btn('Маркированный список', editor.isActive('bulletList'), <List />, () => editor.chain().focus().toggleBulletList().run())}
                    {btn('Нумерованный список', editor.isActive('orderedList'), <ListOrdered />, () => editor.chain().focus().toggleOrderedList().run())}
                    {btn('Цитата', editor.isActive('blockquote'), <Quote />, () => editor.chain().focus().toggleBlockquote().run())}
                    {btn('Разделитель', editor.isActive('horizontalRule'), <Minus />, () => editor.chain().focus().setHorizontalRule().run())}
                </ToolGroup>
                <ToolGroup>
                    {btn('Ссылка', editor.isActive('link'), <Link2 />, setLink)}
                    {btn('Убрать ссылку', false, <Unlink />, () => editor.chain().focus().unsetLink().run(), !editor.isActive('link'))}
                </ToolGroup>
                <ToolGroup>
                    {btn('Вставить таблицу 3×3', tableActive, <Table2 />, () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
                    {btn('Удалить таблицу', false, <Table2 />, () => editor.chain().focus().deleteTable().run(), !tableActive)}
                </ToolGroup>
                <ToolGroup>
                    {btn('Вставить изображение', false, <ImagePlus />, () => fileInputRef.current?.click())}
                    {btn('Вставить видео', false, <Film />, insertVideo)}
                </ToolGroup>
            </Toolbar>

            <EditorBox>
                <div className="rte-content">
                    <EditorContent editor={editor} />
                </div>
            </EditorBox>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) void insertImage(file);
                    e.target.value = '';
                }}
            />
        </div>
    );
};

export default RichTextEditor;
