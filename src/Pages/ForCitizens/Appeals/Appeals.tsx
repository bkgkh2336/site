import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import { 
    AppealsContainer, 
    ContentSection, 
    HighlightBox,
    ListItem,
    StyledList,
    ImportantNotice,
    BenefitsList
} from "./styled";
import { ExternalLinkIcon } from "lucide-react";


const Appeals = () => {
    return (
        <AppealsContainer>
            <H1>Обращения граждан и юр. лиц</H1>
            
            <HighlightBox>
                <H2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Подача электронных обращений в КЖУП "Буда-Кошелевский коммунальник"
                </H2>
                <Text style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Подача электронных обращений будет осуществляться посредством государственной единой 
                    (интегрированной) республиканской информационной системы учета и обработки обращений 
                    граждан и юридических лиц.
                </Text>
            </HighlightBox>

            <ContentSection>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Электронные обращения граждан и юридических лиц направляются и рассматриваются в соответствии 
                    с требованиями Закона Республики Беларусь от 18 июля 2011 года "Об обращениях граждан и юридических лиц". 
                    Электронные обращения подаются в государственные органы и иные государственные организации через 
                    государственную единую (интегрированную) республиканскую информационную систему учета и обработки 
                    обращений граждан и юридических лиц.
                </Text>

                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify', marginTop: '20px' }}>
                    Ответы на электронные обращения направляются в электронном виде на адрес электронной почты, 
                    указанный в электронном обращении, либо в письменном виде по месту жительства (месту пребывания) 
                    гражданина или месту нахождения юридического лица в случаях, установленных Законом Республики 
                    Беларусь от 18 июля 2011 года "Об обращениях граждан и юридических лиц".
                </Text>
            </ContentSection>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Требования к обращениям
                </H2>
                <StyledList>
                    <ListItem>Обращения излагаются на белорусском или русском языке</ListItem>
                    <ListItem>Согласно статье 12 Закона «Об обращениях граждан и юридических лиц» поля, помеченные *, обязательны для заполнения</ListItem>
                    <ListItem>Не допускается употребление в обращениях нецензурных либо оскорбительных слов или выражений</ListItem>
                    <ListItem>В обращениях должна содержаться информация о результатах их предыдущего рассмотрения с приложением (при наличии) подтверждающих эту информацию документов</ListItem>
                    <ListItem>Отзыв электронного обращения осуществляется путем подачи письменного заявления либо направления заявления в электронной форме</ListItem>
                </StyledList>
            </ContentSection>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Доступ к Системе
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Доступ к Системе для заявителей бесплатный и осуществляется через сайт{' '}
                    <ExternalLink href="https://обращения.бел" style={{ display: 'inline' }}>
                        обращения.бел
                    </ExternalLink>, на котором необходимо пройти регистрацию, после чего Система формирует личный 
                    электронный кабинет заявителя. Через свой личный кабинет заявитель может направить обращения в 
                    необходимый для него государственный орган или государственную организацию, а по результатам 
                    рассмотрения обращения ответы на них будут направляться заявителю в личный кабинет.
                </Text>
            </ContentSection>

            <ImportantNotice>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
                    Преимущества системы
                </H2>
                <BenefitsList>
                    <ListItem>
                        <strong>Удобство:</strong> заявителю предоставляется единый интерфейс для оформления 
                        электронного обращения и его подачи в любую организацию, подключенную к Системе
                    </ListItem>
                    <ListItem>
                        <strong>Отслеживание:</strong> возможность отслеживать, на какой стадии рассмотрения 
                        находится электронное обращение
                    </ListItem>
                    <ListItem>
                        <strong>История:</strong> просмотр перечня поданных обращений и статуса их рассмотрения
                    </ListItem>
                    <ListItem>
                        <strong>Гибкость:</strong> возможность отзывать обращения
                    </ListItem>
                </BenefitsList>
            </ImportantNotice>

            <ContentSection style={{ textAlign: 'center' }}>
                <ExternalLink 
                    href="https://обращения.бел/"
                    style={{ fontSize: '1.2rem', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                    <ExternalLinkIcon style={{ width: '1.2rem', height: '1.2rem' }} />
                    Перейти к системе обращений
                </ExternalLink>
            </ContentSection>
        </AppealsContainer>
    );
};

export default Appeals;