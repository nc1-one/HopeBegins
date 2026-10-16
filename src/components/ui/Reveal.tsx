'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Rises into view as it scrolls in, like Apple's product pages. Anything
 * already on screen when the page loads stays put, so the first screen is
 * never hidden, and without JavaScript everything simply shows.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  /** Milliseconds, to stagger items in a row. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    element.dataset.reveal = 'waiting';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = 'shown';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={
        delay ? ({ '--hb-reveal-delay': `${delay}ms` } as never) : undefined
      }
    >
      {children}
    </Tag>
  );
}
