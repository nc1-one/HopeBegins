'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { defaultTestimonials, type Testimonial } from '@/lib/hopeStories';

export type { Testimonial };

/** The first sentence or two of a story sent in through the site. */
const firstLines = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+["”’]?\s*/g) ?? [text];
  let excerpt = '';
  for (const sentence of sentences) {
    if (excerpt && excerpt.length + sentence.length > 180) break;
    excerpt += sentence;
  }
  return excerpt.trim();
};

/** One story: a line in their words, and the rest when they ask for it. */
export function StoryQuote({
  testimonial,
  className = '',
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const excerpt = testimonial.excerpt ?? firstLines(testimonial.content);
  const hasMore = excerpt.length < testimonial.content.length;

  return (
    <figure className={`flex flex-col text-[#6E5F47] ${className}`}>
      <blockquote>
        <p className="text-pretty font-playfair text-2xl leading-[1.2] tracking-[-0.02em] md:text-[1.7rem]">
          &ldquo;{excerpt}&rdquo;
        </p>
        {isOpen && (
          <p className="mt-4 leading-relaxed hb-step-in">
            {testimonial.content}
          </p>
        )}
      </blockquote>
      {hasMore && (
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="mt-3 inline-flex min-h-11 w-fit items-center font-poppins text-sm font-medium underline underline-offset-4 hover:text-[#5c4f3b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
        >
          {isOpen ? 'Show less' : 'Read their whole story'}
        </button>
      )}
      <figcaption className="mt-4 flex items-center gap-3">
        {testimonial.avatar ? (
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#EFF3E7]">
            <Image
              src={testimonial.avatar}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
        ) : null}
        <span>
          <span className="block font-poppins font-medium">
            {testimonial.name}
          </span>
          {testimonial.role && (
            <span className="block text-sm text-[#6E5F47]/80">
              {testimonial.role}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const rowRef = useRef<HTMLUListElement>(null);
  // Up to three sit side by side on a computer; more keep scrolling.
  const asGrid = testimonials.length <= 3;

  // One story along, at the speed people asked for.
  const move = (direction: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.querySelector('li');
    if (!row || !card) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    row.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 32),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Swipe on a phone; side by side on a computer. */}
      <ul
        ref={rowRef}
        tabIndex={0}
        aria-label="Stories of hope"
        className={`-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-8 overflow-x-auto px-6 pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 [&::-webkit-scrollbar]:hidden ${
          asGrid
            ? 'lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-0'
            : ''
        }`}
      >
        {testimonials.map((testimonial, index) => (
          <li
            key={testimonial.id}
            className={`w-[85%] shrink-0 snap-start border-t border-[#E2DFDA] pt-6 hb-step-in sm:w-[24rem] ${asGrid ? 'lg:w-auto' : ''}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <StoryQuote testimonial={testimonial} />
          </li>
        ))}
      </ul>

      {testimonials.length > 1 && (
        <div
          className={`mt-4 hidden justify-end gap-2 sm:flex ${
            asGrid ? 'lg:hidden' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous story"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DFE7CF] bg-white text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next story"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DFE7CF] bg-white text-[#6E5F47] transition-colors hover:bg-[#EFF3E7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
