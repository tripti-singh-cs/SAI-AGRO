import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
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

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('publishedOnly') !== 'false';

    const query: any = {};
    if (category && category !== 'all') query.category = category;
    if (publishedOnly) query.isPublished = true;

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs }, { headers: NO_CACHE_HEADERS });
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
    if (!body.title || !body.summary || !body.content) {
      return NextResponse.json({ error: 'Title, summary, and content are required' }, { status: 400 });
    }

    await connectToDatabase();
    const baseSlug = slugify(body.title);
    let uniqueSlug = baseSlug;
    let count = 1;
    while (await Blog.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const blog = await Blog.create({
      ...body,
      slug: uniqueSlug,
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/blog');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, blog }, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
