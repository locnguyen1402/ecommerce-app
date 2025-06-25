import { create } from 'zustand';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  category: string;
  discountPercentage: number;
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
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
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
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      // Update quantity if item already exists
      get().updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // Add new item
      const newItem: CartItem = {
        ...product,
        quantity,
      };
      
      set({ items: [...items, newItem] });
      get().calculateTotals();
    }
  },

  removeItem: (productId) => {
    const { items } = get();
    const filteredItems = items.filter(item => item.id !== productId);
    
    set({ items: filteredItems });
    get().calculateTotals();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const { items } = get();
    const updatedItems = items.map(item =>
      item.id === productId ? { ...item, quantity } : item
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

export const isItemInCart = (productId: number): boolean => {
  const items = useCartStore.getState().items;
  return items.some(item => item.id === productId);
};

export const getItemQuantity = (productId: number): number => {
  const items = useCartStore.getState().items;
  const item = items.find(item => item.id === productId);
  return item?.quantity || 0;
};