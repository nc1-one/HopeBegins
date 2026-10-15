'use client';

import { useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';

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
    next: 'Next',
    finish: 'Finish',
    doneTitle: "That's all five.",
    doneText: 'Take one slow breath. How do you feel now?',
    close: 'Close',
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
    next: 'Susunod',
    finish: 'Tapos na',
    doneTitle: 'Tapos na ang lima.',
    doneText:
      'Huminga nang isang beses nang dahan-dahan. Kumusta ang pakiramdam mo ngayon?',
    close: 'Isara',
  },
};

export function GroundingExercise({
  onClose,
  lang = 'en',
}: {
  onClose: () => void;
  lang?: FeelingLang;
}) {
  const t = copy[lang];
  const [step, setStep] = useState(0);
  const isDone = step >= counts.length;

  return (
    <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center">
      {isDone ? (
        <>
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
        </>
      ) : (
        <>
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
            {t.prompts[step]}
          </p>
          <p className="mt-1 text-sm text-[#6E5F47]">{t.hint}</p>
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="mt-5 rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            {step === counts.length - 1 ? t.finish : t.next}
          </button>
        </>
      )}
    </div>
  );
}
