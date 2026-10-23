import type { NextConfig } from 'next';
import { PRIVATE_PATHS } from './src/lib/privatePaths';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    // Keeps private pages out of search results even when linked elsewhere.
    return PRIVATE_PATHS.map((path) => ({
      source: `${path}/:rest*`,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
    }));
  },
  async redirects() {
    // One address for Google: www.hopebegins.today goes to hopebegins.today.
    return [
      // Our Story became Our approach.
      {
        source: '/our-story',
        destination: '/our-approach',
        permanent: true,
      },
      // Hope Unfiltered became the blog, Stories of Hope.
      {
        source: '/hope-unfiltered',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/hope-unfiltered/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/og/hope-unfiltered.jpg',
        destination: '/og/blog.jpg',
        permanent: true,
      },
      {
        source: '/og/hope-unfiltered/:file',
        destination: '/og/blog/:file',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.hopebegins.today' }],
        destination: 'https://hopebegins.today/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
