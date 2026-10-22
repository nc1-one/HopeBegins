import type { FeelingLang } from '../feelingPages';
import { BLOG_PATH, STORY_LANGS } from './meta';
import { stories1 } from './stories-1';
import { stories2 } from './stories-2';
import { stories3 } from './stories-3';
import { stories4 } from './stories-4';
import { stories5 } from './stories-5';
import type { Story, StoryPart, StoryTheme } from './types';

export type { Story, StoryPart, StoryTheme } from './types';
export { VERSES, VERSE_ATTRIBUTION } from './verses';

export { BLOG_NAME, BLOG_PATH } from './meta';

/** Every story, in the order the blog lists them. */
export const stories: Story[] = [
  ...stories1,
  ...stories2,
  ...stories3,
  ...stories4,
  ...stories5,
];

// meta.ts lists every slug and language for the parts of the site that
// load on every page; stop the build if it and the stories disagree.
const listed = Object.entries(STORY_LANGS);
if (
  listed.length !== stories.length ||
  stories.some((story) => STORY_LANGS[story.slug] !== story.lang)
) {
  throw new Error('hopeUnfiltered/meta.ts STORY_LANGS is out of date.');
}

export const storyPath = (story: Story) => `${BLOG_PATH}/${story.slug}`;

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export const THEMES: Record<StoryTheme, string> = {
  anxiety: 'Anxiety',
  pressure: 'Pressure and burnout',
  lonely: 'Loneliness',
  loss: 'Grief and heartbreak',
  low: 'Feeling low',
  faith: 'Faith',
  'new-start': 'Starting over',
};

/** Themes that have stories, in the order above. */
export const themesInUse = (Object.keys(THEMES) as StoryTheme[]).filter(
  (theme) => stories.some((story) => story.theme === theme)
);

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
 * Stories to read next: the same theme first, then the same language,
 * then the rest, so every story links to a few others.
 */
export function moreStories(story: Story, count = 3) {
  const others = stories.filter((other) => other.slug !== story.slug);
  const score = (other: Story) =>
    (other.theme === story.theme ? 2 : 0) + (other.lang === story.lang ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
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
    minRead: (minutes: number) => string;
    composite: string;
    kinds: Record<StoryPart['kind'], string>;
    tryThis: string;
    verse: string;
    ctaText: string;
    ctaButton: string;
    ctaHome: string;
    faq: string;
    more: string;
    aboutTitle: string;
    about: string;
  }
> = {
  en: {
    htmlLang: 'en-PH',
    minRead: (minutes) => `${minutes} min read`,
    composite: 'A composite story: names and details are made up.',
    kinds: {
      story: 'The story',
      struggle: 'What made it hard',
      helped: 'What helped',
      hope: 'For you',
    },
    tryThis: 'Try this today',
    verse: 'A verse for today',
    ctaText:
      'HopeBegins is free. Pick how you feel and get one small thing to try today, calming tools, someone to pray for you, and an e-coach you can message.',
    ctaButton: "That's me",
    ctaHome: 'Or go to the HopeBegins home page',
    faq: 'Questions people ask',
    more: 'More stories',
    aboutTitle: 'About this story',
    about:
      'Hope Unfiltered stories are composites. The people, names and details are made up, and the struggles are ones many Filipinos face. If you see yourself in one, reach out to someone today.',
  },
  tl: {
    htmlLang: 'tl-PH',
    minRead: (minutes) => `${minutes} min basahin`,
    composite: 'Composite na kuwento: gawa-gawa ang mga pangalan at detalye.',
    kinds: {
      story: 'Ang kuwento',
      struggle: 'Ang mabigat',
      helped: 'Ang nakatulong',
      hope: 'Para sa iyo',
    },
    tryThis: 'Subukan ngayon',
    verse: 'Talata para sa araw na ito',
    ctaText:
      'Libre ang HopeBegins. Piliin mo kung ano ang nararamdaman mo at may isang maliit na bagay kang masusubukan ngayon, mga calming tool, may magdarasal para sa iyo, at e-coach na puwede mong i-message.',
    ctaButton: "That's me",
    ctaHome: 'O pumunta sa home page ng HopeBegins',
    faq: 'Mga tanong ng iba',
    more: 'Iba pang kuwento',
    aboutTitle: 'Tungkol sa kuwentong ito',
    about:
      'Composite ang mga kuwento sa Hope Unfiltered. Gawa-gawa ang mga tao, pangalan at detalye, at ang mga pinagdadaanan nila ay pinagdadaanan din ng maraming Pilipino. Kung nakikita mo ang sarili mo sa isa sa mga ito, kumausap ng isang tao ngayong araw.',
  },
};
