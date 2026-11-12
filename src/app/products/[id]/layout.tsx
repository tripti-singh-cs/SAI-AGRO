import type { Metadata } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { buildPageMetadata, DEFAULT_OG_IMAGE } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  try {
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

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
