import React, { useState } from 'react';
import { FlatList, Image, View } from 'react-native';

import type { ProductListItem } from '~/lib/api/types';
import { useCategories, useSearchProducts } from '~/lib/hooks/useApi';
import { useLanguage } from '~/lib/hooks/useLanguage';

import { AddToCartButton } from '~/components/AddToCartButton';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function SearchTab() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
  } = useCategories();

  const {
    data: searchResults,
    isLoading: searchLoading,
  } = useSearchProducts({ 
    q: searchQuery, 
    limit: 20 
  });

  // Handle both string[] and object[] formats
  const categories = Array.isArray(categoriesData) 
    ? categoriesData.map(item => 
        typeof item === 'string' ? item : (item as any).name || (item as any).slug || String(item)
      )
    : [];

  const renderProductCard = ({ item }: { item: ProductListItem }) => (
    <View className='flex-1 mx-1 mb-4'>
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
    </View>
  );

  const renderCategoryChip = ({ item }: { item: string }) => (
    <Button
      variant={selectedCategory === item ? 'default' : 'ghost'}
      className='mr-3 px-4 h-9'
      onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
    >
      <Text className='text-sm capitalize'>{item.replace(/[-_]/g, ' ')}</Text>
    </Button>
  );

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <Text className='text-xl font-semibold mb-4'>Search</Text>
        
        {/* Search Input */}
        <Input
          placeholder='Search products...'
          value={searchQuery}
          onChangeText={setSearchQuery}
          className='w-full h-10'
        />
      </View>

      {/* Categories */}
      <View className='py-4'>
        <Text className='text-base font-medium px-4 mb-3'>Categories</Text>
        
        {categoriesLoading ? (
          <View className='px-4'>
            <Text className='text-muted-foreground text-sm'>Loading categories...</Text>
          </View>
        ) : (
          <FlatList
            data={categories.slice(0, 8)}
            renderItem={renderCategoryChip}
            keyExtractor={(item, index) => `category-${index}-${item}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        )}
      </View>

      {/* Search Results */}
      <View className='flex-1 px-4'>
        {!searchQuery ? (
          <View className='flex-1 justify-center items-center'>
            <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
              <Text className='text-2xl'>🔍</Text>
            </View>
            <Text className='text-base font-medium mb-2'>Start searching</Text>
            <Text className='text-muted-foreground text-center'>
              Enter a product name or browse categories
            </Text>
          </View>
        ) : searchLoading ? (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-muted-foreground'>Searching...</Text>
          </View>
        ) : searchResults?.products?.length === 0 ? (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-base font-medium mb-2'>No results found</Text>
            <Text className='text-muted-foreground text-center'>
              Try searching for something else
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
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}