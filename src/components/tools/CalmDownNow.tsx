'use client';

import { useRef, useState } from 'react';
import { Wind } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import type { FeelingLang } from '@/lib/feelingPages';

const copy = {
  en: {
    prompt: 'Need to calm down first?',
    breathe: 'Breathe for 2 minutes',
    ground: 'Try 5-4-3-2-1',
  },
  tl: {
    prompt: 'Kailangan mo bang kumalma muna?',
    breathe: 'Huminga nang 2 minuto',
    ground: 'Subukan ang 5-4-3-2-1',
  },
};

type Exercise = 'breathe' | 'ground';

/** One tap to the breathing or 5-4-3-2-1 exercise, right where you are. */
export function CalmDownNow({
  lang,
  autoOpen,
}: {
  lang: FeelingLang;
  /** A returning visitor's own tool, opened from the home page. */
  autoOpen?: Exercise;
}) {
  const t = copy[lang];
  const [open, setOpen] = useState<Exercise | null>(autoOpen ?? null);
  const [source, setSource] = useState<ToolSource>(autoOpen ? 'home' : 'menu');
  const buttons = useRef<Record<Exercise, HTMLButtonElement | null>>({
    breathe: null,
    ground: null,
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

  return (
    <div className="rounded-2xl border border-[#DFE7CF] bg-white p-5 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <p className="flex items-center gap-3 font-poppins font-bold text-[#6E5F47] md:flex-1">
          <Wind className="h-5 w-5 shrink-0 text-[#91AFAA]" />
          {t.prompt}
        </p>
        <div className="flex flex-wrap gap-2">
          {(['breathe', 'ground'] as const).map((exercise) => (
            <button
              key={exercise}
              ref={(el) => {
                buttons.current[exercise] = el;
              }}
              type="button"
              aria-pressed={open === exercise}
              onClick={() => toggle(exercise)}
              className="rounded-2xl border border-[#AEC488] bg-white px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] aria-pressed:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              {t[exercise]}
            </button>
          ))}
        </div>
      </div>
      {open === 'breathe' && (
        <BreathingExercise lang={lang} source={source} onClose={close} />
      )}
      {open === 'ground' && (
        <GroundingExercise lang={lang} source={source} onClose={close} />
      )}
    </div>
  );
}
