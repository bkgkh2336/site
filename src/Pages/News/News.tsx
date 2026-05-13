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
        },
        {
            title: "От конторы до предприятия — «Буда-Кошелевский коммунальник» отмечает 75-летие",
            image: "/main.png",
            url: "https://www.sb.by/articles/delat-zhizn-krashe.html",
            publishedDate: "23.03.2026",
            isExternal: true
        },
        {
            title: "Представители КЖУП «Буда-Кошелевский коммунальник» удостоены наград областного уровня",
            image: "/news/New2.jpg",
            url: "https://www.budakosh.by/2026/03/za-dobrosovestnyj-trud-v-preddverii-professionalnogo-prazdnika-dnya-rabotnikov-bytovogo-obsluzhivaniya-naseleniya-i-zhilishhno-kommunalnogo-hozyajstva-predstaviteli-kzhup-bu/",
            publishedDate: "19.03.2026",
            isExternal: true
        },
        {
            title: "Профсоюзный правовой прием граждан прошел в КЖУП «Буда-Кошелевский коммунальник»",
            image: "https://buda-koshelevo.gov.by/images/storage/news/000050_967797_big.jpg",
            url: "https://buda-koshelevo.gov.by/ru/district/view/profsojuznyj-pravovoj-priem-grazhdan-proshel-v-kzhup-buda-koshelevskij-kommunalnik-29148-2026/",
            publishedDate: "29.01.2026",
            isExternal: true
        },
        {
            title: "Чернобыль: от возрождения до устойчивого развития",
            image: "https://www.budakosh.by/wp-content/uploads/2026/04/img_5133.jpg",
            url: "https://www.budakosh.by/2026/04/chernobyl-ot-vozrozhdeniya-do-ustojchivogo-razvitiya-informaczionno-propagandistskaya-gruppa-pod-rukovodstvom-nachalnika-glavnogo-upravleniya-yusticzii-gomelskogo-oblispolkoma-artema-kamalyeva-vstre/",
            publishedDate: "16.04.2026",
            isExternal: true
        },
        {
            title: "Как в Буда-Кошелевском коммунальнике вытаскивают работников из алкогольного пика",
            image: "/news/New_alcho.jpg",
            url: "https://gp.by/novosti/obshchestvo/news317591.html",
            publishedDate: "11.05.2026",
            isExternal: true
        },
    ];

    const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split('.').map(Number);
        // Месяцы в JS начинаются с 0 (январь = 0, февраль = 1)
        return new Date(year, month - 1, day).getTime();
    };

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
                    {ourNews.sort((a, b) => parseDate(b.publishedDate) - parseDate(a.publishedDate)).map((news, index) => (
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
