'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, Clock, User, ArrowLeft, ArrowRight, Share2, Sparkles, ChevronRight } from 'lucide-react';

interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs/${slug}`, { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.blog) {
          setBlog(data.blog);
          setRelatedBlogs(data.relatedBlogs || []);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-28 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading agronomy article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-28 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Article Not Found</h2>
        <Link href="/blog" className="px-6 py-2.5 rounded-xl bg-lime-400 text-slate-950 font-bold text-sm">
          Back to Knowledge Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-white transition">Knowledge Hub</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-lime-400 font-semibold truncate">{blog.title}</span>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-lime-400 border border-emerald-800">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400 pt-2 border-b border-emerald-950 pb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" /> {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" /> {blog.readTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Summary Callout */}
        <div className="p-6 rounded-2xl bg-[#040e07] border-l-4 border-lime-400 text-slate-200 text-sm sm:text-base leading-relaxed italic">
          {blog.summary}
        </div>

        {/* Main Content HTML Render */}
        <div
          className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-emerald-950 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Tags:</span>
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-emerald-950 text-lime-300 text-xs border border-emerald-900">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 border-t border-emerald-950 space-y-6">
            <h3 className="text-2xl font-bold text-white">More Guides in {blog.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/blog/${rel.slug || rel._id}`}
                  className="glass-card rounded-2xl p-5 border border-emerald-900 group hover:border-lime-400/40 transition flex flex-col justify-between"
                >
                  <h4 className="text-base font-bold text-white group-hover:text-lime-400 transition line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                    {rel.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
