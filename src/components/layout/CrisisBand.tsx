'use client';

import { usePathname } from 'next/navigation';
import { feelingSlugs } from '@/lib/feelingPages';
import { storySlugAt } from '@/lib/blog/meta';
import { usePageLanguage } from '@/lib/pageLanguage';
import { englishPathOf } from '@/lib/intlRoutes';
import { CrisisSentence } from '@/components/help/Crisis';

const label = {
  en: 'Crisis support',
  tl: 'Tulong sa crisis',
  fr: 'Aide en cas de crise',
  de: 'Hilfe in der Krise',
  es: 'Ayuda en crisis',
  ko: '위기 지원',
};

// Help pages where someone in distress may land straight from a link.
const HELP_PAGES = [
  '/get-started',
  '/action-plan',
  '/prayers',
  '/hope-ai',
  '/hopecasts',
  '/daily-hope',
  ...feelingSlugs,
];

export function CrisisBand() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  // Every blog story is about a hard season, so they get it too.
  const english = englishPathOf(pathname ?? '/');
  if (!HELP_PAGES.includes(english) && !storySlugAt(english)) return null;

  return (
    <aside
      aria-label={label[lang]}
      lang={lang}
      className="bg-[#EFF3E7] px-6 py-6 print:hidden"
    >
      <p className="mx-auto max-w-5xl text-sm leading-relaxed text-[#6E5F47]">
        <CrisisSentence lang={lang} lead />
      </p>
    </aside>
  );
}
