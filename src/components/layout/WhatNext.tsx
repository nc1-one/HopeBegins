'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  ClipboardList,
  Heart,
  Mail,
  MessageCircle,
  MessageSquare,
  Radio,
} from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { ECOACH_APP_URL } from '@/lib/actionPlan';

type OptionKey =
  | 'plan'
  | 'ecoach'
  | 'prayers'
  | 'hopeAi'
  | 'hopecasts'
  | 'dailyHope';

const options: Record<
  OptionKey,
  { title: string; description: string; href: string; icon: typeof Heart }
> = {
  plan: {
    title: 'Get your free plan',
    description: '9 quick questions, then small steps for this week.',
    href: '/action-plan',
    icon: ClipboardList,
  },
  ecoach: {
    title: 'Talk to an e-coach',
    description: 'A real person from Himala Everyday, on Messenger.',
    href: ECOACH_APP_URL,
    icon: MessageCircle,
  },
  prayers: {
    title: 'Ask someone to pray for you',
    description: 'A Hope Carrier will pray for what you share.',
    href: '/prayers',
    icon: Heart,
  },
  hopeAi: {
    title: 'Talk to Hope AI',
    description: 'Chat it through with an AI assistant, any time.',
    href: '/hope-ai',
    icon: MessageSquare,
  },
  hopecasts: {
    title: 'Listen to a HopeCast',
    description: 'Messages of hope on anxiety, healing and family.',
    href: '/hopecasts',
    icon: Radio,
  },
  dailyHope: {
    title: 'Get Daily Hope',
    description: 'One encouraging email a day for 21 days.',
    href: '/daily-hope',
    icon: Mail,
  },
};

// What to suggest after each option page, most useful first.
const nextSteps: Record<string, OptionKey[]> = {
  '/prayers': ['plan', 'ecoach', 'hopecasts'],
  '/hope-ai': ['plan', 'prayers', 'hopecasts'],
  '/hopecasts': ['plan', 'ecoach', 'dailyHope'],
  '/daily-hope': ['plan', 'hopecasts', 'ecoach'],
};

const cardClass =
  'group flex h-full flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-5 transition-all duration-300 hover:border-[#DFE7CF] hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

export function WhatNext() {
  const pathname = usePathname();
  const keys = nextSteps[pathname];
  if (!keys) return null;

  return (
    <section
      aria-labelledby="what-next-title"
      className="px-6 pb-16 print:hidden"
    >
      <div className="max-w-5xl mx-auto border-t border-[#E2DFDA] pt-10">
        <h2
          id="what-next-title"
          className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
        >
          Other ways we can help
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {keys.map((key) => {
            const option = options[key];
            const body = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9EFEE] text-[#91AFAA]">
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-bold text-[#6E5F47]">
                    {option.title}
                  </p>
                  <p className="mt-1 text-sm text-[#6E5F47] leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
              </>
            );
            return key === 'ecoach' ? (
              <EcoachLink
                key={key}
                linkName="ecoach_what_next"
                className={cardClass}
              >
                {body}
              </EcoachLink>
            ) : (
              <Link key={key} href={option.href} className={cardClass}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
