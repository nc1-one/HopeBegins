'use client';

import { useEffect, useRef, useState } from 'react';
import { analyticsService, ImpactData } from '@/services/analyticsService';

/** Counts up to the real number once it scrolls into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setShown(value);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 1400);
          // Quick at first, settling gently on the number.
          setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {shown.toLocaleString()}
      </span>
      <span className="sr-only">{value.toLocaleString()}</span>
    </>
  );
}

/** Real totals from the site. If they can't load, the section stays away. */
export function ImpactStats() {
  const [data, setData] = useState<ImpactData | null>(null);

  useEffect(() => {
    analyticsService
      .getImpactData()
      .then(setData)
      .catch((error) => console.error('Failed to fetch impact data:', error));
  }, []);

  if (!data) return null;

  const stats = [
    { value: data.prayers, label: 'prayer requests sent' },
    { value: data.carriers, label: 'Hope Carriers praying' },
    { value: data.listeners, label: 'HopeCast plays' },
    { value: data.journeys, label: 'Daily Hope sign-ups' },
  ].filter(
    // A count of nothing says nothing; only real numbers show.
    (stat): stat is { value: number; label: string } =>
      Number.isFinite(stat.value) && (stat.value ?? 0) > 0
  );
  if (stats.length === 0) return null;

  return (
    <section aria-labelledby="impact-title" className="hb-step-in">
      <h2
        id="impact-title"
        className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        So far, by God&apos;s grace
      </h2>
      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse border-t border-[#E2DFDA] pt-4"
          >
            <dt className="mt-1 text-[#6E5F47]">{stat.label}</dt>
            <dd className="font-playfair text-5xl md:text-6xl text-[#6E5F47] leading-none tracking-[-0.04em] tabular-nums">
              <CountUp value={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
