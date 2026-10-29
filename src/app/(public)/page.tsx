import type { Metadata } from 'next';
import { HomeAbout } from './components/HomeAbout';
import { LookingForHope } from './components/LookingForHope';

// Set here, not in the root layout, which every page would inherit.
export const metadata: Metadata = {
  // The name first, for people who search for it, then what it is.
  title: { absolute: 'HopeBegins: Not okay today? Free help for Filipinos' },
  description:
    'HopeBegins is free, faith-driven support for Filipinos who feel anxious, low or alone: a personal plan, prayer and e-coaches on Messenger. Crisis: call 1553.',
  alternates: { canonical: '/' },
  keywords: [
    'HopeBegins',
    'free mental health support Philippines',
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
  return <LookingForHope about={<HomeAbout />} />;
}
