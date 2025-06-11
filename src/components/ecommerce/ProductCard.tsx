import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/utils/currency';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/utils/cn';
import useCartStore from '@/src/stores/cartStore';
import Toast from 'react-native-toast-message';

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  className?: string;
}

export function ProductCard({ product, onPress, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/modal/product-detail?productId=${product.id}`);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation(); // Prevent card press
    addItem(product, 1);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.name} has been added to your cart`,
      position: 'top',
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden',
        className
      )}
    >
      {/* Product Image */}
      <View className="relative">
        <Image
          source={{ uri: product.images[0] || 'https://via.placeholder.com/300x200' }}
          className="w-full h-48"
          resizeMode="cover"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">
              -{discountPercentage}%
            </Text>
          </View>
        )}
        
        {/* Wishlist Button */}
        <TouchableOpacity className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full">
          <Heart size={16} className="text-gray-600 dark:text-gray-300" />
        </TouchableOpacity>
        
        {/* Stock Status */}
        {!product.inStock && (
          <View className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <View className="bg-white px-3 py-1 rounded-full">
              <Text className="text-gray-900 font-medium text-sm">Out of Stock</Text>
            </View>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View className="p-4">
        {/* Brand */}
        {product.brand && (
          <Text className="text-gray-500 dark:text-gray-400 text-xs uppercase font-medium mb-1">
            {product.brand}
          </Text>
        )}
        
        {/* Product Name */}
        <Text 
          className="text-gray-900 dark:text-gray-100 font-medium text-base mb-2"
          numberOfLines={2}
        >
          {product.name}
        </Text>
        
        {/* Rating */}
        {product.rating && (
          <View className="flex-row items-center mb-2">
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  className={cn(
                    'text-sm',
                    star <= Math.floor(product.rating || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  )}
                >
                  ★
                </Text>
              ))}
            </View>
            {product.reviewCount && (
              <Text className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                ({product.reviewCount})
              </Text>
            )}
          </View>
        )}
        
        {/* Price */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Text className="text-gray-900 dark:text-gray-100 font-bold text-lg">
              {formatCurrency(product.price, product.currency)}
            </Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text className="text-gray-500 dark:text-gray-400 text-sm line-through ml-2">
                {formatCurrency(product.originalPrice, product.currency)}
              </Text>
            )}
          </View>
        </View>
        
        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="sm"
          onPress={handleAddToCart}
          disabled={!product.inStock}
          leftIcon={<ShoppingCart size={16} className="text-white" />}
          className="w-full"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </View>
    </TouchableOpacity>
  );
}
