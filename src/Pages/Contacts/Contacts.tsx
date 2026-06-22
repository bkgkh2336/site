import { useState, useEffect } from 'react'
import Block from "../../Components/Block/Block"
import Contact from "./Contact/Contact"
import Text from "../../Components/Text/Text"
import { Contacts_, ContentWrapper } from "./styled"
import Department from './Department/Department'
import Map from './Map/Map'
import Loading from '../../Components/Loading/Loading'
import { GetData } from '../../functions'

interface ContactData {
    id: number;
    src?: string;
    name: string;
    surname: string;
    patronymic?: string;
    job_title?: string;
    phone?: string[];
    email?: string;
}

interface PhoneData {
    id: number;
    contact_id: number;
    phone: string;
}

interface DepartmentData {
    id: number;
    name: string;
    email?: string;
    src?: string;
}

interface PhoneDepartmentData {
    id: number;
    id_department: number;
    phone: string;
    is_fax: boolean;
}

const Contacts = () => {
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const [primaryContacts, setPrimaryContacts] = useState<ContactData[]>([]);
    const [phones_contacts, setPhones_contacts] = useState<PhoneData[]>([]);
    const [departments, setDepartments] = useState<DepartmentData[]>([]);
    const [phone_department, setPhone_department] = useState<PhoneDepartmentData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchContacts(),
                fetchPhones(),
                fetchDepartments(),
                fetchPhone_department()
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    
    fetchData();
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await GetData('contacts');
            const primaryTitles = ['Директор', 'Первый заместитель директора - Главный инженер', 'Заместитель директора'];
            
            // Фильтруем и сортируем руководящий состав в правильном порядке
            const filteredPrimary = data.filter((x: ContactData) => primaryTitles.includes(x.job_title || ''));
            const sortedPrimary = filteredPrimary.sort((a : ContactData, b: ContactData) => {
                const orderMap: { [key: string]: number } = {
                    'Директор': 1,
                    'Первый заместитель директора - Главный инженер': 2,
                    'Заместитель директора': 3
                };
                return (orderMap[a.job_title || ''] || 999) - (orderMap[b.job_title || ''] || 999);
            });
            
            setPrimaryContacts(sortedPrimary);
            setContacts(data.filter((x: ContactData) => !primaryTitles.includes(x.job_title || '')));
        } catch {
            // Ошибка обрабатывается gracefully
        }
    };

    const fetchPhones = async () => {
        try {
            const data = await GetData('phone_contacts');
            setPhones_contacts(data);
        } catch {
            // Ошибка обрабатывается gracefully
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await GetData('departments');
            setDepartments(data);
        } catch {
            // Ошибка обрабатывается gracefully
        }
    };

    const fetchPhone_department = async () => {
        try {
            const data = await GetData('phone_departments');
            setPhone_department(data);
        } catch {
            // Ошибка обрабатывается gracefully
        }
    };

    return (
        <Contacts_>
            {loading && <Loading />}
            
            {!loading && (
                <ContentWrapper>
                    <Text bold='bolder' style={{ color: "rgb(40, 167, 69)", fontSize: 24 }}>Руководящий состав</Text>
            {primaryContacts && primaryContacts.length > 0 && (
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
                    {primaryContacts.map(contact => (
                        <Contact
                            key={contact.id}
                            src={contact.src}
                            name={{
                                name: contact.name,
                                surname: contact.surname,
                                patronymic: contact.patronymic
                            }}
                            job_title={contact.job_title || ''}
                            email={contact.email}
                            phone={phones_contacts.filter((x: PhoneData) => x.contact_id === contact.id).map(x => x.phone)}
                        />
                    ))}
                </Block>
            )}
            <Block style={{ height: 1, padding: 0, width: '90%', backgroundColor: 'rgb(40, 167, 69)' }} />
            {contacts && contacts.length > 0 && (
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
                    {contacts.sort((a) => a.name ? -1 : 1).map(contact => (
                        <Contact
                            key={contact.id}
                            src={contact.src}
                            name={{
                                name: contact.name,
                                surname: contact.surname,
                                patronymic: contact.patronymic
                            }}
                            job_title={contact.job_title || ''}
                            email={contact.email}
                            phone={phones_contacts.filter((x: PhoneData) => x.contact_id === contact.id).map(x => x.phone)}
                        />
                    ))}
                </Block>
            )}
            <Block style={{ height: 2, padding: 0, width: '90%', backgroundColor: 'rgb(40, 167, 69)' }} />
            <Text bold='bolder' style={{ color: "rgb(40, 167, 69)", fontSize: 24 }}>Отделы</Text>
            <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
                {departments.map((x, i) =>
                    <Department
                        key={i}
                        name={x.name}
                        email={x.email}
                        src={x.src}
                        phone={phone_department.filter((y: PhoneDepartmentData) => y.id_department === x.id && !Number(y.is_fax)).map(x => x.phone)}
                        fax={phone_department.filter((y: PhoneDepartmentData) => y.id_department === x.id && Number(y.is_fax)).map(x => x.phone)}
                    />
                )}
            </Block>
            <Block style={{ height: 1.5, padding: 0, width: '90%', backgroundColor: 'rgb(40, 167, 69)' }} />
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 20, 
                marginTop: 5, 
                width: "90%", 
                alignItems: 'center' 
            }}>
                <Text 
                    bold='bolder' 
                    style={{ 
                        fontSize: "1.4rem", 
                        color: "rgb(40, 167, 69)",
                        textAlign: 'center'
                    }}
                >
                    Мы находимся по адресу: г. Буда-Кошелёво, ул. Озёрная 3а
                </Text>
                <Map />
            </div>
                </ContentWrapper>
            )}
        </Contacts_>
    )
}

export default Contacts
