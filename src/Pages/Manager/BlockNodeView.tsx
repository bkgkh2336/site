import React from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import BlocksView from '../News/Blocks/BlocksView';
import type { Block } from '../../data/customContent';

const parsePayload = (payload: string): Block | null => {
    try {
        const parsed = JSON.parse(payload) as Block;
        if (parsed && typeof parsed.type === 'string') return parsed;
    } catch {
        /* broken payload */
    }
    return null;
};

const pageKeyOf = (editor: NodeViewProps['editor']): string | undefined => {
    const ext = editor.extensionManager.extensions.find(e => e.name === 'customBlock');
    const options = ext?.options as { pageKey?: string } | undefined;
    return options?.pageKey || undefined;
};

/**
 * Renders a structural block inside the WYSIWYG exactly the way the public
 * page renders it (same BlocksView), so editors see the real block layout.
 */
const BlockNodeView: React.FC<NodeViewProps> = ({ node, editor, selected }) => {
    const block = parsePayload(node.attrs.payload);
    if (!block) {
        return (
            <NodeViewWrapper className="kb-block-node kb-block-node--broken">
                Некорректный блок — кликните, чтобы удалить
            </NodeViewWrapper>
        );
    }
    return (
        <NodeViewWrapper
            className={selected ? 'kb-block-node is-selected' : 'kb-block-node'}
            data-block-view={block.type}
        >
            <BlocksView blocks={[block]} pageKey={pageKeyOf(editor)} />
        </NodeViewWrapper>
    );
};

export default BlockNodeView;
