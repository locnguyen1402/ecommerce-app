import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { LanguageSwitcher } from '~/components/LanguageSwitcher';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import type { Product } from '~/lib/api/types';
import { useCategories, useFeaturedProducts } from '~/lib/hooks/useApi';
import { useLanguage } from '~/lib/hooks/useLanguage';
import { useAppNavigation } from '~/lib/hooks/useNavigation';
import { useAuthStore } from '~/lib/stores/auth';

export default function HomepageScreen() {
  // Use auth store as single source of truth
  const { user, isAuthenticated } = useAuthStore();
  const { handleLogout } = useAppNavigation();
  const { t } = useLanguage();

  // Fetch real data from API
  const {
    data: featuredProducts = [],
    isLoading: productsLoading,
    error: productsError,
  } = useFeaturedProducts();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const renderProductCard = ({ item }: { item: Product }) => (
    <Card className='mb-4 mx-2 w-40'>
      <CardContent className='p-4'>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className='h-24 w-full rounded mb-2'
            resizeMode='cover'
          />
        ) : (
          <View className='h-24 bg-muted rounded mb-2' />
        )}
        <Text className='font-semibold text-sm' numberOfLines={2}>
          {item.title}
        </Text>
        <Badge variant='secondary' className='mt-1 self-start'>
          <Text className='text-xs'>{item.category}</Text>
        </Badge>
        <Text className='text-primary font-bold mt-2 text-sm'>
          ${item.price}
        </Text>
        {item.discountPercentage > 0 && (
          <Text className='text-destructive text-xs line-through'>
            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
          </Text>
        )}
        <View className='flex-row items-center mt-1'>
          <Text className='text-xs text-muted-foreground'>
            ⭐ {item.rating.toFixed(1)}
          </Text>
          <Text className='text-xs text-muted-foreground ml-2'>
            {t('product.stock')}: {item.stock}
          </Text>
        </View>
      </CardContent>
    </Card>
  );

  const renderCategoryItem = ({ item }: { item: string }) => (
    <Button variant='outline' className='mr-3 px-4'>
      <Text className='text-sm'>{item}</Text>
    </Button>
  );

  return (
    <ScrollView className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-6 py-4 border-b border-border'>
        <View className='flex-row justify-between items-center mb-4'>
          <View>
            <Text className='text-2xl font-bold'>
              {isAuthenticated && user
                ? t('homepage.greeting', { name: user.firstName })
                : t('homepage.guestGreeting')}
            </Text>
            <Text className='text-muted-foreground'>
              {t('homepage.subtitle')}
            </Text>
          </View>
          <View className='flex-row gap-2'>
            <LanguageSwitcher variant="toggle" showLabel={false} />
            {isAuthenticated && (
              <Button variant='outline' onPress={handleLogout}>
                <Text>{t('auth.logout')}</Text>
              </Button>
            )}
            <Button variant='outline' size='icon'>
              <Text>👤</Text>
            </Button>
          </View>
        </View>

        {/* Search */}
        {/* <Input placeholder='Tìm kiếm sản phẩm...' className='w-full' /> */}
      </View>

      {/* Categories */}
      {/* <View className='py-4'>
        <Text className='text-lg font-semibold px-6 mb-3'>Danh mục</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ListEmptyComponent={() => (
            <View className='px-6'>
              <Text className='text-muted-foreground'>
                {categoriesLoading
                  ? 'Loading categories...'
                  : 'No categories found'}
              </Text>
            </View>
          )}
        />
      </View> */}

      {/* Banner */}
      {/* <Card className='mx-6 mb-6'>
        <CardContent className='p-0'>
          <View className='h-32 bg-gradient-to-r from-primary to-primary/80 rounded-lg justify-center items-center'>
            <Text className='text-primary-foreground text-xl font-bold'>
              🔥 Flash Sale
            </Text>
            <Text className='text-primary-foreground/90 text-sm mt-1'>
              Giảm giá lên đến 50%
            </Text>
          </View>
        </CardContent>
      </Card> */}

      {/* Featured Products */}
      {/* <View className='pb-6'>
        <View className='flex-row justify-between items-center px-6 mb-4'>
          <Text className='text-lg font-semibold'>Sản phẩm nổi bật</Text>
          <Button variant='link' className='p-0'>
            <Text className='text-primary'>Xem tất cả</Text>
          </Button>
        </View>

        <FlatList
          data={featuredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ListEmptyComponent={() => (
            <View className='flex-1 justify-center items-center py-8'>
              <Text className='text-muted-foreground'>
                {productsLoading ? 'Loading products...' : 'No products found'}
              </Text>
            </View>
          )}
        />
      </View> */}

      {/* Quick Actions */}
      {/* <View className='px-6 pb-8'>
        <Text className='text-lg font-semibold mb-4'>Truy cập nhanh</Text>
        <View className='flex-row gap-4'>
          <Button variant='outline' className='flex-1'>
            <Text>🛒 Giỏ hàng</Text>
          </Button>
          <Button variant='outline' className='flex-1'>
            <Text>📋 Đơn hàng</Text>
          </Button>
        </View>
        <View className='flex-row gap-4 mt-3'>
          <Button variant='outline' className='flex-1'>
            <Text>❤️ Yêu thích</Text>
          </Button>
          <Button
            variant='outline'
            className='flex-1'
            onPress={() => router.push('/welcome')}
          >
            <Text>🚪 Đăng xuất</Text>
          </Button>
        </View>
      </View> */}
    </ScrollView>
  );
}
