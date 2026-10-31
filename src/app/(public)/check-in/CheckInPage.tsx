'use client';

import { DailyCheckIn } from '@/components/checkin/DailyCheckIn';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import type { PerLang } from '@/lib/i18n';
import { useLanguage } from '@/lib/languagePreference';

const copy: PerLang<{ title: string; subtitle: string }> = {
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
  // The sampaguita is a jasmine; readers outside the Philippines know that name.
  fr: {
    title: 'Bilan du jour',
    subtitle:
      'Quelques touches, environ 20 secondes. Reviens chaque jour et regarde ton jasmin grandir.',
  },
  de: {
    title: 'Täglicher Check-in',
    subtitle:
      'Ein paar Mal tippen, etwa 20 Sekunden. Komm jeden Tag wieder und sieh zu, wie dein Jasmin wächst.',
  },
  es: {
    title: 'Chequeo diario',
    subtitle:
      'Unos toques, unos 20 segundos. Vuelve cada día y mira cómo crece tu jazmín.',
  },
  ko: {
    title: '오늘의 체크인',
    subtitle:
      '몇 번만 누르면 돼요. 20초 정도 걸려요. 매일 다시 와서 재스민이 자라는 모습을 지켜보세요.',
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
