import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Keyboard, ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { useLanguage } from '~/lib/hooks/useLanguage';
import { useSearchStore } from '~/lib/stores/search';

import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { SearchHistory } from '~/components/search/SearchHistory';
import { SearchSuggestions } from '~/components/search/SearchSuggestions';

// Mock suggestions function - in real app would call API
const getMockSuggestions = (query: string): string[] => {
  const allSuggestions = [
    'smartphone', 'smart watch', 'smartwatch',
    'laptop', 'laptop bag', 'laptop stand',
    'headphones', 'wireless headphones', 'gaming headphones',
    'camera', 'camera lens', 'camera bag',
    'tablet', 'tablet case', 'tablet stand',
    'keyboard', 'wireless keyboard', 'gaming keyboard',
    'mouse', 'wireless mouse', 'gaming mouse',
    'monitor', 'gaming monitor', '4k monitor',
    'speaker', 'bluetooth speaker', 'smart speaker',
    'phone case', 'wireless charger', 'power bank',
  ];

  return allSuggestions
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6);
};

export default function SearchTab() {
  const { t } = useLanguage();
  const inputRef = useRef<TextInput>(null);
  const { 
    query, 
    setQuery, 
    setSuggestions, 
    setLoadingSuggestions, 
    addToHistory,
    clearSearch 
  } = useSearchStore();

  const [localQuery, setLocalQuery] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Auto-focus on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Clear search when component mounts
  useEffect(() => {
    clearSearch();
  }, [clearSearch]);

  // Debounced suggestions
  useEffect(() => {
    if (localQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    const timeoutId = setTimeout(() => {
      const suggestions = getMockSuggestions(localQuery);
      setSuggestions(suggestions);
      setLoadingSuggestions(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localQuery, setSuggestions, setLoadingSuggestions]);

  const handleQueryChange = (text: string) => {
    setLocalQuery(text);
    setQuery(text);
    setShowSuggestions(text.length > 0);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || localQuery.trim();
    if (finalQuery) {
      addToHistory(finalQuery);
      setShowSuggestions(false);
      Keyboard.dismiss();
      router.push(`/product/search-results?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setLocalQuery(suggestion);
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleHistorySelect = (historyQuery: string) => {
    setLocalQuery(historyQuery);
    setQuery(historyQuery);
    handleSearch(historyQuery);
  };

  const handleFocus = () => {
    setShowSuggestions(localQuery.length > 0);
  };

  const showContent = useMemo(() => {
    if (showSuggestions && localQuery.length > 0) {
      return 'suggestions';
    }
    return 'default';
  }, [showSuggestions, localQuery]);

  return (
    <View className='flex-1 bg-background'>
      {/* Header */}
      <View className='px-4 py-6 border-b border-border'>
        <Text className='text-2xl font-semibold mb-6'>Search</Text>
        
        {/* Search Input */}
        <Input
          ref={inputRef}
          placeholder='Search products...'
          value={localQuery}
          onChangeText={handleQueryChange}
          onSubmitEditing={() => handleSearch()}
          onFocus={handleFocus}
          returnKeyType='search'
          className='w-full h-12 text-base'
        />
      </View>

      {/* Content */}
      <View className='flex-1'>
        {showContent === 'suggestions' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchSuggestions onSuggestionSelect={handleSuggestionSelect} />
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <SearchHistory onHistorySelect={handleHistorySelect} />
            
            {/* Default State */}
            <View className='flex-1 justify-center items-center px-4 py-16'>
              <View className='w-20 h-20 bg-muted rounded-full items-center justify-center mb-6'>
                <Text className='text-3xl'>🔍</Text>
              </View>
              <Text className='text-xl font-medium mb-3'>Find what you need</Text>
              <Text className='text-muted-foreground text-center leading-6'>
                Search for products by name, category, or description
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}