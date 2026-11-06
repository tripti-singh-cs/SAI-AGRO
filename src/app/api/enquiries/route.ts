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

// GET /api/enquiries (Admin Protected)
export async function GET(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (type && type !== 'all') {
      query.inquiryType = type;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, enquiries }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// POST /api/enquiries (Public submission from website forms, modals, quote requests)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.fullName || !body.phone || !body.message) {
      return NextResponse.json({ error: 'Full name, phone, and message are required' }, { status: 400 });
    }

    await connectToDatabase();
    const enquiry = await Enquiry.create(body);

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting Sai Agro Industries! Our agronomy advisory team will reach out shortly.',
      enquiry,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Enquiry POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
