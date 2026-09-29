import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import ArticleLayout from '../../../Components/ArticleLayout/ArticleLayout';
import H1 from '../../../Components/H1/H1';
import ImageLightbox from '../../../Components/ImageLightbox/ImageLightbox';
import Loading from '../../../Components/Loading/Loading';
import NotFound from '../../NotFound/NotFound';
import { getCustomPage } from '../customPages';
import {
    ArticleSection, SECTION_FEED_PATHS,
    formatArticleDate, isCustomArticle, parseGallery
} from '../../../data/articles';
import { useArticle } from '../../../data/useArticle';
import {
    PublicationDate, HeroImage, Lead, ArticleBody, GalleryCard, GalleryImage
} from './styled';

interface ArticlePageProps {
    section: ArticleSection;
}

const ArticlePage = ({ section }: ArticlePageProps) => {
    const { slug } = useParams<{ slug: string }>();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const isCustom = Boolean(slug) && isCustomArticle(section, slug!);
    const Custom = isCustom ? getCustomPage(`${section}/${slug}`) : undefined;
    const { article, isLoading } = useArticle(section, slug || '');

    useEffect(() => {
        if (article) {
            document.title = `${article.title} - КЖУП "Буда-Кошелёвский коммунальник"`;
        }
    }, [article]);

    if (Custom) {
        return (
            <Suspense fallback={<Loading />}>
                <Custom />
            </Suspense>
        );
    }

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    const gallery = parseGallery(article.gallery);
    const showHero = article.cover && section !== 'useful_to_know';
    const lightboxImages = gallery.map(item => ({ src: item.src, alt: item.alt || '' }));

    return (
        <ArticleLayout backUrl={SECTION_FEED_PATHS[section]}>
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

            {article.body && <ArticleBody dangerouslySetInnerHTML={{ __html: article.body }} />}

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
