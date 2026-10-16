import { pageMetadata } from '@/lib/pageMetadata';
import { LaroMuna } from './LaroMuna';

export const metadata = pageMetadata(
  '/laro-muna',
  'Laro muna: quick games for a busy mind',
  'Free short games for when your thoughts keep looping: match jeepneys and mangoes, fly a kite at sunset, or drive a jeepney to the sea one small mission at a time. No sign-up.'
);

export default function LaroMunaPage() {
  return <LaroMuna />;
}
