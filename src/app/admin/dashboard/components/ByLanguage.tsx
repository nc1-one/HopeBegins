import { Card } from '@/components/ui/card';
import { LANG_INFO, LANGS, type Lang } from '@/lib/i18n';
import { totalsByLanguage } from '@/lib/clickLanguages';
import type { ClickAnalytics } from '@/types/admin';

const sumWhere = (
  totals: Record<string, number>,
  test: (name: string) => boolean
) =>
  Object.entries(totals).reduce(
    (total, [name, count]) => (test(name) ? total + count : total),
    0
  );

type Count = (t: Record<string, number>) => number;
const visits =
  (page: string): Count =>
  (t) =>
    t[`visit_${page}`] ?? 0;
const startsWith =
  (prefix: string): Count =>
  (t) =>
    sumWhere(t, (name) => name.startsWith(prefix));

/**
 * Every stage of the journey and every page, by the names in
 * analyticsService. The stages match the cards below (JourneyByStage).
 */
const GROUPS: { title: string; rows: { label: string; count: Count }[] }[] = [
  {
    title: 'Stage 1 · The moment they realize',
    rows: [
      { label: 'Feeling page visits', count: startsWith('visit_feeling_') },
      { label: 'Stories read', count: startsWith('visit_story_') },
    ],
  },
  {
    title: 'Stage 2 · First contact',
    rows: [
      { label: 'Home page visits', count: visits('home') },
      { label: 'Tapped "That\'s me"', count: (t) => t.looking_for_hope ?? 0 },
      { label: 'Daily check-ins done', count: (t) => t.checkin_done ?? 0 },
      {
        label: 'Tools finished',
        count: (t) => sumWhere(t, (name) => /^tool_.+_done_/.test(name)),
      },
    ],
  },
  {
    title: 'Stage 3 · The first hour',
    rows: [
      { label: 'Plans started', count: (t) => t.plan_start ?? 0 },
      { label: 'Plans made', count: (t) => t.plan_done ?? 0 },
      { label: 'Plans emailed', count: (t) => t.plan_email ?? 0 },
      {
        label: '7-day check-ins asked for',
        count: (t) => t.plan_check_in ?? 0,
      },
    ],
  },
  {
    title: 'Stage 4 · The weeks after',
    rows: [
      {
        label: 'Days ticked',
        count: (t) =>
          sumWhere(t, (name) => name.startsWith('plan_today_done')) +
          sumWhere(t, (name) => name.startsWith('plan_grid_tick_')),
      },
      { label: 'Weekly check-ins', count: (t) => t.plan_check_in_again ?? 0 },
    ],
  },
  {
    title: 'Stage 5 · Getting through it',
    rows: [
      { label: 'Finished 4 weeks', count: (t) => t.plan_finish_start ?? 0 },
      { label: 'Hope Cards made', count: (t) => t.plan_hope_card_made ?? 0 },
    ],
  },
  {
    title: 'Stage 6 · Afterwards',
    rows: [
      { label: 'Monthly check-ins', count: (t) => t.plan_monthly_start ?? 0 },
      {
        label: 'Needed more help',
        count: (t) =>
          (t.plan_monthly_result_returning ?? 0) +
          (t.plan_monthly_result_safety ?? 0),
      },
    ],
  },
  {
    title: 'Help and crisis',
    rows: [
      { label: 'Help page visits', count: visits('help') },
      {
        label: 'Crisis line taps',
        count: (t) => (t.crisis_call ?? 0) + (t.header_crisis_call ?? 0),
      },
    ],
  },
  {
    title: 'Page visits',
    rows: [
      { label: 'All pages', count: startsWith('visit_') },
      { label: 'Home', count: visits('home') },
      { label: 'Feeling pages', count: startsWith('visit_feeling_') },
      { label: 'Tools', count: visits('tools') },
      { label: 'Daily check-in', count: visits('check_in') },
      { label: 'Plan', count: visits('action_plan') },
      { label: 'Five steps (get started)', count: visits('get_started') },
      { label: 'Help', count: visits('help') },
      { label: 'Prayers', count: visits('prayers') },
      { label: 'Hope AI', count: visits('hope_ai') },
      { label: 'Daily Hope', count: visits('daily_hope') },
      { label: 'HopeCasts', count: visits('hopecasts') },
      { label: 'Blog', count: visits('blog') },
      { label: 'Stories', count: startsWith('visit_story_') },
      { label: 'Games (laro muna)', count: visits('laro_muna') },
      { label: 'Our approach', count: visits('our_approach') },
      { label: 'Give', count: visits('give_hope') },
    ],
  },
];

type Column = Lang | 'before';
const COLUMNS: Column[] = [...LANGS, 'before'];
const columnName = (column: Column) =>
  column === 'before' ? 'Before' : LANG_INFO[column].name;

const regionName = (() => {
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    return (code: string) => names.of(code.toUpperCase()) ?? code;
  } catch {
    return (code: string) => code.toUpperCase();
  }
})();

function Cells({ values }: { values: number[] }) {
  const total = values.reduce((sum, value) => sum + value, 0);
  return (
    <>
      <td className="px-4 py-2.5 text-right font-bold">
        {total.toLocaleString()}
      </td>
      {values.map((value, index) => (
        <td
          key={index}
          className={`px-4 py-2.5 text-right ${value ? '' : 'text-zinc-300 dark:text-zinc-600'}`}
        >
          {value.toLocaleString()}
        </td>
      ))}
    </>
  );
}

function Head({ first }: { first: string }) {
  return (
    <thead>
      <tr className="border-b border-zinc-100 text-left dark:border-zinc-800">
        <th scope="col" className="px-4 py-3 font-bold">
          {first}
        </th>
        <th scope="col" className="px-4 py-3 text-right font-bold">
          All
        </th>
        {COLUMNS.map((column) => (
          <th
            key={column}
            scope="col"
            className="px-4 py-3 text-right font-bold"
          >
            {columnName(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

/**
 * Every stage and every page with each language side by side, for the
 * chosen dates, and where visitors are. "Before" holds counts from before
 * 30 October 2026, when visits started carrying their language.
 */
export function ByLanguage({
  clicks,
  isLoading,
  className = '',
}: {
  clicks: ClickAnalytics | undefined;
  isLoading: boolean;
  className?: string;
}) {
  if (isLoading || !clicks) {
    return (
      <div className="h-[200px] w-full rounded-xl bg-zinc-50 dark:bg-zinc-800/20 animate-pulse" />
    );
  }
  const byLang = totalsByLanguage(clicks.totals);
  // Taps on the globe, by the language picked, wherever they were made.
  const picks = (lang: Lang) =>
    COLUMNS.reduce(
      (sum, column) => sum + (byLang[column][`language_pick_${lang}`] ?? 0),
      0
    );
  // Visitors by the country their phone's time zone is in, once per visit.
  const countries = Array.from(
    new Set(
      COLUMNS.flatMap((column) =>
        Object.keys(byLang[column])
          .filter((name) => name.startsWith('country_'))
          .map((name) => name.slice('country_'.length))
      )
    )
  )
    .map((code) => ({
      code,
      values: COLUMNS.map((column) => byLang[column][`country_${code}`] ?? 0),
    }))
    .sort(
      (a, b) =>
        b.values.reduce((s, v) => s + v, 0) -
        a.values.reduce((s, v) => s + v, 0)
    );

  return (
    <section className={`space-y-8 ${className}`} aria-labelledby="lang-title">
      <div className="space-y-4">
        <div>
          <h2
            id="lang-title"
            className="text-2xl font-black italic tracking-tighter uppercase"
          >
            By language
          </h2>
          <p className="mt-1 max-w-3xl text-sm font-medium text-zinc-500">
            Every stage and page, with each language side by side: the language
            of the page each visit or tap happened on. Before means counts from
            before 30 October 2026, when languages started being counted. The
            stage cards further down show one language at a time, from the
            language filter at the top.
          </p>
        </div>
        <Card className="overflow-x-auto rounded-2xl border-zinc-100 p-0 dark:border-zinc-800">
          <table className="w-full min-w-[880px] text-sm">
            <Head first="Stage or page" />
            <tbody className="tabular-nums">
              {GROUPS.map((group) => (
                <GroupRows
                  key={group.title}
                  title={group.title}
                  rows={group.rows.map((row) => ({
                    label: row.label,
                    values: COLUMNS.map((column) => row.count(byLang[column])),
                  }))}
                />
              ))}
              <GroupRows
                title="Language picked with the globe"
                rows={[
                  {
                    label: 'Times picked',
                    values: COLUMNS.map((column) =>
                      column === 'before' ? 0 : picks(column)
                    ),
                  },
                ]}
              />
            </tbody>
          </table>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-black italic tracking-tighter uppercase">
            Visitors by country
          </h3>
          <p className="mt-1 max-w-3xl text-sm font-medium text-zinc-500">
            One count per visit (a browser session), by the country the
            phone&apos;s time zone is in, and the language of the page they
            started on. Only countries with helplines on the site are named; the
            rest show as elsewhere. Counted since 31 October 2026.
          </p>
        </div>
        <Card className="overflow-x-auto rounded-2xl border-zinc-100 p-0 dark:border-zinc-800">
          <table className="w-full min-w-[880px] text-sm">
            <Head first="Country" />
            <tbody className="tabular-nums">
              {countries.length === 0 ? (
                <tr>
                  <td
                    colSpan={COLUMNS.length + 2}
                    className="px-4 py-6 text-center text-zinc-500"
                  >
                    No visits with a country in these dates yet.
                  </td>
                </tr>
              ) : (
                countries.map((country) => (
                  <tr
                    key={country.code}
                    className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50"
                  >
                    <th
                      scope="row"
                      className="px-4 py-2.5 text-left font-medium"
                    >
                      {country.code === 'other'
                        ? 'Elsewhere or not known'
                        : regionName(country.code)}
                    </th>
                    <Cells values={country.values} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
}

function GroupRows({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; values: number[] }[];
}) {
  return (
    <>
      <tr className="bg-zinc-50 dark:bg-zinc-800/40">
        <th
          scope="colgroup"
          colSpan={COLUMNS.length + 2}
          className="px-4 py-2 text-left text-xs font-black uppercase tracking-wider text-zinc-500"
        >
          {title}
        </th>
      </tr>
      {rows.map((row) => (
        <tr
          key={row.label}
          className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50"
        >
          <th scope="row" className="px-4 py-2.5 pl-6 text-left font-medium">
            {row.label}
          </th>
          <Cells values={row.values} />
        </tr>
      ))}
    </>
  );
}
