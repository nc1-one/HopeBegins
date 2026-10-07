'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Pages reached from the homepage options screen (/#start)
const OPTION_PAGES = [
  '/get-started',
  '/action-plan',
  '/prayers',
  '/hope-ai',
  '/hopecasts',
  '/daily-hope',
  '/give-hope',
];

export function BackToMainMenu() {
  const pathname = usePathname();
  if (!OPTION_PAGES.includes(pathname)) return null;

  return (
    <div className="px-6 pt-6 print:hidden">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#start"
          className="inline-flex items-center gap-2 -ml-3 rounded-xl px-3 py-2 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to main menu
        </Link>
      </div>
    </div>
  );
}
