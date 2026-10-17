'use client';

import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { ImpactStats } from './components/ImpactStats';
import { AllocationBreakdown } from './components/AllocationBreakdown';
import { DonationForm } from './components/DonationForm';

export default function GiveHopePage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl space-y-10">
          <OptionPageHeader
            title="Give Hope"
            subtitle="Give a gift to keep HopeBegins free for the next person."
          />
          <DonationForm />
          <ImpactStats />
          <AllocationBreakdown />
        </div>
      </div>
    </div>
  );
}
