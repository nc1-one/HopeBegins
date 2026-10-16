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
import { Reveal } from '@/components/ui/Reveal';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { ECOACH_APP_URL } from '@/lib/actionPlan';
import type { FeelingLang } from '@/lib/feelingPages';
import { usePageLanguage } from '@/lib/pageLanguage';

type OptionKey =
  | 'plan'
  | 'ecoach'
  | 'prayers'
  | 'hopeAi'
  | 'hopecasts'
  | 'dailyHope';

const options: Record<
  OptionKey,
  {
    title: Record<FeelingLang, string>;
    description: Record<FeelingLang, string>;
    href: string;
    icon: typeof Heart;
  }
> = {
  plan: {
    title: { en: 'Get your free plan', tl: 'Kunin ang libreng plano mo' },
    description: {
      en: '9 quick questions, then small steps for this week.',
      tl: '9 na mabilis na tanong, tapos maliliit na hakbang para ngayong linggo.',
    },
    href: '/action-plan',
    icon: ClipboardList,
  },
  ecoach: {
    title: { en: 'Talk to an e-coach', tl: 'Kausapin ang isang e-coach' },
    description: {
      en: 'A real person from Himala Everyday, on Messenger.',
      tl: 'Totoong tao mula sa Himala Everyday, sa Messenger.',
    },
    href: ECOACH_APP_URL,
    icon: MessageCircle,
  },
  prayers: {
    title: { en: 'Ask someone to pray for you', tl: 'Magpadasal' },
    description: {
      en: 'A Hope Carrier will pray for what you share.',
      tl: 'Ipagdarasal ng isang Hope Carrier ang ibabahagi mo.',
    },
    href: '/prayers',
    icon: Heart,
  },
  hopeAi: {
    title: { en: 'Talk to Hope AI', tl: 'Kausapin si Hope AI' },
    description: {
      en: 'Chat it through with an AI assistant, any time.',
      tl: 'Isang AI assistant na puwede mong i-chat anumang oras.',
    },
    href: '/hope-ai',
    icon: MessageSquare,
  },
  hopecasts: {
    title: { en: 'Listen to a HopeCast', tl: 'Makinig sa isang HopeCast' },
    description: {
      en: 'Messages of hope on anxiety, healing and family.',
      tl: 'Mga mensahe ng pag-asa tungkol sa anxiety, healing, at pamilya.',
    },
    href: '/hopecasts',
    icon: Radio,
  },
  dailyHope: {
    title: { en: 'Get Daily Hope', tl: 'Kumuha ng Daily Hope' },
    description: {
      en: 'One encouraging email a day for 21 days.',
      tl: 'Isang email na nagpapalakas ng loob araw-araw sa loob ng 21 araw.',
    },
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
  '/laro-muna': ['plan', 'ecoach', 'hopeAi'],
};

const cardClass =
  'group flex h-full items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-5 transition-all lg:flex-col lg:items-start lg:gap-3 duration-300 hover:border-[#DFE7CF] hover:shadow-lg hover:shadow-[#6E5F47]/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';

export function WhatNext() {
  const pathname = usePathname();
  const lang = usePageLanguage();
  const keys = nextSteps[pathname];
  if (!keys) return null;

  return (
    <section
      aria-labelledby="what-next-title"
      lang={lang}
      className="px-6 pb-16 print:hidden"
    >
      <div className="max-w-5xl mx-auto border-t border-[#E2DFDA] pt-10">
        <h2
          id="what-next-title"
          className="font-playfair text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
        >
          {lang === 'tl'
            ? 'Iba pa naming maitutulong sa iyo'
            : 'Other ways we can help'}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {keys.map((key, index) => {
            const option = options[key];
            const body = (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EFEE] text-[#91AFAA]">
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-bold text-[#6E5F47]">
                    {option.title[lang]}
                  </p>
                  <p className="mt-1 text-sm text-[#6E5F47] leading-relaxed">
                    {option.description[lang]}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#C5BFB5] transition-all group-hover:translate-x-1 group-hover:text-[#6E5F47] motion-reduce:transition-none" />
              </>
            );
            return (
              <Reveal key={key} delay={index * 80}>
                {key === 'ecoach' ? (
                  <EcoachLink linkName="ecoach_what_next" className={cardClass}>
                    {body}
                  </EcoachLink>
                ) : (
                  <Link
                    href={
                      // The plan opens in the page's language.
                      key === 'plan' && lang === 'tl'
                        ? `${option.href}?lang=tl`
                        : option.href
                    }
                    className={cardClass}
                  >
                    {body}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
