import { config } from './config';
import { delay } from '../utils/delay';
import { apiClient } from './client';
import { generateMockUUID } from '../utils/uuid';
import type {
  AddToCartRequest,
  Cart,
  CartItem,
  CartsResponse,
  PaginationParams,
  UpdateCartRequest,
} from './types';

// Mock cart data
const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: generateMockUUID('cart-item-1'),
    productId: generateMockUUID('iphone-15-pro-max'),
    title: 'iPhone 15 Pro Max',
    price: 1199,
    quantity: 1,
    total: 1199,
    discountPercentage: 5,
    discountedTotal: 1139.05,
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
  },
  {
    id: generateMockUUID('cart-item-2'),
    productId: generateMockUUID('ao-nam-cotton-premium'),
    title: 'Áo Nam Cotton Premium',
    price: 45,
    quantity: 2,
    total: 90,
    discountPercentage: 15,
    discountedTotal: 76.5,
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
  },
];

const MOCK_CART: Cart = {
  id: generateMockUUID('cart-1'),
  products: MOCK_CART_ITEMS,
  total: 1289,
  discountedTotal: 1215.55,
  userId: generateMockUUID('user-1'),
  totalProducts: 2,
  totalQuantity: 3,
};

// Mock implementations
async function mockGetCarts(params: PaginationParams = {}): Promise<CartsResponse> {
  await delay(config.mockDelay);
  const { limit = 20, skip = 0 } = params;
  
  return {
    carts: [MOCK_CART],
    total: 1,
    skip,
    limit,
  };
}

async function mockGetCart(id: string): Promise<Cart> {
  await delay(config.mockDelay);
  
  if (id !== MOCK_CART.id) {
    throw new Error(`Cart with ID ${id} not found`);
  }
  
  return MOCK_CART;
}

async function mockGetUserCarts(userId: string): Promise<CartsResponse> {
  await delay(config.mockDelay);
  
  return {
    carts: [MOCK_CART],
    total: 1,
    skip: 0,
    limit: 1,
  };
}

async function mockAddCart(cartData: AddToCartRequest): Promise<Cart> {
  await delay(config.mockDelay);
  
  const newCart: Cart = {
    id: generateMockUUID('new-cart'),
    products: cartData.products.map(p => ({
      id: generateMockUUID(`cart-item-${p.id}`),
      productId: p.id,
      title: `Product ${p.id}`,
      price: 100,
      quantity: p.quantity,
      total: 100 * p.quantity,
      discountPercentage: 0,
      discountedTotal: 100 * p.quantity,
      thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    })),
    total: cartData.products.reduce((sum, p) => sum + (100 * p.quantity), 0),
    discountedTotal: cartData.products.reduce((sum, p) => sum + (100 * p.quantity), 0),
    userId: cartData.userId,
    totalProducts: cartData.products.length,
    totalQuantity: cartData.products.reduce((sum, p) => sum + p.quantity, 0),
  };
  
  return newCart;
}

async function mockUpdateCart(id: string, cartData: UpdateCartRequest): Promise<Cart> {
  await delay(config.mockDelay);
  
  const updatedCart: Cart = {
    ...MOCK_CART,
    products: cartData.products.map(p => ({
      id: generateMockUUID(`cart-item-${p.id}`),
      productId: p.id,
      title: `Product ${p.id}`,
      price: 100,
      quantity: p.quantity,
      total: 100 * p.quantity,
      discountPercentage: 0,
      discountedTotal: 100 * p.quantity,
      thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    })),
    total: cartData.products.reduce((sum, p) => sum + (100 * p.quantity), 0),
    discountedTotal: cartData.products.reduce((sum, p) => sum + (100 * p.quantity), 0),
    totalProducts: cartData.products.length,
    totalQuantity: cartData.products.reduce((sum, p) => sum + p.quantity, 0),
  };
  
  return updatedCart;
}

async function mockDeleteCart(id: string): Promise<{ isDeleted: boolean; deletedOn: string }> {
  await delay(config.mockDelay);
  
  return {
    isDeleted: true,
    deletedOn: new Date().toISOString(),
  };
}

// Real API implementations
async function realGetCarts(params: PaginationParams = {}): Promise<CartsResponse> {
  const { limit = 20, skip = 0 } = params;
  return apiClient.get<CartsResponse>('/carts', {
    params: { limit: String(limit), skip: String(skip) },
  });
}

async function realGetCart(id: string): Promise<Cart> {
  return apiClient.get<Cart>(`/carts/${id}`);
}

async function realGetUserCarts(userId: string): Promise<CartsResponse> {
  return apiClient.get<CartsResponse>(`/carts/user/${userId}`);
}

async function realAddCart(cartData: AddToCartRequest): Promise<Cart> {
  return apiClient.post<Cart>('/carts/add', cartData);
}

async function realUpdateCart(id: string, cartData: UpdateCartRequest): Promise<Cart> {
  return apiClient.put<Cart>(`/carts/${id}`, cartData);
}

async function realDeleteCart(id: string): Promise<{ isDeleted: boolean; deletedOn: string }> {
  return apiClient.delete(`/carts/${id}`);
}

// Exported service functions
export async function getCarts(params: PaginationParams = {}): Promise<CartsResponse> {
  if (config.useMockApi) {
    return mockGetCarts(params);
  } else {
    return realGetCarts(params);
  }
}

export async function getCart(id: string): Promise<Cart> {
  if (config.useMockApi) {
    return mockGetCart(id);
  } else {
    return realGetCart(id);
  }
}

export async function getUserCarts(userId: string): Promise<CartsResponse> {
  if (config.useMockApi) {
    return mockGetUserCarts(userId);
  } else {
    return realGetUserCarts(userId);
  }
}

export async function addCart(cartData: AddToCartRequest): Promise<Cart> {
  if (config.useMockApi) {
    return mockAddCart(cartData);
  } else {
    return realAddCart(cartData);
  }
}

export async function updateCart(id: string, cartData: UpdateCartRequest): Promise<Cart> {
  if (config.useMockApi) {
    return mockUpdateCart(id, cartData);
  } else {
    return realUpdateCart(id, cartData);
  }
}

export async function deleteCart(id: string): Promise<{ isDeleted: boolean; deletedOn: string }> {
  if (config.useMockApi) {
    return mockDeleteCart(id);
  } else {
    return realDeleteCart(id);
  }
}