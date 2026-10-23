/**
 * Stories of Hope, the HopeBegins blog: hard seasons and the small things that
 * helped. Every person in them is a composite. Names and details are made
 * up, and the struggles are ones many Filipinos face, so the pages say so.
 * The people in the stories never use or praise HopeBegins; the invitation
 * to HopeBegins comes after the story, addressed to the reader.
 */

import type { FeelingLang } from '../feelingPages';
import type { VerseKey } from './verses';

export type StoryTheme =
  | 'anxiety'
  | 'pressure'
  | 'lonely'
  | 'loss'
  | 'low'
  | 'faith'
  | 'new-start';

/** One part of a story, under a heading people might search for. */
export interface StoryPart {
  /**
   * Which beat of the story this is: what happened, what made it hard,
   * what helped, or what it means for the reader.
   */
  kind: 'story' | 'struggle' | 'helped' | 'hope';
  heading: string;
  /** Plain text. A link is written [words](/path). */
  paragraphs: string[];
  /** A line from this part, shown large. */
  pullQuote?: string;
}

export interface Story {
  slug: string;
  lang: FeelingLang;
  /** The same story in the other language. */
  pair: string;
  theme: StoryTheme;
  /** Under 60 characters, with the words people search for. */
  metaTitle: string;
  /** About 150 characters: what the reader will find. */
  metaDescription: string;
  title: string;
  /** One or two sentences under the title. */
  dek: string;
  /** Who the story follows, such as "Paolo, 27, IT support in Cebu". */
  who: string;
  photo: { src: string; alt: string };
  /** yyyy-MM-dd */
  published: string;
  parts: StoryPart[];
  /** One small thing to try today. */
  tryThis: { title: string; steps: string[] };
  verse: VerseKey;
  /** The feeling page or guide that fits, by slug. */
  related: string;
  faq: { q: string; a: string }[];
  keywords: string[];
}
