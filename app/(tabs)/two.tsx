import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock categories data
const categories = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    productCount: 156,
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Cameras'],
  },
  {
    id: '2',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    productCount: 289,
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories'],
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
    productCount: 198,
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'],
  },
  {
    id: '4',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    productCount: 124,
    subcategories: ['Exercise Equipment', 'Sportswear', 'Outdoor', 'Supplements'],
  },
  {
    id: '5',
    name: 'Beauty & Health',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    productCount: 167,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Health'],
  },
  {
    id: '6',
    name: 'Books & Media',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
    productCount: 89,
    subcategories: ['Books', 'Movies', 'Music', 'Games'],
  },
];

export default function CategoriesScreen() {
  const { t } = useTranslation();

  const handleCategoryPress = (category: any) => {
    // Navigate to category products page
    console.log('Navigate to category:', category.name);
    // router.push(`/category/${category.id}`);
  };

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      className="flex-1 m-2"
    >
      <Card className="overflow-hidden">
        <Image
          source={{ uri: item.image }}
          className="w-full h-32 bg-gray-100"
          resizeMode="cover"
        />
        <CardContent className="p-4">
          <Text className="font-bold text-lg text-foreground mb-1">
            {item.name}
          </Text>
          <Text className="text-muted-foreground text-sm mb-2">
            {item.productCount} products
          </Text>
          <View className="flex-row flex-wrap">
            {item.subcategories.slice(0, 2).map((sub: string, index: number) => (
              <Text
                key={index}
                className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mr-1 mb-1"
              >
                {sub}
              </Text>
            ))}
            {item.subcategories.length > 2 && (
              <Text className="text-xs text-muted-foreground px-2 py-1">
                +{item.subcategories.length - 2} more
              </Text>
            )}
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <Text className="text-2xl font-bold text-foreground">
          Categories
        </Text>
        <Text className="text-muted-foreground mt-1">
          Explore our product categories
        </Text>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
