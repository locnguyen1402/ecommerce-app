import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../i18n/config';
import { useLanguageStore } from '../stores/language';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const {
    language,
    isLoading,
    isInitialized,
    setLanguage: setStoreLanguage,
    initializeLanguage,
  } = useLanguageStore();

  const changeLanguage = useCallback(
    async (newLanguage: SupportedLanguage) => {
      try {
        await setStoreLanguage(newLanguage);
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    },
    [setStoreLanguage]
  );

  const toggleLanguage = useCallback(async () => {
    const newLanguage: SupportedLanguage = language === 'vi' ? 'en' : 'vi';
    await changeLanguage(newLanguage);
  }, [language, changeLanguage]);

  const initialize = useCallback(async () => {
    if (!isInitialized) {
      await initializeLanguage();
    }
  }, [isInitialized, initializeLanguage]);

  return {
    // Translation function
    t,
    
    // Current language state
    language,
    isLoading,
    isInitialized,
    
    // Language actions
    changeLanguage,
    toggleLanguage,
    initialize,
    
    // i18n instance (for advanced usage)
    i18n,
    
    // Helper functions
    isVietnamese: language === 'vi',
    isEnglish: language === 'en',
  };
};