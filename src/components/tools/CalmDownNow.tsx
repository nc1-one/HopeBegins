'use client';

import { useState } from 'react';
import { Wind } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { analyticsService } from '@/services/analyticsService';
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
export function CalmDownNow({ lang }: { lang: FeelingLang }) {
  const t = copy[lang];
  const [open, setOpen] = useState<Exercise | null>(null);

  const toggle = (exercise: Exercise) => {
    if (open !== exercise)
      analyticsService.recordClick(`menu_calm_${exercise}`);
    setOpen(open === exercise ? null : exercise);
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
        <BreathingExercise
          lang={lang}
          source="menu"
          onClose={() => setOpen(null)}
        />
      )}
      {open === 'ground' && (
        <GroundingExercise
          lang={lang}
          source="menu"
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
