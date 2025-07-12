import { config } from './config';
import { delay } from '../utils/delay';

// Search suggestion response type
export interface SearchSuggestionsResponse {
  suggestions: string[];
  popular: string[];
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

// Mock implementation
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

// Exported service function
export async function getSearchSuggestions(query: string): Promise<SearchSuggestionsResponse> {
  if (config.useMockApi) {
    return mockGetSearchSuggestions(query);
  } else {
    return realGetSearchSuggestions(query);
  }
}