'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import type { FeelingLang } from '@/lib/feelingPages';

const exercises = {
  tl: {
    breathe: {
      title: 'Dahan-dahang paghinga',
      description:
        'Huminga papasok sa ilong nang 4 na bilang, palabas sa bibig nang 6. Dalawang minuto lang.',
      start: 'Simulan ang paghinga',
    },
    ground: {
      title: '5-4-3-2-1 grounding',
      description:
        'Kapag umaatake ang kaba, ibalik ang isip sa paligid mo gamit ang limang pandama.',
      start: 'Simulan ang 5-4-3-2-1',
    },
  },
  en: {
    breathe: {
      title: 'Slow breathing',
      description:
        'Breathe in through your nose for 4 counts, then out through your mouth for 6. Just two minutes.',
      start: 'Start breathing',
    },
    ground: {
      title: 'Ground yourself with 5-4-3-2-1',
      description:
        'When anxiety hits, bring your mind back to where you are using your five senses.',
      start: 'Start 5-4-3-2-1',
    },
  },
};

export function ExerciseLauncher({
  kind,
  lang = 'tl',
}: {
  kind: 'breathe' | 'ground';
  lang?: FeelingLang;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const exercise = exercises[lang][kind];

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6">
      <h3 className="font-poppins font-bold text-lg text-[#6E5F47]">
        {exercise.title}
      </h3>
      <p className="mt-1 text-[#6E5F47] leading-relaxed">
        {exercise.description}
      </p>
      {isOpen ? (
        kind === 'breathe' ? (
          <BreathingExercise
            onClose={() => setIsOpen(false)}
            lang={lang}
            source="feeling"
          />
        ) : (
          <GroundingExercise
            onClose={() => setIsOpen(false)}
            lang={lang}
            source="feeling"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-4 inline-flex items-center rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
        >
          <Play className="mr-2 h-4 w-4" />
          {exercise.start}
        </button>
      )}
    </div>
  );
}
