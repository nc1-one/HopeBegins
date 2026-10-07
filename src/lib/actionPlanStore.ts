'use client';

import { useSyncExternalStore } from 'react';
import type { Answers, TimeOfDay } from './actionPlan';

/**
 * The visitor's plan, saved only in this browser so they can come back to it
 * and tick off their week. Nothing here is sent to HopeBegins.
 */
export interface SavedPlan {
  name: string;
  answers: Answers;
  startedAt: string;
  commitments: Record<string, TimeOfDay>;
  checks: Record<string, boolean[]>;
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

/** 0-based day of the 7-day week, counted from the day the plan was made. */
export function dayOfWeek(startedAt: string) {
  const start = new Date(startedAt);
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / 86_400_000);
}
