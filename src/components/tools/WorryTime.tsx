'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import {
  MAX_NOTE_LENGTH,
  MAX_WORRIES,
  saveWorries,
  useWorries,
} from '@/lib/toolNotes';
import { WORRY_TOPICS } from '@/lib/thoughts';
import { analyticsService, type ToolSource } from '@/services/analyticsService';
import { ToolFinish } from './ToolFinish';
import {
  chipClass,
  inputClass,
  panelClass,
  primaryClass,
  quietClass,
  secondaryClass,
} from './toolStyles';

/**
 * Worry time: save worries as they come, by tapping a common one or writing
 * it, then in a set 15 minutes ask of each one whether there is a step to
 * take. Worries are kept only on this
 * phone until they are dealt with; the steps aren't kept at all.
 */

const copy = {
  en: {
    label: 'Worry time',
    intro:
      'Write worries down when they come. Then deal with them in your worry time, 15 minutes at the same time each day.',
    topicsLabel: "What's on your mind? Tap to save it.",
    addLabel: 'Or write your own',
    add: 'Save it for worry time',
    count: (n: number) =>
      n === 0
        ? 'No worries saved yet.'
        : `${n} ${n === 1 ? 'worry' : 'worries'} saved for your worry time.`,
    privacy: 'Saved only on this phone.',
    start: 'Start my worry time',
    clear: 'Clear the list',
    close: 'Close',
    reviewOf: (i: number, n: number) => `Worry ${i} of ${n}`,
    ask: 'Can you do something about this?',
    yes: 'Yes',
    no: 'No, let it go for today',
    stepLabel: 'One small step you can take',
    stepIdeas: [
      'Write down the first step',
      'Ask someone for help',
      'Find out one fact',
      'Pick a time to deal with it',
      'Pray about it',
    ],
    saveStep: 'Next',
    doneTitle: 'Worry time done.',
    doneText:
      "When new worries come, write them here and leave them until tomorrow's worry time.",
    stepsTitle: 'Your steps',
    nextTime: 'worry keeps coming back during the day',
  },
  tl: {
    label: 'Worry time',
    intro:
      'Isulat ang mga pag-aalala kapag dumating. Tapos harapin ang mga ito sa worry time mo, 15 minuto sa parehong oras araw-araw.',
    topicsLabel: 'Ano ang nasa isip mo? I-tap para itabi.',
    addLabel: 'O isulat ang sa iyo',
    add: 'Itabi para sa worry time',
    count: (n: number) =>
      n === 0
        ? 'Wala pang naitabing pag-aalala.'
        : `${n} na pag-aalala ang nakatabi para sa worry time mo.`,
    privacy: 'Naka-save lang sa phone na ito.',
    start: 'Simulan ang worry time ko',
    clear: 'Burahin ang listahan',
    close: 'Isara',
    reviewOf: (i: number, n: number) => `Pag-aalala ${i} sa ${n}`,
    ask: 'May magagawa ka ba tungkol dito?',
    yes: 'Oo',
    no: 'Wala, bibitawan ko muna ngayong araw',
    stepLabel: 'Isang maliit na hakbang na kaya mong gawin',
    stepIdeas: [
      'Isulat ang unang hakbang',
      'Humingi ng tulong sa isang tao',
      'Alamin ang isang detalye',
      'Pumili ng oras para harapin ito',
      'Ipagdasal ito',
    ],
    saveStep: 'Susunod',
    doneTitle: 'Tapos na ang worry time.',
    doneText:
      'Kapag may bagong pag-aalala, isulat dito at iwan muna hanggang sa worry time bukas.',
    stepsTitle: 'Ang mga hakbang mo',
    nextTime: 'paulit-ulit na bumabalik ang pag-aalala sa maghapon',
  },
};

export function WorryTime({
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
  const worries = useWorries();
  const [draft, setDraft] = useState('');
  // The worries being gone through, fixed when worry time starts.
  const [review, setReview] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlanning, setIsPlanning] = useState(false);
  const [step, setStep] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_worry-time_start_${source}`);
  }, [source]);

  const add = (text = draft.trim()) => {
    if (!text || worries.length >= MAX_WORRIES || worries.includes(text)) {
      return;
    }
    analyticsService.recordClick(`tool_worry-time_add_${source}`);
    saveWorries([...worries, text]);
    setDraft('');
  };

  // Each worry is dealt with: off the list, with or without a step.
  const next = (newStep?: string) => {
    if (!review) return;
    const current = review[index];
    saveWorries(worries.filter((worry) => worry !== current));
    if (newStep) setSteps((list) => [...list, newStep]);
    setIsPlanning(false);
    setStep('');
    if (index + 1 < review.length) {
      setIndex(index + 1);
      return;
    }
    analyticsService.recordClick(`tool_worry-time_done_${source}`);
    onFinish?.();
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div>
        {steps.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#DFE7CF] bg-white p-5 text-[#6E5F47]">
            <p className="font-poppins font-bold">{t.stepsTitle}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-[#AEC488]">
              {steps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <ToolFinish
          kind="worry-time"
          lang={lang}
          source={source}
          title={t.doneTitle}
          text={t.doneText}
          doneNote={doneNote}
          nextTime={t.nextTime}
          onClose={onClose}
        />
      </div>
    );
  }

  if (review) {
    const worry = review[index];
    return (
      <div
        ref={boxRef}
        tabIndex={-1}
        role="group"
        aria-label={t.label}
        className={panelClass}
      >
        <p className="text-sm">{t.reviewOf(index + 1, review.length)}</p>
        <p className="mt-1 font-poppins font-bold text-lg" aria-live="polite">
          {worry}
        </p>
        {isPlanning ? (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              next(step.trim() || undefined);
            }}
          >
            <p className="text-sm font-bold">{t.stepLabel}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {t.stepIdeas.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => next(idea)}
                  className={chipClass}
                >
                  {idea}
                </button>
              ))}
            </div>
            <label htmlFor="worry-step" className="mt-4 block text-sm">
              {t.addLabel}
            </label>
            <input
              id="worry-step"
              value={step}
              maxLength={MAX_NOTE_LENGTH}
              onChange={(event) => setStep(event.target.value)}
              className={`mt-2 ${inputClass}`}
            />
            <button type="submit" className={`mt-3 ${primaryClass}`}>
              {t.saveStep}
            </button>
          </form>
        ) : (
          <>
            <p className="mt-4">{t.ask}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsPlanning(true)}
                className={secondaryClass}
              >
                {t.yes}
              </button>
              <button
                type="button"
                onClick={() => next()}
                className={secondaryClass}
              >
                {t.no}
              </button>
            </div>
          </>
        )}
      </div>
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
      <p className="mt-4 text-sm font-bold">{t.topicsLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {WORRY_TOPICS.map((topic) => {
          const isSaved = worries.includes(topic[lang]);
          return (
            <button
              key={topic.en}
              type="button"
              aria-pressed={isSaved}
              disabled={isSaved || worries.length >= MAX_WORRIES}
              onClick={() => add(topic[lang])}
              className={`${chipClass} disabled:cursor-default`}
            >
              {topic[lang]}
            </button>
          );
        })}
      </div>
      <form
        className="mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <label htmlFor="worry-new" className="text-sm">
          {t.addLabel}
        </label>
        <input
          id="worry-new"
          autoComplete="off"
          value={draft}
          maxLength={MAX_NOTE_LENGTH}
          onChange={(event) => setDraft(event.target.value)}
          className={`mt-2 ${inputClass}`}
        />
        <button
          type="submit"
          disabled={!draft.trim() || worries.length >= MAX_WORRIES}
          className={`mt-2 ${secondaryClass}`}
        >
          {t.add}
        </button>
      </form>
      <p className="mt-4 text-sm" aria-live="polite">
        {t.count(worries.length)} {worries.length > 0 && t.privacy}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={worries.length === 0}
          onClick={() => {
            setReview(worries);
            setIndex(0);
          }}
          className={primaryClass}
        >
          {t.start}
        </button>
        {worries.length > 0 && (
          <button
            type="button"
            onClick={() => saveWorries([])}
            className={quietClass}
          >
            {t.clear}
          </button>
        )}
        <button type="button" onClick={onClose} className={quietClass}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
