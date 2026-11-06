import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { authenticateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// Helper to convert title to slug
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// GET /api/products (with search, category, targetCrop, featured, pagination)
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get('category');
    const crop = searchParams.get('crop');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    const query: any = {};

    if (category && category !== 'all' && category !== 'All') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    if (crop) {
      query.targetCrops = { $regex: new RegExp(crop, 'i') };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { composition: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { targetCrops: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    }, {
      headers: NO_CACHE_HEADERS,
    });
  } catch (error: any) {
    console.error('Products GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// POST /api/products (Admin Protected)
export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.category || !body.description) {
      return NextResponse.json({ error: 'Name, Category, and Description are required' }, { status: 400 });
    }

    await connectToDatabase();

    const baseSlug = slugify(body.name);
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await Product.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const newProduct = await Product.create({
      ...body,
      slug: uniqueSlug,
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, product: newProduct }, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    console.error('Product POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
