'use client';

import { useSyncExternalStore } from 'react';
import type { FeelingLang } from './feelingPages';

/**
 * English or Taglish for the start menu, remembered in this browser only.
 */
const KEY = 'hopebegins.lang';
const CHANGE_EVENT = 'hopebegins-lang-change';

// Used when the browser blocks storage, so the choice still works this visit.
let memory: FeelingLang = 'en';

function read(): FeelingLang {
  try {
    return localStorage.getItem(KEY) === 'tl' ? 'tl' : 'en';
  } catch {
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

export function useLanguage(): FeelingLang {
  return useSyncExternalStore(subscribe, read, () => 'en');
}

export function setLanguage(lang: FeelingLang) {
  memory = lang;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Storage blocked: keep the choice in memory for this visit.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
