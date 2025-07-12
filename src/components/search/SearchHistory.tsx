import React from 'react';
import { Pressable, View } from 'react-native';
import { Clock, X } from 'lucide-react-native';

import { useSearchStore } from '~/lib/stores/search';

import { Text } from '~/components/ui/text';

interface SearchHistoryProps {
  onHistorySelect: (query: string) => void;
}

export function SearchHistory({ onHistorySelect }: SearchHistoryProps) {
  const { history, removeFromHistory, clearHistory } = useSearchStore();

  if (history.length === 0) {
    return null;
  }

  return (
    <View className='px-4 py-3'>
      <View className='flex-row items-center justify-between mb-3'>
        <Text className='text-sm font-medium text-muted-foreground'>Recent searches</Text>
        <Pressable onPress={clearHistory}>
          <Text className='text-sm text-primary'>Clear all</Text>
        </Pressable>
      </View>

      <View className='space-y-1'>
        {history.map((item, index) => (
          <View 
            key={`${item}-${index}`}
            className='flex-row items-center py-2'
          >
            <Pressable 
              className='flex-1 flex-row items-center gap-3'
              onPress={() => onHistorySelect(item)}
            >
              <Clock size={16} className='text-muted-foreground' />
              <Text className='flex-1 text-foreground'>{item}</Text>
            </Pressable>
            
            <Pressable 
              onPress={() => removeFromHistory(item)}
              className='p-1'
            >
              <X size={16} className='text-muted-foreground' />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}