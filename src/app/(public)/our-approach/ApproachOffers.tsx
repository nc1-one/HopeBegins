'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { EcoachLink } from '@/components/ui/EcoachLink';
import { groupClass, rowClass } from '@/components/ui/listStyles';

export interface Offer {
  title: string;
  text: string;
  href?: string;
  ecoach?: boolean;
  external?: boolean;
}

/** What people can use, in three tabs, so only one short list shows. */
export function ApproachOffers({
  groups,
}: {
  groups: { title: string; items: Offer[] }[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between the tabs.
  const onKey = (event: React.KeyboardEvent) => {
    const last = groups.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % groups.length
        : event.key === 'ArrowLeft'
          ? (active + last) % groups.length
          : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const body = (offer: Offer) => (
    <>
      <span className="flex-1">
        <span className="block font-poppins font-semibold text-[#6E5F47]">
          {offer.title}
        </span>
        <span className="block text-sm text-[#6E5F47]/85 leading-relaxed">
          {offer.text}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#C5BFB5] transition-transform group-hover:translate-x-0.5 group-hover:text-[#6E5F47]" />
    </>
  );

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="What you can use"
        onKeyDown={onKey}
        className="flex gap-6 border-b border-[#E2DFDA]"
      >
        {groups.map((group, index) => (
          <button
            key={group.title}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`offer-tab-${index}`}
            aria-selected={index === active}
            aria-controls="offer-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={`relative min-h-12 font-poppins text-[15px] font-medium text-[#6E5F47] transition-opacity focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 md:text-base ${
              index === active ? '' : 'opacity-70 hover:opacity-100'
            }`}
          >
            {group.title}
            {/* The underline grows under the chosen tab. */}
            <span
              aria-hidden
              className={`absolute inset-x-0 -bottom-px h-0.5 origin-left rounded-full bg-[#6E5F47] transition-transform duration-[var(--hb-base)] ease-[var(--hb-ease-out)] ${
                index === active ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        ))}
      </div>

      <ul
        key={active}
        id="offer-panel"
        role="tabpanel"
        aria-labelledby={`offer-tab-${active}`}
        className={`mt-6 ${groupClass}`}
      >
        {groups[active].items.map((offer, index) => (
          <li
            key={offer.title}
            className="hb-step-in"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {offer.ecoach ? (
              <EcoachLink linkName="ecoach_our_approach" className={rowClass}>
                {body(offer)}
              </EcoachLink>
            ) : offer.external ? (
              <a
                href={offer.href}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                {body(offer)}
              </a>
            ) : (
              <Link href={offer.href ?? '/'} className={rowClass}>
                {body(offer)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
