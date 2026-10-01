import React from 'react';
import { Field } from '../ui';
import { TextField, ImageField, PhoneList, FormActions } from './parts';

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

interface ContactEditFormProps {
  contact: ContactData;
  phones: string[];
  isSaving: boolean;
  isDeleting: boolean;
  onContactChange: (contact: ContactData) => void;
  onPhoneChange: (index: number, value: string) => void;
  onAddPhone: () => void;
  onRemovePhone: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onImageUpload: (file: File) => void;
}

const ContactEditForm: React.FC<ContactEditFormProps> = ({
  contact,
  phones,
  isSaving,
  isDeleting,
  onContactChange,
  onPhoneChange,
  onAddPhone,
  onRemovePhone,
  onSave,
  onCancel,
  onDelete,
  onImageUpload
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <ImageField
        label="Фото:"
        src={contact.src}
        alt="Фото контакта"
        round
        onClear={() => onContactChange({ ...contact, src: undefined })}
        onUpload={onImageUpload}
      />

      <TextField
        label="Фамилия:"
        value={contact.surname}
        placeholder="Фамилия"
        onChange={(surname) => onContactChange({ ...contact, surname })}
      />
      <TextField
        label="Имя:"
        value={contact.name}
        placeholder="Имя"
        onChange={(name) => onContactChange({ ...contact, name })}
      />
      <TextField
        label="Отчество:"
        value={contact.patronymic || ''}
        placeholder="Отчество"
        onChange={(patronymic) => onContactChange({ ...contact, patronymic })}
      />
      <TextField
        label="Должность:"
        value={contact.job_title || ''}
        placeholder="Должность"
        onChange={(job_title) => onContactChange({ ...contact, job_title })}
      />
      <TextField
        label="Email:"
        value={contact.email || ''}
        placeholder="Email"
        onChange={(email) => onContactChange({ ...contact, email })}
      />

      <Field>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            color: '#495057'
          }}
        >
          <input
            type="checkbox"
            checked={Number(contact.is_primary) === 1}
            onChange={(e) => onContactChange({ ...contact, is_primary: e.target.checked })}
            style={{ width: 17, height: 17, accentColor: '#28a745', cursor: 'pointer' }}
          />
          Руководящий состав
        </label>
      </Field>

      <PhoneList
        phones={phones}
        onPhoneChange={onPhoneChange}
        onAdd={onAddPhone}
        onRemove={onRemovePhone}
      />

      <FormActions
        isSaving={isSaving}
        isDeleting={isDeleting}
        onSave={onSave}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactEditForm;
