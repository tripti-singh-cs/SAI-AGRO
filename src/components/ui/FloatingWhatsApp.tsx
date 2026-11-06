'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [whatsappNumber, setWhatsappNumber] = useState('919876543210');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.setting && data.setting.whatsappNumber) {
          setWhatsappNumber(data.setting.whatsappNumber.replace(/\D/g, '') || '919876543210');
        }
      } catch (err) {
        console.error('Failed to load whatsapp number:', err);
      }
    }
    loadSettings();
  }, []);

  if (isAdmin) return null;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Sai Agro Industries! I am interested in your organic bio-fertilizers and crop solutions. Please provide product and dealership details.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        
        {/* Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with Agronomist on WhatsApp
        </span>
      </a>
    </div>
  );
}
