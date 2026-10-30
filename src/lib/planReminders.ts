import type { PlanItem, PlanLang, TimeOfDay } from './actionPlan';
import { downloadFile } from './download';
import { isIntlLang, withLocale, type PerLang } from './i18n';
import { pathIn } from './taglishTwins';

/**
 * Daily calendar reminders for a tool in the visitor's week. The event is
 * made on their own device; nothing is sent to HopeBegins.
 */

/** Clock time for each "When will you do it?" choice. */
const REMINDER_TIME: Record<TimeOfDay, [hour: number, minute: number]> = {
  morning: [7, 30],
  midday: [15, 0],
  evening: [19, 0],
  bedtime: [21, 30],
};
export const REMINDER_DAYS = 28;
const EVENT_MINUTES = 15;
/** The plan's address in the visitor's language: /fr/action-plan in French. */
const planUrl = (lang: PlanLang) =>
  `https://hopebegins.today${isIntlLang(lang) ? withLocale(lang, '/action-plan') : pathIn('/action-plan', lang)}`;

/** The words in the calendar event, in the plan's language. */
const copy: PerLang<{
  title: (tool: string) => string;
  planLink: (url: string) => string;
  monthlyTitle: string;
  monthlyDetails: (url: string) => string;
}> = {
  en: {
    title: (tool) => `HopeBegins: ${tool}`,
    planLink: (url) => `Your plan: ${url}`,
    monthlyTitle: 'HopeBegins: 1-minute check-in',
    monthlyDetails: (url) =>
      `Open your plan and take the 1-minute check-in: ${url}`,
  },
  tl: {
    title: (tool) => `HopeBegins: ${tool}`,
    planLink: (url) => `Ang plano mo: ${url}`,
    monthlyTitle: 'HopeBegins: 1-minute check-in',
    monthlyDetails: (url) =>
      `Buksan ang plano mo at sagutan ang 1-minute check-in: ${url}`,
  },
  fr: {
    title: (tool) => `HopeBegins : ${tool}`,
    planLink: (url) => `Ton plan : ${url}`,
    monthlyTitle: 'HopeBegins : bilan d’une minute',
    monthlyDetails: (url) =>
      `Ouvre ton plan et fais ton bilan d’une minute : ${url}`,
  },
  de: {
    title: (tool) => `HopeBegins: ${tool}`,
    planLink: (url) => `Dein Plan: ${url}`,
    monthlyTitle: 'HopeBegins: 1-Minuten-Check-in',
    monthlyDetails: (url) =>
      `Öffne deinen Plan und mach den 1-Minuten-Check-in: ${url}`,
  },
  es: {
    title: (tool) => `HopeBegins: ${tool}`,
    planLink: (url) => `Tu plan: ${url}`,
    monthlyTitle: 'HopeBegins: check-in de 1 minuto',
    monthlyDetails: (url) =>
      `Abre tu plan y haz el check-in de 1 minuto: ${url}`,
  },
  ko: {
    title: (tool) => `HopeBegins: ${tool}`,
    planLink: (url) => `내 계획: ${url}`,
    monthlyTitle: 'HopeBegins: 1분 체크인',
    monthlyDetails: (url) => `계획을 열고 1분 체크인을 해 보세요: ${url}`,
  },
};

const pad = (n: number) => String(n).padStart(2, '0');

// Local time without a zone, so the reminder follows the phone's own clock.
const localStamp = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const utcStamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

/** "7:30 AM", or the clock as written in `locale`. */
export function reminderClock(time: TimeOfDay, locale = 'en-US') {
  const [hour, minute] = REMINDER_TIME[time];
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** The next time the reminder is due: today if it hasn't passed, else tomorrow. */
function firstReminder(time: TimeOfDay, now: Date) {
  const [hour, minute] = REMINDER_TIME[time];
  const start = new Date(now);
  start.setHours(hour, minute, 0, 0);
  if (start <= now) start.setDate(start.getDate() + 1);
  return start;
}

interface CalendarEvent {
  id: string;
  title: string;
  details: string;
  /** Where the reminder opens. */
  url: string;
  start: Date;
  minutes: number;
  rrule: string;
}

function googleUrl(event: CalendarEvent) {
  const end = new Date(event.start.getTime() + event.minutes * 60_000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.details,
    dates: `${localStamp(event.start)}/${localStamp(end)}`,
    recur: `RRULE:${event.rrule}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

const escapeText = (text: string) =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

// Calendar files keep lines to 75 characters; longer ones continue after a space.
const fold = (line: string) =>
  line.length <= 75 ? line : (line.match(/.{1,73}/g) ?? [line]).join('\r\n ');

/** An .ics file for Apple Calendar, Outlook and most other calendar apps. */
function icsText(event: CalendarEvent, now: Date) {
  const end = new Date(event.start.getTime() + event.minutes * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HopeBegins//Plan reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}-${localStamp(event.start)}@hopebegins.today`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${localStamp(event.start)}`,
    `DTEND:${localStamp(end)}`,
    `RRULE:${event.rrule}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.details)}`,
    `URL:${event.url}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(event.title)}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n');
}

const toolEvent = (
  item: PlanItem,
  time: TimeOfDay,
  lang: PlanLang,
  days: number,
  now: Date
): CalendarEvent => {
  // Opens the plan on today's card for this tool, in their language.
  const url = `${planUrl(lang)}?tool=${item.id}`;
  return {
    id: item.id,
    title: copy[lang].title(item.title),
    url,
    details: [
      item.detail,
      ...(item.steps ?? []).map((step, i) => `${i + 1}. ${step}`),
      '',
      copy[lang].planLink(url),
    ].join('\n'),
    start: firstReminder(time, now),
    minutes: EVENT_MINUTES,
    // Only the days left in their 4 weeks.
    rrule: `FREQ=DAILY;COUNT=${Math.max(1, Math.min(days, REMINDER_DAYS))}`,
  };
};

export function googleCalendarUrl(
  item: PlanItem,
  time: TimeOfDay,
  lang: PlanLang,
  days = REMINDER_DAYS,
  now = new Date()
) {
  return googleUrl(toolEvent(item, time, lang, days, now));
}

export function reminderIcs(
  item: PlanItem,
  time: TimeOfDay,
  lang: PlanLang,
  days = REMINDER_DAYS,
  now = new Date()
) {
  return icsText(toolEvent(item, time, lang, days, now), now);
}

export function downloadReminder(
  item: PlanItem,
  time: TimeOfDay,
  lang: PlanLang,
  days = REMINDER_DAYS
) {
  downloadFile(
    `hopebegins-${item.id}.ics`,
    reminderIcs(item, time, lang, days),
    'text/calendar'
  );
}

/** After the 4 weeks: a reminder once a month for 6 months, at 7 PM. */
export const MONTHLY_REMINDERS = 6;

function monthlyEvent(lang: PlanLang, now: Date): CalendarEvent {
  const start = new Date(now);
  start.setMonth(start.getMonth() + 1);
  start.setHours(19, 0, 0, 0);
  return {
    id: 'monthly-check-in',
    title: copy[lang].monthlyTitle,
    url: planUrl(lang),
    details: copy[lang].monthlyDetails(planUrl(lang)),
    start,
    minutes: 5,
    rrule: `FREQ=MONTHLY;COUNT=${MONTHLY_REMINDERS}`,
  };
}

export function monthlyGoogleUrl(lang: PlanLang, now = new Date()) {
  return googleUrl(monthlyEvent(lang, now));
}

export function downloadMonthlyReminder(lang: PlanLang) {
  const now = new Date();
  downloadFile(
    'hopebegins-monthly-check-in.ics',
    icsText(monthlyEvent(lang, now), now),
    'text/calendar'
  );
}
