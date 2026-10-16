'use client';

import { FindThePair } from '@/components/tools/FindThePair';
import { ExerciseLauncher } from '@/components/tools/ExerciseLauncher';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { useLanguage } from '@/lib/languagePreference';

const copy = {
  en: {
    title: 'Play for a bit.',
    subtitle:
      'When your thoughts keep going round, give your mind something small to do for a few minutes. Tap two cards. If they match, they stay up.',
    after: 'If your body still feels tense after the game',
  },
  tl: {
    title: 'Laro muna.',
    subtitle:
      'Kapag paulit-ulit ang iniisip mo, bigyan mo muna ng maliit na gagawin ang isip mo, kahit ilang minuto lang. Pumili ng dalawang card. Kapag magkapares, maiiwan silang bukas.',
    after: 'Kung tensyonado pa rin ang katawan mo pagkatapos ng laro',
  },
};

export function LaroMuna() {
  const lang = useLanguage();
  const t = copy[lang];

  return (
    <div lang={lang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <div className="mb-6 flex justify-end">
            <LanguageSwitch />
          </div>
          <OptionPageHeader title={t.title} subtitle={t.subtitle} />

          <div className="mt-8">
            <FindThePair lang={lang} source="page" autoFocus={false} />
          </div>

          <section aria-labelledby="after-title" className="mt-10">
            <h2
              id="after-title"
              className="font-poppins font-bold text-lg text-[#6E5F47]"
            >
              {t.after}
            </h2>
            <div className="mt-3">
              <ExerciseLauncher kind="breathe" lang={lang} source="page" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
