'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { format, isValid, parseISO } from 'date-fns';
import { ArrowLeft, Download } from 'lucide-react';
import headerLogo from '@/assets/images/header-logo.png';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  LANGUAGE_FILTERS,
  LANGUAGE_NAMES,
  isLanguageFilter,
  type LanguageFilter,
} from '@/lib/clickLanguages';
import { adminService } from '@/services/adminService';
import { useUserStore } from '@/store/useUserStore';
import { AtAGlance } from '../components/AtAGlance';
import { ByLanguage } from '../components/ByLanguage';
import { Journey } from '../components/Journey';
import { Tools } from '../components/Tools';
import { Pages } from '../components/Pages';
import { PrayerAndDailyHope } from '../components/PrayerAndDailyHope';
import { AllTime } from '../components/AllTime';
import { Tile } from '../components/parts';
import { defaultDateRange, useDashboard } from '../hooks/useDashboard';

/*
 * The dashboard as a report to keep or send: every number for the chosen
 * dates and language, laid out for A4, saved as a PDF through the browser's
 * print dialog. Counts only: no names, emails, messages or prayer requests.
 */

const DAY = /^\d{4}-\d{2}-\d{2}$/;

const isDay = (value: string | null): value is string =>
  !!value && DAY.test(value) && isValid(parseISO(value));

const longDate = (day: string) => format(parseISO(day), 'd MMMM yyyy');

function ReportSection({
  title,
  intro,
  newPage,
  children,
}: {
  title: string;
  intro?: string;
  /** Starts on a new page in the PDF. */
  newPage?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`space-y-4 ${newPage ? 'report-journey' : ''}`}>
      <div>
        <h2 className="font-playfair text-2xl leading-none tracking-[-0.03em] text-[#6E5F47]">
          {title}
        </h2>
        {intro && <p className="mt-1 text-xs text-[#6E5F47]/80">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export function AdminReport() {
  const params = useSearchParams();
  const start = params.get('start');
  const end = params.get('end');
  const lang = params.get('lang');
  const wantsPrint = params.get('print') === '1';
  const { user } = useUserStore();
  const admin = user as {
    role?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  } | null;
  const isSuperAdmin = admin?.role === 'admin';
  const preparedBy =
    [admin?.first_name, admin?.last_name].filter(Boolean).join(' ') ||
    admin?.email ||
    'an admin';

  const {
    stats,
    analytics,
    clicks,
    rawClicks,
    byLanguage,
    language,
    setLanguage,
    dateRange,
    handleDateChange,
    isStatsLoading,
    isAnalyticsLoading,
    isClicksLoading,
    isUpdating,
    isError,
  } = useDashboard({
    ...(isDay(start) && isDay(end) && start <= end
      ? { startDate: start, endDate: end }
      : defaultDateRange()),
    language: isLanguageFilter(lang) ? lang : 'all',
  });
  const languageName =
    language === 'all' ? 'Every language' : LANGUAGE_NAMES[language];

  // Financials are for the super admin only, as on the Financials page.
  const { data: donations, isFetched: donationsFetched } = useQuery({
    queryKey: ['admin', 'donations', 'overview'],
    queryFn: () => adminService.getDonationOverview(),
    enabled: isSuperAdmin,
  });

  // The saved PDF is named after the page title. Next sets the title from
  // the site metadata, so it is swapped in only while printing.
  const fileName = `HopeBegins report ${language === 'all' ? '' : `${LANGUAGE_NAMES[language]} `}${dateRange.startDate} to ${dateRange.endDate}`;
  useEffect(() => {
    let previous = document.title;
    const before = () => {
      previous = document.title;
      document.title = fileName;
    };
    const after = () => {
      document.title = previous;
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, [fileName]);

  // Opened from "PDF report": print once everything has loaded.
  const ready =
    !!stats &&
    !!analytics &&
    !!clicks &&
    !isStatsLoading &&
    !isAnalyticsLoading &&
    !isClicksLoading &&
    !isUpdating &&
    (!isSuperAdmin || donationsFetched);
  const printed = useRef(false);
  useEffect(() => {
    if (!wantsPrint || !ready || printed.current) return;
    printed.current = true;
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, [wantsPrint, ready]);

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-6 print:max-w-none print:p-0">
      {/* Controls: on screen only. */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between print:hidden">
        <div className="space-y-3">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </Link>
          <p className="max-w-md text-sm text-zinc-500">
            Pick the dates and language, then download. In the window that
            opens, choose <b>Save as PDF</b> as the destination.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateChange}
          />
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
          <button
            type="button"
            onClick={() => window.print()}
            disabled={!ready}
            className="inline-flex h-12 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-2xl bg-brand px-6 font-bold text-brand-foreground disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {ready ? 'Download PDF' : 'Loading…'}
          </button>
        </div>
      </div>

      {isError ? (
        <p className="text-sm font-medium text-zinc-500 print:hidden">
          The report couldn&apos;t load. Check your connection and try again.
        </p>
      ) : (
        // 783px is the A4 page's 186mm of content plus the padding, so the
        // charts are drawn at the size they print.
        <article
          id="admin-report"
          className="mx-auto max-w-[783px] space-y-10 rounded-2xl bg-white p-6 text-zinc-900 shadow-sm sm:p-10 print:max-w-none print:rounded-none print:p-0 print:shadow-none"
        >
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E2DFDA] pb-5 text-[#6E5F47]">
            <div>
              <Image
                src={headerLogo}
                alt="HopeBegins"
                width={150}
                height={55}
                style={{ height: 'auto' }}
              />
              <h1 className="mt-3 font-playfair text-4xl leading-none tracking-[-0.03em]">
                HopeBegins report
              </h1>
              <p className="mt-2 font-poppins text-base font-medium">
                {longDate(dateRange.startDate)} to {longDate(dateRange.endDate)}
                {' · '}
                {languageName}
              </p>
            </div>
            <p className="text-right text-xs text-[#6E5F47]/80">
              Prepared {format(new Date(), 'd MMMM yyyy, h:mm a')}
              <br />
              by {preparedBy}
            </p>
          </header>

          <p className="rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm text-[#6E5F47]">
            Counts only, from anonymous events and totals. This report has no
            names, emails, messages or prayer requests. For the HopeBegins team;
            please don&apos;t share it publicly.
          </p>

          <ReportSection title="At a glance" intro={languageName}>
            <AtAGlance
              clicks={clicks}
              analytics={analytics}
              startDate={dateRange.startDate}
            />
          </ReportSection>

          <ReportSection
            title="By language"
            intro="Every key number with each language side by side, by the language of the page it happened on."
            newPage
          >
            <ByLanguage
              clicks={rawClicks}
              byLanguage={byLanguage}
              analytics={analytics}
              language={language}
            />
          </ReportSection>

          <ReportSection
            title="The journey, stage by stage"
            intro={languageName}
            newPage
          >
            <Journey clicks={clicks} language={language} open />
          </ReportSection>

          <ReportSection title="Tools and games" intro={languageName} newPage>
            <Tools clicks={clicks} language={language} />
          </ReportSection>

          <ReportSection title="Pages and reaching out" intro={languageName}>
            <Pages clicks={clicks} language={language} />
          </ReportSection>

          <ReportSection
            title="Prayer, Daily Hope and HopeCasts"
            intro={
              language === 'all'
                ? undefined
                : `Prayer requests and Daily Hope for ${languageName}; HopeCasts and the five steps for every language.`
            }
            newPage
          >
            <PrayerAndDailyHope
              analytics={analytics}
              oneLanguage={language !== 'all'}
            />
          </ReportSection>

          {isSuperAdmin && donations && (
            <ReportSection
              title="Donations"
              intro="All time, from the Financials page."
            >
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 print:grid-cols-4">
                <Tile label="Total raised (₱)" value={donations.totalRaised} />
                <Tile label="Donors" value={donations.totalDonors} />
                <Tile
                  label="Monthly gifts (₱ a month)"
                  value={donations.monthlyTotal}
                />
                <Tile
                  label="Average gift (₱)"
                  value={Math.round(donations.avgDonation)}
                />
              </dl>
            </ReportSection>
          )}

          <ReportSection
            title="All time"
            intro="Since HopeBegins began, for every language, whatever the dates."
          >
            <AllTime
              stats={stats}
              analytics={analytics}
              rawClicks={rawClicks}
            />
          </ReportSection>

          <footer className="border-t border-[#E2DFDA] pt-4 text-xs text-[#6E5F47]/80">
            HopeBegins · hopebegins.today · Report for{' '}
            {longDate(dateRange.startDate)} to {longDate(dateRange.endDate)}
            {' · '}
            {languageName}
          </footer>
        </article>
      )}
    </div>
  );
}
