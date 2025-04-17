import React from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import colors from '@/constants/Colors';

// Define the theme type
type AppThemeColors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
};

// Export the theme for use in components
export const themeColors: AppThemeColors = {
  // These should match your tailwind.config.js values
  primary: colors.primary.DEFAULT,
  primaryLight: colors.primary.light,
  primaryDark: colors.primary.dark,
  secondary: colors.secondary.DEFAULT,
  secondaryLight: colors.secondary.light,
  secondaryDark: colors.secondary.dark,
  background: colors.background,
  surface: colors.surface,
  textPrimary: colors.text.primary,
  textSecondary: colors.text.secondary,
};

// Create a Paper theme that uses the same colors
const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    background: themeColors.background,
    surface: themeColors.surface,
  },
};

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
