// Common types for the ecommerce application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  stockQuantity?: number;
  quantity?: number;
  variants?: ProductVariant[];
  features?: string[];
  specifications?: Record<string, string>;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  language: string;
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    orders: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutFormData {
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  billingAddress: Omit<Address, 'id' | 'isDefault'>;
  paymentMethod: string;
  notes?: string;
}

// Store types
export interface AppState {
  isLoading: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  isFirstLaunch: boolean;
  setLoading: (isLoading: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
  setFirstLaunchComplete: () => void;
}

export interface CartState extends Cart {
  addItem: (product: Product, quantity?: number, variants?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (addressId: string, address: Partial<Address>) => void;
  removeAddress: (addressId: string) => void;
}

// Navigation types
export type RootStackParamList = {
  '(tabs)': undefined;
  'modal/product-detail': { productId: string };
  'modal/cart': undefined;
  'modal/checkout': undefined;
  'modal/profile': undefined;
  'modal/orders': undefined;
  'modal/order-detail': { orderId: string };
  '+not-found': undefined;
};

export type TabParamList = {
  index: undefined;
  explore: undefined;
  cart: undefined;
  profile: undefined;
};

// API endpoints
export interface ApiEndpoints {
  products: string;
  categories: string;
  cart: string;
  orders: string;
  auth: string;
  user: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}
