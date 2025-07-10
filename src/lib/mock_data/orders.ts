export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
  variant?: {
    size?: string;
    color?: string;
  };
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

import { generateMockUUID } from '../utils/uuid';

export const MOCK_ORDERS: Order[] = [
  {
    id: generateMockUUID('order-001'),
    userId: generateMockUUID('user-demo'),
    status: 'delivered',
    items: [
      {
        productId: generateMockUUID('iphone-15-pro-max'),
        title: 'iPhone 15 Pro Max',
        price: 1199,
        quantity: 1,
        total: 1199,
        thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300'
      },
      {
        productId: generateMockUUID('sony-wh-1000xm5'),
        title: 'Sony WH-1000XM5',
        price: 399,
        quantity: 1,
        total: 399,
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
      }
    ],
    subtotal: 1598,
    tax: 127.84,
    shipping: 0,
    discount: 80,
    total: 1645.84,
    shippingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    billingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:20:00Z',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-18T00:00:00Z'
  },
  {
    id: generateMockUUID('order-002'),
    userId: generateMockUUID('user-demo'),
    status: 'shipped',
    items: [
      {
        productId: generateMockUUID('macbook-pro-m3'),
        title: 'MacBook Pro M3',
        price: 1999,
        quantity: 1,
        total: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300'
      }
    ],
    subtotal: 1999,
    tax: 159.92,
    shipping: 0,
    discount: 0,
    total: 2158.92,
    shippingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    billingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    paymentMethod: {
      type: 'apple_pay'
    },
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-03T11:30:00Z',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-02-05T00:00:00Z'
  },
  {
    id: generateMockUUID('order-003'),
    userId: generateMockUUID('user-demo'),
    status: 'processing',
    items: [
      {
        productId: generateMockUUID('nike-air-max-270'),
        title: 'Nike Air Max 270',
        price: 150,
        quantity: 2,
        total: 300,
        thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
        variant: {
          size: '10',
          color: 'White/Black'
        }
      }
    ],
    subtotal: 300,
    tax: 24,
    shipping: 15,
    discount: 60,
    total: 279,
    shippingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    billingAddress: {
      firstName: 'Demo',
      lastName: 'User',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123'
    },
    paymentMethod: {
      type: 'credit_card',
      last4: '1234',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026
    },
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-10T16:45:00Z',
    estimatedDelivery: '2024-02-15T00:00:00Z'
  }
];

// Helper functions
export const getOrderById = (orderId: string): Order | undefined => {
  return MOCK_ORDERS.find(order => order.id === orderId);
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return MOCK_ORDERS
    .filter(order => order.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return MOCK_ORDERS.filter(order => order.status === status);
};

export const createMockOrder = (orderData: Partial<Order>): Order => {
  const orderId = `ORD-${new Date().getFullYear()}-${String(MOCK_ORDERS.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();
  
  const newOrder: Order = {
    id: orderId,
    userId: orderData.userId || generateMockUUID('user-demo'),
    status: 'pending',
    items: orderData.items || [],
    subtotal: orderData.subtotal || 0,
    tax: orderData.tax || 0,
    shipping: orderData.shipping || 0,
    discount: orderData.discount || 0,
    total: orderData.total || 0,
    shippingAddress: orderData.shippingAddress || {} as Address,
    billingAddress: orderData.billingAddress || {} as Address,
    paymentMethod: orderData.paymentMethod || {} as PaymentMethod,
    createdAt: now,
    updatedAt: now,
    ...orderData
  };
  
  MOCK_ORDERS.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): Order | null => {
  const order = getOrderById(orderId);
  if (!order) {
    return null;
  }
  
  order.status = status;
  order.updatedAt = new Date().toISOString();
  
  // Add tracking number when shipped
  if (status === 'shipped' && !order.trackingNumber) {
    order.trackingNumber = `TRK${Math.random().toString().substr(2, 9)}`;
  }
  
  return order;
};