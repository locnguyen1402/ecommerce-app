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
- [x] ~~Login Page~~ - ⚠️ **NEED UI IMPROVEMENT**
- [ ] **Register Page** - ❌ **MISSING**
- [ ] **Forgot Password Page** - ❌ **MISSING**
- [x] ~~Welcome Page~~ - ⚠️ **NEED UI IMPROVEMENT**
- [x] ~~Homepage~~ - ⚠️ **NEED UI IMPROVEMENT**
- [x] ~~Cart Page~~ - ⚠️ **NEED UI IMPROVEMENT**
- [ ] **Product Details Page** - ❌ **MISSING**

#### **🚨 HIGH PRIORITY - Phase 2 (Tuần 2-3)**
- [ ] **Checkout Flow** - ❌ **MISSING**
- [ ] **Order Confirmation** - ❌ **MISSING**
- [ ] **User Profile** - ❌ **MISSING**
- [ ] **Order History** - ❌ **MISSING**
- [ ] **Address Management** - ❌ **MISSING**
- [ ] **Enhanced Search** - ❌ **MISSING**
- [ ] **Category Browse** - ❌ **MISSING**

#### **⚡ MEDIUM PRIORITY - Phase 3 (Tuần 3-4)**
- [ ] **Wishlist** - ❌ **MISSING**
- [ ] **Settings** - ❌ **MISSING**
- [ ] **Order Details** - ❌ **MISSING**
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

### **✅ COMPLETED (Week 1 - Days 1-2)**
- [x] **Remove DummyJSON API completely** - Loại bỏ hoàn toàn dependency
- [x] **Create mock_data folder structure** - Tạo architecture với TypeScript interfaces
- [x] **Setup environment config** - API_MODE toggle (mock/real) working
- [x] **Create comprehensive mock data** - Products, categories, users, orders với realistic data
- [x] **Implement service layer** - Products và Auth services support mock/real API switch
- [x] **Refactor Product types** - Support variant system (ProductListItem vs ProductDetail)
- [x] **Update IDs to UUID strings** - All entities now use UUID instead of numbers
- [x] **Register page** - Form validation and UI with minimalist design ✅
- [x] **Forgot Password page** - Email reset flow with mock backend ✅
- [x] **Login UI improvements** - Minimalist design system applied to all auth pages ✅
- [x] **Homepage redesign** - Minimalist style implementation ✅
- [x] **Tab Navigation Setup** - Home, Orders, Search, Notifications, Account ✅

### **🔄 IN PROGRESS**
- [ ] **Welcome page redesign** - Simple onboarding flow

### **📋 PENDING (High Priority)**
- [ ] **Cart page improvements** - Following design system
- [ ] **Product Details page** - With image gallery and variant selection
- [ ] **Variant selection UI** - Components for attribute selection
- [ ] **Bottom sheet** - For variant selection from product list

## **Success Metrics**
- [x] ~~Mock/Real API toggle working~~
- [x] ~~Mock data structure identical to future real API~~
- [ ] All critical pages implemented
- [ ] Dark/Light mode fully supported  
- [ ] Minimalist design consistently applied
- [ ] App ready for backend integration
- [ ] Performance optimized for production

## **Notes**
- Focus on minimalist design throughout
- Maintain consistent 8px border radius
- Use primary color (#3B82F6) sparingly
- Ensure all components work in both themes
- Keep mock data structure identical to future real API