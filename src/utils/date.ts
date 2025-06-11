import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { getLocales } from 'react-native-localize';

// Import locales for dayjs
import 'dayjs/locale/en';
import 'dayjs/locale/vi';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(duration);

// Get device locale
const deviceLocale = getLocales()[0];
const languageCode = deviceLocale?.languageCode || 'en';

// Set global locale for dayjs
dayjs.locale(languageCode);

// Get device timezone
export const getDeviceTimezone = (): string => {
  return deviceLocale?.timeZone || dayjs.tz.guess();
};

// Format date for display
export const formatDate = (
  date: string | Date | dayjs.Dayjs,
  format: string = 'MMM DD, YYYY',
  timezone?: string
): string => {
  const tz = timezone || getDeviceTimezone();
  return dayjs(date).tz(tz).format(format);
};

// Format date with time
export const formatDateTime = (
  date: string | Date | dayjs.Dayjs,
  format: string = 'MMM DD, YYYY h:mm A',
  timezone?: string
): string => {
  const tz = timezone || getDeviceTimezone();
  return dayjs(date).tz(tz).format(format);
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: string | Date | dayjs.Dayjs): string => {
  return dayjs(date).fromNow();
};

// Format date for API (ISO string)
export const formatDateForAPI = (date: string | Date | dayjs.Dayjs): string => {
  return dayjs(date).toISOString();
};

// Check if date is today
export const isToday = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

// Check if date is yesterday
export const isYesterday = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
};

// Check if date is this week
export const isThisWeek = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'week');
};

// Check if date is this month
export const isThisMonth = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'month');
};

// Get smart date format (Today, Yesterday, or date)
export const getSmartDateFormat = (date: string | Date | dayjs.Dayjs): string => {
  const dateObj = dayjs(date);
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  
  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }
  
  if (isThisWeek(dateObj)) {
    return dateObj.format('dddd'); // Day name (e.g., "Monday")
  }
  
  if (isThisMonth(dateObj)) {
    return dateObj.format('MMM DD'); // Month and day (e.g., "Jan 15")
  }
  
  return dateObj.format('MMM DD, YYYY'); // Full date (e.g., "Jan 15, 2024")
};

// Format delivery date estimate
export const formatDeliveryDate = (
  orderDate: string | Date | dayjs.Dayjs,
  deliveryDays: number = 3
): string => {
  const estimatedDate = dayjs(orderDate).add(deliveryDays, 'day');
  
  if (deliveryDays <= 1) {
    return isToday(estimatedDate) ? 'Today' : 'Tomorrow';
  }
  
  return estimatedDate.format('MMM DD, YYYY');
};

// Calculate age from birthdate
export const calculateAge = (birthDate: string | Date | dayjs.Dayjs): number => {
  return dayjs().diff(dayjs(birthDate), 'year');
};

// Calculate duration between dates
export const calculateDuration = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs
): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = end.diff(start);
  const duration = dayjs.duration(diff);
  
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

// Get business days between dates (excluding weekends)
export const getBusinessDays = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs
): number => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  let businessDays = 0;
  let current = start;
  
  while (current.isBefore(end) || current.isSame(end, 'day')) {
    // 0 = Sunday, 6 = Saturday
    if (current.day() !== 0 && current.day() !== 6) {
      businessDays++;
    }
    current = current.add(1, 'day');
  }
  
  return businessDays;
};

// Format time remaining until date
export const formatTimeRemaining = (
  targetDate: string | Date | dayjs.Dayjs
): string => {
  const now = dayjs();
  const target = dayjs(targetDate);
  
  if (target.isBefore(now)) {
    return 'Expired';
  }
  
  const diff = target.diff(now);
  const duration = dayjs.duration(diff);
  
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  
  return `${seconds}s`;
};

// Get start and end of period
export const getPeriodBounds = (
  period: 'day' | 'week' | 'month' | 'year',
  date?: string | Date | dayjs.Dayjs
) => {
  const target = date ? dayjs(date) : dayjs();
  
  return {
    start: target.startOf(period),
    end: target.endOf(period),
  };
};

// Format date range
export const formatDateRange = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs,
  format: string = 'MMM DD'
): string => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  
  if (start.isSame(end, 'day')) {
    return start.format('MMM DD, YYYY');
  }
  
  if (start.isSame(end, 'month')) {
    return `${start.format(format)} - ${end.format('DD, YYYY')}`;
  }
  
  if (start.isSame(end, 'year')) {
    return `${start.format(format)} - ${end.format('MMM DD, YYYY')}`;
  }
  
  return `${start.format(`${format}, YYYY`)} - ${end.format('MMM DD, YYYY')}`;
};

// Validate date string
export const isValidDate = (date: string): boolean => {
  return dayjs(date).isValid();
};

// Get localized weekday names
export const getWeekdayNames = (format: 'short' | 'long' = 'short'): string[] => {
  const weekdays: string[] = [];
  const formatStr = format === 'short' ? 'dd' : 'dddd';
  
  for (let i = 0; i < 7; i++) {
    weekdays.push(dayjs().day(i).format(formatStr));
  }
  
  return weekdays;
};

// Get localized month names
export const getMonthNames = (format: 'short' | 'long' = 'long'): string[] => {
  const months: string[] = [];
  const formatStr = format === 'short' ? 'MMM' : 'MMMM';
  
  for (let i = 0; i < 12; i++) {
    months.push(dayjs().month(i).format(formatStr));
  }
  
  return months;
};
