'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall,
  MessageCircle
} from 'lucide-react';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface CropSchedule {
  stage: { en: string; hi: string };
  recommendedProduct: { en: string; hi: string };
  dosage: { en: string; hi: string };
  purpose: { en: string; hi: string };
  benefits: { en: string; hi: string };
}

const cropData: Record<string, { name: { en: string; hi: string }; icon: string; stages: CropSchedule[] }> = {
  paddy: {
    name: { en: 'Paddy / Basmati Rice', hi: 'धान / बासमती चावल' },
    icon: '🌾',
    stages: [
      {
        stage: { en: 'Seed Treatment & Nursery', hi: 'बीज उपचार एवं नर्सरी' },
        recommendedProduct: { en: 'Sai Nitro-Fix + Sai Bio-Shield', hi: 'साईं नाइट्रो-फिक्स + साईं बायो-शील्ड' },
        dosage: { en: '10 ml/kg seed or 1L / acre in nursery bed', hi: '10 मिली/किग्रा बीज या 1 लीटर/एकड़' },
        purpose: { en: 'Prevents bakanae/foot rot, accelerates root sprout', hi: 'बकाने/जड़ सड़न रोकता है, अंकुरण तेज करता है' },
        benefits: { en: '95%+ germination rate, vigorous green seedlings', hi: '95%+ अंकुरण और मजबूत हरी पौध' },
      },
      {
        stage: { en: 'Tillering & Vegetative (20-30 DAT)', hi: 'कल्ले फूटना व वानस्पतिक वृद्धि (20-30 दिन)' },
        recommendedProduct: { en: 'Sai Bio-Phos + Sai Zinc-Chelate 12%', hi: 'साईं बायो-फॉस + साईं जिंक चिलेट 12%' },
        dosage: { en: '1L Bio-Phos + 150g Zinc Chelate per acre', hi: '1 लीटर बायो-फॉस + 150 ग्राम जिंक चिलेट प्रति एकड़' },
        purpose: { en: 'Maximizes tillers count and cures Khaira disease', hi: 'कल्लों की संख्या बढ़ाता है और खैरा रोग दूर करता है' },
        benefits: { en: '30-40 productive tillers per hill, lush green canopy', hi: 'प्रति पौधा 30-40 कल्ले, गहरा हरा रंग' },
      },
      {
        stage: { en: 'Panicle Initiation & Flowering', hi: 'गभोट व बाली निकलने की अवस्था' },
        recommendedProduct: { en: 'Sai Grow-Max (Bio-Stimulant)', hi: 'साईं ग्रो-मैक्स (बायो-स्टिमुलेंट)' },
        dosage: { en: '250-300 ml per acre (Foliar spray)', hi: '250-300 मिली प्रति एकड़ (पर्णीय छिड़काव)' },
        purpose: { en: 'Uniform panicle emergence and flower retention', hi: 'समान बालियां निकलना व फूलों का झड़ना रोकना' },
        benefits: { en: 'Zero sterile grains, longer panicle length', hi: 'फोक/बांझ दानों में भारी कमी, लंबी बालियां' },
      },
      {
        stage: { en: 'Grain Filling & Milking', hi: 'दुग्धावस्था व दाना भराव' },
        recommendedProduct: { en: 'Sai Cal-Bor Plus + Potassium Humate', hi: 'साईं कैल-बोर प्लस + पोटैशियम ह्यूमेट' },
        dosage: { en: '250 ml Cal-Bor per acre', hi: '250 मिली कैल-बोर प्रति एकड़' },
        purpose: { en: 'Dense grain filling and lustrous golden color', hi: 'चमकदार दाना भराव और वजन में वृद्धि' },
        benefits: { en: 'Higher test weight and heavy yield (+25%)', hi: 'वजनदार दाने और 25% तक अधिक उत्पादन' },
      },
    ],
  },
  wheat: {
    name: { en: 'Wheat & Mustard', hi: 'गेहूं एवं सरसों' },
    icon: '🌱',
    stages: [
      {
        stage: { en: 'Basal / Sowing Stage', hi: 'बुवाई व बेसल डोज' },
        recommendedProduct: { en: 'Sai Myco-Gold (Bio-Granules)', hi: 'साईं माइको-गोल्ड (दानेदार)' },
        dosage: { en: '4 kg per acre mixed with basal fertilizer', hi: '4 किग्रा प्रति एकड़ बेसल खाद के साथ' },
        purpose: { en: 'Massive root network development', hi: 'जड़ों के गहरे फैलाव और मिट्टी सुधार के लिए' },
        benefits: { en: 'Deep soil moisture absorption and drought tolerance', hi: 'सूखा सहनशीलता और पोषक तत्वों का तेज अवशोषण' },
      },
      {
        stage: { en: 'CRI & Tillering (20-35 DAS)', hi: 'ताजमूल व कल्ले फूटने पर (20-35 दिन)' },
        recommendedProduct: { en: 'Sai Zinc-Chelate 12% + Sai Humic-King', hi: 'साईं जिंक चिलेट + साईं ह्यूमिक-किंग' },
        dosage: { en: '150g Zinc + 500g Humic per acre', hi: '150 ग्राम जिंक + 500 ग्राम ह्यूमिक प्रति एकड़' },
        purpose: { en: 'Root elongation and vigorous tillering', hi: 'पीलापन दूर करना और कल्ले बढ़ाना' },
        benefits: { en: 'Stops leaf yellowing, dense tillers per square meter', hi: 'मजबूत पौधे और 8-12 कल्ले प्रति पौधा' },
      },
      {
        stage: { en: 'Flag Leaf & Booting', hi: 'झंडा पत्ती व बाली अवस्था' },
        recommendedProduct: { en: 'Sai Grow-Max (Seaweed + Amino)', hi: 'साईं ग्रो-मैक्स (सीवीड + अमीनो)' },
        dosage: { en: '250 ml per acre spray', hi: '250 मिली प्रति एकड़ छिड़काव' },
        purpose: { en: 'Nutrient mobilization into emerging ears', hi: 'बालियों में पोषक तत्वों का संचय' },
        benefits: { en: 'Longer earhead size and frost protection', hi: 'लंबी बालियां और पाले से सुरक्षा' },
      },
    ],
  },
  sugarcane: {
    name: { en: 'Sugarcane', hi: 'गन्ना' },
    icon: '🎋',
    stages: [
      {
        stage: { en: 'Sett Treatment & Planting', hi: 'टुकड़ा उपचार व बुवाई' },
        recommendedProduct: { en: 'Sai Bio-Shield + Sai Humic-King', hi: 'साईं बायो-शील्ड + साईं ह्यूमिक-किंग' },
        dosage: { en: '1L Bio-Shield + 500g Humic in 100L water dip', hi: '1 लीटर बायो-शील्ड + 500 ग्राम ह्यूमिक 100L पानी में' },
        purpose: { en: 'Controls red rot and accelerates eye-bud sprout', hi: 'रेड रॉट (लाल सड़न) से बचाव और त्वरित फुटाव' },
        benefits: { en: '95%+ sett germination and uniform cane stand', hi: '95%+ अंकुरण और एकसमान जमाव' },
      },
      {
        stage: { en: 'Early Growth & Earthing Up', hi: 'प्रारंभिक वृद्धि व मिट्टी चढ़ाना' },
        recommendedProduct: { en: 'Sai Bio-Phos + Sai Myco-Gold', hi: 'साईं बायो-फॉस + साईं माइको-गोल्ड' },
        dosage: { en: '2L Bio-Phos + 4 kg Myco-Gold per acre', hi: '2 लीटर बायो-फॉस + 4 किग्रा माइको-गोल्ड' },
        purpose: { en: 'Thick root formation and heavy tillering', hi: 'मजबूत जड़ें और भारी फुटाव' },
        benefits: { en: 'Increases number of millable canes (NMC)', hi: 'प्रति एकड़ गन्ने की संख्या में भारी वृद्धि' },
      },
      {
        stage: { en: 'Grand Growth Stage (90-150 Days)', hi: 'तीव्र विकास व पोरी वृद्धि (90-150 दिन)' },
        recommendedProduct: { en: 'Sai Grow-Max + Sai Cal-Bor Plus', hi: 'साईं ग्रो-मैक्स + साईं कैल-बोर प्लस' },
        dosage: { en: '500 ml Grow-Max + 500 ml Cal-Bor per acre', hi: '500 मिली ग्रो-मैक्स + 500 मिली कैल-बोर' },
        purpose: { en: 'Inter-node length expansion and sugar accumulation', hi: 'पोरियों की लंबाई और मिठास (सुक्रोज) बढ़ाना' },
        benefits: { en: 'Heavier cane weight and higher Brix sugar %', hi: 'मोटा गन्ना, भारी वजन और उच्च शर्करा स्तर' },
      },
    ],
  },
  tomato_vegetables: {
    name: { en: 'Chilli, Tomato & Vegetables', hi: 'मिर्च, टमाटर एवं सब्जियां' },
    icon: '🌶️',
    stages: [
      {
        stage: { en: 'Transplanting & Root Establishment', hi: 'रोपाई एवं जड़ स्थापना' },
        recommendedProduct: { en: 'Sai Humic-King (98% Potassium Humate)', hi: 'साईं ह्यूमिक-किंग (98% पोटैशियम ह्यूमेट)' },
        dosage: { en: '500g per acre through drip or drenching', hi: '500 ग्राम प्रति एकड़ ड्रिप या ड्रेंचिंग द्वारा' },
        purpose: { en: 'Rapid establishment of white feeder roots', hi: 'सफेद जड़ों का त्वरित जाल फैलाना' },
        benefits: { en: 'Zero transplanting shock, fast vegetative start', hi: 'रोपाई के झटके से बचाव और तेज बढ़वार' },
      },
      {
        stage: { en: 'Flowering & Branching', hi: 'शाखाएं व फूल आने की अवस्था' },
        recommendedProduct: { en: 'Sai Grow-Max + Sai Cal-Bor Plus', hi: 'साईं ग्रो-मैक्स + साईं कैल-बोर प्लस' },
        dosage: { en: '2 ml Grow-Max + 2 ml Cal-Bor per litre spray', hi: '2 मिली ग्रो-मैक्स + 2 मिली कैल-बोर प्रति लीटर' },
        purpose: { en: 'Stops flower drop and promotes heavy fruit setting', hi: 'फूलों का झड़ना रोककर भरपूर फल लगाना' },
        benefits: { en: 'Dense flowering clusters, no blossom-end rot', hi: 'गुच्छों में फूल और सड़न से मुक्ति' },
      },
      {
        stage: { en: 'Fruiting & Continuous Pickings', hi: 'फल विकास एवं तुड़ाई' },
        recommendedProduct: { en: 'Sai Bio-Shield (Trichoderma) + Micronutrients', hi: 'साईं बायो-शील्ड + सूक्ष्म पोषक तत्व' },
        dosage: { en: '5g Bio-Shield + 1.5g Zinc Chelate per litre', hi: '5 ग्राम बायो-शील्ड + 1.5 ग्राम जिंक प्रति लीटर' },
        purpose: { en: 'Controls fungal blight, keeps fruits shining and firm', hi: 'फंगल झुलसा रोग नियंत्रण और फलों में चमक' },
        benefits: { en: 'Extended harvesting cycles (4-6 extra pickings)', hi: '4-6 अतिरिक्त तुड़ाई और उत्तम बाजार भाव' },
      },
    ],
  },
  fruits: {
    name: { en: 'Banana, Mango & Fruits', hi: 'केला, आम, अनार एवं फल' },
    icon: '🍌',
    stages: [
      {
        stage: { en: 'Bahar Treatment & Pruning', hi: 'बहार उपचार व छंटाई' },
        recommendedProduct: { en: 'Sai Humic-King + Sai Myco-Gold', hi: 'साईं ह्यूमिक-किंग + साईं माइको-गोल्ड' },
        dosage: { en: '1 kg Humic + 4 kg Myco-Gold per acre drip', hi: '1 किग्रा ह्यूमिक + 4 किग्रा माइको-गोल्ड ड्रिप से' },
        purpose: { en: 'Soil conditioning and new root initiation', hi: 'मिट्टी की उर्वरता सुधार व नई जड़ों का निर्माण' },
        benefits: { en: 'Synchronized bud break and healthy shoots', hi: 'एकसमान फुटाव और स्वस्थ शाखाएं' },
      },
      {
        stage: { en: 'Flowering & Fruit Setting', hi: 'फूल व फल लगने की अवस्था' },
        recommendedProduct: { en: 'Sai Grow-Max (L-Amino Acids)', hi: 'साईं ग्रो-मैक्स (एल-अमीनो एसिड)' },
        dosage: { en: '2.5 ml per litre foliar spray', hi: '2.5 मिली प्रति लीटर छिड़काव' },
        purpose: { en: 'Maximum hermaphrodite flower count & retention', hi: 'स्त्री फूलों की संख्या व फल धारणा बढ़ाना' },
        benefits: { en: 'No flower drop during hot weather stress', hi: 'गर्मी व तनाव में भी फूलों का न गिरना' },
      },
      {
        stage: { en: 'Fruit Sizing & Color Development', hi: 'फलों का आकार व चमक' },
        recommendedProduct: { en: 'Sai Cal-Bor Plus (Liquid Calcium + Boron)', hi: 'साईं कैल-बोर प्लस (तरल कैल्शियम + बोरॉन)' },
        dosage: { en: '2.5 ml per litre foliar spray', hi: '2.5 मिली प्रति लीटर छिड़काव' },
        purpose: { en: 'Prevents fruit cracking and enhances ruby-red aril color', hi: 'फलों को फटने से बचाना और आकर्षक रंग' },
        benefits: { en: 'Export-grade size, firm skin, long shelf life', hi: 'निर्यात गुणवत्ता वाला आकार और लंबी शेल्फ लाइफ' },
      },
    ],
  },
};

export default function CropAdvisor() {
  const [selectedCropKey, setSelectedCropKey] = useState('paddy');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const currentCrop = cropData[selectedCropKey] || cropData.paddy;

  const handleRequestQuote = (prodName: string) => {
    setQuoteProduct(prodName);
    setIsQuoteOpen(true);
  };

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Sprout className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'इंटरैक्टिव फसल पोषण सलाहकार' : 'Interactive Agronomy Tool'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t('cropAdvisorTitle')}
          </h2>
          <p className={`text-sm sm:text-base mt-2 leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t('cropAdvisorSubtitle')}
          </p>
        </div>

        {/* Responsive Horizontal Scroll Tabs */}
        <div className="flex overflow-x-auto no-scrollbar pb-3 justify-start sm:justify-center gap-2.5 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {Object.entries(cropData).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedCropKey(key)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 ${
                selectedCropKey === key
                  ? isLight 
                    ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 scale-105' 
                    : 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-xl shadow-emerald-500/20 scale-105'
                  : isLight 
                    ? 'bg-white text-slate-700 hover:text-emerald-800 border border-emerald-200 shadow-sm' 
                    : 'bg-[#0e2718] border border-emerald-800/60 text-slate-300 hover:text-white hover:border-lime-400/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{isHindi ? item.name.hi : item.name.en}</span>
            </button>
          ))}
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {currentCrop.stages.map((stg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 flex flex-col justify-between relative border shadow-lg transition-all hover:shadow-2xl ${
                isLight 
                  ? 'bg-white border-emerald-100' 
                  : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              {/* Step Number Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center border ${
                  isLight 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-emerald-950 text-lime-400 border-emerald-800'
                }`}>
                  0{idx + 1}
                </span>
                <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-950/70 text-emerald-300'
                }`}>
                  {isHindi ? 'विकास चरण' : 'Growth Stage'}
                </span>
              </div>

              {/* Stage Name & Formulation Box */}
              <div className="space-y-3 flex-grow">
                <h4 className={`text-base sm:text-lg font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {isHindi ? stg.stage.hi : stg.stage.en}
                </h4>

                <div className={`p-3.5 rounded-2xl border space-y-1.5 ${
                  isLight 
                    ? 'bg-emerald-50/70 border-emerald-200' 
                    : 'bg-[#040f08] border-emerald-900/80'
                }`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-emerald-800' : 'text-lime-400'
                  }`}>
                    {isHindi ? 'अनुशंसित उत्पाद:' : 'Recommended Input:'}
                  </div>
                  <div className={`text-sm font-black leading-snug ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}>
                    {isHindi ? stg.recommendedProduct.hi : stg.recommendedProduct.en}
                  </div>
                  <div className={`text-xs font-bold pt-1 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>
                    {isHindi ? 'खुराक: ' : 'Dosage: '}{isHindi ? stg.dosage.hi : stg.dosage.en}
                  </div>
                </div>

                <div className={`space-y-1.5 text-xs ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  <p>
                    <strong className={isLight ? 'text-slate-800 font-bold' : 'text-slate-100 font-bold'}>
                      {isHindi ? 'कार्य: ' : 'Action: '}
                    </strong> 
                    {isHindi ? stg.purpose.hi : stg.purpose.en}
                  </p>
                  <p>
                    <strong className={isLight ? 'text-emerald-800 font-bold' : 'text-lime-300 font-bold'}>
                      {isHindi ? 'परिणाम: ' : 'Expected Result: '}
                    </strong> 
                    {isHindi ? stg.benefits.hi : stg.benefits.en}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className={`mt-6 pt-4 border-t ${
                isLight ? 'border-emerald-100' : 'border-emerald-950'
              }`}>
                <button
                  onClick={() => handleRequestQuote(`${isHindi ? currentCrop.name.hi : currentCrop.name.en} - ${isHindi ? stg.recommendedProduct.hi : stg.recommendedProduct.en}`)}
                  className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition shadow-sm ${
                    isLight 
                      ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300' 
                      : 'bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/60 text-lime-300 hover:text-white'
                  }`}
                >
                  <span>{isHindi ? 'यह उत्पाद मंगाएं' : 'Order Formulation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className={`mt-12 rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl ${
          isLight ? 'bg-white border-emerald-200' : 'bg-[#0a2014] border-emerald-700/60'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
            }`}>
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isHindi ? 'क्या आप अपनी फसल के लिए निःशुल्क कृषि परामर्श चाहते हैं?' : 'Need Free Technical Agronomy Support for Your Land?'}
              </h4>
              <p className={`text-xs sm:text-sm mt-0.5 ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                {isHindi 
                  ? 'हमारे विशेषज्ञ कृषि वैज्ञानिक आपकी मिट्टी की रिपोर्ट के अनुसार व्यक्तिगत सलाह देते हैं।' 
                  : 'Our agri-scientists provide personalized soil report analysis and customized crop dosage recommendations.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/7856057415?text=Hello%20Sai%20Agro,%20I%20need%20crop%20advisory%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 flex items-center justify-center gap-1.5 transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <Link
              href="/contact"
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md whitespace-nowrap hover:scale-105 transition text-center ${
                isLight 
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
                  : 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950'
              }`}
            >
              {isHindi ? 'विशेषज्ञ से संपर्क करें' : 'Talk to Agronomist'}
            </Link>
          </div>
        </div>

      </div>

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </section>
  );
}
