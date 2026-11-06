import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
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

    const enquiry = await Enquiry.findByIdAndUpdate(id, body, { new: true });
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json({ success: true, enquiry }, { headers: NO_CACHE_HEADERS });
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

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404, headers: NO_CACHE_HEADERS });
    }

    return NextResponse.json({ success: true, message: 'Enquiry deleted' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
