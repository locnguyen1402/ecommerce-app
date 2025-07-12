import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <View className='flex-1 bg-background'>
      <View className='flex-1 px-6 justify-center'>
        <View className='max-w-sm mx-auto w-full'>
          {/* Header */}
          <View className='items-center mb-8'>
            <View className='w-12 h-12 bg-foreground rounded mb-4 items-center justify-center'>
              <Text className='text-background text-lg font-semibold'>E</Text>
            </View>
            <Text className='text-2xl font-semibold text-center mb-2'>
              {t('auth.loginTitle')}
            </Text>
            <Text className='text-muted-foreground text-center text-sm'>
              {t('auth.loginSubtitle')}
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className='border border-destructive/50 rounded p-3 mb-4'>
              <Text className='text-destructive text-sm text-center'>
                {error}
              </Text>
            </View>
          )}

          {/* Demo Account Info */}
          <View className='border border-primary/30 rounded p-3 mb-6'>
            <Text className='text-xs text-muted-foreground text-center mb-1'>
              Demo Account
            </Text>
            <Text className='text-xs text-center'>
              Username: demo • Password: demo123
            </Text>
          </View>

          {/* Form */}
          <View className='space-y-4'>
            <View>
              <Input
                placeholder={t('auth.username')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                className='h-12'
              />
            </View>

            <View>
              <Input
                placeholder={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className='h-12'
              />
              <Button
                variant='link'
                className='p-0 self-end mt-1'
                onPress={() => router.push('/(auth)/forgot-password')}
              >
                <Text className='text-xs text-muted-foreground'>
                  {t('auth.forgotPassword')}
                </Text>
              </Button>
            </View>

            <Button
              onPress={handleLogin}
              className='w-full h-12 mt-6'
              disabled={isLoading || !username || !password}
            >
              <Text className='font-medium'>
                {isLoading ? t('auth.loginInProgress') : t('auth.loginButton')}
              </Text>
            </Button>
          </View>

          {/* Footer */}
          <View className='mt-8 space-y-3'>
            <View className='flex-row justify-center items-center'>
              <Text className='text-muted-foreground text-sm'>
                {t('auth.noAccount')}
              </Text>
              <Button
                variant='link'
                className='p-0'
                onPress={() => router.push('/(auth)/register')}
              >
                <Text className='text-sm font-medium'>
                  {t('auth.registerButton')}
                </Text>
              </Button>
            </View>

            <Button
              variant='ghost'
              onPress={() => router.back()}
              className='w-full'
            >
              <Text className='text-sm'>{t('common.back')}</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
