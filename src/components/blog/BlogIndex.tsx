import Link from '@/components/ui/LocalLink';
import { Reveal } from '@/components/ui/Reveal';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { StoryCard } from '@/components/blog/StoryCard';
import { StoryList, type BlogCopy } from '@/components/blog/StoryList';
import {
  BLOG_NAME,
  stories,
  storyPairs,
  storyPath,
  storyUi,
  type Story,
} from '@/lib/blog';
import { isIntlLang } from '@/lib/i18n';
import { intlStories } from '@/lib/intl';
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
  fr: {
    eyebrow: 'Le blog de HopeBegins',
    title: 'Histoires d’espoir',
    intro:
      'Des histoires sincères sur des périodes difficiles, et sur les petites choses qui ont aidé à les traverser.',
    note: 'Par Anonyme. Chaque histoire réunit les vécus de plusieurs personnes.',
    find: 'Trouve une histoire qui te ressemble',
    all: 'Toutes les histoires',
  },
  de: {
    eyebrow: 'Der Blog von HopeBegins',
    title: 'Geschichten der Hoffnung',
    intro:
      'Ehrliche Geschichten über schwere Zeiten und die kleinen Dinge, die Menschen hindurchgeholfen haben.',
    note: 'Anonym verfasst. Jede Geschichte verbindet Erfahrungen mehrerer Menschen.',
    find: 'Finde eine Geschichte wie deine',
    all: 'Alle Geschichten',
  },
  es: {
    eyebrow: 'El blog de HopeBegins',
    title: 'Historias de esperanza',
    intro:
      'Historias sinceras sobre épocas difíciles y las pequeñas cosas que ayudaron a salir adelante.',
    note: 'Por Anónimo. Cada historia reúne vivencias de varias personas.',
    find: 'Encuentra una historia como la tuya',
    all: 'Todas las historias',
  },
  ko: {
    eyebrow: 'HopeBegins 블로그',
    title: '희망 이야기',
    intro:
      '힘든 시기를 지나온 솔직한 이야기와, 그 시간을 견디게 해 준 작은 것들을 담았어요.',
    note: '익명으로 쓴 글이에요. 이야기마다 여러 사람의 경험을 엮었어요.',
    find: '나와 닮은 이야기 찾기',
    all: '모든 이야기',
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
  // French, German, Spanish and Korean list their own stories, in the
  // English blog's order.
  const intl = lang && isIntlLang(lang) ? lang : undefined;
  const pairs: Partial<Record<FeelingLang, Story>>[] = intl
    ? storyPairs
        .map((pair) =>
          intlStories.find(
            (story) => story.lang === intl && story.pair === pair.en.slug
          )
        )
        .filter((story) => story !== undefined)
        .map((story) => ({ [intl]: story }))
    : storyPairs;
  const [featured, ...rest] = pairs;
  const cards = (pair: Partial<Record<FeelingLang, Story>>, big = false) =>
    Object.fromEntries(
      Object.entries(pair).map(([key, story]) => [
        key,
        big ? (
          <StoryCard story={story} featured headingLevel="h2" />
        ) : (
          <StoryCard story={story} />
        ),
      ])
    );
  const firstOf = (pair: Partial<Record<FeelingLang, Story>>) =>
    Object.values(pair)[0] as Story;
  // The closing box is in the page's language, as on the stories.
  const ui = storyUi[lang ?? 'en'];
  const structuredData = blogJsonLd({
    path,
    name,
    description,
    image,
    lang,
    posts: (intl ? intlStories : stories)
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
            featured={featured ? cards(featured, true) : {}}
            entries={rest.map((pair) => ({
              slug: firstOf(pair).slug,
              theme: firstOf(pair).theme,
              card: cards(pair),
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
            lang={intl ? undefined : 'en'}
            className="font-playfair text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl"
          >
            {ui.ctaTitle}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">
            {ui.ctaText}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TrackedLink
              href="/#start"
              linkName="story_thats_me"
              lang={intl ? undefined : 'en'}
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
