import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Category from '@/models/Category';
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

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function GET(req?: NextRequest) {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ order: 1, name: 1 });

    // Update item counts dynamically
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat.name });
        return {
          ...cat.toObject(),
          itemCount: count,
        };
      })
    );

    return NextResponse.json({ success: true, categories: categoriesWithCount }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    await connectToDatabase();
    const slug = slugify(body.name);

    let uniqueSlug = slug;
    let count = 1;
    while (await Category.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    const category = await Category.create({
      ...body,
      slug: uniqueSlug,
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/products');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, category }, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
