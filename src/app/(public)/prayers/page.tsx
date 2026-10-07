'use client';

import { PrayerForm } from './components/PrayerForm';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';

export default function PrayersPage() {
  return (
    <div className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="I Need Someone to Pray for Me"
            subtitle="Share what's on your heart. A Hope Carrier will pray for you."
          />
          <div className="mt-8">
            <PrayerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
