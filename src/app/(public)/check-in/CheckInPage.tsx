'use client';

import { DailyCheckIn } from '@/components/checkin/DailyCheckIn';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { useLanguage } from '@/lib/languagePreference';

const copy = {
  en: {
    title: 'Daily check-in',
    subtitle:
      'A few taps, about 20 seconds. Come back each day and watch your sampaguita grow.',
  },
  tl: {
    title: 'Daily check-in',
    subtitle:
      'Ilang tap lang, mga 20 segundo. Bumalik araw-araw at panoorin ang paglaki ng sampaguita mo.',
  },
};

export function CheckInPage() {
  const lang = useLanguage();
  const t = copy[lang];
  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          <div className="self-end sm:self-auto">
            <LanguageSwitch />
          </div>
        </div>
        <div className="mt-10">
          <DailyCheckIn lang={lang} />
        </div>
      </div>
    </div>
  );
}
