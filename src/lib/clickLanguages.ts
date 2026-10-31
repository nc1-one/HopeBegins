import type { ClickAnalytics } from '@/types/admin';
import { LANG_INFO, LANGS, type Lang } from './i18n';

/*
 * Counts arrive with the page's language after two underscores
 * ("visit_tools__fr"; see analyticsService). Counts from before 30 October
 * 2026 have none. These helpers fold the language back out, so the
 * dashboard's tables work on plain names for one language or all of them.
 */

const SUFFIX = new RegExp(`__(${LANGS.join('|')})$`);

/** 'before' is counts from before languages were recorded. */
export type LanguageFilter = 'all' | Lang | 'before';

export const LANGUAGE_FILTERS: { value: LanguageFilter; label: string }[] = [
  { value: 'all', label: 'All languages' },
  ...LANGS.map((lang) => ({ value: lang, label: LANG_INFO[lang].name })),
  { value: 'before', label: 'Before languages were counted' },
];

export function splitLanguage(name: string): {
  base: string;
  lang: Lang | 'before';
} {
  const match = name.match(SUFFIX);
  return match
    ? { base: name.slice(0, -match[0].length), lang: match[1] as Lang }
    : { base: name, lang: 'before' };
}

const keeps = (filter: LanguageFilter, lang: Lang | 'before') =>
  filter === 'all' || filter === lang;

function fold(counts: Record<string, number>, filter: LanguageFilter) {
  const folded: Record<string, number> = {};
  for (const [name, count] of Object.entries(counts)) {
    const { base, lang } = splitLanguage(name);
    if (keeps(filter, lang)) folded[base] = (folded[base] ?? 0) + count;
  }
  return folded;
}

/** The counts for one language, or all of them, under plain names. */
export function clicksIn(
  clicks: ClickAnalytics,
  filter: LanguageFilter
): ClickAnalytics {
  const daily = new Map<string, ClickAnalytics['daily'][number]>();
  for (const row of clicks.daily) {
    const { base, lang } = splitLanguage(row.link_name);
    if (!keeps(filter, lang)) continue;
    const key = `${row.date} ${base}`;
    const entry = daily.get(key);
    if (entry) entry.count += row.count;
    else daily.set(key, { date: row.date, link_name: base, count: row.count });
  }
  return {
    ...clicks,
    totals: fold(clicks.totals, filter),
    all_time: fold(clicks.all_time, filter),
    daily: [...daily.values()],
  };
}

/** Each language's counts under plain names, for side-by-side tables. */
export function totalsByLanguage(totals: Record<string, number>) {
  return Object.fromEntries(
    [...LANGS, 'before' as const].map((lang) => [lang, fold(totals, lang)])
  ) as Record<Lang | 'before', Record<string, number>>;
}
