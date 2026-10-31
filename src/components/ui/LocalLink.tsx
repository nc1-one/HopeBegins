'use client';

import Link from 'next/link';
import { localizeHref } from '@/lib/intlRoutes';
import { usePageLanguage } from '@/lib/pageLanguage';

/**
 * next/link that keeps a French, German, Spanish or Korean reader in their
 * language: on /fr pages, a link to '/tools' goes to '/fr/tools'.
 */
export default function LocalLink({
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const lang = usePageLanguage();
  return (
    <Link
      href={typeof href === 'string' ? localizeHref(href, lang) : href}
      {...props}
    />
  );
}
