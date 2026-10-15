import type { MetadataRoute } from 'next';
import { config } from '@/config';
import { feelingSlugs } from '@/lib/feelingPages';

const publicRoutes = [
  '',
  '/get-started',
  '/action-plan',
  '/prayers',
  '/hope-ai',
  '/hopecasts',
  '/daily-hope',
  '/give-hope',
  '/our-story',
  '/be-carrier',
  '/guidelines',
  '/privacy',
  ...feelingSlugs,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${config.BASE_URL}${route}`,
  }));
}
