'use client';

import { PrayerForm } from './components/PrayerForm';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

// Hope Carriers live in the Philippines and pray in English and Filipino,
// so the other languages say so before anyone writes.
const copy: PerLangNoTl<{
  title: string;
  subtitle: string;
  language?: string;
}> = {
  en: {
    title: 'I need someone to pray for me',
    subtitle: 'A Hope Carrier will pray for you.',
  },
  fr: {
    title: 'J’ai besoin que quelqu’un prie pour moi',
    subtitle: 'Un Hope Carrier va prier pour toi.',
    language:
      'Nos Hope Carriers vivent aux Philippines et prient en anglais et en filipino. Tu peux écrire en anglais ou dans ta langue.',
  },
  de: {
    title: 'Ich brauche jemanden, der für mich betet',
    subtitle: 'Ein Hope Carrier wird für dich beten.',
    language:
      'Unsere Hope Carrier leben auf den Philippinen und beten auf Englisch und Filipino. Du kannst auf Englisch oder in deiner eigenen Sprache schreiben.',
  },
  es: {
    title: 'Necesito que alguien ore por mí',
    subtitle: 'Un Hope Carrier va a orar por ti.',
    language:
      'Nuestros Hope Carriers viven en Filipinas y oran en inglés y en filipino. Puedes escribir en inglés o en tu propio idioma.',
  },
  ko: {
    title: '저를 위해 기도해 줄 사람이 필요해요',
    subtitle: 'Hope Carrier가 당신을 위해 기도해 줄 거예요.',
    language:
      'Hope Carrier들은 필리핀에 있고 영어와 필리핀어로 기도해요. 영어로 써도 되고, 편한 언어로 써도 돼요.',
  },
};

export default function PrayersPage() {
  const t = noTl(copy, usePageLanguage());
  return (
    <div className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />
          {t.language && (
            <p className="mt-4 text-sm text-[#6E5F47]">{t.language}</p>
          )}
          <div className="mt-8">
            <PrayerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
