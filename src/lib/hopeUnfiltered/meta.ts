import type { FeelingLang } from '../feelingPages';

/*
 * What the parts of the site on every page (visit counts, the crisis band)
 * need to know about the blog. Kept apart from the stories so their text
 * stays out of every page's JavaScript. index.ts checks this list against
 * the stories, so the build fails if the two ever disagree.
 */

export const BLOG_PATH = '/hope-unfiltered';
export const BLOG_NAME = 'Hope Unfiltered';

/** Every story's slug and language. */
export const STORY_LANGS: Record<string, FeelingLang> = {
  'stop-overthinking-at-night': 'en',
  'pagod-na-sa-trabaho': 'tl',
  'ofw-loneliness-homesick': 'en',
  'failed-board-exam-what-now': 'en',
  'first-panic-attack-jeepney': 'en',
  'grieving-a-grandparent': 'en',
  'paano-mag-move-on': 'tl',
  'panganay-breadwinner': 'tl',
  'new-mom-feeling-overwhelmed': 'en',
  'college-stress-thesis': 'en',
  'lonely-in-a-new-city': 'en',
  'when-god-feels-far': 'en',
  'social-anxiety-small-steps': 'en',
  'stop-comparing-yourself-social-media': 'en',
  'lost-my-job-what-now': 'en',
  'caregiver-burnout': 'en',
  'walang-gana-sa-lahat': 'tl',
  'helping-a-friend-with-depression': 'en',
  'stress-sa-utang': 'tl',
  'how-to-start-over-in-life': 'en',
  'mens-mental-health-filipino-fathers': 'en',
  'anxiety-after-a-typhoon': 'en',
  'when-you-feel-like-giving-up': 'en',
  'how-to-pray-when-you-cant-find-the-words': 'en',
  'paano-bumangon-ulit': 'tl',
};

/** The story a path points to, if it is one. */
export function storySlugAt(pathname: string | null) {
  if (!pathname?.startsWith(`${BLOG_PATH}/`)) return undefined;
  const slug = pathname.slice(BLOG_PATH.length + 1);
  return slug in STORY_LANGS ? slug : undefined;
}
