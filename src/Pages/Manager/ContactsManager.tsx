import React, { useState, useEffect } from 'react';
import { Pencil, Plus, X, Crown, Users, Building2, Trash2, User } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import ViewToggle from '../../Components/ViewToggle/ViewToggle';
import ContactEditForm from './EditForms/ContactEditForm';
import DepartmentEditForm from './EditForms/DepartmentEditForm';
import { ResolveDepartmentImage } from '../../functions';
import {
  Card, SectionHeader, SectionTitle, ActionButton,
  Table, Th, Td, Tr, IconButton,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton,
  ToolbarRow, BoardView, CategoryPanel, CategoryPanelHeader,
  CategoryItem, CategoryName, CategoryCount,
  BoardMain, DocCard, DocCardIcon, DocCardInfo, DocCardName, DocCardMeta,
  DocCardActions, EmptyPanel, AvatarImg
} from './ui';

type BoardSection = 'primary' | 'staff' | 'departments';

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
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [section, setSection] = useState<BoardSection>('primary');

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
    formData.append('type', 'contacts');
    
    try {
      const response = await fetch('/backend/api.php/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.path) {
          setEditingContact({ ...editingContact, src: data.path });
        } else {
          alert(`Ошибка загрузки: ${data.message || 'неизвестная ошибка'}`);
        }
      } else {
        const errorText = await response.text();
        alert(`Ошибка загрузки: ${errorText}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Ошибка при загрузке изображения');
    }
  };

  const cleanupTempImage = async () => {
    try {
      await fetch('/backend/api.php/api/cleanup', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Failed to cleanup temp image:', err);
    }
  };

  const validateContact = (): string | null => {
    if (!editingContact) return 'Контакт не выбран';
    
    if (editingContact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingContact.email)) {
      return 'Некорректный email';
    }
    
    const invalidPhone = editingPhones.find(p => p.trim() && !/^[\d\s\-+()]{5,20}$/.test(p.trim()));
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
            src: editingContact.src ?? '',
            is_primary: editingContact.is_primary
          })
        }
      );
      
      if (!response.ok) {        
        const responseText = await response.text();
        if (response.status === 401) {
          alert('Сессия истекла. Пожалуйста, войдите снова.');
          window.location.href = '/manager';
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
    if (editingContact?.src) {
      const originalContact = contacts.find(c => c.id === editingContact.id);
      if (!originalContact || originalContact.src !== editingContact.src) {
        cleanupTempImage();
      }
    }
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

  const handleAddForSection = () => {
    if (section === 'departments') {
      setEditingDepartment({ id: 0, name: '', description: '', head: '', email: '', src: '' });
      setEditingDeptPhones([]);
    } else {
      setEditingContact({
        id: 0,
        name: '',
        surname: '',
        patronymic: '',
        job_title: '',
        email: '',
        src: '',
        is_primary: section === 'primary'
      });
      setEditingPhones([]);
    }
  };

  const handleQuickDeleteContact = async (contact: ContactData) => {
    const fullName = `${contact.surname} ${contact.name}`.trim();
    if (!window.confirm(`Удалить сотрудника «${fullName}»?`)) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/contacts/${contact.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setContacts(prev => prev.filter(c => c.id !== contact.id));
        setPrimaryContacts(prev => prev.filter(c => c.id !== contact.id));
        setEditingContact(null);
      }
    } catch (err) {
      console.error('Delete contact error:', err);
      alert('Ошибка при удалении сотрудника');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuickDeleteDepartment = async (department: DepartmentData) => {
    if (!window.confirm(`Удалить отдел «${department.name}»?`)) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/departments/${department.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setDepartments(prev => prev.filter(d => d.id !== department.id));
        setEditingDepartment(null);
      }
    } catch (err) {
      console.error('Delete department error:', err);
      alert('Ошибка при удалении отдела');
    } finally {
      setIsDeleting(false);
    }
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
    formData.append('type', 'departments');
    
    try {
      const response = await fetch('/backend/api.php/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.path) {
          setEditingDepartment({ ...editingDepartment, src: data.path });
        } else {
          alert(`Ошибка загрузки: ${data.message || 'неизвестная ошибка'}`);
        }
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
            src: editingDepartment.src ?? ''
          })
        }
      );
      
      if (!response.ok) {
        const responseText = await response.text();
        if (response.status === 401) {
          alert('Сессия истекла. Пожалуйста, войдите снова.');
          window.location.href = '/manager';
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
    if (editingDepartment?.src) {
      const originalDept = departments.find(d => d.id === editingDepartment.id);
      if (!originalDept || originalDept.src !== editingDepartment.src) {
        await cleanupTempImage();
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

  const sectionItems: { key: BoardSection; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'primary', label: 'Руководство', icon: <Crown />, count: primaryContacts.length },
    { key: 'staff', label: 'Сотрудники', icon: <Users />, count: contacts.length },
    { key: 'departments', label: 'Отделы', icon: <Building2 />, count: departments.length },
  ];
  const activeItem = sectionItems.find(s => s.key === section) || sectionItems[0];
  const sectionContacts = section === 'primary' ? primaryContacts : contacts;

  return (
    <>
      <ToolbarRow>
        <ViewToggle view={view} onViewChange={setView} />
      </ToolbarRow>

      {view === 'cards' ? (
        <BoardView>
          <CategoryPanel>
            <CategoryPanelHeader>
              Разделы
              <IconButton
                onClick={handleAddForSection}
                aria-label={section === 'departments' ? 'Добавить отдел' : 'Добавить сотрудника'}
              >
                <Plus />
              </IconButton>
            </CategoryPanelHeader>

            {sectionItems.map(item => {
              const active = section === item.key;
              return (
                <CategoryItem
                  key={item.key}
                  $active={active}
                  onClick={() => setSection(item.key)}
                >
                  {item.icon}
                  <CategoryName>{item.label}</CategoryName>
                  <CategoryCount $active={active}>{item.count}</CategoryCount>
                </CategoryItem>
              );
            })}
          </CategoryPanel>

          <BoardMain>
            <SectionHeader>
              <SectionTitle>
                {activeItem.icon}
                {activeItem.label}
              </SectionTitle>
              <ActionButton onClick={handleAddForSection}>
                <Plus /> {section === 'departments' ? 'Добавить отдел' : 'Добавить сотрудника'}
              </ActionButton>
            </SectionHeader>

            {section === 'departments' ? (
              <>
                {departments.length === 0 && (
                  <EmptyPanel>Нет отделов. Добавьте первый.</EmptyPanel>
                )}
                {departments.map(department => (
                  <DocCard key={department.id}>
                    {department.src ? (
                      <AvatarImg
                        src={ResolveDepartmentImage(department.src)}
                        alt=""
                        style={{ borderRadius: 10 }}
                      />
                    ) : (
                      <DocCardIcon>
                        <Building2 />
                      </DocCardIcon>
                    )}
                    <DocCardInfo>
                      <DocCardName>{department.name}</DocCardName>
                      <DocCardMeta>
                        {department.head || 'Руководитель не указан'}
                        {phoneDepartments.filter(p => p.id_department === department.id).map(p => p.phone).length > 0 &&
                          ` · ${phoneDepartments.filter(p => p.id_department === department.id).map(p => p.phone).join(', ')}`}
                      </DocCardMeta>
                      {department.email && <DocCardMeta>{department.email}</DocCardMeta>}
                    </DocCardInfo>
                    <DocCardActions>
                      <IconButton
                        $tone="gray"
                        onClick={() => handleEditDepartment(department)}
                        title="Редактировать"
                        aria-label="Редактировать"
                      >
                        <Pencil />
                      </IconButton>
                      <IconButton
                        $tone="red"
                        onClick={() => handleQuickDeleteDepartment(department)}
                        title="Удалить"
                        aria-label="Удалить"
                        disabled={isDeleting}
                      >
                        <Trash2 />
                      </IconButton>
                    </DocCardActions>
                  </DocCard>
                ))}
              </>
            ) : (
              <>
                {sectionContacts.length === 0 && (
                  <EmptyPanel>
                    {section === 'primary'
                      ? 'Нет сотрудников в руководстве. Добавьте первого.'
                      : 'Нет сотрудников. Добавьте первого.'}
                  </EmptyPanel>
                )}
                {sectionContacts.map(contact => {
                  const contactPhones = phones
                    .filter(p => p.contact_id === contact.id)
                    .map(p => p.phone);
                  return (
                    <DocCard key={contact.id}>
                      {contact.src ? (
                        <AvatarImg src={contact.src} alt="" />
                      ) : (
                        <DocCardIcon>
                          <User />
                        </DocCardIcon>
                      )}
                      <DocCardInfo>
                        <DocCardName>
                          {contact.surname} {contact.name} {contact.patronymic || ''}
                        </DocCardName>
                        <DocCardMeta>
                          {contact.job_title || 'Сотрудник'}
                          {contactPhones.length > 0 ? ` · ${contactPhones.join(', ')}` : ''}
                        </DocCardMeta>
                        {contact.email && <DocCardMeta>{contact.email}</DocCardMeta>}
                      </DocCardInfo>
                      <DocCardActions>
                        <IconButton
                          $tone="gray"
                          onClick={() => handleEditContact(contact)}
                          title="Редактировать"
                          aria-label="Редактировать"
                        >
                          <Pencil />
                        </IconButton>
                        <IconButton
                          $tone="red"
                          onClick={() => handleQuickDeleteContact(contact)}
                          title="Удалить"
                          aria-label="Удалить"
                          disabled={isDeleting}
                        >
                          <Trash2 />
                        </IconButton>
                      </DocCardActions>
                    </DocCard>
                  );
                })}
              </>
            )}
          </BoardMain>
        </BoardView>
      ) : (
        <>
          <Card>
            <SectionHeader>
              <SectionTitle>Сотрудники</SectionTitle>
              <ActionButton onClick={handleAddContact}>
                <Plus /> Добавить сотрудника
              </ActionButton>
            </SectionHeader>

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
                      <IconButton onClick={() => handleEditContact(contact)} aria-label="Редактировать">
                        <Pencil />
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card>
            <SectionHeader>
              <SectionTitle>Отделы</SectionTitle>
              <ActionButton
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
                <Plus /> Добавить отдел
              </ActionButton>
            </SectionHeader>

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
                      <IconButton onClick={() => handleEditDepartment(department)} aria-label="Редактировать">
                        <Pencil />
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </>
      )}

      {editingContact && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelEdit()}>
          <ModalContent>
            <ModalHeader>
              {editingContact.id ? 'Редактирование сотрудника' : 'Новый сотрудник'}
              <CloseButton onClick={handleCancelEdit} aria-label="Закрыть">
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {editingDepartment && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelDeptEdit()}>
          <ModalContent>
            <ModalHeader>
              {editingDepartment.id ? 'Редактирование отдела' : 'Новый отдел'}
              <CloseButton onClick={handleCancelDeptEdit} aria-label="Закрыть">
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
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
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ContactsManager;