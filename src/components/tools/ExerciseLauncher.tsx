'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { GroundingExercise } from './GroundingExercise';
import { OneSmallThing } from './OneSmallThing';
import type { FeelingLang } from '@/lib/feelingPages';

const exercises = {
  tl: {
    'one-thing': {
      title: 'Isang maliit na bagay para sa araw na ito',
      description:
        'Pumili ng isang bagay na kaya mong tapusin sa loob ng 10 minuto, tulad ng maligo, kumain, o lumabas sandali. Sapat na iyon ngayong araw.',
      start: 'Pumili ng maliit kong gagawin',
    },
    breathe: {
      title: 'Dahan-dahang paghinga',
      description:
        'Huminga papasok sa ilong nang 4 na bilang, palabas sa bibig nang 6. Dalawang minuto lang.',
      start: 'Simulan ang paghinga',
    },
    ground: {
      title: '5-4-3-2-1 grounding',
      description:
        'Kapag umaatake ang kaba, ibalik ang isip sa paligid mo gamit ang limang pandama. Mga 2 minuto.',
      start: 'Simulan ang 5-4-3-2-1',
    },
  },
  en: {
    'one-thing': {
      title: 'One small thing for today',
      description:
        "Pick one thing you can finish in 10 minutes, like a shower, something to eat, or a few minutes outside. That's enough for today.",
      start: 'Pick my small thing',
    },
    breathe: {
      title: 'Slow breathing',
      description:
        'Breathe in through your nose for 4 counts, then out through your mouth for 6. Just two minutes.',
      start: 'Start breathing',
    },
    ground: {
      title: 'Ground yourself with 5-4-3-2-1',
      description:
        'When anxiety hits, bring your mind back to where you are using your five senses. About 2 minutes.',
      start: 'Start 5-4-3-2-1',
    },
  },
};

export function ExerciseLauncher({
  kind,
  lang = 'tl',
}: {
  kind: 'breathe' | 'ground' | 'one-thing';
  lang?: FeelingLang;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const exercise = exercises[lang][kind];
  const startRef = useRef<HTMLButtonElement>(null);
  // Back to the start button once the exercise closes.
  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => startRef.current?.focus());
  };

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
          <BreathingExercise onClose={close} lang={lang} source="feeling" />
        ) : kind === 'ground' ? (
          <GroundingExercise onClose={close} lang={lang} source="feeling" />
        ) : (
          <OneSmallThing onClose={close} lang={lang} source="feeling" />
        )
      ) : (
        <button
          ref={startRef}
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
