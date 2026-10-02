import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Plus, Crown, Users, Building2, Trash2, User } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import ContactEditForm from './EditForms/ContactEditForm';
import DepartmentEditForm from './EditForms/DepartmentEditForm';
import { ResolveDepartmentImage, SortLeadership } from '../../functions';
import { apiGet, apiPost, apiPut, apiDelete, apiUpload, ApiError, isSessionError } from './api';
import { BoardToolbar, BoardCards, CategoryList, SectionCard } from './Board';
import Modal from './Modal';
import {
  ActionButton,
  Table, Th, Td, Tr, IconButton,
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

type EntityKind = 'contact' | 'department';

type Editing =
  | { kind: 'contact'; data: ContactData; phones: string[] }
  | { kind: 'department'; data: DepartmentData; phones: string[] }
  | null;

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

  const [editing, setEditing] = useState<Editing>(null);
  const [isSaving, setIsSaving] = useState(false);
  const snapshotRef = useRef('');

  const openEditing = (value: NonNullable<Editing>) => {
    snapshotRef.current = JSON.stringify(value);
    setEditing(value);
  };

  const isDirty = editing !== null && JSON.stringify(editing) !== snapshotRef.current;
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
    openEditing({
      kind: 'contact',
      data: { ...contact },
      phones: phones.filter(p => p.contact_id === contact.id).map(p => p.phone)
    });
  };

  const handleEditDepartment = (department: DepartmentData) => {
    openEditing({
      kind: 'department',
      data: { ...department },
      phones: phoneDepartments.filter(p => p.id_department === department.id).map(p => p.phone)
    });
  };

  const handleContactChange = (data: ContactData) => {
    setEditing(prev => (prev?.kind === 'contact' ? { ...prev, data } : prev));
  };

  const handleDepartmentChange = (data: DepartmentData) => {
    setEditing(prev => (prev?.kind === 'department' ? { ...prev, data } : prev));
  };

  const handlePhoneChange = (index: number, value: string) => {
    setEditing(prev => prev
      ? { ...prev, phones: prev.phones.map((phone, i) => i === index ? value : phone) }
      : prev);
  };

  const handleAddPhone = () => {
    setEditing(prev => prev ? { ...prev, phones: [...prev.phones, ''] } : prev);
  };

  const handleRemovePhone = (index: number) => {
    setEditing(prev => prev
      ? { ...prev, phones: prev.phones.filter((_, i) => i !== index) }
      : prev);
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
    if (!editing) return;
    const path = await uploadImage(file, editing.kind === 'contact' ? 'contacts' : 'departments');
    if (!path) return;

    if (editing.kind === 'contact') {
      setEditing(prev => (prev?.kind === 'contact'
        ? { ...prev, data: { ...prev.data, src: path } }
        : prev));
    } else {
      setEditing(prev => (prev?.kind === 'department'
        ? { ...prev, data: { ...prev.data, src: path } }
        : prev));
    }
  };

  const cleanupTempImage = async () => {
    try {
      await apiPost('cleanup');
    } catch (err) {
      console.error('Failed to cleanup temp image:', err);
    }
  };

  const validateContact = (contact: ContactData, contactPhones: string[]): string | null => {
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      return 'Некорректный email';
    }

    const invalidPhone = contactPhones.find(p => p.trim() && !/^[\d\s\-+()]{5,20}$/.test(p.trim()));
    if (invalidPhone) return 'Некорректный номер телефона';

    return null;
  };

  const syncPhones = async (
    kind: EntityKind,
    id: number,
    existingIds: number[],
    newPhones: string[]
  ) => {
    const base = kind === 'contact' ? 'phone_contacts' : 'phone_departments';
    await Promise.allSettled(existingIds.map(pid => apiDelete(`${base}/${pid}`)));
    const validPhones = newPhones.filter(phone => phone.trim() !== '');
    if (validPhones.length > 0) {
      await Promise.all(
        validPhones.map(phone =>
          apiPost(base, kind === 'contact'
            ? { contact_id: id, phone }
            : { id_department: id, phone, is_fax: false })
        )
      );
    }
  };

  const saveContact = async (contact: ContactData, contactPhones: string[]) => {
    const isNew = !contact.id || contact.id === 0;
    const payload = {
      surname: contact.surname,
      name: contact.name,
      patronymic: contact.patronymic,
      job_title: contact.job_title,
      email: contact.email,
      src: contact.src ?? '',
      is_primary: Number(contact.is_primary) === 1 ? 1 : 0
    };

    const responseData = isNew
      ? await apiPost<{ id?: number }>('contacts', payload)
      : await apiPut(`contacts/${contact.id}`, payload);
    const savedId = isNew ? responseData?.id ?? 0 : contact.id;
    const savedContact = isNew ? { ...contact, id: savedId } : contact;

    const existingPhoneIds = isNew
      ? []
      : phones.filter(p => p.contact_id === contact.id).map(p => p.id);
    await syncPhones('contact', savedId, existingPhoneIds, contactPhones);

    if (isNew) {
      if (Number(savedContact.is_primary) === 1) {
        setPrimaryContacts(prev => SortLeadership([...prev, savedContact]));
      } else {
        setContacts(prev => [...prev, savedContact]);
      }
    } else {
      // Обновляем контакт и при смене флага переносим между разделами
      setContacts(prev => prev
        .filter(c => c.id !== contact.id)
        .concat(Number(contact.is_primary) === 1 ? [] : [contact]));
      setPrimaryContacts(prev => SortLeadership(prev
        .filter(c => c.id !== contact.id)
        .concat(Number(contact.is_primary) === 1 ? [contact] : [])));
    }

    // Refresh phones data
    setPhones(await apiGet<PhoneData[]>('phone_contacts') || []);
    setEditing(null);
  };

  const saveDepartment = async (department: DepartmentData, deptPhones: string[]) => {
    const isNew = !department.id || department.id === 0;
    const payload = {
      name: department.name,
      email: department.email,
      src: department.src ?? ''
    };

    const responseData = isNew
      ? await apiPost<{ id?: number }>('departments', payload)
      : await apiPut(`departments/${department.id}`, payload);
    const savedId = isNew ? responseData?.id ?? 0 : department.id;

    const existingPhoneIds = isNew
      ? []
      : phoneDepartments.filter(p => p.id_department === department.id).map(p => p.id);
    await syncPhones('department', savedId, existingPhoneIds, deptPhones);

    if (isNew) {
      setDepartments(prev => [...prev, { ...department, id: savedId }]);
    } else {
      setDepartments(prev => prev.map(d => d.id === department.id ? department : d));
    }

    // Refresh phone departments data
    setPhoneDepartments(await apiGet<PhoneDepartmentData[]>('phone_departments') || []);
    setEditing(null);
  };

  const handleSave = async () => {
    if (isSaving || !editing) return;

    if (editing.kind === 'contact') {
      const validationError = validateContact(editing.data, editing.phones);
      if (validationError) {
        alert(validationError);
        return;
      }
    }

    setIsSaving(true);
    try {
      if (editing.kind === 'contact') {
        await saveContact(editing.data, editing.phones);
      } else {
        await saveDepartment(editing.data, editing.phones);
      }
    } catch (err) {
      saveErrorAlert(err, editing.kind === 'contact'
        ? 'Ошибка при сохранении контакта'
        : 'Ошибка при сохранении отдела');
    } finally {
      setIsSaving(false);
    }
  };

  const removeEntity = async (kind: EntityKind, id: number) => {
    if (kind === 'contact') {
      await apiDelete(`contacts/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
      setPrimaryContacts(prev => prev.filter(c => c.id !== id));
    } else {
      await apiDelete(`departments/${id}`);
      setDepartments(prev => prev.filter(d => d.id !== id));
    }
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!editing) return;

    setIsDeleting(true);
    try {
      await removeEntity(editing.kind, editing.data.id);
    } catch (err) {
      if (!isSessionError(err)) {
        console.error('Delete error:', err);
        if (editing.kind === 'department') alert('Ошибка при удалении отдела');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!editing) return;
    const { kind, data } = editing;

    // Delete uploaded image if not saved
    if (data.src) {
      const original = kind === 'contact'
        ? [...contacts, ...primaryContacts].find(c => c.id === data.id)
        : departments.find(d => d.id === data.id);
      if (!original || original.src !== data.src) {
        void cleanupTempImage();
      }
    }
    setEditing(null);
  };

  const addContact = (isPrimary: boolean) => {
    openEditing({
      kind: 'contact',
      data: {
        id: 0,
        name: '',
        surname: '',
        patronymic: '',
        job_title: '',
        email: '',
        src: '',
        is_primary: isPrimary
      },
      phones: []
    });
  };

  const addDepartment = () => {
    openEditing({
      kind: 'department',
      data: { id: 0, name: '', email: '', src: '' },
      phones: []
    });
  };

  const handleAddForSection = () => {
    if (section === 'departments') {
      addDepartment();
    } else {
      addContact(section === 'primary');
    }
  };

  const handleQuickDeleteContact = async (contact: ContactData) => {
    const fullName = `${contact.surname} ${contact.name}`.trim();
    if (!window.confirm(`Удалить сотрудника «${fullName}»?`)) return;

    setIsDeleting(true);
    try {
      await removeEntity('contact', contact.id);
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
      await removeEntity('department', department.id);
    } catch (err) {
      if (!isSessionError(err)) {
        console.error('Delete department error:', err);
        alert('Ошибка при удалении отдела');
      }
    } finally {
      setIsDeleting(false);
    }
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
              <ActionButton onClick={() => addContact(false)}>
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
              <ActionButton onClick={addDepartment}>
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

      {editing && (
        <Modal
          title={
            editing.kind === 'contact'
              ? (editing.data.id ? 'Редактирование сотрудника' : 'Новый сотрудник')
              : (editing.data.id ? 'Редактирование отдела' : 'Новый отдел')
          }
          onClose={handleCancel}
          onSave={isSaving || isDeleting ? undefined : handleSave}
          dirty={isDirty}
        >
          {editing.kind === 'contact' ? (
            <ContactEditForm
              contact={editing.data}
              phones={editing.phones}
              isSaving={isSaving}
              isDeleting={isDeleting}
              onContactChange={handleContactChange}
              onPhoneChange={handlePhoneChange}
              onAddPhone={handleAddPhone}
              onRemovePhone={handleRemovePhone}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onImageUpload={handleImageUpload}
            />
          ) : (
            <DepartmentEditForm
              department={editing.data}
              phones={editing.phones}
              isSaving={isSaving}
              isDeleting={isDeleting}
              onDepartmentChange={handleDepartmentChange}
              onPhoneChange={handlePhoneChange}
              onAddPhone={handleAddPhone}
              onRemovePhone={handleRemovePhone}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onImageUpload={handleImageUpload}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default ContactsManager;
