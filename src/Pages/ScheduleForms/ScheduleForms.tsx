import { useEffect, useState } from "react";
import H1 from "../../Components/H1/H1";
import { GetData } from "../../functions";
import Loading from "../../Components/Loading/Loading";
import { 
    ScheduleContainer,
    TableContainer,
    ScheduleTable,
    TableHeader,
    TableRow,
    TableCell,
    NoticeText,
    LinksContainer,
    SectionTitle,
    ScheduleLinkCard,
    ScheduleLinkIcon,
    ScheduleLinkContent,
    ScheduleLinkTitle,
    ScheduleLinkDesc,
    ScheduleLinkArrow
} from "./styled";
import { Phone, Building2, ExternalLink as ExternalLinkIcon } from "lucide-react";
import ExternalLink from "../../Components/ExternalLink/ExternalLink";


interface Contact {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    job_title: string;
    email: string;
    src: string;
}

const ScheduleForms = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const contactsData = await GetData('contacts');
            // Фильтруем директора и заместителя директора
            const filteredContacts = contactsData.filter((contact: Contact) => 
                contact.job_title === 'Директор' || contact.job_title === 'Заместитель директора'
            );
            setContacts(filteredContacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFullName = (contact: Contact) => {
        return `${contact.surname} ${contact.name} ${contact.patronymic}`;
    };

    const getReplacementName = (position: string) => {
        if (position === 'Директор') {
            const replacement = contacts.find(c => c.job_title === 'Заместитель директора');
            return replacement ? getFullName(replacement) : '';
        }
        return '';
    };

    return (
        <ScheduleContainer>
            <H1>График приема</H1>
            
            {loading ? (
                <Loading />
            ) : (
                <>
                    <SectionTitle>
                        График личных приемов граждан, их представителей, представителей юридических лиц 
                        руководством и специалистами КЖУП "Буда-Кошелевский коммунальник" на 2026 год
                    </SectionTitle>

                    <TableContainer>
                        <ScheduleTable>
                            <thead>
                                <tr>
                                    <TableHeader>Ф.И.О.</TableHeader>
                                    <TableHeader>Должность</TableHeader>
                                    <TableHeader>Время личного приема</TableHeader>
                                    <TableHeader>Время проведения «прямых телефонных линий», тел.</TableHeader>
                                    <TableHeader>Замещение на время отсутствия</TableHeader>
                                </tr>
                            </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>{getFullName(contact)}</TableCell>
                                    <TableCell>{contact.job_title}</TableCell>
                                    <TableCell>
                                        {contact.job_title === 'Директор' 
                                            ? '1, 3 среда каждого месяца с 08:00 до 13:00'
                                            : '1, 3 вторник каждого месяца с 08:00 до 13:00'
                                        }
                                    </TableCell>
                                    <TableCell><Phone style={{color: 'rgb(40, 167, 69)', height: '1rem'}} />+375 2336 7-45-03 с 09:00 до 10:00</TableCell>
                                    <TableCell>{getReplacementName(contact.job_title)}</TableCell>
                                </TableRow>
                            ))}
                            </tbody>
                        </ScheduleTable>
                    </TableContainer>

                    <NoticeText>
                        В случае служебной необходимости прием граждан проводится начальниками отделов по компетенции поступающих вопросов.
                        Прием к директору и заместителю директора осуществляется в порядке очереди и по предварительной записи по тел. 8-02336-7-45-03
                    </NoticeText>

                    
                    <ScheduleLinkCard 
                        href="https://buda-koshelevo.gov.by/ru/grafiki_priema/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <ScheduleLinkIcon>
                            <Building2 size={28} />
                        </ScheduleLinkIcon>
                        <ScheduleLinkContent>
                            <ScheduleLinkTitle>
                                Буда-Кошелевский районный исполнительный комитет
                            </ScheduleLinkTitle>
                            <ScheduleLinkDesc>
                                График личного приема граждан, их представителей, представителей юридических лиц
                            </ScheduleLinkDesc>
                        </ScheduleLinkContent>
                        <ScheduleLinkArrow>
                            <ExternalLinkIcon size={20} />
                        </ScheduleLinkArrow>
                    </ScheduleLinkCard>

                    <ScheduleLinkCard 
                        href="https://ugkh.gomel.by/wp-content/uploads/2025/09/grafik-lichnogo-priema-grazhdan-i-yur.-licz-provedenie-pryamoj-tel.-linii-1.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <ScheduleLinkIcon color="#dc3545">
                            <Building2 size={28} />
                        </ScheduleLinkIcon>
                        <ScheduleLinkContent>
                            <ScheduleLinkTitle>
                                ГО «ЖКХ Гомельской области»
                            </ScheduleLinkTitle>
                            <ScheduleLinkDesc>
                                График личного приема граждан и юридических лиц, проведения «прямых линий» 
                                генеральным директором, заместителями генерального директора
                            </ScheduleLinkDesc>
                        </ScheduleLinkContent>
                        <ScheduleLinkArrow>
                            <ExternalLinkIcon size={20} />
                        </ScheduleLinkArrow>
                    </ScheduleLinkCard>

                    <ScheduleLinkCard 
                        href="https://www.mjkx.gov.by/odno-okno" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <ScheduleLinkIcon color="#0d6efd">
                            <Building2 size={28} />
                        </ScheduleLinkIcon>
                        <ScheduleLinkContent>
                            <ScheduleLinkTitle>
                                Министерство жилищно-коммунального хозяйства Республики Беларусь
                            </ScheduleLinkTitle>
                            <ScheduleLinkDesc>
                                График личного приема граждан и юридических лиц Министром, заместителями Министра
                            </ScheduleLinkDesc>
                        </ScheduleLinkContent>
                        <ScheduleLinkArrow>
                            <ExternalLinkIcon size={20} />
                        </ScheduleLinkArrow>
                    </ScheduleLinkCard>

                    <LinksContainer>
                        <ExternalLink 
                            href="https://siap.gomel-region.gov.by/ochered/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Информация об очередности граждан, нуждающихся в улучшении жилищных условий, 
                            в городах, районах Гомельской области и районных администрациях г.Гомеля
                        </ExternalLink>
                    </LinksContainer>
                </>
            )}
        </ScheduleContainer>
    );
};

export default ScheduleForms;