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

const UnifiedSafetyDay = () => {
    const publishedDate = "21.09.2026";

    return (
        <ArticleContainer>
            <H1 style={{ marginBottom: '20px' }}>24 сентября состоится Единый день безопасности</H1>

            <PublicationDate>
                <Calendar size={16} />
                <span>Опубликовано: {publishedDate}</span>
            </PublicationDate>

            <ArticleContent>
                <ArticleImage
                    src="/news/edinyy_den_bezopasnosti_banner.jpg"
                    alt="Единый день безопасности"
                    loading="lazy"
                />

                <HighlightedText>
                    24 сентября 2026 года в Буда-Кошелёве состоится Единый день безопасности!
                </HighlightedText>

                <InfoBlock>
                    <InfoItem>
                        <MapPin size={24} style={{ flexShrink: 0, color: '#28a745' }} />
                        <span><strong>Место:</strong> Гомельская область, г. Буда-Кошелево, ул. Озёрная 3А, актовый зал</span>
                    </InfoItem>
                    <InfoItem>
                        <Clock size={24} style={{ flexShrink: 0, color: '#28a745' }} />
                        <span><strong>Время:</strong> 9:00</span>
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