import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAuthStore } from '~/lib/stores/auth';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function ProfileScreen() {
  const { t } = useLanguage();
  const { user, updateProfile, deleteAccount } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      router.replace('/welcome');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <ScrollView className='flex-1 bg-background px-4 py-6'>
      {/* Profile Header */}
      <View className='items-center mb-8'>
        <View className='w-24 h-24 bg-primary rounded-full items-center justify-center mb-4'>
          <Text className='text-primary-foreground text-3xl font-semibold'>
            {user?.firstName?.charAt(0) || 'U'}
          </Text>
        </View>
        <Text className='text-2xl font-semibold'>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text className='text-muted-foreground'>{user?.email}</Text>
      </View>

      {/* Profile Form */}
      <View className='space-y-6'>
        <Text className='text-lg font-semibold'>Personal Information</Text>
        
        <View className='space-y-4'>
          <View>
            <Text className='text-sm font-medium mb-2'>First Name</Text>
            <Input
              value={formData.firstName}
              onChangeText={(text) => setFormData({...formData, firstName: text})}
              placeholder='Enter your first name'
              editable={isEditing}
              className={`${!isEditing ? 'bg-muted' : 'bg-background'}`}
            />
          </View>

          <View>
            <Text className='text-sm font-medium mb-2'>Last Name</Text>
            <Input
              value={formData.lastName}
              onChangeText={(text) => setFormData({...formData, lastName: text})}
              placeholder='Enter your last name'
              editable={isEditing}
              className={`${!isEditing ? 'bg-muted' : 'bg-background'}`}
            />
          </View>

          <View>
            <Text className='text-sm font-medium mb-2'>Email</Text>
            <Input
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder='Enter your email'
              keyboardType='email-address'
              editable={isEditing}
              className={`${!isEditing ? 'bg-muted' : 'bg-background'}`}
            />
          </View>

          <View>
            <Text className='text-sm font-medium mb-2'>Phone Number</Text>
            <Input
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              placeholder='Enter your phone number'
              keyboardType='phone-pad'
              editable={isEditing}
              className={`${!isEditing ? 'bg-muted' : 'bg-background'}`}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View className='pt-6'>
          {!isEditing ? (
            <Button
              className='w-full h-12'
              onPress={() => setIsEditing(true)}
            >
              <Text className='font-medium'>Edit Profile</Text>
            </Button>
          ) : (
            <View className='flex-row space-x-4'>
              <Button
                variant='outline'
                className='flex-1 h-12'
                onPress={handleCancel}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                className='flex-1 h-12'
                onPress={handleSave}
              >
                <Text className='font-medium'>Save Changes</Text>
              </Button>
            </View>
          )}
        </View>

        {/* Account Settings */}
        <View className='mt-8 pt-6 border-t border-border'>
          <Text className='text-lg font-semibold mb-4'>Account Settings</Text>
          
          <View className='space-y-2'>
            <Button 
              variant='ghost' 
              className='w-full justify-start h-12'
              onPress={() => router.push('/change-password')}
            >
              <Text className='text-left'>🔒 Change Password</Text>
            </Button>
            
            <Button 
              variant='ghost' 
              className='w-full justify-start h-12'
              onPress={() => router.push('/notifications-settings')}
            >
              <Text className='text-left'>🔔 Notification Settings</Text>
            </Button>
            
            <Button 
              variant='ghost' 
              className='w-full justify-start h-12'
              onPress={() => router.push('/privacy-settings')}
            >
              <Text className='text-left'>🔐 Privacy Settings</Text>
            </Button>
          </View>
        </View>

        {/* Danger Zone */}
        <View className='mt-8 pt-6 border-t border-border'>
          <Text className='text-lg font-semibold mb-4 text-destructive'>Danger Zone</Text>
          
          <Button 
            variant='outline' 
            className='w-full h-12 border-destructive'
            onPress={handleDeleteAccount}
          >
            <Text className='text-destructive'>Delete Account</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}