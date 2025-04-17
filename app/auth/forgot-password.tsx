import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Implement password reset logic here
    console.log('Reset password for:', email);
    // Navigate back to login after submitting
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="mt-8">
        <Text className="text-3xl font-bold mb-5">Forgot password?</Text>
        
        <View className="mb-2">
          <TextInput
            label="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            outlineStyle={{ borderRadius: 8 }}
            className="bg-white"
          />
        </View>
        
        <View className="mb-6 mt-2">
          <Text className="text-xs text-gray-500">
            We will send you a message to set or reset your new password
          </Text>
        </View>
        
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          className="py-1 rounded-md bg-red-500"
          labelStyle={{ fontSize: 16 }}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
