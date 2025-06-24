import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('emilys'); // DummyJSON test user
  const [password, setPassword] = useState('emilyspass'); // DummyJSON test password

  // Use auth store
  const { login, isLoading, error, clearError } = useAuthStore();
  const { handleLoginSuccess } = useAppNavigation();
  const { t } = useLanguage();

  const handleLogin = async () => {
    try {
      clearError();

      // Use auth store login
      await login({
        username,
        password,
        expiresInMins: 30,
      });

      // Handle navigation explicitly
      await handleLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled by auth store
    }
  };

  return (
    <ScrollView className='flex-1 bg-background'>
      <View className='flex-1 px-6 py-8 justify-center min-h-screen'>
        <Card className='mx-4'>
          <CardHeader className='items-center pb-6'>
            <View className='w-16 h-16 bg-primary rounded-full items-center justify-center mb-4'>
              <Text className='text-primary-foreground text-xl font-bold'>
                E
              </Text>
            </View>
            <CardTitle className='text-center text-xl'>{t('auth.loginTitle')}</CardTitle>
            <Text className='text-center text-muted-foreground'>
              {t('auth.loginSubtitle')}
            </Text>
          </CardHeader>

          <CardContent className='gap-4'>
            {error && (
              <View className='bg-destructive/10 border border-destructive rounded-md p-3'>
                <Text className='text-destructive text-sm'>{error}</Text>
              </View>
            )}

            <View className='gap-2'>
              <Text className='text-sm font-medium'>{t('auth.username')}</Text>
              <Input
                placeholder={t('auth.loginPlaceholder')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
              />
            </View>

            <View className='gap-2'>
              <Text className='text-sm font-medium'>{t('auth.password')}</Text>
              <Input
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Button
              onPress={handleLogin}
              className='w-full mt-4'
              disabled={isLoading || !username || !password}
            >
              <Text>{isLoading ? t('auth.loginInProgress') : t('auth.loginButton')}</Text>
            </Button>

            <View className='flex-row justify-center items-center mt-4'>
              <Text className='text-muted-foreground'>{t('auth.noAccount')}</Text>
              <Button variant='link' className='p-0'>
                <Text>{t('auth.registerButton')}</Text>
              </Button>
            </View>

            <Button
              variant='outline'
              onPress={() => router.back()}
              className='w-full mt-2'
            >
              <Text>{t('common.back')}</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
