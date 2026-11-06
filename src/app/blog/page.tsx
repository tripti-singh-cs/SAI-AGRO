'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight, Sparkles, Search } from 'lucide-react';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  summary: string;
  tags: string[];
  createdAt: string;
}

const categories = ['All Articles', 'Crop Nutrition', 'Modern Farming', 'Bio-Pest Control', 'Soil Health'];

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All Articles');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        let url = `/api/blogs?limit=30`;
        if (selectedCat !== 'All Articles') {
          url += `&category=${encodeURIComponent(selectedCat)}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.blogs) {
          setBlogs(data.blogs);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [selectedCat]);

  const filteredBlogs = blogs.filter((b) => {
    if (!search.trim()) return true;
    return (
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-lime-400 text-xs font-bold border border-emerald-800 mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Agronomy Knowledge Hub
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scientific Farming Guides & Insights
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Empowering farmers with practical knowledge on organic crop schedules, bio-pest management, and soil rejuvenation.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-3xl glass-panel p-6 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCat === cat
                    ? 'bg-lime-400 text-slate-950 shadow-md'
                    : 'bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading agronomy guides...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((b) => (
              <article
                key={b._id}
                className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 group hover:border-lime-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] bg-[#051109] overflow-hidden">
                  {b.coverImage ? (
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lime-400 bg-emerald-950">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-lime-300 border border-emerald-700 backdrop-blur-md">
                      {b.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" /> {b.readTime || '5 min read'}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-emerald-400" /> {b.author}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition leading-snug">
                      <Link href={`/blog/${b.slug || b._id}`}>
                        {b.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {b.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-950">
                    <Link
                      href={`/blog/${b.slug || b._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-white transition group-hover:translate-x-1 duration-200"
                    >
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
