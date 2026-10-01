import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../styled';
import { Save, X, Trash2, ImageIcon, Upload, Eye, Pencil } from 'lucide-react';
import RichTextEditor from '../RichTextEditor';
import {
    Field, FieldLabel, FieldHint, ModalActions, ActionButton, FileInput
} from '../ui';
import BlockEditModal from './BlockEditModal';
import {
    ArticleData, ArticleGalleryItem, isCustomArticle, parseGallery, slugify
} from '../../../data/articles';
import {
    ALL_BLOCK_TYPES, customPageKey, type Block
} from '../../../data/customContent';
import { getCustomContent } from '../../../data/customContentDefaults';
import { blocksToBodyHtml, splitBodyHtml, type BlockApi } from '../../../data/customBody';
import BlocksView from '../../News/Blocks/BlocksView';
import RichChunk from '../../News/RichChunk';

const Row = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    & > * {
        flex: 1;
        min-width: 160px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #ced4da;
    font-size: 15px;
    font-family: inherit;
    color: #212529;
    resize: vertical;
    min-height: 70px;

    &:focus {
        outline: none;
        border-color: #28a745;
    }
`;

const CoverPreview = styled.img`
    width: 100%;
    max-height: 170px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #e9ecef;
    display: block;
    margin-bottom: 8px;
`;

const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 8px;
    margin-bottom: 8px;
`;

const GalleryThumb = styled.div`
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e9ecef;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
`;

const GalleryRemove = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 6px;
    background: rgba(220, 53, 69, 0.92);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        width: 13px;
        height: 13px;
    }
`;

const CheckRow = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: #212529;
    cursor: pointer;
    user-select: none;

    input {
        width: 16px;
        height: 16px;
        accent-color: #28a745;
    }
`;

const ToggleRow = styled.div`
    display: inline-flex;
    gap: 4px;
    padding: 4px;
    background: #f1f3f5;
    border-radius: 8px;
    margin-bottom: 8px;
    align-self: flex-start;
`;

const ToggleBtn = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: none;
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
    color: ${({ $active }) => ($active ? '#28a745' : '#495057')};
    font-weight: ${({ $active }) => ($active ? 600 : 400)};
    box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none')};

    svg {
        width: 14px;
        height: 14px;
    }
`;

const PreviewBox = styled.div`
    border: 1px solid #ced4da;
    border-radius: 10px;
    background: #ffffff;
    padding: 16px;
    min-height: clamp(420px, calc(100vh - 380px), 900px);
`;

const ArticlePreview: React.FC<{ html: string; pageKey?: string }> = ({ html, pageKey }) => {
    const parts = splitBodyHtml(html);
    if (!parts.length) return <FieldHint>Текст пока пуст</FieldHint>;
    return (
        <>
            {parts.map((part, index) =>
                part.block ? (
                    <BlocksView key={index} blocks={[part.block]} pageKey={pageKey} />
                ) : (
                    <RichChunk key={index} html={part.html || ''} />
                )
            )}
        </>
    );
};

interface NewsEditFormProps {
    article: ArticleData;
    isSaving: boolean;
    isDeleting: boolean;
    isNew: boolean;
    onArticleChange: (article: ArticleData) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onUpload: (file: File) => Promise<string | null>;
    onCleanupFile: (src: string) => Promise<void>;
}

const NewsEditForm: React.FC<NewsEditFormProps> = ({
    article,
    isSaving,
    isDeleting,
    isNew,
    onArticleChange,
    onSave,
    onCancel,
    onDelete,
    onUpload,
    onCleanupFile
}) => {
    const isExternal = article.is_external === 1;
    const customLayout = !isExternal && isCustomArticle(article.section, article.slug);
    const customKey = customPageKey(article.section, article.slug);
    const [preview, setPreview] = useState(false);
    const [editing, setEditing] = useState<{ block: Block; api: BlockApi } | null>(null);

    const [datePart = '', timePart = ''] = (article.published_at || '').split(' ');

    const editorContent =
        customLayout && !(article.body && article.body.trim())
            ? blocksToBodyHtml(getCustomContent(article.custom_content))
            : article.body || '';

    const setField = <K extends keyof ArticleData>(key: K, value: ArticleData[K]) =>
        onArticleChange({ ...article, [key]: value });

    const handleTitleChange = (title: string) => {
        const next: ArticleData = { ...article, title };
        if (isNew || !article.slug) {
            next.slug = slugify(title);
        }
        onArticleChange(next);
    };

    const handleSlugChange = (slug: string) => {
        setField('slug', slug.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 80));
    };

    const handleDateChange = (value: string) => {
        if (!value) {
            setField('published_at', null);
            return;
        }
        setField('published_at', timePart ? `${value} ${timePart}` : value);
    };

    const handleTimeChange = (value: string) => {
        if (!datePart) {
            return;
        }
        setField('published_at', value ? `${datePart} ${value}` : datePart);
    };

    const handleCoverUpload = async (file: File) => {
        const path = await onUpload(file);
        if (path) setField('cover', path);
    };

    const handleRemoveCover = async () => {
        if (article.cover) await onCleanupFile(article.cover);
        setField('cover', null);
    };

    const handleGalleryUpload = async (files: FileList) => {
        const current = parseGallery(article.gallery);
        const added: ArticleGalleryItem[] = [];
        for (const file of Array.from(files)) {
            const path = await onUpload(file);
            if (path) added.push({ src: path, alt: '' });
        }
        if (added.length) {
            setField('gallery', JSON.stringify([...current, ...added]));
        }
    };

    const handleRemoveGalleryItem = async (index: number) => {
        const current = parseGallery(article.gallery);
        const removed = current[index];
        const next = current.filter((_, i) => i !== index);
        setField('gallery', next.length ? JSON.stringify(next) : null);
        if (removed) await onCleanupFile(removed.src);
    };

    const gallery = parseGallery(article.gallery);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Field>
                <FieldLabel>Заголовок:</FieldLabel>
                <Input
                    value={article.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Заголовок"
                />
            </Field>

            <Row>
                <Field>
                    <FieldLabel>Адрес (slug):</FieldLabel>
                    <Input
                        value={article.slug}
                        onChange={e => handleSlugChange(e.target.value)}
                        placeholder="url_adres"
                    />
                    <FieldHint>Изменение адреса ломает старые ссылки на страницу</FieldHint>
                </Field>

                <Field>
                    <FieldLabel>Дата публикации:</FieldLabel>
                    <Input
                        type="date"
                        value={datePart}
                        onChange={e => handleDateChange(e.target.value)}
                    />
                </Field>

                <Field>
                    <FieldLabel>Время:</FieldLabel>
                    <Input
                        type="time"
                        value={timePart}
                        onChange={e => handleTimeChange(e.target.value)}
                    />
                </Field>
            </Row>

            <Field>
                <FieldLabel>Краткое описание:</FieldLabel>
                <TextArea
                    value={article.summary || ''}
                    onChange={e => setField('summary', e.target.value || null)}
                    placeholder="Короткий текст для карточки (необязательно)"
                />
            </Field>

            <Field>
                <CheckRow>
                    <input
                        type="checkbox"
                        checked={isExternal}
                        onChange={e => setField('is_external', e.target.checked ? 1 : 0)}
                    />
                    Внешняя ссылка (новость с другого сайта)
                </CheckRow>
                {isExternal && (
                    <Input
                        value={article.external_url || ''}
                        onChange={e => setField('external_url', e.target.value || null)}
                        placeholder="https://example.com/news/..."
                        style={{ marginTop: 6 }}
                    />
                )}
            </Field>

            <Field>
                <FieldLabel>Обложка:</FieldLabel>
                {article.cover && (
                    <CoverPreview src={article.cover} alt={article.title} />
                )}
                <FileInput
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) void handleCoverUpload(file);
                        e.target.value = '';
                    }}
                />
                {article.cover && (
                    <ActionButton $variant="ghost" type="button" onClick={() => void handleRemoveCover()}>
                        <ImageIcon /> Убрать обложку
                    </ActionButton>
                )}
            </Field>

            {!customLayout && (
                <Field>
                    <FieldLabel>Галерея изображений:</FieldLabel>
                    {gallery.length > 0 && (
                        <GalleryGrid>
                            {gallery.map((item, index) => (
                                <GalleryThumb key={`${item.src}-${index}`}>
                                    <img src={item.src} alt={item.alt || ''} />
                                    <GalleryRemove
                                        type="button"
                                        title="Удалить изображение"
                                        aria-label="Удалить изображение"
                                        onClick={() => void handleRemoveGalleryItem(index)}
                                    >
                                        <Trash2 />
                                    </GalleryRemove>
                                </GalleryThumb>
                            ))}
                        </GalleryGrid>
                    )}
                    <FileInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => {
                            if (e.target.files?.length) void handleGalleryUpload(e.target.files);
                            e.target.value = '';
                        }}
                    />
                    <FieldHint>
                        <Upload style={{ width: 13, height: 13, verticalAlign: -2 }} /> Можно выбрать несколько файлов сразу
                    </FieldHint>
                </Field>
            )}

            {!isExternal && (
                <Field>
                    <ToggleRow>
                        <ToggleBtn
                            type="button"
                            $active={!preview}
                            onClick={() => setPreview(false)}
                        >
                            <Pencil /> Редактирование
                        </ToggleBtn>
                        <ToggleBtn
                            type="button"
                            $active={preview}
                            onClick={() => setPreview(true)}
                        >
                            <Eye /> Предпросмотр
                        </ToggleBtn>
                    </ToggleRow>
                    {preview ? (
                        <PreviewBox>
                            <ArticlePreview html={editorContent} pageKey={customLayout ? customKey : undefined} />
                        </PreviewBox>
                    ) : (
                        <RichTextEditor
                            key={article.id || 'new'}
                            content={editorContent}
                            onChange={html => setField('body', html)}
                            onImageUpload={onUpload}
                            insertBlocks={ALL_BLOCK_TYPES.filter(t => t !== 'paragraph')}
                            onEditBlock={(block, api) => setEditing({ block, api })}
                            pageKey={customLayout ? customKey : undefined}
                        />
                    )}
                </Field>
            )}

            <ModalActions>
                <ActionButton onClick={onSave} disabled={isSaving || isDeleting}>
                    <Save />
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                </ActionButton>
                <ActionButton $variant="secondary" onClick={onCancel} disabled={isSaving || isDeleting}>
                    <X /> Отмена
                </ActionButton>
                {!isNew && (
                    <ActionButton $variant="danger" onClick={onDelete} disabled={isSaving || isDeleting}>
                        <Trash2 />
                        {isDeleting ? 'Удаление...' : 'Удалить'}
                    </ActionButton>
                )}
            </ModalActions>

            {editing && (
                <BlockEditModal
                    block={editing.block}
                    onChange={next => setEditing(prev => (prev ? { ...prev, block: next } : prev))}
                    onSave={() => {
                        editing.api.update(editing.block);
                        setEditing(null);
                    }}
                    onCancel={() => setEditing(null)}
                    onDelete={() => {
                        editing.api.remove();
                        setEditing(null);
                    }}
                    onUpload={onUpload}
                    onCleanupFile={onCleanupFile}
                />
            )}
        </div>
    );
};

export default NewsEditForm;
