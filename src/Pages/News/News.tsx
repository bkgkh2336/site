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

    const ourNews: NewsItem[] = [
        {
            title: "Прошла отчетная профсоюзная конференция",
            image: "/news/UnionConference_12_02_26/img1.jpg",
            url: "/news/union_conference",
            publishedDate: "13.02.2026",
            isExternal: false
        }
    ];

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
                <NewsGrid>
                    {ourNews.map((news, index) => (
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
