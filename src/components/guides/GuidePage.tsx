import Image from 'next/image';
import Link from '@/components/ui/LocalLink';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Languages } from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { Reveal } from '@/components/ui/Reveal';
import { StoriesLikeThis } from '@/components/blog/StoriesLikeThis';
import { feelingUi, getFeelingPage } from '@/lib/feelingPages';
import { getGuide, type Guide } from '@/lib/guidePages';
import { pageMetadata } from '@/lib/pageMetadata';
import { photo, photoTurn } from '@/lib/photos';
import { jsonLdHtml, webPageJsonLd } from '@/lib/structuredData';
import { pathIn } from '@/lib/taglishTwins';
import type { FeelingLang } from '@/lib/feelingPages';
import { isIntlLang, withLocale } from '@/lib/i18n';
import { intlPageFor } from '@/lib/intl';
import { hreflang } from '@/lib/intlMetadata';

const h2Class =
  'font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';
const nextLinkClass =
  'inline-flex min-h-12 items-center font-poppins text-lg font-medium text-[#6E5F47] underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';
const inlineLinkClass = 'underline underline-offset-4 hover:text-[#5c4f3b]';

const checkedLabel: Partial<Record<FeelingLang, string>> = {
  en: 'Numbers checked on',
  tl: 'Huling sinuri ang mga numero noong',
};

/** Title, description, preview and language pair for a guide. */
export function guideMetadata(slug: string): Metadata {
  const guide = getGuide(slug);
  if (!guide) return {};
  const path = `/${guide.slug}`;
  const pair = guide.pair ? getGuide(guide.pair) : undefined;
  const english = guide.lang === 'en' ? guide : pair;
  return {
    ...pageMetadata(path, guide.metaTitle, guide.metaDescription, {
      image: { url: `/og/guides/${guide.slug}.jpg`, alt: guide.heading },
      keywords: guide.keywords,
      lang: guide.lang,
    }),
    alternates: {
      canonical: path,
      ...(english && { languages: hreflang(`/${english.slug}`) }),
    },
  };
}

/**
 * Any feeling page or guide, as a link. French, German, Spanish and Korean
 * guides name them by their English slug.
 */
function sitePage(slug: string, lang: FeelingLang) {
  if (isIntlLang(lang)) {
    const page = intlPageFor(lang, slug);
    return (
      page && { href: withLocale(lang, `/${page.slug}`), label: page.label }
    );
  }
  const page = getFeelingPage(slug) ?? getGuide(slug);
  return page && { href: `/${page.slug}`, label: page.label };
}

function Section({ section }: { section: Guide['sections'][number] }) {
  const body = (
    <>
      <h2
        className={
          section.safety
            ? 'font-playfair text-2xl leading-[0.95] tracking-[-0.04em]'
            : h2Class
        }
      >
        {section.title}
      </h2>
      {section.sayings && (
        <ul className="mt-5 space-y-3">
          {section.sayings.map((saying) => (
            <li
              key={saying}
              className="border-l-4 border-[#AEC488] pl-4 font-playfair text-xl leading-snug text-[#6E5F47]"
            >
              &ldquo;{saying}&rdquo;
            </li>
          ))}
        </ul>
      )}
      {section.list && (
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed marker:text-[#AEC488]">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.terms && (
        <dl className="mt-6 divide-y divide-[#E2DFDA] border-y border-[#E2DFDA]">
          {section.terms.map((item) => (
            <div key={item.term} className="py-5">
              <dt className="font-playfair text-2xl leading-[0.95] tracking-[-0.04em]">
                {item.term}{' '}
                <span className="font-dm-sans text-base tracking-normal text-[#6E5F47]/85">
                  ({item.words})
                </span>
              </dt>
              <dd className="mt-2 leading-relaxed">
                {item.meaning}
                {item.link && (
                  <>
                    {' '}
                    <Link
                      href={item.link.href}
                      className={`whitespace-nowrap font-medium ${inlineLinkClass}`}
                    >
                      {item.link.label}
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {section.verses && (
        <ul className="mt-6 space-y-6">
          {section.verses.map((verse) => (
            <li key={verse.reference}>
              <blockquote className="font-playfair text-xl italic leading-snug text-[#6E5F47] md:text-2xl">
                {/* As published: some verses carry their own quotation marks. */}
                {verse.text}
              </blockquote>
              <p className="mt-2 font-poppins text-sm font-medium text-[#6E5F47]/85">
                {verse.reference}
              </p>
            </li>
          ))}
        </ul>
      )}
      {section.services && (
        <ul className="mt-6 divide-y divide-[#E2DFDA] border-y border-[#E2DFDA]">
          {section.services.map((service) => (
            <li key={service.name} className="py-5">
              <p className="font-poppins text-lg font-semibold">
                {service.href ? (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    {service.name}
                  </a>
                ) : (
                  service.name
                )}
              </p>
              <p className="mt-1 leading-relaxed">{service.detail}</p>
              {service.numbers && (
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {service.numbers.map((number) => (
                    <a
                      key={number.tel}
                      href={`tel:${number.tel}`}
                      className="whitespace-nowrap font-bold underline underline-offset-4"
                    >
                      {number.label}
                    </a>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </>
  );

  return section.safety ? (
    <Reveal
      as="section"
      className="mt-12 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]"
    >
      {body}
    </Reveal>
  ) : (
    <Reveal as="section" className="mt-12 text-[#6E5F47]">
      {body}
    </Reveal>
  );
}

/**
 * A guide page: photo, the answer in sections, then where to go next. Pass
 * `guide` for a French, German, Spanish or Korean guide.
 */
export function GuidePage({
  slug,
  guide: given,
}: {
  slug?: string;
  guide?: Guide;
}) {
  const guide = given ?? (slug ? getGuide(slug) : undefined);
  if (!guide) notFound();
  const intl = isIntlLang(guide.lang) ? guide.lang : undefined;
  const ui = feelingUi[guide.lang];
  const topPhoto = photo(guide.photo, photoTurn(), 0, guide.lang);
  const related = (guide.related ?? [])
    .map((other) => sitePage(other, guide.lang))
    .filter((link) => link !== undefined);
  const structuredData = webPageJsonLd({
    path: intl ? withLocale(intl, `/${guide.slug}`) : `/${guide.slug}`,
    name: guide.metaTitle,
    description: guide.metaDescription,
    lang: guide.lang,
    image: `/og/guides/${intl ? guide.pair : guide.slug}.jpg`,
    crumb: guide.label,
    faq: guide.faq,
  });

  return (
    <div lang={ui.htmlLang} className="px-6 pt-6 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(structuredData)}
      />
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          {guide.pair && !intl && (
            <Link
              href={`/${guide.pair}`}
              hrefLang={guide.lang === 'tl' ? 'en' : 'tl'}
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
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
          <OptionPageHeader title={guide.heading} subtitle={guide.intro} />

          {guide.sections.map((section) => (
            <Section key={section.title} section={section} />
          ))}

          {guide.faq && (
            <Reveal as="section" aria-labelledby="faq-title" className="mt-12">
              <h2 id="faq-title" className={h2Class}>
                {ui.faqHeading}
              </h2>
              <div className="mt-5 space-y-6">
                {guide.faq.map((item) => (
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
            pageSlug={intl ? (guide.pair ?? guide.slug) : guide.slug}
            lang={guide.lang}
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
          <ul className="mt-3">
            <li>
              <EcoachLink
                linkName={`ecoach_guide_${guide.slug}`}
                className={nextLinkClass}
              >
                {ui.ecoachTitle}
              </EcoachLink>
            </li>
            <li>
              <Link
                href={pathIn('/action-plan', guide.lang)}
                className={nextLinkClass}
              >
                {ui.planTitle}
              </Link>
            </li>
            <li>
              <Link href="/prayers" className={nextLinkClass}>
                {ui.prayerTitle}
              </Link>
            </li>
          </ul>
          {related.length > 0 && (
            <p className="mt-4 leading-loose text-[#6E5F47]">
              {ui.alsoRead}
              {related.map((link, index) => (
                <span key={link.href}>
                  {' '}
                  <span className="whitespace-nowrap">
                    {index > 0 && <span aria-hidden>· </span>}
                    <Link
                      href={link.href}
                      className={`py-2.5 ${inlineLinkClass}`}
                    >
                      {link.label}
                    </Link>
                  </span>
                </span>
              ))}
            </p>
          )}
          {(guide.sources || guide.attribution || guide.checkedOn) && (
            <div className="mt-6 space-y-2 text-sm text-[#6E5F47]/85 leading-relaxed">
              {guide.checkedOn && (
                <p>
                  {checkedLabel[guide.lang] ?? checkedLabel.en}{' '}
                  {guide.checkedOn}.
                </p>
              )}
              {guide.sources && (
                <p>
                  {ui.sources}{' '}
                  {guide.sources.map((source, index) => (
                    <span key={source.href}>
                      {index > 0 && '; '}
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={inlineLinkClass}
                      >
                        {source.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
              {guide.attribution && <p>{guide.attribution}</p>}
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
