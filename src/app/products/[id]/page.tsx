'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  Sprout, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  MessageSquare, 
  ArrowLeft, 
  Download, 
  Layers, 
  ShieldCheck, 
  Droplet,
  ChevronRight,
  PhoneCall,
  Calculator,
  Award,
  Zap,
  Leaf
} from 'lucide-react';
import QuickQuoteModal from '@/components/ui/QuickQuoteModal';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  category: string;
  subCategory?: string;
  tagline: string;
  description: string;
  composition: string;
  targetCrops: string[];
  benefits: string[];
  dosageAndApplication: {
    foliarSpray?: string;
    dripIrrigation?: string;
    soilApplication?: string;
    seedTreatment?: string;
  };
  packagingSizes: string[];
  images: string[];
  isFeatured?: boolean;
}

const productDatabase: Record<string, ProductDetail> = {
  'sai-grow-max': {
    _id: 'sai-grow-max',
    slug: 'sai-grow-max',
    name: 'Sai Grow-Max (Bio-Stimulant & Plant Growth Regulator)',
    category: 'Plant Growth Regulators & Promoters',
    subCategory: 'Bio-Stimulant & PGR',
    tagline: 'Premium L-Amino acids + Ascophyllum Nodosum Seaweed Marine Extract',
    description: 'Sai Grow-Max is an advanced bio-stimulant engineered from cold-water arctic Ascophyllum Nodosum seaweed extract fortified with 18 essential free L-amino acids, betaines, and natural cytokinins. It accelerates chlorophyll synthesis, stops blossom/flower shedding, promotes explosive flowering clusters, and improves fruit sizing by 25-35%.',
    composition: 'Seaweed Extract (Ascophyllum Nodosum) 20% w/w + Free L-Amino Acids 10% w/w + Fulvic Acids 5%',
    targetCrops: ['Chilli', 'Tomato', 'Cotton', 'Paddy', 'Wheat', 'Sugarcane', 'Pomegranate', 'Mango', 'Banana', 'Soybean', 'Vegetables'],
    benefits: [
      'Dramatically reduces flower and young fruit dropping during hot or cold weather stress',
      'Enhances photosynthetic rate and rapid leaf canopy expansion',
      'Multiplies flowering branches, productive tillers, and fruit set percentage',
      'Improves fruit uniform size, vibrant color, lustrous skin, and higher Brix sugar content',
      '100% natural, eco-friendly, zero chemical residue, safe for export-grade horticulture',
    ],
    dosageAndApplication: {
      foliarSpray: '2.0 to 2.5 ml per litre of water (250-300 ml per acre in 150L water). Apply 1st spray at vegetative/pre-flowering stage, 2nd spray at fruit/pod setting stage.',
      dripIrrigation: '500 ml to 1 Litre per acre through drip fertigation during vegetative and fruit sizing stages.',
      soilApplication: 'Mix 1 Litre per acre with 100 kg well-decomposed organic manure or vermicompost.',
      seedTreatment: '5 ml per kg seed for 15 minutes before sowing for rapid seedling emergence.',
    },
    packagingSizes: ['100 ml', '250 ml', '500 ml', '1 Litre', '5 Litres'],
    images: [
      '/images/products/sai-grow-max.jpg',
      '/images/products/product-2.jpg',
      '/images/products/sai-agro-banner.jpg'
    ]
  },
  'sai-bio-phos': {
    _id: 'sai-bio-phos',
    slug: 'sai-bio-phos',
    name: 'Sai Bio-Phos (Phosphorus Solubilizing Bio-Fertilizer)',
    category: 'Bio-Fertilizers & Inoculants',
    subCategory: 'Microbial Bio-Inoculant',
    tagline: 'Unlocks fixed soil phosphorus for explosive feeder root proliferation',
    description: 'Sai Bio-Phos is a specialized liquid microbial biofertilizer containing high-density strains of Bacillus megaterium. It solubilizes insoluble organic and inorganic phosphates into plant-available orthophosphate ions, saving synthetic DAP expenses by up to 30%.',
    composition: 'Bacillus megaterium (CFU count: 1 x 10^9 cells/ml minimum)',
    targetCrops: ['Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Potato', 'Pulses', 'Oilseeds'],
    benefits: [
      'Solubilizes 25-30 kg of fixed soil phosphorus per hectare naturally',
      'Stimulates deeper tap roots and dense white feeder root networks',
      'Reduces chemical DAP / SSP fertilizer requirement by 25-30%',
      'Improves seedling vigor, soil aeration, and long-term soil microbiome health',
    ],
    dosageAndApplication: {
      foliarSpray: 'Not recommended for foliar application.',
      dripIrrigation: '1 to 2 Litres per acre with regular irrigation water.',
      soilApplication: 'Mix 2 Litres with 100 kg organic manure / FYM and broadcast per acre before sowing.',
      seedTreatment: '10-20 ml per kg seed before sowing.',
    },
    packagingSizes: ['500 ml', '1 Litre', '5 Litres', '20 Litres Drum'],
    images: [
      '/images/products/sai-bio-phos.jpg',
      '/images/products/product-1.jpg'
    ]
  },
  'sai-zinc-chelate': {
    _id: 'sai-zinc-chelate',
    slug: 'sai-zinc-chelate',
    name: 'Sai Zinc-Chelate 12% (EDTA Chelated Micronutrient)',
    category: 'Chelated Micronutrients',
    subCategory: 'Chelated Micronutrient',
    tagline: '100% Water Soluble EDTA Chelated Zinc for Rapid Stomatal Uptake',
    description: 'Sai Zinc-Chelate contains 12% Zinc in full EDTA chelation, preventing rapid precipitation in alkaline calcareous soils. Essential for auxin hormone production, internodal stem elongation, and curing Khaira disease in paddy.',
    composition: 'Chelated Zinc (Zn-EDTA) 12.0% min (w/w)',
    targetCrops: ['Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Citrus', 'Tomato', 'Chilli', 'Cotton'],
    benefits: [
      'Immediate stomatal absorption into leaf tissue within 2-3 hours of spray',
      'Rapidly prevents and cures Zinc chlorosis (yellowing between leaf veins)',
      'Boosts protein synthesis, enzyme activation, and panicle length',
      'Fully compatible with non-alkaline bio-fungicides and micronutrient mixtures',
    ],
    dosageAndApplication: {
      foliarSpray: '1.0 to 1.5 grams per litre of water (150-200 grams per acre in 150L water).',
      dripIrrigation: '500 grams to 1 kg per acre.',
      soilApplication: 'Mix 500g per acre with organic compost during land preparation.',
      seedTreatment: 'Not required.',
    },
    packagingSizes: ['100 g', '250 g', '500 g', '1 Kg', '25 Kg Bag'],
    images: [
      '/images/products/sai-zinc-chelate.jpg',
      '/images/products/product-3.jpg'
    ]
  },
  'sai-zinc-chelate-12': {
    _id: 'sai-zinc-chelate-12',
    slug: 'sai-zinc-chelate-12',
    name: 'Sai Zinc-Chelate 12% (EDTA Chelated Micronutrient)',
    category: 'Chelated Micronutrients',
    subCategory: 'Chelated Micronutrient',
    tagline: '100% Water Soluble EDTA Chelated Zinc for Rapid Stomatal Uptake',
    description: 'Sai Zinc-Chelate contains 12% Zinc in full EDTA chelation, preventing rapid precipitation in alkaline calcareous soils. Essential for auxin hormone production, internodal stem elongation, and curing Khaira disease in paddy.',
    composition: 'Chelated Zinc (Zn-EDTA) 12.0% min (w/w)',
    targetCrops: ['Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Citrus', 'Tomato', 'Chilli', 'Cotton'],
    benefits: [
      'Immediate stomatal absorption into leaf tissue within 2-3 hours of spray',
      'Rapidly prevents and cures Zinc chlorosis (yellowing between leaf veins)',
      'Boosts protein synthesis, enzyme activation, and panicle length',
      'Fully compatible with non-alkaline bio-fungicides and micronutrient mixtures',
    ],
    dosageAndApplication: {
      foliarSpray: '1.0 to 1.5 grams per litre of water (150-200 grams per acre in 150L water).',
      dripIrrigation: '500 grams to 1 kg per acre.',
      soilApplication: 'Mix 500g per acre with organic compost during land preparation.',
      seedTreatment: 'Not required.',
    },
    packagingSizes: ['100 g', '250 g', '500 g', '1 Kg', '25 Kg Bag'],
    images: [
      '/images/products/sai-zinc-chelate.jpg',
      '/images/products/product-3.jpg'
    ]
  },
  'sai-humic-king': {
    _id: 'sai-humic-king',
    slug: 'sai-humic-king',
    name: 'Sai Humic-King (98% Potassium Humate Shiny Flakes)',
    category: 'Soil Conditioners & Humic Formulations',
    subCategory: 'Organic Soil Vitalizer',
    tagline: '100% Water Soluble Shiny Flakes for Rapid Root Multiplication & Soil Health',
    description: 'Sai Humic-King is a premium grade 98% potassium humate extracted from high-grade leonardite. It conditions hard saline soils, enhances soil Cation Exchange Capacity (CEC), and stimulates white feeder root mass up to 3x.',
    composition: 'Potassium Humate 98% (Humic Acid 70% + Fulvic Acid 15% + K2O 10%)',
    targetCrops: ['All Field Crops', 'Sugarcane', 'Paddy', 'Potato', 'Vegetables', 'Banana', 'Pomegranate'],
    benefits: [
      'Multiplies white root mass and mycorrhizal colonization',
      'Increases soil water holding capacity and buffers against drought stress',
      'Unlocks bound soil micronutrients (Iron, Zinc, Calcium) for easy plant uptake',
      'Conditioning hard compacted soil into loose, crumbly fertile earth',
    ],
    dosageAndApplication: {
      foliarSpray: '1.0 to 1.5 grams per litre of water during vegetative growth.',
      dripIrrigation: '500 grams to 1 kg per acre through drip irrigation.',
      soilApplication: 'Mix 1 to 2 kg per acre with compost or basal fertilizers.',
      seedTreatment: '5 grams per kg seed for improved germination.',
    },
    packagingSizes: ['500 g', '1 Kg', '5 Kg Bucket', '25 Kg Drum'],
    images: [
      '/images/products/sai-humic-king.jpg',
      '/images/products/product-5.jpg'
    ]
  },
  'sai-bio-shield': {
    _id: 'sai-bio-shield',
    slug: 'sai-bio-shield',
    name: 'Sai Bio-Shield (Trichoderma Viride Bio-Fungicide)',
    category: 'Bio-Fungicides & Crop Protectors',
    subCategory: 'Biological Antagonist',
    tagline: 'Natural fungal predator controlling soil & seed-borne pathogens',
    description: 'Sai Bio-Shield is a high-potency biological fungicide formulated with Trichoderma viride. It controls damping-off, root rot, collar rot, and Fusarium wilt through competitive hyperparasitism and antibiotic enzyme secretion.',
    composition: 'Trichoderma viride 1.5% W.P. (CFU count: 2 x 10^6 spores/gm min)',
    targetCrops: ['Chilli', 'Cotton', 'Ginger', 'Turmeric', 'Paddy', 'Pulses', 'Tomato', 'Soybean'],
    benefits: [
      'Effective biological control against Fusarium, Pythium, Rhizoctonia, and Phytophthora',
      'Colonizes root surfaces, creating a protective living biological shield',
      'Induces Systemic Acquired Resistance (SAR) inside the plant',
      '100% organic, zero chemical residue, completely safe for soil ecology',
    ],
    dosageAndApplication: {
      foliarSpray: '5 grams per litre of water at first sign of foliar fungal spots.',
      dripIrrigation: '1 kg to 2 kg per acre through drip system.',
      soilApplication: 'Mix 2.5 kg with 100 kg well-decomposed manure, incubate for 7 days in shade, and broadcast per acre.',
      seedTreatment: '10 grams per kg seed before planting.',
    },
    packagingSizes: ['500 g', '1 Kg', '5 Kg Bucket', '25 Kg Drum'],
    images: [
      '/images/products/sai-bio-shield.jpg',
      '/images/products/product-4.jpg'
    ]
  },
  'sai-myco-gold': {
    _id: 'sai-myco-gold',
    slug: 'sai-myco-gold',
    name: 'Sai Myco-Gold (VAM Mycorrhizal Bio-Granules)',
    category: 'Specialty Bio-Granules',
    subCategory: 'Mycorrhizal Inoculant',
    tagline: 'Endo-Mycorrhizal Encapsulated Bio-Granules for 100x Root Surface Reach',
    description: 'Sai Myco-Gold contains live Vesicular Arbuscular Mycorrhiza (VAM) spores encapsulated in bentonite granules. Extends the foraging area of plant roots deep into soil strata for enhanced moisture and phosphorus mining.',
    composition: 'Vesicular Arbuscular Mycorrhiza (100 IP/gm) with organic humate carrier',
    targetCrops: ['Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Soybean', 'Horticulture & Fruit Orchards'],
    benefits: [
      'Expands root surface area up to 100 times into deeper soil layers',
      'Enhances uptake of immobile nutrients like Phosphorus, Zinc, and Boron',
      'Increases crop drought resistance and tolerance to salinity',
      'Reduces chemical fertilizer loss from leaching by 20-30%',
    ],
    dosageAndApplication: {
      foliarSpray: 'Not applicable (Granular soil formulation).',
      dripIrrigation: 'Not applicable (Granular formulation).',
      soilApplication: '4 kg per acre mixed with basal fertilizer or compost at sowing/planting time.',
      seedTreatment: 'Not required.',
    },
    packagingSizes: ['4 Kg Bag', '8 Kg Bucket', '25 Kg Drum'],
    images: [
      '/images/products/sai-myco-gold.jpg',
      '/images/products/product-6.jpg'
    ]
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || '';

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      setLoading(true);

      // 1. Check fallback database first by normalized slug/id
      const normalizedKey = id.toLowerCase().trim();
      let matchedFallback = productDatabase[normalizedKey];

      // Handle numeric IDs or partial matches
      if (!matchedFallback) {
        if (normalizedKey === '1') matchedFallback = productDatabase['sai-bio-phos'];
        else if (normalizedKey === '2') matchedFallback = productDatabase['sai-grow-max'];
        else if (normalizedKey === '3') matchedFallback = productDatabase['sai-zinc-chelate'];
        else if (normalizedKey === '4') matchedFallback = productDatabase['sai-humic-king'];
        else if (normalizedKey === '5') matchedFallback = productDatabase['sai-bio-shield'];
        else if (normalizedKey === '6') matchedFallback = productDatabase['sai-myco-gold'];
        else if (normalizedKey.includes('grow-max')) matchedFallback = productDatabase['sai-grow-max'];
        else if (normalizedKey.includes('bio-phos')) matchedFallback = productDatabase['sai-bio-phos'];
        else if (normalizedKey.includes('zinc')) matchedFallback = productDatabase['sai-zinc-chelate'];
        else if (normalizedKey.includes('humic')) matchedFallback = productDatabase['sai-humic-king'];
        else if (normalizedKey.includes('shield')) matchedFallback = productDatabase['sai-bio-shield'];
        else if (normalizedKey.includes('myco')) matchedFallback = productDatabase['sai-myco-gold'];
      }

      // 2. Try fetching from MongoDB API
      try {
        const res = await fetch(`/api/products/${id}`, { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.images?.[0] || '');
          setRelatedProducts(data.relatedProducts || Object.values(productDatabase).filter(p => p.slug !== data.product.slug).slice(0, 3));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API fetch fell back to local product definition:', err);
      }

      // 3. Set fallback if API did not return
      if (matchedFallback) {
        setProduct(matchedFallback);
        setSelectedImage(matchedFallback.images[0]);
        setRelatedProducts(Object.values(productDatabase).filter(p => p.slug !== matchedFallback.slug).slice(0, 3));
      } else {
        // Default to Sai Grow-Max if completely unrecognized
        const defaultProd = productDatabase['sai-grow-max'];
        setProduct(defaultProd);
        setSelectedImage(defaultProd.images[0]);
        setRelatedProducts(Object.values(productDatabase).filter(p => p.slug !== 'sai-grow-max').slice(0, 3));
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <div className={`py-28 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4 ${
        isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
      }`}>
        <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-bold">
          {isHindi ? 'उत्पाद विवरण एवं खुराक सारणी लोड हो रही है...' : 'Fetching product formulation and dosage data...'}
        </p>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/7856057415?text=${encodeURIComponent(
    `Hello Sai Agro Industries! I want quotation and dosage guidance for ${product.name}.`
  )}`;

  return (
    <div className={`py-10 sm:py-14 min-h-screen transition-colors duration-300 ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-emerald-500 font-bold transition">{t('navHome')}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <Link href="/products" className="hover:text-emerald-500 font-bold transition">{t('navProducts')}</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-emerald-600 dark:text-lime-400 font-black truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Column: Image Preview Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`relative aspect-square rounded-3xl border overflow-hidden p-6 sm:p-8 flex items-center justify-center shadow-2xl transition ${
              isLight ? 'bg-white border-emerald-200' : 'bg-[#06150b] border-emerald-700/60'
            }`}>
              <img
                src={selectedImage || '/images/products/sai-grow-max.jpg'}
                alt={product.name}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('sai-grow-max.jpg')) {
                    target.src = '/images/products/sai-grow-max.jpg';
                  }
                }}
                className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 left-4">
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg ${
                  isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
                }`}>
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Selector */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl border p-2 flex-shrink-0 transition ${
                      selectedImage === img 
                        ? 'border-lime-400 scale-105 shadow-md ring-2 ring-emerald-500' 
                        : isLight ? 'bg-white border-slate-200 opacity-70 hover:opacity-100' : 'bg-[#040e07] border-emerald-950 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt="thumb" 
                      onError={(e) => {
                        e.currentTarget.src = '/images/products/sai-grow-max.jpg';
                      }}
                      className="w-full h-full object-contain" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {product.subCategory || (isHindi ? 'कृषि जैव-इनपुट' : 'Agricultural Bio-Input')}
              </span>
              <h1 className={`text-2xl sm:text-4xl font-black tracking-tight mt-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-lime-400 font-bold mt-2 leading-snug">
                {product.tagline}
              </p>
            </div>

            {/* Chemical / Biological Composition Box */}
            {product.composition && (
              <div className={`p-4 rounded-2xl border space-y-1 ${
                isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-[#07190e] border-emerald-800/80'
              }`}>
                <div className={`text-xs font-black uppercase tracking-wider ${
                  isLight ? 'text-emerald-800' : 'text-lime-400'
                }`}>
                  {isHindi ? 'सक्रिय संघटक एवं संरचना:' : 'Active Formulation & Technical Composition:'}
                </div>
                <div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {product.composition}
                </div>
              </div>
            )}

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {product.description}
            </p>

            {/* Packaging Sizes */}
            {product.packagingSizes && product.packagingSizes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {isHindi ? 'उपलब्ध पैकेजिंग आकार:' : 'Standard Packaging Available:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.packagingSizes.map((pack) => (
                    <span
                      key={pack}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-black ${
                        isLight 
                          ? 'bg-white border-emerald-200 text-emerald-900 shadow-sm' 
                          : 'bg-emerald-950 border-emerald-800 text-lime-300'
                      }`}
                    >
                      {pack}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Target Crops Tags */}
            {product.targetCrops && product.targetCrops.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {isHindi ? 'अनुशंसित फसलें:' : 'Recommended Target Crops:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.targetCrops.map((crop) => (
                    <span
                      key={crop}
                      className={`px-3 py-1 rounded-xl border text-xs font-bold ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-800' 
                          : 'bg-[#040e07] border-emerald-900 text-slate-200'
                      }`}
                    >
                      🌾 {crop}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" /> 
                <span>{isHindi ? 'मूल्य कोटेशन एवं सैंपल मांगें' : 'Request Price & Sample Kit'}</span>
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" /> 
                <span>{isHindi ? 'व्हाट्सएप पर बात करें' : 'Inquire on WhatsApp'}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Benefits & Dosage Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-emerald-900/60">
          
          {/* Key Agronomic Benefits */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#081f12] border-emerald-700/60'
          }`}>
            <h3 className={`text-xl font-black flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Sparkles className="w-5 h-5 text-lime-400" /> 
              <span>{isHindi ? 'प्रमुख कृषि लाभ एवं विशेषताएं' : 'Key Agronomic Benefits'}</span>
            </h3>
            <ul className={`space-y-3 text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {product.benefits?.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-lime-400 flex-shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comprehensive Dosage & Application Instructions */}
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4 ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#081f12] border-emerald-700/60'
          }`}>
            <h3 className={`text-xl font-black flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              <Droplet className="w-5 h-5 text-lime-400" /> 
              <span>{isHindi ? 'अनुशंसित खुराक एवं प्रयोग विधि' : 'Recommended Dosage & Application Guide'}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              {product.dosageAndApplication?.foliarSpray && (
                <div className={`p-4 rounded-2xl border space-y-1 ${
                  isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
                }`}>
                  <strong className="text-emerald-700 dark:text-lime-400 block font-black text-xs uppercase tracking-wider">
                    🌿 {isHindi ? 'पर्णीय छिड़काव (Foliar Spray):' : 'Foliar Spray:'}
                  </strong>
                  <span className={`leading-relaxed block font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {product.dosageAndApplication.foliarSpray}
                  </span>
                </div>
              )}

              {product.dosageAndApplication?.dripIrrigation && (
                <div className={`p-4 rounded-2xl border space-y-1 ${
                  isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
                }`}>
                  <strong className="text-emerald-700 dark:text-lime-400 block font-black text-xs uppercase tracking-wider">
                    💧 {isHindi ? 'ड्रिप सिंचाई (Drip Fertigation):' : 'Drip Fertigation:'}
                  </strong>
                  <span className={`leading-relaxed block font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {product.dosageAndApplication.dripIrrigation}
                  </span>
                </div>
              )}

              {product.dosageAndApplication?.soilApplication && (
                <div className={`p-4 rounded-2xl border space-y-1 ${
                  isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
                }`}>
                  <strong className="text-emerald-700 dark:text-lime-400 block font-black text-xs uppercase tracking-wider">
                    🌱 {isHindi ? 'मिट्टी / बेसल प्रयोग (Soil Application):' : 'Soil / Basal Application:'}
                  </strong>
                  <span className={`leading-relaxed block font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {product.dosageAndApplication.soilApplication}
                  </span>
                </div>
              )}

              {product.dosageAndApplication?.seedTreatment && (
                <div className={`p-4 rounded-2xl border space-y-1 ${
                  isLight ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
                }`}>
                  <strong className="text-emerald-700 dark:text-lime-400 block font-black text-xs uppercase tracking-wider">
                    🌾 {isHindi ? 'बीज उपचार (Seed Treatment):' : 'Seed Treatment:'}
                  </strong>
                  <span className={`leading-relaxed block font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {product.dosageAndApplication.seedTreatment}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Related Category Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className={`text-xl sm:text-2xl font-black ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {isHindi ? 'अन्य अनुशंसित उत्पाद' : 'Other Recommended Formulations'}
              </h3>
              <Link href="/products" className="text-xs font-black text-emerald-600 dark:text-lime-400 hover:underline flex items-center gap-1">
                {isHindi ? 'सभी देखें' : 'View All'} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/products/${rel.slug || rel._id}`}
                  className={`rounded-3xl p-5 border transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                    isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-800/60'
                  }`}
                >
                  <div className={`aspect-video rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-3 ${
                    isLight ? 'bg-emerald-50/60' : 'bg-[#040e07]'
                  }`}>
                    {rel.images?.[0] ? (
                      <img src={rel.images[0]} alt={rel.name} className="w-full h-full object-contain" />
                    ) : (
                      <Layers className="w-8 h-8 text-lime-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">
                      {rel.category}
                    </span>
                    <h4 className={`text-base font-black transition line-clamp-1 mt-0.5 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-medium">
                      {rel.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <QuickQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultProduct={product.name}
      />
    </div>
  );
}
