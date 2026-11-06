'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sprout, 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  Microscope, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  return (
    <div className={`py-12 sm:py-16 transition-colors duration-300 ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-4 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Sprout className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'कंपनी परिचय एवं दृष्टिकोण' : 'Company Profile & Vision'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {isHindi ? 'जैविक एवं फसल पोषण तकनीक का' : 'Pioneering the Next Era of'} <br />
            <span className="bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
              {isHindi ? 'नया स्वर्णिम युग' : 'Organic & Bio-Crop Technology'}
            </span>
          </h1>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {isHindi 
              ? 'साईं एग्रो इंडस्ट्रीज में, हम अत्याधुनिक सूक्ष्मजीव अनुसंधान और जमीनी स्तर पर किसान की सफलता के बीच सेतु का कार्य करते हैं। हम उच्च-प्रभावकारी, पर्यावरण-सुरक्षित जैविक उत्पादों का निर्माण करते हैं।' 
              : 'At SAI AGRO INDUSTRIES, we bridge the gap between cutting-edge microbial research and ground-level farming success. We manufacture high-performance, eco-safe agricultural inputs that restore soil microbiome balance and deliver record harvests.'}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className={`rounded-3xl p-8 sm:p-10 border shadow-xl relative overflow-hidden transition ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-lime-400 flex items-center justify-center text-slate-950 shadow-lg mb-4">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isHindi ? 'हमारा दृष्टिकोण (Vision)' : 'Our Vision'}
            </h3>
            <p className={`text-sm leading-relaxed mt-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isHindi 
                ? 'भारत का सबसे भरोसेमंद जैव-प्रौद्योगिकी कृषि भागीदार बनना, जिससे हर किसान टिकाऊ, उच्च-उपज और रसायन-मुक्त खेती की ओर अग्रसर हो सके जो आने वाली पीढ़ियों के लिए मिट्टी को समृद्ध बनाए।' 
                : 'To be India’s most trusted biotechnology-driven agricultural partner, enabling every farmer to transition towards sustainable, high-yield, and residue-free farming that enriches the soil for future generations.'}
            </p>
          </div>

          <div className={`rounded-3xl p-8 sm:p-10 border shadow-xl relative overflow-hidden transition ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-lime-500 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg mb-4">
              <Target className="w-7 h-7" />
            </div>
            <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isHindi ? 'हमारा मिशन (Mission)' : 'Our Mission'}
            </h3>
            <p className={`text-sm leading-relaxed mt-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isHindi 
                ? 'वैज्ञानिक रूप से परीक्षित, 100% जैव-उपलब्ध सूक्ष्मजीवी उर्वरक, पौध वृद्धि नियामक और गैर-विषैले पौध सुरक्षा उत्पाद किफायती दरों पर उपलब्ध कराना, साथ ही कृषि वैज्ञानिकों का प्रत्यक्ष मार्गदर्शन प्रदान करना।' 
                : 'Deliver scientifically tested, 100% bio-available microbial fertilizers, plant growth regulators, and non-toxic crop protection agents at honest prices, backed by on-ground agronomist guidance.'}
            </p>
          </div>
        </div>

        {/* Manufacturing & Infrastructure Showcase */}
        <div className={`rounded-3xl p-8 sm:p-12 border shadow-2xl ${
          isLight ? 'bg-white border-emerald-200' : 'bg-[#07190e] border-emerald-800/70'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${
                isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
              }`}>
                <Microscope className="w-3.5 h-3.5" /> 
                <span>{isHindi ? 'अत्याधुनिक विनिर्माण संयंत्र' : 'High-Tech Infrastructure'}</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isHindi ? 'विश्वस्तरीय स्वचालित बायो-फर्टिलाइजर सुविधा' : 'World-Class Automated Bio-Formulation Facility'}
              </h2>
              <p className={`text-sm leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {isHindi 
                  ? 'हमारी आधुनिक उत्पादन इकाई में कंप्यूटर-नियंत्रित किण्वन रिएक्टर (Fermenters), शुद्ध माइक्रोबियल संवर्धन क्लीनरूम, सटीक चिलेशन सिस्टम और स्वचालित बॉटलिंग लाइनें शामिल हैं।' 
                  : 'Our modern production unit features computer-controlled fermentation reactors, pure microbial culture cleanrooms, precision chelation systems, and high-speed automatic bottling lines.'}
              </p>

              <ul className={`space-y-3 text-sm ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isHindi ? 'माइक्रोबियल फर्मेंटर्स: ' : 'Microbial Fermenters: '}</strong>
                    {isHindi ? 'उच्चतम जीवित जीवाणु संख्या (CFU > 1x10^9) बनाए रखने वाले विशेष बायो-रिएक्टर।' : 'Advanced bioreactors maintaining pure colony forming units (CFU > 1x10^8 cells/ml).'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isHindi ? 'विश्लेषणात्मक गुणवत्ता लैब: ' : 'Analytical Testing Lab: '}</strong>
                    {isHindi ? 'प्रत्येक बैच की शुद्धता और सूक्ष्म पोषक तत्वों की जांच के लिए इन-हाउस लैब।' : 'In-house HPLC and spectrophotometry for batch-wise purity and trace element verification.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isHindi ? 'पर्यावरण-अनुकूल उत्पादन: ' : 'Zero Effluent Discharge: '}</strong>
                    {isHindi ? 'प्रदूषण-मुक्त हरित निर्माण प्रक्रिया जो पर्यावरण मानकों का पूर्ण पालन करती है।' : 'Green eco-manufacturing process adhering to sustainable environmental protocols.'}
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30">
              <img
                src="/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg"
                alt="Sai Agro Quality Control Lab & Infrastructure"
                className="block w-full h-auto object-contain"
              />
            </div>

          </div>
        </div>

        {/* Quality Certifications & Standards */}
        <div className="text-center space-y-10">
          <div className="max-w-2xl mx-auto">
            <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isHindi ? 'मान्यता प्राप्त प्रमाणन एवं गुणवत्ता आश्वासन' : 'Recognized Certifications & Quality Assurances'}
            </h3>
            <p className={`text-xs sm:text-sm mt-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {isHindi 
                ? 'साईं एग्रो इंडस्ट्रीज में निर्मित प्रत्येक बैच किसानों तक पहुँचने से पहले कठोर परीक्षणों से गुजरता है।' 
                : 'Every batch manufactured at Sai Agro Industries undergoes multi-tier testing before reaching dealer shelves.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className={`p-6 rounded-3xl text-center space-y-3 border shadow-md ${
              isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center mx-auto border border-emerald-800">
                <Award className="w-6 h-6" />
              </div>
              <h4 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>ISO 9001:2015</h4>
              <p className="text-xs text-slate-400">Certified Quality Management System</p>
            </div>

            <div className={`p-6 rounded-3xl text-center space-y-3 border shadow-md ${
              isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center mx-auto border border-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>100% Bio-Certified</h4>
              <p className="text-xs text-slate-400">Residue-Free Organic Inputs</p>
            </div>

            <div className={`p-6 rounded-3xl text-center space-y-3 border shadow-md ${
              isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center mx-auto border border-emerald-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>GMP Compliant</h4>
              <p className="text-xs text-slate-400">Good Manufacturing Practices</p>
            </div>

            <div className={`p-6 rounded-3xl text-center space-y-3 border shadow-md ${
              isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center mx-auto border border-emerald-800">
                <Users className="w-6 h-6" />
              </div>
              <h4 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>FCO Standards</h4>
              <p className="text-xs text-slate-400">Fertilizer Control Order Compliant</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className={`rounded-3xl p-8 sm:p-12 text-center border shadow-2xl space-y-4 ${
          isLight 
            ? 'bg-gradient-to-r from-emerald-800 to-[#083015] text-white border-emerald-700' 
            : 'bg-gradient-to-r from-emerald-950 via-[#071d10] to-emerald-950 border-emerald-600/50'
        }`}>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isHindi ? 'क्या आप साईं एग्रो के साथ अपनी फसल समृद्ध करना चाहते हैं?' : 'Ready to Experience the Sai Agro Difference?'}
          </h3>
          <p className="text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            {isHindi 
              ? 'जानें कि कैसे हमारे उन्नत जैव-उत्पाद आपकी पैदावार बढ़ा सकते हैं और मिट्टी को उपजाऊ बना सकते हैं।' 
              : 'Discover how our advanced bio-formulations can elevate your crop yield, reduce input expenses, and rejuvenate farm soil.'}
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-black text-sm hover:scale-105 transition shadow-lg"
            >
              {isHindi ? 'उत्पाद देखें' : 'Browse Products'}
            </Link>
            <Link
              href="/dealers"
              className="px-8 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-lime-300 font-black text-sm hover:bg-emerald-900 transition shadow-lg"
            >
              {isHindi ? 'डीलरशिप के लिए आवेदन करें' : 'Become a Distributor'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
