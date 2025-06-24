import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { NAV_THEME } from '~/lib/constants';
import i18n from '~/lib/i18n/config';
import { useColorScheme } from '~/lib/useColorScheme';
import { QueryProvider } from './QueryProvider';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <I18nextProvider i18n={i18n}>
      <QueryProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          {children}
        </ThemeProvider>
      </QueryProvider>
    </I18nextProvider>
  );
};