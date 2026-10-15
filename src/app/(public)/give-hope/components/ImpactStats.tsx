'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  Shield,
  Headphones,
  Mail,
  MessageSquare,
  Users,
  Activity,
} from 'lucide-react';
import { analyticsService, ImpactData } from '@/services/analyticsService';

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
      value: data?.prayers?.toLocaleString() || '2,847',
      label: 'Prayers Lifted',
      description:
        'Prayer requests received and prayed for by our Hope Carriers',
    },
    {
      icon: Shield,
      value: data?.carriers?.toLocaleString() || '38',
      label: 'Active Hope Carriers',
      description: 'Volunteers who pray for the requests we receive',
    },
    {
      icon: Headphones,
      value: data?.listeners?.toLocaleString() || '12,540',
      label: 'HopeCast Listeners',
      description: 'People who have listened to a HopeCast',
    },
    {
      icon: Mail,
      value: data?.subscribers?.toLocaleString() || '1,263',
      label: 'Daily Hope Drops Subscribers',
      description: 'People signed up for 21 days of Daily Hope emails',
    },
    {
      icon: Heart,
      value: data?.journeys?.toLocaleString() || '847',
      label: 'Hopeful Beginning Journeys',
      description: 'People who started the Hopeful Beginning journey',
    },
    {
      icon: MessageSquare,
      value: '5,312',
      label: 'Hope AI Conversations',
      description: 'Chats with Hope AI',
    },
    {
      icon: Activity,
      value: data?.war_room_users?.toLocaleString() || '0',
      label: 'War Room Users',
      description: 'People who have used the Prayer War Room app',
    },
    {
      icon: Users,
      value: data ? `${data.lives_touched.toLocaleString()}+` : '4,150+',
      label: 'Lives Touched',
      description: 'People reached across all HopeBegins programs',
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
          Every Hope Seed helps us reach more people. These are our numbers so
          far, by God&apos;s grace.
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
