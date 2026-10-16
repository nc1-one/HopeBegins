'use client';

import { useState, useEffect } from 'react';
import { Heart, Shield, Headphones, Mail, Users, Activity } from 'lucide-react';
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
    {
      icon: Heart,
      value: count(data?.prayers),
      label: 'Prayer requests received',
      description: 'Requests sent to our Hope Carriers to pray for',
    },
    {
      icon: Shield,
      value: count(data?.carriers),
      label: 'Hope Carriers',
      description: 'Volunteers who pray for the requests we receive',
    },
    {
      icon: Headphones,
      value: count(data?.listeners),
      label: 'HopeCast plays',
      description: 'Times someone pressed play on a HopeCast',
    },
    {
      icon: Mail,
      value: count(data?.subscribers),
      label: 'Getting Daily Hope now',
      description: 'People partway through their 21 days of Daily Hope emails',
    },
    {
      icon: Heart,
      value: count(data?.journeys),
      label: 'Daily Hope sign-ups',
      description: 'Everyone who has signed up for Daily Hope so far',
    },
    {
      icon: Activity,
      value: count(data?.war_room_users),
      label: 'Prayer War Room visits',
      description:
        'Times someone opened the Prayer War Room app from HopeBegins',
    },
    {
      icon: Users,
      value: count(data?.lives_touched),
      label: 'People reached',
      description:
        'Daily Hope sign-ups, HopeCast plays and Hope Carriers added up. One person may be counted more than once.',
    },
  ];

  return (
    <section aria-labelledby="impact-title">
      <div className="mb-6">
        <h2
          id="impact-title"
          className="font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
        >
          Our current impact
        </h2>
        <p className="mt-3 font-poppins text-[#6E5F47] leading-relaxed">
          Every gift helps us reach more people. These are our numbers so far,
          by God&apos;s grace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-100 bg-white p-6"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="rounded-xl bg-[#E9EFEE] p-3 text-[#91AFAA]">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                {loading ? (
                  <div className="h-8 w-16 bg-zinc-100 animate-pulse rounded-lg" />
                ) : (
                  <span className="font-poppins text-3xl font-bold text-[#6E5F47] tabular-nums">
                    {stat.value}
                  </span>
                )}
              </div>
            </div>
            <p className="mb-1 font-poppins font-bold text-[#6E5F47]">
              {stat.label}
            </p>
            <p className="text-sm text-[#6E5F47] leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
