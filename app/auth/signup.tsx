import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = () => {
    // Implement signup logic here
    console.log('Sign up with:', email, password);
    // Navigate to home page after successful signup
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="mt-8">
        <Text className="text-3xl font-bold mb-5">Create an account</Text>

        <View className="mb-4">
          <TextInput
            label="Username or Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            outlineStyle={{ borderRadius: 8 }}
            className="bg-white"
          />
        </View>

        <View className="mb-4">
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            mode="outlined"
            outlineStyle={{ borderRadius: 8 }}
            className="bg-white"
          />
        </View>

        <View className="mb-2">
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            right={
              <TextInput.Icon
                icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              />
            }
            mode="outlined"
            outlineStyle={{ borderRadius: 8 }}
            className="bg-white"
          />
        </View>

        <View className="mb-4 mt-2">
          <Text className="text-xs text-gray-500">
            Your password must be 8+ characters, include a capital letter and a number
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleSignUp}
          className="py-1 rounded-md bg-red-500"
          labelStyle={{ fontSize: 16 }}
        >
          Create Account
        </Button>

        <View className="flex-row items-center justify-center my-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-500">Or continue with</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <View className="flex-row justify-center space-x-4 mb-6">
          {/* Social login buttons */}
          <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/apple-logo.png' }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-300 items-center justify-center">
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-new.png' }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">I already have an Account! </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;
