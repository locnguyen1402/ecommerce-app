import { create } from 'zustand';

export interface CartItem {
  id: string;  // Changed to string to match Product.id
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  category: string;
  discountPercentage: number;
  variant?: {
    id?: string;
    size?: string;
    color?: string;
    displayName?: string;
  };
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalDiscountedPrice: number;
  isLoading: boolean;
}

interface CartActions {
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (cartItemIndex: number) => void;
  updateQuantity: (cartItemIndex: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],
  totalItems: 0,
  totalPrice: 0,
  totalDiscountedPrice: 0,
  isLoading: false,

  // Actions
  addItem: (product, quantity = 1) => {
    const { items } = get();
    
    // Find existing item with same id AND variant
    const existingItem = items.find(item => {
      if (item.id !== product.id) return false;
      
      // If neither has variant, they match
      if (!item.variant && !product.variant) return true;
      
      // If one has variant and other doesn't, they don't match
      if (!item.variant || !product.variant) return false;
      
      // Both have variants, compare variant id or properties
      return item.variant.id === product.variant.id ||
             (item.variant.size === product.variant.size && 
              item.variant.color === product.variant.color);
    });

    if (existingItem) {
      // Update quantity if item with same variant already exists
      const itemIndex = items.findIndex(item => item === existingItem);
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
      };
      set({ items: updatedItems });
    } else {
      // Add new item (different product or different variant)
      const newItem: CartItem = {
        ...product,
        quantity,
      };
      
      set({ items: [...items, newItem] });
    }
    get().calculateTotals();
  },

  removeItem: (cartItemIndex) => {
    const { items } = get();
    const filteredItems = items.filter((_, index) => index !== cartItemIndex);
    
    set({ items: filteredItems });
    get().calculateTotals();
  },

  updateQuantity: (cartItemIndex, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartItemIndex);
      return;
    }

    const { items } = get();
    const updatedItems = items.map((item, index) =>
      index === cartItemIndex ? { ...item, quantity } : item
    );
    
    set({ items: updatedItems });
    get().calculateTotals();
  },

  clearCart: () => {
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalDiscountedPrice: 0,
    });
  },

  calculateTotals: () => {
    const { items } = get();
    
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscountedPrice = items.reduce((sum, item) => {
      const discountAmount = (item.price * item.discountPercentage) / 100;
      const discountedPrice = item.price - discountAmount;
      return sum + (discountedPrice * item.quantity);
    }, 0);

    set({
      totalItems,
      totalPrice,
      totalDiscountedPrice,
    });
  },
}));

// Helper functions for external use
export const getCartItemCount = (): number => {
  return useCartStore.getState().totalItems;
};

export const getCartTotal = (): number => {
  return useCartStore.getState().totalDiscountedPrice;
};

export const isItemInCart = (productId: string): boolean => {
  const items = useCartStore.getState().items;
  return items.some(item => item.id === productId);
};

export const getItemQuantity = (productId: string): number => {
  const items = useCartStore.getState().items;
  const item = items.find(item => item.id === productId);
  return item?.quantity || 0;
};