import { NextResponse } from 'next/server';
import { contactService } from '@/src/lib/api/contacts';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await contactService.getContactById(params.id);
    if (!result) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await contactService.markAsRead(params.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}