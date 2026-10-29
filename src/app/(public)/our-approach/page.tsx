import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageJsonLd } from '@/components/layout/PageJsonLd';
import { HopeStoriesSection } from '@/components/sections/HopeStoriesSection';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/pageMetadata';
import { photo, photoTurn } from '@/lib/photos';
import { ApproachOffers, type Offer } from './ApproachOffers';
import { ApproachSteps, type ApproachStep } from './ApproachSteps';

const PATH = '/our-approach';
const TITLE = 'Our approach';
const DESCRIPTION =
  'How HopeBegins helps, from the moment something feels wrong to months later: why we exist, what we aim for, the six steps and every free tool.';

export const metadata = pageMetadata(PATH, TITLE, DESCRIPTION, {
  keywords: [
    'how HopeBegins helps',
    'faith-driven mental health support',
    'Christian mental health support Philippines',
    'free mental health support Philippines',
    'hope stories',
    'e-coaching',
  ],
});

/*
 * The whole HopeBegins approach on one page, read top to bottom: why it
 * exists, what it aims for, the steps it walks someone through, and what
 * people can use. It replaces Our Story; /our-story redirects here.
 */

const GOALS = [
  {
    title: 'Help in the first minute',
    text: 'Every feeling page starts with something to do right now.',
  },
  {
    title: 'A plan made for you',
    text: '9 questions, then small steps for your week.',
  },
  {
    title: 'A tool you keep using',
    text: '4 weeks of practice and a Hope Card to keep.',
  },
  {
    title: 'Someone to turn to',
    text: 'E-coaches, Hope Carriers, and the crisis line on every page.',
  },
];

const STAGES: ApproachStep[] = [
  {
    name: 'The moment you realize',
    text: 'You search "pagod na ako" late at night and land on a page with something to do right now.',
    photo: 'sleep',
    link: { href: '/pagod-na-ako', label: 'See "Pagod na ako"' },
  },
  {
    name: 'Telling us how you feel',
    text: 'You pick how you feel, and we show you one next step, or a real person to talk to.',
    photo: 'talk',
    link: { href: '/#start', label: 'Open "How are you feeling?"' },
  },
  {
    name: 'The first hour',
    text: 'You answer 9 questions and get your Hopeful Beginning Plan.',
    photo: 'morning',
    link: { href: '/action-plan', label: 'Make your plan' },
  },
  {
    name: 'The weeks after',
    text: 'You practise your tool most days for 4 weeks, with reminders on your phone.',
    photo: 'unsure',
  },
  {
    name: 'Getting through it',
    text: 'You see how far you have come, and keep what helped on your Hope Card.',
    photo: 'hope',
    // The hero already shows this turn's sunrise; take the next one.
    offset: 1,
  },
  {
    name: 'Afterwards',
    text: 'A 1-minute check-in each month, and help one tap away if things come back.',
    photo: 'care',
  },
];

const OFFERS: { title: string; items: Offer[] }[] = [
  {
    title: 'For right now',
    items: [
      {
        title: 'Tools for hard moments',
        text: 'Breathing, 5-4-3-2-1, worry time and more.',
        href: '/tools',
      },
      {
        title: 'Games',
        text: 'Find the pair, Saranggola and The trip.',
        href: '/laro-muna',
      },
    ],
  },
  {
    title: 'People to talk to',
    items: [
      {
        title: 'E-coaches',
        text: 'Real people from Himala Everyday, on Messenger.',
        ecoach: true,
      },
      {
        title: 'Hope Carriers',
        text: 'Volunteers who pray for your request.',
        href: '/prayers',
      },
      {
        title: 'Hope AI',
        text: 'An AI assistant, any hour.',
        href: '/hope-ai',
      },
    ],
  },
  {
    title: 'To keep going',
    items: [
      {
        title: 'Hopeful Beginning Plan',
        text: 'A free plan that stays on your phone.',
        href: '/action-plan',
      },
      {
        title: 'Five steps for hopeless days',
        text: 'A video, a prayer and a Bible reading.',
        href: '/get-started',
      },
      {
        title: 'Daily Hope',
        text: 'An encouraging email a day for 21 days.',
        href: '/daily-hope',
      },
      {
        title: 'HopeCasts',
        text: 'Short audio messages of hope.',
        href: '/hopecasts',
      },
      {
        title: 'Prayer War Room',
        text: 'A free prayer app.',
        href: 'https://warroom.hopebegins.today',
        external: true,
      },
    ],
  },
];

const HOW = [
  {
    title: 'The method',
    text: "The plan's steps come from CBT, a common talk therapy, and the World Health Organization's stress guide.",
  },
  {
    title: 'Your privacy',
    text: 'Your plan, answers and Hope Card stay on your phone. We only get your email if you ask us to send something.',
  },
  {
    title: 'In a crisis',
    text: 'The NCMH Crisis Hotline, 1553, is one tap away on every page, 24/7.',
  },
];

const h2Class =
  'text-balance font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]';

export default function OurApproachPage() {
  const turn = photoTurn();
  const hero = photo('hope', turn);
  return (
    <div className="overflow-x-clip pt-10 md:pt-16">
      <PageJsonLd
        path={PATH}
        name={TITLE}
        description={DESCRIPTION}
        lang="en"
        crumb={TITLE}
      />
      <div className="px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-3xl text-balance font-playfair text-5xl md:text-7xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
            We walk with you until you&apos;re through it.
          </h1>
          <p
            className="mt-6 max-w-2xl font-poppins text-lg md:text-xl text-[#6E5F47] leading-[1.4] tracking-[-0.022em] hb-step-in"
            style={{ animationDelay: '120ms' }}
          >
            HopeBegins is free, faith-driven mental health support for
            Filipinos. You get help the moment something feels wrong, and you
            leave with a tool you can keep using.
          </p>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[21/9]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover hb-photo-settle"
            />
          </div>

          <Reveal
            as="section"
            className="mt-20 grid gap-6 md:mt-28 md:grid-cols-[1fr_1.3fr] md:gap-14"
          >
            <h2 className={h2Class}>Why we started</h2>
            <div className="space-y-4 text-lg text-[#6E5F47] leading-relaxed">
              <p>
                HopeBegins started as a small group that prayed for people.
                Today people come to ask for prayer, make a plan for the week
                and talk to an e-coach.
              </p>
              <p>
                When you&apos;re at your lowest, help should be one tap away. We
                want anyone who feels anxious or low to find it on their phone,
                in English or Taglish.
              </p>
            </div>
          </Reveal>

          <section aria-labelledby="goals-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="goals-title" className={h2Class}>
                What we aim for
              </h2>
            </Reveal>
            <ol className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {GOALS.map((goal, index) => (
                <Reveal key={goal.title} as="li" className="flex gap-5">
                  <span className="w-9 shrink-0 font-playfair text-5xl leading-none text-[#AEC488] tabular-nums">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-poppins text-xl font-semibold text-[#6E5F47]">
                      {goal.title}
                    </span>
                    <span className="mt-1 block text-[#6E5F47] leading-relaxed">
                      {goal.text}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-labelledby="steps-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="steps-title" className={h2Class}>
                Step by step, from the first search to months later
              </h2>
            </Reveal>
            <ApproachSteps steps={STAGES} turn={turn} />
          </section>

          <section aria-labelledby="offers-title" className="mt-20 md:mt-28">
            <Reveal>
              <h2 id="offers-title" className={h2Class}>
                What you can use, all free
              </h2>
            </Reveal>
            <ApproachOffers groups={OFFERS} />
          </section>

          <section
            aria-labelledby="how-title"
            className="mt-20 border-t border-[#E2DFDA] pt-12 md:mt-28"
          >
            <h2 id="how-title" className="sr-only">
              How we work
            </h2>
            <ul className="grid gap-8 md:grid-cols-3">
              {HOW.map((item) => (
                <Reveal key={item.title} as="li">
                  <p className="font-poppins text-lg font-semibold text-[#6E5F47]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[#6E5F47] leading-relaxed">
                    {item.text}
                  </p>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <HopeStoriesSection />
      </div>

      {/* The end: a real dawn, and the same first step as the home page. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={photo('dawn', turn).src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover hb-photo-settle"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <Reveal className="px-6 py-24 text-center md:py-32">
          <h2 className="text-balance font-playfair text-5xl md:text-7xl text-white leading-[0.95] tracking-[-0.04em]">
            Not okay <em className="text-[#EFF3E7]">today</em>?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#start"
              className="inline-flex min-h-12 items-center rounded-2xl bg-white px-8 font-poppins text-lg font-bold text-[#6E5F47] transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              That&apos;s me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/action-plan"
              className="inline-flex min-h-12 items-center rounded-2xl border border-white/70 px-8 font-poppins text-lg font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              Make my free plan
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
