'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Send, 
  CheckCircle2, 
  Users, 
  Truck,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function DealersPage() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  const [formData, setFormData] = useState({
    businessName: '',
    applicantName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    city: '',
    pincode: '',
    gstNumber: '',
    experienceYears: '3-5 Years',
    annualTurnover: '₹50 Lakhs - ₹1 Crore',
    existingBrands: '',
    warehouseArea: '',
    preferredProducts: [] as string[],
    comments: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const productCategoriesList = [
    'Bio-Fertilizers & Inoculants',
    'Plant Growth Regulators & Promoters',
    'Chelated Micronutrients',
    'Bio-Fungicides & Biopesticides',
    'Potassium Humate Flakes',
    'Specialty Bio-Granules',
  ];

  const handleCheckboxToggle = (cat: string) => {
    if (formData.preferredProducts.includes(cat)) {
      setFormData({
        ...formData,
        preferredProducts: formData.preferredProducts.filter((p) => p !== cat),
      });
    } else {
      setFormData({
        ...formData,
        preferredProducts: [...formData.preferredProducts, cat],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/dealers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        if (typeof window !== 'undefined') {
          try {
            const confetti = (await import('canvas-confetti')).default as any;
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 90,
                spread: 70,
                origin: { y: 0.6 },
              });
            }
          } catch {}
        }
      } else {
        setError(data.error || (isHindi ? 'डीलर आवेदन भेजने में विफल।' : 'Failed to submit dealer application.'));
      }
    } catch {
      setError(isHindi ? 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#0b1b11] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-lime-400 text-xs font-bold border border-emerald-800 mb-4">
            <Building2 className="w-3.5 h-3.5" /> B2B Partner Network
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Become an Authorized Sai Agro Distributor
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Partner with India’s rapidly growing agricultural bio-tech manufacturer. Expand your product line with high-demand organic inputs.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Lucrative Margins</h4>
            <p className="text-xs text-slate-300">Industry-leading distributor margins with quarterly volume incentives and bonuses.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Territory Protection</h4>
            <p className="text-xs text-slate-300">Exclusive distribution rights in designated tehsil / district zones.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Farmer Camp Support</h4>
            <p className="text-xs text-slate-300">Company agronomists organize live farmer meetings, demos, and soil test drives.</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Guaranteed Supply</h4>
            <p className="text-xs text-slate-300">Fast batch dispatches with complete transport assistance across 18+ states.</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel p-8 sm:p-12 border border-emerald-500/30 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-lime-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">Application Successfully Submitted!</h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Thank you for applying, <span className="text-lime-400 font-bold">{formData.applicantName}</span> ({formData.businessName}). 
                Our Regional Sales Manager will review your credentials and contact you within 24-48 business hours with the dealership onboarding agreement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Distributorship / Dealership Application</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Please fill in your business and territorial information accurately.</p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs">
                  {error}
                </div>
              )}

              {/* 1. Business & Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 border-b border-emerald-900/60 pb-2">
                  1. Business & Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Business / Firm / Shop Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kisan Agro Kendra / Sharma Krishi Seva"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Applicant / Proprietor Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar Sharma"
                      value={formData.applicantName}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@kisanagrokendra.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Territorial Location */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 border-b border-emerald-900/60 pb-2">
                  2. Territorial Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">District / City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune / Baramati"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 411001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Business Capacity */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 border-b border-emerald-900/60 pb-2">
                  3. Business Credentials & Volume
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">GST Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 27AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Agri-Business Experience</label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    >
                      <option>1-3 Years</option>
                      <option>3-5 Years</option>
                      <option>5-10 Years</option>
                      <option>10+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Annual Turnover</label>
                    <select
                      value={formData.annualTurnover}
                      onChange={(e) => setFormData({ ...formData, annualTurnover: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none"
                    >
                      <option>Below ₹25 Lakhs</option>
                      <option>₹25 Lakhs - ₹50 Lakhs</option>
                      <option>₹50 Lakhs - ₹1 Crore</option>
                      <option>₹1 Crore - ₹5 Crores</option>
                      <option>₹5+ Crores</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Interested Product Categories */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-lime-400 border-b border-emerald-900/60 pb-2">
                  4. Preferred Product Categories (Select All That Apply)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {productCategoriesList.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#040e07] border border-emerald-950 cursor-pointer hover:border-emerald-800 transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.preferredProducts.includes(cat)}
                        onChange={() => handleCheckboxToggle(cat)}
                        className="w-4 h-4 rounded text-lime-400 accent-lime-400"
                      />
                      <span className="text-xs text-slate-200">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-extrabold text-base shadow-2xl flex items-center justify-center gap-2 transition hover:scale-102 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Submit Authorized Dealership Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
