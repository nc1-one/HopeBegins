'use client';

import { useSyncExternalStore } from 'react';
import { detectCountry } from './detectLocale';
import { COUNTRY_HELP } from './helplines';
import { LANG_INFO, type Lang } from './i18n';

/**
 * The country whose helplines to show: the one the visitor picked on the
 * help page, or else the one their phone's time zone is in. Remembered in
 * this browser only.
 */
const KEY = 'hopebegins.country';
const CHANGE_EVENT = 'hopebegins-country-change';

let memory: string | null = null;

function savedCountry(): string | null {
  try {
    const saved = localStorage.getItem(KEY);
    return saved && saved in COUNTRY_HELP ? saved : null;
  } catch {
    return memory;
  }
}

// "" means the phone is somewhere the site has no helplines for.
const NOWHERE = '';
let detected: string | undefined;
function phoneCountry() {
  detected ??= detectCountry() ?? NOWHERE;
  return detected;
}

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * The visitor's country code, or null when their phone is somewhere the
 * site has no helplines for. Before the phone is asked (on the server),
 * the page language's usual country.
 */
export function useCountry(lang: Lang): string | null {
  const country = useSyncExternalStore(
    subscribe,
    () => savedCountry() ?? phoneCountry(),
    () => LANG_INFO[lang].country
  );
  return country === NOWHERE ? null : country;
}

export function setCountry(code: string) {
  memory = code;
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // Storage blocked: keep the choice in memory for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
