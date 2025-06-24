import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartsService } from '../api/carts';
import { productsService } from '../api/products';
import type {
  AddToCartRequest,
  PaginationParams,
  ProductSearchParams,
  UpdateCartRequest,
} from '../api/types';

// Query Keys
export const QUERY_KEYS = {
  products: ['products'],
  product: (id: number) => ['products', id],
  categories: ['categories'],
  productsByCategory: (category: string) => ['products', 'category', category],
  featuredProducts: ['products', 'featured'],
  searchProducts: (params: ProductSearchParams) => [
    'products',
    'search',
    params,
  ],
  carts: ['carts'],
  cart: (id: number) => ['carts', id],
  userCarts: (userId: number) => ['carts', 'user', userId],
} as const;

// Products Hooks
export const useProducts = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, params],
    queryFn: () => productsService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSearchProducts = (params: ProductSearchParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.searchProducts(params),
    queryFn: () => productsService.searchProducts(params),
    enabled: !!params.q, // Only run if there's a search query
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => productsService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes (categories don't change often)
  });
};

export const useProductsByCategory = (
  category: string,
  params: PaginationParams = {},
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.productsByCategory(category), params],
    queryFn: () => productsService.getProductsByCategory(category, params),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.featuredProducts,
    queryFn: () => productsService.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Carts Hooks
export const useUserCarts = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.userCarts(userId),
    queryFn: () => cartsService.getUserCarts(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCart = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.cart(id),
    queryFn: () => cartsService.getCart(id),
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Cart Mutations
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartData: AddToCartRequest) => cartsService.addCart(cartData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch user carts
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.userCarts(variables.userId),
      });
      // Add the new cart to cache
      queryClient.setQueryData(QUERY_KEYS.cart(data.id), data);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      cartData,
    }: {
      id: number;
      cartData: UpdateCartRequest;
    }) => cartsService.updateCart(id, cartData),
    onSuccess: (data, variables) => {
      // Update the specific cart in cache
      queryClient.setQueryData(QUERY_KEYS.cart(variables.id), data);
      // Invalidate user carts to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['carts', 'user'],
      });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cartsService.deleteCart(id),
    onSuccess: (_, variables) => {
      // Remove the cart from cache
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.cart(variables),
      });
      // Invalidate user carts to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['carts', 'user'],
      });
    },
  });
};
