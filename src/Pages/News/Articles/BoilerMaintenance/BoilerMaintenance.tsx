import { 
    AlertTriangle,
    Flame,
    Wind,
    Thermometer,
    Shield,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Calendar
} from 'lucide-react';
import { 
    ArticleContainer, 
    ArticleContent,
    ArticleImage,
    ArticleText,
    ArticleWarning,
    IntroSection,
    InfoCard,
    InfoCardIcon,
    InfoCardContent,
    InfoCardTitle,
    InfoCardText,
    RecommendationsSection,
    RecommendationsList,
    RecommendationItem,
    RecommendationIcon,
    RecommendationText,
    DangerSection,
    DangerTitle,
    DangerList,
    DangerItem,
    AuthorSection,
    IconWrapper,
    PublicationDate
} from "./styled";
import H1 from "../../../../Components/H1/H1";
import Loading from "../../../../Components/Loading/Loading";
import NotFound from "../../../NotFound/NotFound";
import { useArticle } from "../../../../data/useArticle";
import { formatArticleDate } from "../../../../data/articles";

const BoilerMaintenance = () => {
    const { article, isLoading } = useArticle('articles', 'boiler_maintenance');

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
                    alt={article.title}
                    loading="lazy"
                />
                
                <IntroSection>
                    <IconWrapper>
                        <AlertTriangle size={40} />
                    </IconWrapper>
                    <ArticleText>
                        При низких температурах, нередки случаи замерзаний систем отопления (расширительных баков) с прекращением циркуляции воды в отопительной системе и, как следствие, взрывы котлов.
                    </ArticleText>
                </IntroSection>
                
                <ArticleText>
                    Замерзание систем отопления, как правило, происходит в чердачных помещениях при не утепленных или недостаточно утепленных расширительных баках, в тех случаях, когда котлы эксплуатируются на твердых видах топлива не постоянно, или при наличии сквозняков, воздействующих на систему отопления.
                </ArticleText>

                <InfoCard>
                    <InfoCardIcon>
                        <Shield size={32} />
                    </InfoCardIcon>
                    <InfoCardContent>
                        <InfoCardTitle>Важно помнить</InfoCardTitle>
                        <InfoCardText>
                            В очередной раз хочется напомнить простые требования, понимание и выполнение которых поможет избежать чрезвычайных ситуаций. Установка котлов на твердом топливе в частных домах не регламентирована. То есть здесь безопасность использования котла напрямую зависит исключительно от правильных действий владельца.
                        </InfoCardText>
                    </InfoCardContent>
                </InfoCard>

                <DangerSection>
                    <DangerTitle>
                        <AlertCircle size={28} />
                        Основные опасности
                    </DangerTitle>
                    <DangerList>
                        <DangerItem>
                            <Wind size={24} />
                            <div>
                                <strong>Отсутствие тяги:</strong> может произойти выброс угарного газа внутрь помещения. Следует правильно обустраивать дымоход и вовремя очищать его от накопившейся сажи.
                            </div>
                        </DangerItem>
                        <DangerItem>
                            <Thermometer size={24} />
                            <div>
                                <strong>Циркуляция воды:</strong> должна быть обеспечена циркуляция воды в системе и непосредственно через сам котел.
                            </div>
                        </DangerItem>
                        <DangerItem>
                            <Flame size={24} />
                            <div>
                                <strong>Раскаленные угли:</strong> выпавшие из топки раскаленные угли могут представлять опасность. Площадка перед котлом должна быть выполнена из огнеупорного материала.
                            </div>
                        </DangerItem>
                        <DangerItem>
                            <Shield size={24} />
                            <div>
                                <strong>Изоляция помещения:</strong> желательно поместить котельное оборудование в обособленном помещении, которое не сообщается с жилыми комнатами.
                            </div>
                        </DangerItem>
                    </DangerList>
                </DangerSection>

                <RecommendationsSection>
                    <h3>В целях предупреждения чрезвычайных происшествий при эксплуатации котлов, при низких температурах окружающей среды рекомендуем:</h3>
                    
                    <RecommendationsList>
                        <RecommendationItem>
                            <RecommendationIcon><CheckCircle2 size={20} /></RecommendationIcon>
                            <RecommendationText>проверить состояние тепловой изоляции расширительного бака и соединительной трубы между баком и обратным трубопроводом</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><CheckCircle2 size={20} /></RecommendationIcon>
                            <RecommendationText>проверить наличие предохранительного клапана на расширительном сосуде закрытого типа</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><CheckCircle2 size={20} /></RecommendationIcon>
                            <RecommendationText>проверить исправность предохранительных клапанов, манометров, термометров установленных на оборудовании</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><CheckCircle2 size={20} /></RecommendationIcon>
                            <RecommendationText>проверить наличие в трубопроводе отвода конденсата из нижнего кармана дымовой трубы для котлов, работающих с естественной тягой</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><CheckCircle2 size={20} /></RecommendationIcon>
                            <RecommendationText>осмотреть оголовки дымоходов для предотвращения их обмерзания и закупорки</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><XCircle size={20} /></RecommendationIcon>
                            <RecommendationText>не допускать работу котлов при неустойчивом горении и не отрегулированном соотношении «топливо-воздух»</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><XCircle size={20} /></RecommendationIcon>
                            <RecommendationText>не пользоваться открытым огнем по выявлению утечек газа из газопотребляющего оборудования и газопровода</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><XCircle size={20} /></RecommendationIcon>
                            <RecommendationText>не производить подпитку котлов при упуске из него воды</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><XCircle size={20} /></RecommendationIcon>
                            <RecommendationText>не допускать отключение приборов безопасности, предохранительных устройств, звуковую сигнализацию</RecommendationText>
                        </RecommendationItem>
                        <RecommendationItem>
                            <RecommendationIcon><XCircle size={20} /></RecommendationIcon>
                            <RecommendationText>не хранить рядом с котлами горючие, смазочные и обтирочные материалы</RecommendationText>
                        </RecommendationItem>
                    </RecommendationsList>
                </RecommendationsSection>

                <ArticleWarning>
                    <ArticleText style={{ marginBottom: 0 }}>
                        <strong>Внимание!</strong> При обнаружении неисправности эксплуатация отопительного оборудования должна быть приостановлена до полного устранения не соответствий в работе оборудования.
                    </ArticleText>
                </ArticleWarning>

                <AuthorSection>
                    <strong>Гомельское областное управление Госпромнадзора</strong>
                </AuthorSection>
            </ArticleContent>
        </ArticleContainer>
    );
};

export default BoilerMaintenance;
