import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Plus, Minus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/utils/currency';
import useCartStore from '@/src/stores/cartStore';
import Toast from 'react-native-toast-message';

// Mock product data (replace with API call)
const mockProduct: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'Experience premium sound quality with our latest wireless headphones featuring active noise cancellation, premium materials, and all-day battery life. Perfect for music lovers and professionals alike.',
  price: 299.99,
  originalPrice: 399.99,
  currency: 'USD',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
  ],
  category: 'Electronics',
  subcategory: 'Audio',
  brand: 'TechSound',
  sku: 'TS-WH-001',
  inStock: true,
  stockQuantity: 25,
  rating: 4.5,
  reviewCount: 128,
  specifications: {
    'Battery Life': '30 hours',
    'Connectivity': 'Bluetooth 5.0',
    'Weight': '250g',
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Noise Cancellation': 'Active',
  },
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Quick charge (5min = 3hrs)',
    'Premium leather cushions',
    'Foldable design',
    'Voice assistant compatible',
  ],
  tags: ['wireless', 'premium', 'noise-cancelling'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const { width } = Dimensions.get('window');

export default function ProductDetailModal() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { addItem } = useCartStore();
  const product = mockProduct; // Replace with actual API call using id

  const handleAddToCart = () => {
    addItem(product, quantity);
    Toast.show({
      type: 'success',
      text1: t('cart.itemAdded'),
      text2: `${product.name} (${quantity})`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/modal/checkout');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
        fill={index < Math.floor(rating) ? '#fbbf24' : 'transparent'}
      />
    ));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: product.name,
          headerShown: true,
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row space-x-2">
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                <Heart 
                  size={24} 
                  color={isFavorite ? '#ef4444' : '#6b7280'} 
                  fill={isFavorite ? '#ef4444' : 'transparent'} 
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Share2 size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {product.images?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                className="bg-gray-100"
                style={{ width, height: width }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-2">
            {product.images?.map((_, index) => (
              <View
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full',
                  index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                )}
              />
            ))}
          </View>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <View className="absolute top-4 left-4">
              <Badge variant="destructive">
                <Text className="text-white font-bold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Text>
              </Badge>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-6">
          {/* Brand */}
          {product.brand && (
            <Text className="text-primary font-medium text-sm uppercase tracking-wide mb-2">
              {product.brand}
            </Text>
          )}

          {/* Product Name */}
          <Text className="text-2xl font-bold text-foreground mb-3">
            {product.name}
          </Text>

          {/* Rating and Reviews */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center mr-3">
              {renderStars(product.rating || 0)}
            </View>
            <Text className="text-muted-foreground">
              {product.rating} ({product.reviewCount} {t('product.reviews')})
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center mb-6">
            <Text className="text-3xl font-bold text-foreground mr-3">
              {formatCurrency(product.price, product.currency)}
            </Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.originalPrice, product.currency)}
              </Text>
            )}
          </View>

          {/* Stock Status */}
          <View className="mb-6">
            {product.inStock ? (
              <Text className="text-green-600 font-medium">
                ✓ {t('product.inStock')} ({product.stockQuantity} available)
              </Text>
            ) : (
              <Text className="text-red-600 font-medium">
                ✗ {t('product.outOfStock')}
              </Text>
            )}
          </View>

          {/* Quantity Selector */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-semibold text-foreground">
              {t('product.quantity')}
            </Text>
            <View className="flex-row items-center border border-border rounded-lg">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3"
              >
                <Minus size={20} color="#6b7280" />
              </TouchableOpacity>
              <Text className="px-4 py-3 text-lg font-semibold min-w-[50] text-center">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="p-3"
              >
                <Plus size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3 mb-8">
            <Button
              variant="default"
              size="lg"
              onPress={handleBuyNow}
              disabled={!product.inStock}
              className="w-full"
            >
              <Text className="text-primary-foreground font-semibold text-lg">
                {t('product.buyNow')} - {formatCurrency(product.price * quantity, product.currency)}
              </Text>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onPress={handleAddToCart}
              disabled={!product.inStock}
              className="w-full flex-row items-center"
            >
              <ShoppingCart size={20} color="#6b7280" />
              <Text className="ml-2 font-semibold text-lg">
                {t('product.addToCart')}
              </Text>
            </Button>
          </View>

          {/* Description */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <Text className="text-lg font-semibold mb-3">
                {t('product.description')}
              </Text>
              <Text className="text-muted-foreground leading-6">
                {product.description}
              </Text>
            </CardContent>
          </Card>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <Text className="text-lg font-semibold mb-3">
                  {t('product.features')}
                </Text>
                {product.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <View className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <Text className="text-muted-foreground flex-1">
                      {feature}
                    </Text>
                  </View>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Specifications */}
          {product.specifications && (
            <Card>
              <CardContent className="p-4">
                <Text className="text-lg font-semibold mb-3">
                  {t('product.specifications')}
                </Text>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <View key={key} className="flex-row justify-between py-2 border-b border-border/50 last:border-b-0">
                    <Text className="font-medium text-foreground">
                      {key}
                    </Text>
                    <Text className="text-muted-foreground">
                      {value}
                    </Text>
                  </View>
                ))}
              </CardContent>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
