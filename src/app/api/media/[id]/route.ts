import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Media from '@/models/Media';
import { authenticateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const media = await Media.findByIdAndUpdate(id, body, { new: true });
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/media');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, media }, { headers: NO_CACHE_HEADERS });
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

    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/media');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, message: 'Media item deleted' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
