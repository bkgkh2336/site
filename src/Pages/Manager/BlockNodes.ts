import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { BLOCK_SCHEMAS, type Block, type BlockType } from '../../data/customContent';
import { blockSummary } from '../../data/customBody';
import BlockNodeView from './BlockNodeView';

/**
 * Atomic inline struct block: <div data-block="people" data-payload="{…}">.
 * The payload JSON keeps the full Block object, so page renderers receive
 * exactly what was edited. Inside the editor a React node view renders the
 * block with its real page layout; clicks are handled by the host editor.
 */
export const CustomBlock = Node.create({
    name: 'customBlock',
    group: 'block',
    atom: true,
    draggable: true,

    addOptions() {
        return {
            /** Page key (e.g. "news/union_conference") used to pick style variants. */
            pageKey: '' as string
        };
    },

    addAttributes() {
        return {
            blockType: { default: '' },
            payload: { default: '{}' }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-block]',
                getAttrs: el => {
                    const div = el as HTMLElement;
                    const type = div.getAttribute('data-block');
                    if (!type) return false;
                    return {
                        blockType: type,
                        payload: div.getAttribute('data-payload') || '{}'
                    };
                }
            }
        ];
    },

    renderHTML({ node }) {
        let text = BLOCK_SCHEMAS[node.attrs.blockType as BlockType]?.label || node.attrs.blockType;
        try {
            const block = JSON.parse(node.attrs.payload) as Block;
            text = blockSummary(block);
        } catch {
            /* keep label fallback */
        }
        return [
            'div',
            {
                'data-block': node.attrs.blockType,
                'data-payload': node.attrs.payload
            },
            text
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(BlockNodeView);
    }
});

export default CustomBlock;
