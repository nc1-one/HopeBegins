import type { PlanItem, TimeOfDay } from './actionPlan';

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

const title = (item: PlanItem) => `HopeBegins: ${item.action}`;

const details = (item: PlanItem) =>
  [
    item.detail,
    ...(item.steps ?? []).map((step, i) => `${i + 1}. ${step}`),
    '',
    `Your plan: ${PLAN_URL}`,
  ].join('\n');

export function googleCalendarUrl(
  item: PlanItem,
  time: TimeOfDay,
  now = new Date()
) {
  const start = firstReminder(time, now);
  const end = new Date(start.getTime() + EVENT_MINUTES * 60_000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title(item),
    details: details(item),
    dates: `${localStamp(start)}/${localStamp(end)}`,
    recur: `RRULE:FREQ=DAILY;COUNT=${REMINDER_DAYS}`,
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
export function reminderIcs(item: PlanItem, time: TimeOfDay, now = new Date()) {
  const start = firstReminder(time, now);
  const end = new Date(start.getTime() + EVENT_MINUTES * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//HopeBegins//Plan reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${item.id}-${localStamp(start)}@hopebegins.today`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${localStamp(start)}`,
    `DTEND:${localStamp(end)}`,
    `RRULE:FREQ=DAILY;COUNT=${REMINDER_DAYS}`,
    `SUMMARY:${escapeText(title(item))}`,
    `DESCRIPTION:${escapeText(details(item))}`,
    `URL:${PLAN_URL}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(title(item))}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(fold)
    .join('\r\n');
}

export function downloadReminder(item: PlanItem, time: TimeOfDay) {
  const blob = new Blob([reminderIcs(item, time)], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hopebegins-${item.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
