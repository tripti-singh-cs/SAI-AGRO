'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Sprout, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  
  const isLight = theme === 'light';
  const isHindi = language === 'hi';
  const isAdmin = pathname?.startsWith('/admin');

  const [settings, setSettings] = useState({
    companyName: 'SAI AGRO INDUSTRIES',
    phonePrimary: '+91 78560 57415',
    emailPrimary: 'triptisinghh897@gmail.com',
    registeredAddress: 'Bela Industrial Area, Phase II, Agro Complex, India',
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.setting) {
          setSettings({
            companyName: data.setting.companyName || 'SAI AGRO INDUSTRIES',
            phonePrimary: data.setting.phonePrimary || '+91 78560 57415',
            emailPrimary: data.setting.emailPrimary || 'triptisinghh897@gmail.com',
            registeredAddress: data.setting.registeredAddress || 'Bela Industrial Area, Phase II, Agro Complex, India',
          });
        }
      } catch (err) {
        console.error('Failed to load settings in footer:', err);
      }
    }
    fetchSettings();
  }, []);

  if (isAdmin) {
    return null;
  }

  return (
    <footer className={`border-t transition-colors duration-300 relative overflow-hidden ${
      isLight ? 'bg-[#062111] text-slate-200 border-emerald-900' : 'bg-[#030d06] text-slate-300 border-emerald-950/90'
    }`}>
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Official Logo, Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-emerald-500/70 shadow-lg group-hover:scale-105 group-hover:border-lime-400 transition-transform duration-300">
                <Image 
                  src="/images/logo.png" 
                  alt="SAI AGRO INDUSTRIES Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
                  SAI AGRO <span className="text-lime-400 font-extrabold">INDUSTRIES</span>
                </span>
                <span className="text-xs text-emerald-400 tracking-wider font-bold uppercase">
                  {isHindi ? 'सतत कृषि एवं जैव-प्रौद्योगिकी समाधान' : 'Sustainable Agro-Biotech Solutions'}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-4">
              {t('footerAbout')}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 shadow-sm">
                <Award className="w-3.5 h-3.5 text-lime-400" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" /> GMP Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 shadow-sm">
                <Sprout className="w-3.5 h-3.5 text-lime-400" /> 100% Bio Active
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-lime-400 pl-2.5">
              {t('quickLinks')}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link href="/rnd" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('navRnd')}
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('navSolutions')}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('navMedia')}
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('navDealers')}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {t('dosageCalcShort')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-lime-400 pl-2.5">
              {isHindi ? 'उत्पाद श्रेणियां' : 'Bio-Formulations'}
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/products?category=Bio-Fertilizers" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {isHindi ? 'जैव उर्वरक (PSB / Azoto)' : 'Bio-Fertilizers (PSB / Azoto)'}
                </Link>
              </li>
              <li>
                <Link href="/products?category=Plant+Growth+Promoters" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {isHindi ? 'पौध वृद्धि नियामक (PGR)' : 'Plant Growth Regulators'}
                </Link>
              </li>
              <li>
                <Link href="/products?category=Micronutrients" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {isHindi ? 'चिलेटेड सूक्ष्म पोषक तत्व' : 'Chelated Micronutrients'}
                </Link>
              </li>
              <li>
                <Link href="/products?category=Bio-Fungicides" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {isHindi ? 'जैव कवकनाशी (Trichoderma)' : 'Bio-Fungicides (Trichoderma)'}
                </Link>
              </li>
              <li>
                <Link href="/products?category=Soil+Conditioners" className="hover:text-lime-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> {isHindi ? 'पोटैशियम ह्यूमेट व सॉइल कंडीशनर' : 'Potassium Humate Flakes'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider border-l-2 border-lime-400 pl-2.5">
              {t('headOffice')}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {settings.registeredAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <a href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-white transition font-medium">
                  {settings.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <a href={`mailto:${settings.emailPrimary}`} className="text-slate-300 hover:text-white transition">
                  {settings.emailPrimary}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-slate-950 font-extrabold text-xs hover:from-emerald-500 hover:to-lime-400 transition shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" /> {isHindi ? 'सीधा संपर्क करें' : 'Send Direct Inquiry'}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <span className="text-white font-bold">SAI AGRO INDUSTRIES</span>. {t('allRightsReserved')}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-lime-400 transition">{t('navAbout')}</Link>
            <Link href="/dealers" className="hover:text-lime-400 transition">{t('navDealers')}</Link>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-slate-300 hover:text-lime-300 hover:border-lime-500/50 transition font-bold"
              title="Authorized Administration Access"
            >
              <Lock className="w-3 h-3 text-lime-400" />
              <span>{t('adminPortal')}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
