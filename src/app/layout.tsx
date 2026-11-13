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
    default: 'SAI AGRO INDUSTRIES | Official Website | Bio Fertilizers & Agro Chemicals',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Official website of SAI AGRO INDUSTRIES (saiagro.shop). Leading manufacturer and supplier of bio-fertilizers, plant growth regulators, chelated micronutrients, bio-fungicides, and organic soil conditioners across India.',
  keywords: [
    'SAI AGRO',
    'sai agro',
    'Sai Agro',
    'SAI AGRO INDUSTRIES',
    'sai agro industries',
    'sai agro industry',
    'saiagro',
    'saiagro.shop',
    'sai agro official website',
    'sai agro fertilizers',
    'sai agro bio fertilizers',
    'bio fertilizer manufacturer India',
    'plant growth promoters',
    'organic farming inputs India',
    'chelated micronutrients',
    'Trichoderma viride',
    'potassium humate',
    'agricultural bio products',
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
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        'SAI AGRO',
        'Sai Agro',
        'sai agro',
        'Sai Agro Industry',
        'Sai Agro Industries',
        'SAI AGRO INDUSTRIES INDIA',
      ],
      url: SITE_URL,
      logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      description:
        'Official website of SAI AGRO INDUSTRIES. Manufacturer and supplier of high-grade bio-fertilizers, plant growth regulators, chelated micronutrients, bio-fungicides, and organic soil conditioners for agriculture across India.',
      telephone: '+91 78560 57415',
      email: 'triptisinghh897@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bela Industrial Area, Phase II, Agro Complex',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'SAI AGRO INDUSTRIES',
      alternateName: 'SAI AGRO',
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
