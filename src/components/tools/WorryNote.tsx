'use client';

import { useState } from 'react';

/**
 * Write the worry down so it can wait until tomorrow. Nothing typed here is
 * saved or sent anywhere.
 */
export function WorryNote() {
  const [text, setText] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (isDone) {
    return (
      <div className="rounded-2xl bg-[#EFF3E7] p-6">
        <p className="font-poppins font-bold text-lg text-[#6E5F47]">
          Nakasulat na. Bukas na natin ito haharapin.
        </p>
        <p className="mt-1 text-[#6E5F47]">
          Hindi ito nawala, nakatabi lang. Ngayon, huminga muna tayo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#EFF3E7] p-6">
      <label htmlFor="worry-note" className="block text-[#6E5F47]">
        Ano ang iniisip mo ngayon? Isulat dito, kahit magulo.
      </label>
      <textarea
        id="worry-note"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded-xl border border-zinc-200 bg-white p-4 text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
      />
      <p className="mt-2 text-sm text-[#6E5F47]">
        Hindi namin ito sine-save o ipinapadala kahit saan.
      </p>
      <button
        type="button"
        onClick={() => {
          setText('');
          setIsDone(true);
        }}
        disabled={!text.trim()}
        className="mt-4 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
      >
        Itabi muna para bukas
      </button>
    </div>
  );
}
