export type ArticleSection = 'news' | 'articles' | 'useful_to_know';

export interface ArticleGalleryItem {
    src: string;
    alt?: string;
}

export interface ArticleData {
    id: number;
    section: ArticleSection;
    slug: string;
    title: string;
    summary: string | null;
    published_at: string | null;
    cover: string | null;
    gallery: string | null;
    body: string | null;
    custom_content: string | null;
    is_external: number;
    external_url: string | null;
    sort_order: number;
}

export const SECTION_LABELS: Record<ArticleSection, string> = {
    news: 'Новости',
    articles: 'Статьи',
    useful_to_know: 'Полезно знать'
};

export const SECTION_FEED_PATHS: Record<ArticleSection, string> = {
    news: '/news',
    articles: '/news/articles',
    useful_to_know: '/news/useful_to_know'
};

/**
 * Articles whose page layout lives in code (React components).
 * Only metadata (title, date, cover, gallery) is editable in the admin.
 */
export const CUSTOM_ARTICLE_KEYS = new Set<string>([
    'news/union_conference',
    'news/cleanup_day',
    'news/unified_safety_day',
    'news/safety_day_passed',
    'articles/boiler_maintenance',
    'articles/attractions_safety',
    'articles/autonomous_fire_detectors'
]);

export const isCustomArticle = (section: string, slug: string) =>
    CUSTOM_ARTICLE_KEYS.has(`${section}/${slug}`);

export const articlePath = (section: ArticleSection, slug: string) => {
    const base = SECTION_FEED_PATHS[section];
    return slug ? `${base}/${slug}` : base;
};

export const parseGallery = (gallery: string | null): ArticleGalleryItem[] => {
    if (!gallery) return [];
    try {
        const parsed = JSON.parse(gallery);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

/** 'YYYY-MM-DD' | 'YYYY-MM-DD HH:MM' -> 'DD.MM.YYYY [HH:MM]' */
export const formatArticleDate = (value: string | null, withTime = false): string => {
    if (!value) return '';
    const [datePart, timePart] = value.split(' ');
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart || '');
    if (!m) return value;
    const out = `${m[3]}.${m[2]}.${m[1]}`;
    return withTime && timePart ? `${out} ${timePart}` : out;
};

/** Sort key for feeds: DD.MM.YYYY [HH:MM] -> timestamp (0 when unknown) */
export const feedDateValue = (dateStr: string): number => {
    const [date, time] = dateStr.split(' ');
    const [d, m, y] = date.split('.').map(Number);
    if (!d || !m || !y) return 0;
    const [hh, mm] = (time || '00:00').split(':').map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0).getTime();
};

const TRANSLIT: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
};

export const slugify = (title: string): string =>
    title
        .toLowerCase()
        .split('')
        .map(ch => (ch in TRANSLIT ? TRANSLIT[ch] : ch))
        .join('')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 80);
