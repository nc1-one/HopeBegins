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
  // These four have no breathing exercise below the note (they have no
  // feeling pages), so they offer a few slow breaths instead.
  fr: {
    doneTitle: 'C’est noté.',
    doneText:
      'Si ça revient cette nuit, dis-toi que tu y penseras demain. Maintenant, prends quelques respirations lentes.',
    label: 'Qu’est-ce qui t’empêche de dormir ? Touche ce qui correspond.',
    write: 'Ou écris-le ici, même en vrac.',
    privacy: 'On ne l’enregistre pas et on ne l’envoie nulle part.',
    button: 'Le mettre de côté pour demain',
  },
  de: {
    doneTitle: 'Es ist aufgeschrieben.',
    doneText:
      'Wenn es heute Nacht wiederkommt, sag dir, dass du morgen darüber nachdenkst. Atme jetzt ein paar Mal langsam ein und aus.',
    label: 'Was hält dich wach? Tippe an, was passt.',
    write: 'Oder schreib es hier auf, auch wenn es durcheinander ist.',
    privacy: 'Wir speichern das nicht und schicken es nirgendwohin.',
    button: 'Für morgen beiseitelegen',
  },
  es: {
    doneTitle: 'Ya está escrito.',
    doneText:
      'Si vuelve esta noche, dite que lo vas a pensar mañana. Ahora respira despacio unas cuantas veces.',
    label: '¿Qué no te deja dormir? Toca lo que corresponda.',
    write: 'O escríbelo aquí, aunque salga desordenado.',
    privacy: 'No lo guardamos ni lo enviamos a ningún lado.',
    button: 'Dejarlo para mañana',
  },
  ko: {
    doneTitle: '적어 두었어요.',
    doneText:
      '오늘 밤 다시 떠오르면 ‘내일 생각하자’ 하고 속으로 말해 보세요. 이제 아래에 있는 호흡을 따라 해 보세요.',
    label: '무엇 때문에 잠이 안 오나요? 해당하는 걸 눌러 주세요.',
    write: '아니면 여기에 적어 보세요. 두서없이 적어도 돼요.',
    privacy: '어디에도 저장하거나 보내지 않아요.',
    button: '내일까지 내려놓기',
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
