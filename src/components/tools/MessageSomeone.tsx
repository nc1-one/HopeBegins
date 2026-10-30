'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { FeelingLang } from '@/lib/feelingPages';
import { analyticsService } from '@/services/analyticsService';

const text = {
  tl: {
    intro:
      'Pumili ng isang taong pinagkakatiwalaan mo at i-send ito. Puwede mong ikuwento ang iba kapag nag-usap na kayo.',
    message:
      'Hi, puwede ba tayong mag-usap ngayong linggo? Medyo mabigat lang ako lately.',
    copy: 'I-copy ang message',
    copied: 'Na-copy na',
    manual:
      'Naka-highlight na ang message. Pindutin ito nang matagal para i-copy.',
  },
  en: {
    intro:
      'Pick one person you trust and send them this. You can say more when you talk.',
    message:
      "Hi, can we talk sometime this week? I've been having a hard time lately.",
    copy: 'Copy the message',
    copied: 'Copied',
    manual: 'The message is highlighted. Press and hold it to copy.',
  },
  fr: {
    intro:
      'Choisis une personne de confiance et envoie-lui ce message. Tu pourras en dire plus de vive voix.',
    message:
      'Coucou, on peut se parler cette semaine ? C’est un peu dur pour moi en ce moment.',
    copy: 'Copier le message',
    copied: 'Copié',
    manual:
      'Le message est sélectionné. Appuie longuement dessus pour le copier.',
  },
  de: {
    intro:
      'Such dir eine Person aus, der du vertraust, und schick ihr das. Mehr erzählen kannst du, wenn ihr redet.',
    message:
      'Hey, hast du diese Woche mal Zeit zum Reden? Mir geht’s in letzter Zeit nicht so gut.',
    copy: 'Nachricht kopieren',
    copied: 'Kopiert',
    manual:
      'Die Nachricht ist markiert. Halte sie gedrückt, um sie zu kopieren.',
  },
  es: {
    intro:
      'Elige a una persona de confianza y mándale esto. Puedes contarle más cuando hablen.',
    message:
      'Hola, ¿podemos hablar esta semana? Últimamente no la he pasado muy bien.',
    copy: 'Copiar el mensaje',
    copied: 'Copiado',
    manual:
      'El mensaje está seleccionado. Mantén el dedo encima para copiarlo.',
  },
  ko: {
    intro:
      '믿을 수 있는 사람 한 명을 골라 이 메시지를 보내 보세요. 더 하고 싶은 말은 이야기할 때 하면 돼요.',
    message: '혹시 이번 주에 잠깐 얘기할 수 있어? 요즘 좀 힘들어서.',
    copy: '메시지 복사하기',
    copied: '복사했어요',
    manual: '메시지를 선택해 두었어요. 길게 눌러서 복사하세요.',
  },
};

/** A ready-made message to send to one person the visitor trusts. */
export function MessageSomeone({ lang = 'tl' }: { lang?: FeelingLang }) {
  const t = text[lang];
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const messageRef = useRef<HTMLQuoteElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.message);
      setCopied(true);
      analyticsService.recordClick('tool_message_copy');
    } catch {
      // Clipboard blocked: select the message so it can be copied by hand.
      const node = messageRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setManual(true);
    }
  };

  return (
    <div className="rounded-2xl bg-[#EFF3E7] p-6">
      <p className="text-[#6E5F47]">{t.intro}</p>
      <blockquote
        ref={messageRef}
        className="mt-4 rounded-xl bg-white p-4 font-poppins text-[#6E5F47]"
      >
        {t.message}
      </blockquote>
      <button
        type="button"
        onClick={copy}
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? t.copied : t.copy}
      </button>
      {manual && !copied && (
        <p className="mt-2 text-sm text-[#6E5F47]" role="status">
          {t.manual}
        </p>
      )}
    </div>
  );
}
