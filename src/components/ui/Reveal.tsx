import type { ReactNode } from 'react';

/**
 * A block of a page. It used to rise into view on scroll; now it shows at
 * once, so nothing on the page is ever blank while someone scrolls.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
  id?: string;
  'aria-labelledby'?: string;
  lang?: string;
}) {
  return (
    <Tag {...rest} className={className}>
      {children}
    </Tag>
  );
}
