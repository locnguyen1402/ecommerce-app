# Claude Code Instructions

## Act as a Senior Developer (20+ years experience)

Write production-ready, bug-free code with meticulous attention to detail.

## Critical Rules

1. **Never crash the app** - Handle all exceptions
2. **Validate everything** - User inputs, API responses, props
3. **Performance first** - Optimize for 60fps
4. **Platform awareness** - Test iOS/Android differences
5. **Memory management** - Clean up listeners, timers, subscriptions
6. **Clean codebase** - Always remove unused imports, variables, functions, and dead code

## When Writing Code

- Think about what could go wrong
- Handle loading states properly
- Implement proper keyboard handling
- Consider accessibility
- Use descriptive variable names
- Add JSDoc comments for complex logic

**Write code like it's going to production tomorrow.**

## Import Organization Standards

### Import Sorting Rules

- Always organize imports in the following order from top to bottom:
  1. **External libraries** (React, third-party packages)
  2. **Internal imports** grouped by directory structure:
     - `~/lib/**` - Utility libraries and helper functions
     - `~/components/**` - Reusable components
     - Other internal paths (`~/hooks/**`, `~/types/**`, etc.)
     - Relative imports (`./`, `../`)

### Import Grouping Format

- Separate each import group with a blank line
- Within each group, sort alphabetically
- Use consistent import syntax (prefer named imports when possible)

### Example Structure

```typescript
// External libraries
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Internal utilities
import { formatDate, validateEmail } from '~/lib/utils';
import { api } from '~/lib/api';

// Components
import { Button } from '~/components/ui/Button';
import { Header } from '~/components/layout/Header';

// Relative imports
import { LocalComponent } from './LocalComponent';
import type { Props } from '../types';
```

# Project Context

## Quick Reference
- **Project**: React Native ecommerce app with Expo
- **Current Status**: Auth system + Tab Navigation completed, working on remaining UI improvements
- **Architecture**: Mock/Real API toggle, Zustand stores, NativeWind styling
- **Key Files**: Check @PROJECT_PLAN.md @DESIGN_SYSTEM.md @ARCHITECTURE.md
- **Languages**: Vietnamese (default) + English
- **API Mode**: Mock (development) - toggle via EXPO_PUBLIC_API_MODE

## Current Status - PRODUCTION READY! 🎉
- [x] Complete E-commerce Flow ✅
- [x] Authentication System ✅  
- [x] Shopping Experience ✅
- [x] Checkout & Orders ✅
- [x] Minimalist Design System ✅
- [x] State Management ✅
- [x] Product Variants Support ✅
- [x] Enhanced Search System ✅
- [x] Organized File Structure ✅
- [x] Android Edge-to-Edge Support ✅

**App is production-ready with full shopping flow + optimized structure:**
Homepage → Product Details → Cart → Checkout → Order Management
Search Tab → Search Input + History/Suggestions → Results + Filters → Infinite Scroll

## ✅ Latest Updates - COMPLETED

### 🏗️ File Structure Reorganization
- **Auth files** grouped in `(auth)/` folder: `register.tsx`, `forgot-password.tsx`
- **Ordering files** grouped in `(ordering)/` folder: `checkout.tsx`, `order-success.tsx`
- **Tab navigation** renamed from `(tabs)` to `home` with `index.tsx` as main tab
- **Navigation paths** updated throughout codebase
- **Removed duplicate** `homepage.tsx` file

### 📱 Android Edge-to-Edge Implementation
- **SafeAreaProvider** integrated into AppProvider for better organization
- **StatusBar** configured with transparent background and translucent mode
- **Safe area handling** added to all major screens (Home, Login, Cart, Welcome)
- **app.config.ts** configured with `edgeToEdgeEnabled: true`
- **Full Android compatibility** with modern edge-to-edge devices

### 🔧 API Architecture Consistency
- ✅ All API services follow consistent mock/real pattern
- ✅ Complete configuration files: `config.ts`, `client.ts`, `delay.ts`
- ✅ Unified error handling and delay utilities across services
- ✅ Services: `auth.ts`, `products.ts`, `orders.ts`, `carts.ts`, `search.ts`

### 🏗️ Navigation Architecture Refactor - COMPLETED ✅
- ✅ **Stack Navigator Implementation**: Created AppStack component in separate file
- ✅ **Replaced Slot with Stack**: Updated root _layout.tsx to use Stack navigation
- ✅ **Consistent Headers**: Automatic safe area handling via Stack navigator
- ✅ **Removed Manual Headers**: Eliminated all manual `useSafeAreaInsets` calculations
- ✅ **Fixed JSX Structures**: Resolved all TypeScript errors from manual header removal
- ✅ **Per-screen Header Control**: Configure `headerShown` options per route in AppStack

### 🔍 Single Character Search Support - COMPLETED ✅
- ✅ **API Hooks Updated**: Changed minimum query length from 2 to 1 character
- ✅ **Search Store Updated**: Removed length restriction for search history
- ✅ **Suggestions API Updated**: Enable single character search suggestions
- ✅ **Search Results**: Now returns products for queries like "i", "a", "s"

### 🧹 TypeScript Error Fixes - COMPLETED ✅
- ✅ **All TS Errors Resolved**: `npx tsc --noEmit` runs successfully
- ✅ **JSX Structure Fixed**: Corrected cart.tsx, checkout.tsx, order-success.tsx
- ✅ **Import Cleanup**: Removed unused `useSafeAreaInsets` imports
- ✅ **Variable Cleanup**: Fixed undefined variable references

## 🔄 Current Status - PRODUCTION READY WITH IMPROVEMENTS ✅

### Major Completed Improvements:
1. **Modern Navigation Architecture** - Stack-based with automatic headers
2. **Enhanced Search Capability** - Support for single character queries
3. **Clean TypeScript Codebase** - Zero compilation errors
4. **Consistent Safe Area Handling** - Via Stack navigator instead of manual calculations

## Updated File Structure

### 📁 New App Organization
```
src/app/
├── (auth)/
│   ├── register.tsx
│   └── forgot-password.tsx
├── (ordering)/
│   ├── checkout.tsx
│   └── order-success.tsx
├── home/ (main tab navigation)
│   ├── _layout.tsx
│   ├── index.tsx (home tab)
│   ├── orders.tsx
│   ├── search.tsx
│   ├── notifications.tsx
│   └── account.tsx
├── login.tsx
├── cart.tsx
├── index.tsx
├── welcome.tsx
├── order/[id].tsx
└── product/
    ├── [id].tsx
    └── search-results.tsx
```

### 🔄 Navigation Updates
- `/register` → `/(auth)/register`
- `/forgot-password` → `/(auth)/forgot-password`
- `/checkout` → `/(ordering)/checkout`
- `/order-success` → `/(ordering)/order-success`
- `/home` → Main tab navigation hub

## ⚠️ Remaining Tasks (Optional Enhancements)

### 🔧 Technical Improvements (Medium Priority)
- [ ] **Clean up unused imports** - Remove unused variables in order-success.tsx, product/[id].tsx
- [ ] **Code optimization** - Review and optimize component performance

### 🎯 Feature Enhancements (Low Priority)
- [ ] **User Profile Pages** - Account settings, profile management
- [ ] **Wishlist Functionality** - Save products for later
- [ ] **Category Browse** - Enhanced category-based navigation
- [ ] **Advanced Settings** - App preferences, notifications

## 📋 Development Commands
- `npm run start` - Start dev server
- `npx tsc --noEmit` - TypeScript type checking
- **Navigation**: Stack-based via `src/components/navigation/AppStack.tsx`
- **Search**: Single character support enabled
- **Headers**: Automatic via Stack navigator (no manual implementation needed)

## 📁 Key File Locations
- **Navigation**: `src/components/navigation/AppStack.tsx`
- **Auth files**: `src/app/(auth)/register.tsx`, `src/app/(auth)/forgot-password.tsx`, `src/app/login.tsx`
- **Tab files**: `src/app/home/index.tsx`, `src/app/home/orders.tsx`, `src/app/home/search.tsx`, `src/app/home/notifications.tsx`, `src/app/home/account.tsx`
- **Ordering files**: `src/app/(ordering)/checkout.tsx`, `src/app/(ordering)/order-success.tsx`
- **Search API**: `src/lib/api/search.ts` (single character support enabled)
- **API Hooks**: `src/lib/hooks/useApi.ts` (updated for single character queries)
