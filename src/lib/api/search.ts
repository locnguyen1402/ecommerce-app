import { config } from './config';
import { delay } from '../utils/delay';
import type { ProductListItem } from './types';

// Search suggestion response type
export interface SearchSuggestionsResponse {
  suggestions: string[];
  popular: string[];
}

// Search products request type
export interface SearchProductsRequest {
  q: string;
  page?: number;
  limit?: number;
  filters?: {
    categories?: string[];
    priceRange?: [number, number];
    minRating?: number;
  };
}

// Search products response type
export interface SearchProductsResponse {
  products: ProductListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
    total: number;
  };
}

// Mock search suggestions data
const MOCK_SUGGESTIONS = [
  'smartphone', 'smart watch', 'smartwatch',
  'laptop', 'laptop bag', 'laptop stand',
  'headphones', 'wireless headphones', 'gaming headphones',
  'camera', 'camera lens', 'camera bag',
  'tablet', 'tablet case', 'tablet stand',
  'keyboard', 'wireless keyboard', 'gaming keyboard',
  'mouse', 'wireless mouse', 'gaming mouse',
  'monitor', 'gaming monitor', '4k monitor',
  'speaker', 'bluetooth speaker', 'smart speaker',
  'phone case', 'wireless charger', 'power bank',
];

const MOCK_POPULAR_SEARCHES = [
  'smartphone',
  'laptop',
  'headphones',
  'watch',
  'camera',
];

// Helper function to filter products based on search criteria
function filterProducts(products: ProductListItem[], request: SearchProductsRequest): ProductListItem[] {
  let filtered = products;

  // Filter by query
  if (request.q) {
    const query = request.q.toLowerCase();
    filtered = filtered.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  // Filter by categories
  if (request.filters?.categories && request.filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      request.filters!.categories!.includes(product.category)
    );
  }

  // Filter by price range
  if (request.filters?.priceRange) {
    const [min, max] = request.filters.priceRange;
    filtered = filtered.filter(product =>
      product.price >= min && (max >= 999999 || product.price <= max)
    );
  }

  // Filter by rating
  if (request.filters?.minRating && request.filters.minRating > 0) {
    filtered = filtered.filter(product =>
      product.rating >= request.filters!.minRating!
    );
  }

  return filtered;
}

// Mock search products implementation
async function mockSearchProducts(request: SearchProductsRequest): Promise<SearchProductsResponse> {
  await delay(config.mockDelay);
  
  // Import products data
  const { products: allProducts } = await import('../mock_data/products');
  
  // Apply filters
  const filteredProducts = filterProducts(allProducts, request);
  
  // Apply pagination
  const page = request.page || 1;
  const limit = request.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const hasMore = page < totalPages;

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      hasMore,
      total: filteredProducts.length,
    },
  };
}

// Real API search products implementation
async function realSearchProducts(request: SearchProductsRequest): Promise<SearchProductsResponse> {
  const searchParams = new URLSearchParams({
    q: request.q,
    page: String(request.page || 1),
    limit: String(request.limit || 20),
  });

  if (request.filters?.categories?.length) {
    searchParams.append('categories', request.filters.categories.join(','));
  }
  if (request.filters?.priceRange) {
    searchParams.append('minPrice', String(request.filters.priceRange[0]));
    searchParams.append('maxPrice', String(request.filters.priceRange[1]));
  }
  if (request.filters?.minRating) {
    searchParams.append('minRating', String(request.filters.minRating));
  }

  const response = await fetch(`${config.apiUrl}/products/search?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`Search products failed: ${response.status}`);
  }

  return response.json();
}

// Mock suggestions implementation
async function mockGetSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
  await delay(config.mockDelay);
  
  const suggestions = MOCK_SUGGESTIONS
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6);

  return {
    suggestions,
    popular: MOCK_POPULAR_SEARCHES,
  };
}

// Real API implementation
async function realGetSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
  const response = await fetch(`${config.apiUrl}/search/suggestions?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add auth headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`Search suggestions failed: ${response.status}`);
  }

  return response.json();
}

// Exported service functions
export async function getSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
  if (config.useMockApi) {
    return mockGetSearchSuggestions(query);
  } else {
    return realGetSearchSuggestions(query);
  }
}

export async function searchProducts(request: SearchProductsRequest): Promise<SearchProductsResponse> {
  if (config.useMockApi) {
    return mockSearchProducts(request);
  } else {
    return realSearchProducts(request);
  }
}