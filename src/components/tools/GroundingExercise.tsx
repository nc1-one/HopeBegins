'use client';

import { useEffect, useRef, useState } from 'react';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import type { FeelingLang } from '@/lib/feelingPages';
import { rememberTool } from '@/lib/myTool';
import { ToolFinish } from './ToolFinish';

const counts = [5, 4, 3, 2, 1];

const copy = {
  en: {
    prompts: [
      'Name 5 things you can see',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste',
    ],
    hint: 'Say them out loud or in your head. Take your time.',
    label: '5-4-3-2-1 grounding',
    stepOf: (step: number) => `Step ${step} of 5.`,
    stop: 'Stop',
    next: 'Next',
    finish: 'Finish',
    doneTitle: "That's all five.",
    doneText: 'Take one slow breath.',
  },
  tl: {
    prompts: [
      'Magbanggit ng 5 bagay na nakikita mo',
      'Magbanggit ng 4 na bagay na nahahawakan mo',
      'Magbanggit ng 3 tunog na naririnig mo',
      'Magbanggit ng 2 amoy na naaamoy mo',
      'Magbanggit ng 1 lasa sa bibig mo',
    ],
    hint: 'Sabihin nang malakas o sa isip lang. Dahan-dahan lang.',
    label: '5-4-3-2-1 grounding',
    stepOf: (step: number) => `Hakbang ${step} ng 5.`,
    stop: 'Itigil',
    next: 'Susunod',
    finish: 'Tapos na',
    doneTitle: 'Tapos na ang lima.',
    doneText: 'Huminga nang isang beses nang dahan-dahan.',
  },
};

export function GroundingExercise({
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
  const [step, setStep] = useState(0);
  const isDone = step >= counts.length;
  const counted = useRef({ start: false, done: false });
  const boxRef = useRef<HTMLDivElement>(null);

  // Screen readers land in the exercise when it opens. The finish screen
  // takes focus itself.
  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, []);

  useEffect(() => {
    if (counted.current.start) return;
    counted.current.start = true;
    analyticsService.recordClick(`tool_ground_start_${source}`);
  }, [source]);

  useEffect(() => {
    if (!isDone || counted.current.done) return;
    counted.current.done = true;
    analyticsService.recordClick(`tool_ground_done_${source}`);
    rememberTool('ground');
    onFinish?.();
  }, [isDone, source, onFinish]);

  if (isDone) {
    return (
      <ToolFinish
        kind="ground"
        lang={lang}
        source={source}
        title={t.doneTitle}
        text={t.doneText}
        doneNote={doneNote}
        onClose={onClose}
      />
    );
  }

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center focus:outline-none"
    >
      <div className="flex justify-center gap-1.5" aria-hidden>
        {counts.map((count, i) => (
          <span
            key={count}
            className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-[#AEC488]' : 'bg-white'}`}
          />
        ))}
      </div>
      <p className="mt-5 font-playfair text-6xl text-[#6E5F47]">
        {counts[step]}
      </p>
      <p
        className="mt-1 font-poppins font-bold text-lg text-[#6E5F47]"
        aria-live="polite"
      >
        <span className="sr-only">{t.stepOf(step + 1)} </span>
        {t.prompts[step]}
      </p>
      <p className="mt-1 text-sm text-[#6E5F47]">{t.hint}</p>
      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => s + 1)}
          className="rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
        >
          {step === counts.length - 1 ? t.finish : t.next}
        </button>
        <button
          type="button"
          onClick={() => {
            analyticsService.recordClick(`tool_ground_stop_${source}`);
            onClose();
          }}
          className="rounded-2xl px-5 py-3 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
        >
          {t.stop}
        </button>
      </div>
    </div>
  );
}
