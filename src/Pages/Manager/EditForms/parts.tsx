import React from 'react';
import { Input } from '../styled';
import { Trash2, Plus, Save, X, ImageOff } from 'lucide-react';
import { Field, FieldLabel, FieldHint, ModalActions, ActionButton, FileInput } from '../ui';

export const TextField: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}> = ({ label, value, placeholder, onChange }) => (
  <Field>
    <FieldLabel>{label}</FieldLabel>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </Field>
);

const selectStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #ced4da',
  fontSize: 16,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#fff',
  color: '#212529'
};

export const SelectField: React.FC<{
  label: string;
  value: string | number;
  placeholder: string;
  options: { value: string | number; label: string }[];
  onChange: (value: string) => void;
}> = ({ label, value, placeholder, options, onChange }) => (
  <Field>
    <FieldLabel>{label}</FieldLabel>
    <select style={selectStyle} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </Field>
);

export const ImageField: React.FC<{
  label: string;
  src?: string;
  displaySrc?: string;
  alt: string;
  round?: boolean;
  onClear: () => void;
  onUpload: (file: File) => void;
}> = ({ label, src, displaySrc, alt, round, onClear, onUpload }) => (
  <Field>
    <FieldLabel>{label}</FieldLabel>
    {src && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src={displaySrc || src}
          alt={alt}
          style={{
            width: 72,
            height: 72,
            objectFit: 'cover',
            borderRadius: round ? '50%' : 8
          }}
        />
        <ActionButton $variant="danger" onClick={onClear}>
          <ImageOff /> Удалить фото
        </ActionButton>
      </div>
    )}
    <FileInput
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
      }}
    />
    <FieldHint>JPEG, PNG, GIF, WebP, до 5 МБ</FieldHint>
  </Field>
);

export const PhoneList: React.FC<{
  phones: string[];
  onPhoneChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}> = ({ phones, onPhoneChange, onAdd, onRemove }) => (
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
          <ActionButton $variant="danger" onClick={() => onRemove(index)}>
            <Trash2 />
          </ActionButton>
        )}
      </div>
    ))}
    <ActionButton $variant="ghost" onClick={onAdd} style={{ alignSelf: 'flex-start' }}>
      <Plus /> Добавить телефон
    </ActionButton>
  </Field>
);

export const FormActions: React.FC<{
  isSaving: boolean;
  isDeleting: boolean;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}> = ({ isSaving, isDeleting, onSave, onCancel, onDelete }) => (
  <ModalActions>
    <ActionButton onClick={onSave} disabled={isSaving || isDeleting}>
      <Save />
      {isSaving ? 'Сохранение...' : 'Сохранить'}
    </ActionButton>
    <ActionButton $variant="secondary" onClick={onCancel} disabled={isSaving || isDeleting}>
      <X /> Отмена
    </ActionButton>
    {onDelete && (
      <ActionButton $variant="danger" onClick={onDelete} disabled={isSaving || isDeleting}>
        <Trash2 />
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </ActionButton>
    )}
  </ModalActions>
);
