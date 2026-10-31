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
  fr: {
    label: 'Une petite chose',
    pickTitle: 'Choisis une petite chose que tu peux finir en 10 minutes.',
    options: [
      'Prendre une douche',
      'Manger quelque chose',
      'Sortir 5 minutes',
      'Boire un verre d’eau',
      'Ranger un petit coin',
      'Envoyer un message à quelqu’un',
      '10 minutes sur une tâche que je repousse',
    ],
    ownLabel: 'Ou écris la tienne',
    useOwn: 'Choisir',
    yours: 'Ce que tu as choisi :',
    doIt: 'Fais-le maintenant si tu peux. Sinon, garde-le pour demain.',
    did: 'C’est fait',
    later: 'Garder pour demain',
    another: 'Choisir autre chose',
    saved: 'Enregistré sur ce téléphone. Ce sera encore là demain.',
    close: 'Fermer',
    stop: 'Arrêter',
    doneTitle: 'Tu l’as fait.',
    doneText:
      'Les petites choses comptent. On se sent souvent mieux après avoir agi.',
    nextTime: 'tu te sens à plat ou que tout te pèse',
  },
  de: {
    label: 'Eine kleine Sache',
    pickTitle:
      'Such dir eine kleine Sache aus, die du in 10 Minuten schaffen kannst.',
    options: [
      'Duschen',
      'Etwas essen',
      '5 Minuten rausgehen',
      'Ein Glas Wasser trinken',
      'Eine kleine Ecke aufräumen',
      'Einer Person schreiben',
      '10 Minuten an etwas, das ich vor mir herschiebe',
    ],
    ownLabel: 'Oder schreib deine eigene',
    useOwn: 'Übernehmen',
    yours: 'Deine Wahl:',
    doIt: 'Mach es jetzt, wenn du kannst. Wenn nicht, heb es dir für morgen auf.',
    did: 'Erledigt',
    later: 'Für morgen aufheben',
    another: 'Etwas anderes wählen',
    saved: 'Auf diesem Handy gespeichert. Morgen ist es noch da.',
    close: 'Schließen',
    stop: 'Beenden',
    doneTitle: 'Geschafft.',
    doneText:
      'Kleine Dinge zählen. Oft kommt das bessere Gefühl erst, wenn du etwas getan hast.',
    nextTime: 'du feststeckst oder dir alles schwerfällt',
  },
  es: {
    label: 'Una cosa pequeña',
    pickTitle: 'Elige una cosa pequeña que puedas terminar en 10 minutos.',
    options: [
      'Bañarme',
      'Comer algo',
      'Salir 5 minutos',
      'Tomar un vaso de agua',
      'Ordenar un rincón',
      'Escribirle a una persona',
      '10 minutos en algo que he estado posponiendo',
    ],
    ownLabel: 'O escribe la tuya',
    useOwn: 'Usar esta',
    yours: 'Lo que elegiste:',
    doIt: 'Hazlo ahora si puedes. Si no, guárdalo para mañana.',
    did: 'Lo hice',
    later: 'Guardar para mañana',
    another: 'Elegir otra',
    saved: 'Guardado en este celular. Mañana va a seguir aquí.',
    close: 'Cerrar',
    stop: 'Detener',
    doneTitle: 'Lo hiciste.',
    doneText:
      'Las cosas pequeñas cuentan. Muchas veces te sientes mejor después de hacer algo.',
    nextTime: 'sientas que no avanzas o que todo te pesa',
  },
  ko: {
    label: '작은 일 하나',
    pickTitle: '10분 안에 끝낼 수 있는 작은 일을 하나 골라 보세요',
    options: [
      '샤워하기',
      '뭐라도 먹기',
      '5분 동안 밖에 나가기',
      '물 한 잔 마시기',
      '작은 구석 하나 정리하기',
      '한 사람에게 메시지 보내기',
      '미뤄 둔 일 10분만 하기',
    ],
    ownLabel: '또는 직접 적기',
    useOwn: '이걸로 할래요',
    yours: '내가 고른 일:',
    doIt: '할 수 있다면 지금 해 보세요. 어렵다면 내일 하도록 남겨 두세요.',
    did: '했어요',
    later: '내일 하기',
    another: '다른 거 고르기',
    saved: '이 휴대폰에 저장했어요. 내일도 여기 있을 거예요.',
    close: '닫기',
    stop: '그만하기',
    doneTitle: '해냈어요',
    doneText:
      '작은 일도 의미가 있어요. 기분은 움직이고 나서 따라올 때가 많아요.',
    nextTime: '꼼짝하기 싫거나 마음이 무거울 때',
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
          <ul className="mt-3 divide-y divide-[#DFE7CF] border-y border-[#DFE7CF]">
            {t.options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => setChosen(option)}
                  className="flex min-h-12 w-full items-center text-left text-[#6E5F47] transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#91AFAA]/40"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
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
