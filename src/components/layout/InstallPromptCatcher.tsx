'use client';

import { useEffect } from 'react';
import { catchInstallPrompt } from '@/lib/installPrompt';

/** Holds the browser's install offer so the plan page can show it later. */
export function InstallPromptCatcher() {
  useEffect(() => catchInstallPrompt(), []);
  return null;
}
