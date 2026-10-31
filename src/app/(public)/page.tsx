import { hreflang } from '@/lib/hreflang';
import type { Metadata } from 'next';
import { HomeAbout } from './components/HomeAbout';
import { LookingForHope } from './components/LookingForHope';

// Set here, not in the root layout, which every page would inherit.
export const metadata: Metadata = {
  // The name first, for people who search for it, then what it is.
  title: { absolute: 'HopeBegins: Not okay today? Free, faith-driven support' },
  description:
    'Free, faith-driven help when you feel anxious, low or alone: calming tools, a personal plan, prayer and the free helplines where you live. In six languages.',
  alternates: { canonical: '/', languages: hreflang('/') },
  keywords: [
    'HopeBegins',
    'free mental health support',
    'Christian mental health support',
    'not okay today',
    'anxiety help',
    'feeling low',
    'feeling alone',
    'prayer request',
    'faith and mental health',
    'e-coach on Messenger',
    'Taglish',
  ],
};

// The first screen and the menu. What HopeBegins is, in plain words, sits
// under the first screen; the menu stays quiet.
export default function LandingPage() {
  return <LookingForHope about={<HomeAbout lang="en" />} />;
}
