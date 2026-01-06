import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
 
import {
    SubsidiesContainer,
    HighlightBox,
    InfoBox,
    StyledList,
    ListItem,
    SubsidyImage
} from "./styled";

const NonCashHousingSubsidies = () => {
    return (
        <SubsidiesContainer>
            <H1>Безналичные жилищные субсидии</H1>
            
            <HighlightBox>
                <H2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
                    О предоставлении безналичных жилищных субсидий
                </H2>
                <ExternalLink 
                    href="https://gkx.by/poleznye-sovety/baza-znanij/97-normativno-pravovye-dokumenty/135-ofitsialnye-dokumenty/1179-ukaz-prezidenta-respubliki-belarus-ot-29-avgusta-2016-g-322-o-predostavlenii-beznalichnykh-zhilishchnykh-subsidij"
                    style={{ color: 'white', fontSize: '1.1rem', textDecoration: 'underline' }}
                >
                    Указ № 322 «О предоставлении безналичных жилищных субсидий»
                </ExternalLink>
            </HighlightBox>

            <section>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Указ предусматривает внедрение с 1 октября 2016 года системы предоставления государственной помощи 
                    для частичной компенсации при оплате ЖКУ. Субсидию могут получить собственники жилья либо наниматели 
                    государственного жилья, а также члены их семей. Кроме того, субсидию могут оформить члены организации застройщиков.
                </Text>
                
                <SubsidyImage 
                    src="https://bkgkh.by/AllObjectsForGKX/ImgGKX/ImgOtherTabs/безнал-жилищ-субсидии.jpg"
                    alt="Схема предоставления безналичных жилищных субсидий"
                />
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Образцы заявлений
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Образцы заявлений на получение субсидии утверждены{' '}
                    <ExternalLink href="https://pravo.by/document/?guid=12551&p0=W21631280&p1=1">
                        постановлением Министерства жилищно-коммунального хозяйства (14.09.2016 №23)
                    </ExternalLink>. 
                    Получить подобный бланк заявления, а также консультацию как его заполнить правильно, можно в службе 
                    субсидирования (организации ЖКХ) по месту жительства.
                </Text>
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Сроки рассмотрения
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', marginBottom: '15px' }}>
                    Заявление на получение субсидии рассматривается должностными лицами в течение:
                </Text>
                <StyledList>
                    <ListItem>
                        <strong>10 рабочих дней</strong> со дня подачи заявления
                    </ListItem>
                    <ListItem>
                        <strong>15 рабочих дней</strong> в случае запроса документов и (или) сведений от других государственных органов, иных организаций
                    </ListItem>
                    <ListItem>
                        <strong>20 рабочих дней</strong> в случае проведения проверки представленных документов и (или) сведений
                    </ListItem>
                </StyledList>
                <InfoBox style={{ marginTop: '20px' }}>
                    <Text bold="bolder" style={{ fontSize: '1.05rem' }}>
                        Ответственность за достоверность предоставленных данных, например, о доходах, несет заявитель, 
                        поэтому будьте внимательны, собирая документы, справки и делая их копии.
                    </Text>
                </InfoBox>
            </section>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Перечень предоставляемых документов
                </H2>
                <StyledList>
                    <ListItem><strong>Заявление</strong></ListItem>
                    <ListItem><strong>Паспорт</strong> или иной документ, удостоверяющий личность</ListItem>
                    <ListItem><strong>Свидетельство о рождении ребенка</strong> – для лиц, имеющих детей в возрасте до 18 лет</ListItem>
                    <ListItem><strong>Свидетельство о заключении брака</strong> – для лиц, состоящих в браке</ListItem>
                    <ListItem><strong>Копия решения суда о расторжении брака или свидетельство о расторжении брака</strong> – для лиц, расторгнувших брак</ListItem>
                    <ListItem><strong>Трудовая книжка</strong> (при ее наличии) – для неработающих граждан старше 18 лет</ListItem>
                    <ListItem><strong>Свидетельство о государственной регистрации индивидуального предпринимателя</strong> – для индивидуальных предпринимателей</ListItem>
                    <ListItem><strong>Пенсионное удостоверение</strong> – для пенсионеров</ListItem>
                    <ListItem><strong>Удостоверение инвалида</strong> – для инвалидов</ListItem>
                    <ListItem><strong>Сведения о полученных доходах</strong> каждого члена семьи за последние 6 месяцев, предшествующих месяцу обращения</ListItem>
                </StyledList>
            </section>

            <HighlightBox>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
                    Срок предоставления субсидии
                </H2>
                <Text style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    6 месяцев (по заявительному принципу)
                </Text>
            </HighlightBox>

            <section>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Прием заявлений
                </H2>
                <InfoBox>
                    <Text style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                        Прием заявлений о предоставлении, прекращении, возобновлении безналичной жилищной субсидии 
                        ведет специалист по работе с жилищным фондом <strong>Абысова А.М.</strong>
                    </Text>
                    <Text style={{ fontSize: '1.05rem', lineHeight: '1.8', marginTop: '10px' }}>
                        <strong>Адрес:</strong> г. Буда-Кошелево, ул. 50 лет Октября 3
                    </Text>
                    <Text style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                        <strong>Телефон:</strong>{' '}
                        <a href="tel:+375233645788" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
                            8(02336)4-57-88
                        </a>
                    </Text>
                </InfoBox>
            </section>
        </SubsidiesContainer>
    );
};

export default NonCashHousingSubsidies