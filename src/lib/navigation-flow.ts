import { router } from 'expo-router';
import { APP_CONFIG } from './constants';
import {
  checkFirstLaunch,
  clearUserSession,
  isUserLoggedIn,
  saveUserSession,
  setFirstLaunchComplete,
} from './storage';
import { AuthResponse } from './types';

/**
 * Navigation Flow Manager
 * Centralized management for navigation flow between welcome, login, homepage screens
 */
export class NavigationFlow {
  /**
   * Determine initial screen when app starts
   * Called from index.tsx
   */
  static async determineInitialRoute(): Promise<void> {
    try {
      const isFirstLaunch = await checkFirstLaunch();
      const isLoggedIn = await isUserLoggedIn();

      if (isFirstLaunch) {
        router.replace('/welcome');
      } else if (APP_CONFIG.REQUIRE_LOGIN && !isLoggedIn) {
        router.replace('/login');
      } else {
        router.replace('/homepage');
      }
    } catch (error) {
      console.error('Error determining initial route:', error);
      // Fallback to welcome screen
      router.replace('/welcome');
    }
  }

  /**
   * Handle when user taps "Login" button from welcome screen
   */
  static async handleWelcomeContinue(): Promise<void> {
    try {
      await setFirstLaunchComplete();
      router.replace('/login');
    } catch (error) {
      console.error('Error handling welcome continue:', error);
      router.replace('/login'); // Fallback
    }
  }

  /**
   * Handle when user taps "Continue without login" button from welcome screen
   */
  static async handleWelcomeSkip(): Promise<void> {
    try {
      await setFirstLaunchComplete();

      if (APP_CONFIG.REQUIRE_LOGIN) {
        router.replace('/login');
      } else {
        router.replace('/homepage');
      }
    } catch (error) {
      console.error('Error handling welcome skip:', error);
      router.replace('/homepage'); // Fallback
    }
  }

  /**
   * Handle successful login
   */
  static async handleLoginSuccess(authResponse: AuthResponse): Promise<void> {
    try {
      await saveUserSession(authResponse);
      router.replace('/homepage');
    } catch (error) {
      console.error('Error handling login success:', error);
      throw error; // Re-throw for login screen to handle error
    }
  }

  /**
   * Handle user logout
   */
  static async handleLogout(): Promise<void> {
    try {
      await clearUserSession();

      if (APP_CONFIG.REQUIRE_LOGIN) {
        router.replace('/login');
      } else {
        router.replace('/homepage'); // Can still access homepage if login not required
      }
    } catch (error) {
      console.error('Error handling logout:', error);
      router.replace('/login'); // Fallback
    }
  }

  /**
   * Check if login is required based on config and current state
   */
  static async shouldRequireLogin(): Promise<boolean> {
    if (!APP_CONFIG.REQUIRE_LOGIN) {
      return false;
    }

    const isLoggedIn = await isUserLoggedIn();
    return !isLoggedIn;
  }

  /**
   * Redirect to login if needed (for protected routes)
   */
  static async redirectToLoginIfNeeded(): Promise<boolean> {
    const needsLogin = await this.shouldRequireLogin();

    if (needsLogin) {
      router.replace('/login');
      return true; // Already redirected
    }

    return false; // No redirect needed
  }

  /**
   * Get current navigation state
   */
  static async getNavigationState() {
    const isFirstLaunch = await checkFirstLaunch();
    const isLoggedIn = await isUserLoggedIn();

    return {
      isFirstLaunch,
      isLoggedIn,
      requireLogin: APP_CONFIG.REQUIRE_LOGIN,
      shouldShowWelcome: isFirstLaunch,
      shouldShowLogin: APP_CONFIG.REQUIRE_LOGIN && !isLoggedIn,
      canAccessHomepage: !APP_CONFIG.REQUIRE_LOGIN || isLoggedIn,
    };
  }
}

/**
 * Utility functions for quick access
 */
export const navigationFlow = {
  determineInitialRoute: NavigationFlow.determineInitialRoute,
  handleWelcomeContinue: NavigationFlow.handleWelcomeContinue,
  handleWelcomeSkip: NavigationFlow.handleWelcomeSkip,
  handleLoginSuccess: NavigationFlow.handleLoginSuccess,
  handleLogout: NavigationFlow.handleLogout,
  shouldRequireLogin: NavigationFlow.shouldRequireLogin,
  redirectToLoginIfNeeded: NavigationFlow.redirectToLoginIfNeeded,
  getNavigationState: NavigationFlow.getNavigationState,
};
