'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { WORRY_TOPICS } from '@/lib/thoughts';
import { analyticsService } from '@/services/analyticsService';
import { chipClass } from './toolStyles';

const copy = {
  tl: {
    doneTitle: 'Nakasulat na.',
    doneText:
      'Kung bumalik ito sa isip mo ngayong gabi, sabihin sa sarili mo na bukas mo na ito iisipin. Ngayon, subukan ang paghinga sa ibaba.',
    label: 'Ano ang nagpapapuyat sa iyo? I-tap ang tugma.',
    write: 'O isulat dito, kahit magulo.',
    privacy: 'Hindi namin ito sine-save o ipinapadala kahit saan.',
    button: 'Itabi muna para bukas',
  },
  en: {
    doneTitle: "It's written down.",
    doneText:
      "If it comes back tonight, tell yourself you'll think about it tomorrow. Now try the breathing below.",
    label: "What's keeping you up? Tap what fits.",
    write: "Or write it here, even if it's messy.",
    privacy: "We don't save this or send it anywhere.",
    button: 'Set it aside for tomorrow',
  },
};

/**
 * Name the worry so it can wait until tomorrow: tap what fits, or write it.
 * Nothing picked or typed here is saved or sent anywhere.
 */
export function WorryNote({ lang = 'tl' }: { lang?: FeelingLang }) {
  const t = copy[lang];
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const doneRef = useRef<HTMLParagraphElement>(null);

  // Screen readers hear the done message once the note is set aside.
  useEffect(() => {
    if (isDone) doneRef.current?.focus();
  }, [isDone]);

  if (isDone) {
    return (
      <div className="rounded-2xl bg-[#EFF3E7] p-6 hb-step-in">
        <p
          ref={doneRef}
          tabIndex={-1}
          className="font-poppins font-bold text-lg text-[#6E5F47] focus:outline-none"
        >
          {t.doneTitle}
        </p>
        <p className="mt-1 text-[#6E5F47]">{t.doneText}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#EFF3E7] p-6">
      <fieldset>
        <legend className="font-poppins font-bold text-[#6E5F47]">
          {t.label}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {WORRY_TOPICS.map((topic) => {
            const isPicked = picked.includes(topic.en);
            return (
              <button
                key={topic.en}
                type="button"
                aria-pressed={isPicked}
                onClick={() =>
                  setPicked((list) =>
                    isPicked
                      ? list.filter((item) => item !== topic.en)
                      : [...list, topic.en]
                  )
                }
                className={chipClass}
              >
                {topic[lang]}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label htmlFor="worry-note" className="mt-5 block text-[#6E5F47]">
        {t.write}
      </label>
      <textarea
        id="worry-note"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mt-3 w-full rounded-xl border border-zinc-200 bg-white p-4 text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
      />
      <p className="mt-2 text-sm text-[#6E5F47]">{t.privacy}</p>
      <button
        type="button"
        onClick={() => {
          setText('');
          setPicked([]);
          setIsDone(true);
          analyticsService.recordClick('tool_worry_note');
        }}
        disabled={!text.trim() && picked.length === 0}
        className="mt-4 min-h-11 rounded-2xl bg-[#6E5F47] px-5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
      >
        {t.button}
      </button>
    </div>
  );
}
