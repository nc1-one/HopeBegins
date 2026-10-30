'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { detectLanguage } from './detectLocale';
import { isLang, localeAt, type Lang } from './i18n';

/**
 * The visitor's language, remembered in this browser only. Until they pick
 * one with the globe, it is the language their phone is set to.
 */
const KEY = 'hopebegins.lang';
const CHANGE_EVENT = 'hopebegins-lang-change';

// Used when the browser blocks storage, so the choice still works this visit.
let memory: Lang | null = null;

/** The language the visitor picked, or null if they never picked one. */
export function savedLanguage(): Lang | null {
  try {
    const saved = localStorage.getItem(KEY);
    return isLang(saved) ? saved : null;
  } catch {
    return memory;
  }
}

/** The language they picked, or else the one their phone is set to. */
export const chosenLanguage = (): Lang => savedLanguage() ?? detectLanguage();

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * The language to show. On a /fr, /de, /es or /ko address it is that
 * language; elsewhere it is English or Taglish, as the visitor chose.
 */
export function useLanguage(): Lang {
  const locale = localeAt(usePathname());
  const chosen = useSyncExternalStore(subscribe, chosenLanguage, () => 'en');
  return locale ?? (chosen === 'tl' ? 'tl' : 'en');
}

/** The visitor's own choice or phone language, whatever page they are on. */
export const useChosenLanguage = () =>
  useSyncExternalStore<Lang>(subscribe, chosenLanguage, () => 'en');

export function setLanguage(lang: Lang) {
  memory = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Storage blocked: keep the choice in memory for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
