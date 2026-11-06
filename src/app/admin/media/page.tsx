'use client';

import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Image as ImageIcon, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle2, 
  Upload, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MediaItem {
  _id: string;
  title: string;
  type: 'video' | 'image';
  url: string;
  thumbnailUrl?: string;
  category: string;
  description?: string;
  featured: boolean;
}

export default function AdminMediaPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'image'>('video');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [category, setCategory] = useState('Factory Tour');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    setLoading(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setMedia(data.media || []);
      }
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingMedia(null);
    setTitle('');
    setType('video');
    setUrl('');
    setThumbnailUrl('');
    setCategory('Factory Tour');
    setDescription('');
    setFeatured(false);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MediaItem) => {
    setEditingMedia(item);
    setTitle(item.title);
    setType(item.type);
    setUrl(item.url);
    setThumbnailUrl(item.thumbnailUrl || '');
    setCategory(item.category);
    setDescription(item.description || '');
    setFeatured(item.featured || false);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'sai_agro_media');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setUrl(data.url);
        setType(file.type.startsWith('video/') ? 'video' : 'image');
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    const payload = { title, type, url, thumbnailUrl, category, description, featured };

    try {
      let res;
      if (editingMedia) {
        res = await fetch(`/api/media/${editingMedia._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchMedia();
      } else {
        setErrorMsg(data.error || 'Failed to save media item');
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      setErrorMsg(err.message || 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMedia();
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
            Media & Video Showcase Manager
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Manage factory tour videos, farmer field demonstrations, and facility photos.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg self-start sm:self-auto hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Add Video / Image
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <div
            key={item._id}
            className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition shadow-md ${
              isLight ? 'bg-white border-emerald-200' : 'glass-card border-emerald-500/20'
            }`}
          >
            <div className="relative aspect-video bg-black overflow-hidden">
              {item.type === 'video' ? (
                <video src={item.url} muted playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                  isLight ? 'bg-white/90 text-emerald-800 border-emerald-200' : 'bg-emerald-950/90 text-lime-300 border-emerald-800'
                }`}>
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-grow space-y-2">
              <h4 className={`font-bold text-sm line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h4>
              {item.description && (
                <p className={`text-xs line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{item.description}</p>
              )}
            </div>

            <div className={`p-4 pt-2 border-t flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-emerald-950/60'}`}>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono truncate max-w-[150px]">
                {item.url}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className={`p-1.5 rounded-lg border transition ${
                    isLight 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                      : 'bg-emerald-950 border-emerald-800 text-lime-400 hover:bg-emerald-900'
                  }`}
                  title="Edit Media"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
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
                {editingMedia ? 'Edit Media Item' : 'Add Media Item'}
              </h3>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Factory Tour - Automated Packing Line"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className={inputClass}
                  >
                    <option value="video">Video (MP4 / Cloudinary)</option>
                    <option value="image">Image (JPG / PNG)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Factory Tour">Factory Tour</option>
                    <option value="Field Trial">Field Trial</option>
                    <option value="Product Demonstration">Product Demonstration</option>
                    <option value="Farmer Experience">Farmer Experience</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Media URL * (Cloudinary Stream or Direct Link)</label>
                <input
                  type="url"
                  required
                  placeholder="https://res.cloudinary.com/.../video.mp4"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Upload Direct */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#040e07] border-emerald-900'
              }`}>
                <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Or upload directly:</span>
                <label className={`px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                  isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-700 text-lime-300'
                }`}>
                  {uploading ? 'Uploading...' : 'Choose File'}
                  <input type="file" onChange={handleFileUpload} disabled={uploading} className="hidden" />
                </label>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the media..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className={`flex items-center gap-2 cursor-pointer text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded accent-lime-400"
                  />
                  <span>Feature on Home Page Media Showcase</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{editingMedia ? 'Save Changes' : 'Save Media Item'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
