'use client';

import React, { useState, useEffect } from 'react';
import { Play, Video, ShieldCheck } from 'lucide-react';
import VideoPlayerModal from '@/components/ui/VideoPlayerModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function VideoShowcaseSection() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const [dbVideos, setDbVideos] = useState<any[]>([]);
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch('/api/media?type=video', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && Array.isArray(data.media) && data.media.length > 0) {
          setDbVideos(data.media);
        }
      } catch (err) {
        console.error('Failed to load videos:', err);
      }
    }
    loadVideos();
  }, []);

  const fallbackVideos = [
    {
      title: isHindi 
        ? 'साईं एग्रो अत्याधुनिक बायो-फर्टिलाइजर निर्माण एवं स्वचालित प्लांट टूर' 
        : 'Sai Agro High-Tech Bio-Formulation & Automated Plant Tour',
      videoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
      tag: isHindi ? 'फैक्ट्री इन्फ्रास्ट्रक्चर' : 'Factory Tour',
      desc: isHindi 
        ? 'हमारे अत्याधुनिक विनिर्माण संयंत्र, कंप्यूटर-नियंत्रित माइक्रोबियल रिएक्टरों, क्लीनरूम और स्वचालित पैकेजिंग लाइनों का दृश्य।' 
        : 'Tour our state-of-the-art manufacturing facility, computer-controlled microbial reactors, cleanrooms, and high-speed automated packaging lines.',
    },
    {
      title: isHindi 
        ? 'किसानों के खेतों पर वास्तविक परिणाम एवं बंपर पैदावार प्रदर्शन' 
        : 'High-Yield Field Demonstration & Farmer Trial Results',
      videoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
      tag: isHindi ? 'खेत प्रदर्शन' : 'Field Demonstration',
      desc: isHindi 
        ? 'किसानों के खेतों पर किए गए सफल परीक्षण, जिसमें साईं एग्रो बायो-फर्टिलाइजर के प्रयोग से 30%+ अधिक जड़ फैलाव और चमकदार दाने देखे गए।' 
        : 'Witness real on-ground trials comparing untreated crops against Sai Agro bio-fertilizer treated plots, showing +32% dense root systems and enhanced grain filling.',
    },
  ];

  const videoList = dbVideos.length > 0
    ? dbVideos.slice(0, 4).map((m) => ({
        title: m.title,
        videoUrl: m.url,
        tag: m.category || (isHindi ? 'खेत प्रदर्शन' : 'Field Demonstration'),
        desc: m.description || (isHindi ? 'साईं एग्रो जैविक उत्पाद परीक्षण एवं परिणाम।' : 'Sai Agro organic product field trials and high yield showcase.'),
      }))
    : fallbackVideos;

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative overflow-hidden ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Video className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'वीडियो टूर एवं खेत परिणाम' : 'Direct Video Showcase'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('videoTitle')}
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('videoSubtitle')}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videoList.map((vid, idx) => (
            <div
              key={idx}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 border shadow-xl ${
                isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              {/* Video Thumbnail Preview / Player */}
              <div className="relative aspect-video bg-black overflow-hidden group">
                <video
                  src={vid.videoUrl}
                  muted
                  playsInline
                  loop
                  autoPlay
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}
                    className="w-16 h-16 rounded-full bg-lime-400 hover:bg-lime-300 text-slate-950 flex items-center justify-center shadow-2xl shadow-lime-400/50 group-hover:scale-110 transition-transform active:scale-95"
                    aria-label="Play video"
                  >
                    <Play className="w-7 h-7 fill-slate-950 ml-1" />
                  </button>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-950/90 text-lime-300 border border-emerald-700 backdrop-blur-md">
                    {vid.tag}
                  </span>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className={`text-lg sm:text-xl font-black transition tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {vid.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {vid.desc}
                </p>

                <div className={`pt-4 border-t flex items-center justify-between ${
                  isLight ? 'border-emerald-100' : 'border-emerald-900/60'
                }`}>
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${
                    isLight ? 'text-emerald-800' : 'text-emerald-400'
                  }`}>
                    <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-lime-400'}`} /> 
                    <span>{isHindi ? 'प्रमाणित साईं एग्रो मीडिया' : 'Verified Sai Agro Media'}</span>
                  </span>
                  
                  <button
                    onClick={() => setSelectedVideo({ url: vid.videoUrl, title: vid.title })}
                    className={`text-xs font-black flex items-center gap-1 transition ${
                      isLight ? 'text-emerald-700 hover:text-emerald-900' : 'text-lime-400 hover:text-white'
                    }`}
                  >
                    <span>{isHindi ? 'पूरा वीडियो चलाएं' : 'Play Full Video'}</span>
                    <Play className={`w-3.5 h-3.5 ${isLight ? 'fill-emerald-700' : 'fill-lime-400'}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </section>
  );
}
