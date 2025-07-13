import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useCartStore, type CartItem } from '~/lib/stores/cart';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function CartScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const {
    items,
    totalItems,
    totalPrice,
    totalDiscountedPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const renderCartItem = ({
    item,
    index,
  }: {
    item: CartItem;
    index: number;
  }) => (
    <View className='border border-border rounded p-4 mb-4 bg-background'>
      <View className='flex-row'>
        {/* Product Image */}
        <View className='mr-4'>
          {item.thumbnail ? (
            <Image
              source={{ uri: item.thumbnail }}
              className='w-20 h-20 rounded border border-border'
              resizeMode='cover'
            />
          ) : (
            <View className='w-20 h-20 bg-surface rounded border border-border items-center justify-center'>
              <Text className='text-muted-foreground text-xs'>No Image</Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View className='flex-1'>
          <Text className='font-medium text-base mb-1' numberOfLines={2}>
            {item.title}
          </Text>

          <Text className='text-xs text-muted-foreground mb-1 capitalize'>
            {item.category.replace(/[-_]/g, ' ')}
          </Text>

          {item.variant && (
            <Text className='text-xs text-muted-foreground mb-2'>
              {item.variant.displayName ||
                `${item.variant.size ? `Size: ${item.variant.size}` : ''}${
                  item.variant.size && item.variant.color ? ', ' : ''
                }${item.variant.color ? `Color: ${item.variant.color}` : ''}`}
            </Text>
          )}

          <View className='flex-row items-center justify-between mb-3'>
            <View>
              <Text className='font-semibold text-lg'>
                ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
              </Text>
              {item.discountPercentage > 0 && (
                <Text className='text-muted-foreground text-sm line-through'>
                  ${item.price.toFixed(2)}
                </Text>
              )}
            </View>

            <Text className='text-sm text-muted-foreground'>
              $
              {(
                item.price *
                (1 - item.discountPercentage / 100) *
                item.quantity
              ).toFixed(2)}
            </Text>
          </View>

          {/* Quantity Controls */}
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Button
                variant='outline'
                onPress={() => updateQuantity(index, item.quantity - 1)}
                className='w-10 h-10 p-0'
              >
                <Text className='text-base'>−</Text>
              </Button>

              <Text className='mx-4 font-medium text-base min-w-8 text-center'>
                {item.quantity}
              </Text>

              <Button
                variant='outline'
                onPress={() => updateQuantity(index, item.quantity + 1)}
                className='w-10 h-10 p-0'
              >
                <Text className='text-base'>+</Text>
              </Button>
            </View>

            <Button
              variant='ghost'
              onPress={() => removeItem(index)}
              className='px-3 h-10'
            >
              <Text className='text-sm text-muted-foreground'>
                {t('cart.removeItem')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View className='flex-1 bg-background'>
        {/* Header */}
        <View className='px-4 py-4 border-b border-border'>
          <View className='flex-row items-center'>
            <Button
              variant='ghost'
              onPress={() => router.back()}
              className='mr-3 p-2'
            >
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>{t('cart.cart')}</Text>
          </View>
        </View>

        {/* Empty State */}
        <View className='flex-1 items-center justify-center px-8'>
          <View className='w-16 h-16 border border-border rounded items-center justify-center mb-6'>
            <Text className='text-2xl'>🛒</Text>
          </View>
          <Text className='text-xl font-semibold mb-3'>
            {t('cart.emptyCart')}
          </Text>
          <Text className='text-muted-foreground text-center mb-8 max-w-sm'>
            Looks like you haven't added anything to your cart yet
          </Text>
          <Button onPress={() => router.back()} className='w-full h-12'>
            <Text className='font-medium'>Continue Shopping</Text>
          </Button>
        </View>
      </View>
    );
  }

  const savings = totalPrice - totalDiscountedPrice;

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View
        className='px-4 border-b border-border'
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <Button
              variant='ghost'
              onPress={() => router.back()}
              className='mr-3 p-2'
            >
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>
              {t('cart.cart')} ({totalItems})
            </Text>
          </View>

          <Button variant='ghost' onPress={clearCart} className='px-3'>
            <Text className='text-sm text-muted-foreground'>Clear All</Text>
          </Button>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='px-4'>
          {/* Cart Items */}
          <View className='py-4'>
            <FlatList
              data={items}
              renderItem={({ item, index }) => renderCartItem({ item, index })}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* Cart Summary */}
          <View className='border border-border rounded p-4 mb-4'>
            <Text className='text-lg font-semibold mb-4'>Order Summary</Text>

            <View className='gap-3'>
              <View className='flex-row justify-between'>
                <Text className='text-muted-foreground'>
                  {t('cart.subtotal')}
                </Text>
                <Text className='font-medium'>${totalPrice.toFixed(2)}</Text>
              </View>

              {savings > 0 && (
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>
                    {t('cart.discount')}
                  </Text>
                  <Text className='font-medium text-primary'>
                    -${savings.toFixed(2)}
                  </Text>
                </View>
              )}

              <View className='border-t border-border pt-3'>
                <View className='flex-row justify-between'>
                  <Text className='font-semibold text-lg'>
                    {t('cart.total')}
                  </Text>
                  <Text className='font-semibold text-lg'>
                    ${totalDiscountedPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Checkout Button */}
          <Button
            className='w-full h-12 mb-6'
            onPress={() => router.push('/(ordering)/checkout')}
          >
            <Text className='font-medium'>Proceed to Checkout</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
