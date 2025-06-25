import React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { SUPPORTED_LANGUAGES } from '~/lib/i18n/config';
import { useLanguage } from '~/lib/hooks/useLanguage';

interface LanguageSwitcherProps {
  variant?: 'button' | 'toggle';
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'button',
  showLabel = true,
}) => {
  const { t, language, changeLanguage, toggleLanguage, isLoading } =
    useLanguage();

  if (variant === 'toggle') {
    return (
      <Button
        variant="outline"
        onPress={toggleLanguage}
        disabled={isLoading}
        className="px-3 py-2"
      >
        <Text className="text-sm">
          {language === 'vi' ? '🇺🇸 EN' : '🇻🇳 VI'}
        </Text>
      </Button>
    );
  }

  return (
    <View className="gap-2">
      {showLabel && (
        <Text className="text-sm font-medium text-muted-foreground">
          {t('language.switchLanguage')}
        </Text>
      )}
      <View className="flex-row gap-2">
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <Button
            key={code}
            variant={language === code ? 'default' : 'outline'}
            onPress={() => changeLanguage(code as keyof typeof SUPPORTED_LANGUAGES)}
            disabled={isLoading}
            className="flex-1"
          >
            <Text className="text-sm">
              {code === 'vi' ? '🇻🇳' : '🇺🇸'} {name}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};