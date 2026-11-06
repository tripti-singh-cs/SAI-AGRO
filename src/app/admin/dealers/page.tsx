'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  MessageCircle,
  AlertCircle 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface DealerItem {
  _id: string;
  businessName: string;
  applicantName: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  gstNumber?: string;
  experienceYears: string;
  annualTurnover?: string;
  preferredProducts: string[];
  status: string;
  createdAt: string;
}

export default function AdminDealersPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [dealers, setDealers] = useState<DealerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDealers();
  }, [statusFilter]);

  async function fetchDealers() {
    setLoading(true);
    try {
      let url = `/api/dealers`;
      if (statusFilter !== 'all') url += `?status=${encodeURIComponent(statusFilter)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setDealers(data.dealers || []);
      }
    } catch (err) {
      console.error('Failed to load dealers:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/dealers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchDealers();
    } catch (err) {
      console.error('Failed to update dealer status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dealer application?')) return;
    try {
      await fetch(`/api/dealers/${id}`, { method: 'DELETE' });
      fetchDealers();
    } catch (err) {
      console.error('Failed to delete dealer:', err);
    }
  };

  const filteredDealers = dealers.filter((d) => {
    if (!search.trim()) return true;
    return (
      d.businessName.toLowerCase().includes(search.toLowerCase()) ||
      d.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.state.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Distributor & Dealership Applications
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Review prospective agro-dealers, commercial credentials, and approve distribution rights.
          </p>
        </div>

        <button
          onClick={fetchDealers}
          className={`p-2.5 rounded-xl border transition self-start sm:self-auto ${
            isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-[#07170c] border-emerald-900 text-slate-300 hover:text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Row */}
      <div className={`rounded-2xl p-4 border flex flex-wrap items-center gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel border-emerald-500/20'
      }`}>
        <div className="flex-grow min-w-[200px]">
          <input
            type="text"
            placeholder="Search by business name, proprietor, phone, state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-600' : 'bg-[#040e07] border-emerald-900 text-white focus:border-lime-400'
            }`}
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#040e07] border-emerald-900 text-white'
            }`}
          >
            <option value="all">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-3xl border overflow-hidden ${
        isLight ? 'bg-white border-emerald-200 shadow-lg' : 'glass-panel border-emerald-500/20'
      }`}>
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading dealer applications...</p>
          </div>
        ) : filteredDealers.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No dealer applications found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'bg-emerald-50/70 border-slate-200 text-slate-700' : 'bg-[#040e07] border-emerald-950 text-slate-400'}`}>
                  <th className="py-3 px-4">Business / Proprietor</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Commercial Info</th>
                  <th className="py-3 px-4">Preferred Categories</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-emerald-950/60'}`}>
                {filteredDealers.map((d) => {
                  const rawDigits = d.phone.replace(/\D/g, '');
                  const waNumber = rawDigits.length === 10 ? `91${rawDigits}` : rawDigits;
                  const whatsappChatUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Hello ${d.applicantName}, regarding your distributorship application for ${d.businessName} with Sai Agro Industries.`
                  )}`;

                  return (
                    <tr key={d._id} className={isLight ? 'hover:bg-slate-50 transition' : 'hover:bg-emerald-950/30 transition'}>
                      <td className="py-3 px-4">
                        <div className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{d.businessName}</div>
                        <div className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Prop: {d.applicantName}</div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <a href={`tel:${d.phone}`} className="hover:underline">{d.phone}</a>
                        </div>
                        <div className={`text-[11px] flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <Mail className="w-3 h-3" /> {d.email}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{d.city || d.district}, {d.state}</div>
                        <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>PIN: {d.pincode}</div>
                      </td>

                      <td className="py-3 px-4 space-y-0.5">
                        {d.gstNumber && (
                          <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>GST: <span className="font-mono text-emerald-700 dark:text-lime-300 font-bold">{d.gstNumber}</span></div>
                        )}
                        <div className={isLight ? 'text-slate-600' : 'text-slate-400'}>Exp: {d.experienceYears}</div>
                        {d.annualTurnover && (
                          <div className={isLight ? 'text-slate-600' : 'text-slate-400'}>Turnover: {d.annualTurnover}</div>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {d.preferredProducts?.map((p, i) => (
                            <span key={i} className={`px-2 py-0.5 rounded text-[10px] border ${
                              isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold' : 'bg-emerald-950 text-lime-300 border-emerald-900'
                            }`}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className={`py-3 px-4 whitespace-nowrap text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={d.status}
                          onChange={(e) => handleUpdateStatus(d._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${
                            d.status === 'Approved'
                              ? isLight ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-lime-400 text-slate-950 border-lime-400'
                              : d.status === 'Under Review'
                              ? 'bg-amber-400 text-slate-950 border-amber-400'
                              : isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-[#040e07] text-slate-300 border-emerald-900'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={whatsappChatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleDelete(d._id)}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
