import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    // One address for Google: www.hopebegins.today goes to hopebegins.today.
    return [
      // Our Story became Our approach.
      {
        source: '/our-story',
        destination: '/our-approach',
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
