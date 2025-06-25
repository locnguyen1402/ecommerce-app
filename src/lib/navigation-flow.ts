import { router } from 'expo-router';
import { APP_CONFIG } from './constants';
import { checkFirstLaunch, setFirstLaunchComplete } from './storage';

/**
 * Navigation Flow Manager
 * Pure routing logic - receives state, determines navigation
 */
export class NavigationFlow {
  /**
   * Determine initial screen when app starts
   * Takes auth state as parameters instead of checking storage
   */
  static async determineInitialRoute(isAuthenticated: boolean): Promise<void> {
    try {
      const isFirstLaunch = await checkFirstLaunch();

      if (isFirstLaunch) {
        router.replace('/welcome');
      } else if (APP_CONFIG.REQUIRE_LOGIN && !isAuthenticated) {
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
   * Handle successful login - pure navigation
   */
  static async handleLoginSuccess(): Promise<void> {
    try {
      router.replace('/homepage');
    } catch (error) {
      console.error('Error handling login success:', error);
      throw error; // Re-throw for login screen to handle error
    }
  }

  /**
   * Handle user logout - pure navigation
   */
  static async handleLogout(): Promise<void> {
    try {
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
   * Check if login is required based on config and auth state
   */
  static shouldRequireLogin(isAuthenticated: boolean): boolean {
    if (!APP_CONFIG.REQUIRE_LOGIN) {
      return false;
    }
    return !isAuthenticated;
  }

  /**
   * Redirect to login if needed (for protected routes)
   */
  static async redirectToLoginIfNeeded(
    isAuthenticated: boolean,
  ): Promise<boolean> {
    const needsLogin = this.shouldRequireLogin(isAuthenticated);

    if (needsLogin) {
      router.replace('/login');
      return true; // Already redirected
    }

    return false; // No redirect needed
  }

  /**
   * Get current navigation state
   */
  static async getNavigationState(isAuthenticated: boolean) {
    const isFirstLaunch = await checkFirstLaunch();

    return {
      isFirstLaunch,
      isAuthenticated,
      requireLogin: APP_CONFIG.REQUIRE_LOGIN,
      shouldShowWelcome: isFirstLaunch,
      shouldShowLogin: APP_CONFIG.REQUIRE_LOGIN && !isAuthenticated,
      canAccessHomepage: !APP_CONFIG.REQUIRE_LOGIN || isAuthenticated,
    };
  }
}

