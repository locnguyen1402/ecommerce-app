import React from 'react';
import { View } from 'react-native';

import { useCategories } from '~/lib/hooks/useApi';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoriesChange }: CategoryFilterProps) {
  const { data: categoriesData = [], isLoading } = useCategories();

  // Handle both string[] and object[] formats
  const categories = Array.isArray(categoriesData) 
    ? categoriesData.map(item => 
        typeof item === 'string' ? item : (item as any).name || (item as any).slug || String(item)
      )
    : [];

  const toggleCategory = (category: string) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text className='text-lg font-medium mb-4'>Categories</Text>
        <Text className='text-muted-foreground'>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text className='text-lg font-medium mb-4'>Categories</Text>
      <View className='flex-row flex-wrap gap-2'>
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'ghost'}
              size="sm"
              onPress={() => toggleCategory(category)}
              className='mb-2'
            >
              <Text className={`text-sm capitalize ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                {category.replace(/[-_]/g, ' ')}
              </Text>
            </Button>
          );
        })}
      </View>
    </View>
  );
}