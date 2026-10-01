import React from 'react';
import { FileText } from 'lucide-react';
import {
  Field, FieldLabel, FieldHint, FileInput, FileLink
} from '../ui';
import { TextField, SelectField, FormActions } from './parts';

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
      <TextField
        label="Название документа:"
        value={document.name}
        placeholder="Название документа"
        onChange={(name) => onDocumentChange({ ...document, name })}
      />

      <SelectField
        label="Категория:"
        value={document.id_group || ''}
        placeholder="Выберите категорию"
        options={groups.map(group => ({ value: group.id, label: group.name }))}
        onChange={(value) => onDocumentChange({ ...document, id_group: Number(value) })}
      />

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

export default DocumentEditForm;
