import H1 from "../../Components/H1/H1";
import ExternalLink from "../../Components/ExternalLink/ExternalLink";
import Table from "../../Components/Table/Table";
import { 
    PaymentContainer, 
    PaymentSection, 
    SectionTitle, 
    VideoContainer,
    VideoWrapper
} from "./styled";

const Payment = () => {
    const serviceCodes = [
        { code: 1, name: "Регулировка смывного бочка" },
        { code: 2, name: "Внутриквартирный засор канализации" },
        { code: 3, name: "Ремонт смесителя" },
        { code: 4, name: "Замена смесителя" },
        { code: 5, name: "Замена прибора учета водоснабжения" },
        { code: 6, name: "Установка прибора учета водоснабжения" },
        { code: 7, name: "Замена шлангов гибкой подводки" },
        { code: 8, name: "Замена унитаза" },
        { code: 9, name: "Замена полотенцесушителя" },
        { code: 10, name: "Обследование вентканалов и дымоходов" },
        { code: 11, name: "Изготовление оконных и дверных блоков" },
        { code: 12, name: "Изготовление штакетного забора" },
        { code: 13, name: "Другие виды" },
        { code: 14, name: "Откатка выгребной ямы" },
        { code: 15, name: "Подвод воды к дому (частный сектор)" },
        { code: 16, name: "Установка счетчика учета водоснабжения" },
        { code: 17, name: "Замена вводного крана" },
        { code: 18, name: "Обкос сорной растительности" },
        { code: 19, name: "Вывоз строительного мусора" },
        { code: 20, name: "Ритуальные услуги" },
        { code: 21, name: "Электрофизические измерения" },
        { code: 22, name: "Замена вводного кабеля (частный сектор)" },
        { code: 23, name: "Замена выключателя/розетки" },
        { code: 24, name: "Определение причины неисправности электропроводки" },
        { code: 25, name: "Услуги илососной (гидродинамической) машины" },
        { code: 26, name: "Иные транспортные услуги" },
        { code: 27, name: "Услуги паспортного стола" }
    ];

    return (
        <PaymentContainer>
            <H1 style={{ marginBottom: '20px' }}>Платежи через систему ЕРИП</H1>
            <PaymentSection>
                <SectionTitle>Инструкция и коды оплаты для системы ЕРИП</SectionTitle>
                <VideoContainer>
                    <VideoWrapper>
                        <iframe
                            src="https://www.youtube.com/embed/2Q31HsNRx6I"
                            title="Как оплатить коммунальные платежи в ЕРИП"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </VideoWrapper>
                </VideoContainer>
                <ExternalLink 
                    href="https://express-pay.by/docs/kak-oplatit-kommunalnye-uslugi-v-erip"
                    style={{ textAlign: 'center', fontSize: '1.1rem', padding: '12px 24px' }}
                >
                    Текстовый гид с картинками – в статье об оплате коммунальных платежей в ЕРИП
                </ExternalLink>
            </PaymentSection>

            <PaymentSection>
                <SectionTitle>Коды услуг для оплаты в системе ЕРИП</SectionTitle>
                <Table 
                    columns={[
                        { header: "Код в системе ЕРИП", key: "code" },
                        { header: "Наименование услуги", key: "name" }
                    ]}
                    data={serviceCodes}
                />
            </PaymentSection>
        </PaymentContainer>
    );
};

export default Payment;