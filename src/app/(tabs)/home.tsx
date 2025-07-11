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
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function HomeTab() {
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
        typeof item === 'string' ? item : (item as any).name || (item as any).slug || String(item)
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
    <View className='flex-1 mx-1 mb-4'>
      <View className='border border-border rounded bg-background'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-36 w-full rounded-t'
            resizeMode='cover'
          />
        ) : (
          <View className='h-36 bg-muted rounded-t items-center justify-center'>
            <Text className='text-muted-foreground text-xs'>No Image</Text>
          </View>
        )}
        
        <View className='p-3'>
          <Text className='font-medium text-sm mb-2' numberOfLines={2}>
            {item.title}
          </Text>
          
          <Text className='text-xs text-muted-foreground mb-2 capitalize'>
            {item.category.replace(/[-_]/g, ' ')}
          </Text>
          
          <View className='flex-row items-center justify-between mb-3'>
            <Text className='font-semibold text-base'>
              ${item.price}
            </Text>
            <Text className='text-xs text-muted-foreground'>
              ★ {item.rating.toFixed(1)}
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
        </View>
      </View>
    </View>
  );

  const renderCategoryChip = ({ item }: { item: string }) => (
    <Button
      variant={selectedCategory === item ? 'default' : 'ghost'}
      className='mr-3 px-4 h-9'
      onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
    >
      <Text className='text-sm capitalize'>{item.replace(/[-_]/g, ' ')}</Text>
    </Button>
  );

  const renderFeaturedProduct = ({ item }: { item: ProductListItem }) => (
    <View className='mr-4 w-48'>
      <View className='border border-border rounded bg-background'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-32 w-full rounded-t'
            resizeMode='cover'
          />
        ) : (
          <View className='h-32 bg-muted rounded-t items-center justify-center'>
            <Text className='text-muted-foreground text-xs'>No Image</Text>
          </View>
        )}
        
        <View className='p-3'>
          <Text className='font-medium text-sm mb-2' numberOfLines={2}>
            {item.title}
          </Text>
          
          <View className='flex-row items-center justify-between'>
            <Text className='font-semibold text-base'>
              ${item.price}
            </Text>
            <Text className='text-xs text-muted-foreground'>
              ★ {item.rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-4 border-b border-border'>
        <View className='flex-row justify-between items-center mb-4'>
          <View className='flex-1'>
            <Text className='text-xl font-semibold'>
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
              <Button variant='ghost' size='sm' onPress={handleLogout}>
                <Text className='text-xs'>{t('auth.logout')}</Text>
              </Button>
            )}
          </View>
        </View>

        {/* Search */}
        <Input
          placeholder={t('homepage.search')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          className='w-full h-10'
        />
      </View>

      <ScrollView className='flex-1'>
        {/* Categories */}
        <View className='py-4'>
          <Text className='text-base font-medium px-4 mb-3'>
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
              data={categories.slice(0, 8)} // Limit to 8 categories
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
            <Text className='text-base font-medium'>
              {t('homepage.featuredProducts')}
            </Text>
            <Button variant='link' className='p-0'>
              <Text className='text-sm'>{t('homepage.viewAll')}</Text>
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
          <Text className='text-base font-medium mb-4'>
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
    </View>
  );
}