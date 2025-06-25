import { useCallback } from 'react';
import { NavigationFlow } from '../navigation-flow';
import { useAuthStore } from '../stores/auth';

export const useAppNavigation = () => {
  const { isAuthenticated, logout: authLogout } = useAuthStore();

  const handleWelcomeContinue = useCallback(async () => {
    try {
      await NavigationFlow.handleWelcomeContinue();
    } catch (error) {
      console.error('Welcome continue failed:', error);
    }
  }, []);

  const handleWelcomeSkip = useCallback(async () => {
    try {
      await NavigationFlow.handleWelcomeSkip();
    } catch (error) {
      console.error('Welcome skip failed:', error);
    }
  }, []);

  const handleLoginSuccess = useCallback(async () => {
    try {
      await NavigationFlow.handleLoginSuccess();
    } catch (error) {
      console.error('Login navigation failed:', error);
      throw error;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await authLogout();
      await NavigationFlow.handleLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [authLogout]);

  const determineInitialRoute = useCallback(async () => {
    try {
      await NavigationFlow.determineInitialRoute(isAuthenticated);
    } catch (error) {
      console.error('Initial route determination failed:', error);
    }
  }, [isAuthenticated]);

  return {
    handleWelcomeContinue,
    handleWelcomeSkip,
    handleLoginSuccess,
    handleLogout,
    determineInitialRoute,
  };
};