'use client';

import { useState } from 'react';

const senses = [
  { count: 5, prompt: 'things you can see' },
  { count: 4, prompt: 'things you can touch' },
  { count: 3, prompt: 'things you can hear' },
  { count: 2, prompt: 'things you can smell' },
  { count: 1, prompt: 'thing you can taste' },
];

export function GroundingExercise({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const isDone = step >= senses.length;
  const sense = senses[step];

  return (
    <div className="mt-5 rounded-2xl bg-[#EFF3E7] p-6 text-center">
      {isDone ? (
        <>
          <p className="font-poppins font-bold text-lg text-[#6E5F47]">
            You are here, right now.
          </p>
          <p className="mt-1 text-[#6E5F47]">
            Take one slow breath and notice how you feel.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            Close
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center gap-1.5" aria-hidden>
            {senses.map((s, i) => (
              <span
                key={s.count}
                className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-[#AEC488]' : 'bg-white'}`}
              />
            ))}
          </div>
          <p className="mt-5 font-playfair text-6xl text-[#6E5F47]">
            {sense.count}
          </p>
          <p
            className="mt-1 font-poppins font-bold text-lg text-[#6E5F47]"
            aria-live="polite"
          >
            Name {sense.count} {sense.prompt}
          </p>
          <p className="mt-1 text-sm text-[#6E5F47]">
            Say them out loud or in your head. Take your time.
          </p>
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="mt-5 rounded-2xl bg-[#6E5F47] px-6 py-3 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            {step === senses.length - 1 ? 'Finish' : 'Next'}
          </button>
        </>
      )}
    </div>
  );
}
