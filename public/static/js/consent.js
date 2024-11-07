class ConsentBanner extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.attachEvents();
    }

    render() {
        const currentLang = document.documentElement.lang || 'pl';
        const translations = {
            pl: {
                description: 'Używamy plików cookie, aby poprawić Twoje doświadczenia. Wybierz swoje preferencje.',
                acceptAll: 'Akceptuj wszystkie',
                acceptNecessary: 'Tylko niezbędne',
                customize: 'Dostosuj'
            },
            ua: {
                description: 'Ми використовуємо файли cookie для покращення вашого досвіду. Виберіть свої налаштування.',
                acceptAll: 'Прийняти всі',
                acceptNecessary: 'Тільки необхідні',
                customize: 'Налаштувати'
            },
            en: {
                description: 'We use cookies to improve your experience. Choose your preferences.',
                acceptAll: 'Accept All',
                acceptNecessary: 'Only Necessary',
                customize: 'Customize'
            },
            ru: {
                description: 'Мы используем файлы cookie для улучшения вашего опыта. Выберите свои предпочтения.',
                acceptAll: 'Принять все',
                acceptNecessary: 'Только необходимые',
                customize: 'Настроить'
            },
            de: {
                description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Wählen Sie Ihre Einstellungen.',
                acceptAll: 'Alle akzeptieren',
                acceptNecessary: 'Nur notwendige',
                customize: 'Anpassen'
            },
            es: {
                description: 'Utilizamos cookies para mejorar tu experiencia. Elige tus preferencias.',
                acceptAll: 'Aceptar todo',
                acceptNecessary: 'Solo necesarias',
                customize: 'Personalizar'
            }
        };

        const text = translations[currentLang] || translations.en;

        this.innerHTML = `
      <div class="consent-banner">
        <div class="consent-content">
          <p>${text.description}</p>
          <div class="consent-buttons">
            <button id="accept-all" class="btn btn-primary">${text.acceptAll}</button>
            <button id="accept-necessary" class="btn btn-outline-primary">${text.acceptNecessary}</button>
            <button id="customize" class="btn btn-outline-primary">${text.customize}</button>
          </div>
        </div>
      </div>
    `;
    }

    attachEvents() {
        document.getElementById('accept-all').addEventListener('click', () => {
            this.updateConsent({
                'ad_storage': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        });

        document.getElementById('accept-necessary').addEventListener('click', () => {
            this.updateConsent({
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        });

        document.getElementById('customize').addEventListener('click', () => {
            // TODO: Implement custom preferences modal
            console.log('Custom preferences not implemented yet');
        });
    }

    updateConsent(settings) {
        gtag('consent', 'update', settings);
        localStorage.setItem('consentSettings', JSON.stringify({
            settings,
            timestamp: new Date().toISOString()
        }));
        this.remove();
    }
}

// Register the custom element
customElements.define('consent-banner', ConsentBanner);

// Check for existing consent and expiration
function checkConsent() {
    const savedConsent = localStorage.getItem('consentSettings');
    if (!savedConsent) {
        document.body.appendChild(document.createElement('consent-banner'));
        return;
    }

    const { settings, timestamp } = JSON.parse(savedConsent);
    const consentAge = new Date() - new Date(timestamp);
    const maxAge = 180 * 24 * 60 * 60 * 1000; // 180 days in milliseconds

    if (consentAge > maxAge) {
        localStorage.removeItem('consentSettings');
        document.body.appendChild(document.createElement('consent-banner'));
    } else {
        gtag('consent', 'update', settings);
    }
}

// Initialize consent check
document.addEventListener('DOMContentLoaded', checkConsent);