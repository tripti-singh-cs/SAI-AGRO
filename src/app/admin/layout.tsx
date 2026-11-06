'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Layers, 
  FolderTree, 
  MessageSquare, 
  Building2, 
  Video, 
  BookOpen, 
  Star, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Sprout, 
  Menu, 
  X,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products & Inputs', href: '/admin/products', icon: Layers },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Leads & Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { name: 'Dealer Applications', href: '/admin/dealers', icon: Building2 },
  { name: 'Media & Videos', href: '/admin/media', icon: Video },
  { name: 'Blog & Agro Guides', href: '/admin/blogs', icon: BookOpen },
  { name: 'Farmer Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Company Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecking(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (res.ok && data.authenticated && data.user) {
          setAdminUser(data.user);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#051109] flex items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 flex ${
      isLight ? 'bg-[#f4f7f4] text-slate-800' : 'bg-[#051109] text-slate-100'
    }`}>
      
      {/* Desktop Sidebar */}
      <aside className={`w-64 border-r flex flex-col justify-between hidden lg:flex fixed top-0 bottom-0 z-30 transition-colors duration-300 ${
        isLight ? 'bg-white border-emerald-200' : 'bg-[#07170c] border-emerald-950'
      }`}>
        <div className="p-5 space-y-6">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border-2 border-emerald-500/70 shadow-md group-hover:scale-105 transition flex-shrink-0">
              <Image 
                src="/images/logo.png" 
                alt="SAI AGRO INDUSTRIES" 
                fill 
                className="object-contain"
              />
            </div>
            <div>
              <span className={`font-black text-sm tracking-tight block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                SAI AGRO
              </span>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isLight ? 'text-emerald-700' : 'text-lime-400'}`}>
                Admin Portal
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-black transition ${
                    isActive
                      ? isLight
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-black'
                      : isLight
                        ? 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                        : 'text-slate-300 hover:text-white hover:bg-emerald-950/80'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className={`p-4 border-t space-y-2 ${isLight ? 'border-emerald-100' : 'border-emerald-950'}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-black border transition ${
              isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-800 text-lime-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {isLight ? <Moon className="w-4 h-4 text-emerald-800" /> : <Sun className="w-4 h-4 text-amber-300" />}
              <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
          </button>

          <Link
            href="/"
            target="_blank"
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
              isLight ? 'text-emerald-800 hover:bg-emerald-50' : 'text-emerald-300 hover:bg-emerald-950'
            }`}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> View Live Site
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className={`h-16 backdrop-blur-md border-b px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 transition-colors ${
          isLight ? 'bg-white/90 border-emerald-200 shadow-sm' : 'bg-[#07170c]/90 border-emerald-950'
        }`}>
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isLight ? 'bg-emerald-50 text-slate-800' : 'bg-emerald-950 text-slate-300'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-sm">Sai Agro Admin</span>
            </div>
          </div>

          <div className={`hidden lg:block text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Welcome, <strong className={isLight ? 'text-emerald-800' : 'text-lime-400'}>{adminUser?.name || 'Administrator'}</strong>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-800 text-lime-300'
              }`}
              title={isLight ? 'Dark Mode' : 'Light Mode'}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="w-4 h-4 text-emerald-800" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            <Link
              href="/"
              target="_blank"
              className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-black transition ${
                isLight 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                  : 'bg-emerald-950 border-emerald-800 text-lime-300 hover:bg-emerald-900'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Portal
            </Link>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-lime-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b p-4 space-y-1 ${
            isLight ? 'bg-white border-emerald-200 shadow-xl' : 'bg-[#07170c] border-emerald-950'
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black ${
                  pathname === item.href 
                    ? isLight ? 'bg-emerald-700 text-white' : 'bg-lime-400 text-slate-950' 
                    : isLight ? 'text-slate-700 hover:bg-emerald-50' : 'text-slate-300 hover:bg-emerald-950'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black text-red-500"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
