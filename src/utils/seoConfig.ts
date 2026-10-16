import seoData from '../data/seoConfig.json';

export interface SEOConfig {
    title: string;
    description: string;
    keywords: string;
}

// Данные лежат в src/data/seoConfig.json — это единый источник мета-тегов:
// его импортирует фронтенд (SEO-компонент при клиентской навигации) и читает
// backend seo.php (серверная подстановка мета в каркас index.html).
export const seoConfigs: Record<string, SEOConfig> = seoData;
