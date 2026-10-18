'use client';

import Image, { type ImageProps } from 'next/image';

/**
 * A photo that fades in once it has loaded, over the soft sage behind it,
 * instead of drawing in strips. Not for the first photo on a page, which
 * should show at once.
 */
export function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      className={`hb-fade-img ${className ?? ''}`}
      onLoad={(event) => {
        event.currentTarget.dataset.loaded = '';
        onLoad?.(event);
      }}
    />
  );
}
