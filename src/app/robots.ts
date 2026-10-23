import type { MetadataRoute } from 'next';
import { config } from '@/config';
import { PRIVATE_PATHS } from '@/lib/privatePaths';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...PRIVATE_PATHS, '/api/'],
    },
    sitemap: `${config.BASE_URL}/sitemap.xml`,
  };
}
