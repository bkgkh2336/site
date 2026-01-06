import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import Table from "../../../Components/Table/Table";
import InfoList from "../../../Components/InfoList/InfoList";
import {
    SaleLeaseContainer, 
    ContentSection,
    HighlightBox,
    InfoBlock
} from "./styled";

const SaleAndLease = () => {
    const rentalProperties = [
        {
            number: 1,
            address: "г. Буда-Кошелево, ул. Совхозная, д.16, кв.26",
            floor: "2/5",
            area: "41,5",
            rooms: "1",
            condition: "пригоден к заселению",
            equipment: "электроснабжение, водоснабжение, отопление центральное",
            price: "66,40+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г. (с предоставлением индивидуального ходатайства)"
        },
        {
            number: 2,
            address: "г. Буда-Кошелево, ул. Лавриновича, д.5а, кв.14",
            floor: "4/5",
            area: "42,2",
            rooms: "1",
            condition: "пригоден к заселению",
            equipment: "электроснабжение, водоснабжение, отопление центральное",
            price: "67,52+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г. (с предоставлением индивидуального ходатайства)"
        },
        {
            number: 3,
            address: "аг. Широкое, ул. Советская, д.6а, кв.2",
            floor: "1/2",
            area: "55,67",
            rooms: "2",
            condition: "пригоден к заселению",
            equipment: "электроснабжение, водоснабжение, отопление центральное",
            price: "32,07+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г."
        },
        {
            number: 4,
            address: "п. Красное Знамя, ул. Октябрьская, д.24, кв.1",
            floor: "1/1",
            area: "35,9",
            rooms: "2",
            condition: "пригоден к заселению",
            equipment: "электроснабжение, водоснабжение, отопление центральное",
            price: "18,79+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г."
        },
        {
            number: 5,
            address: "аг. Коммунар, ул. Молодежная, д.1, кв.38",
            floor: "3/5",
            area: "36,8",
            rooms: "1",
            condition: "пригоден к заселению",
            equipment: "электроснабжение, водоснабжение, отопление центральное",
            price: "23,55+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г."
        },
        {
            number: 6,
            address: "аг. Октябрь, ул. Октябрьская, д.8, кв.3",
            floor: "1/2",
            area: "39,8",
            rooms: "2",
            condition: "требуется ремонт на сумму 9415,06",
            equipment: "водоснабжение, водоотведение, электроснабжение, отопление центральное",
            price: "20,38+ коммунальные услуги",
            deadline: "с 08.02.2024 г. по 22.02.2024 г. Указ №112"
        }
    ];

    return (
        <SaleLeaseContainer>
            <H1 style={{ marginBottom: '30px' }}>Продажа и аренда</H1>
            
            <HighlightBox>
                <H2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'white' }}>
                    АРЕНДНОЕ ЖИЛЬЕ
                </H2>
                <Text style={{ fontSize: '1.1rem', color: 'white', marginBottom: '10px' }}>
                    Информация о наличии арендного жилья, подлежащего распределению, по состоянию на февраль 2025
                </Text>
            </HighlightBox>

            <ContentSection>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#28a745' }}>
                    Что такое арендное жилье?
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Арендное жилье – жилые помещения государственного жилищного фонда, предоставляемые гражданам 
                    за плату во временное владение и пользование на условиях договора найма арендного жилья.
                </Text>
            </ContentSection>

            <InfoBlock>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '15px' }}>
                    <strong>Важно знать:</strong>
                </Text>
                <InfoList>
                    <li>
                        Очередь на предоставление арендного жилья не формируется
                    </li>
                    <li>
                        Заявления от граждан принимаются не ранее, чем со дня размещения информации о наличии арендного жилья
                    </li>
                    <li>
                        Преимущественное право на получение арендного жилья имеют граждане, состоящие на учете нуждающихся 
                        в улучшении жилищных условий в местном исполнительном и распорядительном органе по месту жительства
                    </li>
                </InfoList>
            </InfoBlock>

            <div>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#28a745' }}>
                    Доступное арендное жилье
                </H2>
                <Table 
                    columns={[
                        { header: "№", key: "number" },
                        { header: "Адрес", key: "address" },
                        { header: "Этаж квартиры/дома", key: "floor" },
                        { header: "Общ. пл. м.кв.", key: "area" },
                        { header: "Кол-во комнат", key: "rooms" },
                        { header: "Уровень благоустройства", key: "condition" },
                        { header: "Инженерное оборудование", key: "equipment" },
                        { header: "Размер платы за пользование, руб.", key: "price" },
                        { header: "Срок подачи заявлений", key: "deadline" }
                    ]}
                    data={rentalProperties}
                />
            </div>
        </SaleLeaseContainer>
    );
};

export default SaleAndLease;