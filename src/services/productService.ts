import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, ApiResponse, PaginatedResponse } from '@/types';
import { httpClient, queryKeys, handleApiError } from './queryClient';

// Product API endpoints
const ENDPOINTS = {
  products: '/products',
  product: (id: string) => `/products/${id}`,
  search: '/products/search',
  categories: '/products/categories',
};

// Fetch all products with pagination
export const useProducts = (
  page = 1,
  limit = 20,
  category?: string,
  sortBy?: string
) => {
  return useQuery({
    queryKey: category 
      ? queryKeys.productsByCategory(category)
      : [...queryKeys.products, page, limit, sortBy],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(sortBy && { sortBy }),
      });

      return httpClient.get(`${ENDPOINTS.products}?${params}`);
    },
    enabled: true,
  });
};

// Fetch single product by ID
export const useProduct = (productId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: async (): Promise<ApiResponse<Product>> => {
      return httpClient.get(ENDPOINTS.product(productId));
    },
    enabled: enabled && !!productId,
  });
};

// Search products
export const useSearchProducts = (query: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.searchProducts(query),
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const params = new URLSearchParams({ q: query });
      return httpClient.get(`${ENDPOINTS.search}?${params}`);
    },
    enabled: enabled && query.length > 2, // Only search with 3+ characters
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Fetch featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: [...queryKeys.products, 'featured'],
    queryFn: async (): Promise<ApiResponse<Product[]>> => {
      return httpClient.get(`${ENDPOINTS.products}/featured`);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes for featured products
  });
};

// Fetch products by category
export const useProductsByCategory = (categoryId: string, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.productsByCategory(categoryId),
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      return httpClient.get(`${ENDPOINTS.categories}/${categoryId}/products`);
    },
    enabled: enabled && !!categoryId,
  });
};

// Get related products
export const useRelatedProducts = (productId: string, enabled = true) => {
  return useQuery({
    queryKey: [...queryKeys.product(productId), 'related'],
    queryFn: async (): Promise<ApiResponse<Product[]>> => {
      return httpClient.get(`${ENDPOINTS.product(productId)}/related`);
    },
    enabled: enabled && !!productId,
  });
};

// Mutations for product actions (if needed for admin features)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> => {
      return httpClient.post(ENDPOINTS.products, productData);
    },
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
    onError: (error) => {
      console.error('Failed to create product:', handleApiError(error));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      productId, 
      productData 
    }: { 
      productId: string; 
      productData: Partial<Product> 
    }): Promise<ApiResponse<Product>> => {
      return httpClient.put(ENDPOINTS.product(productId), productData);
    },
    onSuccess: (data, variables) => {
      // Update specific product in cache
      queryClient.setQueryData(
        queryKeys.product(variables.productId),
        data
      );
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
    onError: (error) => {
      console.error('Failed to update product:', handleApiError(error));
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string): Promise<ApiResponse<void>> => {
      return httpClient.delete(ENDPOINTS.product(productId));
    },
    onSuccess: (_, productId) => {
      // Remove product from cache
      queryClient.removeQueries({ queryKey: queryKeys.product(productId) });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
    onError: (error) => {
      console.error('Failed to delete product:', handleApiError(error));
    },
  });
};
