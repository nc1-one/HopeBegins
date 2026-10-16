'use client';

import { useEffect, useRef, useState } from 'react';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import type { FeelingLang } from '@/lib/feelingPages';
import { rememberTool } from '@/lib/myTool';

const BREATHE_IN = 4;
const BREATHE_OUT = 6;
const ROUNDS = 12; // 12 x 10 seconds = 2 minutes
const CYCLE = BREATHE_IN + BREATHE_OUT;

const copy = {
  en: {
    label: 'Slow breathing',
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
    label: 'Dahan-dahang paghinga',
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
  source,
  onFinish,
  doneNote,
}: {
  onClose: () => void;
  lang?: FeelingLang;
  /** Where it was opened, so the dashboard can count tools per journey stage. */
  source: ToolSource;
  /** Called once when the exercise is finished. */
  onFinish?: () => void;
  /** An extra line on the finish screen, such as "Ticked for today". */
  doneNote?: string;
}) {
  const t = copy[lang];
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isDone = elapsed >= CYCLE * ROUNDS;
  const counted = useRef({ start: false, done: false });
  const boxRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);

  // Screen readers land in the exercise when it opens, and on the finish.
  useEffect(() => {
    const target = isDone ? doneRef.current : boxRef.current;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'nearest' });
  }, [isDone]);

  useEffect(() => {
    if (counted.current.start) return;
    counted.current.start = true;
    analyticsService.recordClick(`tool_breathe_start_${source}`);
  }, [source]);

  useEffect(() => {
    if (!isDone || counted.current.done) return;
    counted.current.done = true;
    analyticsService.recordClick(`tool_breathe_done_${source}`);
    rememberTool('breathe');
    onFinish?.();
  }, [isDone, source, onFinish]);
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
      <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center hb-step-in">
        <p
          ref={doneRef}
          tabIndex={-1}
          className="font-poppins font-bold text-lg text-[#6E5F47] focus:outline-none"
        >
          {t.doneTitle}
        </p>
        <p className="mt-1 text-[#6E5F47]">{t.doneText}</p>
        {doneNote && (
          <p className="mt-2 text-sm font-bold text-[#6E5F47]">{doneNote}</p>
        )}
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
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 focus:outline-none hb-panel-in"
    >
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
            onClick={() => {
              analyticsService.recordClick(`tool_breathe_stop_${source}`);
              onClose();
            }}
            className="rounded-2xl px-5 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            {t.stop}
          </button>
        </div>
      </div>
    </div>
  );
}
