import { useState } from 'react';
import {
    Calendar
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    HighlightedText,
    PublicationDate
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import ImageLightbox from "../../../../Components/ImageLightbox/ImageLightbox";
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";
import { getArticleBlocks } from "../../../../data/customContentDefaults";
import type { Block } from "../../../../data/customContent";
import BlocksView from "../../Blocks/BlocksView";

const PAGE_KEY = 'news/cleanup_day';

const CleanupDay = () => {
    const { article, isLoading } = useArticle('news', 'cleanup_day');
    const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    const blocks = getArticleBlocks(article, PAGE_KEY);
    const firstGallery = blocks.find((b): b is Extract<Block, { type: 'gallery' }> => b.type === 'gallery' && b.items.length > 0);
    const coverSrc = article.cover || firstGallery?.items[0]?.src || '';

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {formatArticleDate(article.published_at)}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src={coverSrc || undefined}
                    alt={article.title}
                    loading="lazy"
                />

                <HighlightedText>
                    {article.summary}
                </HighlightedText>

                <BlocksView
                    blocks={blocks}
                    pageKey={PAGE_KEY}
                    onImageClick={(images, index) => setLightbox({ images, index })}
                />
            </ArticleContent>

            {lightbox && (
                <ImageLightbox
                    images={lightbox.images}
                    currentIndex={lightbox.index}
                    onClose={() => setLightbox(null)}
                    onNavigate={index => setLightbox(prev => (prev ? { ...prev, index } : prev))}
                />
            )}
        </ArticleContainer>
    );
};

export default CleanupDay;
