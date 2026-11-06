import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import Setting from '@/models/Setting';
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
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({
        companyName: 'SAI AGRO INDUSTRIES',
        tagline: 'Pioneering Sustainable Agriculture & High-Yield Bio Solutions',
        phonePrimary: '+91 98765 43210',
        phoneSecondary: '+91 91234 56789',
        whatsappNumber: '919876543210',
        emailPrimary: 'info@saiagroindustries.com',
        emailSupport: 'support@saiagroindustries.com',
        registeredAddress: 'Bela Industrial Area, Phase II, Agro Complex, India',
        factoryAddress: 'Plot No. 12-16, Eco Biotech Zone, Sai Agro Park',
        gstin: '10AAACS9988F1Z9',
        stats: {
          farmersHelped: '50,000+',
          productsDelivered: '1,50,000+',
          statesPresence: '18+ States',
          yieldImprovement: '25-35%',
        },
        socialLinks: {
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com',
          instagram: 'https://instagram.com',
          linkedin: 'https://linkedin.com',
          whatsapp: 'https://wa.me/919876543210',
        },
        heroVideoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
        heroVideoUrl2: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
      });
    }

    return NextResponse.json({ success: true, setting }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

async function handleUpdateSettings(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    // Remove immutable fields to prevent MongoDB update errors
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    const setting = await Setting.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/contact');
    } catch (e) {
      console.warn('revalidatePath warning:', e);
    }

    return NextResponse.json({ success: true, setting, message: 'Settings updated successfully' }, { headers: NO_CACHE_HEADERS });
  } catch (error: any) {
    console.error('Settings update error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update settings' }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function PUT(req: NextRequest) {
  return handleUpdateSettings(req);
}

export async function POST(req: NextRequest) {
  return handleUpdateSettings(req);
}

export async function PATCH(req: NextRequest) {
  return handleUpdateSettings(req);
}
