import apiClient from './axios';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from './types';

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials,
    );
    return response.data;
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  // Refresh access token
  refreshToken: async (
    refreshData: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<RefreshTokenResponse>(
      '/auth/refresh',
      refreshData,
    );
    return response.data;
  },

  // Logout (client-side only since DummyJSON doesn't have logout endpoint)
  logout: async (): Promise<void> => {
    // Clear tokens from storage
    // This will be handled by the auth store
    return Promise.resolve();
  },
};
