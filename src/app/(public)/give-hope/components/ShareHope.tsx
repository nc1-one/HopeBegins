'use client';

import { useState } from 'react';
import { secondaryClass } from '@/components/tools/toolStyles';
import {
  isIntlLang,
  noTl,
  withLocale,
  type Lang,
  type PerLangNoTl,
} from '@/lib/i18n';
import { analyticsService } from '@/services/analyticsService';

const SITE = 'https://hopebegins.today';

const copy: PerLangNoTl<{
  /** What the share sheet sends with the link. */
  shareText: string;
  title: string;
  text: string;
  button: string;
  copied: string;
  copyThis: (url: string) => string;
}> = {
  en: {
    shareText:
      'Free help for Filipinos who feel anxious or low, in English or Taglish.',
    title: "Can't give right now?",
    text: 'Send HopeBegins to one person who has been having a hard time. That helps too.',
    button: 'Share HopeBegins',
    copied: 'Link copied.',
    copyThis: (url) => `Copy this link: ${url}`,
  },
  fr: {
    shareText:
      'De l’aide gratuite pour les jours d’anxiété ou de déprime, maintenant aussi en français.',
    title: 'Tu ne peux pas donner pour l’instant ?',
    text: 'Envoie HopeBegins à une personne qui traverse une période difficile. Ça aide aussi.',
    button: 'Partager HopeBegins',
    copied: 'Lien copié.',
    copyThis: (url) => `Copie ce lien : ${url}`,
  },
  de: {
    shareText:
      'Kostenlose Hilfe, wenn du Angst hast oder niedergeschlagen bist, jetzt auch auf Deutsch.',
    title: 'Gerade keine Spende möglich?',
    text: 'Schick HopeBegins an einen Menschen, der es gerade schwer hat. Das hilft auch.',
    button: 'HopeBegins teilen',
    copied: 'Link kopiert.',
    copyThis: (url) => `Kopier diesen Link: ${url}`,
  },
  es: {
    shareText:
      'Ayuda gratuita cuando sientes ansiedad o tristeza, ahora también en español.',
    title: '¿No puedes donar ahora?',
    text: 'Envía HopeBegins a una persona que la esté pasando mal. Eso también ayuda.',
    button: 'Compartir HopeBegins',
    copied: 'Enlace copiado.',
    copyThis: (url) => `Copia este enlace: ${url}`,
  },
  ko: {
    shareText:
      '불안하거나 마음이 힘들 때 받을 수 있는 무료 도움, 이제 한국어로도 있어요.',
    title: '지금은 후원이 어렵나요?',
    text: '요즘 힘든 시간을 보내는 한 사람에게 HopeBegins를 보내 주세요. 그것도 도움이 돼요.',
    button: 'HopeBegins 공유하기',
    copied: '링크를 복사했어요.',
    copyThis: (url) => `이 링크를 복사하세요: ${url}`,
  },
};

/** A third way to give: pass HopeBegins on to someone who needs it. */
export function ShareHope({ lang }: { lang: Lang }) {
  const t = noTl(copy, lang);
  // The home page in the reader's language, so the link and its words agree.
  const url = isIntlLang(lang) ? `${SITE}${withLocale(lang, '/')}` : SITE;
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const share = async () => {
    analyticsService.recordClick('give_share');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'HopeBegins', text: t.shareText, url });
      } catch {
        // They closed the share sheet: nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section
      aria-labelledby="share-title"
      className="flex flex-col gap-5 border-t border-[#E2DFDA] pt-10 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h2
          id="share-title"
          className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-xl text-[#6E5F47] leading-relaxed md:text-lg">
          {t.text}
        </p>
      </div>
      <div className="shrink-0">
        <button type="button" onClick={share} className={secondaryClass}>
          {t.button}
        </button>
        <p role="status" className="mt-2 min-h-5 text-sm text-[#6E5F47]">
          {status === 'copied'
            ? t.copied
            : status === 'failed'
              ? t.copyThis(url)
              : ''}
        </p>
      </div>
    </section>
  );
}
