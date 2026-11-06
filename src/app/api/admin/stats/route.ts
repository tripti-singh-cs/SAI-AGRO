import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import Enquiry from '@/models/Enquiry';
import Dealer from '@/models/Dealer';
import Blog from '@/models/Blog';
import Review from '@/models/Review';
import Media from '@/models/Media';
import { authenticateRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const [
      totalProducts,
      totalEnquiries,
      newEnquiries,
      totalDealers,
      pendingDealers,
      totalBlogs,
      totalReviews,
      totalMedia,
      recentEnquiries,
      recentDealers,
    ] = await Promise.all([
      Product.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Dealer.countDocuments(),
      Dealer.countDocuments({ status: 'Pending' }),
      Blog.countDocuments(),
      Review.countDocuments(),
      Media.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(6),
      Dealer.find().sort({ createdAt: -1 }).limit(5),
    ]);

    // Breakdown of enquiries by type
    const enquiriesByType = await Enquiry.aggregate([
      { $group: { _id: '$inquiryType', count: { $sum: 1 } } },
    ]);

    // Breakdown of products by category
    const productsByCategory = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalEnquiries,
        newEnquiries,
        totalDealers,
        pendingDealers,
        totalBlogs,
        totalReviews,
        totalMedia,
      },
      enquiriesByType,
      productsByCategory,
      recentEnquiries,
      recentDealers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
