/**
 * Environment configuration for API mode switching
 */
export const ENV = {
  // API Configuration
  API_MODE: (process.env.EXPO_PUBLIC_API_MODE || 'mock') as 'mock' | 'real',
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || '',
  
  // Mock Configuration
  MOCK_DELAY: parseInt(process.env.EXPO_PUBLIC_MOCK_DELAY || '300'),
  
  // App Configuration
  APP_ENV: process.env.EXPO_PUBLIC_APP_ENV || 'development',
  DEBUG: process.env.EXPO_PUBLIC_DEBUG === 'true',
} as const;

/**
 * API configuration for mock/real API switching
 */
export const config = {
  // API mode flag
  useMockApi: ENV.API_MODE === 'mock',
  
  // API base URL for real mode
  apiUrl: ENV.API_BASE_URL,
  
  // Mock delay for simulating network latency
  mockDelay: ENV.MOCK_DELAY,
  
  // Environment info
  isDevelopment: ENV.APP_ENV === 'development',
  isDebug: ENV.DEBUG,
} as const;

// Type-safe environment validation
export const validateEnvironment = () => {
  if (ENV.API_MODE === 'real' && !ENV.API_BASE_URL) {
    console.warn('⚠️ API_MODE is set to "real" but API_BASE_URL is not configured');
  }
  
  if (ENV.API_MODE === 'mock' && ENV.DEBUG) {
    console.log('🔧 Running in MOCK mode with simulated API delay of', ENV.MOCK_DELAY, 'ms');
  }
};

// Initialize environment validation
validateEnvironment();