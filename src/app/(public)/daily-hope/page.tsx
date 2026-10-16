'use client';

import { DailyHopeForm } from './components/DailyHopeForm';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';

export default function DailyHopePage() {
  return (
    <div className="px-6 pt-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="I need Daily Hope"
            subtitle="A short, encouraging email every day for 21 days. Free."
          />
          <div className="mt-8">
            <DailyHopeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
