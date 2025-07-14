import { Stack } from 'expo-router';
import React from 'react';

import { createHeaderConfig, hiddenHeaderConfig, orderSuccessHeaderConfig } from '~/lib/utils/headerConfig';

export default function AppStack() {
  return (
    <Stack>
      {/* Welcome & Auth Screens */}
      <Stack.Screen name="index" options={hiddenHeaderConfig} />
      <Stack.Screen name="welcome" options={hiddenHeaderConfig} />
      <Stack.Screen name="login" options={hiddenHeaderConfig} />
      
      {/* Auth Group */}
      <Stack.Screen name="(auth)/register" options={hiddenHeaderConfig} />
      <Stack.Screen name="(auth)/forgot-password" options={hiddenHeaderConfig} />
      
      {/* Tab Navigation */}
      <Stack.Screen name="home" options={hiddenHeaderConfig} />
      
      {/* Shopping Screens */}
      <Stack.Screen name="cart" options={createHeaderConfig("Cart")} />
      <Stack.Screen name="product/[id]" options={createHeaderConfig("Product Details")} />
      <Stack.Screen name="product/search-results" options={hiddenHeaderConfig} />
      
      {/* Ordering Group */}
      <Stack.Screen name="(ordering)/checkout" options={createHeaderConfig("Checkout")} />
      <Stack.Screen name="(ordering)/order-success" options={orderSuccessHeaderConfig("Order Confirmed")} />
      
      {/* Order Details */}
      <Stack.Screen name="order/[id]" options={createHeaderConfig("Order Details")} />
      
      {/* Profile & Settings */}
      <Stack.Screen name="profile" options={createHeaderConfig("Profile")} />
      <Stack.Screen name="addresses" options={createHeaderConfig("Addresses")} />
      <Stack.Screen name="help" options={createHeaderConfig("Help & Support")} />
    </Stack>
  );
}