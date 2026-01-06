import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Text from "../../../Components/Text/Text";
import Table from "../../../Components/Table/Table";
import ExternalLink from "../../../Components/ExternalLink/ExternalLink";
import InstructionList from "../../../Components/InstructionList/InstructionList";
import {
    TariffsContainer, 
    ContentSection,
    DecisionBox,
    TableTitle,
    NoticeBox,
    DecisionTitle,
    DecisionDate,
    DecisionSubject,
    LegalBasis,
    DecisionPoint,
    SignatureBlock
} from "./styled";

const Tariffs = () => {
    const fixedTariffs = [
        {
            number: 1,
            service: "Водоснабжение",
            unit: "1 кубический метр",
            subsidized: "1,8793",
            fullCost: "2,1548"
        },
        {
            number: 2,
            service: "Водоотведение (канализация)",
            unit: "1 кубический метр",
            subsidized: "1,6267",
            fullCost: "1,9995"
        }
    ];

    const maxTariffs = [
        {
            number: 1,
            service: "Техническое обслуживание",
            unit: "1 кубический метр",
            subsidized: "0,1932",
            fullCost: "0,2073"
        },
        {
            number: 2,
            service: "Капитальный ремонт жилого дома",
            unit: "1 кубический метр",
            subsidized: "0,2536",
            fullCost: "-"
        },
        {
            number: 3,
            service: "Техническое обслуживание лифта",
            unit: "1 кубический метр",
            subsidized: "0,0900",
            fullCost: "0,0900"
        },
        {
            number: 4,
            service: "Обращение с твердыми коммунальными отходами в жилых домах, не оборудованных мусоропроводом или оборудованных нефункционирующим мусоропроводом",
            unit: "1 кубический метр",
            subsidized: "15,3776",
            fullCost: "15,4592"
        }
    ];

    return (
        <TariffsContainer>
            <H1>Тарифы на ЖКУ</H1>
            
            <ContentSection style={{ background: 'rgba(40, 167, 69, 0.05)', borderLeft: '5px solid #28a745' }}>
                <ExternalLink 
                    href="/for-citizens/tariffs-communal/права-потребителей-жку"
                    style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                >
                    Права потребителей ЖКУ
                </ExternalLink>
            </ContentSection>

            <DecisionBox>
                <DecisionTitle>
                    РЕШЕНИЕ ГОМЕЛЬСКОГО ОБЛАСТНОГО ИСПОЛНИТЕЛЬНОГО КОМИТЕТА
                </DecisionTitle>
                <DecisionDate>
                    3 февраля 2025 г. № 72
                </DecisionDate>
                <DecisionSubject>
                    О регулировании тарифов
                </DecisionSubject>
            </DecisionBox>

            <ContentSection>
                <LegalBasis>
                    На основании подпункта 2.1 пункта 2 Указа Президента Республики Беларусь от 25 февраля 2011 г. 
                    № 72 «О некоторых вопросах регулирования цен (тарифов) в Республике Беларусь» Гомельский областной 
                    исполнительный комитет РЕШИЛ:
                </LegalBasis>
                
                <DecisionPoint>
                    1. Установить на 2025 год:
                </DecisionPoint>
                <InstructionList>
                    <li>
                        Фиксированные тарифы на жилищно-коммунальные услуги, предоставляемые населению, согласно приложению 1;
                    </li>
                    <li>
                        Предельные максимальные тарифы на жилищно-коммунальные услуги, предоставляемые населению, согласно приложению 2;
                    </li>
                    <li>
                        Предельный максимальный тариф на услугу по капитальному ремонту жилого дома, обеспечивающий 
                        полное возмещение экономически обоснованных затрат на ее оказание, в размере 0,6546 белорусского 
                        рубля (без налога на добавленную стоимость) за 1 квадратный метр общей площади нежилого помещения в месяц;
                    </li>
                    <li>
                        Предельный максимальный тариф на услугу по управлению общим имуществом совместного домовладения 
                        в жилых домах в размере 0,0351 белорусского рубля (без налога на добавленную стоимость) за 1 квадратный 
                        метр общей площади жилого (или нежилого) помещения в месяц.
                    </li>
                </InstructionList>

                <NoticeBox>
                    <Text style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>
                        2. Настоящее решение вступает в силу после его официального опубликования и распространяет 
                        свое действие на отношения, возникшие с 1 января 2025 г.
                    </Text>
                </NoticeBox>

                <SignatureBlock>
                    Председатель <strong>И.И.Крупко</strong>
                </SignatureBlock>
            </ContentSection>

            <div>
                <TableTitle>Приложение 1 к решению Гомельского областного исполнительного комитета 03.02.2025 № 72</TableTitle>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '20px', textAlign: 'center', color: '#28a745' }}>
                    ФИКСИРОВАННЫЕ ТАРИФЫ<br/>
                    на жилищно-коммунальные услуги, предоставляемые населению
                </H2>
                <Table 
                    columns={[
                        { header: "№ п/п", key: "number" },
                        { header: "Наименование жилищно-коммунальной услуги", key: "service" },
                        { header: "Единица измерения", key: "unit" },
                        { header: "Фиксированный тариф (субсидируемый государством), BYN", key: "subsidized" },
                        { header: "Фиксированный тариф (полное возмещение затрат), BYN", key: "fullCost" }
                    ]}
                    data={fixedTariffs}
                />
            </div>

            <div>
                <TableTitle>Приложение 2 к решению Гомельского областного исполнительного комитета 03.02.2025 № 72</TableTitle>
                <H2 style={{ fontSize: '1.3rem', marginBottom: '20px', textAlign: 'center', color: '#28a745' }}>
                    ПРЕДЕЛЬНЫЕ МАКСИМАЛЬНЫЕ ТАРИФЫ<br/>
                    на жилищно-коммунальные услуги, предоставляемые населению
                </H2>
                <Table 
                    columns={[
                        { header: "№ п/п", key: "number" },
                        { header: "Наименование жилищно-коммунальной услуги", key: "service" },
                        { header: "Единица измерения", key: "unit" },
                        { header: "Предельный максимальный тариф (субсидируемый государством), BYN", key: "subsidized" },
                        { header: "Предельный максимальный тариф (полное возмещение затрат), BYN", key: "fullCost" }
                    ]}
                    data={maxTariffs}
                />
            </div>
        </TariffsContainer>
    );
};

export default Tariffs;