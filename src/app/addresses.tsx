import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesScreen() {
  const { t } = useLanguage();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      address: '456 Office Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const renderAddress = (address: Address) => (
    <View key={address.id} className='border border-border rounded p-4 mb-4'>
      <View className='flex-row items-center justify-between mb-3'>
        <View className='flex-row items-center'>
          <View className='bg-primary/10 px-2 py-1 rounded mr-2'>
            <Text className='text-primary text-xs font-medium capitalize'>
              {address.type}
            </Text>
          </View>
          {address.isDefault && (
            <View className='bg-green-100 px-2 py-1 rounded'>
              <Text className='text-green-800 text-xs font-medium'>Default</Text>
            </View>
          )}
        </View>
        <Button
          variant='ghost'
          size='sm'
          onPress={() => handleDeleteAddress(address.id)}
          className='p-1'
        >
          <Text className='text-destructive'>🗑️</Text>
        </Button>
      </View>

      <View className='space-y-1 mb-3'>
        <Text className='font-medium'>
          {address.firstName} {address.lastName}
        </Text>
        <Text className='text-muted-foreground'>{address.address}</Text>
        <Text className='text-muted-foreground'>
          {address.city}, {address.state} {address.zipCode}
        </Text>
        <Text className='text-muted-foreground'>{address.country}</Text>
        <Text className='text-muted-foreground'>{address.phone}</Text>
      </View>

      <View className='flex-row space-x-3'>
        <Button
          variant='outline'
          size='sm'
          className='flex-1'
          onPress={() => {
            // TODO: Implement edit address
            console.log('Edit address:', address.id);
          }}
        >
          <Text>Edit</Text>
        </Button>
        {!address.isDefault && (
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onPress={() => handleSetDefault(address.id)}
          >
            <Text>Set as Default</Text>
          </Button>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView className='flex-1 bg-background px-4 py-6'>
      <View className='flex-row items-center justify-between mb-6'>
        <Text className='text-2xl font-semibold'>My Addresses</Text>
        <Button
          size='sm'
          onPress={() => {
            // TODO: Implement add new address
            console.log('Add new address');
          }}
        >
          <Text className='font-medium'>+ Add New</Text>
        </Button>
      </View>

      {addresses.length === 0 ? (
        <View className='flex-1 items-center justify-center py-12'>
          <View className='w-20 h-20 bg-muted rounded-full items-center justify-center mb-4'>
            <Text className='text-3xl'>📍</Text>
          </View>
          <Text className='text-xl font-semibold mb-2'>No addresses yet</Text>
          <Text className='text-muted-foreground text-center mb-6'>
            Add your first address to make checkout faster
          </Text>
          <Button
            onPress={() => {
              // TODO: Implement add new address
              console.log('Add first address');
            }}
          >
            <Text className='font-medium'>Add Address</Text>
          </Button>
        </View>
      ) : (
        <View>
          {addresses.map(renderAddress)}
        </View>
      )}

      {/* Quick Actions */}
      <View className='mt-8 pt-6 border-t border-border'>
        <Text className='text-lg font-semibold mb-4'>Quick Actions</Text>
        
        <View className='space-y-2'>
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => {
              // TODO: Implement address validation
              console.log('Validate addresses');
            }}
          >
            <Text className='text-left'>✅ Validate All Addresses</Text>
          </Button>
          
          <Button 
            variant='ghost' 
            className='w-full justify-start h-12'
            onPress={() => {
              // TODO: Implement import from contacts
              console.log('Import from contacts');
            }}
          >
            <Text className='text-left'>📱 Import from Contacts</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}