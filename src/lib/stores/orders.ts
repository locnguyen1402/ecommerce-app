import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Order, OrderItem, Address, PaymentMethod } from '~/lib/mock_data/orders';
import { generateMockUUID } from '~/lib/utils/uuid';

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  clearOrders: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,
      error: null,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: generateMockUUID('order'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          error: null,
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
          error: null,
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getUserOrders: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
      },

      clearOrders: () => {
        set({ orders: [], error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },
    }),
    {
      name: 'orders-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist orders, not loading states
      partialize: (state) => ({
        orders: state.orders,
      }),
    }
  )
);

// Helper function to create order from cart
export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
}

export const createOrderFromCart = (data: CreateOrderData): Omit<Order, 'id' | 'createdAt' | 'updatedAt'> => {
  const shipping = 25; // Mock shipping cost
  const tax = (data.subtotal - data.discount) * 0.1; // 10% tax
  const total = data.subtotal - data.discount + shipping + tax;

  return {
    userId: data.userId,
    status: 'pending',
    items: data.items,
    subtotal: data.subtotal,
    tax: tax,
    shipping: shipping,
    discount: data.discount,
    total: total,
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress || data.shippingAddress,
    paymentMethod: data.paymentMethod,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
};