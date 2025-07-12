import React from 'react';
import { Pressable, View } from 'react-native';
import { Star } from 'lucide-react-native';

import { Text } from '~/components/ui/text';

interface RatingFilterProps {
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const RATING_OPTIONS = [
  { stars: 4, label: '4+ stars' },
  { stars: 3, label: '3+ stars' },
  { stars: 2, label: '2+ stars' },
  { stars: 1, label: '1+ stars' },
];

export function RatingFilter({ minRating, onRatingChange }: RatingFilterProps) {
  const renderStars = (rating: number, filled: number) => {
    return (
      <View className='flex-row gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-500' : 'text-muted-foreground'}
            fill={star <= rating ? '#EAB308' : 'transparent'}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      <Text className='text-lg font-medium mb-4'>Minimum Rating</Text>
      
      <View className='space-y-3'>
        {/* Clear rating option */}
        <Pressable
          onPress={() => onRatingChange(0)}
          className={`flex-row items-center justify-between p-3 rounded border ${
            minRating === 0 ? 'border-primary bg-primary/5' : 'border-border'
          }`}
        >
          <Text className={minRating === 0 ? 'text-primary font-medium' : 'text-foreground'}>
            Any rating
          </Text>
          {minRating === 0 && (
            <View className='w-4 h-4 rounded-full bg-primary items-center justify-center'>
              <View className='w-2 h-2 rounded-full bg-background' />
            </View>
          )}
        </Pressable>

        {/* Rating options */}
        {RATING_OPTIONS.map((option) => (
          <Pressable
            key={option.stars}
            onPress={() => onRatingChange(option.stars)}
            className={`flex-row items-center justify-between p-3 rounded border ${
              minRating === option.stars ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <View className='flex-row items-center gap-3'>
              {renderStars(option.stars, option.stars)}
              <Text className={minRating === option.stars ? 'text-primary font-medium' : 'text-foreground'}>
                {option.label}
              </Text>
            </View>
            {minRating === option.stars && (
              <View className='w-4 h-4 rounded-full bg-primary items-center justify-center'>
                <View className='w-2 h-2 rounded-full bg-background' />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}