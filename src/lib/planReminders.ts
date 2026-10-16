import type { PlanItem, PlanLang, TimeOfDay } from './actionPlan';
import { downloadFile } from './download';

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
const PLAN_URL = 'https://hopebegins.today/action-plan';

const pad = (n: number) => String(n).padStart(2, '0');

// Local time without a zone, so the reminder follows the phone's own clock.
const localStamp = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const utcStamp = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

export function reminderClock(time: TimeOfDay) {
  const [hour, minute] = REMINDER_TIME[time];
  return new Date(2000, 0, 1, hour, minute).toLocaleTimeString('en-US', {
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
  const url = `${PLAN_URL}?tool=${item.id}${lang === 'tl' ? '&lang=tl' : ''}`;
  return {
    id: item.id,
    title: `HopeBegins: ${item.title}`,
    url,
    details: [
      item.detail,
      ...(item.steps ?? []).map((step, i) => `${i + 1}. ${step}`),
      '',
      `${lang === 'tl' ? 'Ang plano mo' : 'Your plan'}: ${url}`,
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
    title: 'HopeBegins: 1-minute check-in',
    url: PLAN_URL,
    details:
      lang === 'tl'
        ? `Buksan ang plano mo at sagutan ang 1-minute check-in: ${PLAN_URL}`
        : `Open your plan and take the 1-minute check-in: ${PLAN_URL}`,
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
