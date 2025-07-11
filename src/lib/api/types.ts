// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  phone?: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  expiresInMins?: number;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  phone?: string;
  birthDate?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

// Product Types
export interface ProductListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  thumbnail: string;
  availabilityStatus: string;
  hasVariants: boolean;
}

export interface ProductAttribute {
  id: string;
  name: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: ProductAttribute[];
  images: string[];
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface ProductAttributeGroup {
  id: string;
  name: string;
  displayName: string;
  required: boolean;
  attributes: ProductAttribute[];
}

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  basePrice: number;
  discountPercentage: number;
  rating: number;
  totalStock: number;
  tags: string[];
  brand?: string;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
  reviews: Review[];
  attributeGroups: ProductAttributeGroup[];
  variants: ProductVariant[];
}

// For backward compatibility
export interface Product extends ProductDetail {}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: ProductListItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductDetailResponse {
  product: ProductDetail;
}

export interface ProductSearchParams {
  q?: string;
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

// Cart Types
export interface CartItem {
  id: string; // UUID for cart item
  productId: string; // Changed to string UUID
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
  selectedAttributes?: ProductAttribute[];
  sku?: string;
}

export interface Cart {
  id: string;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: string;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface AddToCartRequest {
  userId: string;
  products: {
    id: string;
    quantity: number;
  }[];
}

export interface UpdateCartRequest {
  merge?: boolean;
  products: {
    id: string;
    quantity: number;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginationParams {
  limit?: number;
  skip?: number;
}

export interface ApiError {
  message: string;
  status: number;
}
