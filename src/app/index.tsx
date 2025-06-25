import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

import { Text } from '~/components/ui/text';

export default function Page() {
  const { initializeAuth, isLoading, isInitialized } = useAuthStore();
  const { determineInitialRoute } = useAppNavigation();
  const { t, initialize: initializeLanguage } = useLanguage();

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize language and auth in parallel
      await Promise.all([initializeLanguage(), initializeAuth()]);
    };

    initializeApp();
  }, [initializeAuth, initializeLanguage]);

  // Navigate when auth is initialized
  useEffect(() => {
    if (isInitialized && !isLoading) {
      // Show splash screen for 1 second before navigation
      setTimeout(() => {
        determineInitialRoute();
      }, 1000);
    }
  }, [isInitialized, isLoading, determineInitialRoute]);

  return (
    <View className='flex flex-1 justify-center items-center bg-background'>
      <View className='w-20 h-20 bg-primary rounded-full items-center justify-center mb-4'>
        <Text className='text-primary-foreground text-2xl font-bold'>E</Text>
      </View>
      <Text className='text-xl font-semibold'>{t('app.name')}</Text>
      <Text className='text-muted-foreground mt-2'>{t('app.loading')}</Text>
    </View>
  );
}
