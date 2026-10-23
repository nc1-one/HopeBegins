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

export type { Story, StoryPart, StoryTheme } from './types';
export { VERSES, VERSE_ATTRIBUTION } from './verses';
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

export const storyPath = (story: Story) => `${BLOG_PATH}/${story.slug}`;

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
export function moreStories(story: Story, count = 3) {
  return stories
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
    minRead: (minutes: number) => string;
    byline: string;
    composite: string;
    switchLabel: string;
    kinds: Record<StoryPart['kind'], string>;
    tryThis: string;
    verse: string;
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
    minRead: (minutes) => `${minutes} min basahin`,
    byline: 'Ni Anonymous',
    composite: 'Composite ang bawat kuwento.',
    switchLabel: 'Read in English',
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
    allStories: 'Lahat ng kuwento sa blog',
  },
};
