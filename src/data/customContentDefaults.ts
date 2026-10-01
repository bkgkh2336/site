import type { Block } from './customContent';
import { CUSTOM_PAGE_BLOCK_TYPES } from './customContent';
import { bodyToBlocks } from './customBody';

/**
 * Parses the `custom_content` JSON column of an article into blocks.
 * Returns [] when the column is empty or malformed.
 */
export const getCustomContent = (json: string | null | undefined): Block[] => {
    if (json) {
        try {
            const parsed = JSON.parse(json);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed as Block[];
        } catch {
            /* invalid json — treat as empty */
        }
    }
    return [];
};

/**
 * Content source for custom-layout pages: saved article body HTML first,
 * custom_content JSON (blocks edited in the admin) next.
 */
export const getArticleBlocks = (
    article: { body?: string | null; custom_content?: string | null },
    key: string
): Block[] => {
    if (article.body && article.body.trim()) {
        return bodyToBlocks(article.body, CUSTOM_PAGE_BLOCK_TYPES[key] || []);
    }
    return getCustomContent(article.custom_content);
};
