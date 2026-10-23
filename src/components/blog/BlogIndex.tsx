import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { StoryCard } from '@/components/blog/StoryCard';
import { StoryList, type BlogCopy } from '@/components/blog/StoryList';
import { BLOG_NAME, stories, storyPairs, storyPath, storyUi } from '@/lib/blog';
import type { FeelingLang } from '@/lib/feelingPages';
import { blogJsonLd, jsonLdHtml } from '@/lib/structuredData';

export const BLOG_COPY: BlogCopy = {
  en: {
    eyebrow: 'The HopeBegins blog',
    title: BLOG_NAME,
    intro:
      'Honest stories about hard seasons, and the small things that helped people through them.',
    note: 'By Anonymous. Each story is a composite.',
    find: 'Find a story like yours',
    all: 'All stories',
  },
  tl: {
    eyebrow: 'Ang blog ng HopeBegins',
    title: 'Mga Kuwento ng Pag-asa',
    intro:
      'Mga tapat na kuwento tungkol sa mabibigat na panahon, at sa maliliit na bagay na nakatulong para malampasan ito.',
    note: 'Ni Anonymous. Composite ang bawat kuwento.',
    find: 'Humanap ng kuwentong kahawig ng sa iyo',
    all: 'Lahat ng kuwento',
  },
};

/**
 * The blog's list of stories. /blog follows the visitor's English/Taglish
 * choice; the Taglish address passes `lang` and is always in Taglish.
 */
export function BlogIndex({
  path,
  name,
  description,
  image,
  lang,
}: {
  path: string;
  name: string;
  description: string;
  image: string;
  lang?: FeelingLang;
}) {
  const [featured, ...rest] = storyPairs;
  // The closing box is in the page's language, as on the stories.
  const ui = storyUi[lang ?? 'en'];
  const structuredData = blogJsonLd({
    path,
    name,
    description,
    image,
    lang,
    posts: stories
      .filter((story) => !lang || story.lang === lang)
      .map((story) => ({ path: storyPath(story), title: story.title })),
  });

  return (
    <div className="px-6 pt-10 pb-16 text-[#6E5F47] md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(structuredData)}
      />
      <div className="mx-auto max-w-5xl">
        <div>
          <StoryList
            copy={BLOG_COPY}
            lang={lang}
            featured={{
              en: <StoryCard story={featured.en} featured headingLevel="h2" />,
              tl: <StoryCard story={featured.tl} featured headingLevel="h2" />,
            }}
            entries={rest.map((pair) => ({
              slug: pair.en.slug,
              theme: pair.en.theme,
              card: {
                en: <StoryCard story={pair.en} />,
                tl: <StoryCard story={pair.tl} />,
              },
            }))}
          />
        </div>

        <Reveal
          as="section"
          aria-labelledby="start-title"
          lang={ui.htmlLang}
          className="mt-20 rounded-3xl bg-[#6E5F47] p-8 text-white md:p-12"
        >
          <h2
            id="start-title"
            lang="en"
            className="font-playfair text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl"
          >
            Not okay today?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">
            {ui.ctaText}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TrackedLink
              href="/#start"
              linkName="story_thats_me"
              lang="en"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-7 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {ui.ctaButton}
            </TrackedLink>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-poppins font-medium text-white underline underline-offset-4 hover:text-[#EFF3E7]"
            >
              {ui.ctaHome}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
