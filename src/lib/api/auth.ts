import apiClient from './axios';
import { ENV } from '../config/environment';
import { 
  getMockLoginResponse,
  getMockCurrentUser,
  refreshMockToken,
  simulateApiDelay 
} from '../mock_data';
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
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const loginResponse = getMockLoginResponse(credentials);
      if (!loginResponse) {
        throw new Error('Invalid credentials');
      }
      return loginResponse;
    }
    
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials,
    );
    return response.data;
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      // Get token from auth store
      const { getAccessToken } = await import('../stores/auth');
      const token = getAccessToken();
      if (!token) {
        throw new Error('No access token');
      }
      const user = getMockCurrentUser(token);
      if (!user) {
        throw new Error('Invalid token');
      }
      return user;
    }
    
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  // Refresh access token
  refreshToken: async (
    refreshData: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const tokens = refreshMockToken(refreshData.refreshToken);
      return tokens;
    }
    
    const response = await apiClient.post<RefreshTokenResponse>(
      '/auth/refresh',
      refreshData,
    );
    return response.data;
  },

  // Logout (client-side only)
  logout: async (): Promise<void> => {
    // Clear tokens from storage
    // This will be handled by the auth store
    return Promise.resolve();
  },
};
