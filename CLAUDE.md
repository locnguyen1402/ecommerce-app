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

### 📱 Safe Area & Navigation Fixes
- ✅ Fixed TypeScript errors across 25+ files
- ✅ Fixed edge-to-edge display functionality working properly
- ✅ Added manual safe area handling to all tab screens (orders, account, notifications)
- ✅ Fixed content being hidden behind system status bars and navigation bars
- ⚠️ **Technical Debt**: Manual header implementation per screen needs refactoring

## 🚨 Next Critical Task (High Priority)

### Navigation Architecture Refactor
**Problem**: Current manual header implementation với inconsistent safe area handling  
**Solution**: Wrap entire app trong single Stack navigator  
**Benefits**: 
- Consistent headers với automatic safe area
- Better navigation UX với Stack animations
- Eliminate duplicate header code
- Built-in back button handling
- Per-screen `headerShown` toggle capability

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

## Common Tasks
- `npm run start` - Start dev server
- **Auth files**: `src/app/(auth)/register.tsx`, `src/app/(auth)/forgot-password.tsx`, `src/app/login.tsx`
- **Main files**: `src/app/index.tsx`, `src/app/welcome.tsx`
- **Tab files**: `src/app/home/index.tsx`, `src/app/home/orders.tsx`, `src/app/home/search.tsx`, `src/app/home/notifications.tsx`, `src/app/home/account.tsx`
- **Ordering files**: `src/app/(ordering)/checkout.tsx`, `src/app/(ordering)/order-success.tsx`
- **API**: `src/lib/api/auth.ts`, `src/lib/stores/auth.ts`
- **Mock data**: `src/lib/mock_data/users.ts`
- **Translations**: `src/lib/i18n/locales/`
