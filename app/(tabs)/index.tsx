import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ShoppingCart, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

// Import our components and hooks
import { ProductCard } from '@/src/components/ecommerce/ProductCard';
import { Button } from '@/src/components/ui/Button';
import { useFeaturedProducts } from '@/src/services/productService';
import useCartStore from '@/src/stores/cartStore';
import { Product } from '@/src/types';

// Mock data for development (replace with real API calls)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    originalPrice: 399.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop'],
    category: 'Electronics',
    brand: 'TechPro',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor',
    price: 199.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop'],
    category: 'Wearables',
    brand: 'FitTech',
    rating: 4.2,
    reviewCount: 89,
    inStock: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for compatible devices',
    price: 49.99,
    originalPrice: 69.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop'],
    category: 'Accessories',
    brand: 'ChargePlus',
    rating: 4.0,
    reviewCount: 45,
    inStock: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleSearch = () => {
    // Navigate to search screen
    console.log('Navigate to search');
  };

  const handleCart = () => {
    router.push('/modal/cart');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('navigation.home')}
          </Text>
          <Text className="text-gray-500 dark:text-gray-400">
            Welcome back!
          </Text>
        </View>
        
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={handleSearch} className="p-2">
            <Search size={24} className="text-gray-600 dark:text-gray-300" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleCart} className="p-2 relative">
            <ShoppingCart size={24} className="text-gray-600 dark:text-gray-300" />
            {cartItemCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-5 h-5 flex items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2">
            <Bell size={24} className="text-gray-600 dark:text-gray-300" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section */}
        <View className="bg-gradient-to-r from-blue-600 to-purple-600 mx-4 mt-4 rounded-xl p-6">
          <Text className="text-white text-2xl font-bold mb-2">
            Special Offers
          </Text>
          <Text className="text-white/80 mb-4">
            Up to 50% off on selected items
          </Text>
          <Button
            variant="secondary"
            onPress={() => router.push('/(tabs)/explore')}
            className="self-start"
          >
            Shop Now
          </Button>
        </View>

        {/* Categories */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {t('categories.categories')}
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {['Electronics', 'Fashion', 'Home', 'Sports', 'Books'].map((category) => (
              <TouchableOpacity
                key={category}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 mr-3 min-w-24 items-center border border-gray-200 dark:border-gray-700"
              >
                <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-2" />
                <Text className="text-gray-900 dark:text-white text-sm font-medium">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View className="mt-6 pb-6">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Featured Products
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={mockProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard product={item} className="mx-2 w-64" />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
