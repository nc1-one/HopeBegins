import { splitLanguage } from '@/lib/clickLanguages';
import type { AdminStats, AnalyticsData, ClickAnalytics } from '@/types/admin';
import { METRICS, type Totals } from '../metrics';
import { Loading, Tile } from './parts';

/** Totals since HopeBegins began, for every language: not tied to the dates. */
export function AllTime({
  stats,
  analytics,
  rawClicks,
}: {
  stats: AdminStats | undefined;
  analytics: AnalyticsData | undefined;
  rawClicks: ClickAnalytics | undefined;
}) {
  if (!stats) return <Loading height={140} />;
  const allTime: Totals = {};
  for (const [name, n] of Object.entries(rawClicks?.all_time ?? {})) {
    const { base } = splitLanguage(name);
    allTime[base] = (allTime[base] ?? 0) + n;
  }
  const receiving = analytics?.daily_hope_receiving;

  return (
    <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 print:grid-cols-3">
      <Tile
        label="Prayer requests"
        value={stats.total_prayers}
        sub={`${stats.pending_prayers.toLocaleString()} new, not yet assigned`}
      />
      <Tile
        label="Hope Carriers approved"
        value={stats.total_carriers}
        sub={`of ${stats.total_users.toLocaleString()} who signed up`}
      />
      <Tile
        label="Getting Daily Hope now"
        value={receiving && Object.values(receiving).reduce((a, b) => a + b, 0)}
      />
      <Tile label="HopeCast plays" value={stats.hopecast_plays} />
      <Tile label="Finished the five steps" value={stats.journey_completions} />
      <Tile
        label="Crisis line taps"
        value={rawClicks && METRICS.crisisTaps.value(allTime)}
      />
    </dl>
  );
}
