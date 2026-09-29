import React from 'react';
import { Input } from '../styled';
import { FileText, Save, X, Trash2 } from 'lucide-react';
import {
  Field, FieldLabel, FieldHint, ModalActions, ActionButton, FileInput, FileLink
} from '../ui';

export interface DocumentData {
  id: number;
  name: string;
  id_group: number;
  src: string;
}

export interface GroupOption {
  id: number;
  name: string;
}

interface DocumentEditFormProps {
  document: DocumentData;
  groups: GroupOption[];
  isSaving: boolean;
  isDeleting: boolean;
  onDocumentChange: (document: DocumentData) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onFileUpload: (file: File) => void;
}

const DocumentEditForm: React.FC<DocumentEditFormProps> = ({
  document,
  groups,
  isSaving,
  isDeleting,
  onDocumentChange,
  onSave,
  onCancel,
  onDelete,
  onFileUpload
}) => {
  const fileSrc = document.src
    ? (document.src.startsWith('/') ? document.src : `/${document.src}`)
    : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <Field>
        <FieldLabel>Название документа:</FieldLabel>
        <Input
          value={document.name}
          onChange={(e) => onDocumentChange({ ...document, name: e.target.value })}
          placeholder="Название документа"
        />
      </Field>

      <Field>
        <FieldLabel>Категория:</FieldLabel>
        <select
          value={document.id_group || ''}
          onChange={(e) => onDocumentChange({ ...document, id_group: Number(e.target.value) })}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid #ced4da',
            fontSize: 16,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: '#fff',
            color: '#212529'
          }}
        >
          <option value="" disabled>Выберите категорию</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </Field>

      <Field>
        <FieldLabel>Файл:</FieldLabel>
        {fileSrc ? (
          <FileLink href={fileSrc} target="_blank" rel="noopener noreferrer">
            <FileText />
            {document.src.split('/').pop()}
          </FileLink>
        ) : (
          <FieldHint $error>
            <FileText style={{ width: 14, height: 14, verticalAlign: -2 }} /> Файл не загружен
          </FieldHint>
        )}
        <FileInput
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.rtf,.odt,.ods"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileUpload(file);
            e.target.value = '';
          }}
        />
        <FieldHint>PDF, DOC, DOCX, XLS, XLSX, RTF, ODT, ODS, до 20 МБ</FieldHint>
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

export default DocumentEditForm;
