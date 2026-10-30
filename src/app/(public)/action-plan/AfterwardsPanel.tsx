'use client';

import { useState } from 'react';
import Link from '@/components/ui/LocalLink';
import {
  CalendarPlus,
  HandHeart,
  MessageCircle,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import type { PlanItem, PlanLang } from '@/lib/actionPlan';
import {
  daysSince,
  restartFourWeeks,
  type SavedPlan,
} from '@/lib/actionPlanStore';
import { downloadMonthlyReminder, monthlyGoogleUrl } from '@/lib/planReminders';
import { analyticsService } from '@/services/analyticsService';
import { UseMyTool } from './UseMyTool';

/**
 * After the 4 weeks: an open door back. The monthly check-in, a reminder
 * on their own calendar, their Hope Card, a fresh 4 weeks, an e-coach, and
 * a way to help someone else.
 */

const MONTH = 30;

const copy = {
  en: {
    locale: 'en-US',
    title: 'After your 4 weeks',
    intro:
      'Things can come back, and that is normal. A quick check-in once a month helps you catch it early.',
    monthlyTitle: 'Monthly check-in',
    due: "It's been a month. Take your 1-minute check-in.",
    next: (date: string) => `Your next one is around ${date}.`,
    take: 'Take the 1-minute check-in',
    remind: 'Remind me once a month for 6 months',
    otherCalendar: 'iPhone or Outlook',
    cardTitle: 'Your Hope Card',
    openCard: 'Open my Hope Card',
    yourTool: 'Your tool',
    restart: 'Start another 4 weeks',
    ecoach: 'Talk to an e-coach',
    giveTitle: 'Help someone else',
    shareText: 'Know someone who is struggling? Share HopeBegins with them.',
    share: 'Share HopeBegins',
    copied: 'Link copied: https://hopebegins.today',
    carrierText:
      'Become a Hope Carrier and pray for people who send prayer requests.',
    carrier: 'Become a Hope Carrier',
  },
  tl: {
    locale: 'fil-PH',
    title: 'Pagkatapos ng 4 na linggo mo',
    intro:
      'Puwedeng bumalik ito, at normal iyan. Kaya mag-check in nang mabilis isang beses isang buwan, para maagapan agad.',
    monthlyTitle: 'Monthly check-in',
    due: 'Isang buwan na. Sagutan ang 1-minute check-in mo.',
    next: (date: string) => `Ang susunod ay mga ${date}.`,
    take: 'Sagutan ang 1-minute check-in',
    remind: 'I-remind ako isang beses isang buwan sa loob ng 6 na buwan',
    otherCalendar: 'iPhone o Outlook',
    cardTitle: 'Ang Hope Card mo',
    openCard: 'Buksan ang Hope Card ko',
    yourTool: 'Ang tool mo',
    restart: 'Magsimula ng panibagong 4 na linggo',
    ecoach: 'Kausapin ang e-coach',
    giveTitle: 'Tumulong sa iba',
    shareText:
      'May kilala ka bang nahihirapan? I-share ang HopeBegins sa kanila.',
    share: 'I-share ang HopeBegins',
    copied: 'Nakopya ang link: https://hopebegins.today',
    carrierText:
      'Maging Hope Carrier at ipagdasal ang mga nagpapadala ng prayer request.',
    carrier: 'Maging Hope Carrier',
  },
};

const primaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#6E5F47] px-5 py-2.5 font-poppins font-bold text-white transition-colors hover:bg-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/50';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#AEC488] bg-white px-4 py-2.5 font-poppins font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40';
const smallClass =
  'inline-flex min-h-11 items-center rounded-xl border border-[#AEC488] bg-white px-3 text-sm font-bold text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91AFAA]';

export function AfterwardsPanel({
  saved,
  tool,
  lang,
  onMonthly,
  onOpenCard,
}: {
  saved: SavedPlan;
  /** The tool on their Hope Card. */
  tool?: PlanItem;
  lang: PlanLang;
  onMonthly: () => void;
  onOpenCard: () => void;
}) {
  const t = copy[lang];
  const [copied, setCopied] = useState(false);
  const last =
    saved.history?.[saved.history.length - 1]?.date ?? saved.startedAt;
  const isDue = daysSince(last) >= MONTH;
  const nextDate = new Date(last);
  nextDate.setDate(nextDate.getDate() + MONTH);
  const nextLabel = nextDate.toLocaleDateString(t.locale, {
    month: 'long',
    day: 'numeric',
  });

  const share = async () => {
    analyticsService.recordClick('plan_after_share');
    const data = { title: 'HopeBegins', url: 'https://hopebegins.today' };
    if (navigator.share) {
      await navigator.share(data).catch(() => {});
      return;
    }
    await navigator.clipboard?.writeText(data.url).catch(() => {});
    setCopied(true);
  };

  return (
    <section
      aria-labelledby="afterwards-title"
      className="mb-8 space-y-4 print:hidden"
    >
      <div>
        <h2
          id="afterwards-title"
          className="font-playfair text-3xl text-[#6E5F47] leading-tight"
        >
          {t.title}
        </h2>
        <p className="mt-2 text-[#6E5F47] leading-relaxed">{t.intro}</p>
      </div>

      <div
        className={`rounded-2xl p-5 ${
          isDue
            ? 'border border-[#AEC488] bg-[#EFF3E7]'
            : 'border border-zinc-100 bg-white'
        }`}
      >
        <h3 className="font-poppins text-lg font-bold text-[#6E5F47]">
          {t.monthlyTitle}
        </h3>
        <p className="mt-1 text-[#6E5F47]">
          {isDue ? t.due : t.next(nextLabel)}
        </p>
        <button
          type="button"
          onClick={() => {
            analyticsService.recordClick('plan_monthly_start');
            onMonthly();
          }}
          className={`mt-3 ${isDue ? primaryClass : secondaryClass}`}
        >
          {t.take}
        </button>
        <div className="mt-4 flex flex-col gap-2 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm text-[#6E5F47] sm:flex-1">
            <CalendarPlus className="h-4 w-4 shrink-0 text-[#91AFAA]" />
            {t.remind}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={monthlyGoogleUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                analyticsService.recordClick('plan_monthly_reminder_google')
              }
              className={smallClass}
            >
              Google Calendar
            </a>
            <button
              type="button"
              onClick={() => {
                analyticsService.recordClick('plan_monthly_reminder_ics');
                downloadMonthlyReminder(lang);
              }}
              className={smallClass}
            >
              {t.otherCalendar}
            </button>
          </div>
        </div>
      </div>

      {tool && (
        <div className="rounded-2xl border border-[#DFE7CF] bg-white p-5">
          <p className="text-sm text-[#6E5F47]">{t.yourTool}</p>
          <p className="mt-1 font-poppins font-bold text-[#6E5F47]">
            {tool.title}
          </p>
          <div className="mt-3">
            <UseMyTool tool={tool} saved={saved} lang={lang} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {saved.hopeCard && (
          <button type="button" onClick={onOpenCard} className={secondaryClass}>
            {t.openCard}
          </button>
        )}
        {tool && (
          <button
            type="button"
            onClick={() => {
              analyticsService.recordClick('plan_restart_4_weeks');
              restartFourWeeks(tool.id, tool.defaultTime ?? 'morning');
            }}
            className={secondaryClass}
          >
            <RotateCcw className="h-4 w-4" />
            {t.restart}
          </button>
        )}
        <EcoachLink linkName="ecoach_afterwards" className={secondaryClass}>
          <MessageCircle className="h-4 w-4" />
          {t.ecoach}
        </EcoachLink>
      </div>

      <div className="rounded-2xl border border-zinc-100 bg-white p-5">
        <h3 className="flex items-center gap-2 font-poppins text-lg font-bold text-[#6E5F47]">
          <HandHeart className="h-5 w-5 text-[#91AFAA]" />
          {t.giveTitle}
        </h3>
        <p className="mt-2 text-[#6E5F47]">{t.shareText}</p>
        <button
          type="button"
          onClick={share}
          className={`mt-3 ${secondaryClass}`}
        >
          <Share2 className="h-4 w-4" />
          {t.share}
        </button>
        {copied && (
          <p className="mt-2 text-sm text-[#6E5F47]" role="status">
            {t.copied}
          </p>
        )}
        <p className="mt-4 text-[#6E5F47]">{t.carrierText}</p>
        <Link
          href="/be-carrier"
          onClick={() => analyticsService.recordClick('plan_after_carrier')}
          className="mt-2 inline-flex min-h-11 items-center font-poppins font-bold text-[#6E5F47] underline-offset-4 hover:underline"
        >
          {t.carrier}
        </Link>
      </div>
    </section>
  );
}
