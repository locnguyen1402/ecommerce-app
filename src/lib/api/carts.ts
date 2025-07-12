import { ENV } from './config';
import { delay } from '../utils/delay';
import apiClient from './axios';
import type {
  AddToCartRequest,
  Cart,
  CartsResponse,
  PaginationParams,
  UpdateCartRequest,
} from './types';

// Mock carts data
const mockCarts: Cart[] = [
  {
    id: 1,
    userId: 1,
    date: '2024-01-01',
    products: [
      {
        id: 'smartphone-pro-max',
        quantity: 2,
      },
      {
        id: 'wireless-headphones-premium',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    date: '2024-01-02',
    products: [
      {
        id: 'laptop-gaming-beast',
        quantity: 1,
      },
    ],
  },
];

// Mock implementations
const mockCartsService = {
  getCarts: async (params: PaginationParams = {}): Promise<CartsResponse> => {
    await delay(ENV.MOCK_DELAY);
    const { limit = 20, skip = 0 } = params;
    const paginatedCarts = mockCarts.slice(skip, skip + limit);
    
    return {
      carts: paginatedCarts,
      total: mockCarts.length,
      skip,
      limit,
    };
  },

  getCart: async (id: number): Promise<Cart> => {
    await delay(ENV.MOCK_DELAY);
    const cart = mockCarts.find(c => c.id === id);
    if (!cart) {
      throw new Error(`Cart with ID ${id} not found`);
    }
    return cart;
  },

  getUserCarts: async (userId: number): Promise<CartsResponse> => {
    await delay(ENV.MOCK_DELAY);
    const userCarts = mockCarts.filter(c => c.userId === userId);
    
    return {
      carts: userCarts,
      total: userCarts.length,
      skip: 0,
      limit: userCarts.length,
    };
  },

  addCart: async (cartData: AddToCartRequest): Promise<Cart> => {
    await delay(ENV.MOCK_DELAY);
    const newCart: Cart = {
      id: Math.max(...mockCarts.map(c => c.id)) + 1,
      userId: cartData.userId,
      date: new Date().toISOString().split('T')[0],
      products: cartData.products,
    };
    mockCarts.push(newCart);
    return newCart;
  },

  updateCart: async (id: number, cartData: UpdateCartRequest): Promise<Cart> => {
    await delay(ENV.MOCK_DELAY);
    const cartIndex = mockCarts.findIndex(c => c.id === id);
    if (cartIndex === -1) {
      throw new Error(`Cart with ID ${id} not found`);
    }
    
    const updatedCart = {
      ...mockCarts[cartIndex],
      ...cartData,
    };
    mockCarts[cartIndex] = updatedCart;
    return updatedCart;
  },

  deleteCart: async (id: number): Promise<{ isDeleted: boolean; deletedOn: string }> => {
    await delay(ENV.MOCK_DELAY);
    const cartIndex = mockCarts.findIndex(c => c.id === id);
    if (cartIndex === -1) {
      throw new Error(`Cart with ID ${id} not found`);
    }
    
    mockCarts.splice(cartIndex, 1);
    return {
      isDeleted: true,
      deletedOn: new Date().toISOString(),
    };
  },
};

// Real API implementations  
const realCartsService = {
  getCarts: async (params: PaginationParams = {}): Promise<CartsResponse> => {
    const { limit = 20, skip = 0 } = params;
    const response = await apiClient.get<CartsResponse>('/carts', {
      params: { limit, skip },
    });
    return response.data;
  },

  getCart: async (id: number): Promise<Cart> => {
    const response = await apiClient.get<Cart>(`/carts/${id}`);
    return response.data;
  },

  getUserCarts: async (userId: number): Promise<CartsResponse> => {
    const response = await apiClient.get<CartsResponse>(`/carts/user/${userId}`);
    return response.data;
  },

  addCart: async (cartData: AddToCartRequest): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/carts/add', cartData);
    return response.data;
  },

  updateCart: async (id: number, cartData: UpdateCartRequest): Promise<Cart> => {
    const response = await apiClient.put<Cart>(`/carts/${id}`, cartData);
    return response.data;
  },

  deleteCart: async (id: number): Promise<{ isDeleted: boolean; deletedOn: string }> => {
    const response = await apiClient.delete(`/carts/${id}`);
    return response.data;
  },
};

// Export service based on environment
export const cartsService = ENV.API_MODE === 'mock' ? mockCartsService : realCartsService;
