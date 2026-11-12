import type { Metadata } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo';

async function findBlog(slug: string) {
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
  return blog;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  try {
    const blog = await findBlog(slug);

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

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  let jsonLd: object[] = [];

  try {
    const blog = await findBlog(params.slug);
    if (blog) {
      const slug = blog.slug || params.slug;
      jsonLd = [
        buildArticleJsonLd({
          title: blog.title,
          slug,
          summary: blog.summary,
          author: blog.author,
          coverImage: blog.coverImage,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: blog.title, path: `/blog/${slug}` },
        ]),
      ];
    }
  } catch {
    // Skip JSON-LD if DB lookup fails
  }

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
