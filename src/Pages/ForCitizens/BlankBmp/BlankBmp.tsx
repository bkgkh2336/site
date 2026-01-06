import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import Table from "../../../Components/Table/Table";
import { 
    BlankBmpContainer, 
    ContentSection,
    InfoBox
} from "./styled";
import { ExternalLinkIcon } from "lucide-react";


const BlankBmp = () => {
    const priceListData = [
        {
            number: 1,
            type: "Макулатура (при сдаче до 500 кг)",
            unit: "кг",
            price: "0,10"
        },
        {
            number: 2,
            type: "Макулатура (при сдаче от 500 кг и выше)",
            unit: "кг",
            price: "0,20"
        },
        {
            number: 4,
            type: "Стеклобой",
            unit: "кг",
            price: "0,15"
        },
        {
            number: 5,
            type: "Полиэтилен (пэт-бутылки)",
            unit: "кг",
            price: "0,04"
        },
        {
            number: 6,
            type: "Отходы электрического и электронного оборудования",
            unit: "кг",
            price: "согласно действующему договору с УП \"Гомель ВТИ\""
        },
        {
            number: 7,
            type: "Отходы полимерные",
            unit: "кг",
            price: "0,04"
        },
        {
            number: 8,
            type: "Пленка ПЭ (цветная)",
            unit: "кг",
            price: "0,04"
        },
        {
            number: 9,
            type: "Пленка (бесцветная)",
            unit: "кг",
            price: "0,04"
        }
    ];

    return (
        <BlankBmpContainer>
            <H1>Заготовка BMP</H1>
            <div style={{backgroundColor: 'rgb(40, 167, 69, 0.1)', padding: '20px', borderRadius: '12px'}}>
                <ExternalLink 
                    href="https://buda-koshelevo.gov.by/uploads/Files/Informatsija-o-mestax-sbora-kommunalnyx-otxodov-1-1.pdf"
                    style={{ color: 'rgb(40, 167, 69)', fontSize: '1.1rem' }}
                >
                    <ExternalLinkIcon style={{ width: '1.2rem', height: '1.2rem', marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
                    Информация о местах сбора коммунальных отходов потребления, пунктов приема (заготовки) вторичных материальных ресурсов, объектах по сортировке и использованию отходов
                </ExternalLink>
            </div>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    О пункте приема
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify' }}>
                    Коммунальное жилищное унитарное предприятие "Буда-Кошелевский коммунальник" осуществляет заготовку 
                    вторичных материальных ресурсов от населения через пункт приема по адресу:{' '}
                    <strong style={{ color: '#28a745' }}>г. Буда-Кошелево, ул. Озерная, 3а</strong>.
                </Text>
            </ContentSection>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    График работы
                </H2>
                <InfoBox>
                    <Text bold="bolder" style={{ fontSize: '1.1rem', marginBottom: '10px', display: 'block' }}>
                        Понедельник - Пятница: 8:00 - 17:00
                    </Text>
                    <Text style={{ fontSize: '1.05rem', color: '#6c757d' }}>
                        Выходные: Суббота, Воскресенье
                    </Text>
                </InfoBox>
            </ContentSection>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                    Контактная информация
                </H2>
                <Text style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                    Связаться по телефону можно по номеру:{' '}
                    <a href="tel:+375233674386" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>
                        8(02336)7-43-86
                    </a>
                </Text>
            </ContentSection>

            <ContentSection>
                <H2 style={{ fontSize: '1.4rem', marginBottom: '25px', textAlign: 'center', color: '#28a745' }}>
                    Прейскуранты цен на закуп вторичных материальных ресурсов
                </H2>
                <Table 
                    columns={[
                        { header: "№ п/п", key: "number" },
                        { header: "Вид вторичных материальных ресурсов", key: "type" },
                        { header: "Ед.изм", key: "unit" },
                        { header: "Цена без НДС, руб.", key: "price" }
                    ]}
                    data={priceListData}
                />
            </ContentSection>
        </BlankBmpContainer>
    );
};

export default BlankBmp;