import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartsService } from '../api/carts';
import { productsService } from '../api/products';
import { ordersService } from '../api/orders';
import { getSearchSuggestions, searchProducts } from '../api/search';
import type { SearchProductsRequest } from '../api/search';
import type {
  AddToCartRequest,
  PaginationParams,
  ProductSearchParams,
  UpdateCartRequest,
} from '../api/types';
import type { Order } from '../mock_data/orders';

// Query Keys
export const QUERY_KEYS = {
  products: ['products'],
  product: (id: string) => ['products', id],
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
  orders: ['orders'],
  order: (id: string) => ['orders', id],
  userOrders: (userId: string) => ['orders', 'user', userId],
  searchSuggestions: (query: string) => ['search', 'suggestions', query],
  searchProductsWithFilters: (request: SearchProductsRequest) => ['search', 'products', request],
} as const;

// Products Hooks
export const useProducts = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, params],
    queryFn: () => productsService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
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

// Orders Hooks
export const useUserOrders = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.userOrders(userId),
    queryFn: () => ordersService.getUserOrders(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.order(orderId),
    queryFn: () => ordersService.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Order Mutations
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => 
      ordersService.createOrder(orderData),
    onSuccess: (data, variables) => {
      // Add the new order to cache
      queryClient.setQueryData(QUERY_KEYS.order(data.id), data);
      // Invalidate user orders to refresh the list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.userOrders(variables.userId),
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) =>
      ordersService.updateOrderStatus(orderId, status),
    onSuccess: (data, variables) => {
      // Update the specific order in cache
      queryClient.setQueryData(QUERY_KEYS.order(variables.orderId), data);
      // Invalidate user orders to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['orders', 'user'],
      });
    },
  });
};

// Search Hooks
export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.searchSuggestions(query),
    queryFn: () => getSearchSuggestions(query),
    enabled: query.length >= 2, // Only fetch when query has at least 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
};

export const useSearchProductsWithFilters = (request: SearchProductsRequest) => {
  return useQuery({
    queryKey: QUERY_KEYS.searchProductsWithFilters(request),
    queryFn: () => searchProducts(request),
    enabled: !!request.q && request.q.length >= 2, // Only fetch when query exists
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes garbage collection
  });
};
