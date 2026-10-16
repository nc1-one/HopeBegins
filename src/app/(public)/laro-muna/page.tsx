import { pageMetadata } from '@/lib/pageMetadata';
import { LaroMuna } from './LaroMuna';

export const metadata = pageMetadata(
  '/laro-muna',
  'Laro muna: a quick game for a busy mind',
  'A free 2-minute memory game with jeepneys, mangoes and parols, for when your thoughts keep looping. No sign-up, nothing to download.'
);

export default function LaroMunaPage() {
  return <LaroMuna />;
}
