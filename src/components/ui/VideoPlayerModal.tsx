'use client';

import React from 'react';
import { X } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoPlayerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl glass-panel p-4 sm:p-6 border border-emerald-500/30 shadow-2xl overflow-hidden">
        {/* Header with Title and Close */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-emerald-950/80">
          <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
            {title || 'Sai Agro Industries Media Showcase'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-950 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
    </div>
  );
}
