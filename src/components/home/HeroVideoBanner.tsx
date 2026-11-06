'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  TrendingUp,
  Sprout,
  Calculator,
  MessageCircle
} from 'lucide-react';
import VideoPlayerModal from '@/components/ui/VideoPlayerModal';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroVideoBanner() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const defaultHeroVideo = 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4';
  const [heroVideo1, setHeroVideo1] = useState(defaultHeroVideo);
  const [stats, setStats] = useState({
    farmersHelped: '50,000+',
    statesPresence: '18+ States',
    productsDelivered: '100+',
    yieldImprovement: '15+ Years',
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.setting) {
          if (data.setting.heroVideoUrl) {
            setHeroVideo1(data.setting.heroVideoUrl);
          }
          if (data.setting.stats) {
            setStats({
              farmersHelped: data.setting.stats.farmersHelped || '50,000+',
              statesPresence: data.setting.stats.statesPresence || '18+ States',
              productsDelivered: data.setting.stats.productsDelivered || '100+',
              yieldImprovement: data.setting.stats.yieldImprovement || '15+ Years',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load hero settings:', err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16 sm:pb-20">
      
      {/* Background Autoplaying Loop Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          key={heroVideo1}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover scale-105 transition-all duration-700 ${
            isLight 
              ? 'filter brightness-[0.45] contrast-125 saturate-115' 
              : 'filter brightness-[0.35] contrast-125 saturate-125'
          }`}
        >
          <source src={heroVideo1} type="video/mp4" />
        </video>
        
        {/* Responsive Dual-Theme Gradients Overlay */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isLight 
            ? 'bg-gradient-to-t from-[#f8faf6] via-[#092b15]/75 to-[#031408]/90' 
            : 'bg-gradient-to-t from-[#0b1b11] via-[#0b1b11]/75 to-[#040e07]/85'
        }`} />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-10">
        
        {/* Trust Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-lime-400/40 text-lime-400 text-xs sm:text-sm font-bold mb-6 shadow-2xl backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-lime-400 flex-shrink-0" />
          <span>{t('heroBadge')}</span>
        </div>

        {/* Main Title with Responsive Clamped Fluid Font Size */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto drop-shadow-lg">
          {t('heroTitle1')} <br />
          <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-emerald-200 bg-clip-text text-transparent">
            {t('heroTitleHighlight')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow font-medium">
          {t('heroSubtitle')}
        </p>

        {/* Feature Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200">
          <span className="flex items-center gap-1.5 bg-emerald-950/85 border border-emerald-700/60 px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-lime-400" /> {isHindi ? '100% जैविक व जैव-प्रमाणित' : '100% Bio-Certified'}
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-950/85 border border-emerald-700/60 px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-sm font-semibold">
            <Award className="w-4 h-4 text-lime-400" /> {isHindi ? 'ISO 9001:2015 एवं GMP प्रमाणित' : 'ISO 9001:2015 & GMP'}
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-950/85 border border-emerald-700/60 px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-sm font-semibold">
            <TrendingUp className="w-4 h-4 text-lime-400" /> {isHindi ? '25-35% तक अधिक पैदावार' : '25-35% Yield Boost'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl sm:max-w-none mx-auto">
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-black text-sm sm:text-base shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:translate-y-0 transition duration-200"
          >
            {t('exploreProductsBtn')} <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-emerald-400/40 hover:border-lime-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 group transition duration-200 shadow-xl"
          >
            <div className="w-7 h-7 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center group-hover:scale-110 transition flex-shrink-0">
              <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
            </div>
            <span>{t('watchVideoBtn')}</span>
          </button>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-600/70 text-lime-300 font-extrabold text-sm sm:text-base transition shadow-xl"
          >
            {t('instantQuote')}
          </button>
        </div>

        {/* Responsive Quick Stats Bar */}
        <div className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl border backdrop-blur-md transition text-center bg-emerald-950/70 border-emerald-800/60 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-lime-400">{stats.farmersHelped}</div>
            <div className="text-xs text-slate-200 mt-1 font-semibold">{t('statFarmers')}</div>
          </div>
          <div className="p-4 rounded-2xl border backdrop-blur-md transition text-center bg-emerald-950/70 border-emerald-800/60 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-lime-400">{stats.statesPresence}</div>
            <div className="text-xs text-slate-200 mt-1 font-semibold">{t('statStates')}</div>
          </div>
          <div className="p-4 rounded-2xl border backdrop-blur-md transition text-center bg-emerald-950/70 border-emerald-800/60 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-lime-400">{stats.productsDelivered}</div>
            <div className="text-xs text-slate-200 mt-1 font-semibold">{t('statFormulations')}</div>
          </div>
          <div className="p-4 rounded-2xl border backdrop-blur-md transition text-center bg-emerald-950/70 border-emerald-800/60 shadow-xl">
            <div className="text-2xl sm:text-3xl font-black text-lime-400">{stats.yieldImprovement}</div>
            <div className="text-xs text-slate-200 mt-1 font-semibold">{t('statExperience')}</div>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={heroVideo1}
        title={isHindi ? 'साईं एग्रो इंडस्ट्रीज - आधुनिक बायो-फर्टिलाइजर निर्माण प्लांट' : 'Sai Agro Industries - Automated Manufacturing & Biotech Production Facility'}
      />

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
}
