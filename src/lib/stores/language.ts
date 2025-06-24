import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { create } from 'zustand';
import { STORAGE_KEYS } from '../constants';
import type { SupportedLanguage } from '../i18n/config';

interface LanguageState {
  language: SupportedLanguage;
  isLoading: boolean;
  isInitialized: boolean;
}

interface LanguageActions {
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  initializeLanguage: () => Promise<void>;
  restoreLanguageFromStorage: () => Promise<SupportedLanguage | null>;
}

export type LanguageStore = LanguageState & LanguageActions;

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  // Initial state
  language: 'vi',
  isLoading: false,
  isInitialized: false,

  // Actions
  setLanguage: async (language: SupportedLanguage) => {
    try {
      set({ isLoading: true });

      // Update i18n language
      await i18n.changeLanguage(language);

      // Save to storage
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, language);

      // Update store
      set({
        language,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to set language:', error);
      set({ isLoading: false });
    }
  },

  initializeLanguage: async () => {
    try {
      set({ isLoading: true });

      // Try to restore from storage
      const storedLanguage = await get().restoreLanguageFromStorage();

      if (storedLanguage) {
        // Use stored language
        await i18n.changeLanguage(storedLanguage);
        set({
          language: storedLanguage,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        // Use default language (already set in i18n config)
        const currentLanguage = i18n.language as SupportedLanguage;
        set({
          language: currentLanguage,
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Failed to initialize language:', error);
      set({
        language: 'vi', // Fallback
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  restoreLanguageFromStorage: async (): Promise<SupportedLanguage | null> => {
    try {
      const storedLanguage = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
      
      if (storedLanguage && (storedLanguage === 'vi' || storedLanguage === 'en')) {
        return storedLanguage as SupportedLanguage;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to restore language from storage:', error);
      return null;
    }
  },
}));

// Export language getter for external use
export const getCurrentLanguage = (): SupportedLanguage => {
  return useLanguageStore.getState().language;
};