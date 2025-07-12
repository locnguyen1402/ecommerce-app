import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ProductListItem } from '~/lib/api/types';

interface SearchFilters {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface SearchState {
  // Current search
  query: string;
  suggestions: string[];
  isLoadingSuggestions: boolean;
  
  // Search history (persisted)
  history: string[];
  
  // Search results
  results: {
    products: ProductListItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
      total: number;
    };
    isLoading: boolean;
    isLoadingMore: boolean;
  };
  
  // Applied filters
  currentFilters: SearchFilters;
  
  // Actions
  setQuery: (query: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  setLoadingSuggestions: (loading: boolean) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
  setResults: (products: ProductListItem[], pagination: any) => void;
  appendResults: (products: ProductListItem[], pagination: any) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setFilters: (filters: SearchFilters) => void;
  clearFilters: () => void;
  clearSearch: () => void;
}

const INITIAL_FILTERS: SearchFilters = {
  categories: [],
  priceRange: [0, 1000],
  minRating: 0,
};

const INITIAL_RESULTS = {
  products: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    total: 0,
  },
  isLoading: false,
  isLoadingMore: false,
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      // Initial state
      query: '',
      suggestions: [],
      isLoadingSuggestions: false,
      history: [],
      results: INITIAL_RESULTS,
      currentFilters: INITIAL_FILTERS,

      // Actions
      setQuery: (query: string) => {
        set({ query });
      },

      setSuggestions: (suggestions: string[]) => {
        set({ suggestions });
      },

      setLoadingSuggestions: (loading: boolean) => {
        set({ isLoadingSuggestions: loading });
      },

      addToHistory: (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery || trimmedQuery.length < 2) return;

        set((state) => {
          const newHistory = [
            trimmedQuery,
            ...state.history.filter(item => item !== trimmedQuery)
          ].slice(0, 10); // Keep only last 10 searches

          return { history: newHistory };
        });
      },

      clearHistory: () => {
        set({ history: [] });
      },

      removeFromHistory: (query: string) => {
        set((state) => ({
          history: state.history.filter(item => item !== query)
        }));
      },

      setResults: (products: ProductListItem[], pagination: any) => {
        set({
          results: {
            products,
            pagination,
            isLoading: false,
            isLoadingMore: false,
          }
        });
      },

      appendResults: (products: ProductListItem[], pagination: any) => {
        set((state) => ({
          results: {
            products: [...state.results.products, ...products],
            pagination,
            isLoading: false,
            isLoadingMore: false,
          }
        }));
      },

      setLoading: (loading: boolean) => {
        set((state) => ({
          results: {
            ...state.results,
            isLoading: loading,
          }
        }));
      },

      setLoadingMore: (loading: boolean) => {
        set((state) => ({
          results: {
            ...state.results,
            isLoadingMore: loading,
          }
        }));
      },

      setFilters: (filters: SearchFilters) => {
        set({ currentFilters: filters });
      },

      clearFilters: () => {
        set({ currentFilters: INITIAL_FILTERS });
      },

      clearSearch: () => {
        set({
          query: '',
          suggestions: [],
          results: INITIAL_RESULTS,
          currentFilters: INITIAL_FILTERS,
        });
      },
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist history
      partialize: (state) => ({ history: state.history }),
    }
  )
);