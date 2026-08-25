import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    const user = data.users?.[0];

    if (!user || !user.googleTokens || !user.googleTokens.access_token) {
      return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    const { access_token } = user.googleTokens;
    let locations = [];

    // 1. Fetch Accounts
    try {
      const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json();
        const accounts = accountsData.accounts || [];

        if (accounts.length > 0) {
          // 2. Fetch Locations for the first account
          const accountName = accounts[0].name;
          const locationsRes = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,phoneNumbers,storefrontAddress`, {
            headers: { Authorization: `Bearer ${access_token}` }
          });

          if (locationsRes.ok) {
            const locationsData = await locationsRes.json();
            locations = (locationsData.locations || []).map((loc: any) => ({
              locationName: loc.name,
              title: loc.title,
              phone: loc.phoneNumbers?.primaryPhone || '',
              address: {
                street: (loc.storefrontAddress?.addressLines || []).join(' '),
                city: loc.storefrontAddress?.locality || '',
                state: loc.storefrontAddress?.administrativeArea || '',
                zip: loc.storefrontAddress?.postalCode || ''
              }
            }));
          } else {
            const errBody = await locationsRes.text();
            console.error("GMB API locations fetch failed", locationsRes.status, errBody);
          }
        } else {
          console.warn("GMB API returned accounts successfully, but accounts array was empty.");
        }
      } else {
        const errBody = await accountsRes.text();
        console.error("GMB API accounts fetch failed", accountsRes.status, errBody);
      }
    } catch (apiError) {
      console.warn("Failed to fetch from live GMB API, falling back to mock.", apiError);
    }

    if (locations.length === 0) {
      return NextResponse.json({ error: 'Unable to fetch locations from Google. Your account may have no listings, or Google API access is restricted (Quota Exceeded).' }, { status: 400 });
    }

    return NextResponse.json({ locations });
  } catch (error) {
    console.error('Error fetching Google locations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
