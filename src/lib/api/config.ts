import { ENV } from '../config/environment';

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

// Re-export for backward compatibility
export { ENV };