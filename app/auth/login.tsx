import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View className="flex-1 bg-background px-5 justify-center">
      <StatusBar style="dark" />

      {/* Welcome Text */}
      <View className="mb-8">
        <Text className="text-4xl font-bold text-text-primary">Welcome</Text>
        <Text className="text-4xl font-bold text-text-primary">Back!</Text>
      </View>

      {/* Input Fields */}
      <View className="mb-4 gap-4">
        <TextInput
          mode="outlined"
          label="Username or Email"
          value={username}
          onChangeText={setUsername}
        //   className="bg-background"
          outlineStyle={{ borderRadius: 8 }}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        //   className="bg-background"
          outlineStyle={{ borderRadius: 8 }}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <TouchableOpacity className="self-end mt-1">
          <Text className="text-primary">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={() => console.log('Login pressed')}
        className="bg-primary py-2 rounded-md mt-4"
        contentStyle={{ height: 45 }}
      >
        <Text className="text-white text-base font-semibold">Login</Text>
      </Button>

      {/* OR Divider */}
      <View className="flex-row items-center my-8">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-text-secondary text-sm">OR Continue with</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      {/* Social Login Buttons */}
      <View className="flex-row justify-center space-x-4">
        <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
          <FontAwesome name="google" size={20} color="#DB4437" />
        </TouchableOpacity>

        <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
          <FontAwesome name="apple" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
          <FontAwesome name="facebook" size={20} color="#4267B2" />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-text-secondary mr-1">Create An Account</Text>
        <TouchableOpacity>
          <Text className="text-primary font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
