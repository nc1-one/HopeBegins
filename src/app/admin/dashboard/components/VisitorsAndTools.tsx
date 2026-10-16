'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { feelingPages } from '@/lib/feelingPages';
import type { ClickAnalytics } from '@/types/admin';

/**
 * Visits and tool use from the site's anonymous counters. No cookies or
 * personal details are behind these numbers: a visit is counted once per
 * browser session, and each tool counts when it is started and finished.
 */

const MENU_LABELS: Record<string, string> = {
  anxious: 'I feel anxious',
  tired: "I'm tired of everything",
  alone: 'I feel alone',
  sleep: "I can't sleep from overthinking",
  hopeless: "I don't have hope",
  unsure: "I'm not sure what I feel",
};

const FEELING_LABELS = Object.fromEntries(
  feelingPages.map((page) => [page.slug, page.label])
);

const titleClass = 'text-xl font-black italic tracking-tighter uppercase';
const cardClass = 'border-none shadow-2xl bg-white dark:bg-zinc-900 p-6';

function sumWhere(
  counts: Record<string, number>,
  test: (name: string) => boolean
) {
  return Object.entries(counts)
    .filter(([name]) => test(name))
    .reduce((total, [, count]) => total + count, 0);
}

function Bars({ rows }: { rows: { label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  if (rows.every((row) => row.count === 0)) {
    return (
      <p className="text-sm text-zinc-500">Nothing yet for these dates.</p>
    );
  }
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex justify-between gap-4 text-sm font-medium">
            <span>{row.label}</span>
            <span className="font-bold tabular-nums">
              {row.count.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-2 rounded-full bg-[#6b8f5e]"
              style={{ width: `${(row.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Table({
  rows,
  columns,
}: {
  rows: { label: string; values: (number | string)[] }[];
  columns: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
            {columns.map((column, i) => (
              <th
                key={column}
                className={`pb-2 font-bold ${i > 0 ? 'text-right' : ''}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-t border-zinc-100 dark:border-zinc-800"
            >
              <td className="py-2 pr-4 font-medium">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className="py-2 text-right font-bold tabular-nums">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VisitorsAndTools({
  clicks,
  isLoading,
}: {
  clicks: ClickAnalytics | undefined;
  isLoading: boolean;
}) {
  if (!isLoading && !clicks) {
    return (
      <p className="text-sm font-medium text-zinc-500">
        Couldn&apos;t load visitor and tool counts. Try refreshing.
      </p>
    );
  }
  if (isLoading || !clicks) {
    return (
      <div className="h-[240px] w-full rounded-xl bg-zinc-50 dark:bg-zinc-800/20 animate-pulse" />
    );
  }

  const t = clicks.totals;
  const n = (name: string) => t[name] ?? 0;
  const homeVisits = n('visit_home');
  const thatsMe = n('looking_for_hope');
  const feelingVisits = sumWhere(t, (name) =>
    name.startsWith('visit_feeling_')
  );

  // One point per day in the range, including days with no visits.
  const homeByDay = new Map(
    clicks.daily
      .filter((row) => row.link_name === 'visit_home')
      .map((row) => [row.date, row.count])
  );
  const trend: { name: string; visits: number }[] = [];
  const end = new Date(`${clicks.date_range.end_date}T00:00:00`);
  for (
    let day = new Date(`${clicks.date_range.start_date}T00:00:00`);
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    trend.push({ name: key, visits: homeByDay.get(key) ?? 0 });
  }

  const tiles = [
    {
      label: 'Homepage visits',
      value: homeVisits,
      note: 'Once per browser session',
    },
    {
      label: 'Tapped "That\'s me"',
      value: thatsMe,
      note: homeVisits
        ? `${Math.round((thatsMe / homeVisits) * 100)}% of homepage visits`
        : 'Opened the menu',
    },
    {
      label: 'Feeling page visits',
      value: feelingVisits,
      note: 'Mostly from Google and shared links',
    },
    {
      label: 'Plan page visits',
      value: n('visit_action_plan'),
      note: `${n('plan_done').toLocaleString()} finished the check-in`,
    },
  ];

  const tools = [
    {
      label: 'Slow breathing',
      values: [n('tool_breathe_start'), n('tool_breathe_done')],
    },
    {
      label: '5-4-3-2-1 grounding',
      values: [n('tool_ground_start'), n('tool_ground_done')],
    },
    {
      label: 'Message to someone (copied)',
      values: [n('tool_message_copy'), '–'],
    },
    { label: 'Worry note (set aside)', values: [n('tool_worry_note'), '–'] },
    {
      label: 'Calm down, from the menu',
      values: [n('menu_calm_breathe') + n('menu_calm_ground'), '–'],
    },
  ];

  const plan = [
    { label: 'Visited the plan page', values: [n('visit_action_plan')] },
    { label: 'Started the check-in', values: [n('plan_start')] },
    { label: 'Finished it and got a plan', values: [n('plan_done')] },
    { label: 'Tried a tool on the plan', values: [n('plan_tool_try')] },
    { label: 'Added a tool to their 4 weeks', values: [n('plan_tool_add')] },
    { label: 'Ticked "Done today"', values: [n('plan_today_done')] },
    {
      label: 'Added a phone reminder',
      values: [n('plan_reminder_google') + n('plan_reminder_ics')],
    },
    { label: 'Asked for a check-in email', values: [n('plan_check_in')] },
    { label: 'Emailed their plan', values: [n('plan_email')] },
    {
      label: 'Took the weekly check-in again',
      values: [n('plan_check_in_again')],
    },
    { label: 'Downloaded a backup', values: [n('plan_backup_download')] },
    { label: 'Finished the 4 weeks', values: [n('plan_finish_start')] },
    { label: 'Made a Hope Card', values: [n('plan_hope_card_made')] },
    { label: 'Took a monthly check-in', values: [n('plan_monthly_start')] },
    {
      label: 'Monthly result: coming back or safety',
      values: [
        n('plan_monthly_result_returning') + n('plan_monthly_result_safety'),
      ],
    },
  ];

  const reachOut = [
    {
      label: 'Tapped an e-coach link',
      values: [sumWhere(t, (name) => name.startsWith('ecoach_'))],
    },
    {
      label: 'Tapped "Crisis? 1553" in the header',
      values: [n('header_crisis_call')],
    },
    { label: 'Opened Prayer War Room', values: [n('war_room')] },
  ];

  const allNames = Array.from(
    new Set([...Object.keys(clicks.all_time), ...Object.keys(t)])
  ).sort();

  return (
    <section className="space-y-6" aria-labelledby="visitors-title">
      <div>
        <h2
          id="visitors-title"
          className="text-2xl font-black italic tracking-tighter uppercase"
        >
          Visitors and tool use
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Counted without cookies or personal details. Visits count once per
          browser session.
          {clicks.tracked_since &&
            ` Dated counts start ${clicks.tracked_since}; earlier events show only under All time.`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.label} className={cardClass}>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {tile.label}
            </p>
            <p className="mt-2 text-4xl font-black tabular-nums">
              {tile.value.toLocaleString()}
            </p>
            <p className="mt-1 text-xs font-medium text-zinc-500">
              {tile.note}
            </p>
          </Card>
        ))}
      </div>

      <Card className={cardClass}>
        <CardHeader className="px-0 pt-0 pb-6">
          <CardTitle className={titleClass}>Homepage visits by day</CardTitle>
        </CardHeader>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b8f5e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6b8f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: '#888' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#6b8f5e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVisits)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className={cardClass}>
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className={titleClass}>Tools people used</CardTitle>
          </CardHeader>
          <Table rows={tools} columns={['Tool', 'Started', 'Finished']} />
        </Card>

        <Card className={cardClass}>
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className={titleClass}>Reaching out</CardTitle>
          </CardHeader>
          <Table rows={reachOut} columns={['Action', 'Taps']} />
        </Card>

        <Card className={cardClass}>
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className={titleClass}>
              What people chose on the menu
            </CardTitle>
          </CardHeader>
          <Bars
            rows={Object.entries(MENU_LABELS).map(([id, label]) => ({
              label,
              count: n(`menu_feeling_${id}`),
            }))}
          />
        </Card>

        <Card className={cardClass}>
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className={titleClass}>Feeling page visits</CardTitle>
          </CardHeader>
          <Bars
            rows={feelingPages.map((page) => ({
              label: FEELING_LABELS[page.slug],
              count: n(`visit_feeling_${page.slug}`),
            }))}
          />
        </Card>
      </div>

      <Card className={cardClass}>
        <CardHeader className="px-0 pt-0 pb-4">
          <CardTitle className={titleClass}>
            The plan, start to finish
          </CardTitle>
        </CardHeader>
        <Table rows={plan} columns={['Step', 'People']} />
      </Card>

      <Card className={cardClass}>
        <details>
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-wider">
            All events
          </summary>
          <div className="mt-4">
            <Table
              rows={allNames.map((name) => ({
                label: name,
                values: [t[name] ?? 0, clicks.all_time[name] ?? 0],
              }))}
              columns={['Event', 'These dates', 'All time']}
            />
          </div>
        </details>
      </Card>
    </section>
  );
}
