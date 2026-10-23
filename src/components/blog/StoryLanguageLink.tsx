'use client';

import Link from 'next/link';
import { Languages } from 'lucide-react';
import type { FeelingLang } from '@/lib/feelingPages';
import { setLanguage } from '@/lib/languagePreference';

/**
 * To the same story in the other language. The choice is remembered, so
 * the blog page then lists the stories in that language too.
 */
export function StoryLanguageLink({
  href,
  lang,
  label,
}: {
  href: string;
  /** The language the link goes to. */
  lang: FeelingLang;
  label: string;
}) {
  return (
    <Link
      href={href}
      hrefLang={lang === 'tl' ? 'tl' : 'en'}
      lang={lang === 'tl' ? 'tl' : 'en'}
      onClick={() => setLanguage(lang)}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DFE7CF] bg-white px-4 font-poppins text-sm font-medium transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
    >
      <Languages className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  );
}
