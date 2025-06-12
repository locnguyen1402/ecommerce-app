# React Native Ecommerce Setup Guide

## 🚀 Complete Step-by-Step Setup

Follow this guide to set up your React Native ecommerce project with the chosen tech stack.

## Prerequisites

- **Node.js** 18+ installed
- **Git** installed
- **VS Code** with GitHub Copilot
- **iOS Simulator** / **Android Studio** (for development)

---

## Step 1: Initialize Project

### 1.1 Create Expo Project
```bash
npx create-expo-app@latest . --template tabs@latest
```

### 1.2 Setup Yarn v4
```bash
# Enable corepack (Node.js 16.10+)
corepack enable

# Set Yarn version to latest
yarn set version latest

# Configure for React Native
yarn config set nodeLinker node-modules
```

### 1.3 Create .yarnrc.yml
```yaml
# .yarnrc.yml
nodeLinker: node-modules
yarnPath: .yarn/releases/yarn-latest.cjs
enableGlobalCache: false

# Expo compatibility
packageExtensions:
  "@expo/cli@*":
    dependencies:
      "@expo/rudder-sdk-node": "*"
```

---

## Step 2: Install Core Dependencies

### 2.1 Foundation Dependencies
```bash
# Safe area and SVG support (required)
npx expo install react-native-safe-area-context react-native-svg

# Gesture handling for performance
npx expo install react-native-gesture-handler

# AsyncStorage for persistence
yarn add @react-native-async-storage/async-storage
```

### 2.2 UI and Styling
```bash
# NativeWind and React Native Reusables
yarn add nativewind
yarn add --dev tailwindcss@3.3.0

# Icons
yarn add lucide-react-native
```

### 2.3 State Management
```bash
# Zustand for state management
yarn add zustand

# TanStack Query for server state
yarn add @tanstack/react-query
```

### 2.4 Forms and Validation
```bash
# Form handling and validation
yarn add react-hook-form yup @hookform/resolvers
```

### 2.5 Utilities
```bash
# Date handling
yarn add dayjs

# Currency formatting
yarn add currency.js react-native-localize

# Internationalization
yarn add react-i18next i18next

# Toast notifications
yarn add react-native-toast-message
```

---

## Step 3: Configure NativeWind

### 3.1 Create tailwind.config.js
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
```

### 3.2 Update babel.config.js
```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // NativeWind plugin
      'nativewind/babel',
      // Required for Expo Router
      'expo-router/babel',
      // React Native Reanimated (if using)
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 3.3 Create global.css
```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
  --radius: 0.5rem;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  --primary: #3b82f6;
  --primary-foreground: #ffffff;
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #1e293b;
  --accent-foreground: #f8fafc;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #334155;
  --input: #334155;
  --ring: #3b82f6;
}
```

---

## Step 4: Manual Setup React Native Reusables

### 4.1 Install Required Dependencies
```bash
# Core dependencies for React Native Reusables
yarn add class-variance-authority clsx tailwind-merge
yarn add react-native-reanimated
```

### 4.2 Create components.json
```json
{
  "$schema": "https://react-native-reusables.vercel.app/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "global.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils"
  }
}
```

### 4.3 Create lib/utils.ts
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4.4 Create Base Components Directory
```bash
mkdir -p components/ui
mkdir -p lib
```

### 4.5 Create Essential UI Components Manually

#### Button Component
```typescript
// components/ui/button.tsx
import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline-offset-4',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-base',
      icon: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  title?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, title, children, ...props }, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {title ? (
        <Text className={cn(buttonTextVariants({ variant, size }))}>
          {title}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants, buttonTextVariants };
```

#### Card Component
```typescript
// components/ui/card.tsx
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';

const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
```

#### Input Component
```typescript
// components/ui/input.tsx
import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '~/lib/utils';

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, placeholderTextColor, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderTextColor={placeholderTextColor ?? '#64748B'}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

#### Badge Component
```typescript
// components/ui/badge.tsx
import * as React from 'react';
import { Text, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground', 
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  label?: string;
}

function Badge({ className, variant, label, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      {label ? (
        <Text className={cn(badgeTextVariants({ variant }))}>
          {label}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export { Badge, badgeVariants };
```

### 4.6 Add More Components As Needed
You can manually add more components like:
- `Alert` for notifications
- `Dialog` for modals  
- `Select` for dropdowns
- `Switch` for toggles
- `Progress` for loading states

Reference the [React Native Reusables documentation](https://rn-reusables.vercel.app/) for component code.

---

## Step 5: Configure TypeScript

### 5.1 Update tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "~/*": ["./*"]
    },
    "types": ["nativewind/types"]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### 5.2 Create src/types directory
```bash
mkdir -p src/types
```

### 5.3 Create type definitions
```typescript
// src/types/api.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// src/types/navigation.ts
export type TabParamList = {
  index: undefined;
  cart: undefined;
  profile: undefined;
};

export type ModalParamList = {
  'product/[id]': { id: string };
  checkout: undefined;
  auth: undefined;
};
```

---

## Step 6: Create Project Structure

### 6.1 Create folder structure
```bash
mkdir -p src/{components/{ui,ecommerce},stores,services,utils,locales,hooks}
```

### 6.2 Move and organize files
```bash
# Move existing files to src
mv components src/
mv constants src/
```

---

## Step 7: Setup State Management

### 7.1 Create Zustand Cart Store
```typescript
// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '@/types/api';

interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (id: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === newItem.id);
          
          let updatedItems: CartItem[];
          if (existingItem) {
            updatedItems = state.items.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedItems = [...state.items, { ...newItem, quantity: 1 }];
          }
          
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          
          return { items: updatedItems, total, itemCount };
        });
      },
      
      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.id !== id);
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          
          return { items: updatedItems, total, itemCount };
        });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => {
          const updatedItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          
          return { items: updatedItems, total, itemCount };
        });
      },
      
      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
      
      getItem: (id) => get().items.find(item => item.id === id),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### 7.2 Create App Store
```typescript
// src/stores/appStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStore {
  theme: 'light' | 'dark';
  language: 'en' | 'vi';
  currency: 'USD' | 'VND';
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'vi') => void;
  setCurrency: (currency: 'USD' | 'VND') => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'en',
      currency: 'USD',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## Step 8: Setup TanStack Query

### 8.1 Create Query Client
```typescript
// src/services/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

### 8.2 Create API hooks
```typescript
// src/services/products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/types/api';

// Mock API - replace with your actual API
const API_BASE = 'https://api.yourstore.com';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      // Replace with actual API call
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      const response = await fetch(`${API_BASE}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    },
    enabled: !!id,
  });
};
```

---

## Step 9: Setup Internationalization

### 9.1 Create i18n configuration
```typescript
// src/locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './en.json';
import vi from './vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lng: string) => void) => {
    const locale = Localization.getLocales()[0].languageCode;
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### 9.2 Create translation files
```json
// src/locales/en.json
{
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Try again",
    "cancel": "Cancel",
    "confirm": "Confirm"
  },
  "products": {
    "title": "Products",
    "addToCart": "Add to Cart",
    "outOfStock": "Out of Stock",
    "price": "Price"
  },
  "cart": {
    "title": "Shopping Cart",
    "empty": "Your cart is empty",
    "subtotal": "Subtotal",
    "tax": "Tax",
    "shipping": "Shipping",
    "total": "Total",
    "checkout": "Checkout"
  }
}
```

```json
// src/locales/vi.json
{
  "common": {
    "loading": "Đang tải...",
    "error": "Đã có lỗi xảy ra",
    "retry": "Thử lại",
    "cancel": "Hủy",
    "confirm": "Xác nhận"
  },
  "products": {
    "title": "Sản phẩm",
    "addToCart": "Thêm vào giỏ",
    "outOfStock": "Hết hàng",
    "price": "Giá"
  },
  "cart": {
    "title": "Giỏ hàng",
    "empty": "Giỏ hàng trống",
    "subtotal": "Tạm tính",
    "tax": "Thuế",
    "shipping": "Vận chuyển",
    "total": "Tổng cộng",
    "checkout": "Thanh toán"
  }
}
```

---

## Step 10: Create Utility Functions

### 10.1 Currency utilities
```typescript
// src/utils/currency.ts
import currency from 'currency.js';
import { getNumberFormatSettings } from 'react-native-localize';

const formatSettings = getNumberFormatSettings();

export const useCurrency = (locale = 'en-US', currencyCode = 'USD') => {
  const formatCurrency = (amount: number | currency) => {
    const value = typeof amount === 'number' ? amount : amount.value;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'VND' ? 0 : 2,
    }).format(value);
  };
  
  const calculate = (amount: number) => currency(amount);
  
  return { formatCurrency, calculate };
};

// Currency constants
export const VND = (value: number) => currency(value, {
  symbol: '₫',
  precision: 0,
  separator: '.',
  decimal: ',',
  formatWithSymbol: true,
  format: '%v%s'
});

export const USD = (value: number) => currency(value, {
  symbol: '$',
  precision: 2,
  separator: ',',
  decimal: '.',
  formatWithSymbol: true,
  format: '%s%v'
});
```

### 10.2 Validation schemas
```typescript
// src/utils/validation.ts
import * as yup from 'yup';

export const checkoutSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  address: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s-()]+$/, 'Invalid phone number')
    .required('Phone number is required'),
});

export type CheckoutFormData = yup.InferType<typeof checkoutSchema>;
```

---

## Step 11: Update App Layout

### 11.1 Update app/_layout.tsx
```tsx
// app/_layout.tsx
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { queryClient } from '@/src/services/queryClient';
import '@/src/locales';
import '@/global.css';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
```

### 11.2 Update app/(tabs)/_layout.tsx
```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Home, ShoppingCart, User } from 'lucide-react-native';

import { useCartStore } from '@/src/stores/cartStore';

export default function TabLayout() {
  const { t } = useTranslation();
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('products.title'),
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('cart.title'),
          tabBarIcon: ({ color }) => <ShoppingCart size={24} color={color} />,
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---

## Step 12: Test Setup

### 12.1 Start development server
```bash
yarn start
```

### 12.2 Test on simulators
```bash
# iOS
yarn ios

# Android  
yarn android

# Web
yarn web
```

### 12.3 Verify installations
- Check if NativeWind styles are working
- Test navigation between tabs
- Verify Zustand store persistence (add item to cart, restart app)
- Test toast notifications
- Check if translations work

---

## Step 13: Create Sample Components

### 13.1 Create ProductCard component
```tsx
// src/components/ecommerce/ProductCard.tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import { Product } from '@/src/types/api';
import { useCartStore } from '@/src/stores/cartStore';
import { useCurrency } from '@/src/utils/currency';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    Toast.show({
      type: 'success',
      text1: t('products.addToCart'),
      text2: product.name,
    });
  };

  return (
    <Card className="p-4 m-2">
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: product.image }}
          className="w-full h-48 rounded-lg mb-3"
          resizeMode="cover"
        />
        
        <Text className="text-lg font-semibold mb-2" numberOfLines={2}>
          {product.name}
        </Text>
        
        <Text className="text-gray-600 mb-3" numberOfLines={3}>
          {product.description}
        </Text>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold text-green-600">
            {formatCurrency(product.price)}
          </Text>
          
          {product.inStock ? (
            <Button onPress={handleAddToCart} className="flex-row items-center">
              <ShoppingCart size={16} color="white" />
              <Text className="text-white ml-2">{t('products.addToCart')}</Text>
            </Button>
          ) : (
            <Badge variant="destructive">
              <Text>{t('products.outOfStock')}</Text>
            </Badge>
          )}
        </View>
      </Pressable>
    </Card>
  );
};
```

---

## 🎉 Setup Complete!

Your React Native ecommerce project is now ready with:

✅ **Modern tech stack** - Expo, TypeScript, NativeWind, Zustand
✅ **UI components** - React Native Reusables setup  
✅ **State management** - Cart and app stores with persistence
✅ **API integration** - TanStack Query configuration
✅ **Internationalization** - English and Vietnamese support
✅ **Currency formatting** - Multi-currency support
✅ **Navigation** - Tab-based navigation with Expo Router
✅ **Type safety** - Complete TypeScript setup

## Next Steps

1. **Implement your API endpoints** in `src/services/`
2. **Create more components** using React Native Reusables
3. **Add authentication** with user store
4. **Build checkout flow** with React Hook Form
5. **Add product search** and filtering
6. **Implement push notifications**
7. **Add offline support** with TanStack Query

## Development Commands

```bash
# Start development
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Type checking
yarn tsc

# Build for production
yarn build
```

**Happy coding! 🚀**