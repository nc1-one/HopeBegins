import Link from 'next/link';
import { format, subDays } from 'date-fns';
import { Download, Loader2 } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { LANGUAGE_FILTERS, type LanguageFilter } from '@/lib/clickLanguages';

const PRESETS = [7, 30, 90].map((days) => ({
  label: `${days} days`,
  days,
}));

const day = (date: Date) => format(date, 'yyyy-MM-dd');

/**
 * Dates and language for the whole dashboard, and the PDF of the same.
 * Stays at the top while scrolling, except on phones, where it would fill
 * too much of the screen.
 */
export function Controls({
  dateRange,
  handleDateChange,
  language,
  setLanguage,
  isUpdating,
}: {
  dateRange: { startDate: string; endDate: string };
  handleDateChange: (start: string, end: string) => void;
  language: LanguageFilter;
  setLanguage: (language: LanguageFilter) => void;
  isUpdating: boolean;
}) {
  const today = day(new Date());
  const report = new URLSearchParams({
    start: dateRange.startDate,
    end: dateRange.endDate,
    ...(language !== 'all' && { lang: language }),
    print: '1',
  });

  return (
    <div className="z-20 md:sticky md:top-0 -mx-4 border-b border-zinc-200 bg-zinc-50/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 dark:border-zinc-800 dark:bg-zinc-950/95 print:hidden">
      <div className="flex flex-wrap items-center gap-3">
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={handleDateChange}
        />
        <div
          role="group"
          aria-label="Quick dates"
          className="flex gap-1 rounded-2xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900"
        >
          {PRESETS.map((preset) => {
            const start = day(subDays(new Date(), preset.days));
            const active =
              dateRange.startDate === start && dateRange.endDate === today;
            return (
              <button
                key={preset.days}
                type="button"
                aria-pressed={active}
                onClick={() => handleDateChange(start, today)}
                className={`rounded-xl px-3 py-2 text-sm font-bold ${active ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'}`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <label className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-bold dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-zinc-500">Language</span>
          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as LanguageFilter)
            }
            className="bg-transparent font-bold outline-none"
          >
            {LANGUAGE_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {isUpdating && (
          <span
            role="status"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500"
          >
            <Loader2 className="h-4 w-4 animate-spin" /> Updating
          </span>
        )}
        <Link
          href={`/admin/dashboard/report?${report}`}
          className="ml-auto inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-brand px-5 font-bold text-brand-foreground transition-opacity hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          PDF report
        </Link>
      </div>
    </div>
  );
}
