import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CartItem } from '@/src/types';
import { formatCurrency } from '@/src/utils/currency';
import useCartStore from '@/src/stores/cartStore';
import Toast from 'react-native-toast-message';

export default function CartModal() {
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, clearCart } = useCartStore();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      Toast.show({
        type: 'success',
        text1: t('cart.itemRemoved'),
      });
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (item: CartItem) => {
    removeItem(item.product.id);
    Toast.show({
      type: 'success',
      text1: t('cart.itemRemoved'),
      text2: item.product.name,
    });
  };

  const handleCheckout = () => {
    router.push('/modal/checkout');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <View className="flex-row">
          {/* Product Image */}
          <Image
            source={{ uri: item.product.images?.[0] }}
            className="w-20 h-20 rounded-lg bg-gray-100 mr-4"
            resizeMode="cover"
          />

          {/* Product Details */}
          <View className="flex-1">
            {/* Product Name */}
            <Text className="font-semibold text-foreground mb-1" numberOfLines={2}>
              {item.product.name}
            </Text>

            {/* Brand */}
            {item.product.brand && (
              <Text className="text-muted-foreground text-sm mb-2">
                {item.product.brand}
              </Text>
            )}

            {/* Price */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-foreground">
                {formatCurrency(item.product.price, item.product.currency)}
              </Text>
              
              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => handleRemoveItem(item)}
                className="p-2"
              >
                <Trash2 size={18} color="#ef4444" />
              </TouchableOpacity>
            </View>

            {/* Quantity Controls */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center border border-border rounded-lg">
                <TouchableOpacity
                  onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  className="p-2"
                >
                  <Minus size={16} color="#6b7280" />
                </TouchableOpacity>
                
                <Text className="px-3 py-2 min-w-[40] text-center font-semibold">
                  {item.quantity}
                </Text>
                
                <TouchableOpacity
                  onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  className="p-2"
                >
                  <Plus size={16} color="#6b7280" />
                </TouchableOpacity>
              </View>

              {/* Subtotal */}
              <Text className="font-bold text-lg text-foreground">
                {formatCurrency(item.product.price * item.quantity, item.product.currency)}
              </Text>
            </View>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const renderEmptyCart = () => (
    <View className="flex-1 items-center justify-center px-6">
      <ShoppingBag size={80} color="#d1d5db" />
      <Text className="text-2xl font-bold text-foreground mt-6 mb-3 text-center">
        {t('cart.empty')}
      </Text>
      <Text className="text-muted-foreground text-center mb-8 leading-6">
        {t('cart.emptyDescription')}
      </Text>
      <Button
        variant="default"
        size="lg"
        onPress={() => router.back()}
        className="w-full max-w-sm"
      >
        <Text className="text-primary-foreground font-semibold">
          {t('cart.continueShopping')}
        </Text>
      </Button>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Stack.Screen
          options={{
            title: t('navigation.cart'),
            headerShown: true,
            presentation: 'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: `${t('navigation.cart')} (${getTotalItems()})`,
          headerShown: true,
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={clearCart}>
              <Text className="text-destructive font-medium">
                {t('cart.clear')}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View className="flex-1">
        {/* Cart Items */}
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom Summary */}
        <View className="border-t border-border bg-card p-6">
          {/* Order Summary */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-muted-foreground">
                {t('cart.subtotal')} ({getTotalItems()} {t('cart.items')})
              </Text>
              <Text className="font-semibold text-foreground">
                {formatCurrency(getTotalPrice(), 'USD')}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-muted-foreground">
                {t('cart.shipping')}
              </Text>
              <Text className="font-semibold text-foreground">
                {t('cart.freeShipping')}
              </Text>
            </View>
            
            <View className="h-px bg-border my-3" />
            
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-foreground">
                {t('cart.total')}
              </Text>
              <Text className="text-xl font-bold text-foreground">
                {formatCurrency(getTotalPrice(), 'USD')}
              </Text>
            </View>
          </View>

          {/* Checkout Button */}
          <Button
            variant="default"
            size="lg"
            onPress={handleCheckout}
            className="w-full"
          >
            <Text className="text-primary-foreground font-semibold text-lg">
              {t('cart.proceedToCheckout')}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
