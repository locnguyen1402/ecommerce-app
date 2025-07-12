import React from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, View } from 'react-native';
import { router } from 'expo-router';

import type { ProductListItem } from '~/lib/api/types';

import { AddToCartButton } from '~/components/AddToCartButton';
import { Text } from '~/components/ui/text';

interface ProductGridProps {
  products: ProductListItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function ProductGrid({ 
  products, 
  isLoading, 
  isLoadingMore, 
  hasMore, 
  onLoadMore 
}: ProductGridProps) {
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

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View className='py-4 items-center'>
        <ActivityIndicator size="small" className='text-primary' />
        <Text className='text-sm text-muted-foreground mt-2'>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View className='flex-1 justify-center items-center py-20'>
          <ActivityIndicator size="large" className='text-primary' />
          <Text className='text-muted-foreground mt-4'>Searching...</Text>
        </View>
      );
    }

    return (
      <View className='flex-1 justify-center items-center py-20'>
        <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
          <Text className='text-2xl'>📭</Text>
        </View>
        <Text className='text-lg font-medium mb-2'>No results found</Text>
        <Text className='text-muted-foreground text-center px-8'>
          Try adjusting your search criteria or browse our categories
        </Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasMore && !isLoadingMore && !isLoading) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className='h-4' />}
      contentContainerStyle={{ 
        paddingTop: 16, 
        paddingBottom: 20,
        flexGrow: 1,
      }}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}