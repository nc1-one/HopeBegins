import Image from 'next/image';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { photo, photoTurn } from '@/lib/photos';
import { CarrierForm } from './components/CarrierForm';
import { CarrierSteps } from './components/CarrierSteps';

export default function BeCarrierPage() {
  const top = photo('care', photoTurn());
  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-8 aspect-[4/3] max-w-2xl overflow-hidden rounded-xl bg-[#EFF3E7] md:aspect-[16/9]">
          <Image
            src={top.src}
            alt=""
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 768px) 672px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-2xl">
          <OptionPageHeader
            title="Become a Hope Carrier"
            subtitle="Give your heart and time: pray for the people who send prayer requests to HopeBegins."
          />
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14">
          <CarrierSteps />
          <section aria-labelledby="signup-title">
            <h2
              id="signup-title"
              className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              Sign up
            </h2>
            <div className="mt-6">
              <CarrierForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
