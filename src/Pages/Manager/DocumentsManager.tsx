import React, { useEffect, useState, useRef } from 'react';
import { Pencil, Plus, Folder, FileText, ExternalLink, Trash2 } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import DocumentEditForm, { DocumentData, GroupOption } from './EditForms/DocumentEditForm';
import { Input } from './styled';
import { apiPost, apiUpload, isSessionError } from './api';
import { useCrud } from './useCrud';
import { BoardToolbar, BoardCards, CategoryList, SectionCard } from './Board';
import Modal from './Modal';
import {
  ActionButton, ModalActions,
  Table, Th, Td, Tr, IconButton,
  FileLink, CategoryEdit,
  DocCard, DocCardIcon, DocCardInfo, DocCardName, DocCardMeta,
  DocCardActions, IconLink, EmptyPanel
} from './ui';

const normalizeDocSrc = (src: string) => (src.startsWith('/') ? src : `/${src}`);

const LOAD_ERROR = 'Не удалось загрузить документы';

const DocumentsManager: React.FC = () => {
  const {
    items: groups,
    editing: editingGroup,
    setEditing: setEditingGroup,
    isSaving: isSavingGroup,
    isDeleting: isDeletingGroup,
    save: saveGroup,
    remove: removeGroup
  } = useCrud<GroupOption>('documents_group', LOAD_ERROR);
  const {
    items: documents,
    editing: editingDocument,
    setEditing: setEditingDocument,
    isLoading: isLoadingDocs,
    error: docsError,
    isSaving: isSavingDoc,
    isDeleting: isDeletingDoc,
    save: saveDocument,
    remove: removeDocument
  } = useCrud<DocumentData>('documents', LOAD_ERROR);
  const [view, setView] = useState<'cards' | 'table'>('cards');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const isSaving = isSavingGroup || isSavingDoc;
  const isDeleting = isDeletingGroup || isDeletingDoc;

  const groupSnapshotRef = useRef('');
  const docSnapshotRef = useRef('');

  const isGroupDirty =
    editingGroup !== null && JSON.stringify(editingGroup) !== groupSnapshotRef.current;
  const isDocDirty =
    editingDocument !== null && JSON.stringify(editingDocument) !== docSnapshotRef.current;

  useEffect(() => {
    if (selectedGroupId === null && groups.length > 0) {
      setSelectedGroupId(groups[0].id ?? null);
    }
  }, [groups, selectedGroupId]);

  const cleanupTempFile = async (src: string) => {
    try {
      await apiPost('cleanup-file', { src });
    } catch (err) {
      console.error('Failed to cleanup temp file:', err);
    }
  };

  // --- Группы ---

  const handleAddGroup = () => {
    const value: GroupOption = { id: 0, name: '' };
    groupSnapshotRef.current = JSON.stringify(value);
    setEditingGroup(value);
  };

  const handleEditGroup = (group: GroupOption) => {
    const value = { ...group };
    groupSnapshotRef.current = JSON.stringify(value);
    setEditingGroup(value);
  };

  const handleSaveGroup = async () => {
    if (!editingGroup) return;

    const name = editingGroup.name.trim();
    if (!name) {
      alert('Введите название категории');
      return;
    }

    const isNew = !editingGroup.id || editingGroup.id === 0;
    const saved = await saveGroup({ name }, editingGroup, isNew);
    if (saved) {
      if (isNew) setSelectedGroupId(saved.id as number);
      setEditingGroup(null);
    }
  };

  const handleDeleteGroup = async () => {
    if (!editingGroup) return;

    const docsInGroup = documents.filter(d => d.id_group === editingGroup.id);
    if (docsInGroup.length > 0) {
      alert(`В категории "${editingGroup.name}" есть документы (${docsInGroup.length}). Сначала удалите их.`);
      return;
    }

    const remaining = groups.filter(g => g.id !== editingGroup.id);
    const ok = await removeGroup(editingGroup);
    if (ok && selectedGroupId === editingGroup.id) {
      setSelectedGroupId(remaining[0]?.id ?? null);
    }
  };

  // --- Документы ---

  const handleAddDocument = () => {
    const value: DocumentData = {
      id: 0,
      name: '',
      id_group: selectedGroupId ?? groups[0]?.id ?? 0,
      src: ''
    };
    docSnapshotRef.current = JSON.stringify(value);
    setEditingDocument(value);
  };

  const handleEditDocument = (document: DocumentData) => {
    const value = { ...document };
    docSnapshotRef.current = JSON.stringify(value);
    setEditingDocument(value);
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
      const data = await apiUpload<{ success?: boolean; path?: string; message?: string }>(
        'upload',
        formData
      );
      const path = data?.success && data.path ? data.path : null;
      if (path) {
        setEditingDocument(prev => prev ? { ...prev, src: path } : prev);
      } else {
        alert(`Ошибка загрузки: ${data?.message || 'неизвестная ошибка'}`);
      }
    } catch (err) {
      if (isSessionError(err)) return;
      console.error('Upload error:', err);
      alert(`Ошибка загрузки: ${err instanceof Error ? err.message : err}`);
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

    const isNew = !editingDocument.id || editingDocument.id === 0;
    const payload = {
      name,
      id_group: editingDocument.id_group,
      src: editingDocument.src
    };
    const saved = await saveDocument(payload, editingDocument, isNew);
    if (saved) {
      if (isNew) setSelectedGroupId(payload.id_group);
      setEditingDocument(null);
    }
  };

  const handleDeleteDocument = async () => {
    if (!editingDocument) return;
    await removeDocument(editingDocument);
  };

  const handleQuickDeleteDocument = async (doc: DocumentData) => {
    await removeDocument(doc, `Удалить документ «${doc.name}»?`);
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

  const selectedGroup = groups.find(g => g.id === selectedGroupId);
  const selectedDocuments = documents.filter(d => d.id_group === selectedGroupId);

  const groupEditButton = (group: GroupOption, active: boolean) => (
    <CategoryEdit
      $active={active}
      role="button"
      tabIndex={0}
      title="Переименовать / удалить"
      onClick={(e) => {
        e.stopPropagation();
        handleEditGroup(group);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          handleEditGroup(group);
        }
      }}
    >
      <Pencil />
    </CategoryEdit>
  );

  if (isLoadingDocs) {
    return <Loading />;
  }

  if (docsError) {
    return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{docsError}</Text>;
  }

  return (
    <>
      <BoardToolbar view={view} onViewChange={setView} />

      {view === 'cards' ? (
        <BoardCards
          panelHeader={
            <>
              Категории
              <IconButton onClick={handleAddGroup} aria-label="Добавить категорию">
                <Plus />
              </IconButton>
            </>
          }
          panel={
            <>
              {groups.length === 0 && (
                <EmptyPanel>Нет категорий. Создайте первую.</EmptyPanel>
              )}
              <CategoryList
                activeKey={selectedGroupId}
                items={groups.map(group => ({
                  key: group.id,
                  icon: <Folder />,
                  label: group.name,
                  count: documents.filter(d => d.id_group === group.id).length,
                  onSelect: () => setSelectedGroupId(group.id),
                  extra: groupEditButton(group, selectedGroupId === group.id)
                }))}
              />
            </>
          }
          title={
            <>
              <Folder style={{ width: 22, height: 22 }} />
              {selectedGroup ? selectedGroup.name : 'Документы'}
            </>
          }
          action={
            <ActionButton onClick={handleAddDocument} disabled={!groups.length}>
              <Plus /> Добавить документ
            </ActionButton>
          }
        >
          {groups.length === 0 && (
            <EmptyPanel>Сначала создайте хотя бы одну категорию</EmptyPanel>
          )}

          {groups.length > 0 && selectedDocuments.length === 0 && (
            <EmptyPanel>В этой категории пока нет документов</EmptyPanel>
          )}

          {selectedDocuments.map(doc => (
            <DocCard key={doc.id}>
              <DocCardIcon>
                <FileText />
              </DocCardIcon>
              <DocCardInfo>
                <DocCardName>{doc.name}</DocCardName>
                <DocCardMeta>{doc.src.split('/').pop()}</DocCardMeta>
              </DocCardInfo>
              <DocCardActions>
                <IconLink
                  href={normalizeDocSrc(doc.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Открыть"
                  aria-label="Открыть"
                >
                  <ExternalLink />
                </IconLink>
                <IconButton
                  $tone="gray"
                  onClick={() => handleEditDocument(doc)}
                  title="Редактировать"
                  aria-label="Редактировать"
                >
                  <Pencil />
                </IconButton>
                <IconButton
                  $tone="red"
                  onClick={() => handleQuickDeleteDocument(doc)}
                  title="Удалить"
                  aria-label="Удалить"
                  disabled={isDeleting}
                >
                  <Trash2 />
                </IconButton>
              </DocCardActions>
            </DocCard>
          ))}
        </BoardCards>
      ) : (
        <>
          <SectionCard
            title="Категории"
            action={
              <ActionButton onClick={handleAddGroup}>
                <Plus /> Добавить категорию
              </ActionButton>
            }
          >
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
          </SectionCard>

          <SectionCard
            title="Документы"
            action={
              <ActionButton onClick={handleAddDocument} disabled={groups.length === 0}>
                <Plus /> Добавить документ
              </ActionButton>
            }
          >
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
          </SectionCard>
        </>
      )}

      {editingGroup && (
        <Modal
          title={editingGroup.id ? 'Редактирование категории' : 'Новая категория'}
          onClose={() => setEditingGroup(null)}
          onSave={isSaving || isDeleting ? undefined : handleSaveGroup}
          dirty={isGroupDirty}
        >
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
        </Modal>
      )}

      {editingDocument && (
        <Modal
          title={editingDocument.id ? 'Редактирование документа' : 'Новый документ'}
          onClose={handleCancelDocument}
          onSave={isSaving || isDeleting ? undefined : handleSaveDocument}
          dirty={isDocDirty}
        >
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
        </Modal>
      )}
    </>
  );
};

export default DocumentsManager;
