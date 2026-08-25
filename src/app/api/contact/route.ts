import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Extract standard fields
    const { firstName, lastName, email, phone, subject, message, method, source, ...rest } = body;
    const name = `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown';
    
    // Extract custom fields (anything left over, e.g., interest, loanType, modules)
    const customFields: Record<string, any> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined && value !== null && value !== '') {
        customFields[key] = value;
      }
    }

    // --- SPAM DETECTION ---
    // Strict spam filter checks
    const isSpamName = name.length > 10 && !name.includes(' ');
    
    // Check for excessive dots in the email prefix (e.g. e.r.i.huj.iw.az00@gmail.com)
    const emailPrefix = (email || '').split('@')[0];
    const dotCount = (emailPrefix.match(/\./g) || []).length;
    
    const isSpamEmail = 
      (email || '').includes('rat.enuka') || 
      (email || '').includes('lunari.ot') || 
      (email || '').includes('e.mu.b.u') ||
      dotCount > 3;

    const spamKeywords = ['seo', 'rank your website', 'page 1 of google', 'guaranteed leads', 'crypto', 'bitcoin'];
    const isSpamKeyword = spamKeywords.some(keyword => (message || '').toLowerCase().includes(keyword));
    
    const isSpam = isSpamName || isSpamEmail || isSpamKeyword;

    // --- AUTO ROUTING (Phase 2) ---
    // Try to determine the form "type" or "subject". We use `interest` or `subject` to route.
    const routeTrigger = subject || customFields.interest || 'Contact Form';
    let assignedLabels = routeTrigger === 'Contact Form: Apply Now' 
      ? ['Contact Form: Apply Now'] 
      : ['Contact Form: General'];
    
    try {
      const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
      const settingsData = await fs.readFile(settingsPath, 'utf8').catch(() => '{}');
      const settings = JSON.parse(settingsData);
      
      if (settings.formRouting && settings.formRouting[routeTrigger]) {
        assignedLabels = settings.formRouting[routeTrigger];
      }
    } catch (e) {
      // Ignore routing errors, default to General Contacts
    }

    // --- LOCAL CRM CAPTURE ---
    if (!isSpam) {
      try {
        const dataPath = path.join(process.cwd(), 'data', 'leads.json');
        const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
        const leads = JSON.parse(fileData);
      
      const existingLeadIndex = leads.findIndex((l: any) => l.email && email && l.email.toLowerCase() === email.toLowerCase());

      if (existingLeadIndex !== -1) {
        const existingLead = leads[existingLeadIndex];
        
        if (message) {
          const timestamp = new Date().toLocaleString();
          existingLead.message = existingLead.message 
            ? `${existingLead.message}\n\n--- New Message on ${timestamp} ---\n${message}`
            : message;
        }

        for (const label of assignedLabels) {
          if (!existingLead.labels.includes(label)) {
            existingLead.labels.push(label);
          }
        }
        
        existingLead.customFields = {
          ...existingLead.customFields,
          ...customFields
        };

        existingLead.status = 'Recently Corresponded';
        existingLead.date = new Date().toISOString();
        if (phone && phone !== 'N/A') existingLead.phone = phone;
        if (method && method !== 'N/A') existingLead.method = method;

        leads.splice(existingLeadIndex, 1);
        leads.unshift(existingLead);

        console.log('Existing lead updated in local CRM database:', name);
      } else {
        const newLead = {
          id: Date.now(),
          name,
          firstName: firstName || '',
          lastName: lastName || '',
          email,
          phone: phone || 'N/A',
          subject: routeTrigger,
          message: message || '',
          method: method || 'N/A',
          source: source || 'N/A',
          customFields,
          status: 'New',
          isSpam,
          isTrashed: isSpam,
          labels: assignedLabels,
          date: new Date().toISOString()
        };
        
        leads.unshift(newLead);
        console.log('Lead captured in local CRM database:', name, isSpam ? '(FLAGGED AS SPAM)' : '');
      }

        await fs.writeFile(dataPath, JSON.stringify(leads, null, 2));
      } catch (err) {
        console.error('Failed to save lead to local CRM:', err);
      }
    } else {
      console.log('Spam detected. Skipping local CRM capture for:', name);
    }
    // ------------------------------------------------------

    const fromEmail = 'system@clickme.life';
    
    // Build custom fields text for email
    const formatKey = (k: string) => {
      const overrides: Record<string, string> = {
        interest: "I'm Interested In",
        loanType: "Loan Type",
        modules: "Modules"
      };
      if (overrides[k]) return overrides[k];
      return k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };
    
    let customFieldsText = '';
    for (const [k, v] of Object.entries(customFields)) {
      const formattedKey = formatKey(k);
      if (Array.isArray(v)) customFieldsText += `- ${formattedKey}: ${v.join(', ')}\n`;
      else customFieldsText += `- ${formattedKey}: ${v}\n`;
    }

    const emailBody = `
You have received a new lead from ClickMe Template.

Contact Details:
- First Name: ${firstName || 'N/A'}
- Last Name: ${lastName || 'N/A'}
- Email: ${email || 'N/A'}
- Phone: ${phone || 'N/A'}
- Preferred Contact Method: ${method || 'N/A'}
- How Did You Find Us?: ${source || 'N/A'}

Custom Fields:
${customFieldsText || 'None'}

Message/Questions:
${message || 'No message provided.'}
    `.trim();

    console.log(`[MOCK EMAIL to clickme.tostart@gmail.com from ${fromEmail}]`);
    console.log(`Subject: ${isSpam ? '[SPAM?] ' : ''}New Lead: ${name} - ${routeTrigger}`);
    console.log(emailBody);

    // --- LOCAL INBOX CAPTURE ---
    try {
      const inboxPath = path.join(process.cwd(), 'data', 'web_inbox.json');
      const inboxData = await fs.readFile(inboxPath, 'utf8').catch(() => '[]');
      const threads = JSON.parse(inboxData);
      
      const emailBody = `
You have received a new lead from ClickMe Template.

Contact Details:
- First Name: ${firstName || 'N/A'}
- Last Name: ${lastName || 'N/A'}
- Email: ${email || 'N/A'}
- Phone: ${phone || 'N/A'}
- Preferred Contact Method: ${method || 'N/A'}
- How Did You Find Us?: ${source || 'N/A'}

Custom Fields:
${customFieldsText || 'None'}

Message/Questions:
${message || 'No message provided.'}
      `.trim();

      const snippet = emailBody.substring(0, 100).replace(/\n/g, ' ') + '...';
      const emailSubject = `${isSpam ? '[SPAM?] ' : ''}New Lead: ${name} - ${routeTrigger}`;
      const now = new Date();
      
      threads.unshift({
        id: Date.now().toString(),
        snippet,
        subject: emailSubject,
        from: `ClickMe Leads <${fromEmail}>`,
        date: now.toLocaleDateString(),
        isSpam,
        messages: [{
          id: Date.now().toString(),
          from: `ClickMe Leads <${fromEmail}>`,
          text: emailBody,
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMine: false
        }]
      });
      
      await fs.writeFile(inboxPath, JSON.stringify(threads, null, 2));
    } catch (err) {
      console.error('Failed to save to local inbox:', err);
    }
    // ---------------------------

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Contact API handler error:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
