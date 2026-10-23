'use client';

import { useRef, useSyncExternalStore } from 'react';
import { FadeImage } from '@/components/ui/FadeImage';
import { usePhoto } from '@/components/ui/PhotoTurn';
import { analyticsService } from '@/services/analyticsService';
import { CarrierForm } from '../../be-carrier/components/CarrierForm';
import { CarrierSteps } from '../../be-carrier/components/CarrierSteps';
import { AllocationBreakdown } from './AllocationBreakdown';
import { DonationForm } from './DonationForm';

type Way = 'gift' | 'time';

// Picking a way rewrites the address without a jump, then says so here.
const PICKED = 'hopebegins:give-way';

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  window.addEventListener(PICKED, onChange);
  return () => {
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener(PICKED, onChange);
  };
};

/**
 * The two ways to give, as two photos to pick from: a gift, or your heart
 * and time as a Hope Carrier. /give-hope#time opens straight on the second.
 */
export function GiveWays() {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => ''
  );
  // The address decides the tab, so a shared link opens on the same one.
  const active: Way = hash === '#time' ? 'time' : 'gift';
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // The two photos of people caring for each other, never the same one.
  const giftPhoto = usePhoto('care', 1);
  const timePhoto = usePhoto('care');

  const ways = [
    {
      id: 'gift' as const,
      title: 'Give a gift',
      text: 'Keep HopeBegins free for the next person.',
      photo: giftPhoto,
    },
    {
      id: 'time' as const,
      title: 'Give your heart and time',
      text: 'Pray for people as a Hope Carrier.',
      photo: timePhoto,
    },
  ];

  const pick = (way: Way) => {
    if (way === active) return;
    // The address follows, so the link can be shared as it is.
    window.history.replaceState(null, '', `#${way}`);
    window.dispatchEvent(new Event(PICKED));
    analyticsService.recordClick(`give_way_${way}`);
  };

  // Arrow keys move between the two, as in any set of tabs.
  const onKey = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = active === 'gift' ? 1 : 0;
    pick(ways[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="ways-title" className="relative">
      {/* Where #gift and #time land. */}
      <span id="gift" className="absolute -top-24" aria-hidden />
      <span id="time" className="absolute -top-24" aria-hidden />
      <h2
        id="ways-title"
        className="font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
      >
        Two ways to give
      </h2>

      <div
        role="tablist"
        aria-label="Ways to give"
        onKeyDown={onKey}
        className="mt-8 grid grid-cols-2 gap-4 md:gap-6"
      >
        {ways.map((way, index) => {
          const isActive = way.id === active;
          return (
            <button
              key={way.id}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`way-tab-${way.id}`}
              aria-selected={isActive}
              aria-controls={`way-panel-${way.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => pick(way.id)}
              className="group text-left focus-visible:outline-none"
            >
              <span
                className={`relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] ring-offset-4 ring-offset-[#FCFDFA] transition-shadow duration-[var(--hb-base)] group-focus-visible:ring-4 group-focus-visible:ring-[#91AFAA]/60 md:aspect-[16/10] ${
                  isActive ? 'ring-2 ring-[#6E5F47]' : ''
                }`}
              >
                <FadeImage
                  src={way.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 500px, 50vw"
                  className={`object-cover transition-[opacity,transform,filter] duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                    isActive
                      ? 'scale-[1.02]'
                      : 'saturate-[0.85] group-hover:scale-[1.02] group-hover:saturate-100'
                  }`}
                />
              </span>
              <span className="mt-3 block font-poppins text-base font-semibold leading-snug text-[#6E5F47] md:text-xl">
                {way.title}
              </span>
              <span className="mt-1 block text-sm leading-snug text-[#6E5F47]/85 md:text-base">
                {way.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Both stay on the page, so an amount or a half-written form is
          still there after a look at the other. */}
      <div
        id="way-panel-gift"
        role="tabpanel"
        aria-labelledby="way-tab-gift"
        hidden={active !== 'gift'}
        className="mt-10 border-t border-[#E2DFDA] pt-10 hb-step-in"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          {/* Volunteers on the other tab never load the payment form. */}
          <DonationForm shown={active === 'gift'} />
          <div className="space-y-6">
            <AllocationBreakdown />
            <p className="text-[#6E5F47] leading-relaxed">
              Every gift, big or small, keeps the plan, the tools, prayer and
              Daily Hope free for anyone who needs them.
            </p>
          </div>
        </div>
      </div>
      <div
        id="way-panel-time"
        role="tabpanel"
        aria-labelledby="way-tab-time"
        hidden={active !== 'time'}
        className="mt-10 border-t border-[#E2DFDA] pt-10 hb-step-in"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14">
          <CarrierSteps headingLevel="h3" />
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              Sign up to be a Hope Carrier
            </h3>
            <div className="mt-6">
              <CarrierForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
