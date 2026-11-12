'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Layers,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductItem {
  _id: string;
  name: string;
  slug?: string;
  category: string;
  tagline?: string;
  composition?: string;
  benefits?: string[];
  packagingSizes?: string[];
  images?: string[];
}

const fallbackProducts: ProductItem[] = [
  {
    _id: '1',
    name: 'Sai Bio-Phos (Phosphorus Bio-Fertilizer)',
    slug: 'sai-bio-phos',
    category: 'Bio-Fertilizers',
    tagline: 'High-potency PSB liquid formulation for rapid phosphorus uptake',
    composition: 'Phosphorus Solubilizing Bacteria (PSB) 1x10^9 CFU/ml',
    benefits: ['Solubilizes fixed soil phosphorus', 'Reduces DAP usage by up to 30%', 'Enhances early root formation'],
    packagingSizes: ['500ml', '1 Litre', '5 Litre'],
    images: ['/images/products/sai-bio-phos.jpg']
  },
  {
    _id: '2',
    name: 'Sai Grow-Max (Bio-Stimulant & PGR)',
    slug: 'sai-grow-max',
    category: 'Plant Growth Promoters',
    tagline: 'Seaweed extract + L-Amino acids for massive flowering and fruit set',
    composition: 'Ascophyllum Nodosum (20%) + Free Amino Acids (10%)',
    benefits: ['Prevents flower and fruit shedding', 'Enhances photosynthetic efficiency', 'Improves color, size & shelf life'],
    packagingSizes: ['250ml', '500ml', '1 Litre'],
    images: ['/images/products/sai-grow-max.jpg']
  },
  {
    _id: '3',
    name: 'Sai Zinc-Chelate 12% (EDTA Chelated Zinc)',
    slug: 'sai-zinc-chelate-12',
    category: 'Micronutrients',
    tagline: '100% water-soluble EDTA Zinc for instant leaf assimilation',
    composition: 'Chelated Zinc (Zn-EDTA) 12.0% Min',
    benefits: ['Fast cure for Khaira disease', 'Stimulates chlorophyll synthesis', 'Enhances grain size & protein synthesis'],
    packagingSizes: ['100g', '250g', '500g', '1 Kg'],
    images: ['/images/products/sai-zinc-chelate.jpg']
  },
  {
    _id: '4',
    name: 'Sai Humic-King (98% Potassium Humate)',
    slug: 'sai-humic-king',
    category: 'Soil Conditioners',
    tagline: 'Shiny humic flakes for white root multiplication and soil aeration',
    composition: 'Potassium Humate 98% (Humic Acid 70% + Fulvic Acid 15%)',
    benefits: ['Increases soil Cation Exchange Capacity (CEC)', 'Expands feeder root biomass up to 3x', 'Retains soil moisture in drought conditions'],
    packagingSizes: ['500g', '1 Kg', '5 Kg', '25 Kg'],
    images: ['/images/products/sai-humic-king.jpg']
  },
  {
    _id: '5',
    name: 'Sai Bio-Shield (Trichoderma Viride)',
    slug: 'sai-bio-shield',
    category: 'Bio-Fungicides',
    tagline: 'Biological defense against damping off, root rot & Fusarium wilt',
    composition: 'Trichoderma viride 1.5% W.P. (2x10^6 CFU/g)',
    benefits: ['Eco-friendly biological protection', 'Colonizes root zone against soil pathogens', 'Produces enzymes degrading fungal cell walls'],
    packagingSizes: ['500g', '1 Kg'],
    images: ['/images/products/sai-bio-shield.jpg']
  },
  {
    _id: '6',
    name: 'Sai Myco-Gold (VAM Bio-Granules)',
    slug: 'sai-myco-gold',
    category: 'Specialty Bio-Granules',
    tagline: 'Endo-mycorrhizal coated bio-granules for enhanced nutrient uptake',
    composition: 'Vesicular Arbuscular Mycorrhiza (100 IP/gm)',
    benefits: ['Extends root absorption surface area 100x', 'Enhances drought & salinity tolerance', 'Improves uptake of Phosphorus & Zinc'],
    packagingSizes: ['4 Kg', '8 Kg', '25 Kg'],
    images: ['/images/products/sai-myco-gold.jpg']
  }
];

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?featured=true&limit=6', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // If no featured products found, fetch latest active products
          const fallbackRes = await fetch('/api/products?limit=6', { cache: 'no-store' });
          const fallbackData = await fallbackRes.json();
          if (fallbackData.success && fallbackData.products && fallbackData.products.length > 0) {
            setProducts(fallbackData.products);
          }
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    }
    fetchProducts();
  }, []);

  const handleQuoteClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsQuoteOpen(true);
  };

  return (
    <section className={`py-16 sm:py-20 transition-colors duration-300 relative ${
      isLight ? 'bg-[#f0f7f2]' : 'bg-[#07130b]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border mb-3 ${
              isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5" /> 
              <span>{isHindi ? 'प्रमुख जैव-कृषि उत्पाद' : 'Flagship Formulations'}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {isHindi ? 'बंपर पैदावार के लिए प्रमाणित उत्पाद' : 'Proven Bio-Nutrients for Maximum Yield'}
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              {isHindi 
                ? 'उन्नत माइक्रोबियल स्ट्रेन और प्राकृतिक चेलेट्स से समृद्ध, जो फसलों द्वारा तुरंत अवशोषित होकर मिट्टी को उपजाऊ बनाते हैं।' 
                : 'Engineered with advanced microbial strains and organic chelates for rapid absorption and long-lasting soil bio-activity.'}
            </p>
          </div>

          <Link
            href="/products"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition self-start md:self-auto border shadow-sm ${
              isLight 
                ? 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-emerald-950 hover:bg-emerald-900 text-lime-400 border-emerald-700/60'
            }`}
          >
            <span>{isHindi ? 'संपूर्ण कैटलॉग देखें' : 'View Full Catalogue'}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((prod) => (
            <div
              key={prod._id}
              className={`rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
              }`}
            >
              {/* Product Image & Category Badge */}
              <div className={`relative aspect-[4/3] overflow-hidden flex items-center justify-center p-6 ${
                isLight ? 'bg-emerald-50/60' : 'bg-[#040e07]'
              }`}>
                <Image
                  src={prod.images && prod.images[0] ? prod.images[0] : '/images/products/sai-grow-max.jpg'}
                  alt={prod.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black shadow-md ${
                    isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
                  }`}>
                    {prod.category}
                  </span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className={`text-lg sm:text-xl font-black transition tracking-tight ${
                    isLight ? 'text-slate-900 group-hover:text-emerald-700' : 'text-white group-hover:text-lime-300'
                  }`}>
                    <Link href={`/products/${prod.slug || prod._id}`}>
                      {prod.name}
                    </Link>
                  </h3>
                  <p className={`text-xs font-bold mt-1 line-clamp-1 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>
                    {prod.tagline}
                  </p>
                  
                  {prod.composition && (
                    <div className={`mt-3 p-2.5 rounded-xl border text-xs ${
                      isLight 
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-700' 
                        : 'bg-[#040e07] border-emerald-950 text-slate-300'
                    }`}>
                      <strong className={isLight ? 'text-emerald-800' : 'text-lime-300'}>
                        {isHindi ? 'संघटक: ' : 'Composition: '}
                      </strong> {prod.composition}
                    </div>
                  )}

                  <ul className={`mt-3 space-y-1.5 text-xs ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {prod.benefits?.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                          isLight ? 'text-emerald-600' : 'text-lime-400'
                        }`} />
                        <span className="line-clamp-1 font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Packaging Sizes */}
                {prod.packagingSizes && prod.packagingSizes.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className={`font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                      {isHindi ? 'पैकिंग: ' : 'Packs: '}
                    </span>
                    {prod.packagingSizes.map((pack) => (
                      <span key={pack} className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
                        isLight 
                          ? 'bg-white border-emerald-200 text-slate-700' 
                          : 'bg-emerald-950/80 border-emerald-900 text-slate-300'
                      }`}>
                        {pack}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <Link
                  href={`/products/${prod.slug || prod._id}`}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs text-center flex items-center justify-center transition border ${
                    isLight 
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200' 
                      : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-700/60 text-white'
                  }`}
                >
                  {isHindi ? 'खुराक देखें' : 'View Dosage'}
                </Link>

                <button
                  onClick={() => handleQuoteClick(prod.name)}
                  className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition ${
                    isLight 
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 text-slate-950'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" /> 
                  <span>{isHindi ? 'कोटेशन लें' : 'Get Quote'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={selectedProduct}
      />
    </section>
  );
}
