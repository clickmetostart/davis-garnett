import { NextResponse } from 'next/server';
import { kv_getImageReviews, kv_setImageReviews, type ImageReviewRecord } from '@/lib/kv';

export async function GET() {
  try {
    const reviews = await kv_getImageReviews();
    return NextResponse.json({ reviews });
  } catch (err) {
    console.error('GET /api/image-reviews error:', err);
    return NextResponse.json({ error: 'Unable to load image reviews' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as {
      reviews?: Record<string, ImageReviewRecord>;
      id?: string;
      record?: ImageReviewRecord | null;
    };

    if (body.reviews && typeof body.reviews === 'object') {
      await kv_setImageReviews(body.reviews);
      return NextResponse.json({ success: true, reviews: body.reviews });
    }

    if (body.id) {
      const current = await kv_getImageReviews();
      if (body.record === null) {
        delete current[body.id];
      } else if (body.record) {
        current[body.id] = {
          ...body.record,
          updatedAt: new Date().toISOString(),
        };
      }
      await kv_setImageReviews(current);
      return NextResponse.json({ success: true, reviews: current });
    }

    return NextResponse.json({ error: 'Missing reviews map or item id' }, { status: 400 });
  } catch (err) {
    console.error('PUT /api/image-reviews error:', err);
    return NextResponse.json({ error: 'Unable to save image review' }, { status: 500 });
  }
}

