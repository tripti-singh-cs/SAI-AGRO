import type { MetadataRoute } from 'next';
import { IS_PREVIEW_ENV, SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW_ENV) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
