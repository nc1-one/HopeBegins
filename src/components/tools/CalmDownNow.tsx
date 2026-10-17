'use client';

import { useRef, useState } from 'react';
import { BreathingExercise } from './BreathingExercise';
import { FindThePair } from './FindThePair';
import { GroundingExercise } from './GroundingExercise';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import type { FeelingLang } from '@/lib/feelingPages';

const copy = {
  en: {
    prompt: 'Need a minute first?',
    breathe: 'Breathe',
    ground: 'Use your 5 senses',
    game: 'Play a game',
  },
  tl: {
    prompt: 'Pahinga muna?',
    breathe: 'Huminga',
    ground: 'Gamitin ang 5 senses mo',
    game: 'Maglaro',
  },
};

type Exercise = 'breathe' | 'ground' | 'game';

/**
 * One quiet line: breathe or play, right where you are. 5-4-3-2-1 opens
 * here only as a returning visitor's own tool; it has its own pages.
 */
export function CalmDownNow({
  lang,
  autoOpen,
}: {
  lang: FeelingLang;
  /** A returning visitor's own tool, opened from the home page. */
  autoOpen?: 'breathe' | 'ground';
}) {
  const t = copy[lang];
  const [open, setOpen] = useState<Exercise | null>(autoOpen ?? null);
  const [source, setSource] = useState<ToolSource>(autoOpen ? 'home' : 'menu');
  const buttons = useRef<Record<Exercise, HTMLButtonElement | null>>({
    breathe: null,
    ground: null,
    game: null,
  });

  const toggle = (exercise: Exercise) => {
    if (open !== exercise)
      analyticsService.recordClick(`menu_calm_${exercise}`);
    setSource('menu');
    setOpen(open === exercise ? null : exercise);
  };

  // Back to the button that opened it once the exercise closes.
  const close = () => {
    const opened = open;
    setOpen(null);
    if (opened) requestAnimationFrame(() => buttons.current[opened]?.focus());
  };

  const shown: Exercise[] =
    open === 'ground' ? ['breathe', 'ground', 'game'] : ['breathe', 'game'];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="font-poppins font-bold text-[#6E5F47]">{t.prompt}</p>
        {shown.map((exercise) => (
          <button
            key={exercise}
            ref={(el) => {
              buttons.current[exercise] = el;
            }}
            type="button"
            aria-pressed={open === exercise}
            onClick={() => toggle(exercise)}
            className="min-h-11 rounded-full border border-[#AEC488] bg-white px-5 font-poppins text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] aria-pressed:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {t[exercise]}
          </button>
        ))}
      </div>
      {open === 'breathe' && (
        <BreathingExercise lang={lang} source={source} onClose={close} />
      )}
      {open === 'ground' && (
        <GroundingExercise lang={lang} source={source} onClose={close} />
      )}
      {open === 'game' && (
        <div className="mt-5">
          <FindThePair lang={lang} source={source} onClose={close} />
        </div>
      )}
    </div>
  );
}
