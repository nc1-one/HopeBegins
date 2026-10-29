'use client';

import { useSyncExternalStore } from 'react';
import { localDay } from './toolNotes';

/**
 * The daily check-in: how today feels, as weather, and what is on their
 * mind. One entry per day, kept only in this browser. The site counts that
 * a check-in happened, never what was picked.
 *
 * Coming back is what counts. The tally is days checked in, all time and
 * this week, so a missed day never takes anything away.
 */

/** 1 is a storm, 5 is sunny. */
export type Weather = 1 | 2 | 3 | 4 | 5;

export type Area =
  | 'work'
  | 'family'
  | 'money'
  | 'love'
  | 'friends'
  | 'health'
  | 'sleep'
  | 'faith'
  | 'lonely';

export const AREAS: Area[] = [
  'work',
  'family',
  'money',
  'love',
  'friends',
  'health',
  'sleep',
  'faith',
  'lonely',
];

export interface CheckIn {
  /** YYYY-MM-DD in local time. */
  day: string;
  weather: Weather;
  areas: Area[];
}

/**
 * The plant grows a step at each of these totals. The last one repeats
 * every 30 days after, so there is always a next step.
 */
export const STAGES = [1, 3, 7, 14, 21, 30] as const;

const KEY = 'hopebegins.checkIns.v1';
const CHANGE_EVENT = 'hopebegins-check-ins-change';
const MAX_DAYS = 400;
const NONE: CheckIn[] = [];

const isWeather = (value: unknown): value is Weather =>
  value === 1 || value === 2 || value === 3 || value === 4 || value === 5;

let cachedRaw: string | null = null;
let cached: CheckIn[] = NONE;

function read(): CheckIn[] {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return NONE;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cached = Array.isArray(parsed)
      ? parsed
          .filter(
            (item): item is CheckIn =>
              typeof item?.day === 'string' &&
              /^\d{4}-\d{2}-\d{2}$/.test(item.day) &&
              isWeather(item?.weather)
          )
          .map(({ day, weather, areas }) => ({
            day,
            weather,
            areas: (Array.isArray(areas) ? areas : []).filter(
              (area: unknown): area is Area => AREAS.includes(area as Area)
            ),
          }))
      : NONE;
  } catch {
    cached = NONE;
  }
  return cached;
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useCheckIns(): CheckIn[] {
  return useSyncExternalStore(subscribe, read, () => NONE);
}

/**
 * Saves today's check-in, replacing an earlier one from today. Returns
 * whether it was a new day, which is what moves the tally.
 */
export function saveCheckIn(weather: Weather, areas: Area[]): boolean {
  const today = localDay();
  const before = read();
  const isNewDay = !before.some((entry) => entry.day === today);
  const next = [
    ...before.filter((entry) => entry.day !== today),
    { day: today, weather, areas },
  ].slice(-MAX_DAYS);
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked: the check-in just isn't kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return isNewDay;
}

export function clearCheckIns() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: nothing was kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Monday of the week a date falls in, as YYYY-MM-DD. */
function weekStart(date: Date) {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

/** The seven days of this week, Monday first, and whether each was checked in. */
export function thisWeek(checkIns: CheckIn[], now = new Date()) {
  const days = new Set(checkIns.map((entry) => entry.day));
  const monday = weekStart(now);
  const today = localDay(now);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const day = localDay(date);
    return { date, day, done: days.has(day), isToday: day === today };
  });
}

/** How far the plant has grown: the stage reached and the next total to aim for. */
export function growth(total: number) {
  const stage = STAGES.filter((at) => total >= at).length;
  const last = STAGES[STAGES.length - 1];
  // Past the last stage it keeps flowering, one more bloom every 30 days.
  const extraBlooms = total >= last ? Math.floor((total - last) / 30) : 0;
  const isGrown = stage === STAGES.length;
  const next = isGrown ? last + (extraBlooms + 1) * 30 : STAGES[stage];
  const previous =
    stage === 0 ? 0 : isGrown ? last + extraBlooms * 30 : STAGES[stage - 1];
  return { stage, extraBlooms, next, previous };
}

/** True when this total is exactly where the plant grows a step. */
export function isMilestone(total: number) {
  const last = STAGES[STAGES.length - 1];
  return (
    (STAGES as readonly number[]).includes(total) ||
    (total > last && (total - last) % 30 === 0)
  );
}

/** Whole days since the last check-in before today, or null if none. */
export function daysAway(checkIns: CheckIn[], now = new Date()) {
  const today = localDay(now);
  const earlier = checkIns.filter((entry) => entry.day < today);
  if (earlier.length === 0) return null;
  const last = new Date(`${earlier[earlier.length - 1].day}T00:00:00`);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return Math.round((start.getTime() - last.getTime()) / 86_400_000);
}
