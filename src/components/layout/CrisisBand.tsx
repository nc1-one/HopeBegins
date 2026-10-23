'use client';

import { usePathname } from 'next/navigation';
import { feelingSlugs } from '@/lib/feelingPages';
import { storySlugAt } from '@/lib/blog/meta';
import { usePageLanguage } from '@/lib/pageLanguage';

const copy = {
  en: {
    title: 'In crisis or thinking of ending your life?',
    call: 'Call the NCMH Crisis Hotline, 24/7:',
    or: 'or',
    danger: 'If you are in immediate danger, call 911.',
  },
  tl: {
    title: 'Nasa crisis ka ba o naiisip mong tapusin ang buhay mo?',
    call: 'Tumawag sa NCMH Crisis Hotline, 24/7:',
    or: 'o',
    danger: 'Kung nasa panganib ka ngayon, tumawag sa 911.',
  },
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
  const t = copy[lang];
  // Every blog story is about a hard season, so they get it too.
  if (!HELP_PAGES.includes(pathname) && !storySlugAt(pathname)) return null;

  return (
    <aside
      aria-label="Crisis support"
      lang={lang}
      className="bg-[#EFF3E7] px-6 py-6 print:hidden"
    >
      <p className="mx-auto max-w-5xl text-sm leading-relaxed text-[#6E5F47]">
        <span className="font-bold">{t.title}</span> {t.call}{' '}
        <a
          href="tel:1553"
          className="font-bold underline underline-offset-4 whitespace-nowrap"
        >
          1553
        </a>{' '}
        {t.or}{' '}
        <a
          href="tel:+639178998727"
          className="font-bold underline underline-offset-4 whitespace-nowrap"
        >
          0917 899 8727
        </a>
        . {t.danger}
      </p>
    </aside>
  );
}
