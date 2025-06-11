import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  Bell, 
  CreditCard, 
  MapPin, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Edit
} from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import useUserStore from '@/src/stores/userStore';
import useCartStore from '@/src/stores/cartStore';

const menuItems = [
  {
    id: 'orders',
    title: 'My Orders',
    subtitle: 'Track your orders',
    icon: <ShoppingBag size={20} color="#6b7280" />,
    route: '/modal/orders',
  },
  {
    id: 'wishlist',
    title: 'Wishlist',
    subtitle: 'Your saved items',
    icon: <Heart size={20} color="#6b7280" />,
    route: '/modal/wishlist',
  },
  {
    id: 'addresses',
    title: 'Addresses',
    subtitle: 'Manage delivery addresses',
    icon: <MapPin size={20} color="#6b7280" />,
    route: '/modal/addresses',
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    subtitle: 'Manage cards & payments',
    icon: <CreditCard size={20} color="#6b7280" />,
    route: '/modal/payment-methods',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage preferences',
    icon: <Bell size={20} color="#6b7280" />,
    route: '/modal/notifications',
  },
  {
    id: 'settings',
    title: 'Settings',
    subtitle: 'App preferences',
    icon: <Settings size={20} color="#6b7280" />,
    route: '/modal/settings',
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Get assistance',
    icon: <HelpCircle size={20} color="#6b7280" />,
    route: '/modal/help',
  },
];

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useUserStore();
  const { getTotalItems } = useCartStore();

  const handleMenuPress = (item: typeof menuItems[0]) => {
    console.log('Navigate to:', item.route);
    // router.push(item.route);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            console.log('User logged out');
          }
        },
      ]
    );
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // router.push('/modal/edit-profile');
  };

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleMenuPress(item)}
      className="flex-row items-center justify-between py-4 px-4 border-b border-border/50"
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-muted rounded-full items-center justify-center mr-3">
          {item.icon}
        </View>
        <View className="flex-1">
          <Text className="font-medium text-foreground">
            {item.title}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {item.subtitle}
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        {/* Header */}
        <View className="px-6 py-4 border-b border-border">
          <Text className="text-2xl font-bold text-foreground">
            Profile
          </Text>
        </View>

        {/* Not Authenticated State */}
        <View className="flex-1 items-center justify-center px-6">
          <User size={80} color="#d1d5db" />
          <Text className="text-2xl font-bold text-foreground mt-6 mb-3 text-center">
            Welcome to {t('app.name', 'EcommerceApp')}
          </Text>
          <Text className="text-muted-foreground text-center mb-8 leading-6">
            Sign in to access your profile, orders, and personalized recommendations.
          </Text>
          
          <View className="w-full space-y-4">
            <Button
              variant="default"
              size="lg"
              onPress={() => console.log('Navigate to login')}
              className="w-full"
            >
              <Text className="text-primary-foreground font-semibold">
                Sign In
              </Text>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onPress={() => console.log('Navigate to register')}
              className="w-full"
            >
              <Text className="font-semibold">
                Create Account
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 border-b border-border">
        <Text className="text-2xl font-bold text-foreground">
          Profile
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card className="m-6 mb-4">
          <CardContent className="p-6">
            <View className="flex-row items-center">
              <Avatar className="w-16 h-16 mr-4">
                <AvatarImage source={{ uri: user?.avatar }} />
                <AvatarFallback>
                  <Text className="text-lg font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </Text>
                </AvatarFallback>
              </Avatar>
              
              <View className="flex-1">
                <Text className="text-xl font-bold text-foreground mb-1">
                  {user?.name || 'John Doe'}
                </Text>
                <Text className="text-muted-foreground mb-2">
                  {user?.email || 'john.doe@example.com'}
                </Text>
                <TouchableOpacity
                  onPress={handleEditProfile}
                  className="flex-row items-center"
                >
                  <Edit size={14} color="#2563eb" />
                  <Text className="text-primary font-medium ml-1">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <View className="flex-row mx-6 mb-6 space-x-4">
          <Card className="flex-1">
            <CardContent className="p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                {getTotalItems()}
              </Text>
              <Text className="text-muted-foreground text-sm">
                Cart Items
              </Text>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardContent className="p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                12
              </Text>
              <Text className="text-muted-foreground text-sm">
                Orders
              </Text>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardContent className="p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                5
              </Text>
              <Text className="text-muted-foreground text-sm">
                Wishlist
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Menu Items */}
        <Card className="mx-6 mb-6">
          <CardContent className="p-0">
            {menuItems.map(renderMenuItem)}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <View className="mx-6 mb-8">
          <Button
            variant="outline"
            size="lg"
            onPress={handleLogout}
            className="w-full border-destructive"
          >
            <View className="flex-row items-center">
              <LogOut size={20} color="#ef4444" />
              <Text className="text-destructive font-semibold ml-2">
                Logout
              </Text>
            </View>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
