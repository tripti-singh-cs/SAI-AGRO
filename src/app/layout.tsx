import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import {
  DEFAULT_OG_IMAGE,
  GOOGLE_SITE_VERIFICATION,
  IS_PREVIEW_ENV,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Sustainable Agro & Bio-Crop Solutions`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Empowering farmers with premium bio-fertilizers, plant growth regulators, chelated micronutrients, bio-fungicides, and organic soil conditioners for maximum crop yield.',
  keywords: [
    'Sai Agro Industries',
    'saiagro.shop',
    'bio fertilizers India',
    'plant growth promoters',
    'organic farming inputs',
    'chelated micronutrients',
    'Trichoderma bio fungicide',
    'humic acid soil conditioner',
    'sustainable agriculture',
    'crop nutrition solutions',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  robots: {
    index: !IS_PREVIEW_ENV,
    follow: !IS_PREVIEW_ENV,
    googleBot: {
      index: !IS_PREVIEW_ENV,
      follow: !IS_PREVIEW_ENV,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: `${SITE_NAME} - Nurturing Nature, Empowering Farmers`,
    description:
      'High-tech agricultural inputs, bio-nutrients, and organic farming formulations for higher crop yield and soil health.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 800,
        height: 800,
        alt: `${SITE_NAME} Official Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Sustainable Agro & Bio-Crop Solutions`,
    description:
      'Premium bio-fertilizers, plant growth promoters, micronutrients, and organic soil conditioners for Indian farmers.',
    images: [DEFAULT_OG_IMAGE],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      description:
        'Manufacturer and supplier of bio-fertilizers, plant growth promoters, chelated micronutrients, bio-fungicides, and organic soil conditioners.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/products?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
