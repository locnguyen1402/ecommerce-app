import React, { useState } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Filter } from 'lucide-react-native';

import type { ProductListItem } from '~/lib/api/types';
import { useSearchProducts } from '~/lib/hooks/useApi';
import { useLanguage } from '~/lib/hooks/useLanguage';

import { AddToCartButton } from '~/components/AddToCartButton';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function ProductSearchResultsPage() {
  const { t } = useLanguage();
  const { q } = useLocalSearchParams<{ q: string }>();
  const [query, setQuery] = useState(q || '');

  const {
    data: searchResults,
    isLoading: searchLoading,
  } = useSearchProducts({ 
    q: query, 
    limit: 20 
  });

  const handleSearch = () => {
    if (query.trim() && query.trim() !== q) {
      router.setParams({ q: query.trim() });
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const renderProductCard = ({ item }: { item: ProductListItem }) => (
    <Pressable 
      className='flex-1 mx-1 mb-4' 
      onPress={() => handleProductPress(item.id)}
    >
      <View className='border border-border rounded bg-background'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-36 w-full rounded-t'
            resizeMode='cover'
          />
        ) : (
          <View className='h-36 bg-muted rounded-t items-center justify-center'>
            <Text className='text-muted-foreground text-xs'>No Image</Text>
          </View>
        )}
        
        <View className='p-3'>
          <Text className='font-medium text-sm mb-2' numberOfLines={2}>
            {item.title}
          </Text>
          
          <Text className='text-xs text-muted-foreground mb-2 capitalize'>
            {item.category.replace(/[-_]/g, ' ')}
          </Text>
          
          <View className='flex-row items-center justify-between mb-3'>
            <Text className='font-semibold text-base'>
              ${item.price}
            </Text>
            <Text className='text-xs text-muted-foreground'>
              ★ {item.rating.toFixed(1)}
            </Text>
          </View>
          
          <AddToCartButton
            product={{
              id: item.id,
              title: item.title,
              price: item.price,
              thumbnail: item.thumbnail,
              category: item.category,
              discountPercentage: item.discountPercentage || 0,
            }}
            size='sm'
            className='w-full'
          />
        </View>
      </View>
    </Pressable>
  );

  const productsCount = searchResults?.products?.length || 0;

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
          
          <Pressable className='p-2'>
            <Filter size={20} className='text-muted-foreground' />
          </Pressable>
        </View>

        {/* Results Count */}
        {query && (
          <Text className='text-sm text-muted-foreground'>
            {searchLoading ? 'Searching...' : `${productsCount} results for "${query}"`}
          </Text>
        )}
      </View>

      {/* Search Results */}
      <View className='flex-1 px-4'>
        {searchLoading ? (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-muted-foreground'>Searching...</Text>
          </View>
        ) : productsCount === 0 ? (
          <View className='flex-1 justify-center items-center'>
            <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
              <Text className='text-2xl'>📭</Text>
            </View>
            <Text className='text-lg font-medium mb-2'>No results found</Text>
            <Text className='text-muted-foreground text-center'>
              Try adjusting your search criteria or browse our categories
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchResults?.products || []}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className='h-4' />}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}