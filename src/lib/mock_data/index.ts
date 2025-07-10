// Export all mock data and helper functions
export * from './products';
export * from './categories';
export * from './users';
export * from './orders';

// Centralized mock database
export const MOCK_DATABASE = {
  products: async () => (await import('./products')).MOCK_PRODUCTS,
  categories: async () => (await import('./categories')).MOCK_CATEGORIES,
  users: async () => (await import('./users')).MOCK_USERS,
  orders: async () => (await import('./orders')).MOCK_ORDERS,
};

// Mock API delay simulation
export const simulateApiDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};