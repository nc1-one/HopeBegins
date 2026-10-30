import type { FeelingPage } from '../feelingPages';
import type { Guide } from '../guidePages';
import type { Story } from '../blog/types';
import type { IntlLang } from '../i18n';
import { INTL_PAGE_SLUGS, INTL_STORY_SLUGS } from '../intlRoutes.generated';
import { frFeelingPages } from './feelings/fr';
import { deFeelingPages } from './feelings/de';
import { esFeelingPages } from './feelings/es';
import { koFeelingPages } from './feelings/ko';
import { frGuides } from './guides/fr';
import { deGuides } from './guides/de';
import { esGuides } from './guides/es';
import { koGuides } from './guides/ko';
import { frStories1 } from './stories/fr-1';
import { frStories2 } from './stories/fr-2';
import { deStories1 } from './stories/de-1';
import { deStories2 } from './stories/de-2';
import { esStories1 } from './stories/es-1';
import { esStories2 } from './stories/es-2';
import { koStories1 } from './stories/ko-1';
import { koStories2 } from './stories/ko-2';

/*
 * The feeling pages, guides and stories in French, German, Spanish and
 * Korean. Each names the English page it was written from in `pair`; the
 * stories are adapted to their readers' country, not translated word for
 * word. Server only: the pages' text stays out of the browser's code.
 */

export const intlFeelingPages: FeelingPage[] = [
  ...frFeelingPages,
  ...deFeelingPages,
  ...esFeelingPages,
  ...koFeelingPages,
];

export const intlGuides: Guide[] = [
  ...frGuides,
  ...deGuides,
  ...esGuides,
  ...koGuides,
];

export const intlStories: Story[] = [
  ...frStories1,
  ...frStories2,
  ...deStories1,
  ...deStories2,
  ...esStories1,
  ...esStories2,
  ...koStories1,
  ...koStories2,
];

/** A feeling page or guide at /lang/slug. */
export const getIntlPage = (lang: IntlLang, slug: string) =>
  intlFeelingPages.find((page) => page.lang === lang && page.slug === slug) ??
  intlGuides.find((guide) => guide.lang === lang && guide.slug === slug);

/** The feeling page or guide in a language, by its English slug. */
export const intlPageFor = (lang: IntlLang, english: string) =>
  intlFeelingPages.find(
    (page) => page.lang === lang && page.pair === english
  ) ??
  intlGuides.find((guide) => guide.lang === lang && guide.pair === english);

export const getIntlStory = (lang: IntlLang, slug: string) =>
  intlStories.find((story) => story.lang === lang && story.slug === slug);

// intlRoutes.generated.ts lists these pages for the links on every page;
// stop the build if it and the pages disagree. While pages are being
// written in development, only warn, so the rest of the site still opens.
const listed = (lists: Record<IntlLang, Record<string, string>>) =>
  Object.entries(lists).flatMap(([lang, slugs]) =>
    Object.entries(slugs).map(([english, slug]) => `${lang} ${english} ${slug}`)
  );
const actual = (items: { lang: string; pair?: string; slug: string }[]) =>
  items.map((item) => `${item.lang} ${item.pair} ${item.slug}`);
const same = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item));
if (
  !same(
    listed(INTL_PAGE_SLUGS),
    actual([...intlFeelingPages, ...intlGuides])
  ) ||
  !same(listed(INTL_STORY_SLUGS), actual(intlStories))
) {
  const message =
    'lib/intlRoutes.generated.ts is out of date: run node scripts/gen-intl-routes.mjs';
  if (process.env.NODE_ENV === 'production') throw new Error(message);
  console.warn(message);
}
