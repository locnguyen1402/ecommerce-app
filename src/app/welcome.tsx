import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { APP_CONFIG } from '~/lib/constants';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';

export default function WelcomeScreen() {
  const { handleWelcomeContinue, handleWelcomeSkip } = useAppNavigation();
  const { t } = useLanguage();
  
  return (
    <View className='flex-1 bg-background px-6 py-8 justify-center'>
      <Card className='mx-4'>
        <CardHeader className='items-center pb-4'>
          <View className='w-24 h-24 bg-primary rounded-full items-center justify-center mb-4'>
            <Text className='text-primary-foreground text-3xl font-bold'>
              E
            </Text>
          </View>
          <CardTitle className='text-center text-2xl'>
            {t('welcome.title')}
          </CardTitle>
        </CardHeader>

        <CardContent className='gap-4'>
          <Text className='text-center text-muted-foreground text-base leading-6'>
            {t('welcome.description')}
          </Text>

          <View className='gap-3 mt-6'>
            <Button onPress={handleWelcomeContinue} className='w-full'>
              <Text>{t('welcome.loginButton')}</Text>
            </Button>

            <Button
              variant='outline'
              onPress={() => router.push('/register')}
              className='w-full'
            >
              <Text>{t('welcome.registerButton')}</Text>
            </Button>

            {!APP_CONFIG.REQUIRE_LOGIN && (
              <Button
                variant='ghost'
                onPress={handleWelcomeSkip}
                className='w-full'
              >
                <Text>{t('welcome.continueWithoutLogin')}</Text>
              </Button>
            )}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
