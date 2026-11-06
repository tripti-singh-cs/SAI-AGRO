import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'sai_agro_industries_jwt_super_secret_key_2026_secure';
const key = new TextEncoder().encode(JWT_SECRET);

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signJWT(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyJWT(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getSessionAdmin(): Promise<AdminPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    return await verifyJWT(token);
  } catch {
    return null;
  }
}

export async function authenticateRequest(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get('admin_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return await verifyJWT(token);
}
