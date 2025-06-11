import i18n from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import en from './locales/en.json';
import vi from './locales/vi.json';

// Get device locale
const deviceLocale = getLocales()[0];
const languageTag = deviceLocale.languageTag.split('-')[0]; // Get language code only (e.g., 'en' from 'en-US')

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: ['en', 'vi'].includes(languageTag) ? languageTag : 'en', // Default to English if not supported
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    // Debugging (disable in production)
    debug: __DEV__,
    
    // React i18next options
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
    
    // Pluralization
    pluralSeparator: '_',
    
    // Namespace separator
    nsSeparator: false,
    keySeparator: '.',
  });

export default i18n;
