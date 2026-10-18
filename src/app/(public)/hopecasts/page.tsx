'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { hopecastService } from '@/services/hopecastService';
import { CategoryFilter } from './_components/category-filter';
import { HopecastCard } from './_components/hopecast-card';
import { Category, Hopecast, HopecastListResponse } from '@/types/hopecast';
import { OptionPageHeader } from '@/components/layout/OptionPageHeader';
import { primaryClass, secondaryClass } from '@/components/tools/toolStyles';
import { cn } from '@/lib/utils';

export default function HopecastsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Audio Playback State
  const [playingHopecast, setPlayingHopecast] = React.useState<Hopecast | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['hopecast-categories'],
    queryFn: () => hopecastService.getCategories(),
  });

  // Fetch hopecasts
  const {
    data: hopecastsData,
    isLoading: isLoadingHopecasts,
    isError: hopecastsFailed,
    refetch: retryHopecasts,
  } = useQuery<HopecastListResponse>({
    queryKey: ['hopecasts', selectedCategoryId, page],
    queryFn: () =>
      hopecastService.getHopecasts(selectedCategoryId, page, pageSize),
  });

  const hopecasts = hopecastsData?.results || [];

  // Reset page and stop audio when category changes
  React.useEffect(() => {
    setPage(1);

    // Stop audio playback on category change
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingHopecast(null);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [selectedCategoryId]);

  // Cleanup audio on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async (hopecast: Hopecast) => {
    // If it's already the same hopecast, toggle play/pause
    if (playingHopecast?.id === hopecast.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    // New hopecast to play
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(hopecast.mp4_link);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    try {
      setPlayingHopecast(hopecast);
      setIsPlaying(true);
      setProgress(0);

      // Play the audio
      await audio.play();

      // Call API to increment play count
      await hopecastService.playHopecast(hopecast.id);
    } catch (error) {
      console.error('Error playing hopecast:', error);
      setIsPlaying(false);
    }
  };

  const pageCount = hopecastsData
    ? Math.ceil(hopecastsData.count / pageSize)
    : 1;

  return (
    <div className="px-6 pt-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <OptionPageHeader
            title="I need to hear hope today"
            subtitle="Short messages of hope you can listen to."
          />

          <div className="mt-8 mb-8">
            {isLoadingCategories ? (
              <div className="min-h-11" />
            ) : (
              <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            )}
          </div>

          {isLoadingHopecasts ? (
            <p className="text-[#6E5F47]">Loading…</p>
          ) : hopecasts.length > 0 ? (
            <>
              <ul className="divide-y divide-[#E2DFDA] border-y border-[#E2DFDA]">
                {hopecasts.map((hopecast, i) => (
                  <li
                    key={hopecast.id}
                    className="py-6 hb-step-in"
                    style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                  >
                    <HopecastCard
                      hopecast={hopecast}
                      onPlay={handlePlay}
                      isPlaying={
                        playingHopecast?.id === hopecast.id && isPlaying
                      }
                      progress={
                        playingHopecast?.id === hopecast.id ? progress : 0
                      }
                    />
                  </li>
                ))}
              </ul>

              {hopecastsData && hopecastsData.count > pageSize && (
                <div className="flex items-center gap-4 pt-8">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={cn(secondaryClass, 'font-medium')}
                  >
                    Back
                  </button>
                  <span className="text-[#6E5F47] font-medium">
                    Page {page} of {pageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= pageCount}
                    className={cn(secondaryClass, 'font-medium')}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : hopecastsFailed ? (
            <div role="alert" className="space-y-4">
              <p className="text-[#6E5F47]">
                We couldn&apos;t load HopeCasts. Check your connection and try
                again.
              </p>
              <button
                type="button"
                onClick={() => retryHopecasts()}
                className={primaryClass}
              >
                Try again
              </button>
            </div>
          ) : (
            <p className="text-[#6E5F47]">
              No HopeCasts on this topic yet. Try another one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
