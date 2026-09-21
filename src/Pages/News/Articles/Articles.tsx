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

export interface Article {
    title: string;
    image: string;
    url: string;
    publishedDate: string;
}

const Articles = () => {
    const navigate = useNavigate();

    const articles: Article[] = [
        {
            title: "Автономные пожарные извещатели — важный элемент пожарной безопасности",
            image: "/articles/autonomous_fire_detectors.jpg",
            url: "/news/articles/autonomous_fire_detectors",
            publishedDate: "21.09.2026 14:00"
        },
        {
            title: "Профилактика и уход за котельными установками во время морозов",
            image: "/articles/prevention_and_maintenance_of_boiler_installations_during_frosts.jpg",
            url: "/news/articles/boiler_maintenance",
            publishedDate: "28.01.2026 19:00"
        },
        {
            title: "Аттракцион должен быть безопасным!",
            image: "/articles/attractions.jpg",
            url: "/news/articles/attractions_safety",
            publishedDate: "13.05.2026 14:00"
        }
    ].sort((a, b) => {
        const parseDate = (s: string) => {
            const [date, time] = s.split(' ');
            const [d, m, y] = date.split('.');
            return new Date(+y, +m - 1, +d, ...time.split(':').map(Number));
        };
        return parseDate(b.publishedDate).getTime() - parseDate(a.publishedDate).getTime();
    });

    return (
        <ArticlesContainer>
            <H1 style={{ marginBottom: '20px' }}>Статьи</H1>
            
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
        </ArticlesContainer>
    );
};

export default Articles;
