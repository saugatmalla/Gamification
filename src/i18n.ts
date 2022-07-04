import { createI18n } from 'vue-i18n';
// fallback messages
// import messages from '@intlify/vite-plugin-vue-i18n/messages'
import en from './locales/en.json'
import fr from './locales/fr.json'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
        en,
        fr
    }
});

export default i18n;