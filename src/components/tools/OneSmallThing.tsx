'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeelingLang } from '@/lib/feelingPages';
import {
  MAX_NOTE_LENGTH,
  localDay,
  saveSmallThing,
  useSmallThing,
} from '@/lib/toolNotes';
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
 * For low mood: pick one thing small enough to finish in 10 minutes, then
 * do it now or keep it for tomorrow. Doing comes first; feeling better
 * follows. The small thing is kept only on this phone.
 */

const copy = {
  en: {
    label: 'One small thing',
    pickTitle: 'Pick one small thing you can finish in 10 minutes.',
    options: [
      'Take a shower',
      'Eat something',
      'Step outside for 5 minutes',
      'Drink a glass of water',
      'Tidy one small spot',
      'Message one person',
      "10 minutes on a task I've been putting off",
    ],
    ownLabel: 'Or write your own',
    useOwn: 'Use this',
    yours: 'Your small thing:',
    doIt: 'Do it now if you can. If not, keep it for tomorrow.',
    did: 'I did it',
    later: 'Keep it for tomorrow',
    another: 'Pick another',
    saved: 'Saved on this phone. It will be here tomorrow.',
    close: 'Close',
    stop: 'Stop',
    doneTitle: 'You did it.',
    doneText: 'Small things count. Feeling better often comes after doing.',
    nextTime: 'you feel stuck or heavy',
  },
  tl: {
    label: 'Isang maliit na bagay',
    pickTitle:
      'Pumili ng isang maliit na bagay na kaya mong tapusin sa loob ng 10 minuto.',
    options: [
      'Maligo',
      'Kumain',
      'Lumabas nang 5 minuto',
      'Uminom ng isang basong tubig',
      'Ayusin ang isang maliit na sulok',
      'Mag-message sa isang tao',
      '10 minuto sa isang gawaing matagal ko nang pinagpapaliban',
    ],
    ownLabel: 'O isulat ang sa iyo',
    useOwn: 'Ito na',
    yours: 'Ang maliit mong gagawin:',
    doIt: 'Gawin ito ngayon kung kaya mo. Kung hindi, itabi para bukas.',
    did: 'Nagawa ko',
    later: 'Itabi para bukas',
    another: 'Pumili ng iba',
    saved: 'Naka-save sa phone na ito. Nandito ito bukas.',
    close: 'Isara',
    stop: 'Itigil',
    doneTitle: 'Nagawa mo.',
    doneText:
      'Mahalaga ang maliliit na bagay. Gumawa muna, at madalas sumusunod ang gaan ng pakiramdam.',
    nextTime: 'pakiramdam mo ay stuck ka o mabigat ang loob mo',
  },
};

export function OneSmallThing({
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
  const kept = useSmallThing();
  // A small thing kept from before comes back ready to do.
  const [chosen, setChosen] = useState<string | null>(kept?.text ?? null);
  const [own, setOwn] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    boxRef.current?.focus({ preventScroll: true });
    boxRef.current?.scrollIntoView({ block: 'nearest' });
    if (counted.current) return;
    counted.current = true;
    analyticsService.recordClick(`tool_one-thing_start_${source}`);
  }, [source]);

  const finish = () => {
    analyticsService.recordClick(`tool_one-thing_done_${source}`);
    saveSmallThing(null);
    onFinish?.();
    setIsDone(true);
  };

  const keepForTomorrow = () => {
    if (!chosen) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    analyticsService.recordClick(`tool_one-thing_later_${source}`);
    saveSmallThing({ text: chosen, day: localDay(tomorrow) });
    setIsSaved(true);
  };

  if (isDone) {
    return (
      <ToolFinish
        kind="one-thing"
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
      {chosen === null ? (
        <>
          <p className="font-poppins font-bold text-lg">{t.pickTitle}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setChosen(option)}
                className={secondaryClass}
              >
                {option}
              </button>
            ))}
          </div>
          <form
            className="mt-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (own.trim()) setChosen(own.trim());
            }}
          >
            <label htmlFor="one-thing-own" className="text-sm font-bold">
              {t.ownLabel}
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="one-thing-own"
                value={own}
                maxLength={MAX_NOTE_LENGTH}
                onChange={(event) => setOwn(event.target.value)}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={!own.trim()}
                className={primaryClass}
              >
                {t.useOwn}
              </button>
            </div>
          </form>
          <button
            type="button"
            onClick={onClose}
            className={`mt-4 ${quietClass}`}
          >
            {t.stop}
          </button>
        </>
      ) : isSaved ? (
        <div aria-live="polite">
          <p className="text-sm">{t.yours}</p>
          <p className="mt-1 font-poppins font-bold text-lg">{chosen}</p>
          <p className="mt-3">{t.saved}</p>
          <button
            type="button"
            onClick={onClose}
            className={`mt-4 ${primaryClass}`}
          >
            {t.close}
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm">{t.yours}</p>
          <p className="mt-1 font-poppins font-bold text-lg" aria-live="polite">
            {chosen}
          </p>
          <p className="mt-3">{t.doIt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={finish} className={primaryClass}>
              {t.did}
            </button>
            <button
              type="button"
              onClick={keepForTomorrow}
              className={secondaryClass}
            >
              {t.later}
            </button>
            <button
              type="button"
              onClick={() => {
                setChosen(null);
                setOwn('');
              }}
              className={quietClass}
            >
              {t.another}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
