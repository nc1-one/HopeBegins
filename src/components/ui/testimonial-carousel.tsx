'use client';

import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import LyzaImg from '../../assets/images/Testimonial/Lyza.jpg';
import IsabelleImg from '../../assets/images/Testimonial/Isabelle.jpg';
import JeremyImg from '../../assets/images/Testimonial/Jeremy.jpg';

export interface Testimonial {
  id: number | string;
  content: string;
  name: string;
  role?: string;
  avatar: string | StaticImageData; // URL for the avatar image
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true. Crucially, this time, the truth is not just based on what I know but based on the ultimate truth from what the Word of God says. Coach Hope reminded me of the verse Philippians 2:13, which is now one of my favorite verses: “For God is working in you, giving you the desire and the power to do what pleases Him.” It’s a beautiful reminder that even in our battle with mental health, God works in us, and He not only gives us the desire to change but also the power to change for His glory.',
    name: 'Lyza Samartino',
    role: 'HopeBegins participant',
    avatar: LyzaImg,
  },
  {
    id: 2,
    content:
      'I remember that I was so confused why was still waking up with so much sadness, confusion, anxiety, and depression everyday. Every. Single. Day. And I didn’t know how to get out of it but I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God. So, when HopeBegins was offered and was an opportunity that I could join, I remember going straight at it and really taking a chance because God knew that it was what I needed to move forward with my relationship with Him–to move forward with understanding Him and His love for me better. When HopeBegins came, it was the beginning of so much transformation with so much of the darkness that I was carrying to be out of my life at that time.',
    name: 'Isabelle Prado',
    role: 'HopeBegins participant',
    avatar: IsabelleImg,
  },
  {
    id: 3,
    content:
      "I was overwhelmed with anxiety and so much lies from the enemy. So my friend introduced me to HopeBegins. But before that, I was having a hard time when it comes to my relationship with other people, even in decision making, to the point na nahirapan ako mag-decide. All of the decisions and actions na I was doing was not completely right and I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins. For those people who are interested or unsure sa pag-join ng Hope Begins.. you really have to take the risk, knowing na our problems or struggles in life, it's really hard ‘pag ikaw lang mag-di-deal lang niyan on your own. You know, sometimes we tend to fix things on our own, but we also forget to seek help from other people.",
    name: 'Jeremy Rebedillo',
    role: 'HopeBegins participant',
    avatar: JeremyImg,
  },
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const rowRef = useRef<HTMLUListElement>(null);

  // One card along, at the speed people asked for.
  const move = (direction: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.querySelector('li');
    if (!row || !card) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    row.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Every story in full: swipe on a phone, arrows on a computer. */}
      <ul
        ref={rowRef}
        tabIndex={0}
        aria-label="Stories of hope"
        className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#91AFAA]/40 [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.id}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl border border-[#DFE7CF] bg-white p-6 sm:w-[26rem] md:p-8"
          >
            <div className="flex items-center gap-4">
              {testimonial.avatar ? (
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#DFE7CF]">
                  <Image
                    src={testimonial.avatar}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              <span>
                <span className="block font-poppins font-bold text-[#6E5F47]">
                  {testimonial.name}
                </span>
                {testimonial.role && (
                  <span className="block text-sm text-[#6E5F47]/80">
                    {testimonial.role}
                  </span>
                )}
              </span>
            </div>
            <blockquote className="mt-5 flex-1 text-[#6E5F47] leading-relaxed">
              <span
                aria-hidden
                className="block font-playfair text-5xl leading-none text-[#AEC488]"
              >
                &ldquo;
              </span>
              <p className="-mt-3">{testimonial.content}</p>
            </blockquote>
          </li>
        ))}
      </ul>

      {testimonials.length > 1 && (
        <div className="mt-4 hidden justify-end gap-2 sm:flex">
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
