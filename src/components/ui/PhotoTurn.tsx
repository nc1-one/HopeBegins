'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { photo, type Photo, type PhotoId } from '@/lib/photos';
import { usePageLanguage } from '@/lib/pageLanguage';

/*
 * The server decides which turn of the photo rotation a page shows and hands
 * it down here, so the browser draws the same photo the server did.
 */
const PhotoTurnContext = createContext(0);

export function PhotoTurnProvider({
  turn,
  children,
}: {
  turn: number;
  children: ReactNode;
}) {
  return <PhotoTurnContext value={turn}>{children}</PhotoTurnContext>;
}

/** The photo for a theme on this turn, in a client component. */
export function usePhoto(theme: PhotoId, offset = 0): Photo {
  const lang = usePageLanguage();
  return photo(theme, useContext(PhotoTurnContext), offset, lang);
}

/** Pick photos inside a loop or callback, where a hook can't be called. */
export function usePhotoPicker() {
  const turn = useContext(PhotoTurnContext);
  const lang = usePageLanguage();
  return (theme: PhotoId, offset = 0) => photo(theme, turn, offset, lang);
}
