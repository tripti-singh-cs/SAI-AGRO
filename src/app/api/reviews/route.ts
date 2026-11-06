import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import { authenticateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(req?: NextRequest) {
  try {
    await connectToDatabase();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    const body = await req.json();

    if (!body.farmerName || !body.district || !body.state || !body.cropGrown || !body.reviewText) {
      return NextResponse.json({ error: 'Farmer name, location, crop, and review text are required' }, { status: 400 });
    }

    await connectToDatabase();
    const review = await Review.create({
      ...body,
      isVerified: !!session || body.isVerified,
    });

    try {
      revalidatePath('/', 'layout');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, review }, { status: 201, headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
