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
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";
import { getArticleBlocks } from "../../../../data/customContentDefaults";
import BlocksView from "../../Blocks/BlocksView";

const PAGE_KEY = 'news/unified_safety_day';

const UnifiedSafetyDay = () => {
    const { article, isLoading } = useArticle('news', 'unified_safety_day');

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    const blocks = getArticleBlocks(article, PAGE_KEY);

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {formatArticleDate(article.published_at)}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src={article.cover || undefined}
                    alt="Единый день безопасности"
                    loading="lazy"
                />

                <HighlightedText>
                    {article.summary}
                </HighlightedText>

                <BlocksView blocks={blocks} pageKey={PAGE_KEY} />
            </ArticleContent>
        </ArticleContainer>
    );
};

export default UnifiedSafetyDay;
