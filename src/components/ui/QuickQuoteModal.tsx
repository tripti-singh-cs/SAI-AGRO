'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sprout, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function QuickQuoteModal({
  isOpen,
  onClose,
  defaultProduct = '',
}: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    inquiryType: 'Product Quote',
    productName: defaultProduct,
    quantity: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName: formData.productName || defaultProduct || 'General Product Catalog Inquiry',
          message: formData.message || `Quotation requested for ${formData.productName || 'Agro Products'} with quantity ${formData.quantity || 'Standard'}.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        if (typeof window !== 'undefined') {
          try {
            const confetti = (await import('canvas-confetti')).default as any;
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
              });
            }
          } catch {}
        }
      } else {
        setError(data.error || (isHindi ? 'अनुरोध भेजने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to submit inquiry. Please try again.'));
      }
    } catch {
      setError(isHindi ? 'एक अनपेक्षित त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden ${
        isLight 
          ? 'bg-white border-emerald-300 text-slate-800' 
          : 'bg-[#081f12] border-emerald-600/50 text-white'
      }`}>
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition ${
            isLight ? 'bg-emerald-50 text-slate-500 hover:text-slate-900' : 'bg-emerald-950 text-slate-400 hover:text-white'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-lime-400'
            }`}>
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black">
              {isHindi ? 'कोटेशन अनुरोध सफलतापूर्वक प्राप्त हुआ!' : 'Quotation Request Received!'}
            </h3>
            <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isHindi ? 'धन्यवाद, ' : 'Thank you, '} 
              <span className="font-bold text-emerald-700 dark:text-lime-400">{formData.fullName}</span>! 
              {isHindi 
                ? ' हमारे तकनीकी कृषि वैज्ञानिक 2 घंटे के भीतर आपसे संपर्क करेंगे और मूल्य सूची, खुराक मार्गदर्शन व नजदीकी डीलर की जानकारी देंगे।' 
                : ' Our technical agricultural advisor will contact you within 2 hours with price lists, dosage guidelines, and local dealer availability.'}
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 text-slate-950 font-black text-sm shadow-lg hover:scale-105 transition"
            >
              {isHindi ? 'पूर्ण (Done)' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl border ${
                isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-emerald-950 border-emerald-500/30 text-lime-400'
              }`}>
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black">
                  {isHindi ? 'त्वरित मूल्य कोटेशन अनुरोध' : 'Request Instant Quotation'}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isHindi ? 'सीधे फैक्ट्री मूल्य एवं थोक डीलर दरें' : 'Direct factory prices & bulk dealer rates for Sai Agro inputs'}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t('formFullName')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isHindi ? 'उदा. रामेश्वर पटेल' : 'e.g. Ramesh Patel'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t('formPhone')} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t('formState')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isHindi ? 'उदा. महाराष्ट्र / बिहार / मध्य प्रदेश' : 'e.g. Maharashtra / Bihar / MP'}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t('formDistrict')}
                </label>
                <input
                  type="text"
                  placeholder={isHindi ? 'उदा. इंदौर / नासिक / मुजफ्फरपुर' : 'e.g. Indore / Nashik / Patna'}
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isHindi ? 'उत्पाद का नाम' : 'Product Required'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sai Bio-Phos"
                  value={formData.productName || defaultProduct}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isHindi ? 'अनुमानित मात्रा / एकड़' : 'Estimated Quantity / Acres'}
                </label>
                <input
                  type="text"
                  placeholder={isHindi ? 'उदा. 50 लीटर / 10 एकड़' : 'e.g. 50 Litres / 10 Acres'}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {t('formMessage')}
              </label>
              <textarea
                rows={2}
                placeholder={isHindi ? 'अपनी फसल (धान, गेहूं, कपास, मिर्च आदि) या समस्या का उल्लेख करें...' : 'Mention your crop (e.g. Paddy, Tomato, Sugarcane) or specific soil challenge...'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none resize-none transition ${
                  isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> 
                  <span>{t('formSending')}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> 
                  <span>{isHindi ? 'कोटेशन एवं तकनीकी सलाह प्राप्त करें' : 'Get Quotation & Technical Advice'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
