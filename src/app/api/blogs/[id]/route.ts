import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = params;

    let blog = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: new RegExp(`^${id}$`, 'i') });
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    const relatedBlogs = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true,
    }).limit(3);

    return NextResponse.json({ success: true, blog, relatedBlogs }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/blog');
      revalidatePath(`/blog/${id}`);
      if (blog.slug) {
        revalidatePath(`/blog/${blog.slug}`);
      }
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, blog }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/blog');
      revalidatePath(`/blog/${id}`);
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, message: 'Blog deleted' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
