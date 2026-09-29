import React from 'react';
import { Input } from '../styled';
import Button from '../../../Components/Button/Button';
import { ResolveDepartmentImage } from '../../../functions';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Фото/Логотип:</label>
        {department.src && (
          <div style={{ marginBottom: 10 }}>
            <img 
              src={ResolveDepartmentImage(department.src)} 
              alt="Фото отдела" 
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 5 }}
            />
            <Button 
              onClick={() => onDepartmentChange({ ...department, src: undefined })}
              style={{ backgroundColor: '#dc3545', padding: '5px 10px', fontSize: 12 }}
            >
              Удалить фото
            </Button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(file);
          }}
          style={{ marginTop: 5 }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Название отдела:</label>
        <Input
          value={department.name}
          onChange={(e) => onDepartmentChange({ ...department, name: e.target.value })}
          placeholder="Название отдела"
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Руководитель:</label>
        <Input
          value={department.head || ''}
          onChange={(e) => onDepartmentChange({ ...department, head: e.target.value })}
          placeholder="ФИО руководителя"
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Описание:</label>
        <Input
          value={department.description || ''}
          onChange={(e) => onDepartmentChange({ ...department, description: e.target.value })}
          placeholder="Описание отдела"
          as="textarea"
          style={{ minHeight: 80, resize: 'vertical' }}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Телефоны:</label>
        {phones.map((phone, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Input
              value={phone}
              onChange={(e) => onPhoneChange(index, e.target.value)}
              placeholder="Номер телефона"
            />
            {phones.length > 1 && (
              <Button onClick={() => onRemovePhone(index)} style={{ backgroundColor: '#dc3545' }}>
                Удалить
              </Button>
            )}
          </div>
        ))}
        <Button onClick={onAddPhone} style={{ marginTop: '10px' }}>
          + Добавить телефон
        </Button>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <Input
          value={department.email || ''}
          onChange={(e) => onDepartmentChange({ ...department, email: e.target.value })}
          placeholder="Email отдела"
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button 
          onClick={onSave} 
          disabled={isSaving || isDeleting}
          style={{ opacity: isSaving ? 0.7 : 1 }}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
        <Button 
          onClick={onCancel} 
          disabled={isSaving || isDeleting}
          style={{ backgroundColor: '#6c757d' }}
        >
          Отмена
        </Button>
        <Button 
          onClick={onDelete} 
          disabled={isSaving || isDeleting}
          style={{ backgroundColor: '#dc3545', opacity: isDeleting ? 0.7 : 1 }}
        >
          {isDeleting ? 'Удаление...' : 'Удалить'}
        </Button>
      </div>
    </div>
  );
};

export default DepartmentEditForm;
