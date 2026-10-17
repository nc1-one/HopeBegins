'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PHOTOS, type PhotoId } from '@/lib/photos';

export interface ApproachStep {
  name: string;
  text: string;
  photo: PhotoId;
  link?: { href: string; label: string };
}

/**
 * The six steps as a short scroll story. On a computer one photo stays in
 * view and changes with the step being read, which comes into focus; on a
 * phone each step carries its own photo.
 */
export function ApproachSteps({ steps }: { steps: ApproachStep[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // The step crossing the middle of the screen is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    for (const item of items.current) if (item) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-10 md:grid md:grid-cols-2 md:gap-14">
      <div className="hidden md:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-xl bg-[#EFF3E7]">
          {steps.map((step, index) => (
            <Image
              key={step.name}
              src={PHOTOS[step.photo]}
              alt=""
              fill
              sizes="480px"
              className={`object-cover transition-[opacity,transform] duration-[var(--hb-slow)] ease-[var(--hb-ease-out)] ${
                index === active
                  ? 'scale-100 opacity-100'
                  : 'scale-105 opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <ol>
        {steps.map((step, index) => (
          <li
            key={step.name}
            ref={(el) => {
              items.current[index] = el;
            }}
            data-index={index}
            className={`border-b border-[#E2DFDA] py-10 first:pt-0 last:border-0 md:flex md:min-h-[62vh] md:flex-col md:justify-center md:py-0 md:transition-opacity md:duration-[var(--hb-slow)] md:ease-[var(--hb-ease-out)] ${
              index === active ? 'md:opacity-100' : 'md:opacity-35'
            }`}
          >
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-[#EFF3E7] md:hidden">
              <Image
                src={PHOTOS[step.photo]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="font-poppins text-sm font-semibold text-[#6E5F47] tabular-nums">
              Step {index + 1}
            </p>
            <h3 className="mt-1 font-playfair text-3xl md:text-4xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]">
              {step.name}
            </h3>
            <p className="mt-3 text-lg text-[#6E5F47] leading-relaxed">
              {step.text}
            </p>
            {step.link && (
              <Link
                href={step.link.href}
                className="mt-2 inline-flex min-h-11 w-fit items-center font-poppins font-bold text-[#6E5F47] underline underline-offset-4"
              >
                {step.link.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
