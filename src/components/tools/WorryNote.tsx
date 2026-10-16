'use client';

import { useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService } from '@/services/analyticsService';

const copy = {
  tl: {
    doneTitle: 'Nakasulat na.',
    doneText:
      'Kung bumalik ito sa isip mo ngayong gabi, sabihin sa sarili mo na bukas mo na ito iisipin. Ngayon, subukan ang paghinga sa ibaba.',
    label: 'Ano ang iniisip mo ngayon? Isulat dito, kahit magulo.',
    privacy: 'Hindi namin ito sine-save o ipinapadala kahit saan.',
    button: 'Itabi muna para bukas',
  },
  en: {
    doneTitle: "It's written down.",
    doneText:
      "If it comes back tonight, tell yourself you'll think about it tomorrow. Now try the breathing below.",
    label: "What's on your mind right now? Write it here, even if it's messy.",
    privacy: "We don't save this or send it anywhere.",
    button: 'Set it aside for tomorrow',
  },
};

/**
 * Write the worry down so it can wait until tomorrow. Nothing typed here is
 * saved or sent anywhere.
 */
export function WorryNote({ lang = 'tl' }: { lang?: FeelingLang }) {
  const t = copy[lang];
  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return (
      <div className="rounded-2xl bg-[#EFF3E7] p-6">
        <p className="font-poppins font-bold text-lg text-[#6E5F47]">
          {t.doneTitle}
        </p>
        <p className="mt-1 text-[#6E5F47]">{t.doneText}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#EFF3E7] p-6">
      <label htmlFor="worry-note" className="block text-[#6E5F47]">
        {t.label}
      </label>
      <textarea
        id="worry-note"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded-xl border border-zinc-200 bg-white p-4 text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
      />
      <p className="mt-2 text-sm text-[#6E5F47]">{t.privacy}</p>
      <button
        type="button"
        onClick={() => {
          setText('');
          setIsDone(true);
          analyticsService.recordClick('tool_worry_note');
        }}
        disabled={!text.trim()}
        className="mt-4 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
      >
        {t.button}
      </button>
    </div>
  );
}
