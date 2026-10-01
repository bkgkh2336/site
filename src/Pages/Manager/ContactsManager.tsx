import React, { useState, useEffect } from 'react';
import { Pencil, Plus, X, Crown, Users, Building2, Trash2, User } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import ContactEditForm from './EditForms/ContactEditForm';
import DepartmentEditForm from './EditForms/DepartmentEditForm';
import { ResolveDepartmentImage, SortLeadership } from '../../functions';
import { apiGet, apiPost, apiPut, apiDelete, apiUpload, ApiError, isSessionError } from './api';
import { BoardToolbar, BoardCards, CategoryList, SectionCard } from './Board';
import {
  ActionButton,
  Table, Th, Td, Tr, IconButton,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton,
  DocCard, DocCardIcon, DocCardInfo, DocCardName, DocCardMeta,
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
  email?: string;
  src?: string;
}

interface PhoneDepartmentData {
  id: number;
  id_department: number;
  phone: string;
  is_fax: boolean;
}

const ImageUploadError = (err: unknown): void => {
  if (isSessionError(err)) return;
  console.error('Upload error:', err);
  alert(`Ошибка загрузки: ${err instanceof Error ? err.message : err}`);
};

const saveErrorAlert = (err: unknown, fallback: string): void => {
  if (isSessionError(err)) return;
  console.error('Save error:', err);
  alert(err instanceof ApiError && err.status !== 401
    ? `Ошибка сохранения: ${err.status} ${err.message}`
    : fallback);
};

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
        const [contactsData, phonesData, departmentsData, phoneDepData] = await Promise.all([
          apiGet<ContactData[]>('contacts'),
          apiGet<PhoneData[]>('phone_contacts'),
          apiGet<DepartmentData[]>('departments'),
          apiGet<PhoneDepartmentData[]>('phone_departments')
        ]);

        setContacts(contactsData.filter(c => Number(c.is_primary) !== 1) || []);
        setPrimaryContacts(SortLeadership(contactsData.filter(c => Number(c.is_primary) === 1)) || []);
        setPhones(phonesData || []);
        setDepartments(departmentsData || []);
        setPhoneDepartments(phoneDepData || []);

      } catch (err) {
        if (isSessionError(err)) return;
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

  const uploadImage = async (file: File, type: 'contacts' | 'departments') => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Допустимые форматы: JPEG, PNG, GIF, WebP');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5 МБ');
      return null;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);

    try {
      const data = await apiUpload<{ success?: boolean; path?: string; message?: string }>(
        'upload',
        formData
      );
      if (data?.success && data.path) return data.path;
      alert(`Ошибка загрузки: ${data?.message || 'неизвестная ошибка'}`);
      return null;
    } catch (err) {
      ImageUploadError(err);
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!editingContact) return;
    const path = await uploadImage(file, 'contacts');
    if (path) setEditingContact({ ...editingContact, src: path });
  };

  const cleanupTempImage = async () => {
    try {
      await apiPost('cleanup');
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

  const syncContactPhones = async (contactId: number, existingIds: number[], newPhones: string[]) => {
    await Promise.allSettled(existingIds.map(id => apiDelete(`phone_contacts/${id}`)));
    const validPhones = newPhones.filter(phone => phone.trim() !== '');
    if (validPhones.length > 0) {
      await Promise.all(
        validPhones.map(phone => apiPost('phone_contacts', { contact_id: contactId, phone }))
      );
    }
  };

  const handleSaveContact = async () => {
    if (!editingContact) return;

    const validationError = validateContact();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSaving(true);
    try {
      const isNew = !editingContact.id || editingContact.id === 0;
      const payload = {
        surname: editingContact.surname,
        name: editingContact.name,
        patronymic: editingContact.patronymic,
        job_title: editingContact.job_title,
        email: editingContact.email,
        src: editingContact.src ?? '',
        is_primary: Number(editingContact.is_primary) === 1 ? 1 : 0
      };

      const responseData = isNew
        ? await apiPost<{ id?: number }>('contacts', payload)
        : await apiPut(`contacts/${editingContact.id}`, payload);
      const savedId = isNew ? responseData?.id ?? 0 : editingContact.id;
      const savedContact = isNew ? { ...editingContact, id: savedId } : editingContact;

      if (isNew) {
        await syncContactPhones(savedId, [], editingPhones);

        if (Number(savedContact.is_primary) === 1) {
          setPrimaryContacts(prev => SortLeadership([...prev, savedContact]));
        } else {
          setContacts(prev => [...prev, savedContact]);
        }
      } else {
        const existingPhoneIds = phones
          .filter(p => p.contact_id === editingContact.id)
          .map(p => p.id);

        await syncContactPhones(editingContact.id, existingPhoneIds, editingPhones);

        // Обновляем контакт и при смене флага переносим между разделами
        setContacts(prev => prev
          .filter(c => c.id !== editingContact.id)
          .concat(Number(editingContact.is_primary) === 1 ? [] : [editingContact]));
        setPrimaryContacts(prev => SortLeadership(prev
          .filter(c => c.id !== editingContact.id)
          .concat(Number(editingContact.is_primary) === 1 ? [editingContact] : [])));
      }

      // Refresh phones data
      setPhones(await apiGet<PhoneData[]>('phone_contacts') || []);

      setEditingContact(null);
      setEditingPhones([]);
    } catch (err) {
      saveErrorAlert(err, 'Ошибка при сохранении контакта');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteContact = async (contactId: number) => {
    await apiDelete(`contacts/${contactId}`);
    setContacts(prev => prev.filter(c => c.id !== contactId));
    setPrimaryContacts(prev => prev.filter(c => c.id !== contactId));
    setEditingContact(null);
  };

  const handleDeleteContact = async () => {
    if (!editingContact) return;

    setIsDeleting(true);
    try {
      await deleteContact(editingContact.id);
    } catch (err) {
      if (!isSessionError(err)) console.error('Delete error:', err);
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
      setEditingDepartment({ id: 0, name: '', email: '', src: '' });
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
      await deleteContact(contact.id);
    } catch (err) {
      if (!isSessionError(err)) {
        console.error('Delete contact error:', err);
        alert('Ошибка при удалении сотрудника');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuickDeleteDepartment = async (department: DepartmentData) => {
    if (!window.confirm(`Удалить отдел «${department.name}»?`)) return;

    setIsDeleting(true);
    try {
      await apiDelete(`departments/${department.id}`);
      setDepartments(prev => prev.filter(d => d.id !== department.id));
      setEditingDepartment(null);
    } catch (err) {
      if (!isSessionError(err)) {
        console.error('Delete department error:', err);
        alert('Ошибка при удалении отдела');
      }
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
    const path = await uploadImage(file, 'departments');
    if (path) setEditingDepartment({ ...editingDepartment, src: path });
  };

  const handleSaveDepartment = async () => {
    if (!editingDepartment) return;

    setIsSaving(true);
    try {
      const isNew = !editingDepartment.id || editingDepartment.id === 0;
      const payload = {
        name: editingDepartment.name,
        email: editingDepartment.email,
        src: editingDepartment.src ?? ''
      };

      const responseData = isNew
        ? await apiPost<{ id?: number }>('departments', payload)
        : await apiPut(`departments/${editingDepartment.id}`, payload);
      const savedId = isNew ? responseData?.id ?? 0 : editingDepartment.id;

      if (isNew) {
        const newDept = { ...editingDepartment, id: savedId };
        await syncDeptPhones(savedId, [], editingDeptPhones);
        setDepartments(prev => [...prev, newDept]);
      } else {
        const existingPhoneIds = phoneDepartments
          .filter(p => p.id_department === editingDepartment.id)
          .map(p => p.id);

        await syncDeptPhones(editingDepartment.id, existingPhoneIds, editingDeptPhones);

        // Update departments state
        setDepartments(prev => prev.map(d => d.id === editingDepartment.id ? editingDepartment : d));
      }

      // Refresh phone departments data
      setPhoneDepartments(await apiGet<PhoneDepartmentData[]>('phone_departments') || []);

      setEditingDepartment(null);
      setEditingDeptPhones([]);
    } catch (err) {
      saveErrorAlert(err, 'Ошибка при сохранении отдела');
    } finally {
      setIsSaving(false);
    }
  };

  const syncDeptPhones = async (departmentId: number, existingIds: number[], newPhones: string[]) => {
    await Promise.allSettled(existingIds.map(id => apiDelete(`phone_departments/${id}`)));
    const validPhones = newPhones.filter(phone => phone.trim() !== '');
    if (validPhones.length > 0) {
      await Promise.all(
        validPhones.map(phone =>
          apiPost('phone_departments', { id_department: departmentId, phone, is_fax: false })
        )
      );
    }
  };

  const handleDeleteDepartment = async () => {
    if (!editingDepartment) return;

    setIsDeleting(true);
    try {
      await apiDelete(`departments/${editingDepartment.id}`);
      setDepartments(prev => prev.filter(d => d.id !== editingDepartment.id));
      setEditingDepartment(null);
    } catch (err) {
      if (!isSessionError(err)) {
        console.error('Delete department error:', err);
        alert('Ошибка при удалении отдела');
      }
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
      <BoardToolbar view={view} onViewChange={setView} />

      {view === 'cards' ? (
        <BoardCards
          panelHeader="Разделы"
          panel={
            <CategoryList
              activeKey={section}
              items={sectionItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                count: item.count,
                onSelect: () => setSection(item.key)
              }))}
            />
          }
          title={
            <>
              {activeItem.icon}
              {activeItem.label}
            </>
          }
          action={
            <ActionButton onClick={handleAddForSection}>
              <Plus /> {section === 'departments' ? 'Добавить отдел' : 'Добавить сотрудника'}
            </ActionButton>
          }
        >
            {section === 'departments' ? (
              <>
                {departments.length === 0 && (
                  <EmptyPanel>Нет отделов. Добавьте первый.</EmptyPanel>
                )}
                {departments.map(department => {
                  const deptPhones = phoneDepartments
                    .filter(p => p.id_department === department.id)
                    .map(p => p.phone);
                  return (
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
                        {deptPhones.length > 0 && (
                          <DocCardMeta>{deptPhones.join(', ')}</DocCardMeta>
                        )}
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
                  );
                })}
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
        </BoardCards>
      ) : (
        <>
          <SectionCard
            title="Сотрудники"
            action={
              <ActionButton onClick={handleAddContact}>
                <Plus /> Добавить сотрудника
              </ActionButton>
            }
          >
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
          </SectionCard>

          <SectionCard
            title="Отделы"
            action={
              <ActionButton
                onClick={() => {
                  setEditingDepartment({
                    id: 0,
                    name: '',
                    email: '',
                    src: ''
                  });
                  setEditingDeptPhones([]);
                }}
              >
                <Plus /> Добавить отдел
              </ActionButton>
            }
          >
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
          </SectionCard>
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
