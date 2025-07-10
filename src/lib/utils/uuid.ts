/**
 * Generate a simple UUID v4
 * Note: This is a simple implementation for development purposes.
 * In production, consider using a proper UUID library like 'uuid' or 'expo-crypto'
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Generate a short UUID for development (8 characters)
 */
export const generateShortUUID = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

/**
 * Generate a predictable UUID for mock data
 */
export const generateMockUUID = (seed: string): string => {
  // Simple hash function to generate consistent UUIDs for mock data
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  const hashStr = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hashStr.substring(0, 8)}-${hashStr.substring(0, 4)}-4${hashStr.substring(1, 4)}-8${hashStr.substring(2, 5)}-${hashStr.substring(0, 12)}`;
};