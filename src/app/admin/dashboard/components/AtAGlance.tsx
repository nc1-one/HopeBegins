import type { AnalyticsData, ClickAnalytics } from '@/types/admin';
import { METRICS, percent } from '../metrics';
import { Loading, Tile } from './parts';

// Visits started counting on this day; earlier dates have pages only.
const VISITS_FROM = '2026-10-31';

/** The eight numbers to read first, for the dates and language picked. */
export function AtAGlance({
  clicks,
  analytics,
  startDate,
}: {
  clicks: ClickAnalytics | undefined;
  analytics: AnalyticsData | undefined;
  startDate: string;
}) {
  if (!clicks) return <Loading height={240} />;
  const t = clicks.totals;
  const value = (id: keyof typeof METRICS) => METRICS[id].value(t);
  const toolsStarted = value('toolsStarted');
  const planStarted = value('planStarted');

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 print:grid-cols-4">
      <Tile
        label="Visits"
        value={value('visits')}
        help={
          startDate < VISITS_FROM
            ? 'Counted since 31 October 2026.'
            : 'One per visit, however many pages.'
        }
      />
      <Tile
        label="Pages viewed"
        value={value('pagesViewed')}
        help="Each page once per visit."
      />
      <Tile
        label="Calming tools finished"
        value={value('toolsFinished')}
        sub={
          toolsStarted > 0 &&
          `${toolsStarted >= 10 ? `${percent(value('toolsFinished'), toolsStarted)} ` : ''}of ${toolsStarted.toLocaleString()} started`
        }
      />
      <Tile
        label="Plans made"
        value={value('plansMade')}
        sub={
          planStarted > 0 &&
          `${planStarted >= 10 ? `${percent(value('plansMade'), planStarted)} ` : ''}of ${planStarted.toLocaleString()} check-ins started`
        }
      />
      <Tile label="Daily check-ins done" value={value('checkins')} />
      <Tile
        label="Crisis line taps"
        value={value('crisisTaps')}
        help="Header button, crisis cards and the Help page."
      />
      <Tile label="Prayer requests" value={analytics?.summary.total_prayers} />
      <Tile
        label="Daily Hope sign-ups"
        value={analytics?.summary.total_new_subscribers}
      />
    </dl>
  );
}
