import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { subDays, format } from 'date-fns';
import { clicksIn, type LanguageFilter } from '@/lib/clickLanguages';

/** The last 30 days, as yyyy-MM-dd. */
export const defaultDateRange = () => ({
  startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
});

export function useDashboard(initialRange?: {
  startDate: string;
  endDate: string;
}) {
  const [dateRange, setDateRange] = useState(
    () => initialRange ?? defaultDateRange()
  );

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getStats(),
  });

  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    refetch: refetchAnalytics,
  } = useQuery({
    queryKey: ['admin', 'analytics', dateRange],
    queryFn: () =>
      adminService.getAnalytics(dateRange.startDate, dateRange.endDate),
  });

  // One language, or all of them, under plain event names.
  const [language, setLanguage] = useState<LanguageFilter>('all');
  const {
    data: rawClicks,
    isLoading: isClicksLoading,
    refetch: refetchClicks,
  } = useQuery({
    queryKey: ['admin', 'clicks', dateRange],
    queryFn: () =>
      adminService.getClickAnalytics(dateRange.startDate, dateRange.endDate),
  });

  const clicks = useMemo(
    () => rawClicks && clicksIn(rawClicks, language),
    [rawClicks, language]
  );

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return {
    stats,
    analytics,
    clicks,
    rawClicks,
    language,
    setLanguage,
    isClicksLoading,
    dateRange,
    handleDateChange,
    isLoading: isStatsLoading || isAnalyticsLoading,
    isError: isStatsError || isAnalyticsError,
    refetch: () => {
      refetchStats();
      refetchAnalytics();
      refetchClicks();
    },
  };
}
