import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useProduct } from '~/lib/hooks/useApi';
import { useCartStore } from '~/lib/stores/cart';
import type { ProductVariant } from '~/lib/api/types';

import { AddToCartButton } from '~/components/AddToCartButton';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const { addItem } = useCartStore();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(id!);

  if (isLoading) {
    return (
      <View className='flex-1 bg-background'>
        <View 
          className='px-4 py-4 border-b border-border'
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className='flex-row items-center'>
            <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>Product Details</Text>
          </View>
        </View>
        <View className='flex-1 items-center justify-center'>
          <Text className='text-muted-foreground'>Loading product...</Text>
        </View>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className='flex-1 bg-background'>
        <View 
          className='px-4 py-4 border-b border-border'
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className='flex-row items-center'>
            <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>Product Details</Text>
          </View>
        </View>
        <View className='flex-1 items-center justify-center px-8'>
          <Text className='text-xl font-semibold mb-3'>Product Not Found</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            Sorry, we couldn't find the product you're looking for.
          </Text>
          <Button onPress={() => router.back()} className='w-full h-12'>
            <Text className='font-medium'>Go Back</Text>
          </Button>
        </View>
      </View>
    );
  }

  const displayImages = product.images?.length > 0 ? product.images : [product.thumbnail];
  const currentPrice = selectedVariant?.price || product.basePrice;
  const discountedPrice = currentPrice * (1 - product.discountPercentage / 100);

  const renderImageThumbnail = ({ item, index }: { item: string; index: number }) => (
    <Button
      variant='ghost'
      onPress={() => setSelectedImageIndex(index)}
      className={`w-16 h-16 p-0 mr-2 ${
        selectedImageIndex === index ? 'border-2 border-primary' : 'border border-border'
      } rounded`}
    >
      <Image
        source={{ uri: item }}
        className='w-full h-full rounded'
        resizeMode='cover'
      />
    </Button>
  );

  const renderVariantOption = ({ item }: { item: ProductVariant }) => (
    <Button
      variant={selectedVariant?.id === item.id ? 'default' : 'outline'}
      onPress={() => setSelectedVariant(item)}
      className='mr-3 mb-2'
    >
      <Text className='text-sm'>{item.displayName}</Text>
    </Button>
  );

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View 
        className='px-4 py-4 border-b border-border'
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className='flex-row items-center'>
          <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
            <Text className='text-lg'>←</Text>
          </Button>
          <Text className='text-xl font-semibold'>Product Details</Text>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='px-4'>
          {/* Main Product Image */}
          <View className='py-6'>
            <View className='aspect-square border border-border rounded mb-4'>
              <Image
                source={{ uri: displayImages[selectedImageIndex] }}
                className='w-full h-full rounded'
                resizeMode='cover'
              />
            </View>

            {/* Image Thumbnails */}
            {displayImages.length > 1 && (
              <FlatList
                data={displayImages}
                renderItem={renderImageThumbnail}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                className='mb-4'
              />
            )}
          </View>

          {/* Product Information */}
          <View className='pb-6'>
            <Text className='text-2xl font-semibold mb-2'>{product.title}</Text>
            
            <Text className='text-sm text-muted-foreground mb-4 capitalize'>
              {product.category.replace(/[-_]/g, ' ')}
            </Text>

            {/* Price */}
            <View className='flex-row items-center mb-4'>
              <Text className='text-2xl font-semibold mr-3'>
                ${discountedPrice.toFixed(2)}
              </Text>
              {product.discountPercentage > 0 && (
                <Text className='text-lg text-muted-foreground line-through'>
                  ${currentPrice.toFixed(2)}
                </Text>
              )}
            </View>

            {/* Rating */}
            <View className='flex-row items-center mb-6'>
              <Text className='text-base'>★ {product.rating.toFixed(1)}</Text>
              <Text className='text-muted-foreground ml-2'>
                ({product.reviews?.length || 0} reviews)
              </Text>
            </View>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <View className='mb-6'>
                <Text className='text-base font-medium mb-3'>Options</Text>
                <FlatList
                  data={product.variants}
                  renderItem={renderVariantOption}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  scrollEnabled={false}
                />
              </View>
            )}

            {/* Description */}
            <View className='mb-6'>
              <Text className='text-base font-medium mb-3'>Description</Text>
              <Text className='text-muted-foreground leading-6'>
                {product.description}
              </Text>
            </View>

            {/* Product Details */}
            <View className='border border-border rounded p-4 mb-6'>
              <Text className='text-base font-medium mb-3'>Product Details</Text>
              <View className='gap-2'>
                {product.brand && (
                  <View className='flex-row justify-between'>
                    <Text className='text-muted-foreground'>Brand</Text>
                    <Text className='font-medium'>{product.brand}</Text>
                  </View>
                )}
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>Stock</Text>
                  <Text className='font-medium'>{product.totalStock} units</Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>Warranty</Text>
                  <Text className='font-medium'>{product.warrantyInformation}</Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>Shipping</Text>
                  <Text className='font-medium'>{product.shippingInformation}</Text>
                </View>
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>Return Policy</Text>
                  <Text className='font-medium'>{product.returnPolicy}</Text>
                </View>
              </View>
            </View>

            {/* Add to Cart Button */}
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: discountedPrice,
                thumbnail: product.thumbnail,
                category: product.category,
                discountPercentage: product.discountPercentage,
                variant: selectedVariant ? {
                  id: selectedVariant.id,
                  size: selectedVariant.attributes?.find(attr => attr.name === 'size')?.value,
                  color: selectedVariant.attributes?.find(attr => attr.name === 'color')?.value,
                  displayName: selectedVariant.displayName,
                } : undefined,
              }}
              className='w-full h-12 mb-6'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}