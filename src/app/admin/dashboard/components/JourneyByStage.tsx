'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { feelingPages } from '@/lib/feelingPages';
import type { ClickAnalytics } from '@/types/admin';

/**
 * The visitor journey, stage by stage, from the site's anonymous counters.
 * No cookies or personal details are behind these numbers: a visit counts
 * once per browser session, and each tool counts where it was used.
 */

const MENU_LABELS: Record<string, string> = {
  anxious: 'I feel anxious',
  tired: "I'm tired of everything",
  alone: 'I feel alone',
  sleep: "I can't sleep from overthinking",
  hopeless: "I don't have hope",
  unsure: "I'm not sure what I feel",
};

const OTHER_PAGES: [string, string][] = [
  ['prayers', 'Prayers'],
  ['hope_ai', 'Hope AI'],
  ['hopecasts', 'HopeCasts'],
  ['daily_hope', 'Daily Hope'],
  ['give_hope', 'Give Hope'],
];

const cardClass = 'border-none shadow-2xl bg-white dark:bg-zinc-900 p-6';

type Row = { label: string; values: (number | string)[] };

function sumWhere(
  counts: Record<string, number>,
  test: (name: string) => boolean
) {
  return Object.entries(counts)
    .filter(([name]) => test(name))
    .reduce((total, [, count]) => total + count, 0);
}

const percent = (part: number, whole: number) =>
  whole ? `${Math.round((part / whole) * 100)}%` : '–';

function Table({ rows, columns }: { rows: Row[]; columns: string[] }) {
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
                <td
                  key={i}
                  className="py-2 pl-3 text-right font-bold tabular-nums"
                >
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

function Bars({ rows }: { rows: { label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
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

function StageCard({
  stage,
  title,
  question,
  children,
}: {
  stage: number;
  title: string;
  question: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={cardClass}>
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Stage {stage}
      </p>
      <h3 className="mt-1 text-xl font-black italic tracking-tighter uppercase">
        {title}
      </h3>
      <p className="mt-1 text-sm font-medium text-zinc-500">{question}</p>
      <div className="mt-5 space-y-6">{children}</div>
    </Card>
  );
}

export function JourneyByStage({
  clicks,
  isLoading,
}: {
  clicks: ClickAnalytics | undefined;
  isLoading: boolean;
}) {
  if (!isLoading && !clicks) {
    return (
      <p className="text-sm font-medium text-zinc-500">
        Couldn&apos;t load the journey counts. Try refreshing.
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
  const tool = (
    kind: 'breathe' | 'ground',
    step: 'start' | 'done',
    source: string
  ) => n(`tool_${kind}_${step}_${source}`);
  const toolRows = (source: string): Row[] => [
    {
      label: 'Slow breathing',
      values: [
        tool('breathe', 'start', source),
        tool('breathe', 'done', source),
      ],
    },
    {
      label: '5-4-3-2-1 grounding',
      values: [tool('ground', 'start', source), tool('ground', 'done', source)],
    },
  ];
  // Every page together, including the first days before tools noted where
  // they were used.
  const anyTool = (kind: 'breathe' | 'ground', step: 'start' | 'done') =>
    sumWhere(t, (name) => name.startsWith(`tool_${kind}_${step}`));

  const feelingVisits = sumWhere(t, (name) =>
    name.startsWith('visit_feeling_')
  );
  const homeVisits = n('visit_home');
  const thatsMe = n('looking_for_hope');
  const planStarted = n('plan_start');
  const planDone = n('plan_done');
  const monthlyNeedsHelp =
    n('plan_monthly_result_returning') + n('plan_monthly_result_safety');

  const overview = [
    {
      stage: 1,
      name: 'The moment they realize',
      value: feelingVisits,
      label: 'feeling page visits',
    },
    {
      stage: 2,
      name: 'First contact',
      value: homeVisits,
      label: `homepage visits · ${thatsMe.toLocaleString()} tapped "That's me"`,
    },
    {
      stage: 3,
      name: 'The first hour',
      value: planDone,
      label: `plans made · ${planStarted.toLocaleString()} started`,
    },
    {
      stage: 4,
      name: 'The weeks after',
      value: n('plan_today_done'),
      label: `days ticked · ${n('plan_check_in_again').toLocaleString()} weekly check-ins`,
    },
    {
      stage: 5,
      name: 'Getting through it',
      value: n('plan_hope_card_made'),
      label: `Hope Cards made · ${n('plan_finish_start').toLocaleString()} finished 4 weeks`,
    },
    {
      stage: 6,
      name: 'Afterwards',
      value: n('plan_monthly_start'),
      label: `monthly check-ins · ${monthlyNeedsHelp.toLocaleString()} needed more help`,
    },
  ];

  // One point per day in the range, including days with no visits.
  const byDay = new Map<string, { home: number; feeling: number }>();
  for (const row of clicks.daily) {
    const day = byDay.get(row.date) ?? { home: 0, feeling: 0 };
    if (row.link_name === 'visit_home') day.home += row.count;
    if (row.link_name.startsWith('visit_feeling_')) day.feeling += row.count;
    byDay.set(row.date, day);
  }
  const trend: { name: string; Homepage: number; 'Feeling pages': number }[] =
    [];
  const end = new Date(`${clicks.date_range.end_date}T00:00:00`);
  for (
    let day = new Date(`${clicks.date_range.start_date}T00:00:00`);
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const counts = byDay.get(key);
    trend.push({
      name: key,
      Homepage: counts?.home ?? 0,
      'Feeling pages': counts?.feeling ?? 0,
    });
  }

  const allNames = Array.from(
    new Set([...Object.keys(clicks.all_time), ...Object.keys(t)])
  ).sort();

  return (
    <section className="space-y-6" aria-labelledby="journey-title">
      <div>
        <h2
          id="journey-title"
          className="text-2xl font-black italic tracking-tighter uppercase"
        >
          The journey, stage by stage
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Counted without cookies or personal details. A visit counts once per
          browser session; taps and tools count each time.
          {clicks.tracked_since &&
            ` Dated counts start ${clicks.tracked_since}; earlier events show only under All events.`}
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {overview.map((item) => (
          <li key={item.stage}>
            <Card className={`${cardClass} h-full`}>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Stage {item.stage}
              </p>
              <p className="mt-1 min-h-10 text-sm font-bold">{item.name}</p>
              <p className="mt-3 text-4xl font-black tabular-nums">
                {item.value.toLocaleString()}
              </p>
              <p className="mt-1 text-xs font-medium text-zinc-500">
                {item.label}
              </p>
            </Card>
          </li>
        ))}
      </ol>

      <Card className={cardClass}>
        <h3 className="text-xl font-black italic tracking-tighter uppercase">
          Visits by day
        </h3>
        <div className="mt-6 h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
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
              <Legend />
              <Area
                type="monotone"
                dataKey="Homepage"
                stroke="#6b8f5e"
                strokeWidth={3}
                fill="#6b8f5e"
                fillOpacity={0.15}
              />
              <Area
                type="monotone"
                dataKey="Feeling pages"
                stroke="#91AFAA"
                strokeWidth={3}
                fill="#91AFAA"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StageCard
          stage={1}
          title="The moment they realize"
          question="People who searched how they feel and landed on a feeling page."
        >
          <Bars
            rows={feelingPages.map((page) => ({
              label: page.label,
              count: n(`visit_feeling_${page.slug}`),
            }))}
          />
          <Table
            columns={['Tool on a feeling page', 'Started', 'Finished']}
            rows={[
              ...toolRows('feeling'),
              {
                label: 'Message to someone (copied)',
                values: [n('tool_message_copy'), '–'],
              },
              {
                label: 'Worry note (set aside)',
                values: [n('tool_worry_note'), '–'],
              },
              {
                label: 'Tapped an e-coach link',
                values: [
                  sumWhere(t, (name) => name.startsWith('ecoach_feeling_')),
                  '–',
                ],
              },
            ]}
          />
        </StageCard>

        <StageCard
          stage={2}
          title="First contact"
          question='The homepage, "Not okay today?", and the menu.'
        >
          <Table
            columns={['Step', 'Count', 'Share']}
            rows={[
              { label: 'Homepage visits', values: [homeVisits, '–'] },
              {
                label: 'Tapped "That\'s me"',
                values: [thatsMe, percent(thatsMe, homeVisits)],
              },
              {
                label: 'Chose a feeling on the menu',
                values: [
                  sumWhere(t, (name) => name.startsWith('menu_feeling_')),
                  percent(
                    sumWhere(t, (name) => name.startsWith('menu_feeling_')),
                    thatsMe
                  ),
                ],
              },
              {
                label: 'E-coach from the menu',
                values: [n('ecoach_menu'), '–'],
              },
              {
                label: '"Welcome back" to their plan',
                values: [n('menu_welcome_back_plan'), '–'],
              },
              {
                label: '"I don\'t have hope" journey visits',
                values: [n('visit_get_started'), '–'],
              },
            ]}
          />
          <Bars
            rows={Object.entries(MENU_LABELS).map(([id, label]) => ({
              label,
              count: n(`menu_feeling_${id}`),
            }))}
          />
          <Table
            columns={['"Calm down now" on the menu', 'Started', 'Finished']}
            rows={toolRows('menu')}
          />
        </StageCard>

        <StageCard
          stage={3}
          title="The first hour"
          question="The 9-question check-in and the plan it makes."
        >
          <Table
            columns={['Step', 'Count', 'Of started']}
            rows={[
              {
                label: 'Visited the plan page',
                values: [n('visit_action_plan'), '–'],
              },
              { label: 'Started the check-in', values: [planStarted, '–'] },
              {
                label: 'Finished it and got a plan',
                values: [planDone, percent(planDone, planStarted)],
              },
              {
                label: 'Added a tool to their 4 weeks',
                values: [n('plan_tool_add'), '–'],
              },
              {
                label: 'Added a phone reminder',
                values: [
                  n('plan_reminder_google') + n('plan_reminder_ics'),
                  '–',
                ],
              },
              {
                label: 'Asked for a check-in email',
                values: [n('plan_check_in'), '–'],
              },
              { label: 'Emailed their plan', values: [n('plan_email'), '–'] },
              {
                label: 'Downloaded a backup',
                values: [n('plan_backup_download'), '–'],
              },
              {
                label: 'Added HopeBegins to their home screen',
                values: [n('plan_install_prompt'), '–'],
              },
              {
                label: 'E-coach from the plan',
                values: [n('ecoach_plan'), '–'],
              },
            ]}
          />
          <Table
            columns={['Tool tried on the plan', 'Started', 'Finished']}
            rows={toolRows('plan')}
          />
        </StageCard>

        <StageCard
          stage={4}
          title="The weeks after"
          question="Coming back to practise the tool and check in."
        >
          <Table
            columns={['Step', 'Count']}
            rows={[
              {
                label: 'Ticked "Done today" (taps)',
                values: [n('plan_today_done')],
              },
              {
                label: 'Took the weekly check-in again',
                values: [n('plan_check_in_again')],
              },
              {
                label: 'Restored a plan from a backup',
                values: [n('plan_backup_restore')],
              },
            ]}
          />
        </StageCard>

        <StageCard
          stage={5}
          title="Getting through it"
          question="Finishing the 4 weeks and keeping a Hope Card."
        >
          <Table
            columns={['Step', 'Count']}
            rows={[
              {
                label: 'Finished the 4 weeks',
                values: [n('plan_finish_start')],
              },
              { label: 'Made a Hope Card', values: [n('plan_hope_card_made')] },
              {
                label: 'Saved it as an image',
                values: [n('plan_hope_card_image')],
              },
              {
                label: 'Started another 4 weeks',
                values: [n('plan_restart_4_weeks')],
              },
              {
                label: 'E-coach from the Hope Card',
                values: [n('ecoach_hope_card')],
              },
            ]}
          />
        </StageCard>

        <StageCard
          stage={6}
          title="Afterwards"
          question="The monthly check-in and the open door back."
        >
          <Table
            columns={['Step', 'Count']}
            rows={[
              {
                label: 'Took a monthly check-in',
                values: [n('plan_monthly_start')],
              },
              {
                label: 'Result: holding steady',
                values: [n('plan_monthly_result_steady')],
              },
              {
                label: 'Result: some signs',
                values: [n('plan_monthly_result_watch')],
              },
              {
                label: 'Result: coming back',
                values: [n('plan_monthly_result_returning')],
              },
              {
                label: 'Result: safety, shown the crisis line',
                values: [n('plan_monthly_result_safety')],
              },
              {
                label: 'Added a monthly reminder',
                values: [
                  n('plan_monthly_reminder_google') +
                    n('plan_monthly_reminder_ics'),
                ],
              },
              {
                label: 'E-coach after the 4 weeks',
                values: [
                  n('ecoach_afterwards') +
                    sumWhere(t, (name) => name.startsWith('ecoach_monthly_')),
                ],
              },
              { label: 'Shared HopeBegins', values: [n('plan_after_share')] },
              {
                label: 'Opened "Become a Hope Carrier"',
                values: [n('plan_after_carrier')],
              },
            ]}
          />
        </StageCard>
      </div>

      <Card className={cardClass}>
        <h3 className="text-xl font-black italic tracking-tighter uppercase">
          Across every stage
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Table
            columns={['Reaching out', 'Taps']}
            rows={[
              {
                label: 'Tapped "Crisis? 1553" in the header',
                values: [n('header_crisis_call')],
              },
              {
                label: 'Tapped any e-coach link',
                values: [sumWhere(t, (name) => name.startsWith('ecoach_'))],
              },
              { label: 'Opened Prayer War Room', values: [n('war_room')] },
            ]}
          />
          <Table
            columns={['Tools, every page', 'Started', 'Finished']}
            rows={[
              {
                label: 'Slow breathing',
                values: [
                  anyTool('breathe', 'start'),
                  anyTool('breathe', 'done'),
                ],
              },
              {
                label: '5-4-3-2-1 grounding',
                values: [anyTool('ground', 'start'), anyTool('ground', 'done')],
              },
            ]}
          />
          <Table
            columns={['Other pages', 'Visits']}
            rows={OTHER_PAGES.map(([page, label]) => ({
              label,
              values: [n(`visit_${page}`)],
            }))}
          />
        </div>
      </Card>

      <Card className={cardClass}>
        <details>
          <summary className="cursor-pointer text-sm font-bold uppercase tracking-wider">
            All events
          </summary>
          <div className="mt-4">
            <Table
              columns={['Event', 'These dates', 'All time']}
              rows={allNames.map((name) => ({
                label: name,
                values: [t[name] ?? 0, clicks.all_time[name] ?? 0],
              }))}
            />
          </div>
        </details>
      </Card>
    </section>
  );
}
