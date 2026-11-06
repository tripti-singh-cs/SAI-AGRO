'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, User, MapPin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewItem {
  _id: string;
  farmerName: string;
  village?: string;
  district: string;
  state: string;
  cropGrown: string;
  productUsed: string;
  yieldIncreasePercent: string;
  rating: number;
  reviewText: string;
}

const defaultReviews: ReviewItem[] = [
  {
    _id: '1',
    farmerName: 'Rameshwar Patel',
    district: 'Indore',
    state: 'Madhya Pradesh',
    cropGrown: 'Soybean & Wheat',
    productUsed: 'Sai Bio-Phos & Humic-King',
    yieldIncreasePercent: '+32%',
    rating: 5,
    reviewText: 'Sai Bio-Phos applied through drip gave magnificent root growth in wheat. My fertilizer cost dropped by 30% and yield was the highest in our village.',
  },
  {
    _id: '2',
    farmerName: 'Gurpreet Singh',
    district: 'Ludhiana',
    state: 'Punjab',
    cropGrown: 'Basmati Paddy 1121',
    productUsed: 'Sai Grow-Max & Zinc Chelate',
    yieldIncreasePercent: '+28%',
    rating: 5,
    reviewText: 'After spraying Sai Grow-Max at flowering stage, flower dropping completely stopped. Panicles were longer with heavy, lustrous golden grains.',
  },
  {
    _id: '3',
    farmerName: 'Vikas Deshmukh',
    district: 'Nashik',
    state: 'Maharashtra',
    cropGrown: 'Grapes & Pomegranate',
    productUsed: 'Sai Cal-Bor Plus & Bio-Shield',
    yieldIncreasePercent: '+35%',
    rating: 5,
    reviewText: 'Sai Cal-Bor Plus prevented fruit cracking during sudden unseasonal rains. Berries achieved export-grade uniform color and firm crispness.',
  },
];

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(defaultReviews);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      }
    }
    fetchReviews();
  }, []);

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f0f7f2]' : 'bg-[#07130b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Quote className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'किसानों के वास्तविक अनुभव' : 'Real Farmer Experiences'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('testimonialsTitle')}
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 border shadow-lg hover:shadow-2xl ${
                isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              <div className="space-y-4">
                {/* Rating & Yield Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                    isLight 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                      : 'bg-emerald-950 text-lime-400 border-emerald-800'
                  }`}>
                    {isHindi ? 'पैदावार ' : 'Yield '}{rev.yieldIncreasePercent || '+30%'}
                  </span>
                </div>

                {/* Review Content */}
                <p className={`text-xs sm:text-sm italic leading-relaxed pt-2 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  &ldquo;{rev.reviewText}&rdquo;
                </p>

                {/* Applied Product & Crop */}
                <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                  isLight 
                    ? 'bg-emerald-50/70 border-emerald-200' 
                    : 'bg-[#040e07] border-emerald-950/80'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={isLight ? 'text-slate-500 font-medium' : 'text-slate-400 font-medium'}>
                      {isHindi ? 'फसल: ' : 'Crop: '}
                    </span>
                    <strong className={isLight ? 'text-slate-900 font-black' : 'text-white font-black'}>
                      {rev.cropGrown}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isLight ? 'text-slate-500 font-medium' : 'text-slate-400 font-medium'}>
                      {isHindi ? 'उत्पाद: ' : 'Product: '}
                    </span>
                    <strong className={isLight ? 'text-emerald-700 font-black' : 'text-lime-400 font-black'}>
                      {rev.productUsed}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Farmer Info */}
              <div className={`mt-6 pt-4 border-t flex items-center gap-3 ${
                isLight ? 'border-emerald-100' : 'border-emerald-950'
              }`}>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  isLight 
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                    : 'bg-emerald-950 border-emerald-800 text-lime-400'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-black flex items-center gap-1.5 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {rev.farmerName} 
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-lime-400'}`} />
                  </h4>
                  <p className={`text-[11px] flex items-center gap-1 font-medium ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <MapPin className="w-3 h-3 text-emerald-500" /> {rev.district}, {rev.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
