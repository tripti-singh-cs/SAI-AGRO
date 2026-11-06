'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, User, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface BlogItem {
  _id: string;
  title: string;
  slug?: string;
  category: string;
  author: string;
  readTime: string;
  coverImage?: string;
  summary: string;
}

const fallbackBlogs: BlogItem[] = [
  {
    _id: '1',
    title: 'How Bio-Fertilizers Cut Chemical Input Costs by 30% While Increasing Soil Microbial Life',
    slug: 'bio-fertilizers-cut-input-costs',
    category: 'Bio-Fertilizer Science',
    author: 'Dr. A. Verma (Chief Agronomist)',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?q=80&w=800&auto=format&fit=crop',
    summary: 'Explore how Rhizobium and PSB bacterial cultures unlock fixed soil minerals, enrich earthworm activity, and build long-term farm resilience.'
  },
  {
    _id: '2',
    title: 'Complete Micronutrient Management Guide: Curing Leaf Yellowing and Enhancing Flower Set',
    slug: 'micronutrient-management-guide',
    category: 'Crop Nutrition',
    author: 'Er. S. Deshmukh',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800&auto=format&fit=crop',
    summary: 'A step-by-step diagnostic breakdown of Zinc, Boron, and Calcium deficiencies across paddy, wheat, cotton, and high-value vegetables.'
  },
  {
    _id: '3',
    title: 'Organic Soil Conditioning with Potassium Humate: Transforming Hard Alkaline Soils',
    slug: 'potassium-humate-soil-health',
    category: 'Soil Health',
    author: 'K. R. Patel (Soil Specialist)',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop',
    summary: 'Learn how active humic and fulvic acids boost soil Cation Exchange Capacity (CEC), improve water retention, and multiply feeder root systems.'
  }
];

export default function AgronomyBlogsSection() {
  const [blogs, setBlogs] = useState<BlogItem[]>(fallbackBlogs);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.blogs && data.blogs.length > 0) {
          setBlogs(data.blogs.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
              isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
            }`}>
              <BookOpen className="w-3.5 h-3.5" /> 
              <span>{isHindi ? 'कृषि ज्ञान केंद्र' : 'Farmer Knowledge Hub'}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isHindi ? 'नवीनतम कृषि तकनीक एवं मार्गदर्शन' : 'Latest Agronomy & Bio-Farming Insights'}
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {isHindi 
                ? 'मिट्टी की उर्वरता सुधार, सूक्ष्म पोषक तत्वों के प्रयोग और बिना रसायन के कीट सुरक्षा पर विशेषज्ञ सलाह।' 
                : 'Practical guides on soil microbiome restoration, micro-nutrient application schedules, and non-toxic crop protection.'}
            </p>
          </div>

          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition self-start md:self-auto border shadow-sm ${
              isLight 
                ? 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-emerald-950 hover:bg-emerald-900 text-lime-400 border-emerald-700/60'
            }`}
          >
            <span>{isHindi ? 'सभी लेख पढ़ें' : 'All Articles'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((b) => (
            <article
              key={b._id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 border shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              {/* Cover Image */}
              <div className={`relative aspect-[16/9] overflow-hidden ${
                isLight ? 'bg-emerald-50' : 'bg-[#051109]'
              }`}>
                {b.coverImage ? (
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${
                    isLight ? 'text-emerald-700 bg-emerald-100' : 'text-lime-400 bg-emerald-950'
                  }`}>
                    <BookOpen className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${
                    isLight ? 'bg-emerald-700 text-white' : 'bg-emerald-950/90 text-lime-300 border border-emerald-700 backdrop-blur-md'
                  }`}>
                    {b.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className={`flex items-center gap-4 text-xs font-bold ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> {b.readTime || '5 min read'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-500" /> {b.author}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-black transition leading-snug tracking-tight ${
                    isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-lime-300'
                  }`}>
                    <Link href={`/blog/${b.slug || b._id}`}>
                      {b.title}
                    </Link>
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {b.summary}
                  </p>
                </div>

                <div className={`pt-4 border-t ${
                  isLight ? 'border-emerald-100' : 'border-emerald-900/60'
                }`}>
                  <Link
                    href={`/blog/${b.slug || b._id}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-black transition duration-200 ${
                      isLight ? 'text-emerald-700 hover:text-emerald-900' : 'text-lime-400 hover:text-white'
                    }`}
                  >
                    <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read Full Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
