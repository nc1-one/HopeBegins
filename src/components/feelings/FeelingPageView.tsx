import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import { Languages } from 'lucide-react';
import { CrisisSentence } from '@/components/help/Crisis';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { Reveal } from '@/components/ui/Reveal';
import { StoriesLikeThis } from '@/components/blog/StoriesLikeThis';
import { ExerciseLauncher } from '@/components/tools/ExerciseLauncher';
import { MessageSomeone } from '@/components/tools/MessageSomeone';
import { WorryNote } from '@/components/tools/WorryNote';
import { primaryClass } from '@/components/tools/toolStyles';
import {
  feelingUi,
  getFeelingPage,
  type FeelingPage,
} from '@/lib/feelingPages';
import { getGuide } from '@/lib/guidePages';
import { isIntlLang, withLocale } from '@/lib/i18n';
import { intlPageFor } from '@/lib/intl';
import { photo, photoTurn } from '@/lib/photos';
import { jsonLdHtml, webPageJsonLd } from '@/lib/structuredData';
import { pathIn } from '@/lib/taglishTwins';

// Next steps read as plain links: no boxes, no icons.
const nextLinkClass =
  'inline-flex min-h-12 items-center font-poppins text-lg font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';

/**
 * A feeling page in any language. French, German, Spanish and Korean pages
 * live at /xx/slug, have no e-coach (EcoachLink sends them to local help)
 * and name their English page in `pair`.
 */
export function FeelingPageView({ page }: { page: FeelingPage }) {
  const intl = isIntlLang(page.lang) ? page.lang : undefined;
  const ui = feelingUi[page.lang];
  const path = intl ? withLocale(intl, `/${page.slug}`) : `/${page.slug}`;
  const topPhoto = photo(page.photo, photoTurn(), 0, page.lang);
  // Related pages can be other feelings or guides, named by their English
  // slug on the French, German, Spanish and Korean pages.
  const related = (page.related ?? [])
    .map((slug) =>
      intl ? intlPageFor(intl, slug) : (getFeelingPage(slug) ?? getGuide(slug))
    )
    .filter((other) => other !== undefined);
  const hrefOf = (other: { slug: string }) =>
    intl ? withLocale(intl, `/${other.slug}`) : `/${other.slug}`;

  const ecoach = (
    <EcoachLink
      key="ecoach"
      linkName={`ecoach_feeling_${page.slug}`}
      className={nextLinkClass}
    >
      {ui.ecoachTitle}
    </EcoachLink>
  );
  const plan = (
    <Link
      key="plan"
      href={pathIn('/action-plan', page.lang)}
      className={nextLinkClass}
    >
      {ui.planTitle}
    </Link>
  );
  const prayer = (
    <Link key="prayer" href="/prayers" className={nextLinkClass}>
      {ui.prayerTitle}
    </Link>
  );
  const nextSteps = (
    page.firstStep === 'ecoach'
      ? [ecoach, plan, prayer]
      : [plan, ecoach, prayer]
  ).map((step) => <li key={step.key}>{step}</li>);

  const structuredData = webPageJsonLd({
    path,
    name: page.metaTitle,
    description: page.metaDescription,
    lang: page.lang,
    image: `/og/feelings/${intl ? page.pair : page.slug}.jpg`,
    crumb: page.heading.replace(/[.?]$/, ''),
    faq: page.faq,
  });

  return (
    <div lang={ui.htmlLang} className="px-6 pt-6 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(structuredData)}
      />
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          {!intl && (
            <Link
              href={`/${page.pair}`}
              hrefLang={page.lang === 'tl' ? 'en' : 'tl'}
              className="mb-6 inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
            >
              <Languages className="h-4 w-4" />
              {ui.switchLabel}
            </Link>
          )}
          <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[16/9]">
            <Image
              src={topPhoto.src}
              alt=""
              fill
              // The page's first picture: fetched first and never lazy.
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
          <OptionPageHeader title={page.heading} subtitle={page.intro} />

          {page.talkNow && (
            <EcoachLink
              linkName={`ecoach_feeling_${page.slug}_top`}
              className={`mt-8 ${primaryClass}`}
            >
              {ui.talkNow}
            </EcoachLink>
          )}

          {page.medicalNote && (
            <p
              role="note"
              className="mt-8 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]"
            >
              {page.medicalNote}
            </p>
          )}

          {page.safetyFirst && (
            <div className="mt-8 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <p>{page.safetyFirst}</p>
              <p className="mt-2">
                <CrisisSentence lang={page.lang} />
              </p>
            </div>
          )}

          <Reveal as="section" aria-labelledby="tools-title" className="mt-10">
            <h2
              id="tools-title"
              className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              {page.toolsHeading}
            </h2>
            <div className="mt-5 space-y-4">
              {page.tools.map((tool) =>
                tool === 'message' ? (
                  <MessageSomeone key={tool} lang={page.lang} />
                ) : tool === 'worry-note' ? (
                  <WorryNote key={tool} lang={page.lang} />
                ) : (
                  <ExerciseLauncher key={tool} kind={tool} lang={page.lang} />
                )
              )}
            </div>
          </Reveal>

          {page.explain && (
            <Reveal
              as="section"
              aria-labelledby="explain-title"
              className="mt-12"
            >
              <h2
                id="explain-title"
                className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
              >
                {page.explain.title}
              </h2>
              <p className="mt-4 text-[#6E5F47] leading-relaxed">
                {page.explain.intro}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[#6E5F47] leading-relaxed marker:text-[#AEC488]">
                {page.explain.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-4 text-[#6E5F47] leading-relaxed">
                {page.explain.note}
              </p>
            </Reveal>
          )}

          {page.tip && (
            <Reveal
              as="section"
              className="mt-8 border-l-4 border-[#AEC488] pl-5"
            >
              <h2 className="font-playfair text-2xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
                {page.tip.title}
              </h2>
              <p className="mt-2 text-[#6E5F47] leading-relaxed">
                {page.tip.body}
              </p>
              {page.tip.hopeAi && (
                <Link
                  href="/hope-ai"
                  className="mt-2 inline-flex min-h-11 items-center font-poppins font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
                >
                  {ui.hopeAi}
                </Link>
              )}
            </Reveal>
          )}
          {page.faq && (
            <Reveal as="section" aria-labelledby="faq-title" className="mt-12">
              <h2
                id="faq-title"
                className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
              >
                {ui.faqHeading}
              </h2>
              <div className="mt-5 space-y-6">
                {page.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-poppins text-lg font-semibold text-[#6E5F47]">
                      {item.q}
                    </h3>
                    <p className="mt-1 text-[#6E5F47] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          <StoriesLikeThis
            pageSlug={intl ? page.pair : page.slug}
            lang={page.lang}
          />
        </div>

        <Reveal
          as="section"
          aria-labelledby="next-title"
          className="mt-12 max-w-2xl border-t border-[#E2DFDA] pt-10"
        >
          <h2
            id="next-title"
            className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
          >
            {ui.nextHeading}
          </h2>
          <ul className="mt-3">{nextSteps}</ul>
          {related.length > 0 && (
            <p className="mt-4 leading-loose text-[#6E5F47]">
              {ui.alsoRead}
              {related.map((other, index) => (
                <span key={other.slug}>
                  {' '}
                  <span className="whitespace-nowrap">
                    {index > 0 && <span aria-hidden>· </span>}
                    <Link
                      href={hrefOf(other)}
                      className="py-2.5 underline underline-offset-4 hover:text-[#5c4f3b]"
                    >
                      {other.label}
                    </Link>
                  </span>
                </span>
              ))}
            </p>
          )}
          {page.sources && (
            <p className="mt-6 text-sm text-[#6E5F47]/85 leading-relaxed">
              {ui.sources}{' '}
              {page.sources.map((source, index) => (
                <span key={source.href}>
                  {index > 0 && '; '}
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#5c4f3b]"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
