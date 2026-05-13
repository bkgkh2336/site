import React from 'react';
import { Input } from '../styled';
import Button from '../../../Components/Button/Button';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Фото:</label>
        {contact.src && (
          <div style={{ marginBottom: 10 }}>
            <img 
              src={contact.src} 
              alt="Фото контакта" 
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', marginBottom: 5 }}
            />
            <Button 
              onClick={() => onContactChange({ ...contact, src: undefined })}
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
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Фамилия:</label>
        <Input
          value={contact.surname}
          onChange={(e) => onContactChange({ ...contact, surname: e.target.value })}
          placeholder="Фамилия"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Имя:</label>
        <Input
          value={contact.name}
          onChange={(e) => onContactChange({ ...contact, name: e.target.value })}
          placeholder="Имя"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Отчество:</label>
        <Input
          value={contact.patronymic || ''}
          onChange={(e) => onContactChange({ ...contact, patronymic: e.target.value })}
          placeholder="Отчество"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Должность:</label>
        <Input
          value={contact.job_title || ''}
          onChange={(e) => onContactChange({ ...contact, job_title: e.target.value })}
          placeholder="Должность"
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
        <Input
          value={contact.email || ''}
          onChange={(e) => onContactChange({ ...contact, email: e.target.value })}
          placeholder="Email"
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

export default ContactEditForm;