# Ecommerce App Development Plan

## **Project Overview**
- **Resource**: 1 developer, 3 hours/day
- **Timeline**: 5 weeks (105 hours total)
- **Goal**: Complete ecommerce app with minimalist design
- **Tech Stack**: React Native + Expo, TypeScript, NativeWind, Zustand

## **Development Strategy**

### **Mock/Real API Architecture**
```
Environment Variables:
- EXPO_PUBLIC_API_MODE=mock (development)
- EXPO_PUBLIC_API_MODE=real (production)

Folder Structure:
src/lib/
├── mock_data/          # Mock data với type safety
├── types/              # TypeScript interfaces
├── api/services/       # Service layer với mock/real toggle
└── config/            # Environment configuration
```

### **Pages Status & Priority**

#### **🔥 CRITICAL - Phase 1 (Tuần 1-2)**
- [x] ~~Login Page~~ - ✅ **COMPLETED**
- [x] ~~Register Page~~ - ✅ **COMPLETED**
- [x] ~~Forgot Password Page~~ - ✅ **COMPLETED**
- [x] ~~Welcome Page~~ - ✅ **COMPLETED**
- [x] ~~Homepage~~ - ✅ **COMPLETED**
- [x] ~~Cart Page~~ - ✅ **COMPLETED**
- [x] ~~Product Details Page~~ - ✅ **COMPLETED**

#### **🚨 HIGH PRIORITY - Phase 2 (Tuần 2-3)**
- [x] ~~Checkout Flow~~ - ✅ **COMPLETED**
- [x] ~~Order Confirmation~~ - ✅ **COMPLETED**
- [ ] **User Profile** - ❌ **MISSING**
- [x] ~~Order History~~ - ✅ **COMPLETED**
- [ ] **Address Management** - ❌ **MISSING**
- [x] ~~Enhanced Search~~ - ✅ **COMPLETED**
- [ ] **Category Browse** - ❌ **MISSING**

#### **⚡ MEDIUM PRIORITY - Phase 3 (Tuần 3-4)**
- [ ] **Wishlist** - ❌ **MISSING**
- [ ] **Settings** - ❌ **MISSING**
- [x] ~~Order Details~~ - ✅ **COMPLETED**
- [ ] **Payment Methods** - ❌ **MISSING**

#### **🎯 LOW PRIORITY - Phase 4 (Tuần 4-5)**
- [ ] **Product Reviews** - ❌ **MISSING**
- [ ] **Notifications** - ❌ **MISSING**
- [ ] **Help Center** - ❌ **MISSING**
- [ ] **Coupons** - ❌ **MISSING**

## **Weekly Implementation Plan**

### **TUẦN 1: Mock Data Setup + Auth System (21 giờ)**

#### **Day 1-2: Mock Data Architecture (6 giờ)**
- [ ] Remove DummyJSON API completely
- [ ] Create `src/lib/mock_data/` folder structure
- [ ] Define TypeScript interfaces for all entities
- [ ] Create mock data files: products.ts, categories.ts, users.ts, orders.ts, reviews.ts
- [ ] Setup environment config for API_MODE toggle
- [ ] Implement service layer with mock/real API switch

#### **Day 3-4: Auth Pages Complete (6 giờ)**
- [ ] Create Register page with form validation
- [ ] Create Forgot Password page with email reset flow
- [ ] Improve Login UI with minimalist design
- [ ] Add loading states and error handling
- [ ] Update navigation flow

#### **Day 5-7: Core Pages UI Improvement (9 giờ)**
- [ ] Redesign Homepage with minimalist style
- [ ] Redesign Welcome page with simple onboarding
- [ ] Improve Cart page UI and functionality
- [ ] Update color scheme to minimalist palette
- [ ] Ensure dark/light mode compatibility

### **TUẦN 2: Essential Shopping Flow (21 giờ)**

#### **Day 8-9: Product Details Page (6 giờ)**
- [ ] Create product/[id] route
- [ ] Implement image gallery with simple design
- [ ] Add product specifications display
- [ ] Implement variants selection (size, color)
- [ ] Add to cart functionality
- [ ] Related products section

#### **Day 10-11: Search & Browse (6 giờ)**
- [ ] Create enhanced search results page
- [ ] Implement category browse page
- [ ] Add filters and sorting functionality
- [ ] Create search history and suggestions
- [ ] Mobile-responsive design

#### **Day 12-14: User Profile System (9 giờ)**
- [ ] Create user profile page
- [ ] Implement address management
- [ ] Add basic settings functionality
- [ ] Create account settings page
- [ ] Profile edit functionality

### **TUẦN 3: Checkout & Orders (21 giờ)**

#### **Day 15-16: Checkout Flow (6 giờ)**
- [ ] Create multi-step checkout process
- [ ] Address selection functionality
- [ ] Payment method selection (mock)
- [ ] Order summary and validation
- [ ] Promo code application

#### **Day 17-18: Order Management (6 giờ)**
- [ ] Order confirmation page
- [ ] Order history listing
- [ ] Order details view
- [ ] Order status tracking (mock)
- [ ] Reorder functionality

#### **Day 19-21: Payment Integration (9 giờ)**
- [ ] Payment methods management
- [ ] Mock payment gateway integration
- [ ] Payment confirmation flow
- [ ] Receipt generation
- [ ] Refund request system

### **TUẦN 4: Enhanced Features (21 giờ)**

#### **Day 22-23: Wishlist System (6 giờ)**
- [ ] Wishlist state management
- [ ] Add/remove from wishlist
- [ ] Wishlist screen with grid layout
- [ ] Move to cart functionality
- [ ] Share wishlist feature

#### **Day 24-25: Reviews & Ratings (6 giờ)**
- [ ] Product reviews display
- [ ] Write review functionality
- [ ] Rating system implementation
- [ ] Review filtering and sorting
- [ ] Review photos support

#### **Day 26-28: Notifications & Polish (9 giờ)**
- [ ] Push notification setup
- [ ] In-app notification center
- [ ] Order status notifications
- [ ] UI/UX improvements
- [ ] Performance optimization

### **TUẦN 5: Advanced Features & Final Polish (21 giờ)**

#### **Day 29-30: Customer Support (6 giờ)**
- [ ] Help center with FAQ
- [ ] Contact support form
- [ ] Return/refund request system
- [ ] Support ticket system
- [ ] Live chat integration (mock)

#### **Day 31-32: Advanced Features (6 giờ)**
- [ ] Product comparison tool
- [ ] Recently viewed products
- [ ] Recommended products
- [ ] Coupons and discount system
- [ ] Loyalty points system (mock)

#### **Day 33-35: Final Polish (9 giờ)**
- [ ] Cross-platform testing
- [ ] Performance optimization
- [ ] Code cleanup and refactoring
- [ ] Documentation updates
- [ ] App store preparation

## **Progress Tracking**

### **✅ COMPLETED (Major Features Implemented)**

#### **🎯 Core E-commerce Flow - 100% COMPLETE**
- [x] **Remove DummyJSON API completely** - Loại bỏ hoàn toàn dependency
- [x] **Create mock_data folder structure** - Tạo architecture với TypeScript interfaces
- [x] **Setup environment config** - API_MODE toggle (mock/real) working
- [x] **Create comprehensive mock data** - Products, categories, users, orders với realistic data
- [x] **Implement service layer** - Products và Auth services support mock/real API switch
- [x] **Refactor Product types** - Support variant system (ProductListItem vs ProductDetail)
- [x] **Update IDs to UUID strings** - All entities now use UUID instead of numbers

#### **🔐 Authentication System - 100% COMPLETE**
- [x] **Register page** - Form validation and UI with minimalist design ✅
- [x] **Forgot Password page** - Email reset flow with mock backend ✅
- [x] **Login UI improvements** - Minimalist design system applied to all auth pages ✅

#### **🏪 Shopping Experience - 100% COMPLETE**
- [x] **Homepage redesign** - Minimalist style implementation ✅
- [x] **Welcome page redesign** - Simple onboarding flow ✅
- [x] **Cart page improvements** - Following design system ✅
- [x] **Product Details page** - With image gallery and variant selection ✅
- [x] **Variant selection UI** - Components for attribute selection ✅
- [x] **Product navigation** - Clickable cards linking to details ✅

#### **💳 Checkout & Orders - 100% COMPLETE**
- [x] **Checkout Flow** - Multi-step process (address → payment → review) ✅
- [x] **Order Confirmation** - Success page with order details ✅
- [x] **Order Management** - Orders store with Zustand ✅
- [x] **Order History** - Orders tab with list display ✅
- [x] **Order Details** - Individual order view with tracking ✅
- [x] **Order Status Tracking** - Visual progress indicators ✅

#### **🎨 Design System - 100% COMPLETE**
- [x] **Tab Navigation Setup** - Home, Orders, Search, Notifications, Account ✅
- [x] **Minimalist design system** - Consistent 8px radius, monochromatic colors ✅
- [x] **Typography system** - Inter font family, proper sizing ✅
- [x] **Component consistency** - All UI follows design principles ✅

#### **🔧 Technical Improvements - 100% COMPLETE**
- [x] **Variant support in cart** - CartItem supports product variants ✅
- [x] **Type consistency** - Fixed CartItem.id string type mismatch ✅
- [x] **Cart logic enhancement** - Smart variant handling and deduplication ✅

#### **🔍 Enhanced Search System - 100% COMPLETE**
- [x] **Search Tab Navigation** - Clean search input page with auto-focus ✅
- [x] **Search Results Page** - 2-column product grid with editable header input ✅
- [x] **Filter Drawer System** - Categories, price range, rating filters with slide animation ✅
- [x] **Search History** - Persistent history with AsyncStorage, add/remove functionality ✅
- [x] **Real-time Suggestions** - Debounced API calls (300ms) with popular searches fallback ✅
- [x] **Infinite Scroll** - ProductGrid with performance optimization and load more ✅
- [x] **Complete API Architecture** - searchProducts service with filters and pagination ✅

#### **🏗️ API Architecture Consistency - 100% COMPLETE**
- [x] **Complete Mock/Real Pattern** - All services follow consistent architecture ✅
- [x] **Missing Config Files** - Created api/config.ts, config/index.ts, api/client.ts, utils/delay.ts ✅
- [x] **Carts Service Completion** - Added full mock implementation with proper toggle ✅
- [x] **Orders Service Fix** - Updated to use ENV config and consistent delays ✅
- [x] **Search Service Enhancement** - Replaced fetch with apiClient, proper error handling ✅
- [x] **Component Consistency** - Updated AddToCartButton to use standard delay utility ✅

### **🔄 CURRENT STATUS**
**App có complete shopping flow + advanced search:** Homepage → Product Details → Add to Cart → Checkout → Order Confirmation → Order Management
**Enhanced Search:** Search Tab → Search Input + History/Suggestions → Results + Filters → Infinite Scroll

### **✅ COMPLETED - Enhanced Search System**
- [x] **Enhanced Search Feature** - Complete search system với advanced filtering ✅
  - [x] **Phase 1:** Tab navigation + search input + basic results (6 hours) ✅
  - [x] **Phase 2:** Filter drawer + search history + suggestions (9 hours) ✅
  - [x] **Phase 3:** Infinite scroll + analytics + performance optimization (6 hours) ✅
  - [x] **Phase 4:** Polish + advanced features (3 hours) ✅
  - **Total Completed:** 24 hours ✅
  - **Reference:** @SEARCH_FEATURE_SPEC.md

### **🔧 RECENTLY COMPLETED - Major Updates**

#### **🏗️ File Structure Reorganization** 
- [x] **Organized app folder by feature groups** ✅
  - [x] Created `(auth)/` folder: `register.tsx`, `forgot-password.tsx` ✅
  - [x] Created `(ordering)/` folder: `checkout.tsx`, `order-success.tsx` ✅
  - [x] Renamed `(tabs)` → `home` with `index.tsx` as main tab ✅
  - [x] Updated all navigation paths throughout codebase ✅
  - [x] Removed duplicate `homepage.tsx` file ✅

#### **📱 Android Edge-to-Edge Implementation**
- [x] **Modern Android compatibility** ✅
  - [x] Integrated `SafeAreaProvider` into `AppProvider` for better organization ✅
  - [x] Configured `StatusBar` with transparent background and translucent mode ✅
  - [x] Added safe area handling to major screens (Home, Login, Cart, Welcome) ✅
  - [x] Updated `app.config.ts` with `edgeToEdgeEnabled: true` ✅
  - [x] Full support for devices with notches, navigation bars, and edge-to-edge displays ✅

#### **🔧 API Architecture Consistency**
- [x] **Complete Mock/Real API Pattern** ✅
  - [x] Created missing config files: `config.ts`, `client.ts`, `delay.ts` ✅
  - [x] All services follow consistent architecture: `auth.ts`, `products.ts`, `orders.ts`, `carts.ts`, `search.ts` ✅
  - [x] Unified error handling and delay utilities ✅

### **📋 REMAINING (Lower Priority)**
- [ ] **User Profile** - Account settings and profile management
- [ ] **Category Browse** - Category-based product browsing (may overlap with search)
- [ ] **Wishlist** - Save products for later
- [ ] **Settings** - App preferences and configurations

## **Success Metrics**
- [x] ~~Mock/Real API toggle working~~ ✅
- [x] ~~Mock data structure identical to future real API~~ ✅
- [x] **All critical pages implemented** ✅ (Complete e-commerce flow + advanced search)
- [x] **Minimalist design consistently applied** ✅ (All pages follow design system)
- [x] **App ready for backend integration** ✅ (Complete API architecture with mock/real toggle)
- [x] **Performance optimized for production** ✅ (React Query caching, infinite scroll, optimized components)
- [x] **File structure organized** ✅ (Grouped by feature with proper navigation)
- [x] **Android edge-to-edge support** ✅ (Modern Android compatibility)
- [ ] Dark/Light mode fully supported (Optional enhancement)

## **Notes**
- Focus on minimalist design throughout
- Maintain consistent 8px border radius
- Use primary color (#3B82F6) sparingly
- Ensure all components work in both themes
- Keep mock data structure identical to future real API