import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Dealer from '@/models/Dealer';
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    await connectToDatabase();
    const { id } = params;
    const body = await req.json();

    const dealer = await Dealer.findByIdAndUpdate(id, body, { new: true });
    if (!dealer) {
      return NextResponse.json({ error: 'Dealer application not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json({ success: true, dealer }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    await connectToDatabase();
    const { id } = params;

    const dealer = await Dealer.findByIdAndDelete(id);
    if (!dealer) {
      return NextResponse.json({ error: 'Dealer application not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json({ success: true, message: 'Dealer application deleted' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
