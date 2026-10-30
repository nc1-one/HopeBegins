'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { format, isValid, parseISO } from 'date-fns';
import { ArrowLeft, Download } from 'lucide-react';
import headerLogo from '@/assets/images/header-logo.png';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { adminService } from '@/services/adminService';
import { useUserStore } from '@/store/useUserStore';
import type { CategoryCount, DateCount } from '@/types/admin';
import { PRAYER_CATEGORY_LABELS } from '../components/DashboardCharts';
import { JourneyByStage } from '../components/JourneyByStage';
import { ByLanguage } from '../components/ByLanguage';
import { defaultDateRange, useDashboard } from '../hooks/useDashboard';

/*
 * The dashboard as a report to keep or send: every number for the chosen
 * dates, laid out for A4, saved as a PDF through the browser's print
 * dialog. Counts only: no names, emails, messages or prayer requests.
 */

const DAY = /^\d{4}-\d{2}-\d{2}$/;

const isDay = (value: string | null): value is string =>
  !!value && DAY.test(value) && isValid(parseISO(value));

const longDate = (day: string) => format(parseISO(day), 'd MMMM yyyy');

const number = (value: number | undefined) =>
  value === undefined ? '–' : value.toLocaleString();

const sumWhere = (
  totals: Record<string, number>,
  test: (name: string) => boolean
) =>
  Object.entries(totals).reduce(
    (total, [name, count]) => (test(name) ? total + count : total),
    0
  );

const h2Class =
  'font-playfair text-2xl text-[#6E5F47] leading-none tracking-[-0.03em]';

function KeyNumbers({
  items,
}: {
  items: { label: string; value: number | undefined; note?: string }[];
}) {
  return (
    <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 print:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="report-block border-t border-[#E2DFDA] pt-2"
        >
          <dt className="text-xs text-[#6E5F47]/80">{item.label}</dt>
          <dd className="font-playfair text-3xl text-[#6E5F47] tabular-nums leading-tight">
            {number(item.value)}
          </dd>
          {item.note && (
            <dd className="text-xs text-[#6E5F47]/80">{item.note}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}

/** A count per row, with a bar showing its share of the total. */
function CountTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; count: number }[];
}) {
  const total = rows.reduce((all, row) => all + row.count, 0);
  return (
    <div className="report-block">
      <h3 className="font-poppins text-sm font-semibold text-[#6E5F47]">
        {title}
      </h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-[#6E5F47]/80">None in these dates.</p>
      ) : (
        <table className="mt-2 w-full text-sm text-[#6E5F47]">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[#EEF1E8]">
                <td className="py-1.5 pr-3">{row.label}</td>
                <td className="w-40 py-1.5 pr-3">
                  <span className="block h-2 rounded-full bg-[#EFF3E7]">
                    <span
                      className="block h-2 rounded-full bg-[#AEC488]"
                      style={{
                        width: `${total ? (row.count / total) * 100 : 0}%`,
                      }}
                    />
                  </span>
                </td>
                <td className="w-16 py-1.5 text-right tabular-nums">
                  {row.count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/** One bar per day, for counts that change day to day. */
function DayBars({ title, days }: { title: string; days: DateCount[] }) {
  const peak = Math.max(0, ...days.map((day) => day.count));
  const max = Math.max(1, peak);
  const width = 680;
  const height = 120;
  const gap = days.length > 40 ? 1 : 2;
  const barWidth = days.length ? width / days.length - gap : 0;
  const total = days.reduce((all, day) => all + day.count, 0);
  return (
    <div className="report-block">
      <h3 className="font-poppins text-sm font-semibold text-[#6E5F47]">
        {title}{' '}
        <span className="font-normal text-[#6E5F47]/80">
          ({total.toLocaleString()} in total, most in one day{' '}
          {peak.toLocaleString()})
        </span>
      </h3>
      {days.length === 0 ? (
        <p className="mt-2 text-sm text-[#6E5F47]/80">None in these dates.</p>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="mt-2 h-auto w-full"
            role="img"
            aria-label={`${title}, by day`}
          >
            <line
              x1="0"
              x2={width}
              y1={height - 0.5}
              y2={height - 0.5}
              stroke="#E2DFDA"
            />
            {days.map((day, index) => {
              const barHeight = (day.count / max) * (height - 8);
              return (
                <rect
                  key={day.date}
                  x={index * (barWidth + gap)}
                  y={height - barHeight}
                  width={Math.max(barWidth, 1)}
                  height={barHeight}
                  rx={1.5}
                  fill="#AEC488"
                />
              );
            })}
          </svg>
          <div className="mt-1 flex justify-between text-xs text-[#6E5F47]/80">
            <span>{longDate(days[0].date)}</span>
            <span>{longDate(days[days.length - 1].date)}</span>
          </div>
        </>
      )}
    </div>
  );
}

export function AdminReport() {
  const params = useSearchParams();
  const start = params.get('start');
  const end = params.get('end');
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
    isClicksLoading,
    dateRange,
    handleDateChange,
    isLoading,
    isError,
  } = useDashboard(
    isDay(start) && isDay(end) && start <= end
      ? { startDate: start, endDate: end }
      : defaultDateRange()
  );

  // Financials are for the super admin only, as on the Financials page.
  const { data: donations, isFetched: donationsFetched } = useQuery({
    queryKey: ['admin', 'donations', 'overview'],
    queryFn: () => adminService.getDonationOverview(),
    enabled: isSuperAdmin,
  });

  // The saved PDF is named after the page title. Next sets the title from
  // the site metadata, so it is swapped in only while printing.
  const fileName = `HopeBegins report ${dateRange.startDate} to ${dateRange.endDate}`;
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

  // Opened from "Download PDF report": print once everything has loaded
  // and the charts have drawn.
  const ready =
    !!stats &&
    !!analytics &&
    !!clicks &&
    !isLoading &&
    !isClicksLoading &&
    (!isSuperAdmin || donationsFetched);
  const printed = useRef(false);
  useEffect(() => {
    if (!wantsPrint || !ready || printed.current) return;
    printed.current = true;
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, [wantsPrint, ready]);

  const totals = clicks?.totals ?? {};
  const n = (name: string) => totals[name] ?? 0;

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
            Pick the dates, then download. In the window that opens, choose{' '}
            <b>Save as PDF</b> as the destination.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={handleDateChange}
          />
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
          className="mx-auto max-w-[783px] space-y-8 rounded-2xl bg-white p-6 text-[#6E5F47] shadow-sm sm:p-10 print:max-w-none print:rounded-none print:p-0 print:shadow-none"
        >
          <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E2DFDA] pb-5">
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
              </p>
            </div>
            <p className="text-right text-xs text-[#6E5F47]/80">
              Prepared {format(new Date(), 'd MMMM yyyy, h:mm a')}
              <br />
              by {preparedBy}
            </p>
          </header>

          <p className="rounded-xl bg-[#EFF3E7] px-4 py-3 text-sm">
            Counts only, from anonymous events and totals. This report has no
            names, emails, messages or prayer requests. For the HopeBegins team;
            please don&apos;t share it publicly.
          </p>

          <section aria-labelledby="period-title">
            <h2 id="period-title" className={h2Class}>
              In these dates
            </h2>
            <KeyNumbers
              items={[
                { label: 'Homepage visits', value: clicks && n('visit_home') },
                {
                  label: 'Feeling page visits',
                  value:
                    clicks &&
                    sumWhere(totals, (name) =>
                      name.startsWith('visit_feeling_')
                    ),
                },
                { label: 'Plans made', value: clicks && n('plan_done') },
                {
                  label: 'E-coach taps',
                  value:
                    clicks &&
                    sumWhere(totals, (name) => name.startsWith('ecoach_')),
                },
                {
                  label: 'Prayer requests',
                  value: analytics?.summary.total_prayers,
                },
                {
                  label: 'HopeCast plays',
                  value: analytics?.summary.total_plays,
                },
                {
                  label: 'New Daily Hope sign-ups',
                  value: analytics?.summary.total_new_subscribers,
                },
                {
                  label: 'Hopeful Beginning finished',
                  value: analytics?.summary.total_completions,
                },
              ]}
            />
          </section>

          <section aria-labelledby="alltime-title">
            <h2 id="alltime-title" className={h2Class}>
              All time
            </h2>
            <KeyNumbers
              items={[
                {
                  label: 'Prayer requests',
                  value: stats?.total_prayers,
                  note:
                    stats &&
                    `${stats.pending_prayers.toLocaleString()} pending`,
                },
                {
                  label: 'Active Hope Carriers',
                  value: stats?.total_carriers,
                },
                { label: 'Carrier accounts', value: stats?.total_users },
                { label: 'HopeCast plays', value: stats?.hopecast_plays },
                {
                  label: 'Hopeful Beginning finished',
                  value: stats?.journey_completions,
                },
                {
                  label: 'Crisis line taps',
                  value: clicks && clicks.all_time['header_crisis_call'],
                  note: 'the "Crisis? 1553" button',
                },
              ]}
            />
          </section>

          {analytics && (
            <section aria-labelledby="detail-title" className="space-y-6">
              <h2 id="detail-title" className={h2Class}>
                Prayer, HopeCasts and Daily Hope
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2">
                <CountTable
                  title="Prayer requests by topic"
                  rows={analytics.prayers_by_category.map(
                    (item: CategoryCount) => ({
                      label:
                        PRAYER_CATEGORY_LABELS[item.category || ''] ||
                        item.category ||
                        'Other',
                      count: item.count,
                    })
                  )}
                />
                <CountTable
                  title="HopeCast plays by category"
                  rows={analytics.plays_by_category.map(
                    (item: CategoryCount) => ({
                      label: item.name || item.category || 'Other',
                      count: item.count,
                    })
                  )}
                />
              </div>
              <DayBars
                title="New Daily Hope sign-ups by day"
                days={analytics.subscribers_trend}
              />
            </section>
          )}

          {isSuperAdmin && donations && (
            <section aria-labelledby="donations-title">
              <h2 id="donations-title" className={h2Class}>
                Donations
              </h2>
              <p className="mt-1 text-xs text-[#6E5F47]/80">
                All time, from the Financials page.
              </p>
              <KeyNumbers
                items={[
                  {
                    label: 'Total raised (₱)',
                    value: donations.totalRaised,
                  },
                  { label: 'Donors', value: donations.totalDonors },
                  {
                    label: 'Monthly gifts (₱ a month)',
                    value: donations.monthlyTotal,
                  },
                  {
                    label: 'Average gift (₱)',
                    value: Math.round(donations.avgDonation),
                  },
                ]}
              />
            </section>
          )}

          <section className="report-journey">
            <JourneyByStage clicks={clicks} isLoading={isClicksLoading} />
          </section>

          <section className="report-journey">
            <ByLanguage clicks={rawClicks} isLoading={isClicksLoading} />
          </section>

          <footer className="border-t border-[#E2DFDA] pt-4 text-xs text-[#6E5F47]/80">
            HopeBegins · hopebegins.today · Report for{' '}
            {longDate(dateRange.startDate)} to {longDate(dateRange.endDate)}
          </footer>
        </article>
      )}
    </div>
  );
}
