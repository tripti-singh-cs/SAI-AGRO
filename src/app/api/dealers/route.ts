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

// GET /api/dealers (Admin Protected)
export async function GET(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_CACHE_HEADERS });
    }

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const state = searchParams.get('state');

    const query: any = {};
    if (status && status !== 'all') query.status = status;
    if (state && state !== 'all') query.state = state;

    const dealers = await Dealer.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, dealers }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// POST /api/dealers (Public dealer application)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.businessName || !body.applicantName || !body.phone || !body.state) {
      return NextResponse.json({ error: 'Business name, applicant name, phone, and state are required' }, { status: 400 });
    }

    await connectToDatabase();
    const dealer = await Dealer.create(body);

    return NextResponse.json({
      success: true,
      message: 'Distributorship application submitted successfully. Our regional manager will review and contact you.',
      dealer,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
