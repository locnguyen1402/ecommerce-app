import { config } from './config';

/**
 * Simple API client wrapper for consistent HTTP calls
 */
class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
    
    if (!params || Object.keys(params).length === 0) {
      return url;
    }
    
    const searchParams = new URLSearchParams(params);
    return `${url}?${searchParams.toString()}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, string> } = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add auth headers here if needed
    };

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...defaultHeaders,
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, options?: RequestInit & { params?: Record<string, string> }): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient(config.apiUrl);