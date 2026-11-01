import { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/adminService';
import { subDays, format } from 'date-fns';
import {
  clicksIn,
  totalsByLanguage,
  type LanguageFilter,
} from '@/lib/clickLanguages';

/** The last 30 days, as yyyy-MM-dd. */
export const defaultDateRange = () => ({
  startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
});

// Counts change slowly: no refetch on every tab switch, and the old numbers
// stay on screen while new dates or a new language load.
const SLOW = { staleTime: 60_000, placeholderData: keepPreviousData };

export function useDashboard(initial?: {
  startDate: string;
  endDate: string;
  language?: LanguageFilter;
}) {
  const [dateRange, setDateRange] = useState(() =>
    initial
      ? { startDate: initial.startDate, endDate: initial.endDate }
      : defaultDateRange()
  );
  // One language, or all of them, for the whole dashboard.
  const [language, setLanguage] = useState<LanguageFilter>(
    initial?.language ?? 'all'
  );

  const statsQuery = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getStats(),
    staleTime: 60_000,
  });

  const analyticsQuery = useQuery({
    queryKey: ['admin', 'analytics', dateRange, language],
    queryFn: () =>
      adminService.getAnalytics(
        dateRange.startDate,
        dateRange.endDate,
        language === 'all' ? undefined : language
      ),
    ...SLOW,
  });

  const clicksQuery = useQuery({
    queryKey: ['admin', 'clicks', dateRange],
    queryFn: () =>
      adminService.getClickAnalytics(dateRange.startDate, dateRange.endDate),
    ...SLOW,
  });

  const rawClicks = clicksQuery.data;
  // The picked language's counts, and every language's side by side.
  const clicks = useMemo(
    () => rawClicks && clicksIn(rawClicks, language),
    [rawClicks, language]
  );
  const byLanguage = useMemo(
    () => rawClicks && totalsByLanguage(rawClicks.totals),
    [rawClicks]
  );

  const handleDateChange = (start: string, end: string) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return {
    stats: statsQuery.data,
    analytics: analyticsQuery.data,
    clicks,
    rawClicks,
    byLanguage,
    language,
    setLanguage,
    dateRange,
    handleDateChange,
    isStatsLoading: statsQuery.isLoading,
    isAnalyticsLoading: analyticsQuery.isLoading,
    isClicksLoading: clicksQuery.isLoading,
    /** New dates or a language are loading over the numbers on screen. */
    isUpdating:
      (analyticsQuery.isFetching && analyticsQuery.isPlaceholderData) ||
      (clicksQuery.isFetching && clicksQuery.isPlaceholderData),
    isError:
      statsQuery.isError || analyticsQuery.isError || clicksQuery.isError,
    refetch: () => {
      statsQuery.refetch();
      analyticsQuery.refetch();
      clicksQuery.refetch();
    },
  };
}
