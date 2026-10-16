import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { HopeStoriesSection } from '@/components/sections/HopeStoriesSection';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { Reveal } from '@/components/ui/Reveal';
import { groupClass, rowClass } from '@/components/ui/listStyles';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/our-approach',
  'Our Approach',
  'How HopeBegins helps, from the moment something feels wrong to months later: why we exist, what we aim for, the six steps and every free tool.'
);

/*
 * The whole HopeBegins approach on one page, read top to bottom: why it
 * exists, what it aims for, the steps it walks someone through, and what
 * people can use. It replaces Our Story; /our-story redirects here.
 */

const GOALS = [
  {
    title: 'Help in the first minute.',
    text: 'Every page that names a feeling starts with something you can do right where you are.',
  },
  {
    title: 'A plan made for you.',
    text: 'Answer 9 questions and get a free plan for your week, in English or Taglish.',
  },
  {
    title: 'A tool you keep using.',
    text: 'Four weeks of practice, a Hope Card at the end, and a short check-in each month after.',
  },
  {
    title: 'Someone to turn to.',
    text: 'E-coaches on Messenger, Hope Carriers who pray for you, and the crisis line on every page.',
  },
];

const STAGES = [
  {
    name: 'The moment you realize',
    text: 'You search what you feel in your own words, like "pagod na ako", and land on a page with something you can do right now.',
    link: { href: '/pagod-na-ako', label: 'See "Pagod na ako"' },
  },
  {
    name: 'Telling us how you feel',
    text: 'You pick the feeling closest to yours, and we point you to one next step: calm down, a page for that feeling, or a person to talk to.',
    link: { href: '/#start', label: 'Open "How are you feeling?"' },
  },
  {
    name: 'The first hour',
    text: 'You answer 9 quick questions and get your Hopeful Beginning Plan: what your answers show, tools to try now, and one step for this week.',
    link: { href: '/action-plan', label: 'Make your plan' },
  },
  {
    name: 'The weeks after',
    text: 'You practise your tool most days for 4 weeks, with phone reminders and a weekly check-in to see what has changed.',
  },
  {
    name: 'Getting through it',
    text: 'After 4 weeks you see how far you have come, and keep the tool that helped most on your Hope Card.',
  },
  {
    name: 'Afterwards',
    text: 'A 1-minute check-in once a month. If things come back, your tool, your people and an e-coach are one tap away.',
  },
];

interface Offer {
  title: string;
  text: string;
  href?: string;
  ecoach?: boolean;
  external?: boolean;
}

const OFFERS: { title: string; items: Offer[] }[] = [
  {
    title: 'For right now',
    items: [
      {
        title: 'Tools for hard moments',
        text: 'Slow breathing, 5-4-3-2-1, worry time and more. A few minutes each.',
        href: '/tools',
      },
      {
        title: 'Games',
        text: 'Find the pair, Saranggola and The trip, for when your head is too full.',
        href: '/laro-muna',
      },
    ],
  },
  {
    title: 'People to talk to',
    items: [
      {
        title: 'E-coaches',
        text: 'Real people from Himala Everyday who listen and help you choose where to start, on Messenger.',
        ecoach: true,
      },
      {
        title: 'Hope Carriers',
        text: 'Volunteers who pray for the requests people send. You choose what to share.',
        href: '/prayers',
      },
      {
        title: 'Hope AI',
        text: 'An AI assistant you can talk things through with at any hour.',
        href: '/hope-ai',
      },
    ],
  },
  {
    title: 'To keep going',
    items: [
      {
        title: 'Hopeful Beginning Plan',
        text: 'A free plan from 9 questions, a 4-week tracker and a Hope Card. It stays on your phone.',
        href: '/action-plan',
      },
      {
        title: 'Five steps for hopeless days',
        text: 'A short video, a guided prayer and a Bible reading.',
        href: '/get-started',
      },
      {
        title: 'Daily Hope',
        text: 'A short, encouraging email every day for 21 days.',
        href: '/daily-hope',
      },
      {
        title: 'HopeCasts',
        text: 'Short audio messages on things like anxiety and family.',
        href: '/hopecasts',
      },
      {
        title: 'Prayer War Room',
        text: 'A free prayer app with guided prayer time and a private journal.',
        href: 'https://warroom.hopebegins.today',
        external: true,
      },
    ],
  },
];

const h2Class =
  'text-balance font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[1.05] tracking-[-0.03em]';

function OfferRow({ offer }: { offer: Offer }) {
  const body = (
    <>
      <span className="flex-1">
        <span className="block font-poppins font-bold text-[#6E5F47]">
          {offer.title}
        </span>
        <span className="block text-sm text-[#6E5F47]/85 leading-relaxed">
          {offer.text}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] group-hover:text-[#6E5F47]" />
    </>
  );
  if (offer.ecoach) {
    return (
      <EcoachLink linkName="ecoach_our_approach" className={rowClass}>
        {body}
      </EcoachLink>
    );
  }
  if (offer.external) {
    return (
      <a
        href={offer.href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClass}
      >
        {body}
      </a>
    );
  }
  return (
    <Link href={offer.href ?? '/'} className={rowClass}>
      {body}
    </Link>
  );
}

export default function OurApproachPage() {
  return (
    <div className="overflow-x-clip pt-10 pb-24 md:pt-16">
      <div className="px-6">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <h1 className="text-balance font-playfair text-5xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              We walk with you until you&apos;re through it.
            </h1>
            <p
              className="mt-6 font-poppins text-lg text-[#6E5F47] leading-[1.45] tracking-[-0.022em] hb-step-in"
              style={{ animationDelay: '120ms' }}
            >
              HopeBegins is free, faith-driven mental health support for
              Filipinos. You get help the moment something feels wrong, and you
              leave with a tool you can keep using.
            </p>

            <Reveal as="section" className="mt-16">
              <h2 className={h2Class}>Why we started</h2>
              <div className="mt-4 space-y-4 text-lg text-[#6E5F47] leading-relaxed">
                <p>
                  HopeBegins started as a small group that prayed for people.
                  Today people come to ask for prayer, make a plan for the week
                  and talk to an e-coach.
                </p>
                <p>
                  When you&apos;re at your lowest, help should be one tap away.
                  We want anyone who feels anxious or low to find it on their
                  phone, in English or Taglish.
                </p>
              </div>
            </Reveal>

            <Reveal as="section" className="mt-16">
              <h2 className={h2Class}>What we aim for</h2>
              <ol className="mt-5 space-y-4 text-[#6E5F47]">
                {GOALS.map((goal, index) => (
                  <li key={goal.title} className="flex gap-4">
                    <span className="font-playfair text-2xl leading-none text-[#AEC488] tabular-nums">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed">
                      <span className="font-poppins font-bold">
                        {goal.title}
                      </span>{' '}
                      {goal.text}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <section className="mt-16" aria-labelledby="steps-title">
              <Reveal>
                <h2 id="steps-title" className={h2Class}>
                  Step by step, from the first search to months later
                </h2>
              </Reveal>
              <ol className="relative mt-8">
                {/* The line fills in as you scroll, where the browser supports it. */}
                <span
                  aria-hidden
                  className="absolute left-[15px] top-2 bottom-2 w-0.5 rounded-full bg-[#DFE7CF]"
                />
                <span
                  aria-hidden
                  className="hb-timeline-fill absolute left-[15px] top-2 bottom-2 w-0.5 origin-top rounded-full bg-[#AEC488]"
                />
                {STAGES.map((stage, index) => (
                  <Reveal
                    key={stage.name}
                    as="li"
                    className="relative grid grid-cols-[32px_1fr] gap-4 pb-8 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#AEC488] bg-[#FCFDFA] font-poppins text-sm font-bold text-[#6E5F47]"
                    >
                      {index + 1}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
                        {stage.name}
                      </h3>
                      <p className="mt-1 text-[#6E5F47] leading-relaxed">
                        {stage.text}
                      </p>
                      {stage.link && (
                        <Link
                          href={stage.link.href}
                          className="mt-1 inline-flex min-h-11 items-center font-poppins text-sm font-bold text-[#6E5F47] underline underline-offset-4"
                        >
                          {stage.link.label}
                        </Link>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>

            <section className="mt-16" aria-labelledby="offers-title">
              <Reveal>
                <h2 id="offers-title" className={h2Class}>
                  What you can use, all free
                </h2>
              </Reveal>
              {OFFERS.map((group) => (
                <Reveal key={group.title} className="mt-8">
                  <h3 className="font-poppins font-bold text-[#6E5F47]">
                    {group.title}
                  </h3>
                  <ul className={`mt-3 ${groupClass}`}>
                    {group.items.map((offer) => (
                      <li key={offer.title}>
                        <OfferRow offer={offer} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </section>

            <Reveal as="section" className="mt-16">
              <h2 className={h2Class}>How we work</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[#6E5F47] leading-relaxed marker:text-[#AEC488]">
                <li>
                  The plan&apos;s steps come from CBT, a common talk therapy,
                  and the World Health Organization&apos;s stress guide.
                </li>
                <li>
                  Your plan, answers and Hope Card stay on your phone. We only
                  get your email if you ask us to send something.
                </li>
                <li>
                  The NCMH Crisis Hotline, 1553, is one tap away on every page,
                  24/7.
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <HopeStoriesSection />
      </div>

      <Reveal as="section" className="px-6 text-center">
        <h2 className="text-balance font-playfair text-4xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
          Not okay today?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/#start"
            className="inline-flex min-h-11 items-center rounded-2xl bg-[#6E5F47] px-8 py-3 font-poppins text-lg font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50"
          >
            That&apos;s me
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/action-plan"
            className="inline-flex min-h-11 items-center rounded-2xl border border-[#AEC488] bg-white px-8 py-3 font-poppins text-lg font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            Make my free plan
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
