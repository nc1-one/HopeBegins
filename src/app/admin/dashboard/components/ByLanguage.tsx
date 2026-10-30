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

// What each language's visitors did, by the names in analyticsService.
const ROWS: { label: string; count: (t: Record<string, number>) => number }[] =
  [
    {
      label: 'Page visits',
      count: (t) => sumWhere(t, (name) => name.startsWith('visit_')),
    },
    { label: 'Home page visits', count: (t) => t.visit_home ?? 0 },
    {
      label: 'Feeling page visits',
      count: (t) => sumWhere(t, (name) => name.startsWith('visit_feeling_')),
    },
    {
      label: 'Stories read',
      count: (t) => sumWhere(t, (name) => name.startsWith('visit_story_')),
    },
    { label: 'Check-ins done', count: (t) => t.checkin_done ?? 0 },
    {
      label: 'Tools finished',
      count: (t) => sumWhere(t, (name) => /^tool_.+_done_/.test(name)),
    },
    { label: 'Plans made', count: (t) => t.plan_done ?? 0 },
    { label: 'Help page visits', count: (t) => t.visit_help ?? 0 },
    {
      label: 'Crisis line taps',
      count: (t) => (t.crisis_call ?? 0) + (t.header_crisis_call ?? 0),
    },
  ];

/**
 * Every language side by side for the chosen dates. "Before" holds counts
 * from before 30 October 2026, when visits started carrying their language.
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
  const columns: (Lang | 'before')[] = [...LANGS, 'before'];
  // Taps on the globe, by the language picked, wherever they were made.
  const picks = (lang: Lang) =>
    columns.reduce(
      (sum, column) => sum + (byLang[column][`language_pick_${lang}`] ?? 0),
      0
    );

  return (
    <section className={`space-y-4 ${className}`} aria-labelledby="lang-title">
      <div>
        <h2
          id="lang-title"
          className="text-2xl font-black italic tracking-tighter uppercase"
        >
          By language
        </h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          The language of the page each visit or tap happened on. Before means
          counts from before 30 October 2026, when languages started being
          counted.
        </p>
      </div>
      <Card className="overflow-x-auto rounded-2xl border-zinc-100 p-0 dark:border-zinc-800">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-zinc-100 text-left dark:border-zinc-800">
              <th scope="col" className="px-4 py-3 font-bold">
                What
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-right font-bold"
                >
                  {column === 'before' ? 'Before' : LANG_INFO[column].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {ROWS.map((row) => (
              <tr
                key={row.label}
                className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50"
              >
                <th scope="row" className="px-4 py-2.5 text-left font-medium">
                  {row.label}
                </th>
                {columns.map((column) => (
                  <td key={column} className="px-4 py-2.5 text-right">
                    {row.count(byLang[column]).toLocaleString()}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-4 py-2.5 text-left font-medium">
                Chosen with the globe
              </th>
              {columns.map((column) => (
                <td key={column} className="px-4 py-2.5 text-right">
                  {column === 'before' ? '–' : picks(column).toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Card>
    </section>
  );
}
