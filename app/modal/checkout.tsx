import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { ArrowLeft, CreditCard, MapPin, User, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/src/utils/currency';
import useCartStore from '@/src/stores/cartStore';
import { CartItem } from '@/src/types';
import Toast from 'react-native-toast-message';

export default function CheckoutModal() {
  const { t } = useTranslation();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard size={20} color="#6b7280" />,
      details: '**** **** **** 1234',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <User size={20} color="#6b7280" />,
      details: 'user@example.com',
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: <CreditCard size={20} color="#6b7280" />,
      details: 'Touch ID or Face ID',
    },
  ];

  const shippingAddress = {
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Cart is empty',
        text2: 'Please add items to your cart first',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful order
      clearCart();
      
      Toast.show({
        type: 'success',
        text1: 'Order placed successfully!',
        text2: 'You will receive a confirmation email shortly',
      });

      // Navigate to order confirmation or home
      router.replace('/');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Order failed',
        text2: 'Please try again or contact support',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderOrderSummary = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          <Text className="text-lg font-bold">
            {t('checkout.orderSummary')}
          </Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.map((item: CartItem) => (
          <View key={item.product.id} className="flex-row justify-between items-center py-2">
            <View className="flex-1 mr-4">
              <Text className="font-medium" numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text className="text-muted-foreground text-sm">
                Qty: {item.quantity}
              </Text>
            </View>
            <Text className="font-semibold">
              {formatCurrency(item.product.price * item.quantity, item.product.currency)}
            </Text>
          </View>
        ))}
        
        <View className="h-px bg-border my-4" />
        
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">
              {t('cart.subtotal')} ({getTotalItems()} {t('cart.items')})
            </Text>
            <Text className="font-semibold">
              {formatCurrency(getTotalPrice(), 'USD')}
            </Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">
              {t('cart.shipping')}
            </Text>
            <Text className="font-semibold text-green-600">
              {t('cart.freeShipping')}
            </Text>
          </View>
          
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">
              Tax
            </Text>
            <Text className="font-semibold">
              {formatCurrency(getTotalPrice() * 0.08, 'USD')}
            </Text>
          </View>
          
          <View className="h-px bg-border my-2" />
          
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold">
              {t('cart.total')}
            </Text>
            <Text className="text-lg font-bold">
              {formatCurrency(getTotalPrice() * 1.08, 'USD')}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );

  const renderShippingAddress = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MapPin size={20} color="#6b7280" className="mr-2" />
            <Text className="text-lg font-bold">
              {t('checkout.shippingAddress')}
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-primary font-medium">
              {t('common.edit')}
            </Text>
          </TouchableOpacity>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="font-semibold text-foreground mb-1">
          {shippingAddress.name}
        </Text>
        <Text className="text-muted-foreground">
          {shippingAddress.street}
        </Text>
        <Text className="text-muted-foreground">
          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
        </Text>
        <Text className="text-muted-foreground">
          {shippingAddress.country}
        </Text>
      </CardContent>
    </Card>
  );

  const renderPaymentMethods = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex-row items-center">
          <CreditCard size={20} color="#6b7280" className="mr-2" />
          <Text className="text-lg font-bold">
            {t('checkout.paymentMethod')}
          </Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setSelectedPaymentMethod(method.id)}
            className={cn(
              'flex-row items-center justify-between p-4 rounded-lg border mb-3 last:mb-0',
              selectedPaymentMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-border'
            )}
          >
            <View className="flex-row items-center flex-1">
              {method.icon}
              <View className="ml-3">
                <Text className="font-medium text-foreground">
                  {method.name}
                </Text>
                <Text className="text-muted-foreground text-sm">
                  {method.details}
                </Text>
              </View>
            </View>
            
            {selectedPaymentMethod === method.id && (
              <Check size={20} color="#2563eb" />
            )}
          </TouchableOpacity>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: t('checkout.checkout'),
          headerShown: true,
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {renderOrderSummary()}
        {renderShippingAddress()}
        {renderPaymentMethods()}

        {/* Estimated Delivery */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold text-foreground">
                {t('checkout.estimatedDelivery')}
              </Text>
              <Text className="text-muted-foreground">
                3-5 business days
              </Text>
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      {/* Place Order Button */}
      <View className="border-t border-border bg-card p-6">
        <Button
          variant="default"
          size="lg"
          onPress={handlePlaceOrder}
          disabled={isProcessing || items.length === 0}
          className="w-full"
        >
          <Text className="text-primary-foreground font-semibold text-lg">
            {isProcessing
              ? 'Processing...'
              : `${t('checkout.placeOrder')} - ${formatCurrency(getTotalPrice() * 1.08, 'USD')}`
            }
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
