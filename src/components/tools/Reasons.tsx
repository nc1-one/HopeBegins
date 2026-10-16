'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  MAX_REASONS,
  MAX_REASON_LENGTH,
  updatePlan,
  useSavedPlan,
} from '@/lib/actionPlanStore';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  inputClass,
  panelClass,
  primaryClass,
  quietClass,
  secondaryClass,
} from './toolStyles';

/**
 * "My reasons to keep going": a short list kept with the plan on this phone,
 * read on hard days and shown on the Hope Card.
 */

const copy = {
  en: {
    label: 'My reasons to keep going',
    intro:
      'Write the people, plans and small things that matter to you. Read them on hard days.',
    example:
      'For example: my little sister, finishing school, my dog, the sea.',
    addLabel: 'A reason',
    add: 'Add',
    listTitle: 'My reasons',
    remove: (reason: string) => `Remove "${reason}"`,
    saved: 'Saved only on this phone. They also show on your Hope Card.',
    done: 'Done',
    close: 'Close',
    doneTitle: 'Your reasons are saved.',
    doneText: 'Read them on hard days. You can add more any time.',
  },
  tl: {
    label: 'Ang mga dahilan ko para magpatuloy',
    intro:
      'Isulat ang mga tao, plano, at maliliit na bagay na mahalaga sa iyo. Basahin ang mga ito sa mabibigat na araw.',
    example:
      'Halimbawa: ang bunso kong kapatid, makatapos ng pag-aaral, ang aso ko, ang dagat.',
    addLabel: 'Isang dahilan',
    add: 'Idagdag',
    listTitle: 'Ang mga dahilan ko',
    remove: (reason: string) => `Alisin ang "${reason}"`,
    saved:
      'Naka-save lang sa phone na ito. Lumalabas din ang mga ito sa Hope Card mo.',
    done: 'Tapos na',
    close: 'Isara',
    doneTitle: 'Naka-save na ang mga dahilan mo.',
    doneText:
      'Basahin ang mga ito sa mabibigat na araw. Puwede kang magdagdag kahit kailan.',
  },
};

export function Reasons({
  onClose,
  lang = 'en',
  source,
  onFinish,
  doneNote,
}: {
  onClose: () => void;
  lang?: FeelingLang;
  source: ToolSource;
  onFinish?: () => void;
  doneNote?: string;
}) {
  const t = copy[lang];
  const saved = useSavedPlan();
  const reasons = saved?.reasons ?? [];
  const [draft, setDraft] = useState('');
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_reasons_start_${source}`);
  }, [source]);

  const setReasons = (next: string[]) =>
    updatePlan((plan) => ({ ...plan, reasons: next.slice(0, MAX_REASONS) }));

  const add = () => {
    const text = draft.trim();
    if (!text || reasons.length >= MAX_REASONS) return;
    setReasons([...reasons, text]);
    setDraft('');
  };

  if (isDone) {
    return (
      <ToolFinish
        kind="reasons"
        lang={lang}
        source={source}
        title={t.doneTitle}
        text={t.doneText}
        doneNote={doneNote}
        ask={false}
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
      className={panelClass}
    >
      <p className="leading-relaxed">{t.intro}</p>
      <p className="mt-1 text-sm">{t.example}</p>

      {reasons.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white p-4">
          <p className="font-poppins font-bold">{t.listTitle}</p>
          <ul className="mt-2 space-y-1">
            {reasons.map((reason, i) => (
              <li
                key={`${i}-${reason}`}
                className="flex items-center justify-between gap-3"
              >
                <span>{reason}</span>
                <button
                  type="button"
                  aria-label={t.remove(reason)}
                  onClick={() =>
                    setReasons(reasons.filter((_, index) => index !== i))
                  }
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {reasons.length < MAX_REASONS && (
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
        >
          <label htmlFor="reason-new" className="text-sm font-bold">
            {t.addLabel}
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id="reason-new"
              value={draft}
              maxLength={MAX_REASON_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className={secondaryClass}
            >
              {t.add}
            </button>
          </div>
        </form>
      )}

      <p className="mt-4 text-sm">{t.saved}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={reasons.length === 0}
          onClick={() => {
            analyticsService.recordClick(`tool_reasons_done_${source}`);
            onFinish?.();
            setIsDone(true);
          }}
          className={primaryClass}
        >
          {t.done}
        </button>
        <button type="button" onClick={onClose} className={quietClass}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
