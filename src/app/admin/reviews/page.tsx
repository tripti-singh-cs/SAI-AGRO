'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle2, 
  Loader2, 
  User, 
  AlertCircle 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ReviewItem {
  _id: string;
  farmerName: string;
  village: string;
  district: string;
  state: string;
  cropGrown: string;
  productUsed: string;
  yieldIncreasePercent: string;
  rating: number;
  reviewText: string;
  isVerified: boolean;
}

export default function AdminReviewsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  const [formData, setFormData] = useState({
    farmerName: '',
    village: '',
    district: '',
    state: '',
    cropGrown: 'Paddy / Basmati',
    productUsed: 'Sai Bio-Phos & Sai Grow-Max',
    yieldIncreasePercent: '+30%',
    rating: 5,
    reviewText: '',
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingReview(null);
    setErrorMsg('');
    setFormData({
      farmerName: '',
      village: '',
      district: '',
      state: '',
      cropGrown: 'Paddy / Basmati',
      productUsed: 'Sai Bio-Phos & Sai Grow-Max',
      yieldIncreasePercent: '+30%',
      rating: 5,
      reviewText: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev: ReviewItem) => {
    setEditingReview(rev);
    setErrorMsg('');
    setFormData({
      farmerName: rev.farmerName,
      village: rev.village || '',
      district: rev.district,
      state: rev.state,
      cropGrown: rev.cropGrown,
      productUsed: rev.productUsed,
      yieldIncreasePercent: rev.yieldIncreasePercent || '+25%',
      rating: rev.rating || 5,
      reviewText: rev.reviewText,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      let res;
      if (editingReview) {
        res = await fetch(`/api/reviews/${editingReview._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, isVerified: true }),
        });
      } else {
        res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, isVerified: true }),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchReviews();
      } else {
        setErrorMsg(data.error || 'Failed to save testimonial');
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      setErrorMsg(err.message || 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const inputClass = `w-full px-3.5 py-2.5 rounded-xl border text-xs transition focus:outline-none ${
    isLight 
      ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-600 shadow-sm' 
      : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
  }`;

  const labelClass = `block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Farmer Stories & Testimonials
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Manage verified farmer yield reports and crop feedback displayed on the portal.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg self-start sm:self-auto hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className={`rounded-3xl p-6 border flex flex-col justify-between transition shadow-md ${
              isLight ? 'bg-white border-emerald-200' : 'glass-card border-emerald-500/20'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-lime-400 border-emerald-800'
                }`}>
                  {rev.yieldIncreasePercent}
                </span>
              </div>

              <p className={`text-xs italic line-clamp-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                &ldquo;{rev.reviewText}&rdquo;
              </p>

              <div className={`text-[11px] space-y-0.5 pt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <div>Crop: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{rev.cropGrown}</strong></div>
                <div>Used: <strong className={isLight ? 'text-emerald-700' : 'text-lime-300'}>{rev.productUsed}</strong></div>
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-emerald-950'}`}>
              <div>
                <h5 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{rev.farmerName}</h5>
                <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{rev.district}, {rev.state}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(rev)}
                  className={`p-1.5 rounded-lg border transition ${
                    isLight 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                      : 'bg-emerald-950 border-emerald-800 text-lime-400 hover:bg-emerald-900'
                  }`}
                  title="Edit Testimonial"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className={`p-1.5 rounded-lg border transition ${
                    isLight 
                      ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                      : 'bg-red-950 border-red-900 text-red-400 hover:bg-red-900'
                  }`}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 ${
            isLight ? 'bg-white border-emerald-200' : 'glass-panel border-emerald-500/40'
          }`}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-5 right-5 p-2 rounded-full ${
                isLight ? 'bg-slate-100 text-slate-600 hover:text-slate-900' : 'bg-emerald-950 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {editingReview ? 'Edit Farmer Testimonial' : 'Add Farmer Testimonial'}
              </h3>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Farmer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.farmerName}
                    onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Village / Town</label>
                  <input
                    type="text"
                    placeholder="e.g. Baramati"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Crop Grown *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sugarcane & Tomato"
                    value={formData.cropGrown}
                    onChange={(e) => setFormData({ ...formData, cropGrown: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Yield Increase %</label>
                  <input
                    type="text"
                    placeholder="e.g. +34%"
                    value={formData.yieldIncreasePercent}
                    onChange={(e) => setFormData({ ...formData, yieldIncreasePercent: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Product Used *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sai Grow-Max + Sai Humic-King"
                  value={formData.productUsed}
                  onChange={(e) => setFormData({ ...formData, productUsed: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Farmer Review / Quote *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Farmer's personal experience and harvest results..."
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{editingReview ? 'Save Changes' : 'Save Testimonial'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
