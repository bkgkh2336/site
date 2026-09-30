import { type Block, type BlockType } from './customContent';

/**
 * Helpers to store custom-page content as regular article body HTML:
 * - plain text flow is native TipTap markup (<p>, <h2>, <blockquote>, lists…)
 * - structural blocks (people, agenda, galleries, stats…) live inline as
 *   atomic <div data-block data-payload="json"> elements and are edited
 *   through a click-to-edit modal.
 */

export interface BlockApi {
    update: (next: Block) => void;
    remove: () => void;
}

const stripTags = (html: string): string => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const plural = (n: number, forms: [string, string, string]): string => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
    return forms[2];
};

const snippet = (html: string): string => {
    const text = stripTags(html);
    return text.length > 70 ? `${text.slice(0, 70)}…` : text;
};

export const blockSummary = (block: Block): string => {
    switch (block.type) {
        case 'paragraph': return snippet(block.html) || 'текст';
        case 'heading': return block.text || 'заголовок';
        case 'intro': return snippet(block.html) || 'вступление';
        case 'quote': return snippet(block.html) || 'цитата';
        case 'warning': return snippet(block.html) || 'предупреждение';
        case 'card': return block.title || snippet(block.html) || 'карточка';
        case 'link': return block.text || block.href || 'ссылка';
        case 'gallery': {
            const n = block.items.length;
            return `${n} ${plural(n, ['фото', 'фото', 'фото'])}`;
        }
        case 'people': {
            const n = block.items.length;
            return `${n} ${plural(n, ['участник', 'участника', 'участников'])}`;
        }
        case 'agenda': {
            const n = block.items.length;
            return `${n} ${plural(n, ['пункт', 'пункта', 'пунктов'])}`;
        }
        case 'cards': {
            const n = block.items.length;
            return `${n} ${plural(n, ['карточка', 'карточки', 'карточек'])}`;
        }
        case 'list': {
            const n = block.items.length;
            return `${n} ${plural(n, ['элемент', 'элемента', 'элементов'])}`;
        }
        case 'steps': {
            const n = block.items.length;
            return `${n} ${plural(n, ['шаг', 'шага', 'шагов'])}`;
        }
        case 'stats': {
            const n = block.items.length;
            return `${n} ${plural(n, ['показатель', 'показателя', 'показателей'])}`;
        }
        case 'info': {
            const n = block.items.length;
            return `${n} ${plural(n, ['строка', 'строки', 'строк'])}`;
        }
        case 'author': {
            const n = block.lines.length;
            return `${n} ${plural(n, ['строка', 'строки', 'строк'])}`;
        }
        case 'final': {
            const n = block.paragraphs.length;
            return `${n} ${plural(n, ['абзац', 'абзаца', 'абзацев'])}`;
        }
    }
};

/**
 * Serialize blocks into body HTML for the WYSIWYG editor.
 * Paragraphs stay native; every other block becomes an atomic div.
 */
export const blocksToBodyHtml = (blocks: Block[]): string => {
    if (typeof document === 'undefined') return '';
    let out = '';
    for (const block of blocks) {
        if (block.type === 'paragraph') {
            const html = block.html.trim();
            if (!html) continue;
            const isElement = /^<(p|h[1-6]|ul|ol|table|blockquote|hr|div|figure|video|pre)\b/i.test(html);
            out += (isElement ? html : `<p>${html}</p>`) + '\n';
            continue;
        }
        const div = document.createElement('div');
        div.setAttribute('data-block', block.type);
        div.setAttribute('data-payload', JSON.stringify(block));
        div.className = 'kb-atom';
        div.textContent = blockSummary(block);
        out += div.outerHTML + '\n';
    }
    return out;
};

/** Extract the Block from a <div data-block data-payload> atom, null if broken. */
const atomFromElement = (el: HTMLElement): Block | null => {
    if (!el.dataset || !el.dataset.block) return null;
    try {
        const parsed = JSON.parse(el.dataset.payload || '') as Block;
        if (parsed && typeof parsed.type === 'string') return parsed;
    } catch {
        // broken payload — drop
    }
    return null;
};

/**
 * Split body HTML into sequential parts: plain HTML segments (rendered by
 * articleBodyCss) and structural atoms (rendered by BlocksView). Lets any
 * article page mix native rich text with special blocks.
 */
export interface BodyPart {
    html?: string;
    block?: Block;
}

export const splitBodyHtml = (html: string): BodyPart[] => {
    if (!html || html.trim() === '' || typeof DOMParser === 'undefined') return [];
    const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
    const parts: BodyPart[] = [];
    let buf = '';
    const flush = () => {
        if (buf) {
            parts.push({ html: buf });
            buf = '';
        }
    };
    for (const node of Array.from(doc.body.childNodes)) {
        if (node.nodeType === 1) {
            const block = atomFromElement(node as HTMLElement);
            if (block) {
                flush();
                parts.push({ block });
                continue;
            }
        }
        if (node.nodeType === 3 && !(node.textContent || '').trim()) continue;
        const holder = doc.createElement('div');
        holder.appendChild(node.cloneNode(true));
        buf += holder.innerHTML;
    }
    flush();
    return parts;
};

/**
 * Parse body HTML back into blocks (page rendering input).
 * Native rich text maps to text blocks; structural blocks come from atoms.
 */
export const bodyToBlocks = (html: string, allowed: BlockType[]): Block[] => {
    if (!html || html.trim() === '' || typeof DOMParser === 'undefined') return [];
    const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
    const out: Block[] = [];
    const isAllowed = (t: string): t is BlockType => (allowed as string[]).includes(t);

    for (const node of Array.from(doc.body.childNodes)) {
        if (node.nodeType === 3) {
            const text = (node.textContent || '').trim();
            if (text) {
                const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                out.push({ type: 'paragraph', html: `<p>${safe}</p>` });
            }
            continue;
        }
        if (node.nodeType !== 1) continue;
        const el = node as HTMLElement;

        const atom = atomFromElement(el);
        if (atom) {
            out.push(atom);
            continue;
        }

        const tag = el.tagName.toLowerCase();
        if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
            if (isAllowed('heading')) {
                out.push({ type: 'heading', text: (el.textContent || '').trim() });
                continue;
            }
        } else if (tag === 'blockquote') {
            if (isAllowed('quote')) {
                out.push({ type: 'quote', html: el.innerHTML });
                continue;
            }
        }

        out.push({ type: 'paragraph', html: el.outerHTML });
    }

    return out;
};
