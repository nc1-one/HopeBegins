import { noTl, type Lang, type PerLangNoTl } from '@/lib/i18n';
import Link from '@/components/ui/LocalLink';

const linkClass =
  'inline-flex min-h-11 items-center underline underline-offset-4 hover:text-[#5c4f3b]';
const inlineLinkClass = 'underline underline-offset-4 hover:text-[#5c4f3b]';

interface Feeling {
  href: string;
  label: string;
  /** The label's language, on the English page, which lists both. */
  lang?: 'en' | 'tl';
}

interface AboutCopy {
  title: string;
  body: string;
  /** A second paragraph in another language: Taglish on the English page. */
  aside?: { text: string; lang: string };
  feelingsTitle: string;
  feelings: Feeling[];
  numberAsk: string;
  numberLink: { href: string; label: string };
  storiesAsk: string;
  storiesLink: string;
}

/*
 * What HopeBegins is, per language. Taglish readers get the English, which
 * already has a Taglish paragraph. French, German, Spanish and Korean
 * readers can be anywhere: HopeBegins started in the Philippines, but it is
 * for anyone, and their help link goes to the free lines in their country.
 * Their feeling links name the English pages, which links open in the
 * reader's language.
 */
const COPY: PerLangNoTl<AboutCopy> = {
  en: {
    title: 'Free mental health support for Filipinos',
    body: 'HopeBegins is free, faith-driven support for anyone in the Philippines who feels anxious, low, tired or alone. Pick how you feel and get one small thing to try today, a free personal plan, calming tools, someone to pray for you, and an e-coach you can message on Messenger. In English or Taglish.',
    aside: {
      lang: 'tl',
      text: 'Libre ang HopeBegins para sa sinumang nababalisa, malungkot, pagod o pakiramdam ay mag-isa. Piliin kung ano ang nararamdaman mo, at may isang maliit na bagay kang masusubukan ngayon.',
    },
    feelingsTitle: 'Start with how you feel',
    // The feelings people search for most, in their own words.
    feelings: [
      { href: '/pagod-na-ako', label: 'Pagod na ako', lang: 'tl' },
      { href: '/wala-akong-kausap', label: 'Wala akong kausap', lang: 'tl' },
      { href: '/depressed-ako', label: 'Depressed ako', lang: 'tl' },
      {
        href: '/paano-mawala-ang-anxiety',
        label: 'Paano mawala ang anxiety',
        lang: 'tl',
      },
      { href: '/i-feel-depressed', label: 'I feel depressed', lang: 'en' },
      {
        href: '/how-to-calm-anxiety',
        label: 'How to calm anxiety',
        lang: 'en',
      },
      {
        href: '/cant-sleep-overthinking',
        label: "Can't sleep from overthinking",
        lang: 'en',
      },
      { href: '/i-feel-alone', label: 'I feel alone', lang: 'en' },
    ],
    numberAsk: 'Need a number?',
    numberLink: {
      href: '/free-mental-health-help-philippines',
      label: 'Free hotlines and counseling in the Philippines',
    },
    storiesAsk: 'Want to read how others got through a hard season?',
    storiesLink: 'Stories of Hope, the HopeBegins blog',
  },
  fr: {
    title: 'Un soutien gratuit pour ta santé mentale',
    body: 'HopeBegins est un soutien gratuit, porté par la foi chrétienne, pour toute personne qui se sent anxieuse, à plat, épuisée ou seule. Tout a commencé aux Philippines. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, un plan personnel gratuit, des outils pour t’apaiser, quelqu’un qui prie pour toi et des lignes d’écoute gratuites dans ton pays.',
    feelingsTitle: 'Commence par ce que tu ressens',
    feelings: [
      { href: '/tired-of-everything', label: 'Je suis à bout' },
      { href: '/i-feel-alone', label: 'La solitude me pèse' },
      { href: '/i-feel-depressed', label: 'Je déprime' },
      { href: '/how-to-calm-anxiety', label: 'Comment calmer l’anxiété' },
      {
        href: '/cant-sleep-overthinking',
        label: 'Je pense trop, je ne dors plus',
      },
      {
        href: '/panic-attack-what-to-do',
        label: 'Crise de panique : que faire ?',
      },
      { href: '/i-feel-lost', label: 'Je ne sais plus quoi faire de ma vie' },
      { href: '/burnout', label: 'Burn-out' },
    ],
    numberAsk: 'Besoin d’un numéro ?',
    numberLink: {
      href: '/help',
      label: 'Des lignes d’écoute gratuites dans ton pays',
    },
    storiesAsk:
      'Envie de lire comment d’autres ont traversé une période difficile ?',
    storiesLink: 'Histoires d’espoir, le blog de HopeBegins',
  },
  de: {
    title: 'Kostenlose Hilfe für deine psychische Gesundheit',
    body: 'HopeBegins ist kostenlose, christlich geprägte Unterstützung für alle, die sich ängstlich, niedergeschlagen, erschöpft oder allein fühlen. Angefangen hat alles auf den Philippinen. Wähl aus, wie es dir geht, und du bekommst eine kleine Sache, die du heute ausprobieren kannst, einen kostenlosen persönlichen Plan, Übungen zur Beruhigung, jemanden, der für dich betet, und kostenlose Telefonhilfe in deinem Land.',
    feelingsTitle: 'Fang bei dem an, was du fühlst',
    feelings: [
      { href: '/tired-of-everything', label: 'Mir ist alles zu viel' },
      { href: '/i-feel-alone', label: 'Ich fühle mich allein' },
      { href: '/i-feel-depressed', label: 'Ich fühle mich depressiv' },
      { href: '/how-to-calm-anxiety', label: 'Was gegen Angst hilft' },
      { href: '/cant-sleep-overthinking', label: 'Grübeln statt Schlafen' },
      { href: '/panic-attack-what-to-do', label: 'Panikattacke: was tun?' },
      { href: '/i-feel-lost', label: 'Ich fühle mich verloren' },
      { href: '/burnout', label: 'Burnout' },
    ],
    numberAsk: 'Brauchst du eine Nummer?',
    numberLink: {
      href: '/help',
      label: 'Kostenlose Telefonhilfe in deinem Land',
    },
    storiesAsk:
      'Möchtest du lesen, wie andere durch eine schwere Zeit gekommen sind?',
    storiesLink: 'Geschichten der Hoffnung, der Blog von HopeBegins',
  },
  es: {
    title: 'Apoyo gratuito para tu salud mental',
    body: 'HopeBegins es un apoyo gratuito y basado en la fe cristiana para cualquier persona que sienta ansiedad, tristeza, cansancio o soledad. Todo empezó en Filipinas. Elige cómo te sientes y recibe una cosa pequeña para probar hoy, un plan personal gratis, herramientas para calmarte, alguien que ore por ti y líneas de ayuda gratuitas en tu país.',
    feelingsTitle: 'Empieza por cómo te sientes',
    feelings: [
      { href: '/tired-of-everything', label: 'Me cansé de todo' },
      { href: '/i-feel-alone', label: 'Siento que no tengo a nadie' },
      { href: '/i-feel-depressed', label: 'Creo que tengo depresión' },
      { href: '/how-to-calm-anxiety', label: 'Cómo calmar la ansiedad' },
      {
        href: '/cant-sleep-overthinking',
        label: 'No puedo dormir de tanto pensar',
      },
      {
        href: '/panic-attack-what-to-do',
        label: 'Ataque de pánico: qué hacer',
      },
      { href: '/i-feel-lost', label: 'No sé qué hacer con mi vida' },
      { href: '/burnout', label: 'Burnout' },
    ],
    numberAsk: '¿Necesitas un número?',
    numberLink: {
      href: '/help',
      label: 'Líneas de ayuda gratuitas en tu país',
    },
    storiesAsk:
      '¿Quieres leer cómo otras personas salieron adelante en una época difícil?',
    storiesLink: 'Historias de esperanza, el blog de HopeBegins',
  },
  ko: {
    title: '누구에게나 열린 무료 마음 돌봄',
    body: 'HopeBegins는 기독교 신앙에 뿌리를 둔 무료 마음 돌봄이에요. 불안하거나, 우울하거나, 지치거나, 외로운 사람 누구에게나 열려 있어요. 필리핀에서 시작했어요. 지금 기분을 고르면 오늘 해 볼 작은 일 하나, 무료 맞춤 계획, 마음을 가라앉히는 도구, 당신을 위해 기도해 줄 사람, 그리고 무료 상담 전화를 만날 수 있어요.',
    feelingsTitle: '지금 마음에서 시작해 보세요',
    feelings: [
      { href: '/tired-of-everything', label: '다 지쳤어요' },
      { href: '/i-feel-alone', label: '외로워요' },
      { href: '/i-feel-depressed', label: '우울해요' },
      { href: '/how-to-calm-anxiety', label: '불안을 가라앉히는 법' },
      { href: '/cant-sleep-overthinking', label: '생각이 많아 잠이 안 와요' },
      { href: '/panic-attack-what-to-do', label: '공황 발작이 왔을 때' },
      { href: '/i-feel-lost', label: '길을 잃은 것 같아요' },
      { href: '/burnout', label: '번아웃' },
    ],
    numberAsk: '전화번호가 필요한가요?',
    numberLink: { href: '/help', label: '지금 걸 수 있는 무료 상담 전화' },
    storiesAsk: '다른 사람들은 힘든 시기를 어떻게 지나왔는지 읽어 보고 싶나요?',
    storiesLink: '희망 이야기, HopeBegins 블로그',
  },
};

/**
 * Below the "Not okay today?" screen: what HopeBegins is, in plain words,
 * for anyone who scrolls on and for search engines, with the main ways in.
 */
export function HomeAbout({ lang = 'en' }: { lang?: Lang } = {}) {
  const t = noTl(COPY, lang);
  return (
    <section
      aria-labelledby="about-title"
      className="px-6 py-16 text-[#6E5F47] md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2
            id="about-title"
            className="text-balance font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl"
          >
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed">{t.body}</p>
          {t.aside && (
            <p lang={t.aside.lang} className="mt-4 leading-relaxed">
              {t.aside.text}
            </p>
          )}
        </div>

        <h3 className="mt-10 font-poppins text-lg font-semibold">
          {t.feelingsTitle}
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
          {t.feelings.map((feeling) => (
            <li key={feeling.href} lang={feeling.lang}>
              <Link href={feeling.href} className={linkClass}>
                {feeling.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-2xl leading-relaxed">
          {t.numberAsk}{' '}
          <Link href={t.numberLink.href} className={inlineLinkClass}>
            {t.numberLink.label}
          </Link>
          . {t.storiesAsk}{' '}
          <Link href="/blog" className={inlineLinkClass}>
            {t.storiesLink}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
