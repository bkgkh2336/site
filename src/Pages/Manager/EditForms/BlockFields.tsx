import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Plus, Trash2, Upload, X } from 'lucide-react';
import { Input } from '../styled';
import { Field, FieldHint, ActionButton, FileInput } from '../ui';
import RichTextEditor from '../RichTextEditor';
import {
    BLOCK_SCHEMAS, CUSTOM_ICON_NAMES,
    type Block, type FieldDesc
} from '../../../data/customContent';

type Obj = Record<string, unknown>;

const HeaderButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background: #ffffff;
    color: #495057;
    cursor: pointer;

    &:hover {
        background: #e9ecef;
        color: #212529;
    }

    svg {
        width: 14px;
        height: 14px;
    }
`;

const ItemCard = styled.div`
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #fbfcfd;
`;

const ItemHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #868e96;
    cursor: pointer;
    user-select: none;
`;

const ItemTitle = styled.span`
    flex: 1;
    font-weight: 600;
`;

const TextListRow = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
`;

const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 8px;
`;

const GalleryThumb = styled.div`
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e9ecef;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
`;

const GalleryRemove = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 6px;
    background: rgba(220, 53, 69, 0.92);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        width: 13px;
        height: 13px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ced4da;
    font-size: 14px;
    font-family: inherit;
    color: #212529;
    resize: vertical;
    min-height: 60px;

    &:focus {
        outline: none;
        border-color: #28a745;
    }
`;

const Select = styled.select`
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ced4da;
    font-size: 14px;
    font-family: inherit;
    color: #212529;
    background: #ffffff;

    &:focus {
        outline: none;
        border-color: #28a745;
    }
`;

function renderFields(
    fields: FieldDesc[],
    item: Obj,
    onChange: (next: Obj) => void,
    onUpload: (file: File) => Promise<string | null>
): React.ReactNode {
    return fields.map(field => {
        switch (field.kind) {
            case 'text':
                return (
                    <Field key={field.key}>
                        <FieldHint>{field.label}</FieldHint>
                        <Input
                            value={typeof item[field.key] === 'string' ? (item[field.key] as string) : ''}
                            onChange={e => onChange({ ...item, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                        />
                    </Field>
                );
            case 'textarea':
                return (
                    <Field key={field.key}>
                        <FieldHint>{field.label}</FieldHint>
                        <TextArea
                            value={typeof item[field.key] === 'string' ? (item[field.key] as string) : ''}
                            onChange={e => onChange({ ...item, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                        />
                    </Field>
                );
            case 'richtext':
                return (
                    <Field key={field.key}>
                        <FieldHint>{field.label}</FieldHint>
                        <RichTextEditor
                            content={typeof item[field.key] === 'string' ? (item[field.key] as string) : ''}
                            onChange={html => onChange({ ...item, [field.key]: html })}
                            onImageUpload={onUpload}
                        />
                    </Field>
                );
            case 'icon':
                return (
                    <Field key={field.key}>
                        <FieldHint>{field.label}</FieldHint>
                        <Select
                            value={typeof item[field.key] === 'string' ? (item[field.key] as string) : ''}
                            onChange={e => onChange({ ...item, [field.key]: e.target.value || undefined })}
                        >
                            <option value="">— без иконки —</option>
                            {CUSTOM_ICON_NAMES.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </Select>
                    </Field>
                );
            case 'select':
                return (
                    <Field key={field.key}>
                        <FieldHint>{field.label}</FieldHint>
                        <Select
                            value={typeof item[field.key] === 'string' ? (item[field.key] as string) : ''}
                            onChange={e => onChange({ ...item, [field.key]: e.target.value })}
                        >
                            {field.options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </Select>
                    </Field>
                );
            default:
                return null;
        }
    });
}

interface ListFormItemProps {
    title: string;
    fields: FieldDesc[];
    item: Obj;
    onChange: (next: Obj) => void;
    onMove: (delta: number) => void;
    onDelete: () => void;
    onUpload: (file: File) => Promise<string | null>;
    onCleanupFile?: (src: string) => Promise<void>;
}

const ListFormItem: React.FC<ListFormItemProps> = ({
    title,
    fields,
    item,
    onChange,
    onMove,
    onDelete,
    onUpload,
    onCleanupFile
}) => {
    const hasRich = fields.some(f => f.kind === 'richtext');
    const [open, setOpen] = useState(!hasRich);

    return (
        <ItemCard>
            <ItemHeader onClick={() => setOpen(!open)}>
                <ItemTitle>{title}</ItemTitle>
                <HeaderButton
                    type="button"
                    title="Переместить вверх"
                    onClick={e => { e.stopPropagation(); onMove(-1); }}
                >
                    <ArrowUp />
                </HeaderButton>
                <HeaderButton
                    type="button"
                    title="Переместить вниз"
                    onClick={e => { e.stopPropagation(); onMove(1); }}
                >
                    <ArrowDown />
                </HeaderButton>
                <HeaderButton
                    type="button"
                    title="Удалить"
                    onClick={e => { e.stopPropagation(); onDelete(); }}
                >
                    <Trash2 />
                </HeaderButton>
                <HeaderButton
                    type="button"
                    title={open ? 'Свернуть' : 'Развернуть'}
                    onClick={e => { e.stopPropagation(); setOpen(!open); }}
                >
                    {open ? <ChevronUp /> : <ChevronDown />}
                </HeaderButton>
            </ItemHeader>
            {open && (
                <>
                    {renderFieldDefs(fields, item, onChange, onUpload, onCleanupFile)}
                </>
            )}
        </ItemCard>
    );
};

function renderFieldDefs(
    fields: FieldDesc[],
    item: Obj,
    onChange: (next: Obj) => void,
    onUpload: (file: File) => Promise<string | null>,
    onCleanupFile?: (src: string) => Promise<void>
): React.ReactNode {
    return fields.map(field => {
        if (field.kind === 'list') {
            const items = Array.isArray(item[field.key]) ? (item[field.key] as Obj[]) : [];
            return (
                <Field key={field.key}>
                    <FieldHint>{field.label}</FieldHint>
                    {items.map((sub, index) => (
                        <ListFormItem
                            key={index}
                            title={`${field.itemLabel} ${index + 1}`}
                            fields={field.itemFields}
                            item={sub}
                            onChange={next => {
                                const list = [...items];
                                list[index] = next;
                                onChange({ ...item, [field.key]: list });
                            }}
                            onMove={delta => {
                                const target = index + delta;
                                if (target < 0 || target >= items.length) return;
                                const list = [...items];
                                [list[index], list[target]] = [list[target], list[index]];
                                onChange({ ...item, [field.key]: list });
                            }}
                            onDelete={() => onChange({ ...item, [field.key]: items.filter((_, i) => i !== index) })}
                            onUpload={onUpload}
                            onCleanupFile={onCleanupFile}
                        />
                    ))}
                    <ActionButton
                        type="button"
                        $variant="ghost"
                        onClick={() => {
                            const template: Obj = {};
                            for (const sub of field.itemFields) {
                                template[sub.key] = sub.kind === 'list' || sub.kind === 'textlist' || sub.kind === 'gallery'
                                    ? []
                                    : '';
                            }
                            onChange({ ...item, [field.key]: [...items, template] });
                        }}
                    >
                        <Plus /> Добавить: {field.itemLabel.toLowerCase()}
                    </ActionButton>
                </Field>
            );
        }
        if (field.kind === 'textlist') {
            const items = Array.isArray(item[field.key]) ? (item[field.key] as string[]) : [];
            return (
                <Field key={field.key}>
                    <FieldHint>{field.label}{field.hint ? ` — ${field.hint}` : ''}</FieldHint>
                    {items.map((entry, index) => (
                        <TextListRow key={index}>
                            <Input
                                value={entry}
                                onChange={e => {
                                    const next = [...items];
                                    next[index] = e.target.value;
                                    onChange({ ...item, [field.key]: next });
                                }}
                            />
                            <HeaderButton
                                type="button"
                                title="Удалить пункт"
                                onClick={() => onChange({ ...item, [field.key]: items.filter((_, i) => i !== index) })}
                            >
                                <X />
                            </HeaderButton>
                        </TextListRow>
                    ))}
                    <ActionButton
                        type="button"
                        $variant="ghost"
                        onClick={() => onChange({ ...item, [field.key]: [...items, ''] })}
                    >
                        <Plus /> Добавить пункт
                    </ActionButton>
                </Field>
            );
        }
        if (field.kind === 'gallery') {
            const items = Array.isArray(item[field.key]) ? (item[field.key] as { src: string; alt?: string }[]) : [];
            return (
                <Field key={field.key}>
                    <FieldHint>{field.label}</FieldHint>
                    {items.length > 0 && (
                        <GalleryGrid>
                            {items.map((entry, index) => (
                                <GalleryThumb key={`${entry.src}-${index}`}>
                                    <img src={entry.src} alt={entry.alt || ''} />
                                    <GalleryRemove
                                        type="button"
                                        title="Удалить изображение"
                                        aria-label="Удалить изображение"
                                        onClick={() => {
                                            const removed = items[index];
                                            onChange({ ...item, [field.key]: items.filter((_, i) => i !== index) });
                                            if (removed && onCleanupFile) void onCleanupFile(removed.src);
                                        }}
                                    >
                                        <Trash2 />
                                    </GalleryRemove>
                                </GalleryThumb>
                            ))}
                        </GalleryGrid>
                    )}
                    <FileInput
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={e => {
                            const files = e.target.files;
                            if (!files?.length) return;
                            void (async () => {
                                const added: { src: string; alt: string }[] = [];
                                for (const file of Array.from(files)) {
                                    const path = await onUpload(file);
                                    if (path) added.push({ src: path, alt: '' });
                                }
                                if (added.length) {
                                    onChange({ ...item, [field.key]: [...items, ...added] });
                                }
                            })();
                            e.target.value = '';
                        }}
                    />
                    <FieldHint>
                        <Upload style={{ width: 13, height: 13, verticalAlign: -2 }} /> Можно выбрать несколько файлов сразу
                    </FieldHint>
                </Field>
            );
        }
        return renderFields([field], item, onChange, onUpload);
    });
}

interface BlockFieldsProps {
    block: Block;
    onChange: (next: Block) => void;
    onUpload: (file: File) => Promise<string | null>;
    onCleanupFile: (src: string) => Promise<void>;
}

const BlockFields: React.FC<BlockFieldsProps> = ({ block, onChange, onUpload, onCleanupFile }) => {
    const schema = BLOCK_SCHEMAS[block.type];
    if (!schema) return null;
    return (
        <>
            {renderFieldDefs(
                schema.fields,
                block as unknown as Obj,
                next => onChange(next as Block),
                onUpload,
                onCleanupFile
            )}
        </>
    );
};

export default BlockFields;
