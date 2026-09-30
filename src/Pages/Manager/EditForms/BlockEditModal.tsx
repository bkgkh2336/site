import React from 'react';
import styled from 'styled-components';
import { Save, Trash2, X } from 'lucide-react';
import { ActionButton } from '../ui';
import BlockFields from './BlockFields';
import { BLOCK_SCHEMAS, type Block } from '../../../data/customContent';

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(15, 23, 42, 0.45);
`;

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(760px, 100%);
    max-height: 86vh;
    overflow-y: auto;
    padding: 18px;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #212529;

    span {
        font-size: 12px;
        font-weight: 600;
        color: #0c5c2f;
        background: #e7f3e9;
        border: 1px solid #b7e0c3;
        border-radius: 999px;
        padding: 2px 8px;
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }
`;

const Footer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding-top: 4px;
    border-top: 1px solid #eef1f4;

    > :last-child {
        margin-left: auto;
    }
`;

const Hint = styled.p`
    margin: 0;
    font-size: 13px;
    color: #868e96;
`;

interface BlockEditModalProps {
    block: Block;
    onChange: (next: Block) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onUpload: (file: File) => Promise<string | null>;
    onCleanupFile: (src: string) => Promise<void>;
}

const BlockEditModal: React.FC<BlockEditModalProps> = ({
    block,
    onChange,
    onSave,
    onCancel,
    onDelete,
    onUpload,
    onCleanupFile
}) => {
    const schema = BLOCK_SCHEMAS[block.type];
    return (
        <Overlay onMouseDown={e => { if (e.target === e.currentTarget) onCancel(); }}>
            <Panel role="dialog" aria-modal="true" aria-label={schema?.label || 'Редактирование блока'}>
                <Title>
                    {schema?.label || block.type}
                    <span>спец-блок</span>
                </Title>
                <Hint>
                    Изменения попадут в текст статьи сразу после «Сохранить».
                    Порядок блоков меняется обычным выделением и переносом курсором.
                </Hint>
                <BlockFields
                    block={block}
                    onChange={onChange}
                    onUpload={onUpload}
                    onCleanupFile={onCleanupFile}
                />
                <Footer>
                    <ActionButton $variant="danger" type="button" onClick={onDelete}>
                        <Trash2 /> Удалить блок
                    </ActionButton>
                    <ActionButton $variant="secondary" type="button" onClick={onCancel}>
                        <X /> Отмена
                    </ActionButton>
                    <ActionButton type="button" onClick={onSave}>
                        <Save /> Сохранить блок
                    </ActionButton>
                </Footer>
            </Panel>
        </Overlay>
    );
};

export default BlockEditModal;
