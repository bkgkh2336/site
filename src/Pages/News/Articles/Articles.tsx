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
            title: "Профилактика и уход за котельными установками во время морозов",
            image: "/articles/prevention_and_maintenance_of_boiler_installations_during_frosts.jpg",
            url: "/news/articles/boiler_maintenance",
            publishedDate: "28.01.2026 19:00"
        }
    ];

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
