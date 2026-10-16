'use client';

import { useSyncExternalStore } from 'react';

/**
 * After a tool: "Compared to before you started, how do you feel?" The
 * answers stay in this browser only, never in analytics, so the plan and
 * Hope Card can show which tool helps.
 */
export type Felt = 'calmer' | 'same' | 'worse';

export interface ToolCheck {
  tool: string;
  felt: Felt;
  at: string;
}

const KEY = 'hopebegins.toolChecks';
const CHANGE_EVENT = 'hopebegins-tool-checks-change';
const MAX_CHECKS = 100;
const NONE: ToolCheck[] = [];

const isFelt = (value: unknown): value is Felt =>
  value === 'calmer' || value === 'same' || value === 'worse';

let cachedRaw: string | null = null;
let cached: ToolCheck[] = NONE;

function read(): ToolCheck[] {
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
      ? parsed.filter(
          (item): item is ToolCheck =>
            typeof item?.tool === 'string' &&
            isFelt(item?.felt) &&
            typeof item?.at === 'string'
        )
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

export function useToolChecks(): ToolCheck[] {
  return useSyncExternalStore(subscribe, read, () => NONE);
}

export function recordToolCheck(tool: string, felt: Felt) {
  const next = [...read(), { tool, felt, at: new Date().toISOString() }].slice(
    -MAX_CHECKS
  );
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked: the answer just isn't kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearToolChecks() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: nothing was kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** How often a tool left them calmer, out of the times they answered. */
export function calmerCount(checks: ToolCheck[], tool: string) {
  const forTool = checks.filter((check) => check.tool === tool);
  return {
    calmer: forTool.filter((check) => check.felt === 'calmer').length,
    total: forTool.length,
  };
}
