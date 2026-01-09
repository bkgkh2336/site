import { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
}

const SEO = ({
    title = 'КЖУП "Буда-Кошелёвский коммунальник"',
    description = 'КЖУП "Буда-Кошелёвский коммунальник" - надежный партнер в сфере жилищно-коммунальных услуг. Вывоз мусора, отопление, водоснабжение, электромонтаж. Диспетчерская служба 115 работает круглосуточно.',
    keywords = 'жкх буда-кошелёво, коммунальные услуги, буда-кошелёвский коммунальник, вывоз мусора, отопление, водоснабжение, служба 115, оплата ерип',
    ogImage = '/logo.png',
    ogType = 'website',
    canonical
}: SEOProps) => {
    useEffect(() => {
        // Обновляем title
        document.title = title;

        // Функция для обновления или создания meta-тега
        const updateMetaTag = (property: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${property}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, property);
                document.head.appendChild(element);
            }
            
            element.setAttribute('content', content);
        };

        // Основные meta-теги
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);
        
        // Open Graph теги
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:type', ogType, true);
        updateMetaTag('og:image', `${window.location.origin}${ogImage}`, true);
        updateMetaTag('og:url', window.location.href, true);
        updateMetaTag('og:site_name', 'КЖУП "Буда-Кошелёвский коммунальник"', true);
        updateMetaTag('og:locale', 'ru_RU', true);

        // Twitter Card теги
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', `${window.location.origin}${ogImage}`);

        // Дополнительные SEO теги
        updateMetaTag('robots', 'index, follow');
        updateMetaTag('author', 'КЖУП "Буда-Кошелёвский коммунальник"');
        updateMetaTag('language', 'Russian');

        // Canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonical || window.location.href;

    }, [title, description, keywords, ogImage, ogType, canonical]);

    return null;
};

export default SEO;