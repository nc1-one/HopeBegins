'use client';

import { useSyncExternalStore } from 'react';
import { detectCountry } from './detectLocale';
import { COUNTRY_HELP } from './helplines';
import { LANG_INFO, type Lang } from './i18n';

/**
 * The country whose helplines to show: the one the visitor picked on the
 * help page, or else the one their phone's time zone is in (see
 * useCountry). Remembered in this browser only.
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
 * The country whose lines a page shows. Where the visitor is wins: the
 * country picked on the help page, or else the one their phone's time zone
 * is in, when the site has lines for it. A Korean page read in Manila shows
 * the Philippines' lines, and an English page read in Seoul shows Korea's.
 * When the phone is somewhere else or doesn't say, the page language's
 * usual country (LANG_INFO): the Philippines for English and Taglish,
 * France, Germany, Mexico and Korea for the others. That is also the
 * answer on the server, before the phone is asked.
 */
export function useCountry(lang: Lang): string {
  return useSyncExternalStore(
    subscribe,
    () => {
      const here = savedCountry() ?? phoneCountry();
      return here && here in COUNTRY_HELP ? here : LANG_INFO[lang].country;
    },
    () => LANG_INFO[lang].country
  );
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
