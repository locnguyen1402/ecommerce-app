import apiClient from './axios';
import type {
  PaginationParams,
  Product,
  ProductSearchParams,
  ProductsResponse,
} from './types';

export const productsService = {
  // Get all products with pagination
  getProducts: async (
    params: PaginationParams = {},
  ): Promise<ProductsResponse> => {
    const { limit = 20, skip = 0 } = params;
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit, skip },
    });
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Search products
  searchProducts: async (
    params: ProductSearchParams,
  ): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products/search', {
      params,
    });
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
  },

  // Get category list (alternative endpoint)
  getCategoryList: async (): Promise<
    { slug: string; name: string; url: string }[]
  > => {
    const response = await apiClient.get('/products/category-list');
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (
    category: string,
    params: PaginationParams = {},
  ): Promise<ProductsResponse> => {
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
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit: 10, skip: 0, sortBy: 'rating', order: 'desc' },
    });
    return response.data.products;
  },
};
