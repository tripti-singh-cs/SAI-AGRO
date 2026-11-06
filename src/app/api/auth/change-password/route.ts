import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, hashPassword, verifyPassword } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(session.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    user.passwordHash = await hashPassword(newPassword);
    await user.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
