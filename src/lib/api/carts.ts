import apiClient from './axios';
import type {
  AddToCartRequest,
  Cart,
  CartsResponse,
  PaginationParams,
  UpdateCartRequest,
} from './types';

export const cartsService = {
  // Get all carts
  getCarts: async (params: PaginationParams = {}): Promise<CartsResponse> => {
    const { limit = 20, skip = 0 } = params;
    const response = await apiClient.get<CartsResponse>('/carts', {
      params: { limit, skip },
    });
    return response.data;
  },

  // Get single cart by ID
  getCart: async (id: number): Promise<Cart> => {
    const response = await apiClient.get<Cart>(`/carts/${id}`);
    return response.data;
  },

  // Get carts by user ID
  getUserCarts: async (userId: number): Promise<CartsResponse> => {
    const response = await apiClient.get<CartsResponse>(
      `/carts/user/${userId}`,
    );
    return response.data;
  },

  // Add a new cart
  addCart: async (cartData: AddToCartRequest): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/carts/add', cartData);
    return response.data;
  },

  // Update a cart
  updateCart: async (
    id: number,
    cartData: UpdateCartRequest,
  ): Promise<Cart> => {
    const response = await apiClient.put<Cart>(`/carts/${id}`, cartData);
    return response.data;
  },

  // Delete a cart
  deleteCart: async (
    id: number,
  ): Promise<{ isDeleted: boolean; deletedOn: string }> => {
    const response = await apiClient.delete(`/carts/${id}`);
    return response.data;
  },
};
