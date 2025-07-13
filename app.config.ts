import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ecommerce-app',
  slug: 'ecommerce-app',
  scheme: 'acme',
  userInterfaceStyle: 'automatic',
  orientation: 'default',
  newArchEnabled: true,
  web: {
    output: 'static',
  },
  android: {
    edgeToEdgeEnabled: true,
    package: 'vn.locnguyen.ecommerceapp',
  },
  plugins: [
    [
      'expo-router',
      {
        origin: 'https://n',
      },
    ],
    [
      'react-native-edge-to-edge',
      {
        android: {
          parentTheme: 'Material3',
          enforceNavigationBarContrast: true,
        },
      },
    ],
  ],
});
