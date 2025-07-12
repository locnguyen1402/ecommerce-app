import React, { useState, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter } from 'lucide-react-native';

import type { ProductListItem } from '~/lib/api/types';
import { useSearchProducts } from '~/lib/hooks/useApi';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useSearchStore } from '~/lib/stores/search';

import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { FilterDrawer } from '~/components/search/FilterDrawer';
import { ProductGrid } from '~/components/search/ProductGrid';

export default function ProductSearchResultsPage() {
  const { t } = useLanguage();
  const { q } = useLocalSearchParams<{ q: string }>();
  const [query, setQuery] = useState(q || '');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    results,
    currentFilters,
    setResults,
    appendResults,
    setLoading,
    setLoadingMore,
    setFilters,
    addToHistory,
  } = useSearchStore();

  const {
    data: searchResults,
    isLoading: searchLoading,
  } = useSearchProducts({ 
    q: query, 
    limit: 20 
  });

  // Update search store when API results change
  useEffect(() => {
    if (searchResults?.products) {
      const pagination = {
        currentPage: 1,
        totalPages: Math.ceil((searchResults.total || 20) / 20),
        hasMore: (searchResults.products.length || 0) >= 20,
        total: searchResults.total || searchResults.products.length,
      };
      setResults(searchResults.products, pagination);
    }
    setLoading(searchLoading);
  }, [searchResults, searchLoading, setResults, setLoading]);

  // Add to history when query changes
  useEffect(() => {
    if (q && q.trim()) {
      addToHistory(q.trim());
    }
  }, [q, addToHistory]);

  const handleSearch = () => {
    if (query.trim() && query.trim() !== q) {
      router.setParams({ q: query.trim() });
    }
  };

  const handleApplyFilters = (newFilters: typeof currentFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // TODO: Integrate with API search filters - would trigger new search with filters
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: 0,
    };
    setFilters(resetFilters);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (!results.pagination.hasMore || results.isLoadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    // TODO: In real app, make API call for next page
    // For now, simulate loading more
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters.categories.length > 0) count++;
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 1000) count++;
    if (currentFilters.minRating > 0) count++;
    return count;
  };

  const productsCount = results.products.length;

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <View className='flex-row items-center gap-4 mb-4'>
          <Pressable onPress={() => router.back()}>
            <ArrowLeft size={24} className='text-foreground' />
          </Pressable>
          
          <View className='flex-1'>
            <Input
              placeholder='Search products...'
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType='search'
              className='h-10'
            />
          </View>
          
          <Pressable 
            className='p-2 relative' 
            onPress={() => setShowFilters(true)}
          >
            <Filter size={20} className='text-muted-foreground' />
            {getActiveFiltersCount() > 0 && (
              <View className='absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full items-center justify-center'>
                <Text className='text-xs text-primary-foreground font-medium'>
                  {getActiveFiltersCount()}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Results Count */}
        {query && (
          <Text className='text-sm text-muted-foreground'>
            {results.isLoading ? 'Searching...' : `${productsCount} results for "${query}"`}
          </Text>
        )}
      </View>

      {/* Search Results */}
      <View className='flex-1 px-4'>
        <ProductGrid
          products={results.products}
          isLoading={results.isLoading}
          isLoadingMore={results.isLoadingMore}
          hasMore={results.pagination.hasMore}
          onLoadMore={handleLoadMore}
        />
      </View>

      {/* Filter Drawer */}
      <FilterDrawer
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={currentFilters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
    </View>
  );
}