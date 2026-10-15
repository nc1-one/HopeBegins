'use client';

import { useEffect, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';

const BREATHE_IN = 4;
const BREATHE_OUT = 6;
const ROUNDS = 12; // 12 x 10 seconds = 2 minutes
const CYCLE = BREATHE_IN + BREATHE_OUT;

const copy = {
  en: {
    breatheIn: 'Breathe in',
    breatheOut: 'Breathe out',
    round: (round: number) =>
      `Round ${round} of ${ROUNDS}. In through your nose, out through your mouth.`,
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
    doneTitle: '2 minutes done.',
    doneText: 'Notice how your body feels now compared to when you started.',
    close: 'Close',
  },
  tl: {
    breatheIn: 'Hinga papasok',
    breatheOut: 'Hinga palabas',
    round: (round: number) =>
      `Round ${round} ng ${ROUNDS}. Papasok sa ilong, palabas sa bibig.`,
    pause: 'I-pause',
    resume: 'Ituloy',
    stop: 'Itigil',
    doneTitle: 'Tapos na ang 2 minuto.',
    doneText:
      'Pansinin ang pakiramdam ng katawan mo ngayon kumpara noong nagsimula ka.',
    close: 'Isara',
  },
};

export function BreathingExercise({
  onClose,
  lang = 'en',
}: {
  onClose: () => void;
  lang?: FeelingLang;
}) {
  const t = copy[lang];
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isDone = elapsed >= CYCLE * ROUNDS;
  const inCycle = elapsed % CYCLE;
  const isBreathingIn = inCycle < BREATHE_IN;
  const count = isBreathingIn ? BREATHE_IN - inCycle : CYCLE - inCycle;
  const round = Math.min(Math.floor(elapsed / CYCLE) + 1, ROUNDS);

  useEffect(() => {
    if (isPaused || isDone) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [isPaused, isDone]);

  if (isDone) {
    return (
      <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center">
        <p className="font-poppins font-bold text-lg text-[#6E5F47]">
          {t.doneTitle}
        </p>
        <p className="mt-1 text-[#6E5F47]">{t.doneText}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
        >
          {t.close}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6">
      <div className="flex flex-col items-center">
        <div className="relative flex h-44 w-44 items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-[#AEC488] bg-white animate-[hb-breathe_10s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          />
          <div className="relative text-center">
            <p
              className="font-poppins font-bold text-lg text-[#6E5F47]"
              aria-live="polite"
            >
              {isBreathingIn ? t.breatheIn : t.breatheOut}
            </p>
            <p
              aria-hidden
              className="font-playfair text-4xl text-[#6E5F47] tabular-nums"
            >
              {count}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#6E5F47]">{t.round(round)}</p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            className="rounded-2xl border border-[#AEC488] bg-white px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {isPaused ? t.resume : t.pause}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {t.stop}
          </button>
        </div>
      </div>
    </div>
  );
}
