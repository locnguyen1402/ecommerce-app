import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { register, isLoading, error, clearError } = useAuthStore();
  const { handleLoginSuccess } = useAppNavigation();
  const { t } = useLanguage();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = t('auth.allFieldsRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('auth.allFieldsRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.invalidEmail');
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('auth.allFieldsRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('auth.allFieldsRequired');
    }

    if (!formData.password) {
      newErrors.password = t('auth.allFieldsRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.passwordTooShort');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.allFieldsRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDoNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      clearError();

      await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        password: formData.password,
      });

      await handleLoginSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <ScrollView 
      className='flex-1 bg-background'
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <View className='flex-1 px-6 py-8 justify-center'>
        <View className='max-w-sm mx-auto w-full'>
          {/* Header */}
          <View className='items-center mb-8'>
            <View className='w-12 h-12 bg-foreground rounded mb-4 items-center justify-center'>
              <Text className='text-background text-lg font-semibold'>E</Text>
            </View>
            <Text className='text-2xl font-semibold text-center mb-2'>
              {t('auth.registerTitle')}
            </Text>
            <Text className='text-muted-foreground text-center text-sm'>
              {t('auth.registerSubtitle')}
            </Text>
          </View>

          <View className='space-y-4'>
            {/* Error Message */}
            {error && (
              <View className='border border-destructive/50 rounded p-3 mb-4'>
                <Text className='text-destructive text-sm text-center'>{error}</Text>
              </View>
            )}

            {/* Form */}
            <View>
              <Input
                placeholder={t('auth.username')}
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value)}
                autoCapitalize='none'
                className='h-12'
              />
              {errors.username && (
                <Text className='text-destructive text-xs mt-1'>{errors.username}</Text>
              )}
            </View>

            <View>
              <Input
                placeholder={t('auth.email')}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                autoCapitalize='none'
                keyboardType='email-address'
                className='h-12'
              />
              {errors.email && (
                <Text className='text-destructive text-xs mt-1'>{errors.email}</Text>
              )}
            </View>

            <View className='flex-row gap-3'>
              <View className='flex-1'>
                <Input
                  placeholder={t('auth.firstName')}
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  autoCapitalize='words'
                  className='h-12'
                />
                {errors.firstName && (
                  <Text className='text-destructive text-xs mt-1'>{errors.firstName}</Text>
                )}
              </View>

              <View className='flex-1'>
                <Input
                  placeholder={t('auth.lastName')}
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                  autoCapitalize='words'
                  className='h-12'
                />
                {errors.lastName && (
                  <Text className='text-destructive text-xs mt-1'>{errors.lastName}</Text>
                )}
              </View>
            </View>

            <View>
              <Input
                placeholder={t('auth.password')}
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry
                className='h-12'
              />
              {errors.password && (
                <Text className='text-destructive text-xs mt-1'>{errors.password}</Text>
              )}
            </View>

            <View>
              <Input
                placeholder={t('auth.confirmPassword')}
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry
                className='h-12'
              />
              {errors.confirmPassword && (
                <Text className='text-destructive text-xs mt-1'>{errors.confirmPassword}</Text>
              )}
            </View>

            <Button
              onPress={handleRegister}
              className='w-full h-12 mt-6'
              disabled={isLoading}
            >
              <Text className='font-medium'>
                {isLoading ? t('auth.registerInProgress') : t('auth.createAccountButton')}
              </Text>
            </Button>

            {/* Footer */}
            <View className='mt-8 space-y-3'>
              <View className='flex-row justify-center items-center'>
                <Text className='text-muted-foreground text-sm'>{t('auth.hasAccount')}</Text>
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
    </ScrollView>
  );
}