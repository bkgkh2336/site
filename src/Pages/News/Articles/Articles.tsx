import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import {
    ArticlesContainer,
    ArticlesGrid,
    ArticleCard,
    ArticleImage,
    ArticleContent,
    ArticleTitle,
    ArticleDate
} from "./styled";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import { GetData } from "../../../functions";
import {
    ArticleData, articlePath, feedDateValue, formatArticleDate
} from "../../../data/articles";

export interface Article {
    title: string;
    image: string;
    url: string;
    publishedDate: string;
}

const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const all: ArticleData[] = await GetData('articles');
            const list: Article[] = all
                .filter(a => a.section === 'articles')
                .map(a => ({
                    title: a.title,
                    image: a.cover || '/main.png',
                    url: articlePath('articles', a.slug),
                    publishedDate: formatArticleDate(a.published_at, true) || '—'
                }))
                .sort((a, b) => feedDateValue(b.publishedDate) - feedDateValue(a.publishedDate));
            setArticles(list);
            setIsLoading(false);
        })();
    }, []);

    return (
        <ArticlesContainer>
            <H1 style={{ marginBottom: '20px' }}>Статьи</H1>

            {isLoading ? (
                <Loading />
            ) : (
                <ArticlesGrid>
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={index}
                            onClick={() => navigate(article.url)}
                        >
                            <ArticleImage src={article.image} alt={article.title} loading="lazy" />
                            <ArticleContent>
                                <ArticleTitle>{article.title}</ArticleTitle>
                                <ArticleDate>
                                    <Calendar size={16} />
                                    <span>{article.publishedDate}</span>
                                </ArticleDate>
                            </ArticleContent>
                        </ArticleCard>
                    ))}
                </ArticlesGrid>
            )}
        </ArticlesContainer>
    );
};

export default Articles;
