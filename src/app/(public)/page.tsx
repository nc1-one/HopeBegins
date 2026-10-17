import type { Metadata } from 'next';
import { LookingForHope } from './components/LookingForHope';

// Set here, not in the root layout, which every page would inherit.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// The first screen and the menu only. Stories and the Prayer War Room live
// on Our approach and in the header, so the menu stays quiet.
export default function LandingPage() {
  return <LookingForHope />;
}
