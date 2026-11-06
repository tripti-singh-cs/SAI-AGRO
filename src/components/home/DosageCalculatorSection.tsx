'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2, Send, MessageCircle } from 'lucide-react';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const productOptions = [
  {
    id: 'sai-bio-phos',
    name: { en: 'Sai Bio-Phos (Phosphorus Bio-Fertilizer)', hi: 'साईं बायो-फॉस (फॉस्फोरस जैव-उर्वरक)' },
    ratePerAcre: 1.5,
    unit: { en: 'Litres', hi: 'लीटर' },
    waterVolumePerAcre: 150,
    method: { en: 'Drip Fertigation / Soil Drenching', hi: 'ड्रिप सिंचाई या मिट्टी में ड्रेंचिंग' },
    savingsDesc: { en: 'Replaces ~25 kg synthetic DAP per acre', hi: 'प्रति एकड़ ~25 किग्रा डीएपी की बचत करता है' },
  },
  {
    id: 'sai-grow-max',
    name: { en: 'Sai Grow-Max (Seaweed + Amino Bio-Stimulant)', hi: 'साईं ग्रो-मैक्स (सीवीड + अमीनो बायो-स्टिमुलेंट)' },
    ratePerAcre: 0.3,
    unit: { en: 'Litres (300 ml)', hi: 'लीटर (300 मिली)' },
    waterVolumePerAcre: 150,
    method: { en: 'Foliar Spray at flower/fruit initiation', hi: 'फूल व फल बनते समय पर्णीय छिड़काव' },
    savingsDesc: { en: 'Increases flower retention & fruit size by 25-30%', hi: 'फूलों का झड़ना रोककर 25-30% उपज बढ़ाता है' },
  },
  {
    id: 'sai-zinc-chelate',
    name: { en: 'Sai Zinc-Chelate 12% (EDTA Chelated Zinc)', hi: 'साईं जिंक-चिलेट 12% (ईडीटीए जिंक)' },
    ratePerAcre: 0.2,
    unit: { en: 'Kg (200 grams)', hi: 'किग्रा (200 ग्राम)' },
    waterVolumePerAcre: 150,
    method: { en: 'Foliar Stomatal Spray', hi: 'पर्णीय पत्तियों पर छिड़काव' },
    savingsDesc: { en: 'Cures Zinc chlorosis & Khaira disease in 3-5 days', hi: '3-5 दिनों में खैरा व पीलापन रोग दूर करता है' },
  },
  {
    id: 'sai-humic-king',
    name: { en: 'Sai Humic-King (98% Potassium Humate Flakes)', hi: 'साईं ह्यूमिक-किंग (98% पोटैशियम ह्यूमेट)' },
    ratePerAcre: 1.0,
    unit: { en: 'Kg', hi: 'किग्रा' },
    waterVolumePerAcre: 200,
    method: { en: 'Drip Irrigation or mixed with compost', hi: 'ड्रिप सिंचाई अथवा गोबर की खाद में मिलाकर' },
    savingsDesc: { en: 'Multiplies white root mass & retains soil moisture', hi: 'सफेद जड़ों का जाल फैलाता है व नमी बनाए रखता है' },
  },
  {
    id: 'sai-bio-shield',
    name: { en: 'Sai Bio-Shield (Trichoderma Bio-Fungicide)', hi: 'साईं बायो-शील्ड (ट्राइकोडर्मा कवकनाशी)' },
    ratePerAcre: 2.0,
    unit: { en: 'Kg', hi: 'किग्रा' },
    waterVolumePerAcre: 150,
    method: { en: 'Soil application & Seed treatment', hi: 'बीज उपचार एवं मिट्टी में प्रयोग' },
    savingsDesc: { en: '100% biological control against root rot & wilt', hi: 'जड़ सड़न व उकठा रोग पर 100% जैविक नियंत्रण' },
  },
];

export default function DosageCalculatorSection() {
  const [acreage, setAcreage] = useState<number>(2);
  const [selectedProductId, setSelectedProductId] = useState<string>('sai-grow-max');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const selectedProduct = productOptions.find((p) => p.id === selectedProductId) || productOptions[0];
  const totalRequiredQuantity = (selectedProduct.ratePerAcre * acreage).toFixed(2);
  const totalWaterRequired = selectedProduct.waterVolumePerAcre * acreage;

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f0f7f2]' : 'bg-[#07130b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Calculator className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'सटीक खुराक कैलकुलेटर' : 'Farmer Precision Tool'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('calcTitle')}
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('calcSubtitle')}
          </p>
        </div>

        {/* Calculator Card */}
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 shadow-2xl border transition-all ${
          isLight ? 'bg-white border-emerald-200' : 'bg-[#0b1f13] border-emerald-800/70'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Input Column */}
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-black mb-2 ${
                  isLight ? 'text-slate-800' : 'text-white'
                }`}>
                  1. {isHindi ? 'उत्पाद का चयन करें' : 'Select Formulation'}
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border font-bold text-sm focus:outline-none transition shadow-sm ${
                    isLight 
                      ? 'bg-white border-emerald-200 text-slate-800 focus:border-emerald-600' 
                      : 'bg-[#040e07] border-emerald-800 text-white focus:border-lime-400'
                  }`}
                >
                  {productOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {isHindi ? opt.name.hi : opt.name.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-sm font-black ${
                    isLight ? 'text-slate-800' : 'text-white'
                  }`}>
                    2. {t('landAreaLabel')}
                  </label>
                  <span className={`font-black text-base px-3.5 py-1 rounded-xl border ${
                    isLight 
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                      : 'bg-emerald-950 text-lime-400 border-emerald-800'
                  }`}>
                    {acreage} {isHindi ? 'एकड़' : acreage === 1 ? 'Acre' : 'Acres'}
                  </span>
                </div>
                
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={acreage}
                  onChange={(e) => setAcreage(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-lime-400"
                />
                
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-1.5">
                  <span>1 {isHindi ? 'एकड़' : 'Acre'}</span>
                  <span>10 {isHindi ? 'एकड़' : 'Acres'}</span>
                  <span>25 {isHindi ? 'एकड़' : 'Acres'}</span>
                  <span>50 {isHindi ? 'एकड़' : 'Acres'}</span>
                </div>
              </div>

              {/* Application Details Box */}
              <div className={`p-4 rounded-2xl border space-y-2 ${
                isLight 
                  ? 'bg-emerald-50/80 border-emerald-200' 
                  : 'bg-[#040e07] border-emerald-900/80'
              }`}>
                <div className={`text-xs font-bold ${
                  isLight ? 'text-emerald-800' : 'text-emerald-300'
                }`}>
                  {isHindi ? 'प्रयोग विधि: ' : 'Application Method: '}
                </div>
                <div className={`text-sm font-black ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  {isHindi ? selectedProduct.method.hi : selectedProduct.method.en}
                </div>
                <div className={`text-xs font-bold pt-1 ${
                  isLight ? 'text-emerald-700' : 'text-lime-400'
                }`}>
                  {isHindi ? selectedProduct.savingsDesc.hi : selectedProduct.savingsDesc.en}
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between space-y-6 shadow-xl ${
              isLight 
                ? 'bg-gradient-to-br from-emerald-800 to-[#073618] text-white border-emerald-700' 
                : 'bg-gradient-to-br from-[#0c2916] to-[#06150b] border-lime-400/30'
            }`}>
              <div>
                <span className="text-xs uppercase font-black tracking-wider text-lime-300">
                  {isHindi ? 'गणना सारांश' : 'Calculation Summary'}
                </span>
                <h4 className="text-xl font-black text-white mt-1">
                  {acreage} {isHindi ? 'एकड़ के लिए आवश्यक मात्रा' : `Required Inputs for ${acreage} Acres`}
                </h4>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-700/50 backdrop-blur-sm">
                  <div className="text-xs text-slate-300 font-medium">
                    {t('estimatedCost')}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-lime-300 mt-1">
                    {totalRequiredQuantity} <span className="text-lg font-bold text-slate-200">{isHindi ? selectedProduct.unit.hi : selectedProduct.unit.en}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-700/50 backdrop-blur-sm flex items-center justify-between">
                  <span className="text-xs text-slate-200">
                    {isHindi ? 'अनुशंसित पानी की मात्रा:' : 'Recommended Water Volume:'}
                  </span>
                  <span className="text-sm font-black text-white">
                    {totalWaterRequired} {isHindi ? 'लीटर' : 'Litres'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-102 active:scale-98"
              >
                <Send className="w-4 h-4" /> 
                <span>{isHindi ? 'यह मात्रा ऑर्डर करें' : 'Order This Quantity'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={`${isHindi ? selectedProduct.name.hi : selectedProduct.name.en} (${totalRequiredQuantity} ${isHindi ? selectedProduct.unit.hi : selectedProduct.unit.en} for ${acreage} Acres)`}
      />
    </section>
  );
}
