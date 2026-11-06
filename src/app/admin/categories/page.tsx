'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Upload, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  iconName?: string;
  order?: number;
  itemCount: number;
}

export default function AdminCategoriesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingCat(null);
    setName('');
    setDescription('');
    setImage('');
    setOrder(categories.length + 1);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCat(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setOrder(cat.order || 0);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'sai_agro_categories');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        alert(data.error || 'Failed to upload category image');
      }
    } catch (err) {
      console.error('Category image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      let res;
      if (editingCat) {
        res = await fetch(`/api/categories/${editingCat._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, image, order }),
        });
      } else {
        res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, image, order }),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        setErrorMsg(data.error || 'Failed to save category');
      }
    } catch (err: any) {
      console.error('Error saving category:', err);
      setErrorMsg(err.message || 'An error occurred while saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
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
            Product Categories
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Organize agricultural formulations and bio-inputs into structured product categories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg self-start sm:self-auto hover:scale-105 transition"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className={`rounded-3xl border overflow-hidden ${
        isLight ? 'bg-white border-emerald-200 shadow-lg' : 'glass-panel border-emerald-500/20'
      }`}>
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No categories found. Click &quot;Add Category&quot; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'bg-emerald-50/70 border-slate-200 text-slate-700' : 'bg-[#040e07] border-emerald-950 text-slate-400'}`}>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Item Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-emerald-950/60'}`}>
                {categories.map((cat) => (
                  <tr key={cat._id} className={isLight ? 'hover:bg-slate-50 transition' : 'hover:bg-emerald-950/30 transition'}>
                    <td className="py-3 px-4">
                      <div className={`w-10 h-10 rounded-xl border p-1 flex items-center justify-center overflow-hidden ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#040e07] border-emerald-900'
                      }`}>
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                        ) : (
                          <FolderTree className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                    </td>
                    <td className={`py-3 px-4 font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                      {cat.slug}
                    </td>
                    <td className={`py-3 px-4 max-w-sm truncate ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {cat.description || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full border font-bold text-[11px] ${
                        isLight 
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-800' 
                          : 'bg-emerald-950 border-emerald-800 text-lime-400'
                      }`}>
                        {cat.itemCount || 0} Products
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className={`p-1.5 rounded-lg border transition ${
                            isLight 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                              : 'bg-emerald-950 border-emerald-800 text-lime-400 hover:bg-emerald-900'
                          }`}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-3xl p-6 border shadow-2xl space-y-4 ${
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
                {editingCat ? 'Edit Category' : 'Create Category'}
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
                <label className={labelClass}>Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Display Order Index</label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Category Image Upload */}
              <div className="space-y-2">
                <label className={labelClass}>Category Image (Cloudinary)</label>
                <div className="flex items-center gap-3">
                  <label className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer flex items-center gap-2 ${
                    isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-700 text-lime-300'
                  }`}>
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                  </label>
                  {image && (
                    <span className="text-[11px] text-emerald-600 dark:text-lime-400 font-mono truncate max-w-xs">
                      {image}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{editingCat ? 'Save Changes' : 'Create Category'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
