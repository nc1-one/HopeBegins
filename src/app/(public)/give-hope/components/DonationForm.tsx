'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';

const copy: PerLangNoTl<{
  form: string;
  loading: string;
  /** "If it doesn't show up, [give on Donorbox] instead." */
  missing: [string, string, string];
}> = {
  en: {
    form: 'Donation form',
    loading: 'Loading the donation form…',
    missing: ["If it doesn't show up, ", 'give on Donorbox', ' instead.'],
  },
  fr: {
    form: 'Formulaire de don',
    loading: 'Chargement du formulaire de don…',
    missing: ['S’il ne s’affiche pas, ', 'fais ton don sur Donorbox', '.'],
  },
  de: {
    form: 'Spendenformular',
    loading: 'Das Spendenformular wird geladen…',
    missing: ['Falls es nicht erscheint, ', 'spende direkt bei Donorbox', '.'],
  },
  es: {
    form: 'Formulario de donación',
    loading: 'Cargando el formulario de donación…',
    missing: ['Si no aparece, ', 'dona directamente en Donorbox', '.'],
  },
  ko: {
    form: '후원 양식',
    loading: '후원 양식을 불러오는 중…',
    missing: ['양식이 보이지 않으면 ', 'Donorbox에서 바로 후원하세요', '.'],
  },
};

const FORM_URL = 'https://donorbox.org/embed/hope-begins-plant-a-hope-seed';
// The same campaign on Donorbox's own site, for when the frame is blocked.
const CAMPAIGN_URL = 'https://donorbox.org/hope-begins-plant-a-hope-seed';

const frameStyle = {
  maxWidth: '500px',
  minWidth: '250px',
  maxHeight: 'none',
  display: 'block',
} as const;

/** True once the page's own photo and text have loaded and the browser is free. */
function useAfterPageLoad(enabled: boolean) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || ready) return;
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(() => setReady(true), {
          timeout: 2000,
        });
      } else {
        // No idle callback (older Safari): a short pause instead.
        timer = setTimeout(() => setReady(true), 300);
      }
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, [enabled, ready]);

  return ready;
}

/**
 * The Donorbox form. It brings Stripe, Google Pay and hCaptcha with it,
 * about 4 MB, so it starts once the page's own photo and text have loaded,
 * and only when the gift is the way picked; once started, it stays. Until
 * the form is there, the same space says it's coming. Donorbox's script
 * sizes the frame to the form's real height; the 900px is only the size
 * until then.
 */
export function DonationForm({ shown, lang }: { shown: boolean; lang: Lang }) {
  const t = noTl(copy, lang);
  const ready = useAfterPageLoad(shown);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section aria-label={t.form} className="relative min-w-0">
      {!isLoaded && (
        <div
          role="status"
          className="absolute inset-x-0 top-0 max-w-[500px] rounded-2xl border border-[#E6EBDD] bg-[#F7F9F3] px-5 py-6 text-[#6E5F47]"
        >
          <p className="font-poppins font-semibold">{t.loading}</p>
          <p className="mt-2 text-sm leading-relaxed">
            {t.missing[0]}
            <a
              href={CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4"
            >
              {t.missing[1]}
            </a>
            {t.missing[2]}
          </p>
        </div>
      )}
      {ready ? (
        <>
          <Script src="https://donorbox.org/widget.js" />
          <iframe
            src={FORM_URL}
            title={t.form}
            name="donorbox"
            {...{ allowpaymentrequest: 'true' }}
            seamless
            frameBorder="0"
            scrolling="no"
            height="900px"
            width="100%"
            style={frameStyle}
            allow="payment"
            onLoad={() => setIsLoaded(true)}
          />
        </>
      ) : (
        // Holds the form's place, so nothing moves when it arrives.
        <div aria-hidden style={{ ...frameStyle, height: '900px' }} />
      )}
    </section>
  );
}
