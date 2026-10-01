import React, { useState, useEffect, useMemo } from 'react';
import { Wind, Zap, Flame, Droplets, Wrench, Trash2, Trees, Truck, Search, Plus, Pencil, X, Save } from 'lucide-react';
import Text from '../../Components/Text/Text';
import Loading from '../../Components/Loading/Loading';
import { Input } from './styled';
import {
  Card, SectionHeader, SectionTitle, ActionButton, ModalActions,
  Table, Th, Td, Tr, IconButton,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton,
  Field, FieldLabel, ToolbarRow,
  BoardView, CategoryPanel, CategoryPanelHeader, CategoryItem, CategoryName, CategoryCount,
  BoardMain, EmptyPanel
} from './ui';

type Row = Record<string, string | number | null>;

interface FieldSpec {
  key: string;
  label: string;
  kind: 'text' | 'number' | 'ref';
  required?: boolean;
}

interface TableSpec {
  name: string;
  title: string;
  fields: FieldSpec[];
  refTable?: string;
}

interface SectionSpec {
  key: string;
  label: string;
  icon: React.ReactNode;
  tables: TableSpec[];
}

const nameField: FieldSpec = { key: 'name', label: 'Наименование', kind: 'text', required: true };

const simpleSection = (
  key: string,
  label: string,
  icon: React.ReactNode,
  table: string,
  fields: FieldSpec[]
): SectionSpec => ({
  key,
  label,
  icon,
  tables: [{ name: table, title: 'Услуги и цены', fields }]
});

const transportSection = (
  key: string,
  label: string,
  parentTable: string,
  priceTable: string,
  priceKey: string,
  priceLabel: string
): SectionSpec => ({
  key,
  label,
  icon: <Truck />,
  tables: [
    { name: parentTable, title: 'Услуги', fields: [nameField] },
    {
      name: priceTable,
      title: 'Тарифы',
      refTable: parentTable,
      fields: [
        { key: 'id_transport', label: 'Услуга', kind: 'ref', required: true },
        { key: 'unit', label: 'Ед. изм.', kind: 'text', required: true },
        { key: priceKey, label: priceLabel, kind: 'number', required: true }
      ]
    }
  ]
});

const SECTIONS: SectionSpec[] = [
  simpleSection('ventilation', 'Вентиляция и дымоходы', <Wind />, 'ventilation_services', [
    nameField,
    { key: 'price_no_nds', label: 'Цена без НДС', kind: 'number', required: true }
  ]),
  simpleSection('electro', 'Электроизмерения', <Zap />, 'electro_services', [
    nameField,
    { key: 'price_no_nds', label: 'Цена без НДС', kind: 'number', required: true }
  ]),
  simpleSection('heating', 'Отопление', <Flame />, 'heating_services', [
    nameField,
    { key: 'unit', label: 'Ед. изм.', kind: 'text', required: true },
    { key: 'price_no_nds', label: 'Цена без НДС', kind: 'number', required: true }
  ]),
  simpleSection('plumbing', 'Водопровод и канализация', <Droplets />, 'plumbing_services', [
    nameField,
    { key: 'unit', label: 'Ед. изм.', kind: 'text', required: true },
    { key: 'price_no_nds', label: 'Цена без НДС', kind: 'number', required: true }
  ]),
  simpleSection('el_inst', 'Электромонтаж', <Wrench />, 'el_inst_services', [
    nameField,
    { key: 'unit', label: 'Ед. изм.', kind: 'text', required: true },
    { key: 'price_no_nds', label: 'Цена без НДС', kind: 'number', required: true }
  ]),
  simpleSection('waste', 'Вывоз мусора', <Trash2 />, 'waste_services', [
    nameField,
    { key: 'price_no_dns_summer', label: 'Летний период (без НДС)', kind: 'number', required: true },
    { key: 'price_no_dns_winter', label: 'Зимний период (без НДС)', kind: 'number', required: true }
  ]),
  simpleSection('grass', 'Скашивание травы', <Trees />, 'grass_services', [
    nameField,
    { key: 'price_no_nds_is_solid', label: 'Сплошной газон (без НДС)', kind: 'number', required: true },
    { key: 'price_no_nds_no_solid', label: 'Комбинированный газон (без НДС)', kind: 'number', required: true }
  ]),
  transportSection('transport_population', 'Транспорт: население и бюджет',
    'transport_population_and_budget', 'transport_price_population_and_budget',
    'price_no_nds', 'Цена без НДС'),
  transportSection('transport_jur', 'Транспорт: юрлица',
    'transport_jur', 'transport_price_jur', 'price', 'Цена'),
  transportSection('transport_other', 'Транспорт: прочее',
    'transport_other', 'transport_price_other', 'price', 'Цена')
];

const TABLE_NAMES = SECTIONS.flatMap(section => section.tables.map(t => t.name));

const findTable = (name: string): TableSpec | undefined => {
  for (const section of SECTIONS) {
    for (const table of section.tables) {
      if (table.name === name) return table;
    }
  }
  return undefined;
};

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

interface EditingState {
  table: string;
  row: Row;
  isNew: boolean;
}

const ServicesManager: React.FC = () => {
  const [data, setData] = useState<Record<string, Row[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeKey, setActiveKey] = useState(SECTIONS[0].key);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const entries = await Promise.all(TABLE_NAMES.map(async name => {
          const res = await fetch(`/backend/api.php/api/${name}`);
          if (!res.ok) throw new Error(`Ошибка загрузки ${name}`);
          const raw: Row[] = await res.json();
          const spec = findTable(name);
          const rows = raw.map(row => {
            const next: Row = { ...row, id: row.id == null ? null : Number(row.id) };
            for (const field of spec?.fields ?? []) {
              if (field.kind === 'ref' && next[field.key] != null) {
                next[field.key] = Number(next[field.key]);
              }
            }
            return next;
          });
          return [name, rows] as const;
        }));
        setData(Object.fromEntries(entries));
        setError('');
      } catch (err) {
        console.error('Services load error:', err);
        setError('Не удалось загрузить тарифы');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSessionExpired = (status: number) => {
    if (status === 401) {
      alert('Сессия истекла. Пожалуйста, войдите снова.');
      window.location.href = '/manager';
      return true;
    }
    return false;
  };

  const activeSection = useMemo(
    () => SECTIONS.find(s => s.key === activeKey) ?? SECTIONS[0],
    [activeKey]
  );

  const matchesQuery = (row: Row, q: string) =>
    Object.values(row).some(value => String(value ?? '').toLowerCase().includes(q));

  const refName = (table: TableSpec, value: string | number | null) => {
    if (!table.refTable) return String(value ?? '');
    const parent = (data[table.refTable] || []).find(r => r.id === Number(value));
    return parent ? String(parent.name ?? `#${value}`) : `#${value}`;
  };

  const renderCell = (table: TableSpec, field: FieldSpec, row: Row) => {
    const value = row[field.key];
    if (field.kind === 'ref') return refName(table, value);
    if (field.kind === 'number') {
      const n = Number(value);
      return Number.isFinite(n) ? n.toLocaleString('ru-RU', { maximumFractionDigits: 4 }) : String(value ?? '');
    }
    return String(value ?? '');
  };

  const openAdd = (table: TableSpec) => {
    const initial: Record<string, string> = {};
    for (const field of table.fields) {
      if (field.kind === 'ref' && table.refTable) {
        const parents = data[table.refTable] || [];
        initial[field.key] = parents.length ? String(parents[0].id) : '';
      } else {
        initial[field.key] = '';
      }
    }
    setForm(initial);
    setEditing({ table: table.name, row: {}, isNew: true });
  };

  const openEdit = (table: TableSpec, row: Row) => {
    const initial: Record<string, string> = {};
    for (const field of table.fields) {
      initial[field.key] = row[field.key] == null ? '' : String(row[field.key]);
    }
    setForm(initial);
    setEditing({ table: table.name, row, isNew: false });
  };

  const handleSave = async () => {
    if (!editing) return;
    const table = findTable(editing.table);
    if (!table) return;

    const payload: Record<string, string | number> = {};
    for (const field of table.fields) {
      const raw = (form[field.key] ?? '').trim();
      if (field.kind === 'number') {
        const n = Number(raw.replace(',', '.'));
        if (raw === '' || !Number.isFinite(n)) {
          alert(`«${field.label}»: введите число`);
          return;
        }
        payload[field.key] = n;
      } else if (field.kind === 'ref') {
        if (raw === '') {
          alert(`Выберите «${field.label}»`);
          return;
        }
        payload[field.key] = Number(raw);
      } else {
        if (field.required && raw === '') {
          alert(`Заполните «${field.label}»`);
          return;
        }
        payload[field.key] = raw;
      }
    }

    setIsSaving(true);
    try {
      const url = editing.isNew
        ? `/backend/api.php/api/${table.name}`
        : `/backend/api.php/api/${table.name}/${editing.row.id}`;
      const res = await fetch(url, {
        method: editing.isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const text = await res.text();
        if (handleSessionExpired(res.status)) return;
        alert(`Ошибка сохранения: ${res.status} ${text}`);
        return;
      }
      const out = await res.json();
      setData(prev => {
        const rows = [...(prev[table.name] || [])];
        if (editing.isNew) {
          rows.push({ ...payload, id: Number(out.id) });
        } else {
          const index = rows.findIndex(r => r.id === editing.row.id);
          if (index >= 0) rows[index] = { ...rows[index], ...payload };
        }
        return { ...prev, [table.name]: rows };
      });
      setEditing(null);
    } catch (err) {
      console.error('Services save error:', err);
      alert('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRow = async (table: TableSpec, row: Row) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/backend/api.php/api/${table.name}/${row.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok && handleSessionExpired(res.status)) return;
      if (!res.ok) {
        alert(`Ошибка удаления: ${res.status}`);
        return;
      }
      const deletedId = Number(row.id);
      setData(prev => {
        const next: Record<string, Row[]> = {
          ...prev,
          [table.name]: (prev[table.name] || []).filter(r => Number(r.id) !== deletedId)
        };
        for (const section of SECTIONS) {
          for (const spec of section.tables) {
            if (spec.refTable === table.name) {
              next[spec.name] = (next[spec.name] || []).filter(r => Number(r.id_transport) !== deletedId);
            }
          }
        }
        return next;
      });
      setEditing(null);
    } catch (err) {
      console.error('Services delete error:', err);
      alert('Ошибка при удалении');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = async () => {
    if (!editing || editing.isNew) return;
    const table = findTable(editing.table);
    if (!table) return;
    if (!window.confirm('Удалить запись?')) return;
    await deleteRow(table, editing.row);
  };

  const handleQuickDelete = async (table: TableSpec, row: Row) => {
    const label = String(row.name ?? row.id);
    if (!window.confirm(`Удалить «${label}»?`)) return;
    await deleteRow(table, row);
  };

  const editingTable = editing ? findTable(editing.table) : undefined;

  if (isLoading) return <Loading />;

  if (error) {
    return <Text style={{ color: '#dc3545', textAlign: 'center' }}>{error}</Text>;
  }

  const q = query.trim().toLowerCase();

  return (
    <>
      <ToolbarRow>
        <div style={{ position: 'relative', width: 320, maxWidth: '100%' }}>
          <Search
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 18, height: 18, color: '#6c757d', pointerEvents: 'none'
            }}
          />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по разделу..."
            style={{ paddingLeft: 38 }}
            aria-label="Поиск по разделу"
          />
        </div>
      </ToolbarRow>

      <BoardView>
        <CategoryPanel>
          <CategoryPanelHeader>Разделы</CategoryPanelHeader>
          {SECTIONS.map(section => {
            const active = activeKey === section.key;
            const count = (data[section.tables[0].name] || []).length;
            return (
              <CategoryItem
                key={section.key}
                $active={active}
                onClick={() => {
                  setActiveKey(section.key);
                  setQuery('');
                }}
              >
                {section.icon}
                <CategoryName>{section.label}</CategoryName>
                <CategoryCount $active={active}>{count}</CategoryCount>
              </CategoryItem>
            );
          })}
        </CategoryPanel>

        <BoardMain>
          <SectionHeader>
            <SectionTitle>
              {activeSection.icon}
              {activeSection.label}
            </SectionTitle>
          </SectionHeader>

          {activeSection.tables.map(table => {
            const rows = data[table.name] || [];
            const parents = table.refTable ? (data[table.refTable] || []) : null;
            const filtered = q ? rows.filter(row => matchesQuery(row, q)) : rows;
            const canAdd = !table.refTable || (parents !== null && parents.length > 0);

            return (
              <Card key={table.name}>
                <SectionHeader>
                  <SectionTitle style={{ fontSize: 17 }}>
                    {table.title}
                    <span style={{ fontSize: 14, fontWeight: 500, color: '#6c757d' }}>
                      {q ? `${filtered.length} из ${rows.length}` : rows.length}
                    </span>
                  </SectionTitle>
                  <ActionButton onClick={() => openAdd(table)} disabled={!canAdd || isSaving}>
                    <Plus /> Добавить
                  </ActionButton>
                </SectionHeader>

                {rows.length === 0 && (
                  <EmptyPanel>
                    {table.refTable ? 'Нет услуг. Сначала добавьте услугу в списке выше.' : 'Пока нет записей'}
                  </EmptyPanel>
                )}
                {rows.length > 0 && filtered.length === 0 && (
                  <EmptyPanel>Ничего не найдено</EmptyPanel>
                )}

                {filtered.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        {table.fields.map(field => (
                          <Th key={field.key}>{field.label}</Th>
                        ))}
                        <Th style={{ width: 90 }}></Th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(row => (
                        <Tr key={String(row.id)}>
                          {table.fields.map(field => (
                            <Td key={field.key}>{renderCell(table, field, row)}</Td>
                          ))}
                          <Td>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <IconButton
                                $tone="gray"
                                onClick={() => openEdit(table, row)}
                                title="Редактировать"
                                aria-label="Редактировать"
                              >
                                <Pencil />
                              </IconButton>
                              <IconButton
                                $tone="red"
                                onClick={() => handleQuickDelete(table, row)}
                                title="Удалить"
                                aria-label="Удалить"
                                disabled={isDeleting}
                              >
                                <Trash2 />
                              </IconButton>
                            </div>
                          </Td>
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card>
            );
          })}
        </BoardMain>
      </BoardView>

      {editing && editingTable && (
        <ModalOverlay onClick={e => e.target === e.currentTarget && setEditing(null)}>
          <ModalContent>
            <ModalHeader>
              {editing.isNew ? 'Новая запись' : 'Редактирование записи'}
              <CloseButton onClick={() => setEditing(null)} aria-label="Закрыть">
                <X />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {editingTable.fields.map(field => {
                  if (field.kind === 'ref') {
                    const parents = editingTable.refTable ? (data[editingTable.refTable] || []) : [];
                    return (
                      <Field key={field.key}>
                        <FieldLabel>{field.label}:</FieldLabel>
                        <select
                          style={selectStyle}
                          value={form[field.key] ?? ''}
                          onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        >
                          <option value="" disabled>Выберите услугу</option>
                          {parents.map(parent => (
                            <option key={String(parent.id)} value={String(parent.id)}>
                              {String(parent.name)}
                            </option>
                          ))}
                        </select>
                      </Field>
                    );
                  }
                  if (field.kind === 'number') {
                    return (
                      <Field key={field.key}>
                        <FieldLabel>{field.label}:</FieldLabel>
                        <Input
                          value={form[field.key] ?? ''}
                          onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                          inputMode="decimal"
                          placeholder="0.00"
                        />
                      </Field>
                    );
                  }
                  return (
                    <Field key={field.key}>
                      <FieldLabel>{field.label}:</FieldLabel>
                      <Input
                        value={form[field.key] ?? ''}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.label}
                      />
                    </Field>
                  );
                })}

                <ModalActions>
                  <ActionButton onClick={handleSave} disabled={isSaving || isDeleting}>
                    <Save />
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                  </ActionButton>
                  <ActionButton
                    $variant="secondary"
                    onClick={() => setEditing(null)}
                    disabled={isSaving || isDeleting}
                  >
                    <X /> Отмена
                  </ActionButton>
                  {!editing.isNew && (
                    <ActionButton $variant="danger" onClick={handleDelete} disabled={isSaving || isDeleting}>
                      <Trash2 />
                      {isDeleting ? 'Удаление...' : 'Удалить'}
                    </ActionButton>
                  )}
                </ModalActions>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ServicesManager;
