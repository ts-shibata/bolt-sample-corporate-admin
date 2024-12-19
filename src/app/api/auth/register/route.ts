import { authServer } from '@/src/lib/auth/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const user = await authServer.createUser(email, password, name);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}