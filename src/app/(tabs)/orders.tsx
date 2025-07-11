import React from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function OrdersTab() {
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <View className='flex-1 bg-background justify-center items-center px-6'>
        <View className='max-w-sm w-full text-center'>
          <Text className='text-lg font-medium mb-4'>Login Required</Text>
          <Text className='text-muted-foreground mb-6'>
            You need to login to view your orders
          </Text>
          <Button className='w-full'>
            <Text className='font-medium'>Login</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='px-4 py-6'>
        <Text className='text-xl font-semibold mb-6'>Orders</Text>
        
        {/* Empty state */}
        <View className='py-12 items-center'>
          <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
            <Text className='text-2xl'>📋</Text>
          </View>
          <Text className='text-base font-medium mb-2'>No orders yet</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            When you place your first order, it will appear here
          </Text>
          <Button variant='outline'>
            <Text>Start Shopping</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}