'use client';

import Link from 'next/link';
import { analyticsService } from '@/services/analyticsService';
import React from 'react';

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
  linkName: string;
}

export function TrackedLink({ linkName, onClick, ...props }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    analyticsService.recordClick(linkName);
    if (onClick) onClick(e);
  };

  return <Link onClick={handleClick} {...props} />;
}
