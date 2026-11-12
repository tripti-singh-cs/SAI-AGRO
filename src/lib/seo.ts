import type { Metadata } from 'next';

export const SITE_URL = 'https://saiagro.shop';
export const SITE_NAME = 'SAI AGRO INDUSTRIES';
export const DEFAULT_OG_IMAGE = '/images/logo.png';
export const GOOGLE_SITE_VERIFICATION = 'Ydy-RnIrnRFTAHsfWIr6ZWQmgi5VHOmjwcS7mGnjTQY';
export const IS_PREVIEW_ENV = Boolean(
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
);

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

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Build BreadcrumbList JSON-LD for structured navigation in search results.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  slug: string;
  category: string;
  description: string;
  images?: string[];
}

/**
 * Build Product JSON-LD strictly from factual repository/DB fields.
 * Does not fabricate prices, ratings, reviews, or offers.
 */
export function buildProductJsonLd(product: ProductSchemaInput) {
  const productUrl = `${SITE_URL}/products/${product.slug}`;
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
      : [`${SITE_URL}${DEFAULT_OG_IMAGE}`];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    sku: product.slug,
    url: productUrl,
    image: images,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  };
}

export interface ArticleSchemaInput {
  title: string;
  slug: string;
  summary: string;
  author?: string;
  coverImage?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * Build BlogPosting JSON-LD from factual article fields.
 */
export function buildArticleJsonLd(article: ArticleSchemaInput) {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const image = article.coverImage
    ? article.coverImage.startsWith('http')
      ? article.coverImage
      : `${SITE_URL}${article.coverImage}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.summary,
    image,
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Organization',
      name: article.author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      },
    },
    ...(article.createdAt
      ? { datePublished: new Date(article.createdAt).toISOString() }
      : {}),
    ...(article.updatedAt
      ? { dateModified: new Date(article.updatedAt).toISOString() }
      : {}),
  };
}
