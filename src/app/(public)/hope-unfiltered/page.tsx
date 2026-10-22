import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { StoryCard } from '@/components/hopeUnfiltered/StoryCard';
import { StoryList } from '@/components/hopeUnfiltered/StoryList';
import {
  BLOG_NAME,
  BLOG_PATH,
  stories,
  storyPath,
  THEMES,
  themesInUse,
} from '@/lib/hopeUnfiltered';
import { pageMetadata } from '@/lib/pageMetadata';
import { blogJsonLd, jsonLdHtml } from '@/lib/structuredData';

const TITLE = 'Hope Unfiltered: honest stories of hope';
const DESCRIPTION =
  'Stories about anxiety, burnout, grief, loneliness and faith, and the small things that helped Filipinos through hard seasons. Free help at HopeBegins.';
const OG_IMAGE = '/og/hope-unfiltered.jpg';

export const metadata = pageMetadata(BLOG_PATH, TITLE, DESCRIPTION, {
  url: OG_IMAGE,
  alt: BLOG_NAME,
});

export default function HopeUnfilteredPage() {
  const [featured, ...rest] = stories;
  const structuredData = blogJsonLd({
    path: BLOG_PATH,
    name: BLOG_NAME,
    description: DESCRIPTION,
    image: OG_IMAGE,
    posts: stories.map((story) => ({
      path: storyPath(story),
      title: story.title,
    })),
  });

  return (
    <div className="px-6 pt-10 pb-16 text-[#6E5F47] md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(structuredData)}
      />
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <h1 className="font-playfair text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            {BLOG_NAME}
          </h1>
          <p className="mt-5 max-w-2xl font-poppins text-lg leading-[1.4] tracking-[-0.022em] md:text-xl">
            Honest stories about hard seasons, and the small things that helped
            people through them. In English and Taglish.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6E5F47]/85">
            Every story is a composite. The people, names and details are made
            up, and the struggles are ones many Filipinos face.
          </p>
        </header>

        {featured && (
          <div className="mt-12">
            <StoryCard story={featured} featured headingLevel="h2" />
          </div>
        )}

        <section aria-labelledby="all-title" className="mt-20">
          <h2
            id="all-title"
            className="mb-6 font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl"
          >
            Find a story like yours
          </h2>
          <StoryList
            themes={themesInUse.map((id) => ({ id, label: THEMES[id] }))}
            cards={rest.map((story) => ({
              theme: story.theme,
              slug: story.slug,
              card: <StoryCard story={story} />,
            }))}
          />
        </section>

        <Reveal
          as="section"
          aria-labelledby="start-title"
          className="mt-20 rounded-3xl bg-[#6E5F47] p-8 text-white md:p-12"
        >
          <h2
            id="start-title"
            className="font-playfair text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl"
          >
            Not okay today?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">
            HopeBegins is free. Pick how you feel and get one small thing to try
            today, calming tools, someone to pray for you, and an e-coach you
            can message.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TrackedLink
              href="/#start"
              linkName="story_thats_me"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-7 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              That&apos;s me
            </TrackedLink>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-poppins font-medium text-white underline underline-offset-4 hover:text-[#EFF3E7]"
            >
              Or go to the HopeBegins home page
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
