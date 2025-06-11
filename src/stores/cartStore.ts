import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState, CartItem, Product } from '@/types';

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'USD',

      addItem: (product: Product, quantity = 1, variants = {}) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => 
            item.productId === product.id && 
            JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          // Update existing item quantity
          newItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}_${Date.now()}`,
            productId: product.id,
            product,
            quantity,
            selectedVariants: variants,
            addedAt: new Date().toISOString(),
          };
          newItems = [...items, newItem];
        }

        const calculations = calculateTotals(newItems);
        set({
          items: newItems,
          ...calculations,
        });
      },

      removeItem: (itemId: string) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== itemId);
        const calculations = calculateTotals(newItems);
        
        set({
          items: newItems,
          ...calculations,
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        
        const calculations = calculateTotals(newItems);
        set({
          items: newItems,
          ...calculations,
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
        });
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemById: (itemId: string) => {
        const { items } = get();
        return items.find((item) => item.id === itemId);
      },
    }),
    {
      name: 'ecommerce-cart',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist essential data
      partialize: (state) => ({
        items: state.items,
        currency: state.currency,
      }),
      // Rehydrate calculations after loading from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          const calculations = calculateTotals(state.items);
          Object.assign(state, calculations);
        }
      },
    }
  )
);

// Helper function to calculate cart totals
function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate tax (8% for example)
  const tax = subtotal * 0.08;
  
  // Calculate shipping (free for orders over $50)
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  const total = subtotal + tax + shipping;

  return {
    totalItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

export default useCartStore;
