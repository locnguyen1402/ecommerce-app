import React, { useState, memo } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useCartStore, type CartItem } from '~/lib/stores/cart';
import { delay } from '~/lib/utils/delay';
import { ENV } from '~/lib/api/config';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  quantity?: number;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const AddToCartButtonComponent: React.FC<AddToCartButtonProps> = ({
  product,
  quantity = 1,
  size = 'default',
  variant = 'default',
  disabled = false,
  className,
}) => {
  const { t } = useLanguage();
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);
    
    try {
      addItem(product, quantity);
      
      // Add a small delay for better UX
      await delay(ENV.MOCK_DELAY);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onPress={handleAddToCart}
      size={size}
      variant={variant}
      disabled={disabled || isAdding}
      className={className}
    >
      <View className="flex-row items-center">
        {isAdding ? (
          <>
            <Text className={`${size === 'sm' ? 'text-xs' : 'text-sm'} mr-1`}>
              ⏳
            </Text>
            <Text className={size === 'sm' ? 'text-xs' : 'text-sm'}>
              {t('cart.adding')}
            </Text>
          </>
        ) : (
          <>
            <Text className={`${size === 'sm' ? 'text-xs' : 'text-sm'} mr-1`}>
              🛒
            </Text>
            <Text className={size === 'sm' ? 'text-xs' : 'text-sm'}>
              {t('cart.addToCart')}
            </Text>
          </>
        )}
      </View>
    </Button>
  );
};

// Memoized version with custom comparison
export const AddToCartButton = memo(AddToCartButtonComponent, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.title === nextProps.product.title &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.thumbnail === nextProps.product.thumbnail &&
    prevProps.quantity === nextProps.quantity &&
    prevProps.size === nextProps.size &&
    prevProps.variant === nextProps.variant &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.className === nextProps.className
  );
});