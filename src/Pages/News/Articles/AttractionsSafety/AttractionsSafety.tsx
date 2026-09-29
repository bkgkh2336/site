import {
    AlertTriangle,
    Calendar,
    Shield,
    Users,
    MapPin
} from 'lucide-react';
import {
    ArticleContainer,
    ArticleContent,
    ArticleImage,
    ArticleText,
    IntroSection,
    IconWrapper,
    HighlightBox,
    HighlightIcon,
    HighlightContent,
    HighlightTitle,
    HighlightText,
    QuoteSection,
    QuoteText,
    AuthorSection,
    AuthorRole,
    AuthorName,
    PublicationDate
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";

const AttractionsSafety = () => {
    const { article, isLoading } = useArticle('articles', 'attractions_safety');

    if (isLoading) return <Loading />;
    if (!article) return <NotFound />;

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>{article.title}</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {formatArticleDate(article.published_at, true)}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src={article.cover || ''}
                    alt="Безопасность аттракционов"
                    loading="lazy"
                />

                <IntroSection>
                    <IconWrapper>
                        <AlertTriangle size={40} />
                    </IconWrapper>
                    <ArticleText>
                        Аттракционы, как объекты сезонного вида развлечений, с установлением теплой, летней погоды притягивают пристальное внимание наших граждан. Однако, ежегодно Госпромнадзор фиксирует случаи нарушения правил безопасности, в том числе со стороны детей и их родителей, которые приводят и к несчастным случаям.
                    </ArticleText>
                </IntroSection>

                <HighlightBox>
                    <HighlightIcon>
                        <Shield size={32} />
                    </HighlightIcon>
                    <HighlightContent>
                        <HighlightTitle>Трагедия в Могилёве</HighlightTitle>
                        <HighlightText>
                            Так, 1 мая в г. Могилёве 18-летний стажер, проходивший обучение на должность оператора аттракционов, помогая посетителю безопасно покинуть карусель, не зафиксировал рабочий механизм. В результате отсутствия фиксации механизма движущая часть аттракциона начала самопроизвольное движение, и нанесла стажеру травму головы несовместимую с жизнью. Пользователи успели покинуть опасную зону за секунду до трагедии.
                        </HighlightText>
                    </HighlightContent>
                </HighlightBox>

                <ArticleText>
                    Помните, что аттракцион это потенциально опасный объект. Ни в коем случае нельзя нарушать правила пользования аттракционом. Контролируйте ваших детей и строго выполняйте все указания дежурного (оператора) аттракциона или любого другого надувного, игрового оборудования.
                </ArticleText>

                <QuoteSection>
                    <QuoteText>
                        <MapPin size={20} />
                        Практически в каждом районе Гомельской области существует практика размещения передвижных аттракционов, надувного и игрового оборудования, однако правила выбора площадки, соблюдение расстояний, требования к креплению оборудования и т.п. при установке и последующей эксплуатации контролируются, к сожалению, не всегда.
                    </QuoteText>
                </QuoteSection>

                <HighlightBox variant="warning">
                    <HighlightIcon variant="warning">
                        <Users size={32} />
                    </HighlightIcon>
                    <HighlightContent>
                        <HighlightTitle variant="warning">Уважаемые родители!</HighlightTitle>
                        <HighlightText>
                            В случае выявления передвижных аттракционов, надувного и игрового оборудования явно не соответствующих требованиям безопасности, установленных с нарушением, выявления факта бездействия или некомпетентности дежурного (оператора), просим информировать Гомельское областное управление Госпромнадзора для принятия мер по предотвращению несчастных случаев.
                        </HighlightText>
                    </HighlightContent>
                </HighlightBox>

                <ArticleText>
                    Берегите себя и не оставляйте детей без присмотра!
                </ArticleText>

                <AuthorSection>
                    <AuthorRole>Старший государственный инспектор</AuthorRole>
                    <AuthorRole>Гомельского областного управления Госпромнадзора</AuthorRole>
                    <AuthorName>Алексей Голуб</AuthorName>
                </AuthorSection>
            </ArticleContent>
        </ArticleContainer>
    );
};

export default AttractionsSafety;
