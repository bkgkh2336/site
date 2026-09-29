import React from 'react';
import { Input } from '../styled';
import { Trash2, Plus, Save, X, ImageOff } from 'lucide-react';
import {
  Field, FieldLabel, FieldHint, ModalActions, ActionButton, FileInput
} from '../ui';

interface ContactData {
  id: number;
  src?: string;
  name: string;
  surname: string;
  patronymic?: string;
  job_title?: string;
  email?: string;
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
      <Field>
        <FieldLabel>Фото:</FieldLabel>
        {contact.src && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={contact.src}
              alt="Фото контакта"
              style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: '50%' }}
            />
            <ActionButton
              $variant="danger"
              onClick={() => onContactChange({ ...contact, src: undefined })}
            >
              <ImageOff /> Удалить фото
            </ActionButton>
          </div>
        )}
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
        />
        <FieldHint>JPEG, PNG, GIF, WebP, до 5 МБ</FieldHint>
      </Field>

      <Field>
        <FieldLabel>Фамилия:</FieldLabel>
        <Input
          value={contact.surname}
          onChange={(e) => onContactChange({ ...contact, surname: e.target.value })}
          placeholder="Фамилия"
        />
      </Field>

      <Field>
        <FieldLabel>Имя:</FieldLabel>
        <Input
          value={contact.name}
          onChange={(e) => onContactChange({ ...contact, name: e.target.value })}
          placeholder="Имя"
        />
      </Field>

      <Field>
        <FieldLabel>Отчество:</FieldLabel>
        <Input
          value={contact.patronymic || ''}
          onChange={(e) => onContactChange({ ...contact, patronymic: e.target.value })}
          placeholder="Отчество"
        />
      </Field>

      <Field>
        <FieldLabel>Должность:</FieldLabel>
        <Input
          value={contact.job_title || ''}
          onChange={(e) => onContactChange({ ...contact, job_title: e.target.value })}
          placeholder="Должность"
        />
      </Field>

      <Field>
        <FieldLabel>Email:</FieldLabel>
        <Input
          value={contact.email || ''}
          onChange={(e) => onContactChange({ ...contact, email: e.target.value })}
          placeholder="Email"
        />
      </Field>

      <Field>
        <FieldLabel>Телефоны:</FieldLabel>
        {phones.map((phone, index) => (
          <div key={index} style={{ display: 'flex', gap: 10 }}>
            <Input
              value={phone}
              onChange={(e) => onPhoneChange(index, e.target.value)}
              placeholder="Номер телефона"
            />
            {phones.length > 1 && (
              <ActionButton $variant="danger" onClick={() => onRemovePhone(index)}>
                <Trash2 />
              </ActionButton>
            )}
          </div>
        ))}
        <ActionButton $variant="ghost" onClick={onAddPhone} style={{ alignSelf: 'flex-start' }}>
          <Plus /> Добавить телефон
        </ActionButton>
      </Field>

      <ModalActions>
        <ActionButton onClick={onSave} disabled={isSaving || isDeleting}>
          <Save />
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </ActionButton>
        <ActionButton $variant="secondary" onClick={onCancel} disabled={isSaving || isDeleting}>
          <X /> Отмена
        </ActionButton>
        <ActionButton $variant="danger" onClick={onDelete} disabled={isSaving || isDeleting}>
          <Trash2 />
          {isDeleting ? 'Удаление...' : 'Удалить'}
        </ActionButton>
      </ModalActions>
    </div>
  );
};

export default ContactEditForm;
