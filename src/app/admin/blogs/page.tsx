'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle2, 
  Upload, 
  Loader2, 
  Search,
  AlertCircle 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Crop Nutrition',
    author: 'Sai Agro Agronomy Team',
    readTime: '5 min read',
    coverImage: '',
    summary: '',
    content: '',
    tagsStr: 'Bio-Fertilizers, Soil Health, Crop Yield',
    isPublished: true,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs?publishedOnly=false');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setErrorMsg('');
    setFormData({
      title: '',
      category: 'Crop Nutrition',
      author: 'Sai Agro Agronomy Team',
      readTime: '5 min read',
      coverImage: '',
      summary: '',
      content: '<h2>Scientific Overview</h2><p>Write your detailed agricultural guidance here...</p>',
      tagsStr: 'Bio-Fertilizers, Soil Health, Yield Boost',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BlogItem) => {
    setEditingBlog(b);
    setErrorMsg('');
    setFormData({
      title: b.title,
      category: b.category,
      author: b.author,
      readTime: b.readTime,
      coverImage: b.coverImage || '',
      summary: b.summary,
      content: b.content,
      tagsStr: b.tags?.join(', ') || '',
      isPublished: b.isPublished ?? true,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'sai_agro_blogs');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
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

    const payload = {
      ...formData,
      tags: formData.tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingBlog) {
        res = await fetch(`/api/blogs/${editingBlog._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        setErrorMsg(data.error || 'Failed to save blog post');
      }
    } catch (err: any) {
      console.error('Error saving blog:', err);
      setErrorMsg(err.message || 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBlogs();
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
            Knowledge Hub & Agronomy Blogs
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Publish farming articles, pest advisories, and organic cultivation tutorials.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg self-start sm:self-auto hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Publish New Article
        </button>
      </div>

      {/* Blogs List */}
      <div className={`rounded-3xl border overflow-hidden ${
        isLight ? 'bg-white border-emerald-200 shadow-lg' : 'glass-panel border-emerald-500/20'
      }`}>
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No articles found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'bg-emerald-50/70 border-slate-200 text-slate-700' : 'bg-[#040e07] border-emerald-950 text-slate-400'}`}>
                  <th className="py-3 px-4">Cover</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-emerald-950/60'}`}>
                {blogs.map((b) => (
                  <tr key={b._id} className={isLight ? 'hover:bg-slate-50 transition' : 'hover:bg-emerald-950/30 transition'}>
                    <td className="py-3 px-4">
                      <div className={`w-14 h-10 rounded-lg border overflow-hidden ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#040e07] border-emerald-900'
                      }`}>
                        {b.coverImage ? (
                          <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-bold text-sm max-w-sm line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{b.title}</div>
                      <div className={`text-[11px] line-clamp-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{b.summary}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                        isLight 
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-800' 
                          : 'bg-emerald-950 border-emerald-800 text-lime-300'
                      }`}>
                        {b.category}
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {b.author}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.isPublished 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-lime-300' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {b.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className={`py-3 px-4 whitespace-nowrap text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className={`p-1.5 rounded-lg border transition ${
                            isLight 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                              : 'bg-emerald-950 border-emerald-800 text-lime-400 hover:bg-emerald-900'
                          }`}
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className={`p-1.5 rounded-lg border transition ${
                            isLight 
                              ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                              : 'bg-red-950 border-red-900 text-red-400 hover:bg-red-900'
                          }`}
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className={`relative w-full max-w-2xl my-8 rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 ${
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
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {editingBlog ? 'Edit Farming Article' : 'Write New Farming Article'}
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
                <label className={labelClass}>Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Tips to Rejuvenate Depleted Soil Microbiome"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={inputClass}
                  >
                    <option value="Crop Nutrition">Crop Nutrition</option>
                    <option value="Modern Farming">Modern Farming</option>
                    <option value="Bio-Pest Control">Bio-Pest Control</option>
                    <option value="Soil Health">Soil Health</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Summary / Lead Paragraph *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <label className={labelClass}>Cover Image (Cloudinary)</label>
                <div className="flex items-center gap-3">
                  <label className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer flex items-center gap-2 ${
                    isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-700 text-lime-300'
                  }`}>
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? 'Uploading...' : 'Choose Cover Photo'}</span>
                    <input type="file" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                  </label>
                  {formData.coverImage && (
                    <span className="text-[11px] text-emerald-600 dark:text-lime-400 font-mono truncate max-w-xs">
                      {formData.coverImage}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Full Article Content (HTML / Text) *</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={`${inputClass} font-mono resize-y`}
                />
              </div>

              <div>
                <label className={labelClass}>Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsStr}
                  onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className={`flex items-center gap-2 cursor-pointer text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded accent-lime-400"
                  />
                  <span>Publish immediately to Knowledge Hub</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
