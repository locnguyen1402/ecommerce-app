import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { ProductListItem } from '~/lib/api/types';
import { useSearchProductsWithFilters } from '~/lib/hooks/useApi';
import { useSearchStore } from '~/lib/stores/search';

import { FilterDrawer } from '~/components/search/FilterDrawer';
import { ProductGrid } from '~/components/search/ProductGrid';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function ProductSearchResultsPage() {
  const insets = useSafeAreaInsets();
  const { q } = useLocalSearchParams<{ q: string }>();
  const [query, setQuery] = useState(q || '');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { currentFilters, setFilters, addToHistory } = useSearchStore();

  // Use new search API with filters and pagination
  const {
    data: searchResults,
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useSearchProductsWithFilters({
    q: query,
    page: currentPage,
    limit: 20,
    filters: currentFilters,
  });

  // State for managing load more functionality
  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset products when query or filters change
  useEffect(() => {
    setAllProducts([]);
    setCurrentPage(1);
  }, [query, currentFilters]);

  // Update products list when API results change
  useEffect(() => {
    if (searchResults?.products) {
      if (currentPage === 1) {
        // First page - replace all products
        setAllProducts(searchResults.products);
      } else {
        // Subsequent pages - append to existing products
        setAllProducts((prev) => [...prev, ...searchResults.products]);
      }
      setIsLoadingMore(false);
    }
  }, [searchResults, currentPage]);

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
    // Reset pagination and refetch with new filters (handled by useEffect)
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: 0,
    };
    setFilters(resetFilters);
    // Reset pagination and refetch (handled by useEffect)
  };

  const handleLoadMore = () => {
    if (!searchResults?.pagination.hasMore || isLoadingMore || searchLoading)
      return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    // API call will be triggered by useEffect when currentPage changes
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters.categories.length > 0) count++;
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 1000)
      count++;
    if (currentFilters.minRating > 0) count++;
    return count;
  };

  const productsCount = searchResults?.pagination.total || 0;

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View
        className='px-4 py-4 border-b border-border'
        style={{ paddingTop: insets.top + 16 }}
      >
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
            {searchLoading && currentPage === 1
              ? 'Searching...'
              : `${productsCount} results for "${query}"`}
          </Text>
        )}
      </View>

      {/* Search Results */}
      <View className='flex-1 px-4'>
        <ProductGrid
          products={allProducts || []}
          isLoading={searchLoading && currentPage === 1}
          isLoadingMore={isLoadingMore}
          hasMore={searchResults?.pagination.hasMore || false}
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
