import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'settings.json');

// Helper to safely read data
const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Create default if missing
      const defaultData = {
        onboarding: {
          profileSetup: false,
          officeLocationEntered: false,
          teamSetupWalkthrough: false,
          analyticsAcknowledged: false,
          socialTraining: false,
          aiContentTraining: false,
          dummyClientEntered: false
        }
      };
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error('Error reading settings file:', err);
    return null;
  }
};

export async function GET() {
  const data = readData();
  if (!data) return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = readData();
    
    if (!data) {
      return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }

    // Merge top-level keys if they exist
    if (body.onboarding) {
      data.onboarding = {
        ...data.onboarding,
        ...body.onboarding
      };
    }
    
    if (body.formRouting) {
      data.formRouting = body.formRouting;
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, settings: data });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
