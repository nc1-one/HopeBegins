'use client';

import { DailyHopeForm } from './components/DailyHopeForm';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

const copy: PerLangNoTl<{
  title: string;
  subtitle: string;
}> = {
  en: {
    title: 'I need Daily Hope',
    subtitle: 'A short, encouraging email every day for 21 days. Free.',
  },
  fr: {
    title: 'J’ai besoin de Daily Hope',
    subtitle:
      'Un court e-mail d’encouragement chaque jour pendant 21 jours. C’est gratuit.',
  },
  de: {
    title: 'Ich brauche Daily Hope',
    subtitle:
      '21 Tage lang jeden Tag eine kurze, ermutigende E-Mail. Kostenlos.',
  },
  es: {
    title: 'Necesito Daily Hope',
    subtitle:
      'Un correo corto para darte ánimo, cada día durante 21 días. Gratis.',
  },
  ko: {
    title: 'Daily Hope가 필요해요',
    subtitle: '21일 동안 매일 짧은 격려 이메일을 보내 드려요. 무료예요.',
  },
};

export default function DailyHopePage() {
  const t = noTl(copy, usePageLanguage());
  return (
    <div className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          <div className="mt-8">
            <DailyHopeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
