'use client';

import { useState, useEffect } from 'react';
import { analyticsService, ImpactData } from '@/services/analyticsService';

// Shown when the numbers can't be loaded. Never a made-up figure.
const NO_DATA = '–';

const count = (value?: number) => value?.toLocaleString() ?? NO_DATA;

export function ImpactStats() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const impact = await analyticsService.getImpactData();
        setData(impact);
      } catch (error) {
        console.error('Failed to fetch impact data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImpact();
  }, []);

  const STATS = [
    { value: data?.prayers, label: 'Prayer requests' },
    { value: data?.carriers, label: 'Hope Carriers' },
    { value: data?.listeners, label: 'HopeCast plays' },
    { value: data?.journeys, label: 'Daily Hope sign-ups' },
  ];

  // Nothing to show if the numbers couldn't load: no row of dashes.
  if (!loading && !data) return null;

  return (
    <section aria-labelledby="impact-title">
      <h2
        id="impact-title"
        className="font-poppins text-xl font-bold text-[#6E5F47]"
      >
        So far, by God&apos;s grace
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="text-sm text-[#6E5F47]">{stat.label}</dt>
            <dd className="font-poppins text-3xl font-bold text-[#6E5F47] tabular-nums">
              {loading ? (
                <span className="inline-block h-8 w-16 animate-pulse rounded-lg bg-zinc-100" />
              ) : (
                count(stat.value)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
