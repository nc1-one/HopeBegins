'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  siteSettingsService,
  PopoutItem,
} from '@/services/siteSettingsService';
import Link from 'next/link';
import { X, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { isCalmPage } from '@/lib/calmPages';

import { useQuery } from '@tanstack/react-query';

// Shown at most once per visit, and never on the pages for people who are
// struggling right now.
const SHOWN_KEY = 'hopebegins.popout.shown';

const alreadyShown = () => {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === '1';
  } catch {
    return false;
  }
};

const EngagementPopout = () => {
  const pathname = usePathname();
  const [currentItem, setCurrentItem] = useState<PopoutItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isHidden =
    !pathname || pathname.startsWith('/admin') || isCalmPage(pathname);

  const { data: settings } = useQuery({
    queryKey: ['popout-public'],
    queryFn: () => siteSettingsService.getPublicPopouts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !isHidden,
  });

  useEffect(() => {
    if (isHidden || alreadyShown()) return;
    if (!settings || !settings.is_enabled || settings.items.length === 0)
      return;

    let hideTimer: ReturnType<typeof setTimeout>;
    const showTimer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * settings.items.length);
      setCurrentItem(settings.items[randomIndex]);
      setIsVisible(true);
      try {
        sessionStorage.setItem(SHOWN_KEY, '1');
      } catch {
        // Storage blocked: it may show again on the next page.
      }
      hideTimer = setTimeout(() => setIsVisible(false), 10000);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [settings, isHidden]);

  if (isHidden || !settings || !settings.is_enabled || !currentItem)
    return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          role="status"
          className="fixed inset-x-4 bottom-4 z-[9999] md:inset-x-auto md:left-6 md:bottom-6 md:w-[420px]"
        >
          <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#DFE7CF] bg-white p-4 pr-12 shadow-lg shadow-[#6E5F47]/10">
            <Sparkles className="h-5 w-5 shrink-0 text-[#91AFAA]" />
            <p className="flex-1 text-sm font-bold leading-snug text-[#6E5F47]">
              {currentItem.message}
            </p>
            <Link
              href={currentItem.link}
              className="inline-flex min-h-11 shrink-0 items-center rounded-2xl bg-[#6E5F47] px-4 text-sm font-bold text-white transition-colors hover:bg-[#5c4f3b]"
            >
              {currentItem.button_text}
            </Link>

            {/* Time left before it closes on its own */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 10, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-[#AEC488]"
            />

            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsVisible(false)}
              className="absolute top-1 right-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#6E5F47] transition-colors hover:bg-[#EFF3E7]"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngagementPopout;
