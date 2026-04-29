export type Language = 'ru' | 'be' | 'en';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (config: {
            pageLanguage: string;
            includedLanguages: string;
            layout: unknown;
          }, elementId: string): unknown;
          InlineLayout: { SIMPLE: unknown };
        };
      };
    };
  }
}

const GOOGLE_TRANSLATE_CONTAINER_ID = 'google_translate_element';

let translateInitPromise: Promise<void> | null = null;

export const getCurrentLanguage = (): Language => {
    // Проверяем cookie Google Translate
    const match = document.cookie.match(/googtrans=\/ru\/([a-z]{2})/);
    if (match) {
        const lang = match[1];
        if (lang === 'be' || lang === 'en') {
            console.log('[GoogleTranslate] Language from cookie:', lang);
            return lang as Language;
        }
    }

    // Fallback на localStorage
    try {
        const stored = localStorage.getItem('google-translate-lang');
        if (stored === 'be' || stored === 'en') {
            console.log('[GoogleTranslate] Language from localStorage:', stored);
            return stored as Language;
        }
    } catch (e) {
        console.error('Error reading language from localStorage:', e);
    }

    console.log('[GoogleTranslate] Default language: ru');
    return 'ru';
};

const clearGoogTransCookie = () => {
    const domain = window.location.hostname;
    const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = `googtrans=; ${expires}; path=/;`;
    document.cookie = `googtrans=; ${expires}; path=/; domain=${domain}`;
    document.cookie = `googtrans=; ${expires}; path=/; domain=.${domain}`;
};

export const setLanguage = async (lang: Language) => {
    localStorage.setItem('google-translate-lang', lang);

    // Ждем инициализации виджета
    if (translateInitPromise) await translateInitPromise;

    // Если виджет уже загружен — меняем язык через select
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
        // Для любого языка, включая 'ru', пробуем изменить через select
        select.value = lang;
        select.dispatchEvent(new Event('change'));
        console.log(`[GoogleTranslate] Language changed to ${lang} via select`);
        return;
    } else {
        // Fallback: устанавливаем cookie и перезагружаем
        const expiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        // ✅ Добавляем SameSite=Lax атрибут — именно из-за него куки не перезаписывались в Хроме и современных браузерах
        // Это была главная причина: первый раз язык запоминался навсегда и больше не менялся
        document.cookie = `googtrans=/ru/${lang}; expires=${expiry}; path=/; SameSite=Lax`;
        console.log(`[GoogleTranslate] Fallback: set cookie and reload for lang ${lang}`);
        window.location.reload();
    }
};

export const initGoogleTranslate = (): Promise<void> => {
    if (translateInitPromise) {
        return translateInitPromise;
    }

    translateInitPromise = new Promise<void>((resolve) => {
        // Добавляем скрытый контейнер, если его нет
        if (!document.getElementById(GOOGLE_TRANSLATE_CONTAINER_ID)) {
            const div = document.createElement('div');
            div.id = GOOGLE_TRANSLATE_CONTAINER_ID;
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        // Добавляем скрипт Google Translate, если его нет
        if (!document.getElementById('google-translate-script')) {
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'ru',
                    includedLanguages: 'ru,be,en',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                GOOGLE_TRANSLATE_CONTAINER_ID
            );
            resolve();
        };

            const script = document.createElement('script');
            script.id = 'google-translate-script';
            // ✅ Исправлено: используем google.ru домен который не блокируется на территории СНГ
            script.src = 'https://translate.google.ru/translate_a/element.js?cb=googleTranslateElementInit';
            // ✅ Добавляем кроссдоменную политику для избежания CORS ошибок
            script.crossOrigin = 'anonymous';
            script.referrerPolicy = 'no-referrer-when-downgrade';
            script.async = true;
            document.body.appendChild(script);
        } else {
            // Если скрипт уже добавлен, но Promise не создан, подождать
            setTimeout(resolve, 0);
        }
    });

    return translateInitPromise;
};
