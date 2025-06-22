import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';
import { AuthResponse, UserSession } from './types';

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

// Authentication utilities
export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    const sessionData = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch {
    return null;
  }
};

export const saveUserSession = async (
  authResponse: AuthResponse,
): Promise<void> => {
  const session: UserSession = {
    accessToken: authResponse.accessToken,
    // expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
  };
  await AsyncStorage.setItem(
    STORAGE_KEYS.USER_SESSION,
    JSON.stringify(session),
  );
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const session = await getUserSession();
  return session !== null && session.accessToken.length > 0;
  // Có thể thêm check expiry: && session.expiresAt > Date.now()
};

export const clearUserSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION);
};
