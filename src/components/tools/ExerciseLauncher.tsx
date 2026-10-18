'use client';

import { useRef, useState } from 'react';
import { BreathingExercise } from './BreathingExercise';
import { FindThePair } from './FindThePair';
import { GroundingExercise } from './GroundingExercise';
import { OneSmallThing } from './OneSmallThing';
import type { FeelingLang } from '@/lib/feelingPages';
import { primaryClass } from './toolStyles';
import type { ToolSource } from '@/services/analyticsService';

const exercises = {
  tl: {
    'one-thing': {
      title: 'Isang maliit na bagay para sa araw na ito',
      description:
        'Pumili ng isang bagay na kaya mong tapusin sa loob ng 10 minuto, tulad ng maligo, kumain, o lumabas sandali. Sapat na iyon ngayong araw.',
      start: 'Pumili ng gagawin',
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
        'Kapag inaatake ka ng kaba, ibalik ang isip mo sa paligid gamit ang 5 senses mo. Mga 2 minuto.',
      start: 'Simulan ang 5-4-3-2-1',
    },
    game: {
      title: 'Hanapin ang kapares',
      description:
        'Mabilis na card game para sa mga oras na paulit-ulit ang iniisip mo. Mga 2 minuto.',
      start: 'Maglaro na',
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
    game: {
      title: 'Find the pair',
      description:
        'A quick card game for when your thoughts keep going round. About 2 minutes.',
      start: 'Play now',
    },
  },
};

export function ExerciseLauncher({
  kind,
  lang = 'tl',
  source = 'feeling',
}: {
  kind: 'breathe' | 'ground' | 'one-thing' | 'game';
  lang?: FeelingLang;
  source?: ToolSource;
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
      <h3 className="font-poppins font-semibold text-lg text-[#6E5F47]">
        {exercise.title}
      </h3>
      <p className="mt-1 text-[#6E5F47] leading-relaxed">
        {exercise.description}
      </p>
      {isOpen ? (
        kind === 'breathe' ? (
          <BreathingExercise onClose={close} lang={lang} source={source} />
        ) : kind === 'ground' ? (
          <GroundingExercise onClose={close} lang={lang} source={source} />
        ) : kind === 'one-thing' ? (
          <OneSmallThing onClose={close} lang={lang} source={source} />
        ) : (
          <div className="mt-5">
            <FindThePair onClose={close} lang={lang} source={source} />
          </div>
        )
      ) : (
        <button
          ref={startRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className={`mt-4 ${primaryClass}`}
        >
          {exercise.start}
        </button>
      )}
    </div>
  );
}
