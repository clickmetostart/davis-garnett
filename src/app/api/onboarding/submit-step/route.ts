import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { moduleName, payload } = body;

    // 1. Save state to settings.json
    const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    let settingsData = { onboarding: {} };
    try {
      const fileData = await fs.readFile(settingsPath, 'utf8');
      settingsData = JSON.parse(fileData);
    } catch (err) {
      console.warn('Settings file not found, creating new state.');
    }

    // Merge the submitted payload into onboarding state
    settingsData.onboarding = {
      ...settingsData.onboarding,
      ...payload
    };

    await fs.writeFile(settingsPath, JSON.stringify(settingsData, null, 2));

    // 2. Mock Email Notification
    const fromEmail = 'system@clickme.life';
    const emailBody = `
Client Onboarding Update
-------------------------
A client has just submitted the "${moduleName}" step of their onboarding.

Module: ${moduleName}

Submitted Data:
${JSON.stringify(payload, null, 2)}

Please review the Dashboard or agency tools to take appropriate action (e.g., building requested social profiles, connecting synced directories, etc.).
    `;

    console.log(`[MOCK EMAIL to clickme.tostart@gmail.com from ${fromEmail}]`);
    console.log(`Subject: Onboarding Submission: ${moduleName}`);
    console.log(emailBody);

    console.log(`Onboarding module "${moduleName}" submitted successfully.`);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Onboarding Submit Step API Error:', error);
    return NextResponse.json({ message: 'Error submitting step' }, { status: 500 });
  }
}
