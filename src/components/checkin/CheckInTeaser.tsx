'use client';

import { TrackedLink } from '@/components/ui/TrackedLink';
import { growth, thisWeek, useCheckIns } from '@/lib/checkIns';
import type { FeelingLang } from '@/lib/feelingPages';
import type { PerLang } from '@/lib/i18n';
import { localDay } from '@/lib/toolNotes';
import { Sampaguita } from './Sampaguita';

const copy: PerLang<{
  title: string;
  tally: (days: number, week: number) => string;
  go: string;
  done: string;
}> = {
  en: {
    title: 'Daily check-in',
    tally: (days: number, week: number) =>
      `${days === 1 ? '1 day' : `${days} days`} · ${week} this week`,
    go: 'Check in today',
    done: 'Done today',
  },
  tl: {
    title: 'Daily check-in',
    tally: (days: number, week: number) =>
      `${days} araw · ${week} ngayong linggo`,
    go: 'Mag-check in ngayon',
    done: 'Tapos na ngayong araw',
  },
  fr: {
    title: 'Bilan du jour',
    tally: (days: number, week: number) =>
      `${days === 1 ? '1 jour' : `${days} jours`} · ${week} cette semaine`,
    go: 'Faire mon bilan du jour',
    done: 'Fait pour aujourd’hui',
  },
  de: {
    title: 'Täglicher Check-in',
    tally: (days: number, week: number) =>
      `${days === 1 ? '1 Tag' : `${days} Tage`} · ${week} diese Woche`,
    go: 'Heute einchecken',
    done: 'Heute erledigt',
  },
  es: {
    title: 'Chequeo diario',
    tally: (days: number, week: number) =>
      `${days === 1 ? '1 día' : `${days} días`} · ${week} esta semana`,
    go: 'Hacer el chequeo de hoy',
    done: 'Listo por hoy',
  },
  ko: {
    title: '오늘의 체크인',
    tally: (days: number, week: number) => `${days}일 · 이번 주 ${week}일`,
    go: '오늘 체크인하기',
    done: '오늘 완료',
  },
};

/**
 * For someone who has checked in before: their plant and tally, one tap
 * from today's check-in. Nothing shows until the first check-in.
 */
export function CheckInTeaser({
  lang,
  className = '',
}: {
  lang: FeelingLang;
  className?: string;
}) {
  const checkIns = useCheckIns();
  if (checkIns.length === 0) return null;
  const t = copy[lang];
  const { stage, extraBlooms } = growth(checkIns.length);
  const week = thisWeek(checkIns).filter((day) => day.done).length;
  const isDone = checkIns.some((entry) => entry.day === localDay());

  return (
    <TrackedLink
      href="/check-in"
      linkName="menu_checkin"
      className={`flex max-w-2xl items-center gap-4 rounded-2xl bg-[#EFF3E7] px-4 py-3 text-[#6E5F47] transition-colors hover:bg-[#DFE7CF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 ${className}`}
    >
      <Sampaguita
        stage={stage}
        extraBlooms={extraBlooms}
        className="h-14 w-11 shrink-0"
      />
      <span className="min-w-0 flex-1">
        <span className="block font-poppins font-bold">{t.title}</span>
        <span className="block text-sm tabular-nums">
          {t.tally(checkIns.length, week)}
        </span>
      </span>
      <span className="shrink-0 font-poppins text-sm font-bold underline underline-offset-4">
        {isDone ? t.done : t.go}
      </span>
    </TrackedLink>
  );
}
