'use client';

import Link from 'next/link';
import { AlertCircle, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useDashboard } from './hooks/useDashboard';
import { StatCards } from './components/StatCards';
import { DashboardCharts } from './components/DashboardCharts';
import { RecentPrayers } from './components/RecentPrayers';
import { JourneyByStage } from './components/JourneyByStage';
import { ByLanguage } from './components/ByLanguage';
import { LANGUAGE_FILTERS, type LanguageFilter } from '@/lib/clickLanguages';

export default function AdminDashboard() {
  const {
    stats,
    analytics,
    clicks,
    rawClicks,
    language,
    setLanguage,
    isClicksLoading,
    dateRange,
    handleDateChange,
    isLoading,
    isError,
    refetch,
  } = useDashboard();

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          Failed to load dashboard
        </h2>
        <p className="text-zinc-500 font-medium">
          Check your connection or try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-2 h-10 px-6 rounded-xl bg-brand text-brand-foreground font-bold"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-10 max-w-7xl mx-auto">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            The Hope Desk
          </h1>
          <p className="mt-2 text-zinc-500 font-medium text-sm">
            System-wide overview and live performance data.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateChange}
          />
          {/* The stage cards below, for one language or all of them. */}
          <label className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-bold dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-zinc-500">Stage details</span>
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
          {/* The same dates, as a PDF report. */}
          <Link
            href={`/admin/dashboard/report?start=${dateRange.startDate}&end=${dateRange.endDate}&print=1`}
            className="inline-flex h-12 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-2xl bg-brand px-6 font-bold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download PDF report
          </Link>
        </div>
      </header>

      {/* ── Stat Cards ── */}
      <StatCards stats={stats} isLoading={isLoading} />

      {/* ── Every stage and page, each language side by side, and countries ── */}
      <ByLanguage clicks={rawClicks} isLoading={isClicksLoading} />

      {/* ── The journey, stage by stage, for the language picked above ── */}
      <section className="space-y-4" aria-labelledby="stage-details-title">
        <div>
          <h2
            id="stage-details-title"
            className="text-2xl font-black italic tracking-tighter uppercase"
          >
            Stage details
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Showing:{' '}
            {LANGUAGE_FILTERS.find((option) => option.value === language)
              ?.label ?? 'All languages'}
            . Pick another language with Stage details at the top.
          </p>
        </div>
        <JourneyByStage clicks={clicks} isLoading={isClicksLoading} />
      </section>

      {/* ── Charts ── */}
      <DashboardCharts analytics={analytics} isLoading={isLoading} />

      {/* ── Recent Prayers ── */}
      <RecentPrayers prayers={stats?.recent_prayers} />
    </div>
  );
}
