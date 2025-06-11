import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { cn } from '@/src/utils/cn';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-primary-600 active:bg-primary-700',
  secondary: 'bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:active:bg-gray-600',
  outline: 'border border-gray-300 dark:border-gray-600 bg-transparent active:bg-gray-50 dark:active:bg-gray-800',
  ghost: 'bg-transparent active:bg-gray-100 dark:active:bg-gray-700',
  destructive: 'bg-red-600 active:bg-red-700',
};

const buttonSizes = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const textVariants = {
  primary: 'text-white font-medium',
  secondary: 'text-gray-900 dark:text-gray-100 font-medium',
  outline: 'text-gray-900 dark:text-gray-100 font-medium',
  ghost: 'text-gray-900 dark:text-gray-100 font-medium',
  destructive: 'text-white font-medium',
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      {...props}
      disabled={isDisabled}
      className={cn(
        'rounded-lg flex-row items-center justify-center',
        buttonVariants[variant],
        buttonSizes[size],
        isDisabled && 'opacity-50',
        className
      )}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' || variant === 'destructive' ? 'white' : '#374151'}
            className="mr-2"
          />
        ) : (
          leftIcon && <View className="mr-2">{leftIcon}</View>
        )}
        
        <Text
          className={cn(
            textVariants[variant],
            textSizes[size]
          )}
        >
          {children}
        </Text>
        
        {rightIcon && !loading && (
          <View className="ml-2">{rightIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}
