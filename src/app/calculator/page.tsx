'use client';

import React from 'react';
import DosageCalculatorSection from '@/components/home/DosageCalculatorSection';
import { Calculator, Sprout, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CalculatorPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  return (
    <div className={`py-10 sm:py-12 min-h-screen transition-colors duration-300 ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <DosageCalculatorSection />

        {/* Application Best Practices */}
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${
          isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
        }`}>
          <h3 className={`text-lg sm:text-xl font-black flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-lime-500" /> 
            <span>{isHindi ? 'अधिकतम जैविक प्रभावशीलता के लिए उपयोगी सुझाव' : 'Best Practices for Maximum Bio-Nutrient Absorption'}</span>
          </h3>
          <ul className={`space-y-3 text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <li className="flex items-start gap-2.5">
              <span className="text-lime-500 font-black text-base leading-none">•</span>
              <span>
                <strong>{isHindi ? 'छिड़काव का सही समय: ' : 'Foliar Spray Timing: '}</strong>
                {isHindi 
                  ? 'सुबह 6:00 से 9:30 बजे या शाम 4:00 से 6:30 बजे के बीच छिड़काव करें जब पत्तियों के रंध्र (स्टोमेटा) खुले होते हैं और वाष्पीकरण कम होता है।' 
                  : 'Spray during early morning (6:00 AM - 9:30 AM) or late afternoon (4:00 PM - 6:30 PM) when stomata are open and evaporation is minimal.'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-lime-500 font-black text-base leading-none">•</span>
              <span>
                <strong>{isHindi ? 'पानी की गुणवत्ता: ' : 'Water Quality: '}</strong>
                {isHindi 
                  ? 'हमेशा साफ और तटस्थ पीएच (6.5 - 7.5) वाले पानी का उपयोग करें। अत्यधिक खारे या गंदे पानी से बचें।' 
                  : 'Use clean, neutral pH water (pH 6.5 - 7.5). Avoid stagnant alkaline pond water with heavy salinity.'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-lime-500 font-black text-base leading-none">•</span>
              <span>
                <strong>{isHindi ? 'रासायनिक दवाओं से सावधानी: ' : 'No Direct Chemical Fungicide Mixing: '}</strong>
                {isHindi 
                  ? 'जीवित सूक्ष्मजीवी उर्वरकों (जैसे ट्राइकोडर्मा या पीएसबी) को कभी भी रासायनिक कॉपर या कीटनाशकों के साथ न मिलाएं। दोनों के बीच 48-72 घंटे का अंतर रखें।' 
                  : 'Do not mix live bio-fertilizers (Azotobacter/PSB) or bio-fungicides (Trichoderma) with harsh synthetic chemical fungicides simultaneously. Maintain a 48-72 hour gap.'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
