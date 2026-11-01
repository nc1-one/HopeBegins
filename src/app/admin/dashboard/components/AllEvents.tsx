import type { ClickAnalytics } from '@/types/admin';
import { NumberTable } from './parts';

/** Every count by its recorded name, for checking a number at its source. */
export function AllEvents({ clicks }: { clicks: ClickAnalytics | undefined }) {
  if (!clicks) return null;
  const t = clicks.totals;
  const names = Array.from(
    new Set([...Object.keys(clicks.all_time), ...Object.keys(t)])
  ).sort();
  return (
    <details className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 print:hidden">
      <summary className="cursor-pointer text-sm font-bold">
        Every count by its recorded name ({names.length.toLocaleString()})
      </summary>
      <p className="mt-2 text-xs font-medium text-zinc-500">
        The raw counts behind every number above, for the language picked.
        {clicks.tracked_since &&
          ` Counts by date start ${clicks.tracked_since}; anything earlier is under All time only.`}
      </p>
      <div className="mt-4">
        <NumberTable
          columns={['Name', 'These dates', 'All time']}
          rows={names.map((name) => ({
            label: name,
            values: [t[name] ?? 0, clicks.all_time[name] ?? 0],
          }))}
        />
      </div>
    </details>
  );
}
