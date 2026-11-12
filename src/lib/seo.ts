import type { Metadata } from 'next';

export const SITE_URL = 'https://saiagro.shop';
export const SITE_NAME = 'SAI AGRO INDUSTRIES';
export const DEFAULT_OG_IMAGE = '/images/logo.png';
export const GOOGLE_SITE_VERIFICATION = 'Ydy-RnIrnRFTAHsfWIr6ZWQmgi5VHOmjwcS7mGnjTQY';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Build consistent Next.js Metadata for a route, including canonical URL,
 * OpenGraph, and Twitter card tags.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
