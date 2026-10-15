import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ClipboardList, Heart, MessageCircle } from 'lucide-react';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { ExerciseLauncher } from '@/components/tools/ExerciseLauncher';
import { MessageSomeone } from '@/components/tools/MessageSomeone';
import { WorryNote } from '@/components/tools/WorryNote';
import { feelingPages, getFeelingPage } from '@/lib/feelingPages';
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
  return pageMetadata(page.metaTitle, page.metaDescription, {
    url: `/og/feelings/${page.slug}.jpg`,
    alt: page.heading,
  });
}

const cardClass =
  'group flex h-full flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:border-[#DFE7CF] hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

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
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9EFEE] text-[#91AFAA]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-poppins font-bold text-[#6E5F47]">{title}</p>
        <p className="mt-1 text-sm text-[#6E5F47] leading-relaxed">
          {description}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
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

  const ecoach = (
    <EcoachLink
      key="ecoach"
      linkName={`ecoach_feeling_${page.slug}`}
      className={cardClass}
    >
      <StepBody
        icon={MessageCircle}
        title="Kausapin ang isang e-coach"
        description="Totoong tao mula sa Himala Everyday, sa Messenger."
      />
    </EcoachLink>
  );
  const plan = (
    <Link key="plan" href="/action-plan" className={cardClass}>
      <StepBody
        icon={ClipboardList}
        title="Gumawa ng sarili mong plano"
        description="9 na tanong, libre. Makakakuha ka ng mga hakbang para sa linggong ito."
      />
    </Link>
  );
  const prayer = (
    <Link key="prayer" href="/prayers" className={cardClass}>
      <StepBody
        icon={Heart}
        title="Gusto mo bang ipagdasal ka namin?"
        description="Magpadala ng prayer request. May Hope Carrier na magdarasal para sa iyo."
      />
    </Link>
  );
  const nextSteps =
    page.firstStep === 'ecoach'
      ? [ecoach, plan, prayer]
      : [plan, ecoach, prayer];

  return (
    <div className="px-6 pt-10 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader title={page.heading} subtitle={page.intro} />

          {page.talkNow && (
            <EcoachLink
              linkName={`ecoach_feeling_${page.slug}_top`}
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#6E5F47] px-6 py-4 font-poppins font-bold text-white shadow-lg transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
            >
              <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
              Kausapin ang isang e-coach ngayon
            </EcoachLink>
          )}

          {page.safetyFirst && (
            <div className="mt-8 rounded-2xl border border-[#AEC488] bg-[#EFF3E7] p-5 text-[#6E5F47]">
              <p>{page.safetyFirst}</p>
              <p className="mt-2">
                Tumawag ngayon sa NCMH Crisis Hotline, bukas 24/7:{' '}
                <a
                  href="tel:1553"
                  className="font-bold underline underline-offset-4"
                >
                  1553
                </a>{' '}
                o{' '}
                <a
                  href="tel:+639178998727"
                  className="font-bold underline underline-offset-4 whitespace-nowrap"
                >
                  0917 899 8727
                </a>
                . Kung nasa panganib ka ngayon, tumawag sa 911.
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
                  <MessageSomeone key={tool} />
                ) : tool === 'worry-note' ? (
                  <WorryNote key={tool} />
                ) : (
                  <ExerciseLauncher key={tool} kind={tool} />
                )
              )}
            </div>
          </section>

          {page.tip && (
            <section className="mt-8 border-l-4 border-[#AEC488] pl-5">
              <h2 className="font-poppins font-bold text-lg text-[#6E5F47]">
                {page.tip.title}
              </h2>
              <p className="mt-1 text-[#6E5F47] leading-relaxed">
                {page.tip.body}
              </p>
              {page.slug === 'wala-akong-kausap' && (
                <Link
                  href="/hope-ai"
                  className="mt-3 inline-flex items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
                >
                  Kausapin si Hope AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </section>
          )}
        </div>

        <section
          aria-labelledby="next-title"
          className="mt-12 border-t border-[#E2DFDA] pt-10"
        >
          <h2
            id="next-title"
            className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
          >
            Ano ang susunod?
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {nextSteps}
          </div>
          <p className="mt-6 text-sm text-[#6E5F47]">
            <Link
              href="/#start"
              className="font-bold underline underline-offset-4"
            >
              Tingnan ang lahat ng paraan para makatulong
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
