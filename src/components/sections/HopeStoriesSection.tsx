'use client';

import React, { useState, useEffect } from 'react';
import {
  TestimonialCarousel,
  Testimonial,
} from '@/components/ui/testimonial-carousel';
import { SubmitHopeStoryModal } from '@/components/modals/SubmitHopeStoryModal';
import { secondaryClass } from '@/components/tools/toolStyles';
import hopeStoryService from '@/services/hopeStoryService';

export function HopeStoriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const data = await hopeStoryService.getApprovedStories();
      if (data && data.length > 0) {
        const mappedStories: Testimonial[] = data.map((story: any) => ({
          id: story.id,
          content: story.testimonial,
          name: story.full_name,
          role: story.occupation || undefined,
          avatar: story.photo || '', // Fallback handled in carousel or CSS
        }));
        setStories(mappedStories);
      }
    } catch (error) {
      console.error('Failed to fetch hope stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <section aria-labelledby="stories-title" className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="stories-title"
              className="font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[0.95] tracking-[-0.04em]"
            >
              Stories of hope
            </h2>
            <p className="mt-3 max-w-lg text-[#6E5F47] leading-relaxed">
              What people say about their time with HopeBegins.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`self-start md:self-auto ${secondaryClass}`}
          >
            Share your story
          </button>
        </div>

        <div className="mt-8">
          {loading ? (
            // Holds the space quietly until the stories arrive.
            <div className="min-h-64" aria-hidden />
          ) : (
            <TestimonialCarousel
              testimonials={stories.length > 0 ? stories : undefined}
            />
          )}
        </div>
      </div>

      <SubmitHopeStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
