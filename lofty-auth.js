const https = require('https');
const fs = require('fs');
const readline = require('readline');
const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) acc[key.trim()] = value.trim();
  return acc;
}, {});

const CLIENT_ID = envVars.LOFTY_CLIENT_ID;
const CLIENT_SECRET = envVars.LOFTY_CLIENT_SECRET;
const REDIRECT_URI = 'https://davis-garnett.vercel.app/'; // Must match Lofty Dev Dashboard exactly

const code = process.argv[2];

if (!code) {
  console.log('\n=============================================');
  console.log('   LOFTY LOCAL AUTHENTICATION HELPER');
  console.log('=============================================\n');
  console.log('Step 1: Click this link to authorize the app:');
  console.log(`\nhttps://crm.lofty.com/page/vendor-auth.html?clientId=${CLIENT_ID}&response_type=code\n`);
  console.log('Step 2: Log in with your test account. You will be redirected to the vercel site.');
  console.log('Step 3: Look at the URL you landed on. It will look like: https://davis-garnett.vercel.app/?code=YOUR_SECRET_CODE');
  console.log('Step 4: Copy JUST the code part and paste it back into the chat to me!\n');
  process.exit(1);
}

console.log('\nExchanging code for token...');

  const data = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: code.trim(),
    redirect_uri: REDIRECT_URI
  });

  const options = {
    hostname: 'crm.lofty.com',
    path: '/api/user-web/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(responseData);
        if (parsedData.access_token) {
          fs.writeFileSync('src/data/loftyToken.json', JSON.stringify(parsedData, null, 2));
          console.log('\nSUCCESS! Token saved to src/data/loftyToken.json.');
          console.log('Your local Next.js server will now pull live MLS data!');
        } else {
          console.error('\nFAILED! Lofty returned an error:', parsedData);
        }
      } catch (e) {
        console.error('Failed to parse response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Network Error:', error);
  });

  req.write(data);
  req.end();
