import Image from 'next/image';
import Link from 'next/link';
import {
  readingMinutes,
  storyPath,
  storyUi,
  THEMES,
  type Story,
} from '@/lib/hopeUnfiltered';

/**
 * A story in a list: photo, theme, title and the line under it. The whole
 * card is one link, named by the title.
 */
export function StoryCard({
  story,
  featured = false,
  headingLevel: Heading = 'h3',
}: {
  story: Story;
  /** The large card at the top of the blog. */
  featured?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const ui = storyUi[story.lang];
  return (
    <Link
      href={storyPath(story)}
      lang={ui.htmlLang}
      className={`group block h-full rounded-2xl text-[#6E5F47] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50 ${
        featured
          ? 'md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10'
          : ''
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-[#EFF3E7] ${
          featured ? 'aspect-[4/3] md:aspect-[5/4]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={story.photo.src}
          alt=""
          fill
          sizes={
            featured
              ? '(min-width: 1024px) 560px, (min-width: 768px) 55vw, 100vw'
              : '(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw'
          }
          className="object-cover transition-transform duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          {...(featured && { preload: true, fetchPriority: 'high' as const })}
        />
      </div>
      <div className={featured ? 'mt-5 md:mt-0' : 'mt-4'}>
        <p className="flex flex-wrap items-center gap-x-2 font-poppins text-xs font-medium uppercase tracking-[0.08em] text-[#6E5F47]/80">
          <span>{THEMES[story.lang][story.theme]}</span>
          <span aria-hidden>·</span>
          <span>{ui.minRead(readingMinutes(story))}</span>
          {story.lang === 'tl' && (
            <span className="rounded-full bg-[#DFE7CF] px-2 py-0.5 normal-case tracking-normal">
              Taglish
            </span>
          )}
        </p>
        <Heading
          className={`mt-2 text-balance font-playfair leading-[0.95] tracking-[-0.04em] underline-offset-4 group-hover:underline ${
            featured ? 'text-4xl md:text-5xl' : 'text-2xl'
          }`}
        >
          {story.title}
        </Heading>
        <p
          className={`mt-3 leading-relaxed text-[#6E5F47]/90 ${
            featured ? 'text-lg' : 'line-clamp-3'
          }`}
        >
          {story.dek}
        </p>
        {featured && (
          <p className="mt-4 font-poppins text-sm text-[#6E5F47]/80">
            {story.who}
          </p>
        )}
      </div>
    </Link>
  );
}
