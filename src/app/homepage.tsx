import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';

import type { ProductListItem } from '~/lib/api/types';
import { useCategories, useFeaturedProducts, useProducts, useSearchProducts } from '~/lib/hooks/useApi';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

import { AddToCartButton } from '~/components/AddToCartButton';
import { CartBadge } from '~/components/CartBadge';
import { LanguageSwitcher } from '~/components/LanguageSwitcher';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function HomepageScreen() {
  const { user, isAuthenticated } = useAuthStore();
  const { handleLogout } = useAppNavigation();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // API calls
  const {
    data: featuredProducts = [],
    isLoading: featuredLoading,
    error: featuredError,
  } = useFeaturedProducts();

  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({ limit: 20 });

  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Handle both string[] and object[] formats
  const categories = Array.isArray(categoriesData) 
    ? categoriesData.map(item => 
        typeof item === 'string' ? item : item.name || item.slug || item
      )
    : [];

  const {
    data: searchResults,
    isLoading: searchLoading,
  } = useSearchProducts({ 
    q: searchQuery, 
    limit: 20 
  });

  // Get products to display
  const getDisplayProducts = () => {
    if (searchQuery && searchResults?.products) {
      return searchResults.products;
    }
    return productsResponse?.products || [];
  };

  const displayProducts = getDisplayProducts();

  const renderProductCard = ({ item }: { item: ProductListItem }) => (
    <Card className='mb-4 mx-2 flex-1 min-w-[160px] max-w-[200px]'>
      <CardContent className='p-3'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-32 w-full rounded-lg mb-3'
            resizeMode='cover'
          />
        ) : (
          <View className='h-32 bg-muted rounded-lg mb-3 items-center justify-center'>
            <Text className='text-muted-foreground text-xs'>No Image</Text>
          </View>
        )}
        
        <Text className='font-semibold text-sm mb-1' numberOfLines={2}>
          {item.title}
        </Text>
        
        <Badge variant='secondary' className='mb-2 self-start'>
          <Text className='text-xs'>{item.category}</Text>
        </Badge>
        
        <View className='flex-row items-center justify-between mb-1'>
          <Text className='text-primary font-bold text-base'>
            ${item.price}
          </Text>
          {item.discountPercentage && item.discountPercentage > 0 && (
            <Badge variant='destructive' className='px-1'>
              <Text className='text-xs'>-{item.discountPercentage.toFixed(0)}%</Text>
            </Badge>
          )}
        </View>
        
        <View className='flex-row items-center justify-between mb-2'>
          <View className='flex-row items-center'>
            <Text className='text-xs text-muted-foreground'>
              ⭐ {item.rating.toFixed(1)}
            </Text>
          </View>
          <Text className='text-xs text-muted-foreground'>
            {t('product.stock')}: {item.stock}
          </Text>
        </View>
        
        <AddToCartButton
          product={{
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            category: item.category,
            discountPercentage: item.discountPercentage || 0,
          }}
          size='sm'
          className='w-full'
        />
      </CardContent>
    </Card>
  );

  const renderCategoryChip = ({ item }: { item: string }) => (
    <Button
      variant={selectedCategory === item ? 'default' : 'outline'}
      className='mr-2 px-4'
      onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
    >
      <Text className='text-sm capitalize'>{item.replace(/[-_]/g, ' ')}</Text>
    </Button>
  );

  const renderFeaturedProduct = ({ item }: { item: ProductListItem }) => (
    <Card className='mr-4 w-48'>
      <CardContent className='p-4'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-28 w-full rounded-lg mb-3'
            resizeMode='cover'
          />
        ) : (
          <View className='h-28 bg-muted rounded-lg mb-3' />
        )}
        
        <Text className='font-semibold text-sm mb-1' numberOfLines={2}>
          {item.title}
        </Text>
        
        <View className='flex-row items-center justify-between'>
          <Text className='text-primary font-bold text-sm'>
            ${item.price}
          </Text>
          <Text className='text-xs text-muted-foreground'>
            ⭐ {item.rating.toFixed(1)}
          </Text>
        </View>
      </CardContent>
    </Card>
  );

  return (
    <ScrollView className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border bg-card'>
        <View className='flex-row justify-between items-center mb-4'>
          <View className='flex-1'>
            <Text className='text-2xl font-bold'>
              {isAuthenticated && user
                ? t('homepage.greeting', { name: user.firstName })
                : t('homepage.guestGreeting')}
            </Text>
            <Text className='text-muted-foreground text-sm'>
              {t('homepage.subtitle')}
            </Text>
          </View>
          
          <View className='flex-row gap-2'>
            <LanguageSwitcher variant="toggle" showLabel={false} />
            <CartBadge size='sm' onPress={() => router.push('/cart')} />
            {isAuthenticated && (
              <Button variant='outline' size='sm' onPress={handleLogout}>
                <Text className='text-xs'>{t('auth.logout')}</Text>
              </Button>
            )}
            <Button variant='outline' size='icon'>
              <Text>👤</Text>
            </Button>
          </View>
        </View>

        {/* Search */}
        <Input
          placeholder={t('homepage.search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          className='w-full'
        />
      </View>

      {/* Categories */}
      <View className='py-4'>
        <Text className='text-lg font-semibold px-4 mb-3'>
          {t('homepage.categories')}
        </Text>
        
        {categoriesLoading ? (
          <View className='px-4'>
            <Text className='text-muted-foreground text-sm'>
              {t('homepage.loadingCategories')}
            </Text>
          </View>
        ) : categoriesError ? (
          <View className='px-4'>
            <Text className='text-destructive text-sm'>
              {t('homepage.errorCategories')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={categories.slice(0, 10)} // Limit to 10 categories
            renderItem={renderCategoryChip}
            keyExtractor={(item, index) => `category-${index}-${item}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        )}
      </View>

      {/* Featured Products */}
      <View className='py-4'>
        <View className='flex-row justify-between items-center px-4 mb-4'>
          <Text className='text-lg font-semibold'>
            {t('homepage.featuredProducts')}
          </Text>
          <Button variant='link' className='p-0'>
            <Text className='text-primary text-sm'>{t('homepage.viewAll')}</Text>
          </Button>
        </View>

        {featuredLoading ? (
          <View className='px-4'>
            <Text className='text-muted-foreground text-sm'>
              {t('homepage.loadingProducts')}
            </Text>
          </View>
        ) : featuredError ? (
          <View className='px-4'>
            <Text className='text-destructive text-sm'>
              {t('homepage.errorProducts')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={featuredProducts}
            renderItem={renderFeaturedProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        )}
      </View>

      {/* All Products */}
      <View className='px-4 pb-8'>
        <Text className='text-lg font-semibold mb-4'>
          {searchQuery ? `Search: "${searchQuery}"` : t('homepage.allProducts')}
        </Text>

        {(productsLoading || searchLoading) ? (
          <View className='py-8 items-center'>
            <Text className='text-muted-foreground'>
              {t('homepage.loadingProducts')}
            </Text>
          </View>
        ) : (productsError && !searchQuery) ? (
          <View className='py-8 items-center'>
            <Text className='text-destructive'>
              {t('homepage.errorProducts')}
            </Text>
          </View>
        ) : displayProducts.length === 0 ? (
          <View className='py-8 items-center'>
            <Text className='text-muted-foreground'>
              {t('homepage.noProducts')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={displayProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className='h-4' />}
          />
        )}
      </View>
    </ScrollView>
  );
}