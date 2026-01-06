import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import { 
    SurveysContainer,
    HighlightBox,
    StyledList,
    ListItem,
    BenefitsList
} from "./styled";
import { ExternalLinkIcon } from "lucide-react";


const Surveys = () => {
    return (
        <SurveysContainer>
            <H1>Опросы</H1>
            
            <HighlightBox>
                <H2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Портал рейтинговой оценки качества оказания услуг и административных процедур
                </H2>
                <ExternalLink 
                    href="https://качество-услуг.бел/organization/36990/org-page"
                    style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'underline' }}
                >
                    <ExternalLinkIcon style={{ width: '1.2rem', height: '1.2rem', marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
                    КЖУП "Буда-Кошелевский коммунальник" на портале
                </ExternalLink>
            </HighlightBox>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Для чего предназначен портал
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Портал рейтинговой оценки качества оказания услуг и административных процедур организациями 
                    Республики Беларусь предоставляет доступный способ для граждан высказать свое мнение о качестве 
                    обслуживания населения государственными организациями, что способствует повышению качества оказания 
                    государственных услуг. Формирующийся на основе этих оценок рейтинг государственных организаций создает 
                    дополнительный стимул для улучшения качества работы с населением и способствует развитию открытого 
                    диалога правительства и населения. Функционирование портала соответствует целям и задачам, поставленным 
                    перед государством Главой государства (Директива Президента Республики Беларусь от 27 декабря 2006 г. 
                    № 2 «О мерах по дальнейшей дебюрократизации государственного аппарата»).
                </Text>
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Как формируется рейтинг организаций
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Рейтинг организаций формируется на основе оценок граждан, получивших услуги в той или иной 
                    государственной организации. Доступ к анкете для осуществления такой оценки предоставляется на портале 
                    посредством использования одного из предусмотренных механизмов поиска для выбора интересующей 
                    организации и нажатия кнопки "Оценить". Для каждой заполненной анкеты пользователя портала 
                    рассчитывается средняя оценка по всем содержащимся в ней критериям. Итоговой оценкой организации 
                    является усредненная оценка по всем заполненным анкетам, относящимся к данной организации. В результате 
                    такие оценки формируют рейтинг организаций по качеству обслуживания населения на портале.
                </Text>
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Как найти организацию на портале
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '15px' }}>
                    Организацию на портале можно найти любым удобным для пользователя образом:
                </Text>
                <StyledList>
                    <ListItem>с помощью поисковой строки</ListItem>
                    <ListItem>в перечне организаций</ListItem>
                    <ListItem>на карте (раздел "Рейтинг")</ListItem>
                    <ListItem>по сферам жизнедеятельности и категориям</ListItem>
                </StyledList>
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Как заполнить анкету
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Для заполнения анкеты о качестве работы интересующей организации необходимо найти организацию на 
                    портале и на странице организации нажать кнопку «Оценить».
                </Text>
            </section>

            <HighlightBox>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
                    Преимущества системы
                </H2>
                <BenefitsList>
                    <ListItem>
                        <strong>Удобство:</strong> заявителю предоставляется единый интерфейс для оформления оценки
                    </ListItem>
                    <ListItem>
                        <strong>Прозрачность:</strong> просмотр рейтингов организаций в открытом доступе
                    </ListItem>
                    <ListItem>
                        <strong>Влияние:</strong> ваша оценка влияет на улучшение качества услуг
                    </ListItem>
                    <ListItem>
                        <strong>Доступность:</strong> бесплатный доступ к порталу
                    </ListItem>
                </BenefitsList>
            </HighlightBox>

            <section style={{ textAlign: 'center' }}>
                <ExternalLink 
                    href="https://качество-услуг.бел/organization/36990/org-page"
                    style={{ fontSize: '1.2rem', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                    <ExternalLinkIcon style={{ width: '1.2rem', height: '1.2rem' }} />
                    Перейти к оценке организации
                </ExternalLink>
            </section>
        </SurveysContainer>
    );
};

export default Surveys;