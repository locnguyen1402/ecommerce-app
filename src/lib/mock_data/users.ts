import type { User, LoginRequest, LoginResponse } from '../api/types';
import { generateMockUUID } from '../utils/uuid';

export const MOCK_USERS: User[] = [
  {
    id: generateMockUUID('user-demo'),
    username: 'demo',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    phone: '+1-555-0123',
    birthDate: '1990-01-01',
    address: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001'
    }
  },
  {
    id: generateMockUUID('user-john'),
    username: 'john',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+1-555-0124',
    birthDate: '1985-05-15',
    address: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90210'
    }
  },
  {
    id: generateMockUUID('user-jane'),
    username: 'jane',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'female',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150',
    phone: '+1-555-0125',
    birthDate: '1992-08-22',
    address: {
      address: '789 Pine Road',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601'
    }
  }
];

// Mock login credentials
export const MOCK_CREDENTIALS = [
  { username: 'demo', password: 'demo123' },
  { username: 'john', password: 'john123' },
  { username: 'jane', password: 'jane123' }
];

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return MOCK_USERS.find(user => user.username === username);
};

export const validateCredentials = (username: string, password: string): boolean => {
  return MOCK_CREDENTIALS.some(
    cred => cred.username === username && cred.password === password
  );
};

export const generateMockTokens = (userId: string) => {
  const accessToken = `mock_access_token_${userId}_${Date.now()}`;
  const refreshToken = `mock_refresh_token_${userId}_${Date.now()}`;
  
  return { accessToken, refreshToken };
};

export const getMockLoginResponse = (credentials: LoginRequest): LoginResponse | null => {
  const { username, password } = credentials;
  
  if (!validateCredentials(username, password)) {
    return null;
  }
  
  const user = getUserByUsername(username);
  if (!user) {
    return null;
  }
  
  const { accessToken, refreshToken } = generateMockTokens(user.id);
  
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    image: user.image,
    accessToken,
    refreshToken
  };
};

export const getMockCurrentUser = (token: string): User | null => {
  // Extract user ID from mock token
  const match = token.match(/mock_access_token_([^_]+)_/);
  if (!match) {
    return null;
  }
  
  const userId = match[1];
  return getUserById(userId) || null;
};

export const refreshMockToken = (refreshToken: string) => {
  // Extract user ID from refresh token
  const match = refreshToken.match(/mock_refresh_token_([^_]+)_/);
  if (!match) {
    throw new Error('Invalid refresh token');
  }
  
  const userId = match[1];
  return generateMockTokens(userId);
};