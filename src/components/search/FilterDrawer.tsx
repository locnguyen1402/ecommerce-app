import React from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { X } from 'lucide-react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { RatingFilter } from './RatingFilter';

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  };
  onApplyFilters: (filters: {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
  }) => void;
  onResetFilters: () => void;
}

export function FilterDrawer({
  visible,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = React.useState(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 1000] as [number, number],
      minRating: 0,
    };
    setLocalFilters(resetFilters);
    onResetFilters();
    onClose();
  };

  const updateCategories = (categories: string[]) => {
    setLocalFilters(prev => ({ ...prev, categories }));
  };

  const updatePriceRange = (priceRange: [number, number]) => {
    setLocalFilters(prev => ({ ...prev, priceRange }));
  };

  const updateRating = (minRating: number) => {
    setLocalFilters(prev => ({ ...prev, minRating }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View className='flex-1 bg-background'>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 py-4 border-b border-border'>
          <Text className='text-xl font-semibold'>Filters</Text>
          <Button variant="ghost" size="sm" onPress={onClose}>
            <X size={20} className='text-foreground' />
          </Button>
        </View>

        {/* Filter Content */}
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
          <View className='p-4 space-y-6'>
            {/* Categories */}
            <CategoryFilter
              selectedCategories={localFilters.categories}
              onCategoriesChange={updateCategories}
            />

            {/* Price Range */}
            <PriceRangeFilter
              priceRange={localFilters.priceRange}
              onPriceRangeChange={updatePriceRange}
            />

            {/* Rating */}
            <RatingFilter
              minRating={localFilters.minRating}
              onRatingChange={updateRating}
            />
          </View>
        </ScrollView>

        {/* Actions */}
        <View className='px-4 py-4 border-t border-border'>
          <View className='flex-row gap-3'>
            <Button 
              variant="ghost" 
              className='flex-1' 
              onPress={handleReset}
            >
              <Text>Reset</Text>
            </Button>
            <Button 
              className='flex-1' 
              onPress={handleApply}
            >
              <Text className='text-primary-foreground font-medium'>Apply Filters</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}