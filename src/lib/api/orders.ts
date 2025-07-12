import { ENV } from '../config/environment';
import { MOCK_ORDERS, type Order } from '../mock_data/orders';
import { delay } from '../utils/delay';
import { apiClient } from './client';

export const ordersService = {
  // Get user orders
  getUserOrders: async (userId: string): Promise<Order[]> => {
    if (ENV.API_MODE === 'mock') {
      await delay(ENV.MOCK_DELAY);
      // Return mock orders for the demo user
      const userOrders = MOCK_ORDERS.filter(order => order.userId === userId);
      return userOrders;
    }
    
    const response = await apiClient.get<{ orders: Order[] }>(`/users/${userId}/orders`);
    return response.data.orders;
  },

  // Get single order by ID
  getOrder: async (orderId: string): Promise<Order> => {
    if (ENV.API_MODE === 'mock') {
      await delay(ENV.MOCK_DELAY);
      const order = MOCK_ORDERS.find(order => order.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    }
    
    const response = await apiClient.get<Order>(`/orders/${orderId}`);
    return response.data;
  },

  // Create new order
  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    if (ENV.API_MODE === 'mock') {
      await delay(ENV.MOCK_DELAY);
      // Simulate order creation
      const newOrder: Order = {
        ...orderData,
        id: `order-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newOrder;
    }
    
    const response = await apiClient.post<Order>('/orders', orderData);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
    if (ENV.API_MODE === 'mock') {
      await delay(ENV.MOCK_DELAY);
      const order = MOCK_ORDERS.find(order => order.id === orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      const updatedOrder = {
        ...order,
        status,
        updatedAt: new Date().toISOString(),
      };
      return updatedOrder;
    }
    
    const response = await apiClient.patch<Order>(`/orders/${orderId}`, { status });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<Order> => {
    return ordersService.updateOrderStatus(orderId, 'cancelled');
  },
};