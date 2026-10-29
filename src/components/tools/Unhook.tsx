'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import { THOUGHTS } from '@/lib/thoughts';
import { MAX_NOTE_LENGTH } from '@/lib/toolNotes';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  chipClass,
  inputClass,
  panelClass,
  primaryClass,
  quietClass,
} from './toolStyles';

/**
 * Step back from a heavy thought: tap a common one or type your own, read it
 * back as "I'm having the thought that…", then turn back to what you were
 * doing. Nothing picked or typed here is saved anywhere.
 */

const copy = {
  en: {
    label: 'Step back from a heavy thought',
    pickLabel: 'Which thought has hold of you? Tap it.',
    thoughtLabel: 'Or write it in a few words',
    privacy: "What you type here isn't saved anywhere.",
    next: 'Next',
    readTitle: 'Read this once, slowly:',
    frame: (thought: string) => `I'm having the thought that ${thought}.`,
    readHint:
      'You can notice a thought without arguing with it or doing what it says.',
    backLabel:
      'Now bring your attention back. What were you doing, or what will you do next?',
    finish: 'Done',
    stop: 'Stop',
    doneTitle: 'You named it.',
    doneText:
      'The thought may come back. When it does, name it again and return to what you were doing.',
    nextTime: 'a hard thought grabs you',
  },
  tl: {
    label: 'Lumayo nang kaunti sa mabigat na isip',
    pickLabel: 'Aling isip ang kumakapit sa iyo? I-tap ito.',
    thoughtLabel: 'O isulat ito sa ilang salita',
    privacy: 'Hindi naka-save kahit saan ang itina-type mo dito.',
    next: 'Susunod',
    readTitle: 'Basahin ito nang isang beses, dahan-dahan:',
    frame: (thought: string) => `Napapansin kong iniisip ko na ${thought}.`,
    readHint:
      'Puwede mong mapansin ang naiisip mo nang hindi ito kinokontra o sinusunod.',
    backLabel:
      'Ngayon, ibalik ang atensyon mo. Ano ang ginagawa mo, o ano ang susunod mong gagawin?',
    finish: 'Tapos na',
    stop: 'Itigil',
    doneTitle: 'Napangalanan mo na.',
    doneText:
      'Puwedeng bumalik ang isip na iyon. Kapag bumalik, pangalanan ulit at bumalik sa ginagawa mo.',
    nextTime: 'may mabigat na isip na kumapit sa iyo',
  },
};

// "I'm having the thought that I'm not good enough." reads better without
// a trailing full stop or a capital from the visitor's own words.
const asClause = (text: string) =>
  text
    .trim()
    .replace(/[.!?]+$/, '')
    // Keeps the pronoun "I" ("I'm", "I can't") a capital.
    .replace(/^(?!I\b)\p{Lu}(?!\p{Lu})/u, (c) => c.toLowerCase());

export function Unhook({
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
  const [thought, setThought] = useState('');
  const [step, setStep] = useState<'write' | 'read' | 'back'>('write');
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_unhook_start_${source}`);
  }, [source]);

  useEffect(() => {
    if (step !== 'write') headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const finish = () => {
    analyticsService.recordClick(`tool_unhook_done_${source}`);
    onFinish?.();
    setThought('');
    setIsDone(true);
  };

  if (isDone) {
    return (
      <ToolFinish
        kind="unhook"
        lang={lang}
        source={source}
        title={t.doneTitle}
        text={t.doneText}
        doneNote={doneNote}
        nextTime={t.nextTime}
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
      {step === 'write' && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (thought.trim()) setStep('read');
          }}
        >
          <p className="font-poppins font-bold">{t.pickLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {THOUGHTS.map((option) => (
              <button
                key={option.id}
                type="button"
                lang={lang}
                onClick={() => {
                  setThought(option.text[lang]);
                  setStep('read');
                }}
                className={chipClass}
              >
                {option.text[lang]}
              </button>
            ))}
          </div>
          <label htmlFor="unhook-thought" className="mt-5 block text-sm">
            {t.thoughtLabel}
          </label>
          <input
            id="unhook-thought"
            value={thought}
            maxLength={MAX_NOTE_LENGTH}
            autoComplete="off"
            onChange={(event) => setThought(event.target.value)}
            className={`mt-2 ${inputClass}`}
          />
          <p className="mt-2 text-sm">{t.privacy}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={!thought.trim()}
              className={primaryClass}
            >
              {t.next}
            </button>
            <button type="button" onClick={onClose} className={quietClass}>
              {t.stop}
            </button>
          </div>
        </form>
      )}

      {step === 'read' && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="text-sm focus:outline-none"
          >
            {t.readTitle}
          </p>
          <p className="mt-2 font-playfair text-2xl leading-snug">
            {t.frame(asClause(thought))}
          </p>
          <p className="mt-3">{t.readHint}</p>
          <button
            type="button"
            onClick={() => setStep('back')}
            className={`mt-4 ${primaryClass}`}
          >
            {t.next}
          </button>
        </>
      )}

      {step === 'back' && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="font-poppins font-bold focus:outline-none"
          >
            {t.backLabel}
          </p>
          <button
            type="button"
            onClick={finish}
            className={`mt-4 ${primaryClass}`}
          >
            {t.finish}
          </button>
        </>
      )}
    </div>
  );
}
