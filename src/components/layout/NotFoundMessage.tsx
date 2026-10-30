'use client';

import Link from '@/components/ui/LocalLink';
import { CrisisSentence } from '@/components/help/Crisis';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

const copy: PerLangNoTl<{
  title: string;
  text: string;
  help: string;
  plan: string;
}> = {
  en: {
    title: "We couldn't find that page.",
    text: 'The link may be old or mistyped. Here is where to go next.',
    help: 'See how we can help',
    plan: 'Open my plan',
  },
  fr: {
    title: 'Nous n’avons pas trouvé cette page.',
    text: 'Le lien est peut-être ancien ou mal saisi. Voici par où continuer.',
    help: 'Voir comment nous pouvons t’aider',
    plan: 'Ouvrir mon plan',
  },
  de: {
    title: 'Wir konnten diese Seite nicht finden.',
    text: 'Vielleicht ist der Link alt oder falsch geschrieben. Hier geht es weiter.',
    help: 'Sehen, wie wir helfen können',
    plan: 'Meinen Plan öffnen',
  },
  es: {
    title: 'No encontramos esa página.',
    text: 'Puede que el enlace sea antiguo o tenga un error. Aquí tienes por dónde seguir.',
    help: 'Ver cómo podemos ayudarte',
    plan: 'Abrir mi plan',
  },
  ko: {
    title: '페이지를 찾을 수 없어요',
    text: '링크가 오래됐거나 잘못 입력됐을 수 있어요. 여기서 다시 시작해 보세요.',
    help: '도움받을 수 있는 방법 보기',
    plan: '내 계획 열기',
  },
};

/**
 * The words of the "page not found" page, in the language of the address:
 * an unknown /fr/… address gets French, and its links stay in French.
 */
export function NotFoundMessage() {
  const lang = usePageLanguage();
  const t = noTl(copy, lang);

  return (
    <>
      <p className="font-poppins text-sm font-bold text-[#6E5F47]">404</p>
      <h1 className="mt-2 text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
        {t.title}
      </h1>
      <p className="mt-4 font-poppins text-lg text-[#6E5F47] leading-[1.4]">
        {t.text}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/#start"
          className="inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-6 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
        >
          {t.help}
        </Link>
        <Link
          href="/action-plan"
          className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-6 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
        >
          {t.plan}
        </Link>
      </div>
      <p className="mt-10 text-[#6E5F47] leading-relaxed">
        <CrisisSentence lang={lang} lead />
      </p>
    </>
  );
}
