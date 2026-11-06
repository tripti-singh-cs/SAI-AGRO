'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Please enter a valid authorized email and password.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#051109] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Official Logo and Header */}
        <div className="text-center space-y-2">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white p-1 border-2 border-emerald-500/80 shadow-2xl mx-auto">
            <Image 
              src="/images/logo.png" 
              alt="SAI AGRO INDUSTRIES Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
            SAI AGRO INDUSTRIES
          </h1>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
            Management & Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-[#092113] p-8 border border-emerald-500/40 shadow-2xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/90 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@saiagro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none font-medium placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter your secret password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#040e07] border border-emerald-900 text-white text-sm focus:border-lime-400 focus:outline-none font-medium placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In to Dashboard
                </>
              )}
            </button>
          </form>

        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-xs font-bold text-slate-400 hover:text-lime-400 transition"
          >
            &larr; Back to Public Website
          </a>
        </div>

      </div>
    </div>
  );
}
