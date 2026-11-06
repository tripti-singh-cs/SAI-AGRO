import React from 'react';
import CropAdvisor from '@/components/home/CropAdvisor';
import Link from 'next/link';
import { Sprout, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Crop Solutions & Nutrition Schedules | SAI AGRO INDUSTRIES',
  description: 'Stage-by-stage agronomic nutrient management guides for Paddy, Wheat, Sugarcane, Cotton, Vegetables, and Fruit orchards.',
};

export default function SolutionsPage() {
  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-lime-400 text-xs font-bold border border-emerald-800 mb-4">
            <Sprout className="w-3.5 h-3.5" /> Agronomy Advisory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scientific Crop Nutrition Schedules
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Detailed guidance for sowing, tillering, flowering, and grain filling to maximize yield and eliminate plant stress.
          </p>
        </div>

        {/* Interactive Advisor Tool */}
        <CropAdvisor />

        {/* 4 Pillars of Sai Agro Crop Care */}
        <div className="pt-10 border-t border-emerald-950">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              The 4 Pillars of Crop Yield Optimization
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our systematic approach eliminates nutrient deficiency and strengthens plant immunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-950 text-lime-400 font-extrabold flex items-center justify-center border border-emerald-800">
                1
              </span>
              <h4 className="text-lg font-bold text-white">Seed & Soil Inoculation</h4>
              <p className="text-xs text-slate-300">
                Protect emerging sprouts from fungal damping-off and unlock insoluble soil minerals from day 1.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-950 text-lime-400 font-extrabold flex items-center justify-center border border-emerald-800">
                2
              </span>
              <h4 className="text-lg font-bold text-white">Rapid Vegetative Surge</h4>
              <p className="text-xs text-slate-300">
                Apply chelated Zinc and Potassium Humate to expand fibrous root volume and leaf canopy.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-950 text-lime-400 font-extrabold flex items-center justify-center border border-emerald-800">
                3
              </span>
              <h4 className="text-lg font-bold text-white">Flower & Fruit Retention</h4>
              <p className="text-xs text-slate-300">
                Seaweed and L-Amino bio-stimulants prevent flower shedding during extreme heat or dry spells.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-950 text-lime-400 font-extrabold flex items-center justify-center border border-emerald-800">
                4
              </span>
              <h4 className="text-lg font-bold text-white">Dense Grain / Fruit Sizing</h4>
              <p className="text-xs text-slate-300">
                Liquid Calcium and Boron ensure uniform ripening, premium luster, and long shelf life.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
