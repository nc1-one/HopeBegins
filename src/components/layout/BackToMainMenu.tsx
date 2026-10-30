'use client';

import Link from '@/components/ui/LocalLink';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { PerLang } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';
import { englishPath } from '@/lib/taglishTwins';

const label: PerLang<string> = {
  en: 'Back to main menu',
  tl: 'Bumalik sa main menu',
  fr: 'Retour au menu principal',
  de: 'Zurück zum Hauptmenü',
  es: 'Volver al menú principal',
  ko: '메인 메뉴로 돌아가기',
};

// Pages reached from the homepage options screen (/#start)
const OPTION_PAGES = [
  '/get-started',
  '/action-plan',
  '/prayers',
  '/hope-ai',
  '/hopecasts',
  '/daily-hope',
  '/give-hope',
  '/laro-muna',
  '/tools',
  '/check-in',
];

export function BackToMainMenu() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  if (!OPTION_PAGES.includes(englishPath(pathname))) return null;

  return (
    <div className="px-6 pt-6 print:hidden">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#start"
          lang={lang}
          className="inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
        >
          <ArrowLeft className="w-4 h-4" />
          {label[lang]}
        </Link>
      </div>
    </div>
  );
}
