import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

// Import translation files
import en from './locales/en.json';
import vi from './locales/vi.json';

// Get device locale with platform check
const getDeviceLocale = (): string => {
  if (Platform.OS === 'web') {
    // Web platform - use browser locale
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.split('-')[0] || 'vi';
    }
    return 'vi';
  } else {
    // React Native platforms
    try {
      const { getLocales } = require('react-native-localize');
      return getLocales()[0]?.languageCode || 'vi';
    } catch {
      return 'vi';
    }
  }
};

const deviceLocale = getDeviceLocale();

// Supported languages
export const SUPPORTED_LANGUAGES = {
  vi: 'Tiếng Việt',
  en: 'English',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// i18n configuration
i18n
  .use(initReactI18next)
  .init({
    // Resources
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    
    // Language settings
    lng: deviceLocale in SUPPORTED_LANGUAGES ? deviceLocale : 'vi',
    fallbackLng: 'vi',
    
    // Namespace settings
    defaultNS: 'translation',
    
    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React-specific settings
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
    
    // Debug mode (disable in production)
    debug: __DEV__,
  });

export default i18n;