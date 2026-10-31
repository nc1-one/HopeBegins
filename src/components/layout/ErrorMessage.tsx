'use client';

import { useEffect } from 'react';
import Link from '@/components/ui/LocalLink';
import { CrisisSentence } from '@/components/help/Crisis';
import type { Lang, PerLang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { reloadIfStale } from '@/lib/staleBuild';

export const errorCopy: PerLang<{
  title: string;
  text: string;
  retry: string;
  home: string;
}> = {
  en: {
    title: 'Something went wrong on this page.',
    text: 'Try again, or go to the home page. Everything you saved on this phone is still there.',
    retry: 'Try again',
    home: 'Go to the home page',
  },
  tl: {
    title: 'May nagka-problema sa page na ito.',
    text: 'Subukan ulit, o pumunta sa home page. Nandiyan pa rin ang lahat ng na-save mo sa phone na ito.',
    retry: 'Subukan ulit',
    home: 'Pumunta sa home page',
  },
  fr: {
    title: 'Un problème est survenu sur cette page.',
    text: 'Réessaie, ou va à l’accueil. Tout ce que tu as enregistré sur ce téléphone est toujours là.',
    retry: 'Réessayer',
    home: 'Aller à l’accueil',
  },
  de: {
    title: 'Auf dieser Seite ist etwas schiefgelaufen.',
    text: 'Versuch es noch einmal oder geh zur Startseite. Alles, was du auf diesem Handy gespeichert hast, ist noch da.',
    retry: 'Noch einmal versuchen',
    home: 'Zur Startseite',
  },
  es: {
    title: 'Algo salió mal en esta página.',
    text: 'Vuelve a intentarlo o ve al inicio. Todo lo que guardaste en este celular sigue ahí.',
    retry: 'Volver a intentar',
    home: 'Ir al inicio',
  },
  ko: {
    title: '이 페이지에 문제가 생겼어요',
    text: '다시 시도하거나 첫 화면으로 가 보세요. 이 휴대폰에 저장한 내용은 그대로 있어요.',
    retry: '다시 시도',
    home: '첫 화면으로',
  },
};

/**
 * Shown in place of a page that broke, inside the site's header and
 * footer, with a way back and the crisis line. A page opened before the
 * latest version went live reloads itself instead (see staleBuild.ts).
 */
export function ErrorMessage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const lang: Lang = usePageLanguage();
  const t = errorCopy[lang];

  useEffect(() => {
    if (!reloadIfStale(error)) console.error(error);
  }, [error]);

  return (
    <div lang={lang} className="max-w-2xl">
      <h1 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
        {t.title}
      </h1>
      <p className="mt-4 font-poppins text-lg text-[#6E5F47] leading-[1.4]">
        {t.text}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
        >
          {t.retry}
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-6 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
        >
          {t.home}
        </Link>
      </div>
      <p className="mt-10 text-[#6E5F47] leading-relaxed">
        <CrisisSentence lang={lang} lead />
      </p>
    </div>
  );
}
