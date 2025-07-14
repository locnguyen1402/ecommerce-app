import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

/**
 * Standard header configuration for the app
 */
export const createHeaderConfig = (
  title: string,
  options?: Partial<NativeStackNavigationOptions>
): NativeStackNavigationOptions => ({
  title,
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontWeight: '600',
    fontSize: 18,
  },
  headerTintColor: '#000',
  ...options,
});

/**
 * Standard header configuration without header shown
 */
export const hiddenHeaderConfig: NativeStackNavigationOptions = {
  headerShown: false,
};

/**
 * Header configuration for order success screen (no back button)
 */
export const orderSuccessHeaderConfig = (title: string) => createHeaderConfig(title, {
  headerLeft: () => null, // Prevent back button on success screen
});