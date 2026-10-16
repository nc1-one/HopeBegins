import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Heart,
  Languages,
  MessageCircle,
} from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { ExerciseLauncher } from '@/components/tools/ExerciseLauncher';
import { MessageSomeone } from '@/components/tools/MessageSomeone';
import { WorryNote } from '@/components/tools/WorryNote';
import { feelingPages, feelingUi, getFeelingPage } from '@/lib/feelingPages';
import { pageMetadata } from '@/lib/pageMetadata';

// Only the phrases in feelingPages exist; any other root path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return feelingPages.map((page) => ({ feeling: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ feeling: string }>;
}) {
  const page = getFeelingPage((await params).feeling);
  if (!page) return {};
  const pair = getFeelingPage(page.pair);
  const tagalog = page.lang === 'tl' ? page : pair;
  const english = page.lang === 'en' ? page : pair;
  const path = `/${page.slug}`;
  return {
    ...pageMetadata(path, page.metaTitle, page.metaDescription, {
      url: `/og/feelings/${page.slug}.jpg`,
      alt: page.heading,
    }),
    // The Taglish and English pages are language versions of each other.
    alternates: {
      canonical: path,
      languages: {
        ...(tagalog && { 'tl-PH': `/${tagalog.slug}` }),
        ...(english && { 'en-PH': `/${english.slug}` }),
      },
    },
  };
}

function StepBody({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Heart;
  title: string;
  description: string;
}) {
  return (
    <>
      <Icon className="h-5 w-5 shrink-0 text-[#91AFAA]" />
      <span className="flex-1">
        <span className="block font-poppins font-bold text-[#6E5F47]">
          {title}
        </span>
        <span className="block text-sm text-[#6E5F47]/85 leading-relaxed">
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
    </>
  );
}

export default async function FeelingPage({
  params,
}: {
  params: Promise<{ feeling: string }>;
}) {
  const page = getFeelingPage((await params).feeling);
  if (!page) notFound();
  const ui = feelingUi[page.lang];

  const ecoach = (
    <EcoachLink
      key="ecoach"
      linkName={`ecoach_feeling_${page.slug}`}
      className={rowClass}
    >
      <StepBody
        icon={MessageCircle}
        title={ui.ecoachTitle}
        description={ui.ecoachText}
      />
    </EcoachLink>
  );
  const plan = (
    <Link
      key="plan"
      href={page.lang === 'tl' ? '/action-plan?lang=tl' : '/action-plan'}
      className={rowClass}
    >
      <StepBody
        icon={ClipboardList}
        title={ui.planTitle}
        description={ui.planText}
      />
    </Link>
  );
  const prayer = (
    <Link key="prayer" href="/prayers" className={rowClass}>
      <StepBody
        icon={Heart}
        title={ui.prayerTitle}
        description={ui.prayerText}
      />
    </Link>
  );
  const nextSteps = (
    page.firstStep === 'ecoach'
      ? [ecoach, plan, prayer]
      : [plan, ecoach, prayer]
  ).map((step) => <li key={step.key}>{step}</li>);

  return (
    <div lang={ui.htmlLang} className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <Link
            href={`/${page.pair}`}
            hrefLang={page.lang === 'tl' ? 'en' : 'tl'}
            className="mb-6 inline-flex min-h-11 items-center gap-2 -ml-3 rounded-xl px-3 text-sm font-medium text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]"
          >
            <Languages className="h-4 w-4" />
            {ui.switchLabel}
          </Link>
          <OptionPageHeader title={page.heading} subtitle={page.intro} />

          {page.talkNow && (
            <EcoachLink
              linkName={`ecoach_feeling_${page.slug}_top`}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-6 py-4 font-poppins font-bold text-white shadow-lg transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
              {ui.talkNow}
            </EcoachLink>
          )}

          {page.safetyFirst && (
            <div className="mt-8 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <p>{page.safetyFirst}</p>
              <p className="mt-2">
                {ui.crisisCall}{' '}
                <a
                  href="tel:1553"
                  className="font-bold underline underline-offset-4"
                >
                  1553
                </a>{' '}
                {ui.or}{' '}
                <a
                  href="tel:+639178998727"
                  className="font-bold underline underline-offset-4 whitespace-nowrap"
                >
                  0917 899 8727
                </a>
                . {ui.danger}
              </p>
            </div>
          )}

          <section aria-labelledby="tools-title" className="mt-10">
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
            <Link
              href={page.lang === 'tl' ? '/tools?lang=tl' : '/tools'}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#6E5F47] underline underline-offset-4 hover:text-[#5c4f3b]"
            >
              {ui.allTools}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {page.tip && (
            <section className="mt-8 border-l-4 border-[#AEC488] pl-5">
              <h2 className="font-poppins font-bold text-lg text-[#6E5F47]">
                {page.tip.title}
              </h2>
              <p className="mt-1 text-[#6E5F47] leading-relaxed">
                {page.tip.body}
              </p>
              {page.tools.includes('message') && (
                <Link
                  href="/hope-ai"
                  className="mt-3 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
                >
                  {ui.hopeAi}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </section>
          )}
        </div>

        <section
          aria-labelledby="next-title"
          className="mt-12 max-w-2xl border-t border-[#E2DFDA] pt-10"
        >
          <h2
            id="next-title"
            className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[1.05] tracking-[-0.03em]"
          >
            {ui.nextHeading}
          </h2>
          <ul className={`mt-5 ${groupClass}`}>{nextSteps}</ul>
          <p className="mt-6 text-sm text-[#6E5F47]">
            <Link
              href="/#start"
              className="inline-flex min-h-11 items-center font-bold underline underline-offset-4"
            >
              {ui.seeAll}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
