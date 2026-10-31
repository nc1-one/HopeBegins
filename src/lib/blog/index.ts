import type { FeelingLang } from '../feelingPages';
import { BLOG_NAME, BLOG_PATH, STORY_META } from './meta';
import { stories1 } from './stories-1';
import { stories2 } from './stories-2';
import { stories3 } from './stories-3';
import { stories4 } from './stories-4';
import { stories5 } from './stories-5';
import { translations1 } from './translations-1';
import { translations2 } from './translations-2';
import { translations3 } from './translations-3';
import { translations4 } from './translations-4';
import type { Story, StoryPart } from './types';
import { isIntlLang, withLocale } from '../i18n';

export type { Story, StoryPart, StoryTheme } from './types';
export { VERSES, VERSE_ATTRIBUTION } from './verses';
import { VERSES, type VerseKey } from './verses';

/** Verses by key in a language, for a guide's verse list. */
export const versesIn = (lang: FeelingLang, keys: VerseKey[]) =>
  keys.map((key) => VERSES[key][lang]);
export { BLOG_NAME, BLOG_PATH, THEMES, THEME_IDS } from './meta';

/*
 * Photos in /assets/images/stories were picked for one story each, from
 * Pexels (free licence, no credit needed), by Pexels id:
 * call-center-night 7681113, studying-stressed 7777149, guitar-by-the-sea
 * 21283155 (Lapu-Lapu City), barkada-reunion 7775780, in-bed-no-drive
 * 7277994, flood-malabon 32988664 (Malabon), praying-city 8896640,
 * phone-tears 7341894, new-mom-worried 9841443. The rest come from the
 * site's own photos in lib/photos.ts.
 */

/** The stories as first written, in the order the blog lists them. */
const originals: Story[] = [
  ...stories1,
  ...stories2,
  ...stories3,
  ...stories4,
  ...stories5,
];

/** Each story in its other language, English or Taglish. */
const translations: Story[] = [
  ...translations1,
  ...translations2,
  ...translations3,
  ...translations4,
];

/** Every story in both languages. */
export const stories: Story[] = [...originals, ...translations];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

/** The same story in the other language. */
export const pairOf = (story: Story) => getStory(story.pair);

/** One entry per story with both languages, in the blog's order. */
export const storyPairs = originals.map((story) => {
  const twin = pairOf(story);
  return {
    en: story.lang === 'en' ? story : (twin ?? story),
    tl: story.lang === 'tl' ? story : (twin ?? story),
  };
});

// meta.ts lists every story for the parts of the site that load on every
// page; stop the build if it and the stories disagree.
if (
  Object.keys(STORY_META).length !== stories.length ||
  stories.some(
    (story) =>
      STORY_META[story.slug]?.lang !== story.lang ||
      STORY_META[story.slug]?.theme !== story.theme
  )
) {
  throw new Error('lib/blog/meta.ts STORY_META is out of date.');
}

/** A story's address: /blog/slug, or /fr/blog/slug for a French story. */
export const storyPath = (story: Story) =>
  isIntlLang(story.lang)
    ? withLocale(story.lang, `${BLOG_PATH}/${story.slug}`)
    : `${BLOG_PATH}/${story.slug}`;

/**
 * A story's link preview: its own card image, or its photo for the French,
 * German, Spanish and Korean stories, whose cards are not drawn yet.
 */
export const storyImage = (story: Story) =>
  isIntlLang(story.lang)
    ? { url: story.photo.src, alt: story.photo.alt }
    : { url: `/og/blog/${story.slug}.jpg`, alt: story.title };

/** The blog's RSS feed, named in each blog page's head so readers find it. */
export const BLOG_FEED = {
  'application/rss+xml': [{ url: `${BLOG_PATH}/feed.xml`, title: BLOG_NAME }],
};

/** Words in a story, for the reading time. */
export function storyWordCount(story: Story) {
  const text = [
    ...story.parts.flatMap((part) => part.paragraphs),
    ...story.tryThis.steps,
    ...story.faq.flatMap((item) => [item.q, item.a]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Minutes to read, at an easy 200 words a minute. */
export const readingMinutes = (story: Story) =>
  Math.max(1, Math.round(storyWordCount(story) / 200));

/**
 * Stories to read next, in the same language: the same theme first, then
 * the rest, so every story links to a few others.
 */
export function moreStories(story: Story, count = 3, pool = stories) {
  return pool
    .filter(
      (other) =>
        other.lang === story.lang &&
        other.slug !== story.slug &&
        other.slug !== story.pair
    )
    .sort(
      (a, b) =>
        Number(b.theme === story.theme) - Number(a.theme === story.theme)
    )
    .slice(0, count);
}

/** Splits "[words](/path)" links out of a paragraph. */
export function linkParts(text: string) {
  const parts: ({ text: string } | { text: string; href: string })[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ text: text.slice(last, match.index) });
    parts.push({ text: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

/** A paragraph as plain text, for descriptions and feeds. */
export const plainText = (text: string) =>
  linkParts(text)
    .map((part) => part.text)
    .join('');

export const storyUi: Record<
  FeelingLang,
  {
    htmlLang: string;
    /** The back link to the blog. */
    back: string;
    minRead: (minutes: number) => string;
    byline: string;
    composite: string;
    switchLabel: string;
    kinds: Record<StoryPart['kind'], string>;
    tryThis: string;
    verse: string;
    /** "Not okay today?" in the page's language. */
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    ctaHome: string;
    faq: string;
    more: string;
    allStories: string;
  }
> = {
  en: {
    htmlLang: 'en-PH',
    back: 'Blog',
    minRead: (minutes) => `${minutes} min read`,
    byline: 'By Anonymous',
    composite: 'Each story is a composite.',
    switchLabel: 'Basahin sa Taglish',
    kinds: {
      story: 'The story',
      struggle: 'What made it hard',
      helped: 'What helped',
      hope: 'For you',
    },
    tryThis: 'Try this today',
    verse: 'A verse for today',
    ctaTitle: 'Not okay today?',
    ctaText:
      'HopeBegins is free. Pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message.',
    ctaButton: "That's me",
    ctaHome: 'Or go to the HopeBegins home page',
    faq: 'Questions people ask',
    more: 'More stories',
    allStories: 'All stories on the blog',
  },
  tl: {
    htmlLang: 'tl-PH',
    back: 'Blog',
    minRead: (minutes) => `${minutes} minutong basa`,
    byline: 'Ni Anonymous',
    composite: 'Pinagsamang karanasan ng ilang tao ang bawat kuwento.',
    switchLabel: 'Read in English',
    kinds: {
      story: 'Ang kuwento',
      struggle: 'Ang nagpabigat',
      helped: 'Ang nakatulong',
      hope: 'Para sa iyo',
    },
    tryThis: 'Subukan ngayon',
    verse: 'Verse para sa araw na ito',
    ctaTitle: 'Not okay today?',
    ctaText:
      'Libre ang HopeBegins. Piliin kung ano ang nararamdaman mo, at may isang maliit na bagay kang masusubukan ngayon. May mga tool din para kumalma, mga taong magdadasal para sa iyo, at e-coach na puwede mong i-message.',
    ctaButton: "That's me",
    ctaHome: 'O pumunta sa home page ng HopeBegins',
    faq: 'Mga tanong ng iba',
    more: 'Iba pang kuwento',
    allStories: 'Lahat ng kuwento sa blog',
  },
  // No e-coach in these languages: the closing box offers a free helpline
  // in the reader's country. switchLabel is not shown on their stories.
  fr: {
    htmlLang: 'fr',
    back: 'Blog',
    minRead: (minutes) => `${minutes} min de lecture`,
    byline: 'Par Anonyme',
    composite: 'Chaque histoire réunit les vécus de plusieurs personnes.',
    switchLabel: 'Lire en anglais',
    kinds: {
      story: 'L’histoire',
      struggle: 'Ce qui était dur',
      helped: 'Ce qui a aidé',
      hope: 'Pour toi',
    },
    tryThis: 'À essayer aujourd’hui',
    verse: 'Un verset pour aujourd’hui',
    ctaTitle: 'Ça ne va pas aujourd’hui ?',
    ctaText:
      'HopeBegins est gratuit. Choisis ce que tu ressens et reçois une petite chose à essayer aujourd’hui, des outils pour t’apaiser, quelqu’un qui prie pour toi et une ligne d’écoute gratuite dans ton pays.',
    ctaButton: 'C’est moi',
    ctaHome: 'Ou va à l’accueil de HopeBegins',
    faq: 'Ce que les gens se demandent',
    more: 'D’autres histoires',
    allStories: 'Toutes les histoires du blog',
  },
  de: {
    htmlLang: 'de',
    back: 'Blog',
    minRead: (minutes) => `${minutes} Min. Lesezeit`,
    byline: 'Anonym verfasst',
    composite: 'Jede Geschichte verbindet Erfahrungen mehrerer Menschen.',
    switchLabel: 'Auf Englisch lesen',
    kinds: {
      story: 'Die Geschichte',
      struggle: 'Was schwer war',
      helped: 'Was geholfen hat',
      hope: 'Für dich',
    },
    tryThis: 'Probier das heute aus',
    verse: 'Ein Bibelvers für heute',
    ctaTitle: 'Heute nicht okay?',
    ctaText:
      'HopeBegins ist kostenlos. Wähl aus, wie es dir geht, und du bekommst eine kleine Sache, die du heute ausprobieren kannst, Übungen zur Beruhigung, jemanden, der für dich betet, und kostenlose Hilfetelefone in deinem Land.',
    ctaButton: 'Das bin ich',
    ctaHome: 'Oder zur Startseite von HopeBegins',
    faq: 'Was andere fragen',
    more: 'Weitere Geschichten',
    allStories: 'Alle Geschichten im Blog',
  },
  es: {
    htmlLang: 'es-419',
    back: 'Blog',
    minRead: (minutes) => `${minutes} min de lectura`,
    byline: 'Por Anónimo',
    composite: 'Cada historia reúne vivencias de varias personas.',
    switchLabel: 'Leer en inglés',
    kinds: {
      story: 'La historia',
      struggle: 'Lo que lo hizo difícil',
      helped: 'Lo que ayudó',
      hope: 'Para ti',
    },
    tryThis: 'Prueba esto hoy',
    verse: 'Un versículo para hoy',
    ctaTitle: '¿No estás bien hoy?',
    ctaText:
      'HopeBegins es gratis. Elige cómo te sientes y recibe una cosa pequeña para probar hoy, herramientas para calmarte, alguien que ore por ti y líneas de ayuda gratuitas en tu país.',
    ctaButton: 'Así me siento',
    ctaHome: 'O ve a la página de inicio de HopeBegins',
    faq: 'Lo que otras personas preguntan',
    more: 'Más historias',
    allStories: 'Todas las historias del blog',
  },
  ko: {
    htmlLang: 'ko',
    back: '블로그',
    minRead: (minutes) => `읽는 데 ${minutes}분`,
    byline: '글: 익명',
    composite: '이야기마다 여러 사람의 경험을 엮었어요.',
    switchLabel: '영어로 읽기',
    kinds: {
      story: '이야기',
      struggle: '힘들었던 점',
      helped: '도움이 된 것',
      hope: '당신에게',
    },
    tryThis: '오늘 해 보세요',
    verse: '오늘의 말씀',
    ctaTitle: '오늘 괜찮지 않나요?',
    ctaText:
      'HopeBegins는 무료예요. 지금 기분을 고르면 오늘 해 볼 작은 일 하나, 마음을 가라앉히는 도구, 당신을 위해 기도해 줄 사람, 그리고 무료 상담 전화를 만날 수 있어요.',
    ctaButton: '제 얘기예요',
    ctaHome: '또는 HopeBegins 홈으로 가기',
    faq: '사람들이 자주 묻는 질문',
    more: '다른 이야기',
    allStories: '블로그의 모든 이야기',
  },
};
