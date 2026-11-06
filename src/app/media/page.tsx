'use client';

import React, { useState, useEffect } from 'react';
import { Play, Video, Image as ImageIcon, Sparkles, X, ShieldCheck } from 'lucide-react';
import VideoPlayerModal from '@/components/ui/VideoPlayerModal';

interface MediaItem {
  _id: string;
  title: string;
  type: 'video' | 'image';
  url: string;
  thumbnailUrl?: string;
  category: string;
  description?: string;
}

export default function MediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'image'>('all');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('/api/media', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.media) {
          setMediaList(data.media);
        }
      } catch (err) {
        console.error('Failed to load media:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  const filteredMedia = mediaList.filter((m) => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-lime-400 text-xs font-bold border border-emerald-800 mb-4">
            <Video className="w-3.5 h-3.5" /> Media Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Videos, Field Demos & Factory Tour
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Watch our automated plant operations, farmer field trial demonstrations, and research facility.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
              filterType === 'all'
                ? 'bg-lime-400 text-slate-950 shadow-md'
                : 'bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition ${
              filterType === 'video'
                ? 'bg-lime-400 text-slate-950 shadow-md'
                : 'bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Videos Only
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition ${
              filterType === 'image'
                ? 'bg-lime-400 text-slate-950 shadow-md'
                : 'bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Photos
          </button>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Loading media gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item) => (
              <div
                key={item._id}
                className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 group hover:border-lime-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Preview Area */}
                <div className="relative aspect-video bg-black overflow-hidden group">
                  {item.type === 'video' ? (
                    <>
                      <video
                        src={item.url}
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={() => setActiveVideo({ url: item.url, title: item.title })}
                          className="w-14 h-14 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition"
                        >
                          <Play className="w-6 h-6 fill-slate-950 ml-1" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      onClick={() => setActiveImage(item.url)}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-lime-300 border border-emerald-700 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoPlayerModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
        />
      )}

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-emerald-950 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={activeImage} alt="Preview" className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
