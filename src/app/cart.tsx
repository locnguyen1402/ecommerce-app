import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useCartStore, type CartItem } from '~/lib/stores/cart';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

export default function CartScreen() {
  const { t } = useLanguage();
  const {
    items,
    totalItems,
    totalPrice,
    totalDiscountedPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card className='mb-4'>
      <CardContent className='p-4'>
        <View className='flex-row'>
          {/* Product Image */}
          <View className='mr-4'>
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                className='w-20 h-20 rounded-lg'
                resizeMode='cover'
              />
            ) : (
              <View className='w-20 h-20 bg-muted rounded-lg items-center justify-center'>
                <Text className='text-muted-foreground text-xs'>No Image</Text>
              </View>
            )}
          </View>

          {/* Product Details */}
          <View className='flex-1'>
            <Text className='font-semibold text-base mb-1' numberOfLines={2}>
              {item.title}
            </Text>
            
            <Badge variant='secondary' className='mb-2 self-start'>
              <Text className='text-xs'>{item.category}</Text>
            </Badge>

            <View className='flex-row items-center justify-between mb-2'>
              <View>
                <Text className='text-primary font-bold text-lg'>
                  ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                </Text>
                {item.discountPercentage > 0 && (
                  <Text className='text-muted-foreground text-sm line-through'>
                    ${item.price.toFixed(2)}
                  </Text>
                )}
              </View>
              
              <Text className='text-sm text-muted-foreground'>
                ${((item.price * (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2)}
              </Text>
            </View>

            {/* Quantity Controls */}
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center'>
                <Button
                  variant='outline'
                  size='sm'
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  className='w-8 h-8 p-0'
                >
                  <Text className='text-sm'>−</Text>
                </Button>
                
                <Text className='mx-3 font-medium'>{item.quantity}</Text>
                
                <Button
                  variant='outline'
                  size='sm'
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  className='w-8 h-8 p-0'
                >
                  <Text className='text-sm'>+</Text>
                </Button>
              </View>

              <Button
                variant='destructive'
                size='sm'
                onPress={() => removeItem(item.id)}
              >
                <Text className='text-xs'>{t('cart.removeItem')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  if (items.length === 0) {
    return (
      <ScrollView className='flex-1 bg-background'>
        <View className='px-4 py-6'>
          {/* Header */}
          <View className='flex-row items-center mb-6'>
            <Button variant='outline' size='icon' onPress={() => router.back()}>
              <Text>←</Text>
            </Button>
            <Text className='text-xl font-bold ml-4'>{t('cart.cart')}</Text>
          </View>

          {/* Empty State */}
          <View className='flex-1 items-center justify-center py-20'>
            <Text className='text-6xl mb-4'>🛒</Text>
            <Text className='text-xl font-semibold mb-2'>{t('cart.emptyCart')}</Text>
            <Text className='text-muted-foreground text-center mb-6'>
              Looks like you haven't added anything to your cart yet
            </Text>
            <Button onPress={() => router.back()}>
              <Text>Continue Shopping</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  const savings = totalPrice - totalDiscountedPrice;

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='px-4 py-6'>
        {/* Header */}
        <View className='flex-row items-center justify-between mb-6'>
          <View className='flex-row items-center'>
            <Button variant='outline' size='icon' onPress={() => router.back()}>
              <Text>←</Text>
            </Button>
            <Text className='text-xl font-bold ml-4'>
              {t('cart.cart')} ({totalItems})
            </Text>
          </View>
          
          <Button variant='destructive' size='sm' onPress={clearCart}>
            <Text className='text-xs'>Clear All</Text>
          </Button>
        </View>

        {/* Cart Items */}
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        {/* Cart Summary */}
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>{t('cart.subtotal')}</Text>
              <Text>${totalPrice.toFixed(2)}</Text>
            </View>
            
            {savings > 0 && (
              <View className='flex-row justify-between'>
                <Text className='text-muted-foreground'>{t('cart.discount')}</Text>
                <Text className='text-green-600'>-${savings.toFixed(2)}</Text>
              </View>
            )}
            
            <View className='border-t border-border pt-3'>
              <View className='flex-row justify-between'>
                <Text className='font-bold text-lg'>{t('cart.total')}</Text>
                <Text className='font-bold text-lg text-primary'>
                  ${totalDiscountedPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button className='w-full mt-6' size='lg'>
          <Text className='font-semibold'>Proceed to Checkout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}