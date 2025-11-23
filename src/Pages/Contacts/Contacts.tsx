import { useState, useEffect } from 'react'
import Block from "../../Components/Block/Block"
import Contact from "./Contact/Contact"
import Button from "../../Components/Button/Button"
import { Contacts_ } from "./styled"

interface ContactData {
    id: number;
    src?: string;
    name: string;
    surname: string;
    patronymic?: string;
    job_title?: string;
    phone?: string;
    email?: string;
}

const Contacts = () => {
    const [contacts, setContacts] = useState<ContactData[]>([]);
    const [primaryContacts, setPrimaryContacts] = useState<ContactData[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        job_title: '',
        phone: '',
        email: '',
        src: ''
    });

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('http://localhost:3001/contacts')
            .then(res => res.json())
            .then(data => {
                setContacts(data.contacts.filter((x: ContactData) => ['Директор', 'Заместитель директора'].includes(x.job_title || '')));
                setPrimaryContacts(data.contacts.filter((x: ContactData) => !['Директор', 'Заместитель директора'].includes(x.job_title || '')));
            })
            .catch(err => console.error('Error fetching contacts:', err));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addContact = () => {
        fetch('http://localhost:3001/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(() => {
                fetchContacts();
                setFormData({
                    name: '',
                    surname: '',
                    patronymic: '',
                    job_title: '',
                    phone: '',
                    email: '',
                    src: ''
                });
            })
            .catch(err => console.error('Error adding contact:', err));
    };

    return (
        <Contacts_>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Имя" />
                <input name="surname" value={formData.surname} onChange={handleChange} placeholder="Фамилия" />
                <input name="patronymic" value={formData.patronymic} onChange={handleChange} placeholder="Отчество" />
                <input name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Должность" />
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <Button onClick={addContact}>Добавить контакт</Button>
            {contacts && contacts.length > 0 && (
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center' }}>
                    {contacts.map(contact => (
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
                            phone={contact.phone}
                        />
                    ))}
                </Block>
            )}
            {primaryContacts && primaryContacts.length > 0 && (
                <Block style={{ gap: 30, alignItems: 'stretch', justifyContent: 'center' }}>
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
                            phone={contact.phone}
                        />
                    ))}
                </Block>
            )}
        </Contacts_>
    )
}

export default Contacts
