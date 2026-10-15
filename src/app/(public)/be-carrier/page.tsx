import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { CarrierForm } from './components/CarrierForm';

export default function BeCarrierPage() {
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="Become a Hope Carrier"
            subtitle="Volunteer to pray for the people who send prayer requests to HopeBegins."
          />
          <div className="mt-10">
            <CarrierForm />
          </div>
        </div>
      </div>
    </div>
  );
}
