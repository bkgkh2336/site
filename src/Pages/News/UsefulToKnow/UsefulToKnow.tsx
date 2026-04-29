import H1 from "../../../Components/H1/H1";
import { useNavigate } from "react-router-dom";
import { usefulToKnowArticles } from "../../../data/usefulToKnowArticles";
import { 
    UsefulContainer, 
    ArticlesGrid,
    ArticleCard,
    ArticleImage,
    ArticleTitle
} from "./styled";

const UsefulToKnow = () => {
    const navigate = useNavigate();

    return (
        <UsefulContainer>
            <H1 style={{ marginBottom: '20px' }}>Полезно знать</H1>
            
            <ArticlesGrid>
                {usefulToKnowArticles.map((article, index) => (
                    <ArticleCard 
                        key={index}
                        onClick={() => {
                            if (article.externalUrl) {
                                window.open(article.externalUrl, '_blank', 'noopener,noreferrer');
                            } else if (article.url) {
                                navigate(`/news/useful_to_know/${article.url}`);
                            }
                        }}
                    >
                        <ArticleImage src={article.image} alt={article.title} loading="lazy" />
                        <ArticleTitle>{article.title}</ArticleTitle>
                    </ArticleCard>
                ))}
            </ArticlesGrid>
        </UsefulContainer>
    );
};

export default UsefulToKnow;
