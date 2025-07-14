import { Stack } from 'expo-router';
import React from 'react';

export default function AppStack() {
  return (
    <Stack>
      {/* Welcome & Auth Screens */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      
      {/* Auth Group */}
      <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }} />
      
      {/* Tab Navigation */}
      <Stack.Screen name="home" options={{ headerShown: false }} />
      
      {/* Shopping Screens */}
      <Stack.Screen 
        name="cart" 
        options={{ 
          title: "Cart",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      <Stack.Screen 
        name="product/[id]" 
        options={{ 
          title: "Product Details",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      <Stack.Screen 
        name="product/search-results" 
        options={{ 
          headerShown: false,
        }} 
      />
      
      {/* Ordering Group */}
      <Stack.Screen 
        name="(ordering)/checkout" 
        options={{ 
          title: "Checkout",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      <Stack.Screen 
        name="(ordering)/order-success" 
        options={{ 
          title: "Order Confirmed",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
          headerLeft: () => null, // Prevent back button on success screen
        }} 
      />
      
      {/* Order Details */}
      <Stack.Screen 
        name="order/[id]" 
        options={{ 
          title: "Order Details",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      
      {/* Profile & Settings */}
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "Profile",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      <Stack.Screen 
        name="addresses" 
        options={{ 
          title: "Addresses",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
      <Stack.Screen 
        name="help" 
        options={{ 
          title: "Help & Support",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: '#000',
        }} 
      />
    </Stack>
  );
}