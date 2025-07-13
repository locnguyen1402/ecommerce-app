import { router } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

import { LanguageSwitcher } from '~/components/LanguageSwitcher';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function AccountTab() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuthStore();
  const { handleLogout } = useAppNavigation();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <View className='flex-1 bg-background justify-center items-center px-6'>
        <View className='max-w-sm w-full'>
          <View className='items-center mb-8'>
            <View className='w-16 h-16 bg-muted rounded-full items-center justify-center mb-4'>
              <Text className='text-2xl'>👤</Text>
            </View>
            <Text className='text-lg font-medium mb-2'>Welcome to ECommerce</Text>
            <Text className='text-muted-foreground text-center mb-6'>
              Login to access your account and manage your orders
            </Text>
          </View>
          
          <View className='space-y-3'>
            <Button 
              className='w-full h-12'
              onPress={() => router.push('/login')}
            >
              <Text className='font-medium'>Login</Text>
            </Button>
            
            <Button 
              variant='outline'
              className='w-full h-12'
              onPress={() => router.push('/(auth)/register')}
            >
              <Text>Create Account</Text>
            </Button>
          </View>
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
        {/* Profile Header */}
        <View className='items-center mb-8'>
          <View className='w-20 h-20 bg-primary rounded-full items-center justify-center mb-4'>
            <Text className='text-primary-foreground text-2xl font-semibold'>
              {user?.firstName?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text className='text-xl font-semibold'>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className='text-muted-foreground'>{user?.email}</Text>
        </View>

        {/* Menu Items */}
        <View className='space-y-2'>
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => router.push('/orders')}
          >
            <Text className='text-left'>📋 My Orders</Text>
          </Button>
          
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => router.push('/profile')}
          >
            <Text className='text-left'>👤 Profile Settings</Text>
          </Button>
          
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => router.push('/addresses')}
          >
            <Text className='text-left'>📍 Addresses</Text>
          </Button>
          
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => router.push('/payment-methods')}
          >
            <Text className='text-left'>💳 Payment Methods</Text>
          </Button>
          
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => router.push('/help')}
          >
            <Text className='text-left'>❓ Help & Support</Text>
          </Button>
        </View>

        {/* Settings */}
        <View className='mt-8 pt-6 border-t border-border'>
          <Text className='text-base font-medium mb-4'>Settings</Text>
          
          <View className='flex-row items-center justify-between py-3'>
            <Text>Language</Text>
            <LanguageSwitcher variant="toggle" showLabel={true} />
          </View>
        </View>

        {/* Logout */}
        <View className='mt-8 pt-6 border-t border-border'>
          <Button 
            variant='outline' 
            className='w-full h-12'
            onPress={handleLogout}
          >
            <Text>Logout</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}