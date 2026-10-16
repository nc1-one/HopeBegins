'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  TestimonialCarousel,
  Testimonial,
} from '@/components/ui/testimonial-carousel';
import { SubmitHopeStoryModal } from '@/components/modals/SubmitHopeStoryModal';
import { Plus } from 'lucide-react';
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
              className="font-playfair text-3xl md:text-5xl text-[#6E5F47] leading-[1.02] tracking-[-0.03em]"
            >
              Stories of hope
            </h2>
            <p className="mt-3 max-w-lg text-[#6E5F47] leading-relaxed">
              What people say about their time with HopeBegins.
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="self-start rounded-2xl bg-[#6E5F47] px-6 h-12 font-poppins font-bold text-white hover:bg-[#5c4f3b] md:self-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Share your story
          </Button>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex gap-4 overflow-hidden" aria-hidden>
              {[0, 1, 2].map((key) => (
                <div
                  key={key}
                  className="h-72 w-[85%] shrink-0 animate-pulse rounded-3xl bg-[#EFF3E7] sm:w-[26rem]"
                />
              ))}
            </div>
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
