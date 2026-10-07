'use client';

import { useSyncExternalStore } from 'react';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { ECOACH_APP_URL, ECOACH_WEB_URL } from '@/lib/actionPlan';

const isPhoneOrTablet = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

/** Opens a chat with a Himala Everyday e-coach on Messenger. */
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
