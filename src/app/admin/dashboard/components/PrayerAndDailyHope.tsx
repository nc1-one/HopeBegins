import type { AnalyticsData } from '@/types/admin';
import { DayChart, BarList, Loading, Panel, Tile } from './parts';

export const PRAYER_CATEGORY_LABELS: Record<string, string> = {
  GENERAL: 'General',
  ANXIETY_FEAR: 'Anxiety & Fear',
  HEALTH: 'Health',
  FINANCE: 'Finance',
  RELATIONSHIP: 'Relationship',
  OTHER: 'Other',
};

/**
 * What the server counts for the dates: prayer requests and Daily Hope for
 * the language picked, HopeCast plays and the five steps for everyone.
 */
export function PrayerAndDailyHope({
  analytics,
  oneLanguage,
}: {
  analytics: AnalyticsData | undefined;
  /** A language is picked, so prayer and Daily Hope are that language's. */
  oneLanguage: boolean;
}) {
  if (!analytics) return <Loading height={320} />;
  const { summary } = analytics;
  const everyLanguage = oneLanguage ? 'Every language.' : undefined;

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5 print:grid-cols-5">
        <Tile label="Prayer requests" value={summary.total_prayers} />
        <Tile
          label="Daily Hope sign-ups"
          value={summary.total_new_subscribers}
        />
        <Tile
          label="Finished Daily Hope"
          value={summary.daily_hope_finished}
          help="Got every email."
        />
        <Tile
          label="Finished the five steps"
          value={summary.hopeful_beginning_completions}
          help={everyLanguage ?? 'On the get started page.'}
        />
        <Tile
          label="HopeCast plays"
          value={summary.total_plays}
          help={everyLanguage}
        />
      </dl>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Prayer requests by topic">
          <BarList
            rows={analytics.prayers_by_category.map((item) => ({
              label:
                PRAYER_CATEGORY_LABELS[item.category ?? ''] ??
                item.category ??
                'Other',
              value: item.count,
            }))}
          />
        </Panel>
        <Panel title="HopeCast plays by category" note="Every language.">
          <BarList
            rows={analytics.plays_by_category.map((item) => ({
              label: item.name ?? item.category ?? 'Other',
              value: item.count,
            }))}
          />
        </Panel>
        <Panel title="Daily Hope sign-ups by day" className="lg:col-span-2">
          <DayChart
            label="Daily Hope sign-ups"
            days={analytics.subscribers_trend.map((day) => day.date)}
            series={[
              {
                key: 'signups',
                label: 'Sign-ups',
                color: '#6b8f5e',
                values: analytics.subscribers_trend.map((day) => day.count),
              },
            ]}
          />
        </Panel>
      </div>
      {oneLanguage && (
        <p className="text-xs font-medium text-zinc-500">
          Prayer requests and Daily Hope sign-ups have saved their language
          since 31 October 2026, so for one language they count from then.
        </p>
      )}
    </div>
  );
}
