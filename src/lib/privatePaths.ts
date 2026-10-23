/**
 * Pages that should never show up in search: the admin and Hope Carrier
 * areas, sign-in and password pages, and the thank-you page after a gift.
 * robots.txt asks search engines not to visit them, and next.config.ts
 * sends a noindex header with them in case one is linked from elsewhere.
 */
export const PRIVATE_PATHS = [
  '/admin',
  '/carrier',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/give-hope/success',
];
