import type { MetadataRoute } from 'next';
import { config } from '@/config';
import { feelingPages } from '@/lib/feelingPages';
import { guides } from '@/lib/guidePages';
import { BLOG_PATH, stories, storyPath } from '@/lib/blog';
import { hreflang } from '@/lib/hreflang';
import { INTL_LANGS, isIntlPage, withLocale } from '@/lib/i18n';
import { intlFeelingPages, intlGuides, intlStories } from '@/lib/intl';
import { englishPathOf } from '@/lib/intlRoutes';
import { isTwinReady, TAGLISH_TWINS } from '@/lib/taglishTwins';

// When each page last changed in a way a reader would notice. Bump a date
// when you change that page's content, so Google knows to look again.
const UPDATED: Record<string, string> = {
  '': '2026-10-30',
  '/get-started': '2026-10-18',
  '/action-plan': '2026-10-30',
  '/prayers': '2026-10-18',
  '/hope-ai': '2026-10-18',
  '/hopecasts': '2026-10-18',
  '/daily-hope': '2026-10-18',
  '/give-hope': '2026-10-18',
  '/our-approach': '2026-10-18',
  '/laro-muna': '2026-10-17',
  '/tools': '2026-10-30',
  '/check-in': '2026-10-30',
  '/help': '2026-10-30',
  [BLOG_PATH]: '2026-10-23',
  '/be-carrier': '2026-10-18',
  '/guidelines': '2026-10-18',
  '/privacy': '2026-10-29',
};
const FEELING_PAGES_UPDATED = '2026-10-30';
const GUIDES_UPDATED = '2026-10-30';
// The French, German, Spanish and Korean pages went up together.
const INTL_UPDATED = '2026-10-30';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${config.BASE_URL}${path}`;
  // Each page names itself in every language it exists in (hreflang).
  const entry = (path: string, lastModified: string, english = path) => ({
    url: url(path),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(hreflang(english)).map(([lang, other]) => [
          lang,
          url(other),
        ])
      ),
    },
  });

  const pages = Object.entries(UPDATED).map(([path, date]) =>
    entry(path || '/', date)
  );
  // The Taglish addresses, each listed once the team has written its
  // search lines (see taglishTwins.ts).
  const twinPages = Object.values(TAGLISH_TWINS)
    .filter(isTwinReady)
    .map((twin) => entry(twin.tl, UPDATED[twin.en], twin.en));
  const intlCore = Object.entries(UPDATED)
    .map(([path]) => path || '/')
    .filter((path) => path === '/' || isIntlPage(path))
    .flatMap((path) =>
      INTL_LANGS.map((lang) =>
        entry(withLocale(lang, path), INTL_UPDATED, path)
      )
    );
  const feelings = feelingPages.map((page) =>
    entry(
      `/${page.slug}`,
      FEELING_PAGES_UPDATED,
      englishPathOf(`/${page.slug}`)
    )
  );
  // A guide written only in Taglish has no other versions to name.
  const guidePages = guides.map((guide) =>
    guide.lang === 'tl' && !guide.pair
      ? { url: url(`/${guide.slug}`), lastModified: GUIDES_UPDATED }
      : entry(`/${guide.slug}`, GUIDES_UPDATED, englishPathOf(`/${guide.slug}`))
  );
  const intlPages = [...intlFeelingPages, ...intlGuides].map((page) =>
    entry(
      withLocale(page.lang as (typeof INTL_LANGS)[number], `/${page.slug}`),
      INTL_UPDATED,
      `/${page.pair}`
    )
  );
  const storyPages = [...stories, ...intlStories].map((story) =>
    entry(storyPath(story), story.published, englishPathOf(storyPath(story)))
  );
  return [
    ...pages,
    ...twinPages,
    ...intlCore,
    ...feelings,
    ...guidePages,
    ...intlPages,
    ...storyPages,
  ];
}
