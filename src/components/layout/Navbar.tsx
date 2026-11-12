'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Sprout, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Phone, 
  Mail, 
  ShieldCheck, 
  Layers, 
  Calculator, 
  Sparkles, 
  Lock, 
  Sun, 
  Moon, 
  ArrowRight, 
  Globe, 
  MessageCircle, 
  FlaskConical, 
  Video, 
  BookOpen, 
  Building2, 
  PhoneCall, 
  Home, 
  Info, 
  Send 
} from 'lucide-react';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    phonePrimary: '+91 78560 57415',
    whatsappNumber: '7856057415',
  });
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  // Don't show public navbar inside admin panel
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, catRes] = await Promise.all([
          fetch('/api/settings', { cache: 'no-store' }),
          fetch('/api/categories', { cache: 'no-store' }),
        ]);
        const sData = await settingsRes.json();
        if (sData.success && sData.setting) {
          setSettings({
            phonePrimary: sData.setting.phonePrimary || '+91 78560 57415',
            whatsappNumber: sData.setting.whatsappNumber || '7856057415',
          });
        }
        const cData = await catRes.json();
        if (cData.success && Array.isArray(cData.categories) && cData.categories.length > 0) {
          setDbCategories(cData.categories);
        }
      } catch (err) {
        console.error('Navbar load error:', err);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (isAdmin) {
    return null;
  }

  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const fallbackProductCategories = [
    { 
      name: isHindi ? 'सभी उत्पाद कैटलॉग' : 'All Products Catalog', 
      href: '/products', 
      icon: Layers, 
      desc: isHindi ? 'संपूर्ण उच्च-उपज उत्पाद सूची' : 'Complete high-yield bio catalog',
      badge: 'All'
    },
    { 
      name: isHindi ? 'जैव उर्वरक (Bio-Fertilizers)' : 'Bio-Fertilizers & Inoculants', 
      href: '/products?category=Bio-Fertilizers', 
      icon: Sprout, 
      desc: isHindi ? 'नाइट्रोजन व फॉस्फोरस फिक्सर' : 'PSB, Azotobacter, Rhizobium',
      badge: 'N-P-K'
    },
    { 
      name: isHindi ? 'पौध वृद्धि नियामक (PGR)' : 'Plant Growth Promoters (PGR)', 
      href: '/products?category=Plant+Growth+Promoters', 
      icon: Sparkles, 
      desc: isHindi ? 'सीवीड अर्क, अमीनो व ह्यूमिक' : 'Seaweed & L-Amino Stimulants',
      badge: 'Boost'
    },
    { 
      name: isHindi ? 'चिलेटेड सूक्ष्म पोषक तत्व' : 'Chelated Micronutrients', 
      href: '/products?category=Micronutrients', 
      icon: ShieldCheck, 
      desc: isHindi ? '100% EDTA जिंक, बोरॉन व मिक्स' : '100% EDTA Zinc, Boron, Calcium',
      badge: 'EDTA'
    },
    { 
      name: isHindi ? 'जैव कवकनाशी (Bio-Fungicides)' : 'Bio-Fungicides & Eco-Defense', 
      href: '/products?category=Bio-Fungicides', 
      icon: ShieldCheck, 
      desc: isHindi ? 'ट्राइकोडर्मा व स्यूडोमोनास' : 'Trichoderma & Eco-Shields',
      badge: 'Bio-Safe'
    },
    { 
      name: isHindi ? 'जैविक मृदा सुधारक' : 'Organic Soil Conditioners', 
      href: '/products?category=Soil+Conditioners', 
      icon: Layers, 
      desc: isHindi ? 'पोटैशियम ह्यूमेट व माइकोराइजा' : 'Potassium Humate & VAM Granules',
      badge: 'Organic'
    },
  ];

  const productCategories = dbCategories.length > 0
    ? [
        { 
          name: isHindi ? 'सभी उत्पाद कैटलॉग' : 'All Products Catalog', 
          href: '/products', 
          icon: Layers, 
          desc: isHindi ? 'संपूर्ण उच्च-उपज उत्पाद सूची' : 'Complete high-yield bio catalog',
          badge: 'All'
        },
        ...dbCategories.map((c, i) => {
          let IconComp = Sprout;
          if (c.iconName === 'Sparkles') IconComp = Sparkles;
          else if (c.iconName === 'ShieldCheck') IconComp = ShieldCheck;
          else if (c.iconName === 'Layers') IconComp = Layers;
          else if (c.iconName === 'Calculator') IconComp = Calculator;

          const badges = ['Bio', 'Boost', 'EDTA', 'Safe', 'Eco', 'Active'];
          return {
            name: c.name,
            href: `/products?category=${encodeURIComponent(c.name)}`,
            icon: IconComp,
            desc: c.description || (isHindi ? 'प्रमाणित कृषि उत्पाद' : 'Certified bio formulation'),
            badge: badges[i % badges.length],
          };
        })
      ]
    : fallbackProductCategories;

  const desktopNavLinks = [
    { name: t('navHome', 'Home'), href: '/' },
    { name: t('navAbout', 'About Us'), href: '/about' },
    { name: t('navSolutions', 'Crop Solutions'), href: '/solutions' },
    { name: t('dosageCalcShort', 'Dosage Calculator'), href: '/calculator' },
    { name: t('navRnd', 'R&D & Quality'), href: '/rnd' },
    { name: t('navMedia', 'Media & Videos'), href: '/media' },
    { name: t('navBlog', 'Farming Hub'), href: '/blog' },
    { name: t('navDealers', 'Distributors'), href: '/dealers' },
    { name: t('navContact', 'Contact'), href: '/contact' },
  ];

  const mobileNavLinks = [
    { name: t('navHome', 'Home'), href: '/', icon: Home },
    { name: t('navAbout', 'About Us'), href: '/about', icon: Info },
    { name: t('navProducts', 'Products & Bio-Inputs'), href: '/products', icon: Layers },
    { name: t('navSolutions', 'Crop Solutions'), href: '/solutions', icon: Sprout },
    { name: t('dosageCalcShort', 'Dosage Calculator'), href: '/calculator', icon: Calculator },
    { name: t('navRnd', 'R&D & Quality'), href: '/rnd', icon: FlaskConical },
    { name: t('navMedia', 'Media & Videos'), href: '/media', icon: Video },
    { name: t('navBlog', 'Farming Knowledge Hub'), href: '/blog', icon: BookOpen },
    { name: t('navDealers', 'Pan-India Distributors'), href: '/dealers', icon: Building2 },
    { name: t('navContact', 'Contact Us'), href: '/contact', icon: PhoneCall },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Main Desktop & Tablet Header Bar (100% SOLID Non-Transparent Background Theme) */}
        <nav className={`transition-all duration-300 border-b ${
          isScrolled 
            ? isLight
              ? 'bg-white shadow-xl py-2.5 border-emerald-200'
              : 'bg-[#06150b] shadow-2xl py-2.5 border-emerald-800/80' 
            : isLight
              ? 'bg-white py-3 border-emerald-100 shadow-md shadow-emerald-950/5'
              : 'bg-[#06150b] py-3 border-emerald-900 shadow-lg shadow-black/70'
        }`}>
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Official Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink min-w-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden bg-white p-0.5 border-2 border-emerald-500/80 shadow-md group-hover:scale-105 group-hover:border-lime-400 transition-all duration-300 flex-shrink-0">
                <Image 
                  src="/images/logo.png" 
                  alt="SAI AGRO INDUSTRIES Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-black text-xs xs:text-sm sm:text-base lg:text-lg tracking-tight leading-none truncate flex items-center gap-1 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  SAI AGRO <span className="text-lime-600 dark:text-lime-400 font-black text-[10px] xs:text-xs sm:text-sm">INDUSTRIES</span>
                </span>
                <span className={`text-[8px] sm:text-[10px] tracking-wider font-extrabold uppercase mt-0.5 truncate ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  {isHindi ? 'बायोटेक एवं फसल पोषण' : 'Bio-Tech & Crop Nutrition'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Row (All Pages Visible Directly on Desktop screens >= 1200px) */}
            <div className="hidden xl:flex items-center gap-1 flex-wrap justify-center">
              <Link
                href="/"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navHome')}
              </Link>

              <Link
                href="/about"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/about' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navAbout')}
              </Link>

              {/* Products Mega Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    pathname.startsWith('/products') 
                      ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                      : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                  }`}
                >
                  <span>{t('navProducts')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-emerald-500 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProductsDropdownOpen && (
                  <div className={`absolute top-full left-0 w-88 mt-1 p-2 rounded-3xl shadow-2xl border transition-all animate-fadeIn z-50 ${
                    isLight 
                      ? 'bg-white border-emerald-200 shadow-emerald-900/15' 
                      : 'bg-[#07190e] border-emerald-500/30 shadow-black/90'
                  }`}>
                    <div className="p-2 border-b border-emerald-500/10 mb-1 flex items-center justify-between">
                      <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {isHindi ? 'बायो-इनपुट श्रेणियां' : 'Bio-Input Categories'}
                      </span>
                      <Link 
                        href="/products" 
                        onClick={() => setIsProductsDropdownOpen(false)}
                        className="text-[11px] font-black text-lime-600 dark:text-lime-400 hover:underline"
                      >
                        {isHindi ? 'सभी देखें' : 'View All'} &rarr;
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {productCategories.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsProductsDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-2xl transition group ${
                            isLight ? 'hover:bg-emerald-50' : 'hover:bg-emerald-900/40'
                          }`}
                        >
                          <div className={`p-1.5 rounded-xl transition-all ${
                            isLight 
                              ? 'bg-emerald-100 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white' 
                              : 'bg-emerald-950 text-lime-400 group-hover:bg-lime-400 group-hover:text-emerald-950'
                          }`}>
                            <item.icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-black truncate ${
                                isLight ? 'text-slate-800 group-hover:text-emerald-700' : 'text-white group-hover:text-lime-300'
                              }`}>
                                {item.name}
                              </span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${
                                isLight
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-emerald-950/90 text-lime-300 border-emerald-700'
                              }`}>
                                {item.badge}
                              </span>
                            </div>
                            <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/solutions"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/solutions' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navSolutions')}
              </Link>

              <Link
                href="/calculator"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                  pathname === '/calculator' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                <Calculator className="w-3 h-3 text-emerald-500" />
                <span>{isHindi ? 'खुराक कैलकुलेटर' : 'Calculator'}</span>
              </Link>

              <Link
                href="/rnd"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/rnd' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navRnd')}
              </Link>

              <Link
                href="/media"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/media' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navMedia')}
              </Link>

              <Link
                href="/blog"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/blog' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navBlog')}
              </Link>

              <Link
                href="/dealers"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/dealers' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navDealers')}
              </Link>

              <Link
                href="/contact"
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  pathname === '/contact' 
                    ? isLight ? 'text-emerald-800 bg-emerald-100 shadow-sm' : 'text-lime-400 bg-emerald-950/90 shadow-inner' 
                    : isLight ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50' : 'text-slate-200 hover:text-white hover:bg-emerald-950/50'
                }`}
              >
                {t('navContact')}
              </Link>
            </div>

            {/* Desktop Right Action Bar */}
            <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
              {/* Language Switcher Pill */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className={`px-3 py-1.5 rounded-xl border font-black text-xs flex items-center gap-1.5 transition-all duration-300 shadow-sm ${
                  isLight 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                    : 'bg-emerald-950/90 border-emerald-800 text-lime-300 hover:bg-emerald-900'
                }`}
                title="Change language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isHindi ? '🇬🇧 English' : '🇮🇳 हिन्दी'}</span>
              </button>

              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-sm ${
                  isLight 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                    : 'bg-emerald-950/90 border-emerald-800 text-lime-300 hover:bg-emerald-900'
                }`}
                title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {isLight ? <Moon className="w-4 h-4 text-emerald-800" /> : <Sun className="w-4 h-4 text-amber-300" />}
              </button>

              {/* Instant Quote CTA */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
              >
                <span>{t('requestQuote')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile / Tablet Compact Header Controls (Shown ONLY on screens < 1200px) */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 xl:hidden">
              {/* Language Switcher Mobile */}
              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border text-[11px] font-black flex items-center gap-1 shadow-sm transition ${
                  isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100' : 'bg-emerald-950 border-emerald-800 text-lime-300 hover:bg-emerald-900'
                }`}
                title="भाषा बदलें / Change Language"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
              </button>

              {/* Theme Toggle Mobile (Visible on tablets, in drawer for small phones) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-1.5 rounded-xl border shadow-sm hidden sm:flex items-center justify-center transition ${
                  isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-800 text-lime-300'
                }`}
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
              </button>

              {/* Quote CTA Mobile (Visible on tablets, in drawer for small phones) */}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-slate-950 font-black text-xs shadow-md"
              >
                {isHindi ? 'कोटेशन' : 'Quote'}
              </button>

              {/* Hamburger Menu Button (Fixed size, flex-shrink-0, perfectly responsive) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all shadow-md flex-shrink-0 ${
                  isOpen
                    ? 'bg-lime-500 border-lime-400 text-slate-950 ring-2 ring-lime-400/50'
                    : isLight 
                      ? 'bg-emerald-50 border-emerald-200 text-slate-800 hover:bg-emerald-100' 
                      : 'bg-emerald-950 border-emerald-800 text-slate-200 hover:bg-emerald-900'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isOpen ? <X className="w-5 h-5 font-black" /> : <Menu className="w-5 h-5 font-black" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Modern Slide-in Mobile Drawer (SOLID NON-TRANSPARENT BACKGROUND) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          
          {/* Dark Blurred Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Solid Drawer Panel (100% Solid Non-Transparent Background, Responsive Width) */}
          <aside className={`fixed inset-y-0 right-0 w-[85vw] max-w-sm shadow-2xl z-50 flex flex-col justify-between overflow-hidden transition-transform duration-300 ${
            isLight ? 'bg-white text-slate-900 border-l border-emerald-200' : 'bg-[#06150b] text-white border-l border-emerald-800/80'
          }`}>
            
            {/* Drawer Top Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 border border-emerald-500">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm leading-tight">SAI AGRO</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {isHindi ? 'मेनू एवं नेविगेशन' : 'Menu Navigation'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl border transition ${
                  isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-emerald-950 border-emerald-800 text-slate-300 hover:text-white'
                }`}
                aria-label="Close menu"
              >
                <X className="w-5 h-5 font-black" />
              </button>
            </div>

            {/* Scrollable Navigation Body (Solid non-transparent background) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Language & Theme Controls Card */}
              <div className={`p-3 rounded-2xl border space-y-2.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a2012] border-emerald-900'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black flex items-center gap-1.5 text-emerald-700 dark:text-lime-400">
                    <Globe className="w-3.5 h-3.5" /> {isHindi ? 'भाषा' : 'Language'}:
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { if (isHindi) toggleLanguage(); }}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                        !isHindi 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : isLight ? 'bg-white text-slate-700' : 'bg-[#040e07] text-slate-400'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { if (!isHindi) toggleLanguage(); }}
                      className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                        isHindi 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : isLight ? 'bg-white text-slate-700' : 'bg-[#040e07] text-slate-400'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-500/10">
                  <span className="text-xs font-black text-slate-600 dark:text-slate-300">
                    {isLight ? 'Light Mode' : 'Dark Mode'}:
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 border ${
                      isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#040e07] border-emerald-900 text-lime-300'
                    }`}
                  >
                    {isLight ? <Moon className="w-3.5 h-3.5 text-emerald-800" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{isLight ? 'Switch Dark' : 'Switch Light'}</span>
                  </button>
                </div>
              </div>

              {/* Main Navigation Links */}
              <div className="space-y-1">
                {mobileNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition ${
                        isActive
                          ? isLight ? 'bg-emerald-700 text-white shadow-md' : 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 font-black shadow-md'
                          : isLight ? 'hover:bg-emerald-50 text-slate-800' : 'hover:bg-emerald-950/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <link.icon className={`w-4 h-4 ${isActive ? 'text-inherit' : 'text-emerald-500'}`} />
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  );
                })}
              </div>

              {/* Product Categories Quick Grid */}
              <div className="pt-2">
                <div className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 px-2 py-1">
                  {isHindi ? 'बायो-इनपुट श्रेणियां' : 'Product Categories'}
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {productCategories.slice(1).map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className={`p-2 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800' 
                          : 'bg-[#0a2012] border-emerald-900 text-slate-300 hover:bg-emerald-900 hover:text-lime-300'
                      }`}
                    >
                      <cat.icon className="w-3.5 h-3.5 flex-shrink-0 text-emerald-500" />
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Bottom Actions & Helpline */}
            <div className={`p-4 border-t space-y-2.5 ${
              isLight ? 'bg-slate-50 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
            }`}>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs transition shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" /> {isHindi ? 'कॉल करें' : 'Helpline'}
                </a>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Hello%20Sai%20Agro,%20I%20want%20information%20about%20your%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs transition shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" /> {t('instantQuote')}
              </button>

              <div className="text-center pt-1">
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-lime-400 transition font-bold"
                >
                  <Lock className="w-3.5 h-3.5" /> {t('adminPortal')}
                </Link>
              </div>
            </div>

          </aside>
        </div>
      )}

      {/* Quick Quote Modal */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
