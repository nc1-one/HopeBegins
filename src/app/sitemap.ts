import type { MetadataRoute } from 'next';
import { config } from '@/config';
import { feelingPages, getFeelingPage } from '@/lib/feelingPages';
import { getGuide, guides } from '@/lib/guidePages';
import { BLOG_PATH, pairOf, stories, storyPath } from '@/lib/blog';
import { isTwinReady, TAGLISH_TWINS, twinLanguages } from '@/lib/taglishTwins';

// When each page last changed in a way a reader would notice. Bump a date
// when you change that page's content, so Google knows to look again.
const UPDATED: Record<string, string> = {
  '': '2026-10-18',
  '/get-started': '2026-10-18',
  '/action-plan': '2026-10-18',
  '/prayers': '2026-10-18',
  '/hope-ai': '2026-10-18',
  '/hopecasts': '2026-10-18',
  '/daily-hope': '2026-10-18',
  '/give-hope': '2026-10-18',
  '/our-approach': '2026-10-18',
  '/laro-muna': '2026-10-17',
  '/tools': '2026-10-18',
  [BLOG_PATH]: '2026-10-23',
  '/be-carrier': '2026-10-18',
  '/guidelines': '2026-10-18',
  '/privacy': '2026-10-18',
};
const FEELING_PAGES_UPDATED = '2026-10-19';
const GUIDES_UPDATED = '2026-10-19';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${config.BASE_URL}${path}`;
  const absolute = (languages: Record<string, string>) =>
    Object.fromEntries(
      Object.entries(languages).map(([lang, path]) => [lang, url(path)])
    );
  // A core page with a Taglish address names it, once that page is ready.
  const pages: MetadataRoute.Sitemap = Object.entries(UPDATED).map(
    ([path, date]) => {
      const twin = Object.values(TAGLISH_TWINS).find((t) => t.en === path);
      const languages = twin && twinLanguages(twin);
      return {
        url: url(path),
        lastModified: date,
        ...(languages && { alternates: { languages: absolute(languages) } }),
      };
    }
  );
  // The Taglish addresses, each listed once the team has written its
  // search lines (see taglishTwins.ts).
  const twinPages: MetadataRoute.Sitemap = Object.values(TAGLISH_TWINS)
    .filter(isTwinReady)
    .map((twin) => ({
      url: url(twin.tl),
      lastModified: UPDATED[twin.en],
      alternates: { languages: absolute(twinLanguages(twin) ?? {}) },
    }));
  // Each feeling page names its other-language twin, and the English one
  // for everyone else, as the pages themselves do.
  const feelings: MetadataRoute.Sitemap = feelingPages.map((page) => {
    const pair = getFeelingPage(page.pair);
    const tl = page.lang === 'tl' ? page : pair;
    const en = page.lang === 'en' ? page : pair;
    return {
      url: url(`/${page.slug}`),
      lastModified: FEELING_PAGES_UPDATED,
      alternates: {
        languages: {
          ...(tl && { 'tl-PH': url(`/${tl.slug}`) }),
          ...(en && {
            'en-PH': url(`/${en.slug}`),
            'x-default': url(`/${en.slug}`),
          }),
        },
      },
    };
  });
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => {
    const pair = guide.pair ? getGuide(guide.pair) : undefined;
    const tl = guide.lang === 'tl' ? guide : pair;
    const en = guide.lang === 'en' ? guide : pair;
    return {
      url: url(`/${guide.slug}`),
      lastModified: GUIDES_UPDATED,
      ...(pair && {
        alternates: {
          languages: {
            ...(tl && { 'tl-PH': url(`/${tl.slug}`) }),
            ...(en && {
              'en-PH': url(`/${en.slug}`),
              'x-default': url(`/${en.slug}`),
            }),
          },
        },
      }),
    };
  });
  // Each story names its other-language twin, like the feeling pages.
  const storyPages: MetadataRoute.Sitemap = stories.map((story) => {
    const pair = pairOf(story);
    const tl = story.lang === 'tl' ? story : pair;
    const en = story.lang === 'en' ? story : pair;
    return {
      url: url(storyPath(story)),
      lastModified: story.published,
      ...(pair && {
        alternates: {
          languages: {
            ...(tl && { 'tl-PH': url(storyPath(tl)) }),
            ...(en && {
              'en-PH': url(storyPath(en)),
              'x-default': url(storyPath(en)),
            }),
          },
        },
      }),
    };
  });
  return [...pages, ...twinPages, ...feelings, ...guidePages, ...storyPages];
}
