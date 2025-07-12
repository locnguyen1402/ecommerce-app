import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const PRICE_SUGGESTIONS = [
  { label: '$0-$100', range: [0, 100] as [number, number] },
  { label: '$100-$300', range: [100, 300] as [number, number] },
  { label: '$300-$500', range: [300, 500] as [number, number] },
  { label: '$500+', range: [500, 999999] as [number, number] },
];

export function PriceRangeFilter({ priceRange, onPriceRangeChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = React.useState(priceRange[0].toString());
  const [maxPrice, setMaxPrice] = React.useState(priceRange[1] === 999999 ? '' : priceRange[1].toString());

  React.useEffect(() => {
    setMinPrice(priceRange[0].toString());
    setMaxPrice(priceRange[1] === 999999 ? '' : priceRange[1].toString());
  }, [priceRange]);

  const handlePriceChange = () => {
    const min = Math.max(0, parseInt(minPrice) || 0);
    const max = maxPrice ? parseInt(maxPrice) : 999999;
    if (min <= max) {
      onPriceRangeChange([min, max]);
    }
  };

  const handleSuggestionPress = (range: [number, number]) => {
    onPriceRangeChange(range);
  };

  const isCurrentRange = (range: [number, number]) => {
    return priceRange[0] === range[0] && priceRange[1] === range[1];
  };

  return (
    <View>
      <Text className='text-lg font-medium mb-4'>Price Range</Text>
      
      {/* Price Inputs */}
      <View className='flex-row gap-3 mb-4'>
        <View className='flex-1'>
          <Text className='text-sm text-muted-foreground mb-2'>Min Price</Text>
          <Input
            placeholder='0'
            value={minPrice}
            onChangeText={setMinPrice}
            onEndEditing={handlePriceChange}
            keyboardType='numeric'
            className='h-10'
          />
        </View>
        <View className='flex-1'>
          <Text className='text-sm text-muted-foreground mb-2'>Max Price</Text>
          <Input
            placeholder='No limit'
            value={maxPrice}
            onChangeText={setMaxPrice}
            onEndEditing={handlePriceChange}
            keyboardType='numeric'
            className='h-10'
          />
        </View>
      </View>

      {/* Price Suggestions */}
      <Text className='text-sm text-muted-foreground mb-3'>Quick Select</Text>
      <View className='flex-row flex-wrap gap-2'>
        {PRICE_SUGGESTIONS.map((suggestion) => {
          const isSelected = isCurrentRange(suggestion.range);
          return (
            <Button
              key={suggestion.label}
              variant={isSelected ? 'default' : 'ghost'}
              size="sm"
              onPress={() => handleSuggestionPress(suggestion.range)}
              className='mb-2'
            >
              <Text className={`text-sm ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                {suggestion.label}
              </Text>
            </Button>
          );
        })}
      </View>
    </View>
  );
}