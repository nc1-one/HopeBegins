'use client';

import { usePathname } from 'next/navigation';

// Help pages where someone in distress may land straight from a link.
const HELP_PAGES = [
  '/get-started',
  '/action-plan',
  '/prayers',
  '/hope-ai',
  '/hopecasts',
  '/daily-hope',
];

export function CrisisBand() {
  const pathname = usePathname();
  if (!HELP_PAGES.includes(pathname)) return null;

  return (
    <aside
      aria-label="Crisis support"
      className="bg-[#EFF3E7] px-6 py-6 print:hidden"
    >
      <p className="mx-auto max-w-5xl text-sm leading-relaxed text-[#6E5F47]">
        <span className="font-bold">
          In crisis or thinking of ending your life?
        </span>{' '}
        Call the NCMH Crisis Hotline, 24/7:{' '}
        <a
          href="tel:1553"
          className="font-bold underline underline-offset-4 whitespace-nowrap"
        >
          1553
        </a>{' '}
        or{' '}
        <a
          href="tel:+639178998727"
          className="font-bold underline underline-offset-4 whitespace-nowrap"
        >
          0917 899 8727
        </a>
        . If you are in immediate danger, call 911.
      </p>
    </aside>
  );
}
