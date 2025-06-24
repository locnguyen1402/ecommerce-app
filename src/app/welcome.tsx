import React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { APP_CONFIG } from '~/lib/constants';
import { useAppNavigation } from '~/lib/hooks/useNavigation';

export default function WelcomeScreen() {
  const { handleWelcomeContinue, handleWelcomeSkip } = useAppNavigation();
  return (
    <View className='flex-1 bg-background px-6 py-8 justify-center'>
      <Card className='mx-4'>
        <CardHeader className='items-center pb-4'>
          <View className='w-24 h-24 bg-primary rounded-full items-center justify-center mb-4'>
            <Text className='text-primary-foreground text-3xl font-bold'>
              E
            </Text>
          </View>
          <CardTitle className='text-center text-2xl'>
            Chào mừng đến với ECommerce
          </CardTitle>
        </CardHeader>

        <CardContent className='gap-4'>
          <Text className='text-center text-muted-foreground text-base leading-6'>
            Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất. Mua sắm dễ
            dàng, giao hàng nhanh chóng.
          </Text>

          <View className='gap-3 mt-6'>
            <Button onPress={handleWelcomeContinue} className='w-full'>
              <Text>Đăng nhập</Text>
            </Button>

            {!APP_CONFIG.REQUIRE_LOGIN && (
              <Button
                variant='outline'
                onPress={handleWelcomeSkip}
                className='w-full'
              >
                <Text>Tiếp tục mà không đăng nhập</Text>
              </Button>
            )}
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
