import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import {
    NewsContainer,
    NewsSection,
    NewsGrid,
    NewsCard,
    NewsImage,
    NewsContent,
    NewsTitle,
    NewsDate,
    MoreNewsSection,
    MoreNewsText,
    MoreNewsButton
} from "./styled";
import H1 from "../../Components/H1/H1";
import Loading from "../../Components/Loading/Loading";
import { GetData } from "../../functions";
import {
    ArticleData, articlePath, feedDateValue, formatArticleDate
} from "../../data/articles";

export interface NewsItem {
    title: string;
    image: string;
    url: string;
    publishedDate: string;
    isExternal?: boolean;
    source?: string;
}

const News = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const all: ArticleData[] = await GetData('articles');
            const news: NewsItem[] = all
                .filter(a => a.section === 'news')
                .map(a => ({
                    title: a.title,
                    image: a.cover || '/main.png',
                    url: a.is_external === 1
                        ? (a.external_url || '#')
                        : articlePath('news', a.slug),
                    publishedDate: formatArticleDate(a.published_at) || '—',
                    isExternal: a.is_external === 1
                }))
                .sort((a, b) => feedDateValue(b.publishedDate) - feedDateValue(a.publishedDate));
            setItems(news);
            setIsLoading(false);
        })();
    }, []);

    const handleNewsClick = (newsItem: NewsItem) => {
        if (newsItem.isExternal) {
            window.open(newsItem.url, '_blank', 'noopener,noreferrer');
        } else {
            navigate(newsItem.url);
        }
    };

    return (
        <NewsContainer>
            <H1 style={{ marginBottom: '40px' }}>Новости</H1>

            <NewsSection>
                {isLoading ? (
                    <Loading />
                ) : (
                    <NewsGrid>
                        {items.map((news, index) => (
                            <NewsCard
                                key={index}
                                onClick={() => handleNewsClick(news)}
                            >
                                <NewsImage src={news.image} alt={news.title} loading="lazy" />
                                <NewsContent>
                                    <NewsTitle>{news.title}</NewsTitle>
                                    <NewsDate>
                                        <Calendar size={16} />
                                        <span>{news.publishedDate}</span>
                                    </NewsDate>
                                </NewsContent>
                            </NewsCard>
                        ))}
                    </NewsGrid>
                )}
            </NewsSection>

            <MoreNewsSection>
                <MoreNewsText>Больше новостей вы можете увидеть</MoreNewsText>
                <MoreNewsButton
                    href="https://www.budakosh.by/?s=буда-кошелевский+коммунальник"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    здесь <ExternalLink size={18} />
                </MoreNewsButton>
            </MoreNewsSection>
        </NewsContainer>
    );
};

export default News;
