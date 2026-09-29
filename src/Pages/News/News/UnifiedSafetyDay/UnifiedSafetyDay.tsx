import {
    Calendar,
    MapPin,
    Clock,
    ExternalLink,
    Image
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    HighlightedText,
    PublicationDate,
    SectionTitle,
    ArticleText,
    InfoBlock,
    InfoItem,
    ExternalLink as ExternalLinkStyled
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";

const UnifiedSafetyDay = () => {
    const { article, isLoading } = useArticle('news', 'unified_safety_day');

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {formatArticleDate(article.published_at)}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src={article.cover || ''}
                    alt="Единый день безопасности"
                    loading="lazy"
                />

                <HighlightedText>
                    {article.summary}
                </HighlightedText>

                <InfoBlock>
                    <InfoItem>
                        <MapPin size={24} style={{ flexShrink: 0, color: '#28a745' }} />
                        <span><strong>Место:</strong> Гомельская область, г. Буда-Кошелево, ул. Озёрная 3А, актовый зал</span>
                    </InfoItem>
                    <InfoItem>
                        <Clock size={24} style={{ flexShrink: 0, color: '#28a745' }} />
                        <span><strong>Время:</strong> 11:00</span>
                    </InfoItem>
                </InfoBlock>

                <ArticleText>
                    <strong>Единый день безопасности</strong> — ежегодное масштабное мероприятие, направленное на профилактику чрезвычайных ситуаций и повышение уровня безопасности населения. В рамках мероприятия проводятся лекции, тренинги и практические занятия по вопросам безопасного поведения в различных жизненных ситуациях.
                </ArticleText>

                <ArticleText>
                    Мероприятие организовано Министерством по чрезвычайным ситуациям Республики Беларусь и направлено на обучение граждан навыкам самозащиты и оказания первой помощи, а также на повышение осведомлённости о рисках и способах их предотвращения.
                </ArticleText>

                <SectionTitle>
                    <Image size={28} />
                    Материалы мероприятия
                </SectionTitle>

                <ArticleText>
                    Подробная информация о Едином дне безопасности доступна на официальном сайте МЧС Республики Беларусь.
                </ArticleText>

                <ExternalLinkStyled href="https://mchs.gov.by/edinyy-den-bezopasnosti/" target="_blank" rel="noopener noreferrer">
                    Перейти на сайт МЧС <ExternalLink size={18} />
                </ExternalLinkStyled>
            </ArticleContent>
        </ArticleContainer>
    );
};

export default UnifiedSafetyDay;