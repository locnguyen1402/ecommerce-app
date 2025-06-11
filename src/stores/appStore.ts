import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '@/types';

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      theme: 'system',
      language: 'en',
      currency: 'USD',
      isFirstLaunch: true,

      setLoading: (isLoading: boolean) => set({ isLoading }),
      
      setTheme: (theme: 'light' | 'dark' | 'system') => set({ theme }),
      
      setLanguage: (language: string) => set({ language }),
      
      setCurrency: (currency: string) => set({ currency }),
      
      setFirstLaunchComplete: () => set({ isFirstLaunch: false }),
    }),
    {
      name: 'ecommerce-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppStore;
