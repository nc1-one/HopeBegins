import type { Metadata } from 'next';
import { LANG_INFO } from '../i18n';
import { hreflang } from '../intlMetadata';
import { pageMetadata } from '../pageMetadata';
import {
  BLOG_FEED,
  BLOG_PATH,
  storyImage,
  storyPath,
  THEMES,
  type Story,
} from './index';

/** The English story a story was written from, or the story itself. */
const englishSlugOf = (story: Story) =>
  story.lang === 'en' ? story.slug : story.pair;

/** Title, preview and language versions for a story in any language. */
export function storyMetadata(story: Story | undefined): Metadata {
  if (!story) return {};
  const image = storyImage(story);
  const base = pageMetadata(
    storyPath(story),
    story.metaTitle,
    story.metaDescription,
    { image, keywords: story.keywords, lang: story.lang }
  );
  // The same story in every language, as the feeling pages do.
  return {
    ...base,
    alternates: {
      canonical: storyPath(story),
      languages: hreflang(`${BLOG_PATH}/${englishSlugOf(story)}`),
      types: BLOG_FEED,
    },
    openGraph: {
      type: 'article',
      siteName: 'HopeBegins',
      locale: LANG_INFO[story.lang].ogLocale,
      url: storyPath(story),
      title: `${story.metaTitle} | HopeBegins`,
      description: story.metaDescription,
      images: [{ ...image, width: 1200, height: 630 }],
      publishedTime: story.published,
      section: THEMES[story.lang][story.theme],
      tags: story.keywords,
    },
  };
}
