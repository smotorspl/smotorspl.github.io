class I18n {
    constructor() {
        this.translations = {};
        this.currentLocale = localStorage.getItem('language') || 'pl';
        this.supportedLocales = ['en', 'pl', 'ru', 'ua', 'de', 'es'];
    }

    async init() {
        try {
            // Load all translations
            await Promise.all(
                this.supportedLocales.map(async (locale) => {
                    const response = await fetch(`/public/static/locales/${locale}.json`);
                    if (!response.ok) {
                        throw new Error(`Failed to load ${locale} translations`);
                    }
                    this.translations[locale] = await response.json();
                })
            );

            // Initial translation
            await this.translate(this.currentLocale);
        } catch (error) {
            console.error('Translation initialization failed:', error);
        }
    }

    async translate(locale) {
        if (!this.supportedLocales.includes(locale)) {
            console.warn(`Unsupported locale: ${locale}`);
            return;
        }

        if (!this.translations[locale]) {
            console.error(`Missing translations for locale: ${locale}`);
            return;
        }

        this.currentLocale = locale;
        localStorage.setItem('language', locale);
        document.documentElement.lang = locale;

        // Update current language display in navbar
        const currentLangElement = document.querySelector('.current-lang');
        if (currentLangElement) {
            currentLangElement.textContent = locale.toUpperCase();
        }

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key, this.translations[locale]);

            if (translation) {
                if (element.tagName === 'META') {
                    element.setAttribute('content', translation);
                } else if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else if (element.hasAttribute('value')) {
                    element.setAttribute('value', translation);
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
            }
        });
    }

    getNestedTranslation(path, obj) {
        if (!path || !obj) return null;
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }
}