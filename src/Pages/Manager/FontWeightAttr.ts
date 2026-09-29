import { Extension } from '@tiptap/core';

/**
 * Preserves `font-weight` inside <span style="..."> (same mechanism as Color),
 * e.g. green bold words in pomogut_by body.
 */
export const FontWeight = Extension.create({
    name: 'fontWeight',
    addOptions() {
        return { types: ['textStyle'] };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontWeight: {
                        default: null,
                        parseHTML: (element: HTMLElement) =>
                            (element as HTMLElement).style?.fontWeight || null,
                        renderHTML: (attributes: { fontWeight?: string | null }) => {
                            if (!attributes.fontWeight) return {};
                            return { style: `font-weight: ${attributes.fontWeight}` };
                        }
                    }
                }
            }
        ];
    }
});

export default FontWeight;
