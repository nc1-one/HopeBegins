import Link from 'next/link';
import { format } from 'date-fns';
import { Prayer } from '@/types/admin';
import { STATUS_CONFIG } from '../../manage-prayers/constants';

/** The five newest prayer requests, with a way to the full list. */
export function RecentPrayers({ prayers }: { prayers: Prayer[] | undefined }) {
  if (!prayers || prayers.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-500">
          The 5 newest, whatever the dates.
        </p>
        <Link
          href="/admin/manage-prayers"
          className="shrink-0 text-sm font-bold text-brand underline-offset-4 hover:underline"
        >
          Manage prayers
        </Link>
      </div>
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {prayers.map((prayer) => (
          <li
            key={prayer.id}
            className="flex items-center justify-between gap-4 px-5 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{prayer.title}</p>
              <p className="truncate text-xs font-medium text-zinc-500">
                {prayer.isAnonymous ? 'Anonymous' : prayer.email}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_CONFIG[prayer.status]?.bg ?? ''} ${STATUS_CONFIG[prayer.status]?.color ?? ''}`}
              >
                {STATUS_CONFIG[prayer.status]?.label ?? prayer.status}
              </span>
              <span className="whitespace-nowrap text-xs font-medium text-zinc-500">
                {format(new Date(prayer.created_at), 'd MMM')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
