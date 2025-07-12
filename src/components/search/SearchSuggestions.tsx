import React from 'react';
import { Pressable, View } from 'react-native';
import { Search, TrendingUp } from 'lucide-react-native';

import { useSearchStore } from '~/lib/stores/search';
import { useSearchSuggestions } from '~/lib/hooks/useApi';

import { Text } from '~/components/ui/text';

interface SearchSuggestionsProps {
  onSuggestionSelect: (query: string) => void;
}

export function SearchSuggestions({ onSuggestionSelect }: SearchSuggestionsProps) {
  const { query } = useSearchStore();
  
  // Use API hook for suggestions
  const { 
    data: suggestionsData, 
    isLoading: isLoadingSuggestions 
  } = useSearchSuggestions(query);

  // Extract suggestions and popular searches from API response
  const suggestions = suggestionsData?.suggestions || [];
  const popularSearches = suggestionsData?.popular || [];

  // Show suggestions if we have query-based suggestions
  // Otherwise show popular searches
  const showSuggestions = query.length > 0 && suggestions.length > 0;
  const showPopular = query.length === 0 && popularSearches.length > 0;

  if (isLoadingSuggestions && query.length >= 2) {
    return (
      <View className='px-4 py-3'>
        <Text className='text-sm text-muted-foreground'>Loading suggestions...</Text>
      </View>
    );
  }

  return (
    <View className='px-4 py-3'>
      {showSuggestions && (
        <View>
          <Text className='text-sm font-medium text-muted-foreground mb-3'>Suggestions</Text>
          <View className='space-y-1'>
            {suggestions.slice(0, 8).map((suggestion, index) => (
              <Pressable
                key={`suggestion-${index}`}
                className='flex-row items-center gap-3 py-2'
                onPress={() => onSuggestionSelect(suggestion)}
              >
                <Search size={16} className='text-muted-foreground' />
                <Text className='flex-1 text-foreground'>{suggestion}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {showPopular && (
        <View>
          <Text className='text-sm font-medium text-muted-foreground mb-3'>Popular searches</Text>
          <View className='space-y-1'>
            {popularSearches.map((popular, index) => (
              <Pressable
                key={`popular-${index}`}
                className='flex-row items-center gap-3 py-2'
                onPress={() => onSuggestionSelect(popular)}
              >
                <TrendingUp size={16} className='text-muted-foreground' />
                <Text className='flex-1 text-foreground'>{popular}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}