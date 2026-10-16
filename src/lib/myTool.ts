'use client';

import { useSyncExternalStore } from 'react';

/**
 * The last guided tool someone finished, so the home page and menu can
 * offer it first next time, even without a plan. Kept only in this browser.
 */
export type GuidedTool = 'breathe' | 'ground';

const KEY = 'hopebegins.lastTool';
const CHANGE_EVENT = 'hopebegins-last-tool-change';

export const isGuidedTool = (id: unknown): id is GuidedTool =>
  id === 'breathe' || id === 'ground';

function read(): GuidedTool | null {
  try {
    const value = localStorage.getItem(KEY);
    return isGuidedTool(value) ? value : null;
  } catch {
    return null;
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

export function useLastTool(): GuidedTool | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function rememberTool(tool: GuidedTool) {
  try {
    localStorage.setItem(KEY, tool);
  } catch {
    // Storage blocked: nothing to remember.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function forgetTool() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: nothing was kept.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
