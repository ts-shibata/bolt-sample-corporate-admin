import { NextResponse } from 'next/server';
import { newsService } from '@/src/lib/api/news';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await newsService.getNewsById(params.id);
    if (!result) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const result = await newsService.updateNews(params.id, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await newsService.deleteNews(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}