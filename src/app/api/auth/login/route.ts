import { authServer } from '@/src/lib/auth/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await authServer.validateCredentials(email, password);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid login credentials' },
      { status: 401 }
    );
  }
}