import React, { useRef, useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { useLanguage } from '~/lib/hooks/useLanguage';

import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

export default function SearchTab() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/product-search-results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-6 border-b border-border'>
        <Text className='text-2xl font-semibold mb-6'>Search</Text>
        
        {/* Search Input */}
        <Input
          ref={inputRef}
          placeholder='Search products...'
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType='search'
          className='w-full h-12 text-base'
        />
      </View>

      {/* Search State */}
      <View className='flex-1 justify-center items-center px-4'>
        <View className='w-20 h-20 bg-muted rounded-full items-center justify-center mb-6'>
          <Text className='text-3xl'>🔍</Text>
        </View>
        <Text className='text-xl font-medium mb-3'>Find what you need</Text>
        <Text className='text-muted-foreground text-center leading-6'>
          Search for products by name, category, or description
        </Text>
      </View>
    </View>
  );
}