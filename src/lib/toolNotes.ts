'use client';

import { useSyncExternalStore } from 'react';

/**
 * What people write in the guided tools that also work without a plan:
 * their small thing for tomorrow and the worries saved for worry time.
 * Kept only in this browser, and cleared with "Delete my plan".
 */
export interface SmallThing {
  text: string;
  /** The day it was saved for, as YYYY-MM-DD in local time. */
  day: string;
}

const SMALL_THING_KEY = 'hopebegins.smallThing';
const WORRIES_KEY = 'hopebegins.worries';
const CHANGE_EVENT = 'hopebegins-tool-notes-change';
const NO_WORRIES: string[] = [];

export const MAX_WORRIES = 20;
export const MAX_NOTE_LENGTH = 140;

export function localDay(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

// useSyncExternalStore needs the same object back while nothing changed.
const cache = new Map<string, { raw: string | null; value: unknown }>();

function readJson<T>(key: string, parse: (data: unknown) => T, empty: T): T {
  let raw: string | null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return empty;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value = empty;
  try {
    value = raw ? parse(JSON.parse(raw)) : empty;
  } catch {
    value = empty;
  }
  cache.set(key, { raw, value });
  return value;
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked: nothing is kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

const readSmallThing = () =>
  readJson<SmallThing | null>(
    SMALL_THING_KEY,
    (data) =>
      typeof data === 'object' &&
      data !== null &&
      typeof (data as SmallThing).text === 'string' &&
      typeof (data as SmallThing).day === 'string'
        ? {
            text: (data as SmallThing).text.slice(0, MAX_NOTE_LENGTH),
            day: (data as SmallThing).day,
          }
        : null,
    null
  );

const readWorries = () =>
  readJson<string[]>(
    WORRIES_KEY,
    (data) =>
      Array.isArray(data)
        ? data
            .filter((item): item is string => typeof item === 'string')
            .slice(0, MAX_WORRIES)
        : NO_WORRIES,
    NO_WORRIES
  );

export function useSmallThing(): SmallThing | null {
  return useSyncExternalStore(subscribe, readSmallThing, () => null);
}

export function saveSmallThing(thing: SmallThing | null) {
  write(SMALL_THING_KEY, thing);
}

export function useWorries(): string[] {
  return useSyncExternalStore(subscribe, readWorries, () => NO_WORRIES);
}

export function saveWorries(worries: string[]) {
  write(WORRIES_KEY, worries.length ? worries.slice(0, MAX_WORRIES) : null);
}

export function clearToolNotes() {
  write(SMALL_THING_KEY, null);
  write(WORRIES_KEY, null);
}
