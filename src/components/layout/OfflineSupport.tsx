'use client';

import { useEffect } from 'react';

/**
 * Registers public/sw.js so the home-screen app opens the plan and the
 * tools without data. Production only, so local development always shows
 * fresh code.
 */
export function OfflineSupport() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // Not supported here, or blocked: the site works online as before.
    });
  }, []);
  return null;
}
