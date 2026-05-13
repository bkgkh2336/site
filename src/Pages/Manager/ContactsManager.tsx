import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pencil, Plus, X } from 'lucide-react';
import Block from '../../Components/Block/Block';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import Button from '../../Components/Button/Button';
import ContactEditForm from './EditForms/ContactEditForm';
import DepartmentEditForm from './EditForms/DepartmentEditForm';

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6c757d;
  
  &:hover {
    color: #000;
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
  description?: string;
  head?: string;
  email?: string;
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
  
  const [editingContact, setEditingContact] = useState<ContactData | null>(null);
  const [editingPhones, setEditingPhones] = useState<string[]>([]);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentData | null>(null);
  const [editingDeptPhones, setEditingDeptPhones] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const [contactsRes, phonesRes, departmentsRes, phoneDepRes] = await Promise.all([
          fetch('/backend/api.php/api/contacts', {
            credentials: 'include'
          }),
          fetch('/backend/api.php/api/phone_contacts', {
            credentials: 'include'
          }),
          fetch('/backend/api.php/api/departments', {
            credentials: 'include'
          }),
          fetch('/backend/api.php/api/phone_departments', {
            credentials: 'include'
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

  const handleEditContact = (contact: ContactData) => {
    setEditingContact({ ...contact });
    setEditingPhones(phones.filter(p => p.contact_id === contact.id).map(p => p.phone));
  };

  const handleContactChange = (updatedContact: ContactData) => {
    setEditingContact(updatedContact);
  };

  const handlePhoneChange = (index: number, value: string) => {
    setEditingPhones(prev => prev.map((phone, i) => i === index ? value : phone));
  };

  const handleAddPhone = () => {
    setEditingPhones(prev => [...prev, '']);
  };

  const handleRemovePhone = (index: number) => {
    setEditingPhones(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (file: File) => {
    if (!editingContact) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Допустимые форматы: JPEG, PNG, GIF, WebP');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5 МБ');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('/backend/api.php/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setEditingContact({ ...editingContact, src: data.url });
      } else {
        const errorText = await response.text();
        alert(`Ошибка загрузки: ${errorText}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Ошибка при загрузке изображения');
    }
  };

  const validateContact = (): string | null => {
    if (!editingContact) return 'Контакт не выбран';
    
    if (editingContact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingContact.email)) {
      return 'Некорректный email';
    }
    
    const invalidPhone = editingPhones.find(p => p.trim() && !/^[\d\s\-\+\(\)]{5,20}$/.test(p.trim()));
    if (invalidPhone) return 'Некорректный номер телефона';
    
    return null;
  };

  const handleSaveContact = async () => {
    if (!editingContact) return;
    
    // Validate before saving
    const validationError = validateContact();
    if (validationError) {
      alert(validationError);
      return;
    }
    
    setIsSaving(true);
    try {
      const isNew = !editingContact.id || editingContact.id === 0;
      
      const response = await fetch(
        isNew 
          ? '/backend/api.php/api/contacts'
          : `/backend/api.php/api/contacts/${editingContact.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            surname: editingContact.surname,
            name: editingContact.name,
            patronymic: editingContact.patronymic,
            job_title: editingContact.job_title,
            email: editingContact.email,
            src: editingContact.src,
            is_primary: editingContact.is_primary
          })
        }
      );
      
      if (!response.ok) {        
        const responseText = await response.text();
        if (response.status === 401) {
          alert('Сессия истекла. Пожалуйста, войдите снова.');
          window.location.href = '/admin/login';
          return;
        } else {
          alert(`Ошибка сохранения: ${response.status} ${responseText}`);
          setIsSaving(false);
          return;
        }
      }
      
      const responseData = await response.json();
      const savedId = isNew ? responseData.id : editingContact.id;
      const savedContact = isNew ? { ...editingContact, id: savedId } : editingContact;
      
      if (isNew) {
        // Add phones for new contact
        const validPhones = editingPhones.filter(phone => phone.trim() !== '');
        if (validPhones.length > 0) {
          await Promise.all(
            validPhones.map(phone =>
              fetch('/backend/api.php/api/phone_contacts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                  contact_id: savedId,
                  phone: phone
                })
              })
            )
          );
        }
        
        // Add to appropriate state based on is_primary
        if (savedContact.is_primary) {
          setPrimaryContacts(prev => [...prev, savedContact]);
        } else {
          setContacts(prev => [...prev, savedContact]);
        }
      } else {
        // Update phones - first delete existing ones
        const existingPhoneIds = phones
          .filter(p => p.contact_id === editingContact.id)
          .map(p => p.id);
        
        await Promise.allSettled(
          existingPhoneIds.map(id =>
            fetch(`/backend/api.php/api/phone_contacts/${id}`, {
              method: 'DELETE',
              credentials: 'include'
            })
          )
        );
        
        // Add new phones
        const validPhones = editingPhones.filter(phone => phone.trim() !== '');
        if (validPhones.length > 0) {
          await Promise.all(
            validPhones.map(phone =>
              fetch('/backend/api.php/api/phone_contacts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                  contact_id: editingContact.id,
                  phone: phone
                })
              })
            )
          );
        }
        
        // Update contacts state
        setContacts(prev => prev.map(c => c.id === editingContact.id ? editingContact : c));
        setPrimaryContacts(prev => prev.map(c => c.id === editingContact.id ? editingContact : c));
      }
      
      // Refresh phones data
      const phonesRes = await fetch('/backend/api.php/api/phone_contacts', {
        credentials: 'include'
      });
      const updatedPhones = await phonesRes.json();
      setPhones(updatedPhones || []);
      
      setEditingContact(null);
      setEditingPhones([]);
    } catch (err) {
      console.error('Save error:', err);
      alert('Ошибка при сохранении контакта');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContact = async () => {
    if (!editingContact) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/contacts/${editingContact.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setContacts(prev => prev.filter(c => c.id !== editingContact.id));
        setPrimaryContacts(prev => prev.filter(c => c.id !== editingContact.id));
        setEditingContact(null);
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setEditingPhones([]);
  };

  const handleAddContact = () => {
    setEditingContact({
      id: 0,
      name: '',
      surname: '',
      patronymic: '',
      job_title: '',
      email: '',
      src: '',
      is_primary: false
    });
    setEditingPhones([]);
  };

  const handleEditDepartment = (department: DepartmentData) => {
    setEditingDepartment({ ...department });
    setEditingDeptPhones(phoneDepartments.filter(p => p.id_department === department.id).map(p => p.phone));
  };

  const handleDepartmentChange = (updatedDepartment: DepartmentData) => {
    setEditingDepartment(updatedDepartment);
  };

  const handleDeptPhoneChange = (index: number, value: string) => {
    setEditingDeptPhones(prev => prev.map((phone, i) => i === index ? value : phone));
  };

  const handleAddDeptPhone = () => {
    setEditingDeptPhones(prev => [...prev, '']);
  };

  const handleRemoveDeptPhone = (index: number) => {
    setEditingDeptPhones(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUploadDepartment = async (file: File) => {
    if (!editingDepartment) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Допустимые форматы: JPEG, PNG, GIF, WebP');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5 МБ');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('/backend/api.php/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        setEditingDepartment({ ...editingDepartment, src: data.path });
      } else {
        const errorText = await response.text();
        alert(`Ошибка загрузки: ${errorText}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Ошибка при загрузке изображения');
    }
  };

  const handleSaveDepartment = async () => {
    if (!editingDepartment) return;
    
    setIsSaving(true);
    try {
      const isNew = !editingDepartment.id || editingDepartment.id === 0;
      
      const response = await fetch(
        isNew 
          ? '/backend/api.php/api/departments'
          : `/backend/api.php/api/departments/${editingDepartment.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: editingDepartment.name,
            description: editingDepartment.description,
            head: editingDepartment.head,
            email: editingDepartment.email,
            src: editingDepartment.src
          })
        }
      );
      
      if (!response.ok) {
        const responseText = await response.text();
        if (response.status === 401) {
          alert('Сессия истекла. Пожалуйста, войдите снова.');
          window.location.href = '/admin/login';
          return;
        } else {
          alert(`Ошибка сохранения: ${response.status} ${responseText}`);
          setIsSaving(false);
          return;
        }
      }
      
      const responseData = await response.json();
      const savedId = isNew ? responseData.id : editingDepartment.id;
      
      if (isNew) {
        // For new department, add to state with new id
        const newDept = { ...editingDepartment, id: savedId };
        
        // Add phones for new department
        const validPhones = editingDeptPhones.filter(phone => phone.trim() !== '');
        if (validPhones.length > 0) {
          await Promise.all(
            validPhones.map(phone =>
              fetch('/backend/api.php/api/phone_departments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                  id_department: savedId,
                  phone: phone,
                  is_fax: false
                })
              })
            )
          );
        }
        
        setDepartments(prev => [...prev, newDept]);
      } else {
        // Update phones - delete old ones first
        const existingPhoneIds = phoneDepartments
          .filter(p => p.id_department === editingDepartment.id)
          .map(p => p.id);
        
        await Promise.allSettled(
          existingPhoneIds.map(id =>
            fetch(`/backend/api.php/api/phone_departments/${id}`, {
              method: 'DELETE',
              credentials: 'include'
            })
          )
        );
        
        // Add new phones
        const validPhones = editingDeptPhones.filter(phone => phone.trim() !== '');
        if (validPhones.length > 0) {
          await Promise.all(
            validPhones.map(phone =>
              fetch('/backend/api.php/api/phone_departments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                  id_department: editingDepartment.id,
                  phone: phone,
                  is_fax: false
                })
              })
            )
          );
        }
        
        // Update departments state
        setDepartments(prev => prev.map(d => d.id === editingDepartment.id ? editingDepartment : d));
      }
      
      // Refresh phone departments data
      const phoneDepRes = await fetch('/backend/api.php/api/phone_departments', {
        credentials: 'include'
      });
      const updatedDeptPhones = await phoneDepRes.json();
      setPhoneDepartments(updatedDeptPhones || []);
      
      setEditingDepartment(null);
      setEditingDeptPhones([]);
    } catch (err) {
      console.error('Save department error:', err);
      alert('Ошибка при сохранении отдела');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDepartment = async () => {
    if (!editingDepartment) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/departments/${editingDepartment.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setDepartments(prev => prev.filter(d => d.id !== editingDepartment.id));
        setEditingDepartment(null);
      }
    } catch (err) {
      console.error('Delete department error:', err);
      alert('Ошибка при удалении отдела');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDeptEdit = async () => {
    // Delete uploaded image if not saved
    if (editingDepartment?.src && editingDepartment.src.startsWith('/uploads/')) {
      const originalDept = departments.find(d => d.id === editingDepartment.id);
      if (!originalDept || originalDept.src !== editingDepartment.src) {
        // Image was uploaded but not saved, try to delete it
        const filename = editingDepartment.src.split('/').pop();
        try {
          await fetch(`/backend/api.php/api/cleanup-temp`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
          });
        } catch (err) {
          console.error('Failed to cleanup temp image:', err);
        }
      }
    }
    setEditingDepartment(null);
    setEditingDeptPhones([]);
  };

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
        <Button 
          style={{ backgroundColor: '#28a745' }}
          onClick={handleAddContact}
        >
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
                <EditButton onClick={() => handleEditContact(contact)}>
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
        <Button 
          style={{ backgroundColor: '#28a745' }}
          onClick={() => {
            setEditingDepartment({ 
              id: 0, 
              name: '', 
              description: '', 
              head: '', 
              email: '', 
              src: '' 
            });
            setEditingDeptPhones([]);
          }}
        >
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
                <EditButton onClick={() => handleEditDepartment(department)}>
                  <Pencil />
                </EditButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {editingContact && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelEdit()}>
          <ModalContent>
            <CloseButton onClick={handleCancelEdit}>
              <X size={24} />
            </CloseButton>
            <ContactEditForm
              contact={editingContact}
              phones={editingPhones}
              isSaving={isSaving}
              isDeleting={isDeleting}
              onContactChange={handleContactChange}
              onPhoneChange={handlePhoneChange}
              onAddPhone={handleAddPhone}
              onRemovePhone={handleRemovePhone}
              onSave={handleSaveContact}
              onCancel={handleCancelEdit}
              onDelete={handleDeleteContact}
              onImageUpload={handleImageUpload}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {editingDepartment && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelDeptEdit()}>
          <ModalContent>
            <CloseButton onClick={handleCancelDeptEdit}>
              <X size={24} />
            </CloseButton>
            <DepartmentEditForm
              department={editingDepartment}
              phones={editingDeptPhones}
              isSaving={isSaving}
              isDeleting={isDeleting}
              onDepartmentChange={handleDepartmentChange}
              onPhoneChange={handleDeptPhoneChange}
              onAddPhone={handleAddDeptPhone}
              onRemovePhone={handleRemoveDeptPhone}
              onSave={handleSaveDepartment}
              onCancel={handleCancelDeptEdit}
              onDelete={handleDeleteDepartment}
              onImageUpload={handleImageUploadDepartment}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ContactsManager;