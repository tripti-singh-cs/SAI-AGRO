import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { authenticateRequest } from '@/lib/auth';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// GET /api/products/[id] (by ID, Slug, or Name)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ slug: id });
    }
    if (!product) {
      product = await Product.findOne({ slug: new RegExp(`^${id}$`, 'i') });
    }
    if (!product) {
      // Try finding by name or partial slug match
      const searchPattern = id.replace(/[-_]/g, ' ');
      product = await Product.findOne({
        $or: [
          { name: new RegExp(searchPattern, 'i') },
          { slug: new RegExp(id, 'i') },
        ],
      });
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    // Also fetch related products in same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    return NextResponse.json(
      { success: true, product, relatedProducts },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// PUT /api/products/[id] (Admin Protected)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndUpdate(id, body, { new: true });
    } else {
      product = await Product.findOneAndUpdate({ slug: id }, body, { new: true });
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath(`/products/${id}`);
      if (product.slug) {
        revalidatePath(`/products/${product.slug}`);
      }
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, product }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// DELETE /api/products/[id] (Admin Protected)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findByIdAndDelete(id);
    } else {
      product = await Product.findOneAndDelete({ slug: id });
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      revalidatePath(`/products/${id}`);
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
