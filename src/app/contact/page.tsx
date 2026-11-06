'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sprout, 
  Building2, 
  Loader2 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    inquiryType: 'General' as const,
    productName: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({
    phonePrimary: '+91 78560 57415',
    phoneSecondary: '+91 78560 57415',
    emailPrimary: 'triptisinghh897@gmail.com',
    registeredAddress: 'Bela Industrial Area, Phase II, Agro Complex, India',
    whatsappNumber: '7856057415',
  });

  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isLight = theme === 'light';
  const isHindi = language === 'hi';

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.setting) {
          setSettings({
            phonePrimary: data.setting.phonePrimary || '+91 78560 57415',
            phoneSecondary: data.setting.phoneSecondary || '+91 78560 57415',
            emailPrimary: data.setting.emailPrimary || 'triptisinghh897@gmail.com',
            registeredAddress: data.setting.registeredAddress || 'Bela Industrial Area, Phase II, Agro Complex, India',
            whatsappNumber: data.setting.whatsappNumber || '7856057415',
          });
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
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
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            }
          } catch {}
        }
      } else {
        setError(data.error || (isHindi ? 'संदेश भेजने में विफल।' : 'Failed to submit message.'));
      }
    } catch {
      setError(isHindi ? 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanWhatsAppNumber = settings.whatsappNumber.replace(/\D/g, '') || '7856057415';
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    'Hello Sai Agro Industries! I would like to connect with your technical and sales team.'
  )}`;

  return (
    <div className={`py-10 sm:py-14 min-h-screen transition-colors duration-300 ${
      isLight ? 'bg-[#f8faf6]' : 'bg-[#0b1b11]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${
            isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-950 text-lime-400 border-emerald-800'
          }`}>
            <Phone className="w-3.5 h-3.5" /> 
            <span>{isHindi ? 'हेल्पलाइन एवं मुख्यालय' : 'Direct Helpline & Headquarters'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {isHindi ? 'साईं एग्रो इंडस्ट्रीज से संपर्क करें' : 'Connect with Sai Agro Industries'}
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {isHindi 
              ? 'उत्पाद जानकारी, फसल खुराक सलाह, थोक आपूर्ति या डीलरशिप सहायता के लिए सीधे संपर्क करें।' 
              : 'Reach out for product inquiries, agronomic dosage advice, wholesale supply, or dealership support.'}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-3xl border shadow-lg space-y-3 transition ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isHindi ? 'किसान हेल्पलाइन' : 'Call Helpline'}
            </h4>
            <p className="text-xs text-slate-400">Mon-Sat from 9:00 AM to 7:00 PM</p>
            <div className="space-y-1 pt-1">
              <a href={`tel:${settings.phonePrimary.replace(/\s+/g, '')}`} className="block text-sm font-black text-emerald-600 dark:text-lime-400 hover:underline">
                {settings.phonePrimary}
              </a>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg space-y-3 transition ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isHindi ? 'ईमेल द्वारा संपर्क' : 'Email Us'}
            </h4>
            <p className="text-xs text-slate-400">Fast 24-hour response turnaround</p>
            <div className="space-y-1 pt-1">
              <a href={`mailto:${settings.emailPrimary}`} className="block text-sm font-black text-emerald-600 dark:text-lime-400 hover:underline">
                {settings.emailPrimary}
              </a>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border shadow-lg space-y-3 transition ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#092113] border-emerald-700/60'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-lime-400 flex items-center justify-center border border-emerald-800">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isHindi ? 'कारखाना एवं पंजीकृत कार्यालय' : 'Plant & Registered Office'}
            </h4>
            <p className="text-xs text-slate-400">Manufacturing & R&D Laboratory</p>
            <p className="text-xs text-emerald-700 dark:text-lime-300 font-bold pt-1">
              {settings.registeredAddress}
            </p>
          </div>
        </div>

        {/* Contact Form & WhatsApp Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Form (7 Cols) */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-10 border shadow-2xl ${
            isLight ? 'bg-white border-emerald-200' : 'bg-[#081f12] border-emerald-700/60'
          }`}>
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-lime-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {isHindi ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message Sent Successfully!'}
                </h3>
                <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {t('formSuccess')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isHindi ? 'सीधा संदेश भेजें' : 'Send Us a Direct Message'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHindi ? 'अपने विवरण भरें और हमारे कृषि विशेषज्ञ शीघ्र उत्तर देंगे।' : 'Fill out your inquiry details and we will respond promptly.'}
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {t('formFullName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isHindi ? 'उदा. रामेश्वर पाटिल' : 'Enter Full Name'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none transition ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
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
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none transition ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {t('formEmail')}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g.example@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none transition ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {t('formState')} / {t('formDistrict')}
                    </label>
                    <input
                      type="text"
                      placeholder={isHindi ? 'उदा. महाराष्ट्र, नासिक' : 'e.g. Maharashtra, Nashik'}
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none transition ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {isHindi ? 'पूछताछ का उद्देश्य' : 'Inquiry Purpose'}
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none transition ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                    }`}
                  >
                    <option value="Product Quote">{isHindi ? 'उत्पाद कोटेशन / मूल्य सूची' : 'Product Quote / Pricing'}</option>
                    <option value="Farmer Advisory">{isHindi ? 'कृषि तकनीकी सलाह एवं खुराक' : 'Farmer Technical Advice & Dosage'}</option>
                    <option value="Dealership">{isHindi ? 'डीलरशिप / वितरक अवसर' : 'Dealership / Distributorship Opportunity'}</option>
                    <option value="Bulk Order">{isHindi ? 'थोक वाणिज्यिक ऑर्डर' : 'Bulk Commercial Order'}</option>
                    <option value="General">{isHindi ? 'सामान्य पूछताछ' : 'General Inquiry'}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t('formMessage')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={isHindi ? 'अपनी फसल, खेत का आकार या उत्पाद की आवश्यकता का विवरण लिखें...' : 'Tell us about your crop, farm acreage, or products you are looking for...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none resize-none transition ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> 
                      <span>{t('formSending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> 
                      <span>{t('formSubmit')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right WhatsApp & Direct Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-3xl p-8 border shadow-2xl space-y-5 ${
              isLight 
                ? 'bg-gradient-to-br from-emerald-900 to-[#062412] text-white border-emerald-700' 
                : 'bg-gradient-to-br from-[#0c2a17] to-[#06150b] border-emerald-500/30'
            }`}>
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg">
                <MessageSquare className="w-7 h-7 fill-white" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {isHindi ? 'व्हाट्सएप पर तुरंत संपर्क' : 'Instant WhatsApp Connect'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isHindi 
                  ? 'तत्काल मूल्य सूची, उत्पाद ब्रोशर या आपातकालीन कीट सलाह के लिए हमारे ऑन-ड्यूटी कृषि वैज्ञानिक से सीधे बात करें।' 
                  : 'Need immediate pricing, PDF technical brochures, or emergency crop pest advice? Connect directly with our on-duty agronomist on WhatsApp.'}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-sm shadow-xl transition hover:scale-102"
              >
                {isHindi ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp Now'}
              </a>
            </div>

            <div className={`rounded-3xl p-6 border shadow-md space-y-3 ${
              isLight ? 'bg-white border-emerald-100' : 'bg-[#092113] border-emerald-800/60'
            }`}>
              <h4 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Clock className="w-4 h-4 text-lime-400" /> 
                <span>{isHindi ? 'कार्य समय' : 'Operational Working Hours'}</span>
              </h4>
              <p className="text-xs text-slate-400 font-medium">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
              <p className="text-xs text-emerald-600 dark:text-lime-400 font-semibold">
                {isHindi ? 'रविवार: रखरखाव हेतु बंद (व्हाट्सएप हेल्पलाइन सक्रिय)' : 'Sunday: Closed for maintenance (WhatsApp emergency active)'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
