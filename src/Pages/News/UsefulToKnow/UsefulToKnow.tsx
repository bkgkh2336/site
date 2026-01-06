import H1 from "../../../Components/H1/H1";
import { useNavigate } from "react-router-dom";
import { 
    UsefulContainer, 
    ArticlesGrid,
    ArticleCard,
    ArticleImage,
    ArticleTitle
} from "./styled";

const UsefulToKnow = () => {
    const navigate = useNavigate();

    const articles = [
        {
            title: "Pomogut BY",
            image: "/useful_to_know/pomogut-by_icon.png",
            url: "pomogut_by"
        },
        {
            title: "Безопасность в сети и банковские карты",
            image: "/useful_to_know/safe-internet_icon.jpg",
            url: "safe_internet_cards"
        },
        {
            title: "Телефонные мошенники",
            image: "/useful_to_know/phone-scammers_icon.jpg",
            url: "phone_scammers"
        },
        {
            title: "Памятка по безопасной эксплуатации бытовых котлов на твердых видах топлива",
            image: "/useful_to_know/boiler_safety_icon.png",
            url: "boiler_safety"
        },
        {
            title: "Памятка по компостированию отходов",
            image: "/useful_to_know/composting-guide_icon.jpg",
            url: "composting_guide"
        },
        {
            title: "Памятка для тех, кто живет в индивидуальных домах и использует по два контейнера для сбора отходов",
            image: "/useful_to_know/waste-containers_icon.jpg",
            url: "waste_containers_guide"
        },
        {
            title: "Памятка по организации вывоза коммунальных отходов для владельцев индивидуального жилищного фонда",
            image: "/useful_to_know/waste-removal-guide_icon.png",
            url: "waste_removal_guide"
        },
        {
            title: "Памятка для тех, у кого во дворах стоят отдельные контейнеры для отходов бумаги, стекла, пластика",
            image: "/useful_to_know/yard-recycling-guide_icon.jpg",
            url: "yard_recycling_guide"
        },
        {
            title: "Памятка по наведению порядка на земельных участках граждан и прилегающих к ним территориях",
            image: "/useful_to_know/landscaping-guide_icon.jpg",
            url: "landscaping_guide"
        }
    ];

    return (
        <UsefulContainer>
            <H1 style={{ marginBottom: '20px' }}>Полезно знать</H1>
            
            <ArticlesGrid>
                {articles.map((article, index) => (
                    <ArticleCard 
                        key={index}
                        onClick={() => navigate(`/news/useful_to_know/${article.url}`)}
                    >
                        <ArticleImage src={article.image} alt={article.title} />
                        <ArticleTitle>{article.title}</ArticleTitle>
                    </ArticleCard>
                ))}
            </ArticlesGrid>
        </UsefulContainer>
    );
};

export default UsefulToKnow;