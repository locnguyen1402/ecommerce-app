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

### 2. Folder Structure
```
src/
├── app/                    # Expo Router pages
├── components/             # Reusable UI components
│   └── ui/                # Base UI components
├── lib/
│   ├── api/               # API services & types
│   ├── stores/            # Zustand stores
│   ├── hooks/             # Custom hooks
│   ├── mock_data/         # Mock data & helpers
│   ├── i18n/              # Internationalization
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

## Current Implementation Status

### ✅ Completed (Production Ready)
- **Core Architecture**: Mock data with UUID system, API service layer with mock/real toggle
- **Authentication**: Complete login/register/forgot password flow with mock backend
- **Navigation**: Tab navigation (Home, Orders, Search, Notifications, Account) with proper routing
- **Shopping Experience**: Homepage, product details, cart with variant support
- **Product System**: Product listing, details view, image gallery, variant selection
- **Cart Management**: Add/remove items, quantity updates, variant handling, persistent storage
- **Checkout Flow**: Multi-step checkout (address → payment → review) with form validation
- **Order Management**: Order creation, history, details view, status tracking
- **Design System**: Minimalist UI with consistent 8px radius, monochromatic colors, Inter typography
- **Technical**: Multi-language support (EN/VI), environment configuration, TypeScript interfaces
- **State Management**: Zustand stores for auth, cart, orders with AsyncStorage persistence

### 🔄 Current Status
**Complete e-commerce app** with full shopping flow ready for production deployment.

### 🔄 Next Implementation
- **Enhanced Search System** - Complete search với advanced filtering, analytics, infinite scroll
  - Tab navigation integration
  - Search input với suggestions và history
  - Filter drawer (categories, price range, rating)
  - Product search results với infinite scroll
  - Full API-driven architecture với caching
  - User behavior analytics tracking
  - Reference: SEARCH_FEATURE_SPEC.md

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