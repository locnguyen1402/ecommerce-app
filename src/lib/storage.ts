import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

// Pure storage layer - no business logic, only persistence

// First Launch utilities
export const checkFirstLaunch = async (): Promise<boolean> => {
  try {
    const hasLaunched = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH);
    return hasLaunched === null; // null = first time
  } catch {
    return true; // fallback to first launch
  }
};

export const setFirstLaunchComplete = async (): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, 'completed');
};

// Token persistence (simple key-value storage)
export const saveAccessToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch {
    return null;
  }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch {
    return null;
  }
};

export const clearTokens = async (): Promise<void> => {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
  ]);
};
