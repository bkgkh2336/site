import { useEffect } from 'react';

const StructuredData = () => {
    useEffect(() => {
        // Организация
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "GovernmentOrganization",
            "name": "КЖУП \"Буда-Кошелёвский коммунальник\"",
            "description": "Коммунальное жилищное унитарное предприятие \"Буда-Кошелёвский коммунальник\"",
            "url": "https://bkgkh.by",
            "logo": "https://bkgkh.by/logo.png",
            "image": "https://bkgkh.by/main.png",
            "telephone": "+375233674507",
            "email": "koup@budakosh.by",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Ленина",
                "addressLocality": "Буда-Кошелёво",
                "addressRegion": "Гомельская область",
                "addressCountry": "BY"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "52.716389",
                "longitude": "30.563611"
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "17:00"
                }
            ],
            "areaServed": {
                "@type": "City",
                "name": "Буда-Кошелёво"
            },
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": "+375233674507",
                    "contactType": "customer service",
                    "availableLanguage": ["Russian", "Belarusian"]
                },
                {
                    "@type": "ContactPoint",
                    "telephone": "115",
                    "contactType": "emergency",
                    "availableLanguage": ["Russian", "Belarusian"],
                    "hoursAvailable": {
                        "@type": "OpeningHoursSpecification",
                        "opens": "00:00",
                        "closes": "23:59"
                    }
                }
            ],
            "sameAs": []
        };

        // Хлебные крошки
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Главная",
                    "item": "https://bkgkh.by"
                }
            ]
        };

        // Веб-сайт
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "КЖУП \"Буда-Кошелёвский коммунальник\"",
            "url": "https://bkgkh.by",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bkgkh.by/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };

        // Добавляем все схемы в head
        const addStructuredData = (schema: object, id: string) => {
            let script = document.getElementById(id) as HTMLScriptElement;
            if (!script) {
                script = document.createElement('script');
                script.id = id;
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            script.textContent = JSON.stringify(schema);
        };

        addStructuredData(organizationSchema, 'organization-schema');
        addStructuredData(breadcrumbSchema, 'breadcrumb-schema');
        addStructuredData(websiteSchema, 'website-schema');

    }, []);

    return null;
};

export default StructuredData;