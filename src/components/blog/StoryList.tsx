'use client';

import { useState, type ReactNode } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { THEME_IDS, THEMES } from '@/lib/blog/meta';
import type { StoryTheme } from '@/lib/blog/types';
import { useLanguage } from '@/lib/languagePreference';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { analyticsService } from '@/services/analyticsService';

const chipClass =
  'inline-flex min-h-11 items-center rounded-full border px-4 font-poppins text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';

export interface StoryEntry {
  slug: string;
  theme: StoryTheme;
  /** The story's card in each language. */
  card: Record<FeelingLang, ReactNode>;
}

export type BlogCopy = Record<
  FeelingLang,
  {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    find: string;
    all: string;
  }
>;

/**
 * The blog's stories in the visitor's language, filtered by theme. Both
 * languages' cards are in the page, so search engines and readers without
 * JavaScript get every link; the language and theme only hide the rest.
 * Each theme tap is counted, so the dashboard shows what people look for.
 */
export function StoryList({
  copy,
  featured,
  entries,
}: {
  copy: BlogCopy;
  featured: Record<FeelingLang, ReactNode>;
  entries: StoryEntry[];
}) {
  const lang = useLanguage();
  const t = copy[lang];
  const [theme, setTheme] = useState<StoryTheme | 'all'>('all');
  const themes = THEME_IDS.filter((id) =>
    entries.some((entry) => entry.theme === id)
  );
  const shown = entries.filter(
    (entry) => theme === 'all' || entry.theme === theme
  );

  const pick = (id: StoryTheme | 'all') => {
    setTheme(id);
    if (id !== 'all') analyticsService.recordClick(`blog_theme_${id}`);
  };

  const chip = (id: StoryTheme | 'all', label: string) => (
    <li key={id}>
      <button
        type="button"
        aria-pressed={theme === id}
        onClick={() => pick(id)}
        className={`${chipClass} ${
          theme === id
            ? 'border-[#6E5F47] bg-[#6E5F47] text-white'
            : 'border-[#AEC488] bg-white text-[#6E5F47] hover:bg-[#EFF3E7]'
        }`}
      >
        {label}
      </button>
    </li>
  );

  const inLanguage = (cards: Record<FeelingLang, ReactNode>) =>
    (['en', 'tl'] as const).map((option) => (
      <div key={option} hidden={option !== lang} className="h-full">
        {cards[option]}
      </div>
    ));

  return (
    <>
      <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
        <header lang={lang} className="max-w-2xl">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.12em] text-[#6E5F47]/75">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 font-playfair text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            {t.title}
          </h1>
          <p className="mt-5 font-poppins text-lg leading-[1.4] tracking-[-0.022em] md:text-xl">
            {t.intro}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#6E5F47]/85">
            {t.note}
          </p>
        </header>
        <div className="self-end md:self-auto">
          <LanguageSwitch />
        </div>
      </div>

      <div className="mt-12">{inLanguage(featured)}</div>

      <section aria-labelledby="all-title" className="mt-20">
        <h2
          id="all-title"
          lang={lang}
          className="mb-6 font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl"
        >
          {t.find}
        </h2>
        <ul lang={lang} aria-label={t.find} className="flex flex-wrap gap-2">
          {chip('all', t.all)}
          {themes.map((id) => chip(id, THEMES[lang][id]))}
        </ul>
        <p aria-live="polite" className="sr-only">
          {shown.length}
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <li
              key={entry.slug}
              hidden={theme !== 'all' && entry.theme !== theme}
            >
              {inLanguage(entry.card)}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
