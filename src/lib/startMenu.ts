'use client';

/**
 * The home page has two screens: "Not okay today?" at / and the menu at
 * /#start. Moving between them goes through history.pushState, which the
 * Next.js router tracks, so the browser's Back button returns to the menu
 * from any page opened from it.
 */
export const START_HASH = '#start';

const HASH_EVENT = 'hopebegins-hash-change';

export function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

/** From "Not okay today?" to the menu, as a new history entry. */
export function openStartMenu() {
  window.history.pushState({ hbStartMenu: true }, '', START_HASH);
  window.dispatchEvent(new Event(HASH_EVENT));
}

/**
 * From the menu back to "Not okay today?". Goes back in history when the
 * menu was opened here, so Forward still works; otherwise (a shared /#start
 * link) it replaces the entry.
 */
export function closeStartMenu() {
  if (window.history.state?.hbStartMenu) {
    window.history.back();
    return;
  }
  window.history.replaceState(null, '', window.location.pathname);
  window.dispatchEvent(new Event(HASH_EVENT));
}
