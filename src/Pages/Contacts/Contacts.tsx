import { useState, useEffect } from 'react'
import Block from "../../Components/Block/Block"
import Contact from "./Contact/Contact"
import Text from "../../Components/Text/Text"
import { Contacts_ } from "./styled"
import Department from './Department/Department'
import Map from './Map/Map'

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

    useEffect(() => {
        fetchContacts();
        fetchPhones();
        fetchDepartments();
        fetchPhone_department();
    }, []);

    const fetchContacts = () => {
        fetch('http://localhost:3001/contacts')
            .then(res => res.json())
            .then(data => {
                setContacts(data.filter((x: ContactData) => !['Директор', 'Главный инженер'].includes(x.job_title || '')));
                setPrimaryContacts(data.filter((x: ContactData) => ['Директор', 'Главный инженер'].includes(x.job_title || '')));
            })
            .catch(err => console.error('Error fetching contacts:', err));
    };

    const fetchPhones = () => {
        fetch('http://localhost:3001/phone_contacts')
            .then(res => res.json())
            .then(data => {
                setPhones_contacts(data);
            })
            .catch(err => console.error('Error fetching phones:', err));
    };

    const fetchDepartments = () => {
        fetch('http://localhost:3001/departments')
            .then(res => res.json())
            .then(data => {
                setDepartments(data);
            })
            .catch(err => console.error('Error fetching departments:', err));
    };

    const fetchPhone_department = () => {
        fetch('http://localhost:3001/phone_departments')
            .then(res => res.json())
            .then(data => {
                setPhone_department(data);
            })
            .catch(err => console.error('Error fetching phone_departments:', err));
    };

    return (
        <Contacts_>
            <Text bold='bolder' style={{ color: "rgb(40, 167, 69)", fontSize: 24 }}>Руководящий состав</Text>
            {primaryContacts && primaryContacts.length > 0 && (
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center', width: '99%' }}>
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
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center' }}>
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
            <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center' }}>
                {departments.map((x, i) =>
                    <Department
                        key={i}
                        name={x.name}
                        email={x.email}
                        src={x.src}
                        phone={phone_department.filter((y: PhoneDepartmentData) => y.id_department === x.id && !y.is_fax).map(x => x.phone)}
                        fax={phone_department.filter((y: PhoneDepartmentData) => y.id_department === x.id && y.is_fax).map(x => x.phone)}
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
        </Contacts_>
    )
}

export default Contacts
