import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { StoryCard } from '@/components/blog/StoryCard';
import { StoryLanguageLink } from '@/components/blog/StoryLanguageLink';
import { StoryText } from '@/components/blog/StoryText';
import {
  BLOG_NAME,
  BLOG_PATH,
  getStory,
  moreStories,
  pairOf,
  readingMinutes,
  stories,
  storyPath,
  storyUi,
  storyWordCount,
  THEMES,
  VERSE_ATTRIBUTION,
  VERSES,
  type Story,
  type StoryPart,
} from '@/lib/blog';
import { pageMetadata } from '@/lib/pageMetadata';
import { jsonLdHtml, storyJsonLd } from '@/lib/structuredData';

// Only the stories in lib/blog exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

const ogImage = (story: Story) => `/og/blog/${story.slug}.jpg`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  const image = { url: ogImage(story), alt: story.title };
  const base = pageMetadata(
    storyPath(story),
    story.metaTitle,
    story.metaDescription,
    image
  );
  // Each story names its other-language twin, as the feeling pages do.
  const twin = pairOf(story);
  const english = story.lang === 'en' ? story : twin;
  const tagalog = story.lang === 'tl' ? story : twin;
  return {
    ...base,
    alternates: {
      canonical: storyPath(story),
      ...(twin && {
        languages: {
          ...(tagalog && { 'tl-PH': storyPath(tagalog) }),
          ...(english && {
            'en-PH': storyPath(english),
            'x-default': storyPath(english),
          }),
        },
      }),
    },
    keywords: story.keywords,
    openGraph: {
      type: 'article',
      siteName: 'HopeBegins',
      locale: story.lang === 'tl' ? 'tl_PH' : 'en_PH',
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

const eyebrowClass =
  'font-poppins text-xs font-semibold uppercase tracking-[0.12em] text-[#6E5F47]/75';
const h2Class =
  'mt-2 text-balance font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl';
const paragraphClass = 'mt-5 text-lg leading-[1.75]';
const dropCapClass =
  'first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-playfair first-letter:text-[4.25rem] first-letter:leading-[0.8]';

/** A verse that starts mid-sentence gets the ellipsis the guides use. */
const verseText = (text: string) => (/^[a-z]/.test(text) ? `…${text}` : text);

function Part({
  part,
  label,
  first,
}: {
  part: StoryPart;
  label: string;
  first: boolean;
}) {
  // The pull quote sits after the paragraph it comes from.
  const quoteAfter = part.pullQuote
    ? Math.max(
        0,
        part.paragraphs.findIndex((paragraph) =>
          paragraph.includes(part.pullQuote!)
        )
      )
    : -1;

  return (
    // Plain text sections: reading should never wait on an animation.
    <section className="mt-14">
      <p className={eyebrowClass}>{label}</p>
      <h2 className={h2Class}>{part.heading}</h2>
      {part.paragraphs.map((paragraph, index) => (
        <div key={index}>
          <p
            className={`${paragraphClass} ${
              first && index === 0 ? dropCapClass : ''
            }`}
          >
            <StoryText text={paragraph} />
          </p>
          {index === quoteAfter && (
            // Repeats a line from the text, so screen readers skip it.
            <blockquote
              aria-hidden
              className="my-10 border-l-4 border-[#AEC488] pl-5 font-playfair text-2xl italic leading-tight tracking-[-0.02em] md:text-3xl"
            >
              {part.pullQuote}
            </blockquote>
          )}
        </div>
      ))}
    </section>
  );
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const ui = storyUi[story.lang];
  const twin = pairOf(story);
  const verse = VERSES[story.verse][story.lang];
  const minutes = readingMinutes(story);
  // Everything up to the reader's part, then the small step and the verse.
  const hopeAt = story.parts.findIndex((part) => part.kind === 'hope');
  const beforeHope = hopeAt === -1 ? story.parts : story.parts.slice(0, hopeAt);
  const hopeParts = hopeAt === -1 ? [] : story.parts.slice(hopeAt);
  const structuredData = storyJsonLd({
    path: storyPath(story),
    blogPath: BLOG_PATH,
    blogName: BLOG_NAME,
    headline: story.title,
    description: story.metaDescription,
    lang: story.lang,
    image: ogImage(story),
    published: story.published,
    keywords: story.keywords,
    section: THEMES[story.lang][story.theme],
    wordCount: storyWordCount(story),
    faq: story.faq,
  });

  return (
    <article lang={ui.htmlLang} className="px-6 pt-6 pb-16 text-[#6E5F47]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(structuredData)}
      />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={BLOG_PATH}
            lang="en"
            className="-ml-3 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 font-poppins text-sm font-medium transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Blog
          </Link>
          {twin && (
            <StoryLanguageLink
              href={storyPath(twin)}
              lang={twin.lang}
              label={ui.switchLabel}
            />
          )}
        </div>

        <header className="mt-6 max-w-3xl">
          <p className={eyebrowClass}>{THEMES[story.lang][story.theme]}</p>
          <h1 className="mt-3 text-balance font-playfair text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
            {story.title}
          </h1>
          <p className="mt-5 max-w-2xl font-poppins text-lg leading-[1.4] tracking-[-0.022em] md:text-xl">
            {story.dek}
          </p>
          <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-poppins text-sm text-[#6E5F47]/85">
            <span>{ui.byline}</span>
            <span aria-hidden>·</span>
            <span>{story.who}</span>
            <span aria-hidden>·</span>
            <span>{ui.minRead(minutes)}</span>
          </p>
        </header>

        <div className="relative mt-8 aspect-[4/3] max-w-4xl overflow-hidden rounded-2xl bg-[#EFF3E7] md:aspect-[16/9]">
          <Image
            src={story.photo.src}
            alt={story.photo.alt}
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-3 max-w-4xl text-sm text-[#6E5F47]/80">
          {ui.composite}
        </p>

        <div className="max-w-2xl">
          {beforeHope.map((part, index) => (
            <Part
              key={part.heading}
              part={part}
              label={ui.kinds[part.kind]}
              first={index === 0}
            />
          ))}

          <Reveal
            as="section"
            aria-labelledby="try-title"
            className="mt-14 rounded-2xl bg-[#EFF3E7] p-6 md:p-8"
          >
            <p className={eyebrowClass}>{ui.tryThis}</p>
            <h2
              id="try-title"
              className="mt-2 text-balance font-playfair text-2xl leading-[0.95] tracking-[-0.04em] md:text-3xl"
            >
              {story.tryThis.title}
            </h2>
            <ol className="mt-6 space-y-4">
              {story.tryThis.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DFE7CF] font-poppins text-sm font-bold"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal
            as="section"
            aria-labelledby="verse-title"
            className="mt-14 border-y border-[#E2DFDA] py-10 text-center"
          >
            <h2 id="verse-title" className={eyebrowClass}>
              {ui.verse}
            </h2>
            <blockquote className="mx-auto mt-5 max-w-xl text-balance font-playfair text-2xl italic leading-snug md:text-3xl">
              {/* As published: some verses carry their own quotation marks. */}
              {verseText(verse.text)}
            </blockquote>
            <p className="mt-4 font-poppins text-sm font-medium">
              {verse.reference}
            </p>
          </Reveal>

          {hopeParts.map((part) => (
            <Part
              key={part.heading}
              part={part}
              label={ui.kinds[part.kind]}
              first={false}
            />
          ))}

          <Reveal
            as="section"
            aria-labelledby="start-title"
            className="mt-14 rounded-3xl bg-[#6E5F47] p-8 text-white md:p-10"
          >
            <h2
              id="start-title"
              lang="en"
              className="font-playfair text-4xl leading-[0.95] tracking-[-0.04em] md:text-5xl"
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

          <Reveal as="section" aria-labelledby="faq-title" className="mt-14">
            <h2
              id="faq-title"
              className="font-playfair text-3xl leading-[0.95] tracking-[-0.04em]"
            >
              {ui.faq}
            </h2>
            <div className="mt-6 space-y-6">
              {story.faq.map((item) => (
                <div key={item.q}>
                  <h3 className="font-poppins text-lg font-semibold">
                    {item.q}
                  </h3>
                  <p className="mt-1 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <p className="mt-12 text-sm leading-relaxed text-[#6E5F47]/85">
            {VERSE_ATTRIBUTION[story.lang]}
          </p>
        </div>

        <section
          aria-labelledby="more-title"
          className="mt-20 border-t border-[#E2DFDA] pt-12"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="more-title"
              className="font-playfair text-3xl leading-[0.95] tracking-[-0.04em] md:text-4xl"
            >
              {ui.more}
            </h2>
            <Link
              href={BLOG_PATH}
              className="inline-flex min-h-11 items-center font-poppins font-medium underline-offset-4 hover:underline"
            >
              {ui.allStories}
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {moreStories(story).map((other) => (
              <li key={other.slug}>
                <StoryCard story={other} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
