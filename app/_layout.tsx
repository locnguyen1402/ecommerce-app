import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

// Import our configurations
import '../src/utils/i18n'; // Initialize i18n
import '../global.css'; // Import NativeWind styles
import { queryClient } from '@/src/services/queryClient';
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* Modal screens */}
              <Stack.Screen 
                name="modal/product-detail" 
                options={{ 
                  presentation: 'modal',
                  title: 'Product Details'
                }} 
              />
              <Stack.Screen 
                name="modal/cart" 
                options={{ 
                  presentation: 'modal',
                  title: 'Shopping Cart'
                }} 
              />
              <Stack.Screen 
                name="modal/checkout" 
                options={{ 
                  presentation: 'modal',
                  title: 'Checkout'
                }} 
              />
              <Stack.Screen 
                name="modal/profile" 
                options={{ 
                  presentation: 'modal',
                  title: 'Profile'
                }} 
              />
              <Stack.Screen 
                name="modal/orders" 
                options={{ 
                  presentation: 'modal',
                  title: 'Orders'
                }} 
              />
              <Stack.Screen 
                name="modal/order-detail" 
                options={{ 
                  presentation: 'modal',
                  title: 'Order Details'
                }} 
              />
            </Stack>
            <Toast />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
