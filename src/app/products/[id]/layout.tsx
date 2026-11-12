import type { Metadata } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProductJsonLd,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo';

async function findProduct(id: string) {
  await connectToDatabase();
  let product = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id).lean();
  }
  if (!product) {
    product = await Product.findOne({ slug: id }).lean();
  }
  if (!product) {
    product = await Product.findOne({ slug: new RegExp(`^${id}$`, 'i') }).lean();
  }
  return product;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  try {
    const product = await findProduct(id);

    if (product) {
      const description =
        product.tagline ||
        product.description?.slice(0, 155) ||
        `${product.name} by SAI AGRO INDUSTRIES — ${product.category}.`;
      const image =
        product.images && product.images.length > 0 && product.images[0]
          ? product.images[0]
          : DEFAULT_OG_IMAGE;

      return buildPageMetadata({
        title: `${product.name} - ${product.category}`,
        description,
        path: `/products/${product.slug || id}`,
        keywords: [
          product.name,
          product.category,
          ...(product.targetCrops || []),
          'Sai Agro Industries',
        ],
        image,
      });
    }
  } catch {
    // Fallback gracefully if DB lookup fails
  }

  return buildPageMetadata({
    title: 'Product Details',
    description:
      'Detailed composition, target crops, benefits, and dosage guide for SAI AGRO INDUSTRIES bio-crop solutions.',
    path: `/products/${id}`,
  });
}

export default async function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  let jsonLd: object[] = [];

  try {
    const product = await findProduct(params.id);
    if (product) {
      const slug = product.slug || params.id;
      jsonLd = [
        buildProductJsonLd({
          name: product.name,
          slug,
          category: product.category,
          description: product.tagline || product.description,
          images: product.images,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${slug}` },
        ]),
      ];
    }
  } catch {
    // Skip JSON-LD if DB lookup fails
  }

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
