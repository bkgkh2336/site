import H1 from "../../../Components/H1/H1";
import H2 from "../../../Components/H2/H2";
import Table from "../../../Components/Table/Table";
import { ProceduresContainer, SectionTitle } from "./styled";


const AdministrativeProcedures = () => {
    const procedures = [
        {
            name: "3.1.10.1. теплоснабжение объекта",
            authorized: "Начальник ПТО Цыкунова А.И.\nТел: 80233670726",
            documents: "заявление\nзаявка по утвержденной форме",
            term: "7 дней",
            validity: "2 года до начала строительства, в дальнейшем – до даты приемки объекта в эксплуатацию",
            fee: "бесплатно"
        },
        {
            name: "3.1.10.2. присоединение объекта к системам водоснабжения, хозяйственно-бытовой канализации, дождевой канализации",
            authorized: "Начальник ПТО Цыкунова А.И.\nТел: 80233670726",
            documents: "заявление\nзадание на проектирование объекта\nсхема расположения объекта (ситуационный план)\nбалансовая схема водопотребления и водоотведения, качественный состав воды (стоков)",
            term: "7 дней",
            validity: "2 года до начала строительства, в дальнейшем – до даты приемки объекта в эксплуатацию",
            fee: "бесплатно"
        }
    ];

    return (
        <ProceduresContainer>
            <H1 style={{ marginBottom: '30px' }}>Административные процедуры</H1>
            
            <SectionTitle>
                Перечень административных процедур, осуществляемых уполномоченными лицами 
                КЖУП «Буда-Кошелевский коммунальник»
            </SectionTitle>

            <H2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#28a745' }}>
                3.1.10. Выдача технических условий на:
            </H2>

            <Table 
                columns={[
                    { 
                        header: "Наименование административной процедуры", 
                        key: "name"
                    },
                    { 
                        header: "Уполномоченное лицо предприятия", 
                        key: "authorized",
                        render: (value) => <div style={{ whiteSpace: 'pre-line' }}>{value}</div>
                    },
                    { 
                        header: "Перечень документов и (или) сведений, представляемых заинтересованными лицами", 
                        key: "documents",
                        render: (value) => <div style={{ whiteSpace: 'pre-line' }}>{value}</div>
                    },
                    { 
                        header: "Срок осуществления административной процедуры", 
                        key: "term"
                    },
                    { 
                        header: "Срок действия справок или других документов", 
                        key: "validity"
                    },
                    { 
                        header: "Размер платы", 
                        key: "fee"
                    }
                ]}
                data={procedures}
            />
        </ProceduresContainer>
    );
};

export default AdministrativeProcedures;