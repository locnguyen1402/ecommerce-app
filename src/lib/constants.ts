// Storage keys
export const STORAGE_KEYS = {
  FIRST_LAUNCH: '@app_first_launch',
  ACCESS_TOKEN: '@app_access_token',
  REFRESH_TOKEN: '@app_refresh_token',
  LANGUAGE: '@app_language',
};

// App configuration
export const APP_CONFIG = {
  REQUIRE_LOGIN: process.env.EXPO_PUBLIC_REQUIRE_LOGIN === 'true' || false,
  LOGIN_SUCCESS_REDIRECT_URL:
    process.env.EXPO_PUBLIC_LOGIN_SUCCESS_REDIRECT_URL || '/home',
};

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};
