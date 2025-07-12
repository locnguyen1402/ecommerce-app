import { router } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAuthStore } from '~/lib/stores/auth';
import { useOrdersStore } from '~/lib/stores/orders';
import type { Order } from '~/lib/mock_data/orders';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function OrdersTab() {
  const { isAuthenticated, user } = useAuthStore();
  const { t } = useLanguage();
  const { getUserOrders } = useOrdersStore();

  if (!isAuthenticated) {
    return (
      <View className='flex-1 bg-background justify-center items-center px-6'>
        <View className='max-w-sm w-full text-center'>
          <Text className='text-lg font-medium mb-4'>Login Required</Text>
          <Text className='text-muted-foreground mb-6'>
            You need to login to view your orders
          </Text>
          <Button 
            className='w-full'
            onPress={() => router.push('/login')}
          >
            <Text className='font-medium'>Login</Text>
          </Button>
        </View>
      </View>
    );
  }

  const userOrders = user ? getUserOrders(user.id) : [];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-orange-600';
      case 'confirmed': return 'text-blue-600';
      case 'processing': return 'text-purple-600';
      case 'shipped': return 'text-indigo-600';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const renderOrderCard = ({ item }: { item: Order }) => (
    <View className='border border-border rounded p-4 mb-4 bg-background'>
      <View className='flex-row justify-between items-start mb-3'>
        <View>
          <Text className='font-medium text-base'>
            Order #{item.id.slice(0, 8).toUpperCase()}
          </Text>
          <Text className='text-xs text-muted-foreground'>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text className={`text-sm font-medium capitalize ${getStatusColor(item.status)}`}>
          {item.status}
        </Text>
      </View>

      {/* Order Items Preview */}
      <View className='mb-3'>
        <Text className='text-sm text-muted-foreground mb-2'>
          {item.items.length} item{item.items.length > 1 ? 's' : ''}
        </Text>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <Text key={index} className='text-sm' numberOfLines={1}>
            {orderItem.quantity}x {orderItem.title}
          </Text>
        ))}
        {item.items.length > 2 && (
          <Text className='text-sm text-muted-foreground'>
            and {item.items.length - 2} more...
          </Text>
        )}
      </View>

      {/* Order Total and Action */}
      <View className='flex-row justify-between items-center'>
        <Text className='font-semibold text-lg'>
          ${item.total.toFixed(2)}
        </Text>
        <Button
          variant='outline'
          onPress={() => router.push(`/order/${item.id}`)}
          className='px-4 h-10'
        >
          <Text className='text-sm'>View Details</Text>
        </Button>
      </View>
    </View>
  );

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <Text className='text-xl font-semibold'>Orders</Text>
      </View>

      {userOrders.length === 0 ? (
        /* Empty state */
        <View className='flex-1 items-center justify-center px-8'>
          <View className='w-16 h-16 border border-border rounded items-center justify-center mb-6'>
            <Text className='text-2xl'>📋</Text>
          </View>
          <Text className='text-xl font-semibold mb-3'>No orders yet</Text>
          <Text className='text-muted-foreground text-center mb-8'>
            When you place your first order, it will appear here
          </Text>
          <Button 
            variant='outline'
            onPress={() => router.push('/home')}
            className='w-full h-12'
          >
            <Text className='font-medium'>Start Shopping</Text>
          </Button>
        </View>
      ) : (
        /* Orders List */
        <FlatList
          data={userOrders}
          renderItem={renderOrderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}