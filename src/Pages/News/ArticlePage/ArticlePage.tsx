import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import ArticleLayout from '../../../Components/ArticleLayout/ArticleLayout';
import H1 from '../../../Components/H1/H1';
import ImageLightbox from '../../../Components/ImageLightbox/ImageLightbox';
import Loading from '../../../Components/Loading/Loading';
import NotFound from '../../NotFound/NotFound';
import {
    ArticleSection,
    CUSTOM_ARTICLES, formatArticleDate, parseGallery
} from '../../../data/articles';
import { useArticle } from '../../../data/useArticle';
import { splitBodyHtml } from '../../../data/customBody';
import { getArticleBlocks } from '../../../data/customContentDefaults';
import { customPageKey, type Block } from '../../../data/customContent';
import BlocksView from '../Blocks/BlocksView';
import RichChunk from '../RichChunk';
import {
    PublicationDate, HeroImage, Lead, GalleryCard, GalleryImage,
    CustomContainer, CustomDate, CustomContent, CustomImage, CustomLead
} from './styled';

interface ArticlePageProps {
    section: ArticleSection;
}

const ArticlePage = ({ section }: ArticlePageProps) => {
    const { slug } = useParams<{ slug: string }>();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [customLightbox, setCustomLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);

    const customKey = slug ? customPageKey(section, slug) : '';
    const customLayout = CUSTOM_ARTICLES[customKey];
    const { article, isLoading } = useArticle(section, slug || '');

    useEffect(() => {
        if (article) {
            document.title = `${article.title} - КЖУП "Буда-Кошелёвский коммунальник"`;
        }
    }, [article]);

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    if (customLayout) {
        const blocks = getArticleBlocks(article, customKey);
        const firstGallery = customLayout.coverFromGallery
            ? blocks.find((b): b is Extract<Block, { type: 'gallery' }> => b.type === 'gallery' && b.items.length > 0)
            : undefined;
        const coverSrc = article.cover || firstGallery?.items[0]?.src || '';

        return (
            <CustomContainer>
                <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

                <CustomDate>
                    <Calendar size={16} />
                    <span>
                        Опубликовано: {formatArticleDate(article.published_at, section === 'articles')}
                    </span>
                </CustomDate>

                <CustomContent>
                    <CustomImage
                        $wide={customLayout.wide}
                        src={coverSrc || undefined}
                        alt={article.title}
                        loading="lazy"
                    />

                    {customLayout.summary && (
                        <CustomLead>
                            {article.summary}
                        </CustomLead>
                    )}

                    <BlocksView
                        blocks={blocks}
                        pageKey={customKey}
                        onImageClick={customLayout.lightbox
                            ? (images, index) => setCustomLightbox({ images, index })
                            : undefined}
                    />
                </CustomContent>

                {customLightbox && (
                    <ImageLightbox
                        images={customLightbox.images}
                        currentIndex={customLightbox.index}
                        onClose={() => setCustomLightbox(null)}
                        onNavigate={index => setCustomLightbox(prev => (prev ? { ...prev, index } : prev))}
                    />
                )}
            </CustomContainer>
        );
    }

    const gallery = parseGallery(article.gallery);
    const showHero = article.cover && section !== 'useful_to_know';
    const lightboxImages = gallery.map(item => ({ src: item.src, alt: item.alt || '' }));
    const bodyParts = article.body ? splitBodyHtml(article.body) : [];

    return (
        <ArticleLayout>
            <H1>{article.title}</H1>

            {article.published_at && (
                <PublicationDate>
                    <Calendar size={16} />
                    <span>
                        Опубликовано: {formatArticleDate(article.published_at, section === 'articles')}
                    </span>
                </PublicationDate>
            )}

            {showHero && <HeroImage src={article.cover!} alt={article.title} loading="lazy" />}

            {article.summary && <Lead>{article.summary}</Lead>}

            {bodyParts.map((part, index) =>
                part.block ? (
                    <BlocksView key={index} blocks={[part.block]} />
                ) : (
                    <RichChunk key={index} html={part.html || ''} />
                )
            )}

            {gallery.length > 0 && (
                <GalleryCard>
                    {gallery.map((item, index) => (
                        <GalleryImage
                            key={`${item.src}-${index}`}
                            src={item.src}
                            alt={item.alt || article.title}
                            loading="lazy"
                            onClick={() => setLightboxIndex(index)}
                        />
                    ))}
                </GalleryCard>
            )}

            {lightboxIndex !== null && (
                <ImageLightbox
                    images={lightboxImages}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNavigate={setLightboxIndex}
                />
            )}
        </ArticleLayout>
    );
};

export default ArticlePage;
