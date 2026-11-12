import type { Metadata } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { buildPageMetadata, DEFAULT_OG_IMAGE } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  try {
    await connectToDatabase();
    let blog = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug).lean();
    }
    if (!blog) {
      blog = await Blog.findOne({ slug }).lean();
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: new RegExp(`^${slug}$`, 'i') }).lean();
    }

    if (blog) {
      return buildPageMetadata({
        title: blog.title,
        description: blog.summary || blog.title,
        path: `/blog/${blog.slug || slug}`,
        keywords: [...(blog.tags || []), blog.category, 'Sai Agro Agronomy'],
        image: blog.coverImage || DEFAULT_OG_IMAGE,
        type: 'article',
      });
    }
  } catch {
    // Fallback gracefully if DB lookup fails
  }

  return buildPageMetadata({
    title: 'Agronomy Article',
    description:
      'Read expert agronomy articles, crop nutrition guides, and sustainable farming insights from SAI AGRO INDUSTRIES.',
    path: `/blog/${slug}`,
    type: 'article',
  });
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
