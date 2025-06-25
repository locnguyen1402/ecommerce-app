import React from 'react';
import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCartStore } from '~/lib/stores/cart';

interface CartBadgeProps {
  onPress?: () => void;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'icon';
}

export const CartBadge: React.FC<CartBadgeProps> = ({
  onPress,
  size = 'default',
  variant = 'icon',
}) => {
  const { totalItems } = useCartStore();

  if (variant === 'icon') {
    return (
      <View className="relative">
        <Button
          variant="outline"
          size={size === 'sm' ? 'sm' : 'icon'}
          onPress={onPress}
        >
          <Text className={size === 'sm' ? 'text-sm' : 'text-base'}>🛒</Text>
        </Button>
        
        {totalItems > 0 && (
          <View className="absolute -top-2 -right-2">
            <Badge variant="destructive" className="min-w-[20px] h-5 items-center justify-center">
              <Text className="text-xs font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </Text>
            </Badge>
          </View>
        )}
      </View>
    );
  }

  return (
    <Button variant="outline" onPress={onPress} className="flex-row items-center">
      <Text className="mr-2">🛒</Text>
      <Text>Cart</Text>
      {totalItems > 0 && (
        <Badge variant="destructive" className="ml-2">
          <Text className="text-xs font-bold text-white">{totalItems}</Text>
        </Badge>
      )}
    </Button>
  );
};