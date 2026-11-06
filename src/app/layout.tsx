import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'SAI AGRO INDUSTRIES | Sustainable Agro & Bio-Crop Solutions',
  description: 'Empowering farmers with premium bio-fertilizers, plant growth regulators, chelated micronutrients, bio-fungicides, and organic soil conditioners for maximum crop yield.',
  keywords: 'Sai Agro Industries, Bio fertilizers, Plant growth promoters, organic farming, micronutrients, Trichoderma, humic acid, agrochemicals, sustainable agriculture',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'SAI AGRO INDUSTRIES - Nurturing Nature, Empowering Farmers',
    description: 'High-tech agricultural inputs, bio-nutrients, and organic farming formulations.',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 800,
        alt: 'SAI AGRO INDUSTRIES Official Logo',
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" data-theme="dark">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased selection:bg-emerald-500 selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow pt-16 sm:pt-20">
              {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
