import currency from 'currency.js';
import { getLocales, getCurrencies } from 'react-native-localize';

// Get device locale and currency settings
const deviceLocales = getLocales();
const deviceCurrencies = getCurrencies();
const deviceLocale = deviceLocales[0];
const deviceCurrency = deviceCurrencies[0];

// Currency configuration mapping
const CURRENCY_CONFIG = {
  USD: {
    symbol: '$',
    precision: 2,
    separator: ',',
    decimal: '.',
    pattern: '!#',
    code: 'USD',
    name: 'US Dollar',
  },
  VND: {
    symbol: '₫',
    precision: 0,
    separator: '.',
    decimal: ',',
    pattern: '# !',
    code: 'VND',
    name: 'Vietnamese Dong',
  },
  EUR: {
    symbol: '€',
    precision: 2,
    separator: '.',
    decimal: ',',
    pattern: '# !',
    code: 'EUR',
    name: 'Euro',
  },
  GBP: {
    symbol: '£',
    precision: 2,
    separator: ',',
    decimal: '.',
    pattern: '!#',
    code: 'GBP',
    name: 'British Pound',
  },
  JPY: {
    symbol: '¥',
    precision: 0,
    separator: ',',
    decimal: '.',
    pattern: '!#',
    code: 'JPY',
    name: 'Japanese Yen',
  },
};

// Default currency (fallback)
const DEFAULT_CURRENCY = 'USD';

// Get device currency or fallback to default
export const getDeviceCurrency = (): string => {
  if (deviceCurrency && Object.keys(CURRENCY_CONFIG).includes(deviceCurrency)) {
    return deviceCurrency;
  }
  return DEFAULT_CURRENCY;
};

// Get device locale for formatting
export const getDeviceLocale = (): string => {
  return deviceLocale?.languageTag || 'en-US';
};

// Format currency amount
export const formatCurrency = (
  amount: number,
  currencyCode: string = getDeviceCurrency(),
  options?: Partial<currency.Options>
): string => {
  const config = CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  
  const currencyOptions: currency.Options = {
    symbol: config.symbol,
    precision: config.precision,
    separator: config.separator,
    decimal: config.decimal,
    pattern: config.pattern,
    ...options,
  };

  return currency(amount, currencyOptions).format();
};

// Parse currency string to number
export const parseCurrency = (
  value: string,
  currencyCode: string = getDeviceCurrency()
): number => {
  const config = CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG] || CURRENCY_CONFIG[DEFAULT_CURRENCY];
  
  const currencyOptions: currency.Options = {
    symbol: config.symbol,
    precision: config.precision,
    separator: config.separator,
    decimal: config.decimal,
    pattern: config.pattern,
  };

  return currency(value, currencyOptions).value;
};

// Format currency with localization
export const formatCurrencyLocalized = (
  amount: number,
  currencyCode: string = getDeviceCurrency(),
  locale: string = getDeviceLocale()
): string => {
  try {
    // Use native Intl.NumberFormat for better localization
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG]?.precision || 2,
      maximumFractionDigits: CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG]?.precision || 2,
    });
    
    return formatter.format(amount);
  } catch (error) {
    // Fallback to custom formatting if Intl fails
    console.warn('Intl.NumberFormat failed, using fallback currency formatting:', error);
    return formatCurrency(amount, currencyCode);
  }
};

// Convert between currencies (mock implementation - in real app, use exchange rate API)
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates?: Record<string, number>
): number => {
  // Mock exchange rates (in production, fetch from API)
  const mockRates: Record<string, number> = {
    USD: 1,
    VND: 24000,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    ...exchangeRates,
  };

  if (fromCurrency === toCurrency) {
    return amount;
  }

  const fromRate = mockRates[fromCurrency] || 1;
  const toRate = mockRates[toCurrency] || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  const convertedAmount = usdAmount * toRate;
  
  return parseFloat(convertedAmount.toFixed(2));
};

// Get currency symbol
export const getCurrencySymbol = (currencyCode: string): string => {
  const config = CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG];
  return config?.symbol || '$';
};

// Get currency name
export const getCurrencyName = (currencyCode: string): string => {
  const config = CURRENCY_CONFIG[currencyCode as keyof typeof CURRENCY_CONFIG];
  return config?.name || 'Unknown Currency';
};

// Get available currencies
export const getAvailableCurrencies = () => {
  return Object.entries(CURRENCY_CONFIG).map(([code, config]) => ({
    code,
    name: config.name,
    symbol: config.symbol,
  }));
};

// Format price range
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currencyCode: string = getDeviceCurrency()
): string => {
  if (minPrice === maxPrice) {
    return formatCurrency(minPrice, currencyCode);
  }
  return `${formatCurrency(minPrice, currencyCode)} - ${formatCurrency(maxPrice, currencyCode)}`;
};

// Format discount percentage
export const formatDiscount = (originalPrice: number, salePrice: number): string => {
  if (originalPrice <= salePrice) {
    return '';
  }
  
  const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  return `${discountPercent}%`;
};

// Calculate savings amount
export const calculateSavings = (originalPrice: number, salePrice: number): number => {
  return Math.max(0, originalPrice - salePrice);
};

// Format savings amount
export const formatSavings = (
  originalPrice: number,
  salePrice: number,
  currencyCode: string = getDeviceCurrency()
): string => {
  const savings = calculateSavings(originalPrice, salePrice);
  if (savings <= 0) return '';
  
  return `Save ${formatCurrency(savings, currencyCode)}`;
};
