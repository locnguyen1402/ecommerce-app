import apiClient from './axios';
import { ENV } from './config';
import { 
  getMockCategoriesResponse,
  getMockCategoryListResponse,
  simulateApiDelay 
} from '../mock_data';
import { 
  getMockProductsResponse, 
  getFeaturedProducts as getMockFeaturedProducts,
  getProductDetailById
} from '../mock_data/products';
import type {
  PaginationParams,
  ProductDetail,
  ProductSearchParams,
  ProductsResponse,
} from './types';

export const productsService = {
  // Get all products with pagination
  getProducts: async (
    params: PaginationParams = {},
  ): Promise<ProductsResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const { limit = 20, skip = 0 } = params;
      return getMockProductsResponse({ limit, skip });
    }
    
    const { limit = 20, skip = 0 } = params;
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit, skip },
    });
    return response.data;
  },

  // Get single product by ID (returns ProductDetail)
  getProduct: async (id: string): Promise<ProductDetail> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const product = getProductDetailById(id);
      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }
      return product;
    }
    
    const response = await apiClient.get<ProductDetail>(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (
    params: ProductSearchParams,
  ): Promise<ProductsResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const { limit = 20, skip = 0, q = '' } = params;
      return getMockProductsResponse({ limit, skip, search: q });
    }
    
    const response = await apiClient.get<ProductsResponse>('/products/search', {
      params,
    });
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      return getMockCategoriesResponse();
    }
    
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
  },

  // Get category list (alternative endpoint)
  getCategoryList: async (): Promise<
    { slug: string; name: string; url: string }[]
  > => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      return getMockCategoryListResponse();
    }
    
    const response = await apiClient.get('/products/category-list');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (
    category: string,
    params: PaginationParams = {},
  ): Promise<ProductsResponse> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      const { limit = 20, skip = 0 } = params;
      return getMockProductsResponse({ limit, skip, category });
    }
    
    const { limit = 20, skip = 0 } = params;
    const response = await apiClient.get<ProductsResponse>(
      `/products/category/${category}`,
      {
        params: { limit, skip },
      },
    );
    return response.data;
  },

  // Get featured products (first 10 products with high rating)
  getFeaturedProducts: async (): Promise<import('./types').ProductListItem[]> => {
    if (ENV.API_MODE === 'mock') {
      await simulateApiDelay(ENV.MOCK_DELAY);
      return getMockFeaturedProducts();
    }
    
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit: 10, skip: 0, sortBy: 'rating', order: 'desc' },
    });
    return response.data.products;
  },
};
