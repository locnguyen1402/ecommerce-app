# Enhanced Search Feature - Complete Specification

## **🎯 Feature Overview**

Complete search functionality với advanced filtering, user analytics, và optimal performance. Search flow từ tab navigation đến product discovery với full API-driven architecture.

## **📋 Requirements Summary**

### **User Flow:**
```
Tab Navigation (Search Icon) → Search Page → Product Search Results
                                    ↓
Auto-focus Input + History/Suggestions → Filter Drawer → Product Grid → Product Details
```

### **Core Behaviors:**
- **Search Tab:** Middle tab với search icon, click navigate to search page
- **Search Page:** Clean screen với auto-focus input, suggestions dropdown
- **Search Results:** Header với editable input + filter button, 2-column product grid
- **Filter Drawer:** Right-slide drawer với categories, price range, rating
- **Navigation:** Product cards navigate to product details page

## **🏗️ Technical Architecture**

### **API Strategy - Full API-Driven:**

#### **Global Product Filters (App Lifecycle):**
```typescript
GET /api/product/filters
Response: {
  categories: CategoryOption[],
  priceRange: {
    min: number,
    max: number,
    suggestions: [
      { label: "$0-$100", range: [0, 100] },
      { label: "$100-$300", range: [100, 300] },
      { label: "$300-$500", range: [300, 500] },
      { label: "$500+", range: [500, 999999] }
    ]
  },
  ratings: number[],
  brands?: BrandOption[]
}

// Called once per app session
// Cached in Zustand + AsyncStorage
// Only refetch on app restart
```

#### **Search APIs:**
```typescript
// Product search với pagination
GET /api/products/search?q=query&page=1&limit=20&filters={}
Response: {
  products: ProductListItem[],
  pagination: {
    currentPage: number,
    totalPages: number,
    hasMore: boolean,
    total: number
  }
}

// Search suggestions (debounced)
GET /api/search/suggestions?q=partial_query
Response: {
  suggestions: string[],
  popular: string[]
}

// User search history
GET /api/search/history (user-based)
POST /api/search/history { query: string }

// Analytics tracking
POST /api/analytics/search-event
POST /api/analytics/product-click
POST /api/analytics/search-conversion
```

### **File Structure:**
```
src/app/(tabs)/search.tsx              // Search input page
src/app/product-search-results.tsx    // Search results page

src/lib/stores/app.ts                  // Global filters store
src/lib/stores/search.ts               // Search state management

src/components/search/
├── SearchInput.tsx                    // Input với suggestions
├── SearchHistory.tsx                  // User search history
├── FilterDrawer.tsx                   // Right-slide filter drawer
├── CategoryFilter.tsx                 // Category checkboxes
├── PriceRangeFilter.tsx              // Price inputs + suggestion badges
├── RatingFilter.tsx                   // Star rating selection
└── ProductGrid.tsx                    // 2-column infinite scroll grid
```

## **🎨 UI/UX Specifications**

### **Search Page:**
- **Layout:** Clean screen với search input ở top
- **Input:** Auto-focus on mount, placeholder text
- **Suggestions Dropdown:**
  - Search history (user-based API)
  - Real-time suggestions (debounced 300ms)
  - Popular searches (fallback)
- **Interactions:**
  - Type → show suggestions
  - Enter key → navigate to results
  - Click suggestion → navigate to results

### **Product Search Results Page:**
- **Header:**
  - Editable search input (pre-filled với current query)
  - Filter button (right side) với applied filters count badge
- **Filter Drawer:**
  - Slide animation từ right side
  - **Categories:** Checkbox list từ API
  - **Price Range:** 
    - 2 separate input fields (min/max)
    - API-generated suggestion badges below inputs
    - Format: [$0-$100], [$100-$300], etc.
  - **Rating:** Star selection (1-5 stars)
  - Apply/Reset buttons ở bottom
- **Product Grid:**
  - 2 products per row
  - Infinite scroll pagination
  - Loading skeleton cards khi load more
  - Click product card → product details page
- **Empty State:**
  - "No Results Found" message
  - Helpful suggestions: "Try adjusting your search criteria"

## **⚡ Performance & Caching**

### **Caching Strategy:**
- **Global filters:** App lifecycle + AsyncStorage persistence
- **Search results:** 5 minutes memory cache per query+filters combo
- **Search history:** AsyncStorage persistence
- **Search suggestions:** Real-time API với 300ms debounce

### **API Call Optimization:**
- **Global filters:** Only on app restart, not on app resume
- **Search suggestions:** Debounced, cancelled khi user types fast
- **Infinite scroll:** Load more với same filters, append to existing results
- **Filter changes:** Reset pagination, trigger new search

## **📊 Analytics Tracking**

### **Search Analytics Events:**
```typescript
interface SearchAnalyticsEvent {
  // Search behavior
  searchQuery: string;
  timestamp: Date;
  userId: string;
  resultsCount: number;
  
  // Filter usage
  filtersApplied: {
    categories: string[];
    priceRange: [number, number];
    rating: number;
  };
  
  // User interactions
  clickedProducts: string[];     // product IDs với positions
  searchToCartConversion: boolean;
  searchToPurchaseConversion: boolean;
  searchDuration: number;        // time spent on search results
}
```

### **Tracking Points:**
- **Search initiated:** User enters search page
- **Search completed:** Results loaded successfully
- **Filter applied:** User changes any filter
- **Product clicked:** User clicks product từ search results
- **Search to cart:** User adds product to cart từ search
- **Search to purchase:** User completes order từ search journey

## **🔧 State Management**

### **Global App Store:**
```typescript
interface AppState {
  globalFilters: GlobalProductFilterOptions | null;
  lastFilterFetch: string;
  isLoadingFilters: boolean;
  
  // Actions
  fetchGlobalFilters: () => Promise<void>;
  clearFilters: () => void;
}
```

### **Search Store:**
```typescript
interface SearchState {
  // Current search
  query: string;
  suggestions: string[];
  isLoadingSuggestions: boolean;
  
  // Search history
  history: string[];
  
  // Search results
  results: {
    products: ProductListItem[];
    pagination: PaginationInfo;
    isLoading: boolean;
    isLoadingMore: boolean;
  };
  
  // Applied filters
  currentFilters: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  };
  
  // Actions
  setQuery: (query: string) => void;
  search: (query: string, filters?: AppliedFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  applyFilters: (filters: AppliedFilters) => Promise<void>;
  clearFilters: () => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  trackAnalytics: (event: SearchAnalyticsEvent) => void;
}
```

## **🎯 Implementation Phases**

### **Phase 1 - Core Search (Priority 1):**
- [ ] Update tab navigation với search icon
- [ ] Create search input page với auto-focus
- [ ] Implement global filter API + caching
- [ ] Create search results page với basic product grid
- [ ] Basic search API integration
- [ ] Navigate between search pages

### **Phase 2 - Filters & UX (Priority 2):**
- [ ] Implement filter drawer với slide animation
- [ ] Category filter với checkboxes
- [ ] Price range filter với inputs + API suggestion badges
- [ ] Rating filter với star selection
- [ ] Apply/reset filter functionality
- [ ] Search history API integration
- [ ] Real-time search suggestions
- [ ] Empty states và error handling

### **Phase 3 - Advanced Features (Priority 3):**
- [ ] Infinite scroll implementation
- [ ] Complete analytics tracking
- [ ] Performance optimizations
- [ ] Search result caching
- [ ] Loading states và skeleton screens
- [ ] Advanced search features

### **Phase 4 - Polish (Priority 4):**
- [ ] Search recommendations
- [ ] Popular searches
- [ ] Search filters count badges
- [ ] Accessibility improvements
- [ ] Performance monitoring

## **🧪 Testing Checklist**

### **Functional Testing:**
- [ ] Tab navigation to search works
- [ ] Search input auto-focus
- [ ] Search suggestions appear và work
- [ ] Search results display correctly
- [ ] Filter drawer slides và applies filters
- [ ] Product cards navigate to details
- [ ] Infinite scroll loads more results
- [ ] Empty states display properly

### **Performance Testing:**
- [ ] Global filters cached properly
- [ ] Search suggestions debounced
- [ ] Infinite scroll doesn't duplicate items
- [ ] App doesn't crash với large result sets
- [ ] Memory usage optimized

### **Analytics Testing:**
- [ ] All events tracked properly
- [ ] User journey captured
- [ ] Conversion tracking works
- [ ] Filter usage analytics

## **📚 API Documentation Reference**

### **Mock Data Structure:**
- Extend existing mock data với search-related functions
- Add search history mock data
- Add analytics tracking mock implementation
- Ensure filter options reflect actual product data

### **Error Handling:**
- Network errors during search
- Empty search results
- Filter API failures
- Search suggestion API failures

## **🚀 Ready for Implementation**

All requirements analyzed và confirmed:
- ✅ Full API-driven architecture
- ✅ Complete user flow defined
- ✅ Technical specifications documented
- ✅ Performance strategy planned
- ✅ Analytics tracking specified
- ✅ Implementation phases outlined

**Next Steps:** Begin Phase 1 implementation với tab navigation update và basic search functionality.