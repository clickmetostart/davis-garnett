import { NextResponse } from 'next/server';
import { kv_getSettings, kv_setSettings } from '@/lib/kv';

export async function GET() {
  try {
    const data = await kv_getSettings();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = await kv_getSettings();

    if (body.onboarding) {
      data.onboarding = {
        ...(data.onboarding || {}),
        ...body.onboarding,
      };
    }

    if (body.formRouting) {
      data.formRouting = body.formRouting;
    }

    await kv_setSettings(data);
    return NextResponse.json({ success: true, settings: data });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
