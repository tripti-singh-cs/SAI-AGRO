'use client';

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
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

interface EnquiryItem {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  state: string;
  district?: string;
  inquiryType: string;
  productName?: string;
  quantity?: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, typeFilter]);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      let url = `/api/enquiries?limit=100`;
      if (statusFilter !== 'all') url += `&status=${encodeURIComponent(statusFilter)}`;
      if (typeFilter !== 'all') url += `&type=${encodeURIComponent(typeFilter)}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      fetchEnquiries();
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (!search.trim()) return true;
    return (
      e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.state?.toLowerCase().includes(search.toLowerCase()) ||
      e.productName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Leads & Quotation Enquiries
          </h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Track and respond to incoming farmer quotes, bulk orders, and dealership inquiries.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
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
            placeholder="Search by customer name, phone, state..."
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
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`px-3.5 py-2 rounded-xl border text-xs focus:outline-none ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#040e07] border-emerald-900 text-white'
            }`}
          >
            <option value="all">Type: All</option>
            <option value="Product Quote">Product Quote</option>
            <option value="Farmer Advisory">Farmer Advisory</option>
            <option value="Dealership">Dealership</option>
            <option value="Bulk Order">Bulk Order</option>
            <option value="General">General</option>
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
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No inquiries found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'bg-emerald-50/70 border-slate-200 text-slate-700' : 'bg-[#040e07] border-emerald-950 text-slate-400'}`}>
                  <th className="py-3 px-4">Customer Info</th>
                  <th className="py-3 px-4">Inquiry Type</th>
                  <th className="py-3 px-4">Product / Quantity</th>
                  <th className="py-3 px-4">Message / Requirements</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-emerald-950/60'}`}>
                {filteredEnquiries.map((enq) => {
                  const rawDigits = enq.phone.replace(/\D/g, '');
                  const waNumber = rawDigits.length === 10 ? `91${rawDigits}` : rawDigits;
                  const whatsappChatUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Hello ${enq.fullName}, thank you for contacting Sai Agro Industries regarding ${enq.productName || 'our agricultural bio-formulations'}.`
                  )}`;

                  return (
                    <tr key={enq._id} className={isLight ? 'hover:bg-slate-50 transition' : 'hover:bg-emerald-950/30 transition'}>
                      <td className="py-3 px-4">
                        <div className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{enq.fullName}</div>
                        <div className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                        </div>
                        {enq.email && (
                          <div className={`text-[11px] flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            <Mail className="w-3 h-3" /> {enq.email}
                          </div>
                        )}
                        <div className={`text-[10px] flex items-center gap-1 mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          <MapPin className="w-3 h-3 text-emerald-600 dark:text-lime-400" /> {enq.district ? `${enq.district}, ` : ''}{enq.state}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-lime-300 border-emerald-800'
                        }`}>
                          {enq.inquiryType}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{enq.productName || 'General Inquiry'}</div>
                        {enq.quantity && (
                          <div className="text-[11px] text-emerald-700 dark:text-lime-400 font-medium">Qty: {enq.quantity}</div>
                        )}
                      </td>

                      <td className={`py-3 px-4 max-w-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <p className="line-clamp-3">{enq.message}</p>
                      </td>

                      <td className={`py-3 px-4 whitespace-nowrap text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none ${
                            enq.status === 'New'
                              ? isLight ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-lime-400 text-slate-950 border-lime-400'
                              : enq.status === 'Contacted'
                              ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : isLight ? 'bg-white text-slate-800 border-slate-300' : 'bg-[#040e07] text-slate-300 border-emerald-900'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
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
                            onClick={() => handleDelete(enq._id)}
                            className={`p-1.5 rounded-lg border transition ${
                              isLight 
                                ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                                : 'bg-red-950 border-red-900 text-red-400 hover:bg-red-900'
                            }`}
                            title="Delete Lead"
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
