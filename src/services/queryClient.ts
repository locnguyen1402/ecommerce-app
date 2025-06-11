import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes
      staleTime: 1000 * 60 * 5,
      // Cache time: 10 minutes
      gcTime: 1000 * 60 * 10,
      // Retry failed requests up to 3 times
      retry: 3,
      // Refetch on window focus (for web)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Error handling
      throwOnError: false,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Error handling
      throwOnError: false,
    },
  },
});

// API base configuration
export const API_CONFIG = {
  baseURL: __DEV__ 
    ? 'http://localhost:3000/api' // Development
    : 'https://your-api-domain.com/api', // Production
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Query keys factory for consistency
export const queryKeys = {
  // Products
  products: ['products'] as const,
  product: (id: string) => [...queryKeys.products, id] as const,
  productsByCategory: (categoryId: string) => [...queryKeys.products, 'category', categoryId] as const,
  searchProducts: (query: string) => [...queryKeys.products, 'search', query] as const,
  
  // Categories
  categories: ['categories'] as const,
  category: (id: string) => [...queryKeys.categories, id] as const,
  
  // User
  user: ['user'] as const,
  userProfile: (userId: string) => [...queryKeys.user, userId] as const,
  userOrders: (userId: string) => [...queryKeys.user, userId, 'orders'] as const,
  userAddresses: (userId: string) => [...queryKeys.user, userId, 'addresses'] as const,
  
  // Orders
  orders: ['orders'] as const,
  order: (id: string) => [...queryKeys.orders, id] as const,
  
  // Cart (if using server-side cart)
  cart: ['cart'] as const,
  cartItems: (userId: string) => [...queryKeys.cart, userId] as const,
};

// HTTP client utility
class HttpClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: typeof API_CONFIG) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.defaultHeaders = config.headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const httpClient = new HttpClient(API_CONFIG);

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};
