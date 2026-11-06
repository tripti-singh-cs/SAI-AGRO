'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Sprout, 
  ShieldCheck, 
  ChevronRight,
  RefreshCw,
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
  subCategory?: string;
  tagline?: string;
  description?: string;
  composition?: string;
  targetCrops?: string[];
  benefits?: string[];
  packagingSizes?: string[];
  images?: string[];
}

const fallbackCatalog: ProductItem[] = [
  {
    _id: '1',
    name: 'Sai Bio-Phos (Phosphorus Bio-Fertilizer)',
    slug: 'sai-bio-phos',
    category: 'Bio-Fertilizers & Inoculants',
    tagline: 'High-potency PSB liquid formulation for rapid phosphorus uptake',
    description: 'Solubilizes fixed soil phosphorus into plant-available orthophosphate ions.',
    composition: 'Phosphorus Solubilizing Bacteria (PSB) 1x10^9 CFU/ml',
    targetCrops: ['Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Vegetables'],
    benefits: ['Solubilizes fixed soil phosphorus', 'Reduces DAP usage by up to 30%', 'Enhances root proliferation'],
    packagingSizes: ['500ml', '1 Litre', '5 Litre'],
    images: ['/images/products/sai-bio-phos.jpg']
  },
  {
    _id: '2',
    name: 'Sai Grow-Max (Seaweed + Amino Bio-Stimulant)',
    slug: 'sai-grow-max',
    category: 'Plant Growth Regulators & Promoters',
    tagline: 'Bio-stimulant for dense flowering and preventing bud shedding',
    description: 'Enriched with organic seaweed extracts and 17 L-amino acids for maximum photosynthesis.',
    composition: 'Ascophyllum Nodosum (20%) + Free L-Amino Acids (10%)',
    targetCrops: ['Tomato', 'Chilli', 'Paddy', 'Cotton', 'Pomegranate', 'Mango'],
    benefits: ['Stops flower & fruit dropping', 'Increases fruit size and lustre', 'Boosts drought and temperature tolerance'],
    packagingSizes: ['250ml', '500ml', '1 Litre'],
    images: ['/images/products/sai-grow-max.jpg']
  },
  {
    _id: '3',
    name: 'Sai Zinc-Chelate 12% (EDTA Chelated Zinc)',
    slug: 'sai-zinc-chelate-12',
    category: 'Chelated Micronutrients',
    tagline: '100% water-soluble EDTA Zinc for instant stomatal assimilation',
    description: 'Fast acting chelated zinc formulation preventing and curing Khaira disease.',
    composition: 'Chelated Zinc (Zn-EDTA) 12.0% Min',
    targetCrops: ['Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Vegetables'],
    benefits: ['Rapid cure for Zinc chlorosis', 'Stimulates chlorophyll synthesis', 'Enhances grain size & protein synthesis'],
    packagingSizes: ['100g', '250g', '500g', '1 Kg'],
    images: ['/images/products/sai-zinc-chelate.jpg']
  },
  {
    _id: '4',
    name: 'Sai Humic-King (98% Potassium Humate)',
    slug: 'sai-humic-king',
    category: 'Soil Conditioners & Humic Formulations',
    tagline: 'Shiny humic flakes for white root multiplication and soil aeration',
    description: '100% soluble potassium humate and fulvic acid for rapid soil conditioning.',
    composition: 'Potassium Humate 98% (Humic Acid 70% + Fulvic Acid 15%)',
    targetCrops: ['All Crops', 'Sugarcane', 'Paddy', 'Potato', 'Vegetables'],
    benefits: ['Increases soil Cation Exchange Capacity (CEC)', 'Expands feeder root biomass up to 3x', 'Retains soil moisture in drought conditions'],
    packagingSizes: ['500g', '1 Kg', '5 Kg', '25 Kg'],
    images: ['/images/products/sai-humic-king.jpg']
  },
  {
    _id: '5',
    name: 'Sai Bio-Shield (Trichoderma Viride)',
    slug: 'sai-bio-shield',
    category: 'Bio-Fungicides & Crop Protectors',
    tagline: 'Biological defense against damping off, root rot & Fusarium wilt',
    description: 'Eco-friendly fungal antagonist that colonizes the rhizosphere against soil pathogens.',
    composition: 'Trichoderma viride 1.5% W.P. (2x10^6 CFU/g)',
    targetCrops: ['Chilli', 'Tomato', 'Paddy', 'Cotton', 'Sugarcane', 'Pulses'],
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
    description: 'Live mycorrhizal bio-granules for 100x nutrient and moisture absorption.',
    composition: 'Vesicular Arbuscular Mycorrhiza (100 IP/gm)',
    targetCrops: ['Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Soybean'],
    benefits: ['Extends root absorption surface area 100x', 'Enhances drought & salinity tolerance', 'Improves uptake of Phosphorus & Zinc'],
    packagingSizes: ['4 Kg', '8 Kg', '25 Kg'],
    images: ['/images/products/sai-myco-gold.jpg']
  }
];

const defaultCategoriesList = [
  'All Categories',
  'Bio-Fertilizers & Inoculants',
  'Plant Growth Regulators & Promoters',
  'Chelated Micronutrients',
  'Bio-Fungicides & Crop Protectors',
  'Soil Conditioners & Humic Formulations',
  'Specialty Bio-Granules',
];

const targetCropsList = [
  'All Crops',
  'Paddy',
  'Wheat',
  'Sugarcane',
  'Cotton',
  'Maize',
  'Tomato',
  'Chilli',
  'Potato',
  'Pomegranate',
  'Mango',
  'Vegetables',
];

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';

  const [products, setProducts] = useState<ProductItem[]>(fallbackCatalog);
  const [categoriesList, setCategoriesList] = useState<string[]>(defaultCategoriesList);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/categories', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          const names = data.categories.map((c: any) => c.name);
          setCategoriesList(['All Categories', ...names]);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedCrop, searchQuery]);

  async function fetchProducts() {
    setLoading(true);
    try {
      let url = `/api/products?limit=50`;
      if (selectedCategory && selectedCategory !== 'All Categories') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (selectedCrop && selectedCrop !== 'All Crops') {
        url += `&crop=${encodeURIComponent(selectedCrop)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        if (data.products.length > 0) {
          setProducts(data.products);
        } else {
          if (selectedCategory !== 'All Categories' || selectedCrop !== 'All Crops' || searchQuery.trim()) {
            setProducts([]);
          } else {
            setProducts(fallbackCatalog);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleQuoteClick = (prodName: string) => {
    setQuoteProduct(prodName);
    setIsQuoteOpen(true);
  };

  return (
    <div className={`min-h-screen py-10 sm:py-14 transition-colors duration-300 ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5" /> 
            <span>{isHindi ? '100% जैविक व जैव-प्रमाणित पोर्टफोलियो' : '100% Bio-Certified Product Catalog'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {isHindi ? 'उच्च गुणवत्ता वाले जैविक कृषि उत्पाद' : 'High-Performance Agricultural Formulations'}
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {isHindi 
              ? 'बंपर पैदावार, संतुलित फसल पोषण और दीर्घकालिक मृदा उर्वरता के लिए तैयार किए गए उत्पाद।' 
              : 'Scientifically engineered to unlock soil nutrients, accelerate vegetative and root growth, and maximize crop yields.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className={`p-4 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
          isLight ? 'bg-white border-emerald-200' : 'bg-[#081f12] border-emerald-700/60'
        }`}>
          {/* Search & Top Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isHindi ? 'उत्पाद का नाम, तकनीकी संघटक या फसल खोजें...' : 'Search by formulation name, composition, or target crop...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium focus:outline-none transition ${
                  isLight 
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600' 
                    : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none transition ${
                  isLight 
                    ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-600' 
                    : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                }`}
              >
                {targetCropsList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {(selectedCategory !== 'All Categories' || selectedCrop !== 'All Crops' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSelectedCrop('All Crops');
                    setSearchQuery('');
                  }}
                  className={`p-3 rounded-2xl border transition flex-shrink-0 ${
                    isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-lime-400 border-emerald-800'
                  }`}
                  title="Reset Filters"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex overflow-x-auto no-scrollbar pb-1 gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? isLight 
                      ? 'bg-emerald-700 text-white shadow-md' 
                      : 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md'
                    : isLight 
                      ? 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800' 
                      : 'bg-[#0b2917] text-slate-300 hover:text-white border border-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-400 font-bold">{isHindi ? 'उत्पाद लोड हो रहे हैं...' : 'Loading Bio-Formulations...'}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 text-lime-400 flex items-center justify-center mx-auto border border-emerald-800">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
              {isHindi ? 'कोई उत्पाद नहीं मिला' : 'No Formulations Found'}
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              {isHindi ? 'कृपया अन्य श्रेणी या फसल का चयन करें।' : 'Try modifying your search filter or category selection.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((prod) => (
              <div
                key={prod._id}
                className={`rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border shadow-lg hover:shadow-2xl hover:-translate-y-1 ${
                  isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
                }`}
              >
                {/* Product Image & Badge */}
                <div className={`relative aspect-[4/3] overflow-hidden flex items-center justify-center p-6 ${
                  isLight ? 'bg-emerald-50/60' : 'bg-[#040e07]'
                }`}>
                  <img
                    src={prod.images && prod.images[0] ? prod.images[0] : '/images/products/sai-grow-max.jpg'}
                    alt={prod.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('sai-grow-max.jpg')) {
                        target.src = '/images/products/sai-grow-max.jpg';
                      }
                    }}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black shadow-md ${
                      isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
                    }`}>
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
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
                        <strong className={isLight ? 'text-emerald-800 font-bold' : 'text-lime-300 font-bold'}>
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

                {/* Actions */}
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
        )}

      </div>

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
