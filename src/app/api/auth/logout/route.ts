import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function performLogout() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set({
    name: 'admin_token',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}

export async function POST() {
  return performLogout();
}

export async function GET() {
  return performLogout();
}
