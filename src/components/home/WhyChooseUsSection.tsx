'use client';

import React from 'react';
import { 
  Microscope, 
  ShieldCheck, 
  TrendingUp, 
  Leaf, 
  DollarSign, 
  Truck,
  Award,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyChooseUsSection() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const features = [
    {
      icon: Microscope,
      title: isHindi ? 'उन्नत माइक्रोबियल जैव-प्रौद्योगिकी' : 'Advanced Microbial Biotechnology',
      desc: isHindi 
        ? 'विशिष्ट जीवाणु और फंगल स्ट्रेन जिन्हें उच्चतम सीएफयू और लंबी शेल्फ-लाइफ के लिए रोगाणुरहित नियंत्रित वातावरण में तैयार किया जाता है।' 
        : 'Proprietary bacterial and fungal isolates cultured under stringent sterile fermentation conditions for maximum CFU viability and longevity.',
    },
    {
      icon: Leaf,
      title: isHindi ? '100% पर्यावरण-अनुकूल एवं रसायन-मुक्त' : '100% Eco-Friendly & Residue-Free',
      desc: isHindi 
        ? 'जैविक मानकों के पूर्णतः अनुरूप, जो मिट्टी के प्राकृतिक सूक्ष्मजीवों और केंचुओं के अनुकूल वातावरण का निर्माण करते हैं।' 
        : 'Fully compliant with national and international organic standards, preserving soil microbiome and earthworm ecology.',
    },
    {
      icon: TrendingUp,
      title: isHindi ? '25-35% तक प्रमाणित अधिक पैदावार' : 'Proven 25-35% Yield Boost',
      desc: isHindi 
        ? 'खेतों के वास्तविक परीक्षणों में अधिक कल्ले, सफेद जड़ों का गहरा जाल और भारी चमकदार दाने प्रमाणित हैं।' 
        : 'Multi-season field trial data proving higher tiller counts, dense root networks, and higher test grain weights across major crops.',
    },
    {
      icon: ShieldCheck,
      title: isHindi ? 'पोषक तत्वों का 100% अवशोषण' : 'Zero Chemical Nutrient Lockup',
      desc: isHindi 
        ? 'चिलेटेड तकनीक मिट्टी में मौजूद कैल्शियम और कार्बोनेट से तत्वों को बंधने से रोकती है, जिससे पौधों को तुरंत भोजन मिलता है।' 
        : 'Chelated formulation technology prevents trace elements from reacting with soil carbonates, guaranteeing direct root absorption.',
    },
    {
      icon: DollarSign,
      title: isHindi ? 'रासायनिक खाद लागत में 30% तक की बचत' : 'Saves 30% Synthetic Fertilizer Cost',
      desc: isHindi 
        ? 'जैविक नाइट्रोजन स्थिरीकरण और फास्फोरस घुलनशीलता द्वारा महंगे रासायनिक यूरिया और डीएपी की जरूरत को काफी कम करता है।' 
        : 'Significantly reduces dependency on expensive synthetic chemical urea and DAP through biological nitrogen fixation and phosphorus solubilization.',
    },
    {
      icon: Truck,
      title: isHindi ? 'अखिल भारतीय त्वरित वितरण नेटवर्क' : 'Pan-India Distribution Network',
      desc: isHindi 
        ? '18+ राज्यों में अधिकृत डीलर नेटवर्क, त्वरित डिलीवरी और खेतों में ऑन-ग्राउंड कृषि वैज्ञानिकों का मुफ्त परामर्श सहयोग।' 
        : 'Rapid order delivery, local authorized dealer stockists, and on-ground agronomist field support across 18+ agricultural states.',
    },
  ];

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative overflow-hidden ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Award className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'वैज्ञानिक उत्कृष्टता' : 'Scientific Excellence'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('whyTitle')}
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('whySubtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              <div className="space-y-4">
                <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border shadow-md transition-colors ${
                  isLight 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                    : 'bg-emerald-950 text-lime-400 border-emerald-800'
                }`}>
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className={`text-lg sm:text-xl font-black transition tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {item.title}
                </h3>
                
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {item.desc}
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t flex items-center gap-1.5 text-xs font-bold ${
                isLight ? 'border-emerald-100 text-emerald-800' : 'border-emerald-900/60 text-emerald-400'
              }`}>
                <CheckCircle2 className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-lime-400'}`} /> 
                <span>{isHindi ? 'प्रयोगशाला एवं खेत प्रमाणित गुणवत्ता' : 'Guaranteed Quality Tested'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Distributor Callout Box */}
        <div className={`mt-14 sm:mt-16 rounded-3xl p-6 sm:p-10 border flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl ${
          isLight 
            ? 'bg-gradient-to-r from-emerald-800 via-[#0a3a1d] to-emerald-800 text-white border-emerald-700' 
            : 'bg-gradient-to-r from-emerald-950 via-[#0a2314] to-emerald-950 border-emerald-600/50'
        }`}>
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-lime-300">
              {isHindi ? 'डीलरशिप एवं वितरक अवसर' : 'Authorized Partnership Opportunity'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t('dealerTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {t('dealerSubtitle')}
            </p>
          </div>

          <Link
            href="/dealers"
            className="w-full md:w-auto text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl whitespace-nowrap hover:scale-105 transition"
          >
            {t('applyDealerBtn')}
          </Link>
        </div>

      </div>
    </section>
  );
}
