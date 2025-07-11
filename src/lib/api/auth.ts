import apiClient from './axios';
import { ENV } from '../config/environment';
import { 
  getMockLoginResponse,
  getMockCurrentUser,
  refreshMockToken,
  getMockRegisterResponse,
  getMockForgotPasswordResponse,
  simulateApiDelay 
} from '../mock_data';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
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

  // Register user
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      return getMockRegisterResponse(userData);
    }
    
    const response = await apiClient.post<RegisterResponse>(
      '/auth/register',
      userData,
    );
    return response.data;
  },

  // Forgot password
  forgotPassword: async (request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      return getMockForgotPasswordResponse(request);
    }
    
    const response = await apiClient.post<ForgotPasswordResponse>(
      '/auth/forgot-password',
      request,
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
