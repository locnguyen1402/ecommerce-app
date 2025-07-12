# Ecommerce App Architecture

## Project Overview
- **Tech Stack**: React Native + Expo, TypeScript, NativeWind (Tailwind), Zustand
- **Architecture**: Mock/Real API with environment toggle
- **UI**: Minimalist design system with consistent 8px border radius
- **State Management**: Zustand stores
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind + Custom design system
- **Internationalization**: i18next (Vietnamese + English)

## Key Architecture Decisions

### 1. Mock/Real API Toggle
```typescript
// Environment config controls API behavior
EXPO_PUBLIC_API_MODE=mock (development)
EXPO_PUBLIC_API_MODE=real (production)
```

### 2. Organized Folder Structure
```
src/
├── app/                    # Expo Router pages (organized by feature)
│   ├── (auth)/            # Authentication flow
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (ordering)/        # Checkout & order flow
│   │   ├── checkout.tsx
│   │   └── order-success.tsx
│   ├── home/              # Main tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx      # Home tab
│   │   ├── orders.tsx
│   │   ├── search.tsx
│   │   ├── notifications.tsx
│   │   └── account.tsx
│   ├── order/[id].tsx     # Dynamic order details
│   ├── product/           # Product-related pages
│   │   ├── [id].tsx
│   │   └── search-results.tsx
│   ├── login.tsx          # Login (standalone)
│   ├── cart.tsx
│   ├── index.tsx
│   └── welcome.tsx
├── components/             # Reusable UI components
│   └── ui/                # Base UI components
├── lib/
│   ├── api/               # API services & types
│   ├── stores/            # Zustand stores  
│   ├── hooks/             # Custom hooks
│   ├── mock_data/         # Mock data & helpers
│   ├── i18n/              # Internationalization
│   ├── providers/         # Context providers (AppProvider, QueryProvider)
│   └── utils/             # Utility functions
└── assets/                # Static assets
```

### 3. State Management
- **Auth Store**: User authentication & profile
- **Cart Store**: Shopping cart functionality
- **Language Store**: i18n preferences
- **Product Store**: Product data & search

### 4. API Layer
- Service layer with mock/real API switch
- TypeScript interfaces for all API responses
- UUID-based IDs for consistency
- Mock data identical to future real API structure

### 5. Design System
- **Colors**: Primary (#3B82F6), monochromatic palette
- **Typography**: Inter font family
- **Spacing**: 8px base unit
- **Border Radius**: 8px consistent
- **Components**: Minimalist, no shadows/gradients

### 6. Android Edge-to-Edge Support
- **SafeAreaProvider**: Integrated into AppProvider for proper safe area handling
- **StatusBar**: Configured with transparent background and translucent mode
- **app.config.ts**: `edgeToEdgeEnabled: true` for modern Android compatibility
- **Screen Implementation**: All major screens handle safe area insets properly
- **Device Support**: Compatible with notches, navigation bars, and edge-to-edge displays

## Current Implementation Status

### ✅ Completed (Production Ready)
- **Core Architecture**: Mock data with UUID system, API service layer with mock/real toggle
- **Authentication**: Complete login/register/forgot password flow with mock backend  
- **Organized File Structure**: Feature-grouped app folder with proper navigation routing
- **Navigation**: Tab navigation (Home, Orders, Search, Notifications, Account) with organized structure
- **Shopping Experience**: Homepage, product details, cart with variant support
- **Product System**: Product listing, details view, image gallery, variant selection
- **Cart Management**: Add/remove items, quantity updates, variant handling, persistent storage
- **Checkout Flow**: Multi-step checkout (address → payment → review) with form validation
- **Order Management**: Order creation, history, details view, status tracking
- **Enhanced Search System**: Complete search with advanced filtering, analytics, infinite scroll
- **Design System**: Minimalist UI with consistent 8px radius, monochromatic colors, Inter typography
- **Android Edge-to-Edge**: Modern Android compatibility with safe area handling
- **Technical**: Multi-language support (EN/VI), environment configuration, TypeScript interfaces
- **State Management**: Zustand stores for auth, cart, orders with AsyncStorage persistence

### 🔄 Current Status
**Production-ready e-commerce app** with complete shopping flow, organized structure, and modern Android support.

### 📁 Navigation Structure
```
Routes after reorganization:
/ (root)
├── /login
├── /welcome
├── /(auth)/register
├── /(auth)/forgot-password
├── /(ordering)/checkout
├── /(ordering)/order-success
├── /home (tab navigation)
│   ├── /home (index - main tab)
│   ├── /home/orders
│   ├── /home/search
│   ├── /home/notifications
│   └── /home/account
├── /cart
├── /order/[id]
└── /product/[id]
```

### 📋 Remaining (Enhancement Features)
- User profile & settings pages
- Category-based browsing (may integrate with search)
- Wishlist functionality
- Advanced order management features

## Development Guidelines

### Commands
```bash
npm run start          # Start development server
npm run build          # Build for production
npm run lint          # Run linting
npm run typecheck     # TypeScript check
```

### Code Standards
- Follow import organization (external → internal → relative)
- Use TypeScript interfaces for all data structures
- Implement proper error handling
- Add loading states for async operations
- Clean up unused code/imports
- Follow minimalist design principles

### Testing Strategy
- Mock API for development
- Real API integration for production
- Environment-based configuration
- Consistent data structures across environments