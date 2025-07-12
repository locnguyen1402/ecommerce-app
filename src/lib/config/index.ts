import { ENV } from './environment';

/**
 * Main configuration object for backward compatibility
 */
export const API_CONFIG = {
  API_MODE: ENV.API_MODE,
  API_BASE_URL: ENV.API_BASE_URL,
  MOCK_DELAY: ENV.MOCK_DELAY,
} as const;

// Re-export environment for direct usage
export { ENV };