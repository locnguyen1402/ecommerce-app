import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function OrderConfirmationScreen() {
  // Generate a mock order ID for display
  const orderId = Math.random().toString(36).substr(2, 8).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <View className='flex-1 bg-background items-center justify-center px-8'>
        {/* Success Icon */}
        <View className='w-20 h-20 border border-primary rounded items-center justify-center mb-8'>
          <Text className='text-3xl text-primary'>✓</Text>
        </View>

        {/* Success Message */}
        <Text className='text-2xl font-semibold mb-3 text-center'>
          Order Placed Successfully!
        </Text>
        
        <Text className='text-muted-foreground text-center mb-8 leading-6'>
          Thank you for your order. We'll send you a confirmation email shortly.
        </Text>

        {/* Order Details */}
        <View className='w-full border border-border rounded p-4 mb-8'>
          <Text className='font-medium mb-4'>Order Details</Text>
          
          <View className='gap-3'>
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Order ID</Text>
              <Text className='font-medium'>#{orderId}</Text>
            </View>
            
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Order Date</Text>
              <Text className='font-medium'>{new Date().toLocaleDateString()}</Text>
            </View>
            
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Estimated Delivery</Text>
              <Text className='font-medium'>{estimatedDelivery}</Text>
            </View>
            
            <View className='flex-row justify-between'>
              <Text className='text-muted-foreground'>Status</Text>
              <Text className='font-medium text-primary'>Processing</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className='w-full gap-3'>
          <Button 
            onPress={() => router.push('/home/orders')}
            className='w-full h-12'
          >
            <Text className='font-medium'>Track Your Order</Text>
          </Button>
          
          <Button 
            variant='outline'
            onPress={() => router.push('/home')}
            className='w-full h-12'
          >
            <Text className='font-medium'>Continue Shopping</Text>
          </Button>
        </View>

        {/* Help Text */}
      <Text className='text-xs text-muted-foreground text-center mt-6 leading-5'>
        Need help with your order? Contact our support team or check your order status in the Orders tab.
      </Text>
    </View>
  );
}