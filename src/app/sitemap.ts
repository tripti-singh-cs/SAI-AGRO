import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import Blog from '@/models/Blog';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/products', changeFrequency: 'daily', priority: 0.9 },
    { path: '/solutions', changeFrequency: 'weekly', priority: 0.85 },
    { path: '/calculator', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.85 },
    { path: '/rnd', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/media', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/dealers', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.75 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    await connectToDatabase();

    const [products, blogs] = await Promise.all([
      Product.find({}, 'slug updatedAt').lean(),
      Blog.find({ isPublished: true }, 'slug updatedAt').lean(),
    ]);

    for (const product of products) {
      if (product.slug) {
        entries.push({
          url: `${SITE_URL}/products/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }

    for (const blog of blogs) {
      if (blog.slug) {
        entries.push({
          url: `${SITE_URL}/blog/${blog.slug}`,
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }
  } catch {
    // Fallback gracefully to static routes if database is unavailable during build
  }

  return entries;
}
