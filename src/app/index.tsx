import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { NavigationFlow } from '~/lib/navigation-flow';

export default function Page() {
  useEffect(() => {
    const initializeApp = async () => {
      // Show splash screen for 1 second before navigation
      setTimeout(() => {
        NavigationFlow.determineInitialRoute();
      }, 1000);
    };

    initializeApp();
  }, []);

  return (
    <View className='flex flex-1 justify-center items-center bg-background'>
      <View className='w-20 h-20 bg-primary rounded-full items-center justify-center mb-4'>
        <Text className='text-primary-foreground text-2xl font-bold'>E</Text>
      </View>
      <Text className='text-xl font-semibold'>ECommerce App</Text>
      <Text className='text-muted-foreground mt-2'>Đang tải...</Text>
    </View>
  );
}
