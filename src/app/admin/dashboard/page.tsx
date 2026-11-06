'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  MessageSquare, 
  Building2, 
  BookOpen, 
  Plus,
  RefreshCw,
  Phone,
  Clock
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (enquiryId: string, newStatus: string) => {
    try {
      await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchStats();
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading admin analytics...</p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const recentDealers = data?.recentDealers || [];

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Dashboard Overview
          </h1>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Live operational metrics & customer lead activity for Sai Agro Industries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchStats}
            className={`p-2.5 rounded-xl border transition ${
              isLight ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-[#07170c] border-emerald-900 text-slate-300 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Total Formulations
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 text-lime-400'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {stats.totalProducts || 0}
          </div>
          <Link href="/admin/products" className="text-xs font-bold text-emerald-700 dark:text-lime-400 flex items-center gap-1 hover:underline">
            Manage Catalog &rarr;
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Customer Enquiries
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 text-lime-400'
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {stats.totalEnquiries || 0}{' '}
            {stats.newEnquiries > 0 && (
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
              }`}>
                {stats.newEnquiries} New
              </span>
            )}
          </div>
          <Link href="/admin/enquiries" className="text-xs font-bold text-emerald-700 dark:text-lime-400 flex items-center gap-1 hover:underline">
            View All Leads &rarr;
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Dealer Applications
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 text-lime-400'
            }`}>
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {stats.totalDealers || 0}{' '}
            {stats.pendingDealers > 0 && (
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                {stats.pendingDealers} Pending
              </span>
            )}
          </div>
          <Link href="/admin/dealers" className="text-xs font-bold text-emerald-700 dark:text-lime-400 flex items-center gap-1 hover:underline">
            Review Applications &rarr;
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Knowledge Articles
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 text-lime-400'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className={`text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {stats.totalBlogs || 0}
          </div>
          <Link href="/admin/blogs" className="text-xs font-bold text-emerald-700 dark:text-lime-400 flex items-center gap-1 hover:underline">
            Publish Article &rarr;
          </Link>
        </div>

      </div>

      {/* Two-Column Section: Recent Inquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Enquiries & Leads (2 Cols) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-lime-400" /> Recent Leads & Quotation Inquiries
            </h3>
            <Link href="/admin/enquiries" className="text-xs font-bold text-emerald-700 dark:text-lime-400 hover:underline">
              View All
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No recent inquiries.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${isLight ? 'border-slate-200 text-slate-500' : 'border-emerald-950 text-slate-400'}`}>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Type / Product</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-emerald-950/60'}`}>
                  {recentEnquiries.map((enq: any) => (
                    <tr key={enq._id} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-emerald-950/30'}>
                      <td className="py-3 px-3">
                        <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{enq.fullName}</div>
                        <a href={`tel:${enq.phone}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">
                          {enq.phone}
                        </a>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-emerald-700 dark:text-lime-300">{enq.inquiryType}</div>
                        <div className="text-slate-500 truncate max-w-[150px]">{enq.productName || 'General'}</div>
                      </td>
                      <td className="py-3 px-3">
                        {enq.state || 'N/A'}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          enq.status === 'New'
                            ? isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950'
                            : enq.status === 'Contacted'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                          className={`px-2 py-1 rounded-lg border text-[11px] focus:outline-none ${
                            isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#040e07] border-emerald-900 text-white'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Dealer Registrations (1 Col) */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Building2 className="w-5 h-5 text-emerald-600 dark:text-lime-400" /> Distributor Requests
            </h3>
            <Link href="/admin/dealers" className="text-xs font-bold text-emerald-700 dark:text-lime-400 hover:underline">
              View All
            </Link>
          </div>

          {recentDealers.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No pending dealership applications.
            </div>
          ) : (
            <div className="space-y-3">
              {recentDealers.map((dl: any) => (
                <div key={dl._id} className={`p-3.5 rounded-2xl border space-y-1 ${
                  isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-[#040e07] border-emerald-950'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{dl.businessName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-lime-300 font-bold">
                      {dl.status}
                    </span>
                  </div>
                  <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Contact: {dl.applicantName} ({dl.phone})
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {dl.district}, {dl.state}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
