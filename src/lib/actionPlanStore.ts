'use client';

import { useSyncExternalStore } from 'react';
import {
  PLAN_DAYS,
  type Answers,
  type QuestionKey,
  type TimeOfDay,
} from './actionPlan';

/**
 * The visitor's plan, saved only in this browser so they can come back to it
 * and tick off their 4 weeks. Nothing here is sent to HopeBegins.
 */
export interface SavedPlan {
  name: string;
  answers: Answers;
  startedAt: string;
  commitments: Record<string, TimeOfDay>;
  /** One entry per day of the plan, true when the tool was done that day. */
  checks: Record<string, boolean[]>;
  /** Mood and worry scores from each check-in, oldest first. */
  history?: CheckInRecord[];
  /** Made at the end of the 4 weeks. Like the rest of the plan, it never leaves this device. */
  hopeCard?: HopeCard;
}

export interface HopeCard {
  /** The tool that helped most. */
  toolId: string;
  warningSigns: string;
  people: string[];
  madeAt: string;
}

export interface CheckInRecord {
  date: string;
  mood: number;
  anxiety: number;
}

const KEY = 'hopebegins.plan.v1';
const CHANGE_EVENT = 'hopebegins-plan-change';

// Used when the browser blocks storage, so the plan still works for this visit.
let memory: string | null = null;
let storageBlocked = false;

function read(): string | null {
  if (storageBlocked) return memory;
  try {
    return localStorage.getItem(KEY);
  } catch {
    storageBlocked = true;
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function write(value: string | null) {
  memory = value;
  try {
    if (value === null) {
      localStorage.removeItem(KEY);
    } else {
      localStorage.setItem(KEY, value);
    }
  } catch {
    storageBlocked = true;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useSavedPlan(): SavedPlan | null {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedPlan;
  } catch {
    return null;
  }
}

export function savePlan(plan: SavedPlan) {
  write(JSON.stringify(plan));
}

export function updatePlan(update: (plan: SavedPlan) => SavedPlan) {
  const raw = read();
  if (!raw) return;
  try {
    savePlan(update(JSON.parse(raw) as SavedPlan));
  } catch {
    // Ignore a corrupted entry; the next savePlan replaces it.
  }
}

export function clearPlan() {
  write(null);
}

/** Whole days from a date to today; 0 on the day itself. */
export function daysSince(iso: string) {
  const start = new Date(iso);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / 86_400_000);
}

/** 0-based day of the plan, counted from the day it was made. */
export const dayOfPlan = (startedAt: string) => daysSince(startedAt);

/**
 * Asks the browser not to clear the plan when space runs low or the site
 * goes unvisited. Browsers decide on their own; nothing breaks if they say no.
 */
export function requestPersistentStorage() {
  navigator.storage?.persist?.().catch(() => {});
}

// A backup is a file the visitor keeps. It never passes through HopeBegins.
const BACKUP_KIND = 'hopebegins-plan';
const QUESTION_KEYS: QuestionKey[] = [
  'down',
  'interest',
  'nervous',
  'worry',
  'sleep',
  'weight',
  'support',
  'faith',
  'safety',
];
const TIMES: TimeOfDay[] = ['morning', 'midday', 'evening', 'bedtime'];

export function planBackup(plan: SavedPlan) {
  return JSON.stringify(
    { kind: BACKUP_KIND, version: 1, savedAt: new Date().toISOString(), plan },
    null,
    2
  );
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Reads a backup file, keeping only fields the plan understands. */
export function readBackup(text: string): SavedPlan | null {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (!isRecord(data) || data.kind !== BACKUP_KIND || !isRecord(data.plan)) {
    return null;
  }
  const plan = data.plan;
  if (
    typeof plan.startedAt !== 'string' ||
    Number.isNaN(Date.parse(plan.startedAt)) ||
    !isRecord(plan.answers)
  ) {
    return null;
  }

  const answers: Answers = {};
  for (const key of QUESTION_KEYS) {
    const value = plan.answers[key];
    if (typeof value === 'string' && value.length <= 20) answers[key] = value;
  }
  const commitments: Record<string, TimeOfDay> = {};
  for (const [id, time] of Object.entries(
    isRecord(plan.commitments) ? plan.commitments : {}
  )) {
    if (TIMES.includes(time as TimeOfDay)) commitments[id] = time as TimeOfDay;
  }
  const checks: Record<string, boolean[]> = {};
  for (const [id, days] of Object.entries(
    isRecord(plan.checks) ? plan.checks : {}
  )) {
    if (Array.isArray(days)) {
      checks[id] = days.slice(0, PLAN_DAYS).map((day) => day === true);
    }
  }
  const history = (Array.isArray(plan.history) ? plan.history : [])
    .filter(
      (entry): entry is CheckInRecord =>
        isRecord(entry) &&
        typeof entry.date === 'string' &&
        typeof entry.mood === 'number' &&
        typeof entry.anxiety === 'number'
    )
    .map(({ date, mood, anxiety }) => ({ date, mood, anxiety }));

  const card = isRecord(plan.hopeCard) ? plan.hopeCard : null;
  const hopeCard: HopeCard | undefined =
    card && typeof card.toolId === 'string'
      ? {
          toolId: card.toolId.slice(0, 40),
          warningSigns:
            typeof card.warningSigns === 'string'
              ? card.warningSigns.slice(0, 300)
              : '',
          people: (Array.isArray(card.people) ? card.people : [])
            .filter((person): person is string => typeof person === 'string')
            .slice(0, 2)
            .map((person) => person.slice(0, 40)),
          madeAt:
            typeof card.madeAt === 'string' ? card.madeAt : plan.startedAt,
        }
      : undefined;

  return {
    name: typeof plan.name === 'string' ? plan.name.slice(0, 60) : '',
    answers,
    startedAt: plan.startedAt,
    commitments,
    checks,
    history,
    ...(hopeCard && { hopeCard }),
  };
}
