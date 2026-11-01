import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import type { CountLanguage } from '@/lib/clickLanguages';

/*
 * The pieces every dashboard section is built from, so tables, bars and
 * charts look and read the same everywhere, on screen and in the PDF.
 */

/** One colour per language, the same in every chart and key. */
export const LANGUAGE_COLORS: Record<CountLanguage, string> = {
  en: '#5b8c51',
  tl: '#d4a13a',
  fr: '#4a7fb5',
  de: '#8a6bb8',
  es: '#d0694f',
  ko: '#3fa3a0',
  before: '#b8b2a7',
};

const formatNumber = (value: number | string) =>
  typeof value === 'number' ? value.toLocaleString() : value;

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 space-y-4"
    >
      <div>
        <h2
          id={`${id}-title`}
          className="text-2xl font-black tracking-tight text-balance"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-1 max-w-3xl text-sm font-medium text-zinc-500">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

export function Panel({
  title,
  note,
  children,
  className = '',
}: {
  title?: string;
  note?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`report-block min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {title && <h3 className="text-base font-bold">{title}</h3>}
      {note && (
        <p className="mt-0.5 text-xs font-medium text-zinc-500">{note}</p>
      )}
      <div className={title || note ? 'mt-4' : ''}>{children}</div>
    </div>
  );
}

/** A number with its label and what it counts. */
export function Tile({
  label,
  value,
  help,
  sub,
}: {
  label: string;
  value: number | string | undefined;
  help?: string;
  sub?: ReactNode;
}) {
  return (
    <div className="report-block flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <dt className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
        {label}
      </dt>
      <dd className="mt-1 text-3xl font-black tabular-nums">
        {value === undefined ? '–' : formatNumber(value)}
      </dd>
      {sub && (
        <dd className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
          {sub}
        </dd>
      )}
      {help && (
        <dd className="mt-1 text-xs font-medium text-zinc-500">{help}</dd>
      )}
    </div>
  );
}

export interface TableRow {
  label: string;
  help?: string;
  values: (number | string)[];
}

/** Rows of numbers; the first column is the label. A false row is left out. */
export function NumberTable({
  columns,
  rows,
  minWidth,
}: {
  columns: string[];
  rows: (TableRow | false)[];
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
            {columns.map((column, i) => (
              <th
                key={column}
                scope="col"
                className={`pb-2 font-bold ${i > 0 ? 'pl-3 text-right' : ''}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows
            .filter((row): row is TableRow => row !== false)
            .map((row) => (
              <tr
                key={row.label}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <th scope="row" className="py-2 pr-4 text-left font-medium">
                  {row.label}
                  {row.help && (
                    <span className="block text-xs font-normal text-zinc-500">
                      {row.help}
                    </span>
                  )}
                </th>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`py-2 pl-3 text-right font-bold ${value === 0 || value === '–' ? 'text-zinc-300 dark:text-zinc-600' : ''}`}
                  >
                    {formatNumber(value)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

/** Counts as bars, longest first, each bar sized against the largest. */
export function BarList({
  rows,
  empty = 'None in these dates.',
  limit,
}: {
  rows: { label: string; value: number }[];
  empty?: string;
  limit?: number;
}) {
  const shown = rows
    .filter((row) => row.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
  if (shown.length === 0) {
    return <p className="text-sm font-medium text-zinc-500">{empty}</p>;
  }
  const max = shown[0].value;
  return (
    <ul className="space-y-2.5">
      {shown.map((row) => (
        <li key={row.label}>
          <div className="flex justify-between gap-4 text-sm font-medium">
            <span className="min-w-0">{row.label}</span>
            <span className="font-bold tabular-nums">
              {row.value.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-2 rounded-full bg-[#6b8f5e]"
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * One bar per day, stacked by series (a language, say), with the dates
 * under it and a key. Drawn as plain SVG so it prints.
 */
export function DayChart({
  days,
  series,
  label,
}: {
  days: string[];
  series: { key: string; label: string; color: string; values: number[] }[];
  label: string;
}) {
  const totals = days.map((_, i) =>
    series.reduce((sum, one) => sum + one.values[i], 0)
  );
  const peak = Math.max(0, ...totals);
  if (days.length === 0 || peak === 0) {
    return (
      <p className="text-sm font-medium text-zinc-500">None in these dates.</p>
    );
  }
  const width = 720;
  const height = 160;
  const gap = days.length > 60 ? 1 : 2;
  const barWidth = Math.max(width / days.length - gap, 1);
  const shown = series.filter((one) => one.values.some(Boolean));
  const dayLabel = (day: string) => format(parseISO(day), 'd MMM');
  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${label}, by day: most in one day ${peak.toLocaleString()}`}
      >
        <line
          x1="0"
          x2={width}
          y1={height - 0.5}
          y2={height - 0.5}
          className="stroke-zinc-200 dark:stroke-zinc-700"
        />
        {days.map((day, i) => {
          let top = height;
          return (
            <g key={day}>
              <title>
                {`${dayLabel(day)}: ${totals[i].toLocaleString()}${
                  shown.length > 1
                    ? ` (${shown
                        .filter((one) => one.values[i])
                        .map((one) => `${one.label} ${one.values[i]}`)
                        .join(', ')})`
                    : ''
                }`}
              </title>
              {shown.map((one) => {
                const h = (one.values[i] / peak) * (height - 8);
                top -= h;
                return h > 0 ? (
                  <rect
                    key={one.key}
                    x={i * (barWidth + gap)}
                    y={top}
                    width={barWidth}
                    height={h}
                    fill={one.color}
                  />
                ) : null;
              })}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 flex justify-between gap-4 text-xs font-medium text-zinc-500">
        <span>{dayLabel(days[0])}</span>
        <span>Most in one day: {peak.toLocaleString()}</span>
        <span>{dayLabel(days[days.length - 1])}</span>
      </figcaption>
      {shown.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold">
          {shown.map((one) => (
            <li key={one.key} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: one.color }}
              />
              {one.label}
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

/** Every day from start to end, as yyyy-MM-dd. */
export function daysBetween(start: string, end: string) {
  const days: string[] = [];
  const last = parseISO(end);
  for (let day = parseISO(start); day <= last; day.setDate(day.getDate() + 1)) {
    days.push(format(day, 'yyyy-MM-dd'));
  }
  return days;
}

export function Loading({ height = 200 }: { height?: number }) {
  return (
    <div
      className="w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800/40"
      style={{ height }}
    />
  );
}
