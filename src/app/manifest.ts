import type { MetadataRoute } from 'next';

// Lets visitors add HopeBegins to their home screen. On iPhone this also keeps
// a saved plan from being cleared after a week without a visit.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HopeBegins',
    short_name: 'HopeBegins',
    description:
      'Free, faith-driven support when you are not okay: calming tools, a personal plan, prayer and the free helplines where you live.',
    start_url: '/action-plan',
    scope: '/',
    display: 'standalone',
    background_color: '#FCFDFA',
    theme_color: '#FFFFFF',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
