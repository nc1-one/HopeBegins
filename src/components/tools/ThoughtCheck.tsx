'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import type { FeelingLang } from '@/lib/feelingPages';
import {
  BELIEF,
  THOUGHTS,
  TRAP_IDS,
  TRAPS,
  type Thought,
  type TrapId,
} from '@/lib/thoughts';
import { recordToolCheck } from '@/lib/toolChecks';
import { MAX_NOTE_LENGTH } from '@/lib/toolNotes';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  inputClass,
  optionClass,
  panelClass,
  primaryClass,
  quietClass,
} from './toolStyles';
import { CrisisSentence } from '@/components/help/Crisis';

/**
 * Thought check, the CBT thought record in taps: pick the loudest thought,
 * rate how true it feels, see the thinking trap it fits, choose a kinder and
 * truer thought, then rate the first one again. Writing is optional, and
 * nothing picked or typed here is saved or sent; the site counts only that
 * the tool was started and finished.
 */

const copy = {
  en: {
    label: 'Thought check',
    pickTitle: 'Which thought is loudest right now?',
    other: 'Something else',
    otherLabel: 'In a few words (optional)',
    privacy: "What you type here isn't saved anywhere.",
    next: 'Next',
    stop: 'Stop',
    rateTitle: 'How true does it feel right now?',
    trapIntro: 'This is a common thinking trap:',
    askYourself: 'Ask yourself',
    whichTrap: 'Which of these sounds closest?',
    balanceTitle: 'Which of these feels more true?',
    balanceHint: 'Pick the one you can believe, even a little.',
    ownLabel: 'Or write your own',
    useOwn: 'Use mine',
    readSlowly: 'Read it once, slowly.',
    yourThought: 'Your first thought',
    rateAgain: 'Now, how true does the first thought feel?',
    lighterTitle: 'It got lighter.',
    lighterText: (from: string, to: string) =>
      `From "${from}" to "${to}". The thought may come back. When it does, you know how to check it.`,
    sameTitle: 'About the same.',
    sameText:
      'That happens with thoughts that have been around a long time. Checking them gets easier with practice. Try again tomorrow.',
    heavierTitle: 'It feels stronger right now.',
    heavierText:
      'Thank you for being honest. Some thoughts are too heavy to check alone. Talk it through with someone.',
    keep: 'Your kinder thought:',
    ecoach: 'Talk to an e-coach',
    nextTime: 'a heavy thought keeps coming back',
  },
  tl: {
    label: 'Thought check',
    pickTitle: 'Alin ang pinakamalakas na iniisip mo ngayon?',
    other: 'Iba pa',
    otherLabel: 'Sa ilang salita (puwedeng laktawan)',
    privacy: 'Hindi naka-save kahit saan ang itina-type mo dito.',
    next: 'Susunod',
    stop: 'Itigil',
    rateTitle: 'Gaano ito katotoo sa pakiramdam mo ngayon?',
    trapIntro: 'Karaniwang thinking trap ito:',
    askYourself: 'Tanungin ang sarili',
    whichTrap: 'Alin dito ang pinakamalapit?',
    balanceTitle: 'Alin dito ang mas totoo?',
    balanceHint: 'Piliin ang kaya mong paniwalaan, kahit kaunti.',
    ownLabel: 'O isulat ang sa iyo',
    useOwn: 'Ito na',
    readSlowly: 'Basahin ito nang isang beses, dahan-dahan.',
    yourThought: 'Ang una mong iniisip',
    rateAgain: 'Ngayon, gaano katotoo ang una mong iniisip?',
    lighterTitle: 'Gumaan.',
    lighterText: (from: string, to: string) =>
      `Mula "${from}" naging "${to}". Puwedeng bumalik ang isip na iyon. Kapag bumalik, alam mo na kung paano ito suriin.`,
    sameTitle: 'Ganoon pa rin.',
    sameText:
      'Nangyayari iyan sa mga isip na matagal mo nang dala. Mas dumadali ito habang sinasanay. Subukan ulit bukas.',
    heavierTitle: 'Mas mabigat ito ngayon.',
    heavierText:
      'Salamat sa pagiging tapat. May mga isip na sobrang bigat para suriin nang mag-isa. Kausapin ang isang tao tungkol dito.',
    keep: 'Ang mas mabait mong isip:',
    ecoach: 'Kausapin ang e-coach',
    nextTime: 'paulit-ulit na bumabalik ang isang mabigat na isip',
  },
};

type Step = 'pick' | 'rate' | 'trap' | 'balance' | 'again';

export function ThoughtCheck({
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
  const [step, setStep] = useState<Step>('pick');
  const [thought, setThought] = useState<Thought | null>(null);
  const [isOther, setIsOther] = useState(false);
  const [ownThought, setOwnThought] = useState('');
  const [trap, setTrap] = useState<TrapId | null>(null);
  const [before, setBefore] = useState(0);
  const [after, setAfter] = useState(0);
  const [balanced, setBalanced] = useState('');
  const [ownBalanced, setOwnBalanced] = useState('');
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_thought-check_start_${source}`);
  }, [source]);

  useEffect(() => {
    if (step === 'pick') return;
    headingRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
  }, [step]);

  const firstThought = thought ? thought.text[lang] : ownThought.trim();
  const choices = thought
    ? thought.balanced.map((line) => line[lang])
    : trap
      ? TRAPS[trap].balanced.map((line) => line[lang])
      : [];

  const pick = (next: Thought) => {
    setThought(next);
    setTrap(next.trap);
    setStep('rate');
  };

  const finish = (rating: number) => {
    setAfter(rating);
    analyticsService.recordClick(`tool_thought-check_done_${source}`);
    // Lower belief in the thought counts as "calmer" for the Hope Card.
    recordToolCheck(
      'thought-check',
      rating < before ? 'calmer' : rating === before ? 'same' : 'worse'
    );
    onFinish?.();
    setOwnThought('');
    setOwnBalanced('');
    setIsDone(true);
  };

  if (isDone) {
    const lighter = after < before;
    const heavier = after > before;
    return (
      <ToolFinish
        kind="thought-check"
        lang={lang}
        source={source}
        title={
          lighter ? t.lighterTitle : heavier ? t.heavierTitle : t.sameTitle
        }
        text={
          lighter
            ? t.lighterText(BELIEF[before - 1][lang], BELIEF[after - 1][lang])
            : heavier
              ? t.heavierText
              : t.sameText
        }
        doneNote={doneNote}
        nextTime={t.nextTime}
        ask={false}
        onClose={onClose}
      >
        <p className="mx-auto mt-4 max-w-md text-[#6E5F47]">
          <span className="text-sm">{t.keep}</span>
          <span className="mt-1 block font-playfair text-xl leading-snug">
            {balanced}
          </span>
        </p>
        {(!lighter || thought?.risk) && (
          <div className="mt-4 flex justify-center">
            <EcoachLink
              linkName={`ecoach_thought_check_${lighter ? 'risk' : 'heavy'}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
            >
              <MessageCircle className="h-4 w-4" />
              {t.ecoach}
            </EcoachLink>
          </div>
        )}
        {thought?.risk && (
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#6E5F47]">
            <CrisisSentence lang={lang} lead />
          </p>
        )}
      </ToolFinish>
    );
  }

  // A row per step on phones, five across on wider screens. The bar grows
  // with each step, so the scale reads at a glance.
  const beliefScale = (onPick: (rating: number) => void, selected = 0) => (
    <div className="mt-4 grid gap-2 sm:grid-cols-5 sm:gap-1.5">
      {BELIEF.map((level, i) => (
        <button
          key={level.en}
          type="button"
          aria-pressed={selected === i + 1}
          onClick={() => onPick(i + 1)}
          className="flex min-h-12 flex-row-reverse items-center justify-end gap-3 rounded-xl border border-[#DFE7CF] bg-white px-4 font-poppins text-sm font-medium text-[#6E5F47] transition-colors hover:border-[#AEC488] aria-pressed:border-[#6E5F47] aria-pressed:bg-[#F6F8F1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 sm:min-h-20 sm:flex-col-reverse sm:justify-start sm:gap-2 sm:px-1 sm:py-3"
        >
          {level[lang]}
          <span
            aria-hidden
            className="flex h-5 w-12 shrink-0 items-center sm:w-auto sm:items-end"
          >
            <span
              className="h-2 w-[var(--bar-w)] rounded-full bg-[#AEC488] sm:h-[var(--bar-h)] sm:w-2.5"
              style={
                {
                  '--bar-w': `${20 + i * 20}%`,
                  '--bar-h': `${4 + i * 4}px`,
                } as React.CSSProperties
              }
            />
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div
      ref={boxRef}
      tabIndex={-1}
      role="group"
      aria-label={t.label}
      className={panelClass}
    >
      {step === 'pick' && (
        <>
          <p className="font-poppins font-bold">{t.pickTitle}</p>
          <div className="mt-4 grid gap-2">
            {THOUGHTS.map((option) => (
              <button
                key={option.id}
                type="button"
                lang={lang}
                onClick={() => pick(option)}
                className={optionClass}
              >
                {option.text[lang]}
              </button>
            ))}
            <button
              type="button"
              aria-expanded={isOther}
              onClick={() => setIsOther(true)}
              className={optionClass}
            >
              {t.other}
            </button>
          </div>
          {isOther && (
            <form
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
                setThought(null);
                setTrap(null);
                setStep('rate');
              }}
            >
              <label htmlFor="thought-own" className="text-sm">
                {t.otherLabel}
              </label>
              <input
                id="thought-own"
                value={ownThought}
                maxLength={MAX_NOTE_LENGTH}
                autoComplete="off"
                onChange={(event) => setOwnThought(event.target.value)}
                className={`mt-2 ${inputClass}`}
              />
              <p className="mt-2 text-sm">{t.privacy}</p>
              <button type="submit" className={`mt-3 ${primaryClass}`}>
                {t.next}
              </button>
            </form>
          )}
          <button
            type="button"
            onClick={onClose}
            className={`mt-4 -ml-3 ${quietClass}`}
          >
            {t.stop}
          </button>
        </>
      )}

      {step !== 'pick' && firstThought && (
        <p className="text-sm">
          {t.yourThought}:{' '}
          <span className="font-bold">&ldquo;{firstThought}&rdquo;</span>
        </p>
      )}

      {step === 'rate' && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-poppins font-bold focus:outline-none"
          >
            {t.rateTitle}
          </p>
          {beliefScale((rating) => {
            setBefore(rating);
            setStep('trap');
          }, before)}
        </>
      )}

      {step === 'trap' && trap && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 text-sm focus:outline-none"
          >
            {t.trapIntro}
          </p>
          <p className="mt-1 font-playfair text-2xl leading-snug">
            {TRAPS[trap].name[lang]}
          </p>
          <p className="mt-2 leading-relaxed">{TRAPS[trap].means[lang]}</p>
          <p className="mt-4 border-l-4 border-[#AEC488] pl-4 leading-relaxed">
            <span className="block text-sm">{t.askYourself}</span>
            <span className="font-bold">{TRAPS[trap].ask[lang]}</span>
          </p>
          <button
            type="button"
            onClick={() => setStep('balance')}
            className={`mt-5 ${primaryClass}`}
          >
            {t.next}
          </button>
        </>
      )}

      {step === 'trap' && !trap && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-poppins font-bold focus:outline-none"
          >
            {t.whichTrap}
          </p>
          <div className="mt-4 grid gap-2">
            {TRAP_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTrap(id)}
                className={optionClass}
              >
                <span className="block">{TRAPS[id].name[lang]}</span>
                <span className="block font-dm-sans text-sm font-normal">
                  {TRAPS[id].means[lang]}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 'balance' && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-poppins font-bold focus:outline-none"
          >
            {t.balanceTitle}
          </p>
          <p className="mt-1 text-sm">{t.balanceHint}</p>
          <div className="mt-4 grid gap-2">
            {choices.map((line) => (
              <button
                key={line}
                type="button"
                aria-pressed={balanced === line}
                onClick={() => setBalanced(line)}
                className={optionClass}
              >
                {line}
              </button>
            ))}
          </div>
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (ownBalanced.trim()) setBalanced(ownBalanced.trim());
            }}
          >
            <label htmlFor="thought-balanced" className="text-sm">
              {t.ownLabel}
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="thought-balanced"
                value={ownBalanced}
                maxLength={MAX_NOTE_LENGTH}
                autoComplete="off"
                onChange={(event) => setOwnBalanced(event.target.value)}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={!ownBalanced.trim()}
                className={`shrink-0 ${quietClass} border border-[#AEC488] bg-white`}
              >
                {t.useOwn}
              </button>
            </div>
          </form>
          {balanced && (
            <div className="mt-5 rounded-xl bg-white p-5" aria-live="polite">
              <p className="text-sm">{t.readSlowly}</p>
              <p className="mt-2 font-playfair text-2xl leading-snug">
                {balanced}
              </p>
              <button
                type="button"
                onClick={() => setStep('again')}
                className={`mt-4 ${primaryClass}`}
              >
                {t.next}
              </button>
            </div>
          )}
        </>
      )}

      {step === 'again' && (
        <>
          <p
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-poppins font-bold focus:outline-none"
          >
            {t.rateAgain}
          </p>
          {beliefScale(finish)}
        </>
      )}
    </div>
  );
}
