'use client';

import { useSyncExternalStore } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ECOACH_APP_URL, ECOACH_WEB_URL } from '@/lib/actionPlan';
import { isIntlLang, withLocale } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

const isPhoneOrTablet = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/**
 * Opens a chat with a Himala Everyday e-coach on Messenger. The e-coaches
 * speak English and Filipino, so on French, German, Spanish and Korean
 * pages it goes to the help page instead: free lines in the visitor's
 * country, and Hope AI.
 */
export function EcoachLink({
  linkName,
  className,
  children,
}: {
  linkName: string;
  className?: string;
  children: React.ReactNode;
}) {
  const opensApp = useSyncExternalStore(
    () => () => {},
    isPhoneOrTablet,
    () => true
  );
  const lang = usePageLanguage();

  if (isIntlLang(lang)) {
    return (
      <TrackedLink
        href={withLocale(lang, '/help')}
        linkName={linkName}
        className={className}
      >
        {children}
      </TrackedLink>
    );
  }

  return (
    <TrackedLink
      href={opensApp ? ECOACH_APP_URL : ECOACH_WEB_URL}
      target="_blank"
      rel="noopener noreferrer"
      linkName={linkName}
      className={className}
    >
      {children}
    </TrackedLink>
  );
}
