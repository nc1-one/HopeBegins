'use client';

import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { ImpactStats } from './components/ImpactStats';
import { TestimonialCard } from './components/TestimonialCard';
import { AllocationBreakdown } from './components/AllocationBreakdown';
import { DonationForm } from './components/DonationForm';

export default function GiveHopePage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl space-y-12">
          <OptionPageHeader
            title="Give Hope"
            subtitle="Plant a Hope Seed and help keep HopeBegins free."
          />
          <DonationForm />
          <ImpactStats />
          <TestimonialCard />
          <AllocationBreakdown />
        </div>
      </div>
    </div>
  );
}
