import Link from 'next/link';
import {
  ArrowRight,
  BookHeart,
  ClipboardList,
  Gamepad2,
  HandHeart,
  Headphones,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  NotebookPen,
  Phone,
  Smartphone,
  Sparkles,
  Sunrise,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/our-approach',
  'Our Approach',
  'How HopeBegins helps, from the moment something feels wrong to months later: the six stages, our goals, why we exist and every free tool.'
);

/*
 * The whole HopeBegins approach on one page: why it exists, what it aims
 * for, the six stages it walks with someone through, and every tool and
 * service. It replaces Our Story; /our-story redirects here.
 */

const GOALS = [
  {
    title: 'Help in the first minute',
    text: 'Every page that names a feeling starts with a 2-minute exercise you can do right where you are.',
  },
  {
    title: 'A plan made for you',
    text: 'Answer 9 questions and get a free plan for your week, in English or Taglish.',
  },
  {
    title: 'A tool you keep using',
    text: 'Four weeks of daily practice, a Hope Card at the end, and a monthly check-in after.',
  },
  {
    title: 'Someone to turn to',
    text: 'E-coaches on Messenger, Hope Carriers who pray for you, and the crisis line one tap away on every page.',
  },
];

const STAGES = [
  {
    name: 'The moment you realize',
    text: 'You search what you feel in your own words, like "pagod na ako", and land on a page with a 2-minute tool you can do right now.',
    link: { href: '/pagod-na-ako', label: 'See "Pagod na ako"' },
  },
  {
    name: 'Telling us how you feel',
    text: 'You tell us how you feel today. We point you to one next step: calm down now, a page for that feeling, or a person to talk to.',
    link: { href: '/#start', label: 'Open "How are you feeling?"' },
  },
  {
    name: 'The first hour',
    text: 'You answer 9 quick questions and get your Hopeful Beginning Plan: what your answers show, tools to try now, and one step for this week.',
    link: { href: '/action-plan', label: 'Make your plan' },
  },
  {
    name: 'The weeks after',
    text: 'You practise your tool most days for 4 weeks, with reminders on your phone and a weekly check-in to see what has changed.',
  },
  {
    name: 'Getting through it',
    text: 'After 4 weeks you see how far you have come, pick the tool that helped most, and keep it on your Hope Card.',
  },
  {
    name: 'Afterwards',
    text: 'A 1-minute check-in once a month. If things come back, your tool, your people and an e-coach are one tap away.',
  },
];

interface Product {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  ecoach?: boolean;
  external?: boolean;
}

const PRODUCTS: Product[] = [
  {
    icon: Wind,
    title: 'Calm-down tools',
    text: 'Slow breathing and 5-4-3-2-1 grounding, guided step by step, for when your chest is tight.',
    href: '/how-to-calm-anxiety',
  },
  {
    icon: Gamepad2,
    title: 'Find the pair',
    text: 'A 2-minute card game with jeepneys, mangoes and parols, for when your thoughts keep going round.',
    href: '/laro-muna',
  },
  {
    icon: NotebookPen,
    title: 'Worry note',
    text: 'Write down what keeps you up at night, then put it away until morning. It stays on your phone.',
    href: '/cant-sleep-overthinking',
  },
  {
    icon: ClipboardList,
    title: 'Hopeful Beginning Plan',
    text: 'A free plan from 9 questions, with a 4-week tracker and reminders. It stays on your phone.',
    href: '/action-plan',
  },
  {
    icon: BookHeart,
    title: 'Hope Card',
    text: 'The tool that helped you most, your warning signs and your people, kept for the hard days.',
    href: '/action-plan',
  },
  {
    icon: MessageCircle,
    title: 'E-coaches',
    text: 'Real people from Himala Everyday who listen and help you choose where to start, on Messenger.',
    ecoach: true,
  },
  {
    icon: HandHeart,
    title: 'Hope Carriers',
    text: 'Volunteers who pray for the requests people send. You choose what to share.',
    href: '/prayers',
  },
  {
    icon: Sunrise,
    title: 'Five steps for hopeless days',
    text: 'A short video, a guided prayer and a Bible reading, for when you feel you have no hope left.',
    href: '/get-started',
  },
  {
    icon: MessageSquare,
    title: 'Hope AI',
    text: 'An AI assistant you can talk things through with at any hour.',
    href: '/hope-ai',
  },
  {
    icon: Headphones,
    title: 'HopeCasts',
    text: 'Short audio messages on things like anxiety and family.',
    href: '/hopecasts',
  },
  {
    icon: Mail,
    title: 'Daily Hope',
    text: 'A short, encouraging email every day for 21 days.',
    href: '/daily-hope',
  },
  {
    icon: Smartphone,
    title: 'Prayer War Room',
    text: 'A free prayer app with guided prayer time, a private journal and a list of answered prayers.',
    href: 'https://warroom.hopebegins.today',
    external: true,
  },
];

const HOPE = [
  ['Heal', 'what still hurts from the past'],
  ['Overcome', 'what you face today'],
  ['Purpose', 'your reason to keep going'],
  ['Embrace', 'a future with hope in it'],
];

const eyebrowClass =
  'font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[#6E5F47]';
const sectionTitleClass =
  'mt-3 text-balance font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[1.02] tracking-[-0.03em]';
const productCardClass =
  'group flex h-full flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DFE7CF] hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 motion-reduce:hover:translate-y-0';

function ProductCard({ product }: { product: Product }) {
  const body = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9EFEE] text-[#6E5F47]">
        <product.icon className="h-5 w-5" />
      </span>
      <span className="flex-1">
        <span className="block font-poppins font-bold text-[#6E5F47]">
          {product.title}
        </span>
        <span className="mt-1 block text-sm text-[#6E5F47] leading-relaxed">
          {product.text}
        </span>
      </span>
      <ArrowRight className="h-4 w-4 text-[#C5BFB5] transition-transform group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
    </>
  );
  if (product.ecoach) {
    return (
      <EcoachLink linkName="ecoach_our_approach" className={productCardClass}>
        {body}
      </EcoachLink>
    );
  }
  if (product.external) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className={productCardClass}
      >
        {body}
      </a>
    );
  }
  return (
    <Link href={product.href ?? '/'} className={productCardClass}>
      {body}
    </Link>
  );
}

export default function OurApproachPage() {
  return (
    <div className="overflow-x-clip px-6 pt-10 pb-24 md:pt-16">
      <div className="mx-auto max-w-5xl">
        {/* Thesis */}
        <header className="max-w-3xl">
          <p className={`${eyebrowClass} hb-step-in`}>Our approach</p>
          <h1 className="mt-4 text-balance font-playfair text-5xl md:text-7xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
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
        </header>

        {/* Why */}
        <Reveal as="section" className="mt-20 md:mt-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className={eyebrowClass}>Why HopeBegins</p>
              <h2 className={sectionTitleClass}>
                When you&apos;re at your lowest, help should be one tap away.
              </h2>
            </div>
            <div className="space-y-5 text-lg text-[#6E5F47] leading-relaxed lg:pt-8">
              <p>
                HopeBegins started as a small group that prayed for people.
                Today people come to ask for prayer, make a plan for the week
                and talk to an e-coach.
              </p>
              <p>
                We want anyone who feels anxious or low to find free help on
                their phone, in English or Taglish.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Goals */}
        <section className="mt-20 md:mt-28" aria-labelledby="goals-title">
          <Reveal>
            <p className={eyebrowClass}>What we aim for</p>
            <h2 id="goals-title" className={sectionTitleClass}>
              Four things we do for everyone who visits.
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {GOALS.map((goal, index) => (
              <Reveal
                key={goal.title}
                as="li"
                delay={index * 90}
                className="rounded-3xl border border-[#DFE7CF] bg-[#EFF3E7] p-6 md:p-8"
              >
                <span className="font-playfair text-4xl text-[#AEC488] tabular-nums">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-poppins text-xl font-bold text-[#6E5F47]">
                  {goal.title}
                </h3>
                <p className="mt-2 text-[#6E5F47] leading-relaxed">
                  {goal.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* The journey */}
        <section className="mt-20 md:mt-28" aria-labelledby="journey-title">
          <Reveal>
            <p className={eyebrowClass}>Step by step</p>
            <h2 id="journey-title" className={sectionTitleClass}>
              From the first search to months later.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#6E5F47] leading-relaxed">
              Six stages. Each one has a clear next step.
            </p>
          </Reveal>
          <ol className="relative mt-12">
            {/* The line fills in as you scroll, where the browser supports it. */}
            <span
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-0.5 rounded-full bg-[#DFE7CF] md:left-1/2 md:-translate-x-1/2"
            />
            <span
              aria-hidden
              className="hb-timeline-fill absolute left-[19px] top-2 bottom-2 w-0.5 origin-top rounded-full bg-[#AEC488] md:left-1/2 md:-translate-x-1/2"
            />
            {STAGES.map((stage, index) => (
              <Reveal
                key={stage.name}
                as="li"
                className={`relative grid grid-cols-[40px_1fr] gap-5 pb-10 last:pb-0 md:grid-cols-2 md:gap-16 ${
                  index % 2 ? 'md:[&>div]:col-start-2' : ''
                }`}
              >
                <span
                  aria-hidden
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#AEC488] bg-[#FCFDFA] font-poppins text-sm font-bold text-[#6E5F47] md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                  {index + 1}
                </span>
                <div
                  className={`rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm ${
                    index % 2 ? '' : 'md:text-right'
                  }`}
                >
                  <p className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[#6E5F47]">
                    Stage {index + 1}
                  </p>
                  <h3 className="mt-2 font-poppins text-xl font-bold text-[#6E5F47]">
                    {stage.name}
                  </h3>
                  <p className="mt-2 text-[#6E5F47] leading-relaxed">
                    {stage.text}
                  </p>
                  {stage.link && (
                    <Link
                      href={stage.link.href}
                      className="mt-3 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
                    >
                      {stage.link.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* What you can use */}
        <section className="mt-20 md:mt-28" aria-labelledby="tools-title">
          <Reveal>
            <p className={eyebrowClass}>What you can use</p>
            <h2 id="tools-title" className={sectionTitleClass}>
              Everything HopeBegins gives you, free.
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <Reveal key={product.title} as="li" delay={(index % 3) * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </ul>
        </section>

        {/* How it holds together */}
        <Reveal as="section" className="mt-20 md:mt-28">
          <div className="rounded-[2rem] bg-[#6E5F47] p-8 text-white md:p-14">
            <p className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              How we work
            </p>
            <h2 className="mt-3 text-balance font-playfair text-3xl md:text-5xl leading-[1.02] tracking-[-0.03em]">
              What HOPE stands for
            </h2>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOPE.map(([word, rest]) => (
                <div key={word}>
                  <dt className="font-playfair text-3xl">
                    <span className="text-[#AEC488]">{word[0]}</span>
                    {word.slice(1)}
                  </dt>
                  <dd className="mt-1 text-white/85">{rest}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-10 grid gap-5 border-t border-white/15 pt-8 lg:grid-cols-3">
              <li className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#AEC488]" />
                <p className="text-white/90 leading-relaxed">
                  The plan&apos;s steps come from CBT, a common talk therapy,
                  and the World Health Organization&apos;s stress guide.
                </p>
              </li>
              <li className="flex gap-3">
                <Lock className="mt-1 h-5 w-5 shrink-0 text-[#AEC488]" />
                <p className="text-white/90 leading-relaxed">
                  Your plan, answers and Hope Card stay on your phone. We only
                  receive your email if you ask us to send something.
                </p>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-[#AEC488]" />
                <p className="text-white/90 leading-relaxed">
                  The NCMH Crisis Hotline, 1553, is one tap away on every page,
                  24/7.
                </p>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Start */}
        <Reveal as="section" className="mt-20 text-center md:mt-28">
          <h2 className="text-balance font-playfair text-4xl md:text-6xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
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
    </div>
  );
}
