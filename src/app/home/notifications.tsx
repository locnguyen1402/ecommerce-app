import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function NotificationsTab() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <View className='flex-1 bg-background justify-center items-center px-6'>
        <View className='max-w-sm w-full text-center'>
          <Text className='text-lg font-medium mb-4'>Login Required</Text>
          <Text className='text-muted-foreground mb-6'>
            You need to login to view your notifications
          </Text>
          <Button className='w-full'>
            <Text className='font-medium'>Login</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      className='flex-1 bg-background'
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <View className='px-4 py-6'>
        <Text className='text-xl font-semibold mb-6'>Notifications</Text>
        
        {/* Empty state */}
        <View className='py-12 items-center'>
          <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
            <Text className='text-2xl'>🔔</Text>
          </View>
          <Text className='text-base font-medium mb-2'>No notifications</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            When you have new notifications, they will appear here
          </Text>
          <Button variant='outline'>
            <Text>Enable Notifications</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}