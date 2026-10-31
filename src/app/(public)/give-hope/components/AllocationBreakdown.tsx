import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';

const title: PerLangNoTl<string> = {
  en: 'Where your gift goes',
  fr: 'Où va ton don',
  de: 'Wohin deine Spende geht',
  es: 'A dónde va tu donación',
  ko: '후원금은 이렇게 쓰여요',
};

const ALLOCATIONS: { percent: string; label: PerLangNoTl<string> }[] = [
  {
    percent: '40%',
    label: {
      en: 'keeps the site running and free',
      fr: 'fait tourner le site et le garde gratuit',
      de: 'hält die Website am Laufen und kostenlos',
      es: 'mantiene el sitio funcionando y gratis',
      ko: '사이트를 운영하고 무료로 유지해요',
    },
  },
  {
    percent: '30%',
    label: {
      en: 'makes new HopeCasts, devotionals and Daily Hope',
      fr: 'crée de nouveaux HopeCasts, des méditations et Daily Hope',
      de: 'macht neue HopeCasts, Andachten und Daily Hope möglich',
      es: 'produce nuevos HopeCasts, devocionales y Daily Hope',
      ko: '새 HopeCasts, 묵상 글, Daily Hope를 만들어요',
    },
  },
  {
    percent: '20%',
    label: {
      en: 'helps more people who are struggling find us',
      fr: 'aide plus de personnes en difficulté aux Philippines à nous trouver',
      de: 'hilft mehr Menschen auf den Philippinen, die es schwer haben, uns zu finden',
      es: 'ayuda a que más personas en Filipinas que la están pasando mal nos encuentren',
      ko: '힘든 시간을 보내는 더 많은 필리핀 사람들이 저희를 찾을 수 있게 해요',
    },
  },
  {
    percent: '10%',
    label: {
      en: 'supports the team and volunteers',
      fr: 'soutient l’équipe et les bénévoles',
      de: 'unterstützt das Team und die Ehrenamtlichen',
      es: 'apoya al equipo y al voluntariado',
      ko: '팀과 자원봉사자들을 지원해요',
    },
  },
];

export function AllocationBreakdown({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="allocation-title">
      <h3
        id="allocation-title"
        className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        {noTl(title, lang)}
      </h3>
      <ul className="mt-5 divide-y divide-[#E2DFDA] border-y border-[#E2DFDA] text-[#6E5F47]">
        {ALLOCATIONS.map((item) => (
          <li key={item.percent} className="flex items-baseline gap-4 py-3">
            <span className="w-14 shrink-0 font-playfair text-2xl tabular-nums">
              {item.percent}
            </span>
            <span className="leading-snug">{noTl(item.label, lang)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
