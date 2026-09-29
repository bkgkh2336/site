import { Node, mergeAttributes } from '@tiptap/core';

/**
 * Video block node so <video>/<source> HTML survives editing
 * (matches what sanitizeArticleBody() allows in backend/api.php).
 */
export const Video = Node.create({
    name: 'video',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            src: { default: null },
            controls: { default: true },
            width: { default: null },
            poster: { default: null }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'video',
                getAttrs: el => {
                    const video = el as HTMLElement;
                    const src =
                        video.getAttribute('src') ||
                        video.querySelector('source')?.getAttribute('src');
                    if (!src) return false;
                    return {
                        src,
                        controls: video.hasAttribute('controls'),
                        width: video.getAttribute('width'),
                        poster: video.getAttribute('poster')
                    };
                }
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(HTMLAttributes)];
    }
});

export default Video;
