'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';

/**
 * The "Not okay today?" background: one everyday Filipino scene per visit.
 * The first screen always paints the still picture at once; the chosen clip
 * fades in over it once it is actually playing. Phones get a small file
 * (about 1 MB). With data saver or reduced motion, the clip's still picture
 * fades in instead, and nothing plays. Clips are from Pexels (free licence).
 */

interface Clip {
  id: string;
  /** For phones, about 1 MB. Missing means computers only. */
  small?: string;
  large: string;
  still: string;
}

const CLIPS: Clip[] = [
  {
    id: 'night-study',
    small: '/assets/video/hero/night-study-sm.mp4',
    large: '/assets/video/hero/night-study-lg.mp4',
    still: '/assets/images/hero/night-study.jpg',
  },
  {
    id: 'manila-dawn',
    small: '/assets/video/hero/manila-dawn-sm.mp4',
    large: '/assets/video/hero/manila-dawn-lg.mp4',
    still: '/assets/images/hero/manila-dawn.jpg',
  },
];

const SESSION_KEY = 'hopebegins.heroClip';

/** The same clip for the whole visit, so Back to this page doesn't switch it. */
function pickClip(isPhone: boolean): Clip {
  const choices = isPhone ? CLIPS.filter((clip) => clip.small) : CLIPS;
  try {
    const kept = choices.find(
      (clip) => clip.id === sessionStorage.getItem(SESSION_KEY)
    );
    if (kept) return kept;
  } catch {
    // Storage blocked: pick fresh.
  }
  const clip = choices[Math.floor(Math.random() * choices.length)];
  try {
    sessionStorage.setItem(SESSION_KEY, clip.id);
  } catch {
    // Storage blocked: fine.
  }
  return clip;
}

type Mode = { clip: Clip; play: boolean; src: string } | null;

let chosen: Mode | undefined;

function readMode(): Mode {
  if (chosen !== undefined) return chosen;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  const isPhone = window.matchMedia('(max-width: 767px)').matches;
  const calm =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    connection?.saveData === true;
  const clip = pickClip(isPhone);
  chosen = {
    clip,
    play: !calm,
    src: isPhone && clip.small ? clip.small : clip.large,
  };
  return chosen;
}

const noSubscribe = () => () => {};

export function HeroMedia() {
  // Decided once per page load in the browser; the server render (and the
  // first paint) shows the still picture.
  const mode = useSyncExternalStore(noSubscribe, readMode, () => null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mode?.play) return;
    video.play().catch(() => {
      // Autoplay refused (low-power mode): the still picture stays.
    });
  }, [mode]);

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/assets/images/hero/manila-dawn.jpg"
          alt=""
          fill
          // The first screen's picture: fetched first and never lazy.
          preload
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover object-top"
        />
        {mode &&
          (mode.play ? (
            <video
              ref={videoRef}
              key={mode.src}
              src={mode.src}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onPlaying={() => setIsVisible(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--hb-ease-out)] ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- a small still that fades in after load
            <img
              src={mode.clip.still}
              alt=""
              onLoad={() => setIsVisible(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--hb-ease-out)] ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>
      {/* Moving backgrounds get a pause button, per WCAG 2.2.2. It sits top
          right, on the page's grid, clear of the crisis line. */}
      {mode?.play && isVisible && (
        <div className="pointer-events-none absolute inset-x-0 top-4 z-10 px-6">
          <div className="mx-auto flex max-w-5xl justify-end">
            <button
              type="button"
              onClick={togglePause}
              aria-label={
                isPaused
                  ? 'Play the background video'
                  : 'Pause the background video'
              }
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              {isPaused ? (
                <Play className="h-4 w-4" />
              ) : (
                <Pause className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
