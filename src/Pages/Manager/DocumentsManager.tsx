import React, { useState, useEffect } from 'react';
import { Pencil, Plus, X } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import DocumentEditForm, { DocumentData, GroupOption } from './EditForms/DocumentEditForm';
import { Input } from './styled';
import {
  Card, SectionHeader, SectionTitle, ActionButton, ModalActions,
  Table, Th, Td, Tr, IconButton,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton,
  FileLink
} from './ui';

const normalizeDocSrc = (src: string) => (src.startsWith('/') ? src : `/${src}`);

const DocumentsManager: React.FC = () => {
  const [groups, setGroups] = useState<GroupOption[]>([]);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingGroup, setEditingGroup] = useState<GroupOption | null>(null);
  const [editingDocument, setEditingDocument] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [groupsRes, documentsRes] = await Promise.all([
          fetch('/backend/api.php/api/documents_group'),
          fetch('/backend/api.php/api/documents')
        ]);

        if (!groupsRes.ok || !documentsRes.ok) {
          throw new Error('Ошибка загрузки данных');
        }

        setGroups(await groupsRes.json());
        setDocuments(await documentsRes.json());
        setError('');
      } catch (err) {
        console.error('Load error:', err);
        setError('Не удалось загрузить документы');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSessionExpired = (status: number) => {
    if (status === 401) {
      alert('Сессия истекла. Пожалуйста, войдите снова.');
      window.location.href = '/manager';
      return true;
    }
    return false;
  };

  const cleanupTempFile = async (src: string) => {
    try {
      await fetch('/backend/api.php/api/cleanup-file', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ src })
      });
    } catch (err) {
      console.error('Failed to cleanup temp file:', err);
    }
  };

  // --- Группы ---

  const handleAddGroup = () => {
    setEditingGroup({ id: 0, name: '' });
  };

  const handleEditGroup = (group: GroupOption) => {
    setEditingGroup({ ...group });
  };

  const handleSaveGroup = async () => {
    if (!editingGroup) return;

    const name = editingGroup.name.trim();
    if (!name) {
      alert('Введите название категории');
      return;
    }

    const isNew = !editingGroup.id || editingGroup.id === 0;
    setIsSaving(true);
    try {
      const response = await fetch(
        isNew
          ? '/backend/api.php/api/documents_group'
          : `/backend/api.php/api/documents_group/${editingGroup.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ name })
        }
      );

      if (!response.ok) {
        const text = await response.text();
        if (handleSessionExpired(response.status)) return;
        alert(`Ошибка сохранения: ${response.status} ${text}`);
        return;
      }

      const data = await response.json();
      if (isNew) {
        setGroups(prev => [...prev, { id: data.id, name }]);
      } else {
        setGroups(prev => prev.map(g => g.id === editingGroup.id ? { ...g, name } : g));
      }
      setEditingGroup(null);
    } catch (err) {
      console.error('Save group error:', err);
      alert('Ошибка при сохранении категории');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!editingGroup) return;

    const docsInGroup = documents.filter(d => d.id_group === editingGroup.id);
    if (docsInGroup.length > 0) {
      alert(`В категории "${editingGroup.name}" есть документы (${docsInGroup.length}). Сначала удалите их.`);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/documents_group/${editingGroup.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok && handleSessionExpired(response.status)) return;

      if (response.ok) {
        setGroups(prev => prev.filter(g => g.id !== editingGroup.id));
        setEditingGroup(null);
      }
    } catch (err) {
      console.error('Delete group error:', err);
      alert('Ошибка при удалении категории');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- Документы ---

  const handleAddDocument = () => {
    setEditingDocument({ id: 0, name: '', id_group: groups[0]?.id || 0, src: '' });
  };

  const handleEditDocument = (document: DocumentData) => {
    setEditingDocument({ ...document });
  };

  const handleFileUpload = async (file: File) => {
    if (!editingDocument) return;

    const allowedExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rtf', 'odt', 'ods'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExts.includes(ext)) {
      alert('Допустимые форматы: PDF, DOC, DOCX, XLS, XLSX, RTF, ODT, ODS');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert('Размер файла не должен превышать 20 МБ');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'documents');

    try {
      const response = await fetch('/backend/api.php/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.path) {
          setEditingDocument(prev => prev ? { ...prev, src: data.path } : prev);
        } else {
          alert(`Ошибка загрузки: ${data.message || 'неизвестная ошибка'}`);
        }
      } else if (!handleSessionExpired(response.status)) {
        const errorText = await response.text();
        alert(`Ошибка загрузки: ${errorText}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Ошибка при загрузке файла');
    }
  };

  const handleSaveDocument = async () => {
    if (!editingDocument) return;

    const name = editingDocument.name.trim();
    if (!name) {
      alert('Введите название документа');
      return;
    }
    if (!editingDocument.id_group) {
      alert('Выберите категорию');
      return;
    }
    if (!editingDocument.src) {
      alert('Загрузите файл');
      return;
    }

    setIsSaving(true);
    try {
      const isNew = !editingDocument.id || editingDocument.id === 0;
      const payload = {
        name,
        id_group: editingDocument.id_group,
        src: editingDocument.src
      };

      const response = await fetch(
        isNew
          ? '/backend/api.php/api/documents'
          : `/backend/api.php/api/documents/${editingDocument.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const text = await response.text();
        if (handleSessionExpired(response.status)) return;
        alert(`Ошибка сохранения: ${response.status} ${text}`);
        return;
      }

      const data = await response.json();
      if (isNew) {
        setDocuments(prev => [...prev, { ...payload, id: data.id }]);
      } else {
        setDocuments(prev => prev.map(d => d.id === editingDocument.id ? { ...payload, id: editingDocument.id } : d));
      }
      setEditingDocument(null);
    } catch (err) {
      console.error('Save document error:', err);
      alert('Ошибка при сохранении документа');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDocument = async () => {
    if (!editingDocument) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/backend/api.php/api/documents/${editingDocument.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok && handleSessionExpired(response.status)) return;

      if (response.ok) {
        setDocuments(prev => prev.filter(d => d.id !== editingDocument.id));
        setEditingDocument(null);
      }
    } catch (err) {
      console.error('Delete document error:', err);
      alert('Ошибка при удалении документа');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDocument = async () => {
    if (editingDocument) {
      const original = documents.find(d => d.id === editingDocument.id);
      const originalSrc = original ? normalizeDocSrc(original.src) : '';
      if (editingDocument.src && normalizeDocSrc(editingDocument.src) !== originalSrc) {
        await cleanupTempFile(editingDocument.src);
      }
    }
    setEditingDocument(null);
  };

  const groupName = (id: number) => groups.find(g => g.id === id)?.name || '—';

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{error}</Text>;
  }

  return (
    <>
      <Card>
        <SectionHeader>
          <SectionTitle>Категории</SectionTitle>
          <ActionButton onClick={handleAddGroup}>
            <Plus /> Добавить категорию
          </ActionButton>
        </SectionHeader>

        <Table>
          <thead>
            <tr>
              <Th>Название</Th>
              <Th style={{ width: 140 }}>Документов</Th>
              <Th style={{ width: 60 }}></Th>
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <Tr key={group.id}>
                <Td>{group.name}</Td>
                <Td>{documents.filter(d => d.id_group === group.id).length}</Td>
                <Td>
                  <IconButton onClick={() => handleEditGroup(group)} aria-label="Редактировать">
                    <Pencil />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card>
        <SectionHeader>
          <SectionTitle>Документы</SectionTitle>
          <ActionButton
            onClick={handleAddDocument}
            disabled={groups.length === 0}
          >
            <Plus /> Добавить документ
          </ActionButton>
        </SectionHeader>

        {groups.length === 0 && (
          <Text style={{ color: '#6c757d' }}>Сначала создайте хотя бы одну категорию</Text>
        )}

        <Table>
          <thead>
            <tr>
              <Th>Название</Th>
              <Th>Категория</Th>
              <Th>Файл</Th>
              <Th style={{ width: 60 }}></Th>
            </tr>
          </thead>
          <tbody>
            {documents.map(document => (
              <Tr key={document.id}>
                <Td>{document.name}</Td>
                <Td>{groupName(document.id_group)}</Td>
                <Td>
                  <FileLink
                    href={normalizeDocSrc(document.src)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {document.src.split('/').pop()}
                  </FileLink>
                </Td>
                <Td>
                  <IconButton onClick={() => handleEditDocument(document)} aria-label="Редактировать">
                    <Pencil />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {editingGroup && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && setEditingGroup(null)}>
          <ModalContent>
            <ModalHeader>
              {editingGroup.id ? 'Редактирование категории' : 'Новая категория'}
              <CloseButton onClick={() => setEditingGroup(null)} aria-label="Закрыть">
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <Input
                value={editingGroup.name}
                onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                placeholder="Название категории"
                aria-label="Название категории"
              />
              <ModalActions>
                <ActionButton onClick={handleSaveGroup} disabled={isSaving || isDeleting}>
                  {isSaving ? 'Сохранение...' : 'Сохранить'}
                </ActionButton>
                <ActionButton $variant="secondary" onClick={() => setEditingGroup(null)} disabled={isSaving || isDeleting}>
                  Отмена
                </ActionButton>
                {editingGroup.id !== 0 && (
                  <ActionButton $variant="danger" onClick={handleDeleteGroup} disabled={isSaving || isDeleting}>
                    {isDeleting ? 'Удаление...' : 'Удалить'}
                  </ActionButton>
                )}
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {editingDocument && (
        <ModalOverlay onClick={(e) => e.target === e.currentTarget && handleCancelDocument()}>
          <ModalContent>
            <ModalHeader>
              {editingDocument.id ? 'Редактирование документа' : 'Новый документ'}
              <CloseButton onClick={handleCancelDocument} aria-label="Закрыть">
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <DocumentEditForm
                document={editingDocument}
                groups={groups}
                isSaving={isSaving}
                isDeleting={isDeleting}
                onDocumentChange={setEditingDocument}
                onSave={handleSaveDocument}
                onCancel={handleCancelDocument}
                onDelete={handleDeleteDocument}
                onFileUpload={handleFileUpload}
              />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default DocumentsManager;
