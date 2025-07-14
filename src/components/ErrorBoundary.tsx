import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In a real app, you would send this to an error monitoring service
    // like Sentry, Bugsnag, or similar
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className='flex-1 bg-background items-center justify-center px-8'>
          <View className='w-20 h-20 bg-destructive/10 rounded-full items-center justify-center mb-6'>
            <Text className='text-destructive text-3xl'>⚠️</Text>
          </View>
          
          <Text className='text-2xl font-semibold mb-3 text-center'>
            Something went wrong
          </Text>
          
          <Text className='text-muted-foreground text-center mb-6'>
            The app encountered an unexpected error. Please try again or restart the app.
          </Text>
          
          <View className='w-full max-w-sm gap-3'>
            <Button
              onPress={this.handleReset}
              className='w-full h-12'
            >
              <Text className='font-medium'>Try Again</Text>
            </Button>
            
            <Button
              variant='outline'
              onPress={() => {
                // In a real app, you might want to restart the app
                // or navigate to a safe screen
                console.log('Restart app requested');
              }}
              className='w-full h-12'
            >
              <Text>Restart App</Text>
            </Button>
          </View>
          
          {__DEV__ && this.state.error && (
            <View className='mt-8 p-4 bg-muted rounded border border-border w-full max-w-sm'>
              <Text className='text-sm font-medium mb-2'>Debug Info:</Text>
              <Text className='text-xs text-muted-foreground font-mono'>
                {this.state.error.message}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}