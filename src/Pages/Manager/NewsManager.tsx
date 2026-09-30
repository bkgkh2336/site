import React, { useEffect, useRef, useState } from 'react';
import {
    Pencil, Plus, X, Newspaper, BookOpen, FileText,
    ExternalLink, Trash2, Calendar, Code2, Globe
} from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import ViewToggle from '../../Components/ViewToggle/ViewToggle';
import NewsEditForm from './EditForms/NewsEditForm';
import {
    Card, SectionHeader, SectionTitle, ActionButton,
    Table, Th, Td, Tr, IconButton,
    ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton,
    ToolbarRow, BoardView, CategoryPanel, CategoryPanelHeader,
    CategoryItem, CategoryName, CategoryCount,
    BoardMain, DocCard, DocCardIcon, DocCardInfo, DocCardName, DocCardMeta,
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
    is_external: 0,
    external_url: null,
    sort_order: sortOrder
});

const NewsManager: React.FC = () => {
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editing, setEditing] = useState<ArticleData | null>(null);
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [selectedSection, setSelectedSection] = useState<ArticleSection>('news');
    const uploadedRef = useRef<string[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/backend/api.php/api/articles');
                if (!response.ok) throw new Error('Ошибка загрузки данных');
                setArticles(await response.json());
                setError('');
            } catch (err) {
                console.error('Load error:', err);
                setError('Не удалось загрузить новости');
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const handleSessionExpired = (status: number) => {
        if (status === 401) {
            alert('Сессия истекла. Пожалуйста, войдите снова.');
            window.location.href = '/manager';
            return true;
        }
        return false;
    };

    const cleanupTempFile = async (src: string) => {
        try {
            await fetch('/backend/api.php/api/cleanup-file', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ src })
            });
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
            const response = await fetch('/backend/api.php/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.path) {
                    uploadedRef.current.push(data.path);
                    return data.path;
                }
                alert(`Ошибка загрузки: ${data.message || 'неизвестная ошибка'}`);
                return null;
            }
            if (handleSessionExpired(response.status)) return null;
            alert(`Ошибка загрузки: ${await response.text()}`);
            return null;
        } catch (err) {
            console.error('Upload error:', err);
            alert('Ошибка при загрузке изображения');
            return null;
        }
    };

    const handleAdd = () => {
        const inSection = articles.filter(a => a.section === selectedSection);
        setEditing(emptyArticle(selectedSection, inSection.length + 1));
    };

    const handleEdit = (article: ArticleData) => {
        setEditing({ ...article });
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
            is_external: editing.is_external,
            external_url: editing.external_url,
            sort_order: editing.sort_order
        };

        setIsSaving(true);
        try {
            const response = await fetch(
                isNew
                    ? '/backend/api.php/api/articles'
                    : `/backend/api.php/api/articles/${editing.id}`,
                {
                    method: isNew ? 'POST' : 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(payload)
                }
            );
            if (!response.ok) {
                const text = await response.text();
                if (handleSessionExpired(response.status)) return;
                alert(`Ошибка сохранения: ${response.status} ${text}`);
                return;
            }
            const data = await response.json();
            if (isNew) {
                setArticles(prev => [...prev, { ...payload, id: data.id }]);
            } else {
                setArticles(prev => prev.map(a => (a.id === editing.id ? { ...payload, id: editing.id } : a)));
            }
            uploadedRef.current = [];
            setEditing(null);
        } catch (err) {
            console.error('Save article error:', err);
            alert('Ошибка при сохранении статьи');
        } finally {
            setIsSaving(false);
        }
    };

    const deleteArticleById = async (article: ArticleData) => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/backend/api.php/api/articles/${article.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok && handleSessionExpired(response.status)) return;
            if (response.ok) {
                setArticles(prev => prev.filter(a => a.id !== article.id));
                setEditing(null);
            }
        } catch (err) {
            console.error('Delete article error:', err);
            alert('Ошибка при удалении статьи');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDelete = async () => {
        if (!editing || !editing.id) return;
        if (!window.confirm(`Удалить статью «${editing.title}»?`)) return;
        await deleteArticleById(editing);
    };

    const handleQuickDelete = async (article: ArticleData) => {
        if (!window.confirm(`Удалить статью «${article.title}»?`)) return;
        await deleteArticleById(article);
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
    const previewHref = (article: ArticleData) =>
        article.is_external === 1
            ? article.external_url || '#'
            : articlePath(article.section, article.slug);

    if (isLoading) return <Loading />;
    if (error) return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{error}</Text>;

    return (
        <>
            <ToolbarRow>
                <ViewToggle view={view} onViewChange={setView} />
            </ToolbarRow>

            {view === 'cards' ? (
                <BoardView>
                    <CategoryPanel>
                        <CategoryPanelHeader>Разделы</CategoryPanelHeader>
                        {(['news', 'articles', 'useful_to_know'] as ArticleSection[]).map(section => {
                            const active = selectedSection === section;
                            return (
                                <CategoryItem
                                    key={section}
                                    $active={active}
                                    onClick={() => setSelectedSection(section)}
                                >
                                    {SECTION_ICONS[section]}
                                    <CategoryName>{SECTION_LABELS[section]}</CategoryName>
                                    <CategoryCount $active={active}>
                                        {articles.filter(a => a.section === section).length}
                                    </CategoryCount>
                                </CategoryItem>
                            );
                        })}
                    </CategoryPanel>

                    <BoardMain>
                        <SectionHeader>
                            <SectionTitle>
                                {SECTION_ICONS[selectedSection]}
                                {SECTION_LABELS[selectedSection]}
                            </SectionTitle>
                            <ActionButton onClick={handleAdd}>
                                <Plus /> Добавить
                            </ActionButton>
                        </SectionHeader>

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
                                                <Code2 style={{ width: 12, height: 12, verticalAlign: -1 }} /> вёрстка в коде
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
                    </BoardMain>
                </BoardView>
            ) : (
                <Card>
                    <SectionHeader>
                        <SectionTitle>
                            {SECTION_ICONS[selectedSection]}
                            {SECTION_LABELS[selectedSection]}
                        </SectionTitle>
                        <ActionButton onClick={handleAdd}>
                            <Plus /> Добавить
                        </ActionButton>
                    </SectionHeader>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                        {(['news', 'articles', 'useful_to_know'] as ArticleSection[]).map(section => (
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
                                                ? 'в коде'
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
                </Card>
            )}

            {editing && (
                <ModalOverlay $fullscreen onClick={(e) => e.target === e.currentTarget && void handleCancel()}>
                    <ModalContent $fullscreen>
                        <ModalHeader>
                            {editing.id
                                ? `Редактирование: ${editing.title || 'без названия'}`
                                : `Новая публикация — ${SECTION_LABELS[editing.section]}`}
                            <CloseButton onClick={() => void handleCancel()} aria-label="Закрыть">
                                <X />
                            </CloseButton>
                        </ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default NewsManager;
