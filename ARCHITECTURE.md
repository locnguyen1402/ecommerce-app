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

### ✅ Completed
- Mock data architecture with UUID system
- Auth system (login/register/forgot password with mock backend)
- Tab navigation (Home, Orders, Search, Notifications, Account)
- Homepage redesign with minimalist design system
- All auth pages redesigned with minimalist UI
- Multi-language support (EN/VI)
- Product listing with cart functionality
- Environment configuration
- Navigation flow with proper routing

### 🔄 In Progress
- Welcome page redesign
- Cart page improvements
- Product details page development

### 📋 Pending
- Checkout flow implementation
- User profile & settings pages
- Order management system
- Enhanced search & filtering
- Product variant selection UI

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