'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Lock, 
  CheckCircle2, 
  Save, 
  KeyRound, 
  Loader2, 
  AlertCircle, 
  Upload, 
  Video, 
  Globe, 
  Phone, 
  Mail, 
  Building 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminSettingsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [setting, setSetting] = useState<any>({
    companyName: 'SAI AGRO INDUSTRIES',
    tagline: 'Pioneering Sustainable Agriculture & High-Yield Bio Solutions',
    phonePrimary: '+91 98765 43210',
    phoneSecondary: '+91 91234 56789',
    whatsappNumber: '919876543210',
    emailPrimary: 'info@saiagroindustries.com',
    emailSupport: 'support@saiagroindustries.com',
    registeredAddress: 'Bela Industrial Area, Phase II, Agro Complex, India',
    factoryAddress: 'Plot No. 12-16, Eco Biotech Zone, Sai Agro Park',
    gstin: '10AAACS9988F1Z9',
    stats: {
      farmersHelped: '50,000+',
      productsDelivered: '1,50,000+',
      statesPresence: '18+ States',
      yieldImprovement: '25-35%',
    },
    socialLinks: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      whatsapp: 'https://wa.me/919876543210',
    },
    heroVideoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
    heroVideoUrl2: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
  });

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [uploadingVideo1, setUploadingVideo1] = useState(false);
  const [uploadingVideo2, setUploadingVideo2] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.setting) {
          setSetting((prev: any) => ({
            ...prev,
            ...data.setting,
            stats: { ...prev.stats, ...(data.setting.stats || {}) },
            socialLinks: { ...prev.socialLinks, ...(data.setting.socialLinks || {}) },
          }));
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'heroVideoUrl' | 'heroVideoUrl2') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetField === 'heroVideoUrl') setUploadingVideo1(true);
    else setUploadingVideo2(true);

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'sai_agro_videos');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setSetting((prev: any) => ({ ...prev, [targetField]: data.url }));
      } else {
        alert(data.error || 'Video upload failed');
      }
    } catch (err) {
      console.error('Video upload error:', err);
      alert('Error uploading video to Cloudinary');
    } finally {
      if (targetField === 'heroVideoUrl') setUploadingVideo1(false);
      else setUploadingVideo2(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);
    setSettingsError('');

    try {
      let res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(setting),
      });
      if (res.status === 405) {
        res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(setting),
        });
      }
      const data = await res.json();

      if (res.ok && data.success) {
        setSettingsSuccess(true);
        if (data.setting) {
          setSetting((prev: any) => ({
            ...prev,
            ...data.setting,
            stats: { ...prev.stats, ...(data.setting.stats || {}) },
            socialLinks: { ...prev.socialLinks, ...(data.setting.socialLinks || {}) },
          }));
        }
        setTimeout(() => setSettingsSuccess(false), 5000);
      } else {
        setSettingsError(data.error || 'Failed to update company settings');
      }
    } catch (err: any) {
      console.error('Failed to update settings:', err);
      setSettingsError(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordSuccess(false), 5000);
      } else {
        setPasswordError(data.error || 'Failed to update password');
      }
    } catch {
      setPasswordError('An error occurred. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading company settings...</p>
      </div>
    );
  }

  const inputClass = `w-full px-3.5 py-2.5 rounded-xl border text-xs transition focus:outline-none ${
    isLight 
      ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600 shadow-sm' 
      : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
  }`;

  const labelClass = `block text-xs font-bold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`;
  const sectionCardClass = `rounded-3xl p-6 sm:p-8 border space-y-6 ${
    isLight 
      ? 'bg-white border-emerald-200 shadow-lg' 
      : 'glass-panel border-emerald-500/20'
  }`;

  return (
    <div className="space-y-10 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Company Profile, Media & Security Settings
        </h1>
        <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Manage public contact details, registered addresses, hero videos, social links, stats, and administrator credentials.
        </p>
      </div>

      {/* 1. Company Information Form */}
      <div className={sectionCardClass}>
        <div className={`flex items-center justify-between border-b pb-4 ${isLight ? 'border-slate-200' : 'border-emerald-950'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Settings className="w-5 h-5 text-emerald-600 dark:text-lime-400" /> General Company Information
          </h3>
          {settingsSuccess && (
            <span className="text-xs font-bold text-emerald-700 dark:text-lime-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Settings Saved Successfully!
            </span>
          )}
        </div>

        {settingsError && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{settingsError}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                required
                value={setting.companyName || ''}
                onChange={(e) => setSetting({ ...setting, companyName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GSTIN Number</label>
              <input
                type="text"
                value={setting.gstin || ''}
                onChange={(e) => setSetting({ ...setting, gstin: e.target.value })}
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Company Tagline / Bio</label>
            <input
              type="text"
              value={setting.tagline || ''}
              onChange={(e) => setSetting({ ...setting, tagline: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Primary Phone</label>
              <input
                type="text"
                value={setting.phonePrimary || ''}
                onChange={(e) => setSetting({ ...setting, phonePrimary: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Secondary Phone</label>
              <input
                type="text"
                value={setting.phoneSecondary || ''}
                onChange={(e) => setSetting({ ...setting, phoneSecondary: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp Number (e.g. 919876543210)</label>
              <input
                type="text"
                value={setting.whatsappNumber || ''}
                onChange={(e) => setSetting({ ...setting, whatsappNumber: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Email & Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Primary Email</label>
              <input
                type="email"
                value={setting.emailPrimary || ''}
                onChange={(e) => setSetting({ ...setting, emailPrimary: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Support Email</label>
              <input
                type="email"
                value={setting.emailSupport || ''}
                onChange={(e) => setSetting({ ...setting, emailSupport: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Registered Corporate Address</label>
              <input
                type="text"
                value={setting.registeredAddress || ''}
                onChange={(e) => setSetting({ ...setting, registeredAddress: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Factory / Bio-Tech Plant Address</label>
              <input
                type="text"
                value={setting.factoryAddress || ''}
                onChange={(e) => setSetting({ ...setting, factoryAddress: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Hero Videos Configuration */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
            isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isLight ? 'text-emerald-800' : 'text-lime-400'
            }`}>
              <Video className="w-4 h-4" /> Hero Homepage Video Streams
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelClass}>Hero Video 1 URL (MP4 Stream)</label>
                <input
                  type="url"
                  value={setting.heroVideoUrl || ''}
                  onChange={(e) => setSetting({ ...setting, heroVideoUrl: e.target.value })}
                  placeholder="https://res.cloudinary.com/.../video.mp4"
                  className={inputClass}
                />
                <div className="flex items-center gap-2 pt-1">
                  <label className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer flex items-center gap-1.5 ${
                    isLight ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50' : 'bg-emerald-950 border-emerald-700 text-lime-300 hover:bg-emerald-900'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingVideo1 ? 'Uploading Video...' : 'Upload Video 1'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, 'heroVideoUrl')}
                      disabled={uploadingVideo1}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Hero Video 2 URL (Secondary Stream)</label>
                <input
                  type="url"
                  value={setting.heroVideoUrl2 || ''}
                  onChange={(e) => setSetting({ ...setting, heroVideoUrl2: e.target.value })}
                  placeholder="https://res.cloudinary.com/.../video.mp4"
                  className={inputClass}
                />
                <div className="flex items-center gap-2 pt-1">
                  <label className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer flex items-center gap-1.5 ${
                    isLight ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50' : 'bg-emerald-950 border-emerald-700 text-lime-300 hover:bg-emerald-900'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingVideo2 ? 'Uploading Video...' : 'Upload Video 2'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoUpload(e, 'heroVideoUrl2')}
                      disabled={uploadingVideo2}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar Configuration */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isLight ? 'text-emerald-800' : 'text-lime-400'
            }`}>
              Hero Stats Counters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Farmers Helped</label>
                <input
                  type="text"
                  value={setting.stats?.farmersHelped || '50,000+'}
                  onChange={(e) => setSetting({ ...setting, stats: { ...setting.stats, farmersHelped: e.target.value } })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Products Delivered</label>
                <input
                  type="text"
                  value={setting.stats?.productsDelivered || '1,50,000+'}
                  onChange={(e) => setSetting({ ...setting, stats: { ...setting.stats, productsDelivered: e.target.value } })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">States Presence</label>
                <input
                  type="text"
                  value={setting.stats?.statesPresence || '18+ States'}
                  onChange={(e) => setSetting({ ...setting, stats: { ...setting.stats, statesPresence: e.target.value } })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Yield Boost %</label>
                <input
                  type="text"
                  value={setting.stats?.yieldImprovement || '25-35%'}
                  onChange={(e) => setSetting({ ...setting, stats: { ...setting.stats, yieldImprovement: e.target.value } })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-[#040e07] border-emerald-900'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isLight ? 'text-emerald-800' : 'text-lime-400'
            }`}>
              <Globe className="w-4 h-4" /> Social Media Channels
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Facebook URL</label>
                <input
                  type="url"
                  value={setting.socialLinks?.facebook || ''}
                  onChange={(e) => setSetting({ ...setting, socialLinks: { ...setting.socialLinks, facebook: e.target.value } })}
                  placeholder="https://facebook.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">YouTube URL</label>
                <input
                  type="url"
                  value={setting.socialLinks?.youtube || ''}
                  onChange={(e) => setSetting({ ...setting, socialLinks: { ...setting.socialLinks, youtube: e.target.value } })}
                  placeholder="https://youtube.com/@..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={setting.socialLinks?.instagram || ''}
                  onChange={(e) => setSetting({ ...setting, socialLinks: { ...setting.socialLinks, instagram: e.target.value } })}
                  placeholder="https://instagram.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={setting.socialLinks?.linkedin || ''}
                  onChange={(e) => setSetting({ ...setting, socialLinks: { ...setting.socialLinks, linkedin: e.target.value } })}
                  placeholder="https://linkedin.com/company/..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={savingSettings}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Company Information</span>
          </button>
        </form>
      </div>

      {/* 2. Admin Security & Password Change */}
      <div className={sectionCardClass}>
        <div className={`border-b pb-4 ${isLight ? 'border-slate-200' : 'border-emerald-950'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Lock className="w-5 h-5 text-emerald-600 dark:text-lime-400" /> Admin Account Security & Password
          </h3>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Change your administrator password securely.
          </p>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-lime-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Password successfully updated!</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className={labelClass}>Current Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>New Password (Min. 6 chars) *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Confirm New Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className={`px-6 py-2.5 rounded-xl border font-bold text-xs shadow-lg flex items-center gap-2 transition ${
              isLight 
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800' 
                : 'bg-emerald-950 hover:bg-emerald-900 border-emerald-700 text-lime-300'
            }`}
          >
            {changingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
            <span>Update Admin Password</span>
          </button>
        </form>
      </div>

    </div>
  );
}
