import React from 'react';
import HeroVideoBanner from '@/components/home/HeroVideoBanner';
import ProductCategoriesSection from '@/components/home/ProductCategoriesSection';
import CropAdvisor from '@/components/home/CropAdvisor';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import VideoShowcaseSection from '@/components/home/VideoShowcaseSection';
import DosageCalculatorSection from '@/components/home/DosageCalculatorSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AgronomyBlogsSection from '@/components/home/AgronomyBlogsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with Video Background & Quick Stats */}
      <HeroVideoBanner />

      {/* 2. Product Categories Showcase */}
      <ProductCategoriesSection />

      {/* 3. Interactive Crop Schedule & Nutrition Advisor */}
      <CropAdvisor />

      {/* 4. Flagship Bio-Products Grid */}
      <FeaturedProductsSection />

      {/* 5. Cloudinary Videos & Factory Tour Showcase */}
      <VideoShowcaseSection />

      {/* 6. Farmer Dosage & Land Area Calculator */}
      <DosageCalculatorSection />

      {/* 7. Why Sai Agro Industries & Quality Assurance */}
      <WhyChooseUsSection />

      {/* 8. Verified Farmer Testimonials */}
      <TestimonialsSection />

      {/* 9. Agronomy Knowledge Articles */}
      <AgronomyBlogsSection />
    </div>
  );
}
