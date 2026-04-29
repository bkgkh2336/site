import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pencil, Plus } from 'lucide-react';
import Block from '../../Components/Block/Block';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import Button from '../../Components/Button/Button';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  color: #495057;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
`;

const Tr = styled.tr`
  transition: background 0.15s ease;
  
  &:hover {
    background: #f8fff9;
  }
`;

const EditButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: #218838;
    transform: scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface ContactData {
  id: number;
  src?: string;
  name: string;
  surname: string;
  patronymic?: string;
  job_title?: string;
  email?: string;
  is_primary?: boolean;
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

const ContactsManager: React.FC = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [primaryContacts, setPrimaryContacts] = useState<ContactData[]>([]);
  const [phones, setPhones] = useState<PhoneData[]>([]);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [phoneDepartments, setPhoneDepartments] = useState<PhoneDepartmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const token = localStorage.getItem('adminToken');
        
        const [contactsRes, phonesRes, departmentsRes, phoneDepRes] = await Promise.all([
          fetch('/backend/api.php/api/contacts', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/backend/api.php/api/phone_contacts', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/backend/api.php/api/departments', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('/backend/api.php/api/phone_departments', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const contacts = await contactsRes.json();
        const phones = await phonesRes.json();
        const departments = await departmentsRes.json();
        const phoneDepartments = await phoneDepRes.json();

        setContacts(contacts.filter((c: ContactData) => !c.is_primary) || []);
        setPrimaryContacts(contacts.filter((c: ContactData) => c.is_primary) || []);
        setPhones(phones || []);
        setDepartments(departments || []);
        setPhoneDepartments(phoneDepartments || []);

      } catch (err) {
        setError('Ошибка подключения к серверу');
        console.error('Contacts load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{error}</Text>;
  }

  return (
    <>
      <Block style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text bold='bolder' style={{ color: "rgb(40, 167, 69)", fontSize: 24 }}>Сотрудники</Text>
        <Button style={{ backgroundColor: '#28a745' }}>
          <Plus size={16} style={{ marginRight: 6 }} /> Добавить сотрудника
        </Button>
      </Block>

      <Table>
        <thead>
          <tr>
            <Th>Фамилия</Th>
            <Th>Имя</Th>
            <Th>Должность</Th>
            <Th>Телефоны</Th>
            <Th>Email</Th>
            <Th style={{ width: 50 }}></Th>
          </tr>
        </thead>
        <tbody>
          {[...primaryContacts, ...contacts].map(contact => (
            <Tr key={contact.id}>
              <Td>{contact.surname}</Td>
              <Td>{contact.name} {contact.patronymic || ''}</Td>
              <Td>{contact.job_title || '-'}</Td>
              <Td>{phones.filter(p => p.contact_id === contact.id).map(p => p.phone).join(', ') || '-'}</Td>
              <Td>{contact.email || '-'}</Td>
              <Td>
                <EditButton onClick={() => console.log('Edit contact:', contact)}>
                  <Pencil />
                </EditButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      <br />

      <Block style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text bold='bolder' style={{ color: "rgb(40, 167, 69)", fontSize: 24 }}>Отделы</Text>
        <Button style={{ backgroundColor: '#28a745' }}>
          <Plus size={16} style={{ marginRight: 6 }} /> Добавить отдел
        </Button>
      </Block>

      <Table>
        <thead>
          <tr>
            <Th>Название</Th>
            <Th>Телефоны</Th>
            <Th>Email</Th>
            <Th style={{ width: 50 }}></Th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <Tr key={department.id}>
              <Td>{department.name}</Td>
              <Td>{phoneDepartments.filter(p => p.id_department === department.id).map(p => p.phone).join(', ') || '-'}</Td>
              <Td>{department.email || '-'}</Td>
              <Td>
                <EditButton onClick={() => console.log('Edit department:', department)}>
                  <Pencil />
                </EditButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ContactsManager;