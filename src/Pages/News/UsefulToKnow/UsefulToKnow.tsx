import { useEffect, useState } from "react";
import H1 from "../../../Components/H1/H1";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../../functions";
import { ArticleData, articlePath } from "../../../data/articles";
import {
    UsefulContainer,
    ArticlesGrid,
    ArticleCard,
    ArticleImage,
    ArticleTitle
} from "./styled";

export interface UsefulArticle {
    title: string;
    image: string;
    url?: string;
    externalUrl?: string;
}

const UsefulToKnow = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<UsefulArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const all: ArticleData[] = await GetData('articles');
            setArticles(
                all
                    .filter(a => a.section === 'useful_to_know')
                    .map(a =>
                        a.is_external === 1
                            ? {
                                  title: a.title,
                                  image: a.cover || '/main.png',
                                  externalUrl: a.external_url || '#'
                              }
                            : {
                                  title: a.title,
                                  image: a.cover || '/main.png',
                                  url: articlePath('useful_to_know', a.slug)
                              }
                    )
            );
            setIsLoading(false);
        })();
    }, []);

    return (
        <UsefulContainer>
            <H1 style={{ marginBottom: '20px' }}>Полезно знать</H1>

            {isLoading ? (
                <Loading />
            ) : (
                <ArticlesGrid>
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={index}
                            onClick={() => {
                                if (article.externalUrl) {
                                    window.open(article.externalUrl, '_blank', 'noopener,noreferrer');
                                } else if (article.url) {
                                    navigate(article.url);
                                }
                            }}
                        >
                            <ArticleImage src={article.image} alt={article.title} loading="lazy" />
                            <ArticleTitle>{article.title}</ArticleTitle>
                        </ArticleCard>
                    ))}
                </ArticlesGrid>
            )}
        </UsefulContainer>
    );
};

export default UsefulToKnow;
