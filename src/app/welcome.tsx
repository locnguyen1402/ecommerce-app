import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { APP_CONFIG } from '~/lib/constants';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function WelcomeScreen() {
  const { handleWelcomeContinue, handleWelcomeSkip } = useAppNavigation();
  const { t } = useLanguage();
  
  return (
    <View className='flex-1 bg-background px-8 justify-center'>
      {/* Logo/Icon */}
      <View className='items-center mb-12'>
        <View className='w-20 h-20 border border-border rounded items-center justify-center mb-8'>
          <Text className='text-foreground text-2xl font-semibold'>
            E
          </Text>
        </View>
        
        {/* Title */}
        <Text className='text-3xl font-semibold text-center mb-4'>
          {t('welcome.title')}
        </Text>
        
        {/* Description */}
        <Text className='text-base text-muted-foreground text-center leading-6 max-w-sm'>
          {t('welcome.description')}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className='gap-4'>
        <Button onPress={handleWelcomeContinue} className='w-full h-12'>
          <Text className='font-medium'>{t('welcome.loginButton')}</Text>
        </Button>

        <Button
          variant='outline'
          onPress={() => router.push('/register')}
          className='w-full h-12'
        >
          <Text className='font-medium'>{t('welcome.registerButton')}</Text>
        </Button>

        {!APP_CONFIG.REQUIRE_LOGIN && (
          <Button
            variant='ghost'
            onPress={handleWelcomeSkip}
            className='w-full h-12 mt-4'
          >
            <Text className='font-medium text-muted-foreground'>{t('welcome.continueWithoutLogin')}</Text>
          </Button>
        )}
      </View>
      
      {/* Bottom spacing */}
      <View className='h-16' />
    </View>
  );
}
