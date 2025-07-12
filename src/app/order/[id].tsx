import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useOrdersStore } from '~/lib/stores/orders';
import type { Order } from '~/lib/mock_data/orders';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const { getOrderById } = useOrdersStore();

  const order = getOrderById(id!);

  if (!order) {
    return (
      <View className='flex-1 bg-background'>
        <View className='px-4 py-4 border-b border-border'>
          <View className='flex-row items-center'>
            <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
              <Text className='text-lg'>←</Text>
            </Button>
            <Text className='text-xl font-semibold'>Order Details</Text>
          </View>
        </View>
        <View className='flex-1 items-center justify-center px-8'>
          <Text className='text-xl font-semibold mb-3'>Order Not Found</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            Sorry, we couldn't find this order.
          </Text>
          <Button onPress={() => router.back()} className='w-full h-12'>
            <Text className='font-medium'>Go Back</Text>
          </Button>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'confirmed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'shipped': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusSteps = () => {
    const allSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = allSteps.indexOf(order.status);
    
    return allSteps.map((step, index) => ({
      status: step,
      completed: index <= currentIndex && order.status !== 'cancelled',
      current: step === order.status,
    }));
  };

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <View className='flex-row items-center'>
          <Button variant='ghost' onPress={() => router.back()} className='mr-3 p-2'>
            <Text className='text-lg'>←</Text>
          </Button>
          <Text className='text-xl font-semibold'>Order Details</Text>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='px-4 py-6'>
          {/* Order Header */}
          <View className='border border-border rounded p-4 mb-6'>
            <View className='flex-row justify-between items-start mb-4'>
              <View>
                <Text className='text-xl font-semibold'>
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </Text>
                <Text className='text-sm text-muted-foreground'>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <View className={`px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
                <Text className={`text-sm font-medium capitalize ${getStatusColor(order.status).split(' ')[0]}`}>
                  {order.status}
                </Text>
              </View>
            </View>

            {order.estimatedDelivery && (
              <Text className='text-sm text-muted-foreground'>
                Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
              </Text>
            )}
          </View>

          {/* Order Status Tracking */}
          {order.status !== 'cancelled' && (
            <View className='border border-border rounded p-4 mb-6'>
              <Text className='font-semibold mb-4'>Order Status</Text>
              <View className='gap-3'>
                {getStatusSteps().map((step, index) => (
                  <View key={step.status} className='flex-row items-center'>
                    <View 
                      className={`w-4 h-4 rounded-full mr-3 ${
                        step.completed 
                          ? 'bg-primary' 
                          : step.current 
                            ? 'bg-primary' 
                            : 'bg-muted border border-border'
                      }`}
                    />
                    <Text className={`capitalize ${
                      step.completed || step.current ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {step.status === 'pending' ? 'Order Placed' :
                       step.status === 'confirmed' ? 'Order Confirmed' :
                       step.status === 'processing' ? 'Processing' :
                       step.status === 'shipped' ? 'Shipped' : 'Delivered'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Order Items */}
          <View className='border border-border rounded p-4 mb-6'>
            <Text className='font-semibold mb-4'>Items ({order.items.length})</Text>
            <View className='gap-4'>
              {order.items.map((item, index) => (
                <View key={index} className='flex-row'>
                  <View className='w-16 h-16 bg-muted rounded mr-4 items-center justify-center'>
                    {item.thumbnail ? (
                      <Image 
                        source={{ uri: item.thumbnail }} 
                        className='w-full h-full rounded'
                        resizeMode='cover'
                      />
                    ) : (
                      <Text className='text-xs text-muted-foreground'>No Image</Text>
                    )}
                  </View>
                  <View className='flex-1'>
                    <Text className='font-medium mb-1' numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text className='text-sm text-muted-foreground mb-1'>
                      Quantity: {item.quantity}
                    </Text>
                    <Text className='text-sm text-muted-foreground'>
                      ${item.price.toFixed(2)} each
                    </Text>
                  </View>
                  <Text className='font-medium'>
                    ${item.total.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Shipping Address */}
          <View className='border border-border rounded p-4 mb-6'>
            <Text className='font-semibold mb-3'>Shipping Address</Text>
            <Text className='text-sm mb-1'>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </Text>
            {order.shippingAddress.company && (
              <Text className='text-sm mb-1'>{order.shippingAddress.company}</Text>
            )}
            <Text className='text-sm mb-1'>{order.shippingAddress.address}</Text>
            {order.shippingAddress.address2 && (
              <Text className='text-sm mb-1'>{order.shippingAddress.address2}</Text>
            )}
            <Text className='text-sm mb-1'>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </Text>
            <Text className='text-sm'>{order.shippingAddress.country}</Text>
            {order.shippingAddress.phone && (
              <Text className='text-sm mt-1'>Phone: {order.shippingAddress.phone}</Text>
            )}
          </View>

          {/* Payment Method */}
          <View className='border border-border rounded p-4 mb-6'>
            <Text className='font-semibold mb-3'>Payment Method</Text>
            <Text className='text-sm capitalize'>
              {order.paymentMethod.type.replace('_', ' ')}
            </Text>
            {order.paymentMethod.last4 && (
              <Text className='text-sm text-muted-foreground'>
                **** **** **** {order.paymentMethod.last4}
              </Text>
            )}
          </View>

          {/* Order Summary */}
          <View className='border border-border rounded p-4 mb-6'>
            <Text className='font-semibold mb-4'>Order Summary</Text>
            <View className='gap-3'>
              <View className='flex-row justify-between'>
                <Text className='text-muted-foreground'>Subtotal</Text>
                <Text>${order.subtotal.toFixed(2)}</Text>
              </View>
              
              {order.discount > 0 && (
                <View className='flex-row justify-between'>
                  <Text className='text-muted-foreground'>Discount</Text>
                  <Text className='text-primary'>-${order.discount.toFixed(2)}</Text>
                </View>
              )}
              
              <View className='flex-row justify-between'>
                <Text className='text-muted-foreground'>Shipping</Text>
                <Text>${order.shipping.toFixed(2)}</Text>
              </View>
              
              <View className='flex-row justify-between'>
                <Text className='text-muted-foreground'>Tax</Text>
                <Text>${order.tax.toFixed(2)}</Text>
              </View>
              
              <View className='border-t border-border pt-3'>
                <View className='flex-row justify-between'>
                  <Text className='font-semibold text-lg'>Total</Text>
                  <Text className='font-semibold text-lg'>${order.total.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {order.status === 'pending' && (
            <Button 
              variant='outline'
              className='w-full h-12 mb-4'
              onPress={() => {
                // TODO: Implement cancel order functionality
                console.log('Cancel order:', order.id);
              }}
            >
              <Text className='font-medium text-red-600'>Cancel Order</Text>
            </Button>
          )}

          <Button 
            variant='outline'
            onPress={() => router.push('/(tabs)/orders')}
            className='w-full h-12'
          >
            <Text className='font-medium'>Back to Orders</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}