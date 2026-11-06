import React from 'react';
import { Microscope, ShieldCheck, Award, CheckCircle2, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'R&D & Quality Control | SAI AGRO INDUSTRIES',
  description: 'Inside our advanced microbiology laboratory, rigorous quality control testing, and verified field trials.',
};

export default function RndPage() {
  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-lime-400 text-xs font-bold border border-emerald-800 mb-4">
            <Microscope className="w-3.5 h-3.5" /> Innovation & Science
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Research, Development & Quality Assurance
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Where biological innovation meets rigorous agricultural standards to develop reliable, high-yield formulations.
          </p>
        </div>

        {/* Hero Feature Box */}
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-emerald-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Sterile Fermentation & Microbial Longevity
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Maintaining high viable bacterial cell counts (CFU) over prolonged shelf life is the primary challenge in bio-fertilizers. 
                Sai Agro Industries utilizes proprietary osmoprotectant carriers and vacuum packaging that guarantee over 1 x 10^8 CFU/ml vitality for up to 12 months.
              </p>

              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Pure strain isolation without pathogenic contamination</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Complete chelation testing to ensure 100% water solubility</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Real multi-season microplot field trials before commercial launch</span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/60">
              <img
                src="/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg"
                alt="Sai Agro R&D Microbiology Testing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Steps Quality Process */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              3-Tier Quality Validation Process
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every single batch of bio-fertilizer and micronutrient is tested across three distinct checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center font-bold text-lg border border-emerald-800">
                01
              </div>
              <h4 className="text-xl font-bold text-white">Raw Material Bio-Assay</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Imported seaweed concentrates, amino acids, and carrier peat are tested for heavy metal limits (Lead, Cadmium, Arsenic) and microbial baseline purity.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center font-bold text-lg border border-emerald-800">
                02
              </div>
              <h4 className="text-xl font-bold text-white">In-Process Fermentation Monitoring</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Automated dissolved oxygen (DO), pH, and temperature telemetry continuously optimize exponential growth phase of beneficial bacterial cultures.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center font-bold text-lg border border-emerald-800">
                03
              </div>
              <h4 className="text-xl font-bold text-white">Finished Batch Certificate of Analysis (COA)</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Prior to dispatch, random sample bottles from every batch are tested for CFU counts, physical stability, and active percentage compliance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
