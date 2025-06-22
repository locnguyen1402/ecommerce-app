import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { NavigationFlow } from '~/lib/navigation-flow';
import { getUserSession } from '~/lib/storage';
import { UserSession } from '~/lib/types';

// Mock data for products
const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: '25,000,000 VNĐ',
    category: 'Điện thoại',
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: '28,000,000 VNĐ',
    category: 'Laptop',
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: '6,500,000 VNĐ',
    category: 'Phụ kiện',
  },
  { id: '4', name: 'iPad Air', price: '15,000,000 VNĐ', category: 'Tablet' },
];

const categories = [
  'Điện thoại',
  'Laptop',
  'Tablet',
  'Phụ kiện',
  'Đồng hồ',
  'Tai nghe',
];

export default function HomepageScreen() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const loadUserSession = async () => {
      const session = await getUserSession();
      setUserSession(session);
    };
    loadUserSession();
  }, []);

  const handleLogout = async () => {
    await NavigationFlow.handleLogout();
  };
  const renderProductCard = ({
    item,
  }: {
    item: (typeof featuredProducts)[0];
  }) => (
    <Card className='mb-4 mx-2 w-40'>
      <CardContent className='p-4'>
        <View className='h-24 bg-muted rounded mb-2' />
        <Text className='font-semibold text-sm' numberOfLines={2}>
          {item.name}
        </Text>
        <Badge variant='secondary' className='mt-1 self-start'>
          <Text className='text-xs'>{item.category}</Text>
        </Badge>
        <Text className='text-primary font-bold mt-2 text-sm'>
          {item.price}
        </Text>
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
              {userSession ? 'Xin chào!' : 'Khách'}
            </Text>
            <Text className='text-muted-foreground'>
              Hôm nay bạn muốn mua gì?
            </Text>
          </View>
          <View className='flex-row gap-2'>
            {userSession && (
              <Button variant='outline' onPress={handleLogout}>
                <Text>Đăng xuất</Text>
              </Button>
            )}
            <Button variant='outline' size='icon'>
              <Text>👤</Text>
            </Button>
          </View>
        </View>

        {/* Search */}
        <Input placeholder='Tìm kiếm sản phẩm...' className='w-full' />
      </View>

      {/* Categories */}
      <View className='py-4'>
        <Text className='text-lg font-semibold px-6 mb-3'>Danh mục</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        />
      </View>

      {/* Banner */}
      <Card className='mx-6 mb-6'>
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
      </Card>

      {/* Featured Products */}
      <View className='pb-6'>
        <View className='flex-row justify-between items-center px-6 mb-4'>
          <Text className='text-lg font-semibold'>Sản phẩm nổi bật</Text>
          <Button variant='link' className='p-0'>
            <Text className='text-primary'>Xem tất cả</Text>
          </Button>
        </View>

        <FlatList
          data={featuredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>

      {/* Quick Actions */}
      <View className='px-6 pb-8'>
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
      </View>
    </ScrollView>
  );
}
