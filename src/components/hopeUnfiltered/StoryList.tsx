'use client';

import { useState, type ReactNode } from 'react';
import type { StoryTheme } from '@/lib/hopeUnfiltered';

const chipClass =
  'inline-flex min-h-11 items-center rounded-full border px-4 font-poppins text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';

/**
 * Every story card is in the page for search engines and for readers
 * without JavaScript; the theme buttons only hide the ones that don't fit.
 */
export function StoryList({
  themes,
  cards,
}: {
  themes: { id: StoryTheme; label: string }[];
  cards: { theme: StoryTheme; slug: string; card: ReactNode }[];
}) {
  const [theme, setTheme] = useState<StoryTheme | 'all'>('all');
  const shown = cards.filter((card) => theme === 'all' || card.theme === theme);

  const chip = (id: StoryTheme | 'all', label: string) => (
    <li key={id}>
      <button
        type="button"
        aria-pressed={theme === id}
        onClick={() => setTheme(id)}
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

  return (
    <>
      <ul aria-label="Stories about" className="flex flex-wrap gap-2">
        {chip('all', 'All stories')}
        {themes.map((item) => chip(item.id, item.label))}
      </ul>
      <p aria-live="polite" className="sr-only">
        {shown.length} stories
      </p>
      <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.slug} hidden={theme !== 'all' && card.theme !== theme}>
            {card.card}
          </li>
        ))}
      </ul>
    </>
  );
}
