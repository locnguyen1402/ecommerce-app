import { create } from 'zustand';
import { authService } from '../api/auth';
import type { LoginRequest, RegisterRequest, ForgotPasswordRequest, User } from '../api/types';
import {
  clearTokens,
  getAccessToken as getStoredAccessToken,
  getRefreshToken as getStoredRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from '../storage';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  forgotPassword: (request: ForgotPasswordRequest) => Promise<string>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  restoreTokensFromStorage: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Actions
  login: async (credentials: LoginRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.login(credentials);

      // Save tokens to storage
      await saveAccessToken(response.accessToken);
      if (response.refreshToken) {
        await saveRefreshToken(response.refreshToken);
      }

      // Extract user data (exclude tokens)
      const { accessToken, refreshToken, ...userData } = response;

      set({
        user: userData,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  register: async (userData: RegisterRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.register(userData);

      // Save tokens to storage
      await saveAccessToken(response.accessToken);
      if (response.refreshToken) {
        await saveRefreshToken(response.refreshToken);
      }

      // Extract user data (exclude tokens)
      const { accessToken, refreshToken, ...registeredUser } = response;

      set({
        user: registeredUser,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  forgotPassword: async (request: ForgotPasswordRequest) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authService.forgotPassword(request);

      set({ isLoading: false, error: null });

      return response.message;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send reset email';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });

      // Clear tokens from storage
      await clearTokens();

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  updateProfile: async (profileData: Partial<User>) => {
    try {
      set({ isLoading: true, error: null });

      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Update user profile via API
      const updatedUser = await authService.updateProfile(profileData);

      set({
        user: updatedUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update profile';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      set({ isLoading: true, error: null });

      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      // Delete user account via API
      await authService.deleteAccount();

      // Clear all user data and tokens
      await clearTokens();

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete account';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  initializeAuth: async () => {
    try {
      set({ isLoading: true });

      // Restore tokens from storage
      await get().restoreTokensFromStorage();

      const { accessToken } = get();

      if (accessToken) {
        // Try to get current user to validate token
        try {
          const user = await authService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
        } catch (error) {
          // Token is invalid, clear everything
          await get().logout();
          set({ isInitialized: true });
        }
      } else {
        set({
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      set({
        isLoading: false,
        isInitialized: true,
        error: 'Failed to initialize authentication',
      });
    }
  },

  restoreTokensFromStorage: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        getStoredAccessToken(),
        getStoredRefreshToken(),
      ]);

      set({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error('Failed to restore tokens:', error);
    }
  },

  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

// Export token getters for axios interceptor
export const getAccessToken = () => {
  return useAuthStore.getState().accessToken;
};

export const getRefreshToken = () => {
  return useAuthStore.getState().refreshToken;
};
