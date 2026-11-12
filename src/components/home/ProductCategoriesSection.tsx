'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductCategoriesSection() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';
  const [dbCategories, setDbCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          setDbCategories(data.categories);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    loadCategories();
  }, []);

  const fallbackCategories = [
    {
      title: isHindi ? 'जैव उर्वरक एवं जीवाणु टीका' : 'Bio-Fertilizers & Inoculants',
      desc: isHindi 
        ? 'उच्च शक्ति वाले पीएसबी और एजोटोबैक्टर जो मिट्टी में जमे फास्फोरस को घोलते हैं और प्राकृतिक नाइट्रोजन प्रदान करते हैं।' 
        : 'High-potency PSB & Azotobacter microbial cultures that solubilize fixed soil phosphorus and fix atmospheric nitrogen naturally.',
      icon: Sprout,
      href: '/products?category=Bio-Fertilizers',
      color: 'from-emerald-500 to-green-600',
      count: isHindi ? '6 उत्पाद' : '6 Formulations',
      tag: 'Bio-Active'
    },
    {
      title: isHindi ? 'पौध वृद्धि नियामक (PGR)' : 'Plant Growth Regulators (PGR)',
      desc: isHindi 
        ? 'कोल्ड-वाटर समुद्री शैवाल अर्क और मुक्त एल-अमीनो एसिड से भरपूर जो फूलों को झड़ने से रोकते हैं और फलों का आकार बढ़ाते हैं।' 
        : 'Enriched with cold-water Ascophyllum Nodosum seaweed extract and free L-amino acids to prevent flower dropping and maximize fruit set.',
      icon: TrendingUp,
      href: '/products?category=Plant+Growth+Promoters',
      color: 'from-lime-500 to-emerald-600',
      count: isHindi ? '5 उत्पाद' : '5 Formulations',
      tag: 'High Growth'
    },
    {
      title: isHindi ? 'चिलेटेड सूक्ष्म पोषक तत्व' : 'Chelated Micronutrients',
      desc: isHindi 
        ? '100% जल-घुलनशील EDTA जिंक, बोरॉन, कैल्शियम और मल्टी-माइक्रोन्यूट्रिएंट जो तुरंत अवशोषित होकर फसलों में चमक लाते हैं।' 
        : '100% water-soluble EDTA Zinc, Calcium, Boron, and Multi-Micronutrient formulas for instant stomatal absorption and disease immunity.',
      icon: Zap,
      href: '/products?category=Micronutrients',
      color: 'from-amber-500 to-yellow-600',
      count: isHindi ? '4 उत्पाद' : '4 Formulations',
      tag: '100% EDTA'
    },
    {
      title: isHindi ? 'जैव कवकनाशी एवं पौध रक्षा' : 'Bio-Fungicides & Eco-Defense',
      desc: isHindi 
        ? 'ट्राइकोडर्मा विरिडी और स्यूडोमोनास जो उकठा (विल्ट), जड़ सड़न और फफूंद जनित रोगों को जैविक रूप से नियंत्रित करते हैं।' 
        : 'Biological antagonists including Trichoderma viride and Pseudomonas that combat Fusarium wilt, root rot, and foliar blights safely.',
      icon: ShieldCheck,
      href: '/products?category=Bio-Fungicides',
      color: 'from-teal-500 to-emerald-700',
      count: isHindi ? '4 उत्पाद' : '4 Formulations',
      tag: 'Eco Shield'
    },
    {
      title: isHindi ? 'जैविक मृदा सुधारक एवं ह्यूमिक' : 'Soil Conditioners & Humic Flakes',
      desc: isHindi 
        ? '98% पोटैशियम ह्यूमेट चमकदार दाने और फुल्विक एसिड जो कठोर खारी मिट्टी को भुरभुरा बनाकर जड़ों का तेजी से जाल फैलाते हैं।' 
        : '98% Potassium Humate and active Fulvic Acid that condition hard saline soils, enhance CEC, and accelerate fibrous root growth.',
      icon: Layers,
      href: '/products?category=Soil+Conditioners',
      color: 'from-amber-600 to-orange-700',
      count: isHindi ? '3 उत्पाद' : '3 Formulations',
      tag: 'Soil Vitalizer'
    },
    {
      title: isHindi ? 'माइकोराइजा बायो-ग्रेन्युल्स' : 'VAM Mycorrhizal Bio-Granules',
      desc: isHindi 
        ? 'एंडो-माइकोराइजा दानेदार टीका जो पौधों की जड़ों के क्षेत्र को 100 गुना बढ़ाकर नमी और फास्फोरस को गहराई से खींचते हैं।' 
        : 'Endo-mycorrhiza encapsulated granules extending plant root foraging area up to 100x into deeper moisture layers.',
      icon: Sparkles,
      href: '/products?category=Specialty+Bio-Granules',
      color: 'from-green-500 to-lime-600',
      count: isHindi ? '3 उत्पाद' : '3 Formulations',
      tag: 'Root Booster'
    },
  ];

  const iconList = [Sprout, TrendingUp, Zap, ShieldCheck, Layers, Sparkles];
  const colorList = [
    'from-emerald-500 to-green-600',
    'from-lime-500 to-emerald-600',
    'from-amber-500 to-yellow-600',
    'from-teal-500 to-emerald-700',
    'from-amber-600 to-orange-700',
    'from-green-500 to-lime-600',
  ];
  const tagList = ['Bio-Active', 'High Growth', '100% EDTA', 'Eco Shield', 'Soil Vitalizer', 'Root Booster'];

  const categories = dbCategories.length > 0
    ? dbCategories.map((c, i) => {
        let IconComp = iconList[i % iconList.length];
        if (c.iconName === 'TrendingUp') IconComp = TrendingUp;
        else if (c.iconName === 'Zap') IconComp = Zap;
        else if (c.iconName === 'ShieldCheck') IconComp = ShieldCheck;
        else if (c.iconName === 'Layers') IconComp = Layers;
        else if (c.iconName === 'Sparkles') IconComp = Sparkles;
        else if (c.iconName === 'Sprout') IconComp = Sprout;

        return {
          title: c.name,
          desc: c.description || (isHindi ? 'उच्च गुणवत्ता वाला प्रमाणित जैविक कृषि उत्पाद।' : 'High potency scientifically engineered agricultural input.'),
          icon: IconComp,
          href: `/products?category=${encodeURIComponent(c.name)}`,
          color: colorList[i % colorList.length],
          count: `${c.itemCount || 0} ${isHindi ? 'उत्पाद' : 'Formulations'}`,
          tag: tagList[i % tagList.length],
        };
      })
    : fallbackCategories;

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f0f7f2]' : 'bg-[#07130b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border ${
            isLight 
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
              : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            {isHindi ? 'वैज्ञानिक रूप से प्रमाणित उत्पाद पोर्टफोलियो' : 'Comprehensive Agro-Biotech Portfolio'}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mt-3 tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('categoriesHeading')}
          </h2>
          <p className={`text-sm sm:text-base mt-3 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('categoriesSubheading')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                isLight 
                  ? 'bg-white border-emerald-100/80 hover:border-emerald-400' 
                  : 'bg-[#0b1f13] border-emerald-800/50 hover:border-lime-400/60'
              }`}
            >
              {/* Top Icon & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-slate-950 shadow-md group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg border ${
                    isLight
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-emerald-950/90 text-lime-300 border-emerald-700'
                  }`}>
                    {cat.tag}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    isLight 
                      ? 'bg-slate-100 text-slate-700 border-slate-200' 
                      : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                  }`}>
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2 flex-grow">
                <h3 className={`text-lg sm:text-xl font-black transition tracking-tight ${
                  isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-lime-300'
                }`}>
                  {cat.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {cat.desc}
                </p>
              </div>

              {/* Link CTA */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-extrabold transition ${
                isLight 
                  ? 'border-emerald-100 text-emerald-700 group-hover:text-emerald-900' 
                  : 'border-emerald-900/60 text-lime-400 group-hover:text-white'
              }`}>
                <span>{isHindi ? 'उत्पाद विवरण देखें' : 'View Formulations'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm transition shadow-lg bg-emerald-700 hover:bg-emerald-600 text-white transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{isHindi ? 'संपूर्ण उत्पाद कैटलॉग ब्राउज़ करें' : 'Browse Full Product Catalog'}</span>
            <ArrowRight className="w-4 h-4 text-lime-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
