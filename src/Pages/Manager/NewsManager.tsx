import React, { useRef, useState } from 'react';
import {
    Pencil, Plus, Newspaper, BookOpen, FileText,
    ExternalLink, Trash2, Calendar, Code2, Globe
} from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import NewsEditForm from './EditForms/NewsEditForm';
import { apiPost, apiUpload, isSessionError } from './api';
import { useCrud } from './useCrud';
import { BoardToolbar, BoardCards, CategoryList, SectionCard } from './Board';
import Modal from './Modal';
import {
    ActionButton,
    Table, Th, Td, Tr, IconButton,
    DocCard, DocCardIcon, DocCardInfo, DocCardName, DocCardMeta,
    DocCardActions, IconLink, EmptyPanel
} from './ui';
import {
    ArticleData, ArticleSection, SECTION_LABELS, SECTION_FEED_PATHS,
    articlePath, formatArticleDate, isCustomArticle
} from '../../data/articles';

const SECTION_ICONS: Record<ArticleSection, React.ReactNode> = {
    news: <Newspaper />,
    articles: <BookOpen />,
    useful_to_know: <FileText />
};

const emptyArticle = (section: ArticleSection, sortOrder: number): ArticleData => ({
    id: 0,
    section,
    slug: '',
    title: '',
    summary: null,
    published_at: null,
    cover: null,
    gallery: null,
    body: null,
    custom_content: null,
    is_external: 0,
    external_url: null,
    sort_order: sortOrder
});

const NewsManager: React.FC = () => {
    const {
        items: articles,
        editing,
        setEditing,
        isLoading,
        error,
        isSaving,
        isDeleting,
        save,
        remove
    } = useCrud<ArticleData>('articles', 'Не удалось загрузить новости');
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [selectedSection, setSelectedSection] = useState<ArticleSection>('news');
    const uploadedRef = useRef<string[]>([]);
    const snapshotRef = useRef('');

    const openEditing = (value: ArticleData) => {
        snapshotRef.current = JSON.stringify(value);
        setEditing(value);
    };

    const isDirty = editing !== null && JSON.stringify(editing) !== snapshotRef.current;

    const cleanupTempFile = async (src: string) => {
        try {
            await apiPost('cleanup-file', { src });
        } catch (err) {
            console.error('Failed to cleanup temp file:', err);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        if (!file.type.startsWith('image/')) {
            alert('Допустимы только изображения');
            return null;
        }
        if (file.size > 15 * 1024 * 1024) {
            alert('Размер файла не должен превышать 15 МБ');
            return null;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'news');
        try {
            const data = await apiUpload<{ success?: boolean; path?: string; message?: string }>(
                'upload',
                formData
            );
            if (data?.success && data.path) {
                uploadedRef.current.push(data.path);
                return data.path;
            }
            alert(`Ошибка загрузки: ${data?.message || 'неизвестная ошибка'}`);
            return null;
        } catch (err) {
            if (isSessionError(err)) return null;
            console.error('Upload error:', err);
            alert(`Ошибка загрузки: ${err instanceof Error ? err.message : err}`);
            return null;
        }
    };

    const handleAdd = () => {
        const inSection = articles.filter(a => a.section === selectedSection);
        openEditing(emptyArticle(selectedSection, inSection.length + 1));
    };

    const handleEdit = (article: ArticleData) => {
        openEditing({ ...article });
    };

    const handleSave = async () => {
        if (!editing) return;

        const title = editing.title.trim();
        if (!title) {
            alert('Введите заголовок');
            return;
        }
        const slug = editing.slug.trim();
        if (!slug) {
            alert('Введите адрес страницы (slug)');
            return;
        }
        const duplicate = articles.some(
            a => a.section === editing.section && a.slug === slug && a.id !== editing.id
        );
        if (duplicate) {
            alert('Статья с таким адресом уже есть в этом разделе');
            return;
        }
        if (editing.is_external === 1 && !(editing.external_url || '').trim()) {
            alert('Укажите внешнюю ссылку');
            return;
        }

        const isNew = !editing.id;
        const payload = {
            section: editing.section,
            slug,
            title,
            summary: editing.summary,
            published_at: editing.published_at,
            cover: editing.cover,
            gallery: editing.gallery,
            body: editing.body,
            custom_content: editing.custom_content,
            is_external: editing.is_external,
            external_url: editing.external_url,
            sort_order: editing.sort_order
        };

        const saved = await save(payload, editing, isNew);
        if (saved) {
            uploadedRef.current = [];
            setEditing(null);
        }
    };

    const handleDelete = async () => {
        if (!editing || !editing.id) return;
        await remove(editing, `Удалить статью «${editing.title}»?`);
    };

    const handleQuickDelete = async (article: ArticleData) => {
        await remove(article, `Удалить статью «${article.title}»?`);
    };

    const handleCancel = async () => {
        const pending = uploadedRef.current;
        uploadedRef.current = [];
        setEditing(null);
        for (const src of pending) {
            await cleanupTempFile(src);
        }
    };

    const sectionArticles = articles.filter(a => a.section === selectedSection);
    const sectionList: ArticleSection[] = ['news', 'articles', 'useful_to_know'];
    const sectionTitle = (
        <>
            {SECTION_ICONS[selectedSection]}
            {SECTION_LABELS[selectedSection]}
        </>
    );
    const addButton = (
        <ActionButton onClick={handleAdd}>
            <Plus /> Добавить
        </ActionButton>
    );
    const previewHref = (article: ArticleData) =>
        article.is_external === 1
            ? article.external_url || '#'
            : articlePath(article.section, article.slug);

    if (isLoading) return <Loading />;
    if (error) return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{error}</Text>;

    return (
        <>
            <BoardToolbar view={view} onViewChange={setView} />

            {view === 'cards' ? (
                <BoardCards
                    panelHeader="Разделы"
                    panel={
                        <CategoryList
                            activeKey={selectedSection}
                            items={sectionList.map(section => ({
                                key: section,
                                icon: SECTION_ICONS[section],
                                label: SECTION_LABELS[section],
                                count: articles.filter(a => a.section === section).length,
                                onSelect: () => setSelectedSection(section)
                            }))}
                        />
                    }
                    title={sectionTitle}
                    action={addButton}
                >
                    {sectionArticles.length === 0 && (
                        <EmptyPanel>В этом разделе пока нет публикаций</EmptyPanel>
                    )}

                    {sectionArticles.map(article => (
                        <DocCard key={article.id}>
                            <DocCardIcon style={{ overflow: 'hidden', padding: 0 }}>
                                {article.cover ? (
                                    <img
                                        src={article.cover}
                                        alt=""
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    SECTION_ICONS[article.section]
                                )}
                            </DocCardIcon>
                            <DocCardInfo>
                                <DocCardName>{article.title}</DocCardName>
                                <DocCardMeta>
                                    {article.published_at && (
                                        <>
                                            <Calendar style={{ width: 12, height: 12, verticalAlign: -1 }} />{' '}
                                            {formatArticleDate(article.published_at, article.section === 'articles')}
                                            {' · '}
                                        </>
                                    )}
                                    {article.is_external === 1 && (
                                        <>
                                            <Globe style={{ width: 12, height: 12, verticalAlign: -1 }} /> внешняя ссылка
                                        </>
                                    )}
                                    {article.is_external !== 1 && isCustomArticle(article.section, article.slug) && (
                                        <>
                                            <Code2 style={{ width: 12, height: 12, verticalAlign: -1 }} /> спец-блоки в тексте
                                        </>
                                    )}
                                    {article.is_external !== 1 && !isCustomArticle(article.section, article.slug) && (
                                        <>редактируемая статья</>
                                    )}
                                </DocCardMeta>
                            </DocCardInfo>
                            <DocCardActions>
                                <IconLink
                                    href={previewHref(article)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Открыть"
                                    aria-label="Открыть"
                                >
                                    <ExternalLink />
                                </IconLink>
                                <IconButton
                                    $tone="gray"
                                    onClick={() => handleEdit(article)}
                                    title="Редактировать"
                                    aria-label="Редактировать"
                                >
                                    <Pencil />
                                </IconButton>
                                <IconButton
                                    $tone="red"
                                    onClick={() => void handleQuickDelete(article)}
                                    title="Удалить"
                                    aria-label="Удалить"
                                    disabled={isDeleting}
                                >
                                    <Trash2 />
                                </IconButton>
                            </DocCardActions>
                        </DocCard>
                    ))}
                </BoardCards>
            ) : (
                <SectionCard title={sectionTitle} action={addButton}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                        {sectionList.map(section => (
                            <ActionButton
                                key={section}
                                $variant={selectedSection === section ? 'primary' : 'ghost'}
                                onClick={() => setSelectedSection(section)}
                            >
                                {SECTION_LABELS[section]}
                            </ActionButton>
                        ))}
                    </div>

                    <Table>
                        <thead>
                            <tr>
                                <Th>Заголовок</Th>
                                <Th style={{ width: 140 }}>Дата</Th>
                                <Th>Адрес</Th>
                                <Th style={{ width: 120 }}>Тип</Th>
                                <Th style={{ width: 100 }}></Th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionArticles.map(article => (
                                <Tr key={article.id}>
                                    <Td>{article.title}</Td>
                                    <Td>{formatArticleDate(article.published_at, article.section === 'articles') || '—'}</Td>
                                    <Td>
                                        {article.is_external === 1
                                            ? article.external_url
                                            : `${SECTION_FEED_PATHS[article.section]}/${article.slug}`}
                                    </Td>
                                    <Td>
                                        {article.is_external === 1
                                            ? 'внешняя'
                                            : isCustomArticle(article.section, article.slug)
                                                ? 'WYSIWYG+блоки'
                                                : 'WYSIWYG'}
                                    </Td>
                                    <Td>
                                        <IconButton onClick={() => handleEdit(article)} aria-label="Редактировать">
                                            <Pencil />
                                        </IconButton>
                                        <IconButton
                                            $tone="red"
                                            onClick={() => void handleQuickDelete(article)}
                                            aria-label="Удалить"
                                            disabled={isDeleting}
                                        >
                                            <Trash2 />
                                        </IconButton>
                                    </Td>
                                </Tr>
                            ))}
                        </tbody>
                    </Table>
                </SectionCard>
            )}

            {editing && (
                <Modal
                    fullscreen
                    title={
                        editing.id
                            ? `Редактирование: ${editing.title || 'без названия'}`
                            : `Новая публикация — ${SECTION_LABELS[editing.section]}`
                    }
                    onClose={() => void handleCancel()}
                    onSave={isSaving || isDeleting ? undefined : () => void handleSave()}
                    dirty={isDirty}
                >
                    <NewsEditForm
                        article={editing}
                        isSaving={isSaving}
                        isDeleting={isDeleting}
                        isNew={!editing.id}
                        onArticleChange={setEditing}
                        onSave={() => void handleSave()}
                        onCancel={() => void handleCancel()}
                        onDelete={() => void handleDelete()}
                        onUpload={uploadImage}
                        onCleanupFile={cleanupTempFile}
                    />
                </Modal>
            )}
        </>
    );
};

export default NewsManager;
