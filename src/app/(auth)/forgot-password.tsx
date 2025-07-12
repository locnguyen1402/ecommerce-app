import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const { t } = useLanguage();

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setEmailError(t('auth.allFieldsRequired'));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('auth.invalidEmail'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) return;

    try {
      clearError();
      await forgotPassword({ email: email.trim() });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password failed:', error);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError('');
    }
  };

  if (isSubmitted) {
    return (
      <View className='flex-1 bg-background'>
        <View className='flex-1 px-6 justify-center'>
          <View className='max-w-sm mx-auto w-full'>
            {/* Header */}
            <View className='items-center mb-8'>
              <View className='w-12 h-12 bg-primary rounded mb-4 items-center justify-center'>
                <Text className='text-primary-foreground text-lg font-semibold'>✓</Text>
              </View>
              <Text className='text-2xl font-semibold text-center mb-2'>
                {t('auth.resetLinkSent')}
              </Text>
              <Text className='text-muted-foreground text-center text-sm'>
                Check your email for the reset link
              </Text>
            </View>

            {/* Info Message */}
            <View className='border border-primary/30 rounded p-4 mb-6'>
              <Text className='text-center text-sm'>
                If this email is registered, you will receive a password reset link.
              </Text>
            </View>

            {/* Actions */}
            <View className='space-y-3'>
              <Button
                onPress={() => router.push('/login')}
                className='w-full h-12'
              >
                <Text className='font-medium'>{t('auth.backToLogin')}</Text>
              </Button>

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

  return (
    <View className='flex-1 bg-background'>
      <View className='flex-1 px-6 justify-center'>
        <View className='max-w-sm mx-auto w-full'>
          {/* Header */}
          <View className='items-center mb-8'>
            <View className='w-12 h-12 bg-foreground rounded mb-4 items-center justify-center'>
              <Text className='text-background text-lg font-semibold'>🔒</Text>
            </View>
            <Text className='text-2xl font-semibold text-center mb-2'>
              {t('auth.forgotPasswordTitle')}
            </Text>
            <Text className='text-muted-foreground text-center text-sm'>
              {t('auth.forgotPasswordSubtitle')}
            </Text>
          </View>

          {/* Error Message */}
          {error && (
            <View className='border border-destructive/50 rounded p-3 mb-4'>
              <Text className='text-destructive text-sm text-center'>{error}</Text>
            </View>
          )}

          {/* Form */}
          <View className='space-y-4'>
            <View>
              <Input
                placeholder={t('auth.email')}
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize='none'
                keyboardType='email-address'
                autoComplete='email'
                className='h-12'
              />
              {emailError && (
                <Text className='text-destructive text-xs mt-1'>{emailError}</Text>
              )}
            </View>

            <Button
              onPress={handleSubmit}
              className='w-full h-12 mt-6'
              disabled={isLoading || !email.trim()}
            >
              <Text className='font-medium'>
                {isLoading ? t('auth.sendingResetLink') : t('auth.sendResetLink')}
              </Text>
            </Button>
          </View>

          {/* Footer */}
          <View className='mt-8 space-y-3'>
            <View className='flex-row justify-center items-center'>
              <Text className='text-muted-foreground text-sm'>
                {t('auth.hasAccount')}
              </Text>
              <Button variant='link' className='p-0' onPress={() => router.push('/login')}>
                <Text className='text-sm font-medium'>{t('auth.loginLink')}</Text>
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