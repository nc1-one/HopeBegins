import { Fragment } from 'react';
import { LANGS, type Lang } from '@/lib/i18n';
import {
  LANGUAGE_NAMES,
  splitLanguage,
  type CountLanguage,
  type LanguageFilter,
} from '@/lib/clickLanguages';
import type {
  AnalyticsData,
  ClickAnalytics,
  CountsByLanguage,
} from '@/types/admin';
import {
  METRICS,
  RATES,
  percent,
  share,
  type Metric,
  type MetricId,
  type Totals,
} from '../metrics';
import {
  DayChart,
  LANGUAGE_COLORS,
  Loading,
  Panel,
  daysBetween,
} from './parts';

type Column = 'all' | CountLanguage;

const GROUPS: { title: string; rows: MetricId[] }[] = [
  {
    title: 'Visitors',
    rows: [
      'visits',
      'pagesViewed',
      'homeVisits',
      'feelingVisits',
      'storyReads',
      'helpVisits',
    ],
  },
  {
    title: 'Getting help now',
    rows: [
      'thatsMe',
      'toolsStarted',
      'toolsFinished',
      'gamesPlayed',
      'checkins',
      'crisisTaps',
      'ecoach',
      'warRoom',
    ],
  },
  {
    title: 'The plan',
    rows: [
      'planStarted',
      'plansMade',
      'plansEmailed',
      'checkInEmails',
      'daysTicked',
      'weeklyCheckIns',
      'fourWeeks',
      'hopeCards',
      'monthly',
      'neededHelp',
    ],
  },
];

// Rows the server counts, not the site's taps and visits.
const SERVER_ROWS: {
  label: string;
  help?: string;
  counts: (analytics: AnalyticsData) => CountsByLanguage | undefined;
}[] = [
  {
    label: 'Prayer requests',
    counts: (a) => a.by_language?.prayers,
  },
  {
    label: 'Daily Hope sign-ups',
    counts: (a) => a.by_language?.daily_hope_signups,
  },
  {
    label: 'Finished Daily Hope',
    help: 'Got every email.',
    counts: (a) => a.by_language?.daily_hope_finished,
  },
  {
    label: 'Getting Daily Hope now',
    help: 'Today, whatever the dates.',
    counts: (a) => a.daily_hope_receiving,
  },
];

const regionName = (() => {
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' });
    return (code: string) => names.of(code.toUpperCase()) ?? code;
  } catch {
    return (code: string) => code.toUpperCase();
  }
})();

const cellClass = (value: number | string) =>
  `px-3 py-2 text-right ${value === 0 || value === '–' ? 'text-zinc-300 dark:text-zinc-600' : ''}`;

/**
 * Every key number with each language side by side: the language of the
 * page each visit or tap happened on. The heart of the per-language report;
 * it ignores the language picked at the top.
 */
export function ByLanguage({
  clicks,
  byLanguage,
  analytics,
  language,
  onPickLanguage,
}: {
  clicks: ClickAnalytics | undefined;
  byLanguage: Record<CountLanguage, Totals> | undefined;
  analytics: AnalyticsData | undefined;
  language: LanguageFilter;
  /** Left out in the PDF, where the headings aren't buttons. */
  onPickLanguage?: (language: LanguageFilter) => void;
}) {
  if (!clicks || !byLanguage) return <Loading height={480} />;

  const all: Totals = {};
  for (const totals of Object.values(byLanguage)) {
    for (const [name, n] of Object.entries(totals)) {
      all[name] = (all[name] ?? 0) + n;
    }
  }
  const serverBefore = SERVER_ROWS.some(
    (row) => (analytics && row.counts(analytics)?.before) || 0
  );
  const hasBefore =
    Object.values(byLanguage.before).some(Boolean) || serverBefore;
  const languages: CountLanguage[] = hasBefore
    ? [...LANGS, 'before']
    : [...LANGS];
  const columns: Column[] = ['all', ...languages];
  const totalsOf = (column: Column) =>
    column === 'all' ? all : byLanguage[column];

  // Each language's share of the pages that have a language.
  const pagesWithLanguage =
    METRICS.pagesViewed.value(all) -
    METRICS.pagesViewed.value(byLanguage.before);
  const shareOfPages = (lang: CountLanguage) =>
    percent(METRICS.pagesViewed.value(byLanguage[lang]), pagesWithLanguage);

  // Taps on the globe, by the language picked, wherever they were made.
  const picks = (lang: Lang) =>
    Object.values(byLanguage).reduce(
      (sum, totals) => sum + (totals[`language_pick_${lang}`] ?? 0),
      0
    );

  const head = (
    <thead>
      <tr className="border-b border-zinc-200 text-left align-bottom dark:border-zinc-800">
        <th scope="col" className="px-3 py-3 font-bold">
          <span className="sr-only">Number</span>
        </th>
        {columns.map((column) => {
          const name = column === 'all' ? 'All' : LANGUAGE_NAMES[column];
          const pickable = onPickLanguage && column !== 'before';
          const picked = column === language;
          return (
            <th
              key={column}
              scope="col"
              className={`px-3 py-3 text-right font-bold ${picked ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
            >
              {pickable ? (
                <button
                  type="button"
                  onClick={() => onPickLanguage(column as LanguageFilter)}
                  aria-pressed={picked}
                  title={`Show the whole dashboard for ${column === 'all' ? 'all languages' : name}`}
                  className="inline-flex items-center gap-1.5 rounded-md underline-offset-4 hover:underline"
                >
                  <LanguageDot column={column} />
                  {name}
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <LanguageDot column={column} />
                  {name}
                </span>
              )}
              <span className="block text-xs font-medium text-zinc-500">
                {column === 'all'
                  ? 'every language'
                  : column === 'before'
                    ? 'no language'
                    : `${shareOfPages(column)} of pages`}
                {/* Shares leave out Before, which has no language. */}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );

  const groupHead = (title: string) => (
    <tr className="bg-zinc-50 dark:bg-zinc-800/40">
      <th
        scope="colgroup"
        colSpan={columns.length + 1}
        className="px-3 py-2 text-left text-xs font-black uppercase tracking-wider text-zinc-500"
      >
        {title}
      </th>
    </tr>
  );

  const row = (
    key: string,
    label: string,
    help: string | undefined,
    values: (number | string)[]
  ) => (
    <tr
      key={key}
      className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60"
    >
      <th scope="row" className="px-3 py-2 text-left font-medium">
        {label}
        {help && (
          <span className="block text-xs font-normal text-zinc-500">
            {help}
          </span>
        )}
      </th>
      {values.map((value, i) => (
        <td
          key={columns[i]}
          className={`${cellClass(value)} ${columns[i] === 'all' ? 'font-black' : 'font-bold'} ${columns[i] === language ? 'bg-zinc-50 dark:bg-zinc-800/40' : ''}`}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </td>
      ))}
    </tr>
  );

  // Pages viewed each day, stacked by language.
  const days = daysBetween(
    clicks.date_range.start_date,
    clicks.date_range.end_date
  );
  const dayIndex = new Map(days.map((day, i) => [day, i]));
  const perDay = Object.fromEntries(
    languages.map((lang) => [lang, days.map(() => 0)])
  ) as Record<CountLanguage, number[]>;
  for (const entry of clicks.daily) {
    const { base, lang } = splitLanguage(entry.link_name);
    const i = dayIndex.get(entry.date);
    if (i === undefined || !base.startsWith('visit_') || !perDay[lang])
      continue;
    perDay[lang][i] += entry.count;
  }

  // Visits by the country the phone's time zone is in, once per visit.
  // Countries were first counted after languages, so never under Before.
  const countryColumns: Column[] = ['all', ...LANGS];
  const countries = Array.from(
    new Set(
      Object.keys(all)
        .filter((name) => name.startsWith('country_'))
        .map((name) => name.slice('country_'.length))
    )
  )
    .map((code) => ({
      code,
      values: countryColumns.map(
        (column) => totalsOf(column)[`country_${code}`] ?? 0
      ),
    }))
    .sort((a, b) => b.values[0] - a.values[0]);

  return (
    <div className="space-y-6">
      <Panel className="p-0 sm:p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm tabular-nums">
            {head}
            <tbody>
              {GROUPS.map((group) => (
                <Fragment key={group.title}>
                  {groupHead(group.title)}
                  {group.rows.map((id) => {
                    const metric: Metric = METRICS[id];
                    return row(
                      id,
                      metric.label,
                      metric.help,
                      columns.map((column) =>
                        column !== 'all' &&
                        metric.onlyIn &&
                        !metric.onlyIn.includes(column)
                          ? '–'
                          : metric.value(totalsOf(column))
                      )
                    );
                  })}
                </Fragment>
              ))}
              {groupHead('Prayer and Daily Hope')}
              {SERVER_ROWS.map((server) => {
                const counts = analytics && server.counts(analytics);
                return row(
                  server.label,
                  server.label,
                  server.help,
                  columns.map((column) => {
                    if (!counts) return '–';
                    if (column !== 'all') return counts[column] ?? 0;
                    return Object.values(counts).reduce((a, b) => a + b, 0);
                  })
                );
              })}
              {groupHead('Shares, to compare languages of any size')}
              {Object.entries(RATES).map(([id, rate]) =>
                row(
                  id,
                  rate.label,
                  undefined,
                  columns.map((column) =>
                    share(
                      rate.part(totalsOf(column)),
                      rate.whole(totalsOf(column))
                    )
                  )
                )
              )}
              {groupHead('Language picked with the globe')}
              {row(
                'picks',
                'Times picked',
                'Wherever the globe was tapped.',
                columns.map((column) =>
                  column === 'all'
                    ? LANGS.reduce((sum, lang) => sum + picks(lang), 0)
                    : column === 'before'
                      ? '–'
                      : picks(column)
                )
              )}
            </tbody>
          </table>
        </div>
      </Panel>
      {hasBefore && (
        <p className="text-xs font-medium text-zinc-500">
          Before: visits and taps from before 30 October 2026, and prayer
          requests and Daily Hope sign-ups from before 31 October 2026, when
          each started saving its language. They count under All but under no
          single language.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
        <Panel
          title="Pages viewed by day, by language"
          note="Each bar is one day. Hover a bar for each language's count."
          className="lg:col-span-3"
        >
          <DayChart
            label="Pages viewed"
            days={days}
            series={languages.map((lang) => ({
              key: lang,
              label: LANGUAGE_NAMES[lang],
              color: LANGUAGE_COLORS[lang],
              values: perDay[lang],
            }))}
          />
        </Panel>
        <Panel
          title="Where visitors are"
          note="Once per visit, by the country the phone's time zone is in, and the language of the page they started on. Countries without helplines on the site show as elsewhere. Since 31 October 2026."
          className="lg:col-span-2"
        >
          {countries.length === 0 ? (
            <p className="text-sm font-medium text-zinc-500">
              No visits with a country in these dates.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm tabular-nums">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
                    <th scope="col" className="pb-2 font-bold">
                      Country
                    </th>
                    {countryColumns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="pb-2 pl-2 text-right font-bold"
                        title={
                          column === 'all' ? 'All' : LANGUAGE_NAMES[column]
                        }
                      >
                        {column === 'all' ? 'All' : column.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country) => (
                    <tr
                      key={country.code}
                      className="border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <th
                        scope="row"
                        className="py-2 pr-2 text-left font-medium"
                      >
                        {country.code === 'other'
                          ? 'Elsewhere or not known'
                          : regionName(country.code)}
                      </th>
                      {country.values.map((value, i) => (
                        <td
                          key={countryColumns[i]}
                          className={`py-2 pl-2 text-right font-bold ${value ? '' : 'text-zinc-300 dark:text-zinc-600'}`}
                        >
                          {value.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

function LanguageDot({ column }: { column: Column }) {
  if (column === 'all') return null;
  return (
    <span
      aria-hidden
      className="h-2.5 w-2.5 shrink-0 rounded-sm"
      style={{ backgroundColor: LANGUAGE_COLORS[column] }}
    />
  );
}
