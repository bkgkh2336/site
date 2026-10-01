import React from 'react';
import { ResolveDepartmentImage } from '../../../functions';
import { TextField, ImageField, PhoneList, FormActions } from './parts';

interface DepartmentData {
  id: number;
  name: string;
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
      <ImageField
        label="Фото/Логотип:"
        src={department.src}
        displaySrc={department.src ? ResolveDepartmentImage(department.src) : undefined}
        alt="Фото отдела"
        onClear={() => onDepartmentChange({ ...department, src: undefined })}
        onUpload={onImageUpload}
      />

      <TextField
        label="Название отдела:"
        value={department.name}
        placeholder="Название отдела"
        onChange={(name) => onDepartmentChange({ ...department, name })}
      />

      <PhoneList
        phones={phones}
        onPhoneChange={onPhoneChange}
        onAdd={onAddPhone}
        onRemove={onRemovePhone}
      />

      <TextField
        label="Email:"
        value={department.email || ''}
        placeholder="Email отдела"
        onChange={(email) => onDepartmentChange({ ...department, email })}
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

export default DepartmentEditForm;
