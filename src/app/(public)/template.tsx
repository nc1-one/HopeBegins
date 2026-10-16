'use client';

import { useEffect, type ReactNode } from 'react';

// The first page someone opens shows at once. After that, each page they
// tap through to rises gently into place.
let hasLoaded = false;

export default function PublicTemplate({ children }: { children: ReactNode }) {
  const animate = hasLoaded;
  useEffect(() => {
    hasLoaded = true;
  }, []);
  return <div className={animate ? 'hb-page-in' : undefined}>{children}</div>;
}
