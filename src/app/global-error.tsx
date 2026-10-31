'use client';

import './globals.css';
import { useEffect, useSyncExternalStore } from 'react';
import { CrisisSentence } from '@/components/help/Crisis';
import { errorCopy } from '@/components/layout/ErrorMessage';
import { LANG_INFO, localeAt, withLocale, type Lang } from '@/lib/i18n';
import { savedLanguage } from '@/lib/languagePreference';
import { reloadIfStale } from '@/lib/staleBuild';

const pageLanguage = (): Lang => {
  const locale = localeAt(window.location.pathname);
  return locale ?? (savedLanguage() === 'tl' ? 'tl' : 'en');
};

/**
 * Shown when even the site's frame breaks: no header or footer, only the
 * words, a way back and the crisis line. Without its own styles loaded it
 * still reads as plain text.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang = useSyncExternalStore(
    () => () => {},
    pageLanguage,
    () => 'en' as Lang
  );
  const t = errorCopy[lang];
  const locale = localeAt(`/${lang}`);

  useEffect(() => {
    if (!reloadIfStale(error)) console.error(error);
  }, [error]);

  return (
    <html lang={LANG_INFO[lang].htmlLang}>
      <body className="bg-[#fcfdfa] font-sans text-[#6E5F47]">
        <main className="mx-auto max-w-2xl px-6 py-16">
          <p className="font-bold">HopeBegins</p>
          <h1 className="mt-8 text-balance text-4xl font-bold leading-tight">
            {t.title}
          </h1>
          <p className="mt-4 text-lg leading-snug">{t.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-6 font-bold text-white"
            >
              {t.retry}
            </button>
            <a
              href={locale ? withLocale(locale, '/') : '/'}
              className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-6 font-bold"
            >
              {t.home}
            </a>
          </div>
          <p className="mt-10 leading-relaxed">
            <CrisisSentence lang={lang} lead />
          </p>
        </main>
      </body>
    </html>
  );
}
