import { useEffect, useState } from 'react';
import type { ArticleData, ArticleSection } from './articles';

/**
 * Loads a single article by section+slug from the API.
 * Used by custom (code-defined) article pages for their metadata.
 */
export const useArticle = (section: ArticleSection, slug: string) => {
    const [article, setArticle] = useState<ArticleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!section || !slug) {
            setArticle(null);
            setIsLoading(false);
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                const response = await fetch('/backend/api.php/api/articles');
                const all: ArticleData[] = await response.json();
                if (!cancelled) {
                    setArticle(all.find(a => a.section === section && a.slug === slug) || null);
                }
            } catch (err) {
                console.error('Article load error:', err);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [section, slug]);

    return { article, isLoading };
};
