import { NextResponse } from 'next/server';
import {
  kv_getLeads,
  kv_setLeads,
  kv_getSettings,
  kv_getThreads,
  kv_setThreads,
} from '@/lib/kv';
import { sendEmail, wrapDavisGarnettEmail } from '@/lib/mail';

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
      const settings = await kv_getSettings();
      if (settings.formRouting && settings.formRouting[routeTrigger]) {
        assignedLabels = settings.formRouting[routeTrigger];
      }
    } catch (e) {
      // Ignore routing errors, default to General Contacts
    }

    // --- CLOUD CRM CAPTURE (Upstash Redis `dg:leads`) ---
    if (!isSpam) {
      try {
        const leads = await kv_getLeads();

        const existingLeadIndex = leads.findIndex(
          (l: any) => l.email && email && l.email.toLowerCase() === email.toLowerCase()
        );

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
            ...customFields,
          };

          existingLead.status = 'Recently Corresponded';
          existingLead.date = new Date().toISOString();
          if (phone && phone !== 'N/A') existingLead.phone = phone;
          if (method && method !== 'N/A') existingLead.method = method;

          leads.splice(existingLeadIndex, 1);
          leads.unshift(existingLead);

          console.log('Existing lead updated in ClickMe CRM:', name);
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
            isShared: !isSpam,
            labels: assignedLabels,
            date: new Date().toISOString(),
          };

          leads.unshift(newLead);
          console.log('Lead captured in ClickMe CRM:', name);
        }

        await kv_setLeads(leads);
      } catch (err) {
        console.error('Failed to save lead to ClickMe CRM:', err);
      }
    } else {
      console.log('Spam detected. Skipping CRM capture for:', name);
    }
    // ------------------------------------------------------

    const fromEmail = process.env.GMAIL_USER || 'clickme.tostart@gmail.com';
    const notifyTo = process.env.NOTIFY_EMAIL || 'clickme.tostart@gmail.com';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davisgarnettsells.com';

    // Build custom fields text & HTML rows for email
    const formatKey = (k: string) => {
      const overrides: Record<string, string> = {
        interest: "I'm Interested In",
        loanType: 'Loan Type',
        modules: 'Modules',
        category: 'Partner Category',
        development: 'Development',
      };
      if (overrides[k]) return overrides[k];
      return k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    let customFieldsText = '';
    let customFieldsHtml = '';
    for (const [k, v] of Object.entries(customFields)) {
      if (k === 'skipAutoReply') continue;
      const formattedKey = formatKey(k);
      const valStr = Array.isArray(v) ? v.join(', ') : String(v);
      customFieldsText += `- ${formattedKey}: ${valStr}\n`;
      customFieldsHtml += `
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(formattedKey)}</td>
          <td style="padding:8px 12px;font-weight:600;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(valStr)}</td>
        </tr>`;
    }

    const emailBody = `
You have received a new inquiry from davisgarnettsells.com.

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

    const adminSubject = `${isSpam ? '[SPAM?] ' : ''}[D&G Website] ${routeTrigger} — ${name}`;

    if (!isSpam) {
      const adminBodyHtml = `
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f9fafb;">
            <td style="padding:9px 12px;color:#6b7280;font-size:13px;width:40%;border-bottom:1px solid #f3f4f6;">Name</td>
            <td style="padding:9px 12px;font-weight:700;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Email</td>
            <td style="padding:9px 12px;font-weight:600;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(email || 'N/A')}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Phone</td>
            <td style="padding:9px 12px;font-weight:600;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(phone || 'N/A')}</td>
          </tr>
          <tr>
            <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Preferred Method</td>
            <td style="padding:9px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(method || 'N/A')}</td>
          </tr>
          <tr style="background:#f9fafb;">
            <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Source</td>
            <td style="padding:9px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(source || 'N/A')}</td>
          </tr>
          ${customFieldsHtml}
        </table>
        ${
          message
            ? `<div style="background:#FAF7EE;border-left:4px solid #D4AF37;padding:14px 18px;border-radius:4px;">
                 <div style="font-size:11px;color:#9A7D3A;text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:6px;">Message / Inquiry</div>
                 <p style="margin:0;color:#111827;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
               </div>`
            : ''
        }
      `;

      await sendEmail({
        to: notifyTo,
        subject: adminSubject,
        replyTo: email && String(email).includes('@') ? email : undefined,
        html: wrapDavisGarnettEmail({
          heading: 'New Website Inquiry',
          subheading: escapeHtml(routeTrigger),
          bodyHtml: adminBodyHtml,
          ctaLabel: 'Open ClickMe CRM →',
          ctaUrl: `${siteUrl}/clickme/crm`,
        }),
      });

      if (!body?.skipAutoReply && email && String(email).includes('@')) {
        const clientName = firstName ? escapeHtml(firstName) : 'there';
        const clientBodyHtml = `
          <p style="margin:0 0 14px 0;">Hi ${clientName},</p>
          <p style="margin:0 0 14px 0;">
            Thank you for reaching out to <strong>Davis &amp; Garnett Commercial / Residential Advisors</strong> regarding <strong>${escapeHtml(routeTrigger)}</strong>.
          </p>
          <p style="margin:0 0 14px 0;">
            We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
          </p>
          <p style="margin:0;">
            In the meantime, feel free to explore our Tampa Bay portfolio, featured developments, and advisory guides anytime.
          </p>
        `;

        await sendEmail({
          to: email,
          subject: `We Received Your Inquiry — Davis & Garnett Advisors (${routeTrigger})`,
          replyTo: 'list@davisgarnettsells.com',
          html: wrapDavisGarnettEmail({
            heading: 'Thank You for Contacting Us',
            subheading: escapeHtml(routeTrigger),
            bodyHtml: clientBodyHtml,
            ctaLabel: 'Visit davisgarnettsells.com',
            ctaUrl: siteUrl,
          }),
        });
      }
    } else {
      console.warn(`Spam detected — suppressing outbound email for: ${name} <${email}>`);
    }

    // --- CLOUD INBOX CAPTURE (Upstash Redis `dg:threads`) ---
    try {
      const threads = await kv_getThreads();

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
        messages: [
          {
            id: Date.now().toString(),
            from: `ClickMe Leads <${fromEmail}>`,
            text: emailBody,
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: false,
          },
        ],
      });

      await kv_setThreads(threads);
    } catch (err) {
      console.error('Failed to save to inbox threads:', err);
    }
    // ---------------------------

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Contact API handler error:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
