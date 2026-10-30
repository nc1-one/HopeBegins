import Link from '@/components/ui/LocalLink';
import { Reveal } from '@/components/ui/Reveal';
import type { FeelingLang } from '@/lib/feelingPages';
import { stories, storyPath } from '@/lib/blog';
import { isIntlLang, withLocale } from '@/lib/i18n';
import { intlStories } from '@/lib/intl';

const heading: Record<FeelingLang, string> = {
  en: 'Stories like this',
  tl: 'Mga kuwentong kahawig nito',
  fr: 'Des histoires qui y ressemblent',
  de: 'Geschichten wie diese',
  es: 'Historias como esta',
  ko: '비슷한 이야기',
};

/**
 * Up to three blog stories that point to this feeling page or guide, in its
 * language: someone who felt the same, and what helped. Nothing shows when
 * no story fits.
 */
export function StoriesLikeThis({
  pageSlug,
  lang,
}: {
  pageSlug: string;
  lang: FeelingLang;
}) {
  // French, German, Spanish and Korean stories name the English page.
  const matches = (isIntlLang(lang) ? intlStories : stories)
    .filter((story) => story.related === pageSlug && story.lang === lang)
    .slice(0, 3);
  if (matches.length === 0) return null;

  return (
    <Reveal as="section" aria-labelledby="stories-title" className="mt-12">
      <h2
        id="stories-title"
        className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        {heading[lang]}
      </h2>
      <ul className="mt-5 divide-y divide-[#E2DFDA] border-y border-[#E2DFDA]">
        {matches.map((story) => (
          <li key={story.slug} className="py-4">
            <Link
              href={
                isIntlLang(lang)
                  ? withLocale(lang, storyPath(story))
                  : storyPath(story)
              }
              className="font-poppins text-lg font-semibold text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {story.title}
            </Link>
            <p className="mt-1 leading-relaxed text-[#6E5F47]/90">
              {story.dek}
            </p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
