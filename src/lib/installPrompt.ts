'use client';

import { useSyncExternalStore } from 'react';

/**
 * Add-to-home-screen support. Chrome and Edge offer an install prompt that
 * we hold until the visitor asks for it; iPhones use Share > Add to Home
 * Screen instead.
 */
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: InstallPromptEvent | null = null;
let listening = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

export function catchInstallPrompt() {
  if (listening) return;
  listening = true;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferred = event as InstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCanPromptInstall() {
  return useSyncExternalStore(
    subscribe,
    () => deferred !== null,
    () => false
  );
}

export async function promptInstall() {
  if (!deferred) return;
  await deferred.prompt();
  await deferred.userChoice;
  deferred = null;
  notify();
}

export type HomeScreenStatus = 'installed' | 'iphone' | 'other';

function readHomeScreenStatus(): HomeScreenStatus {
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return 'installed';
  const isIphone =
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
  return isIphone ? 'iphone' : 'other';
}

export function useHomeScreenStatus() {
  return useSyncExternalStore(
    () => () => {},
    readHomeScreenStatus,
    () => 'other' as HomeScreenStatus
  );
}
