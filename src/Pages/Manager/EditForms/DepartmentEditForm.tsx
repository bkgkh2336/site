import React from 'react';
import { Input } from '../styled';
import { ResolveDepartmentImage } from '../../../functions';
import { Trash2, Plus, Save, X, ImageOff } from 'lucide-react';
import {
  Field, FieldLabel, FieldHint, ModalActions, ActionButton, FileInput
} from '../ui';

interface DepartmentData {
  id: number;
  name: string;
  description?: string;
  head?: string;
  email?: string;
  src?: string;
}

interface DepartmentEditFormProps {
  department: DepartmentData;
  phones: string[];
  isSaving: boolean;
  isDeleting: boolean;
  onDepartmentChange: (department: DepartmentData) => void;
  onPhoneChange: (index: number, value: string) => void;
  onAddPhone: () => void;
  onRemovePhone: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onImageUpload: (file: File) => void;
}

const DepartmentEditForm: React.FC<DepartmentEditFormProps> = ({
  department,
  phones,
  isSaving,
  isDeleting,
  onDepartmentChange,
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
        <FieldLabel>Фото/Логотип:</FieldLabel>
        {department.src && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={ResolveDepartmentImage(department.src)}
              alt="Фото отдела"
              style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8 }}
            />
            <ActionButton
              $variant="danger"
              onClick={() => onDepartmentChange({ ...department, src: undefined })}
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
        <FieldLabel>Название отдела:</FieldLabel>
        <Input
          value={department.name}
          onChange={(e) => onDepartmentChange({ ...department, name: e.target.value })}
          placeholder="Название отдела"
        />
      </Field>

      <Field>
        <FieldLabel>Руководитель:</FieldLabel>
        <Input
          value={department.head || ''}
          onChange={(e) => onDepartmentChange({ ...department, head: e.target.value })}
          placeholder="ФИО руководителя"
        />
      </Field>

      <Field>
        <FieldLabel>Описание:</FieldLabel>
        <Input
          value={department.description || ''}
          onChange={(e) => onDepartmentChange({ ...department, description: e.target.value })}
          placeholder="Описание отдела"
          as="textarea"
          style={{ minHeight: 80, resize: 'vertical' }}
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

      <Field>
        <FieldLabel>Email:</FieldLabel>
        <Input
          value={department.email || ''}
          onChange={(e) => onDepartmentChange({ ...department, email: e.target.value })}
          placeholder="Email отдела"
        />
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

export default DepartmentEditForm;
