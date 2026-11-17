import { NextResponse } from 'next/server';
import {
  kv_getLeads,
  kv_setLeads,
  kv_getSettings,
  kv_getThreads,
  kv_setThreads,
  kv_getLabels,
} from '@/lib/kv';
import {
  sendEmail,
  escapeHtml,
  buildAdminInquiryEmail,
  buildClientConfirmationEmail,
  resolveTeamRecipients,
} from '@/lib/mail';
import { resolveInquiryCategory, cleanHumanTopic } from '@/lib/inquiries';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      name: bodyName,
      email,
      phone,
      subject,
      category: explicitCategory,
      message,
      notes,
      method,
      source,
      labels: extraLabels,
      ...rest
    } = body;

    const fullName =
      (bodyName && String(bodyName).trim()) ||
      `${firstName || ''} ${lastName || ''}`.trim() ||
      'Website Visitor';

    const derivedFirst = firstName || fullName.split(' ')[0] || '';
    const derivedLast = lastName || fullName.split(' ').slice(1).join(' ') || '';
    const finalMessage = message || notes || '';

    // Extract clean custom fields (ignoring internal/tech control flags)
    const ignoredKeys = new Set([
      'status',
      'pipelineStage',
      'skipAutoReply',
      'isSpam',
      'isTrashed',
      'isShared',
      'buySideConfig',
    ]);
    const customFields: Record<string, any> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (!ignoredKeys.has(key) && value !== undefined && value !== null && value !== '') {
        customFields[key] = value;
      }
    }

    // --- SPAM DETECTION ---
    const isSpamName = fullName.length > 14 && !fullName.includes(' ');
    const emailPrefix = (email || '').split('@')[0];
    const dotCount = (emailPrefix.match(/\./g) || []).length;
    const isSpamEmail =
      (email || '').includes('rat.enuka') ||
      (email || '').includes('lunari.ot') ||
      (email || '').includes('e.mu.b.u') ||
      dotCount > 3;

    const spamKeywords = [
      'seo',
      'rank your website',
      'page 1 of google',
      'guaranteed leads',
      'crypto',
      'bitcoin',
    ];
    const isSpamKeyword = spamKeywords.some((keyword) =>
      finalMessage.toLowerCase().includes(keyword)
    );
    const isSpam = isSpamName || isSpamEmail || isSpamKeyword;

    // --- CLEAN HUMAN TOPIC + CRM CATEGORY TAXONOMY ---
    const rawTrigger =
      subject ||
      customFields.propertyInterest ||
      customFields.interest ||
      customFields.inquiryType ||
      'Real Estate Inquiry';

    const category = resolveInquiryCategory(explicitCategory, rawTrigger, source);
    const cleanTopic = cleanHumanTopic(rawTrigger, category.clientIntroName);

    // Build unified CRM labels starting with our primary color-matched category label
    const assignedLabels = new Set<string>([category.crmLabel]);
    if (Array.isArray(extraLabels)) {
      for (const lbl of extraLabels) {
        if (lbl && typeof lbl === 'string') assignedLabels.add(lbl);
      }
    }

    try {
      await kv_getLabels(); // Ensure 8 Davis & Garnett categories are synced in Redis
      const settings = await kv_getSettings();
      if (settings.formRouting && settings.formRouting[cleanTopic]) {
        for (const mapped of settings.formRouting[cleanTopic]) {
          assignedLabels.add(mapped);
        }
      }
    } catch {
      // Ignore routing lookup failures
    }

    const labelList = Array.from(assignedLabels);

    // --- CLOUD CRM CAPTURE (Upstash Redis `dg:leads`) ---
    if (!isSpam) {
      try {
        const leads = await kv_getLeads();
        const existingLeadIndex = leads.findIndex(
          (l: any) => l.email && email && l.email.toLowerCase() === String(email).toLowerCase()
        );

        if (existingLeadIndex !== -1) {
          const existingLead = leads[existingLeadIndex];

          if (finalMessage) {
            const timestamp = new Date().toLocaleString();
            existingLead.message = existingLead.message
              ? `${existingLead.message}\n\n--- New Inquiry on ${timestamp} ---\n${finalMessage}`
              : finalMessage;
          }

          existingLead.labels = Array.isArray(existingLead.labels) ? existingLead.labels : [];
          for (const label of labelList) {
            if (!existingLead.labels.includes(label)) {
              existingLead.labels.push(label);
            }
          }

          existingLead.category = category.crmLabel;
          existingLead.subject = cleanTopic;
          existingLead.customFields = { ...existingLead.customFields, ...customFields };
          existingLead.status = 'Recently Corresponded';
          existingLead.date = new Date().toISOString();
          if (phone && phone !== 'N/A') existingLead.phone = phone;
          if (method && method !== 'N/A') existingLead.method = method;

          leads.splice(existingLeadIndex, 1);
          leads.unshift(existingLead);
        } else {
          const newLead = {
            id: Date.now(),
            name: fullName,
            firstName: derivedFirst,
            lastName: derivedLast,
            email: email || '',
            phone: phone || 'N/A',
            subject: cleanTopic,
            category: category.crmLabel,
            message: finalMessage,
            method: method || 'N/A',
            source: source || 'davisgarnettsells.com',
            customFields,
            status: 'New',
            isSpam: false,
            isTrashed: false,
            isShared: true,
            labels: labelList,
            date: new Date().toISOString(),
          };
          leads.unshift(newLead);
        }

        await kv_setLeads(leads);
      } catch (err) {
        console.error('Failed to save lead to ClickMe CRM:', err);
      }
    }

    // --- BUILD FORMATTED ADMIN + CLIENT EMAILS ---
    const fromEmail = process.env.GMAIL_USER || 'clickme.tostart@gmail.com';
    const teamRouting = resolveTeamRecipients(
      customFields.assignedAdvisor || customFields.advisorPreference || body.owner
    );

    const formatKey = (k: string) => {
      const overrides: Record<string, string> = {
        interest: 'Area of Interest',
        propertyInterest: 'Property / Focus',
        assignedAdvisor: 'Requested Advisor',
        inquiryType: 'Inquiry Type',
        loanType: 'Financing Type',
        category: 'Partner Category',
        development: 'Development',
        corridorPreference: 'Preferred Area',
        budgetRange: 'Price Range',
        timeline: 'Timeline',
        preferredTier: 'Residence Type',
        requestType: 'Request Type',
        advisorPreference: 'Preferred Advisor',
        assetFocus: 'Property Focus',
        budgetOrAcreage: 'Target Budget / Size',
        inquiryFocus: 'Buyer / Seller Focus',
        targetCommunities: 'Target Communities',
        companyOrProperty: 'Firm / Property',
        organizationName: 'Organization / School',
        causeCategory: 'Community Focus',
        topic: 'Topic',
        region: 'Target Region',
        transactionType: 'Transaction Type',
        propertyCategory: 'Property Type',
        priceRange: 'Budget Range',
        targetCorridors: 'Target Areas',
      };
      if (overrides[k]) return overrides[k];
      return k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    let customFieldsText = '';
    let customFieldsHtml = '';
    for (const [k, v] of Object.entries(customFields)) {
      const formattedKey = formatKey(k);
      const valStr = Array.isArray(v) ? v.join(', ') : String(v);
      customFieldsText += `- ${formattedKey}: ${valStr}\n`;
      customFieldsHtml += `
        <tr>
          <td style="padding:8px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(formattedKey)}</td>
          <td style="padding:8px 12px;font-weight:600;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(valStr)}</td>
        </tr>`;
    }

    const advisorChoice =
      customFields.assignedAdvisor || customFields.advisorPreference || body.owner;
    const emailPayload = {
      category,
      topic: cleanTopic,
      name: fullName,
      firstName: derivedFirst,
      lastName: derivedLast,
      email,
      phone,
      method,
      source: source || 'davisgarnettsells.com',
      message: finalMessage,
      assignedAdvisor: advisorChoice,
      customFieldsHtml,
    };

    const adminEmail = buildAdminInquiryEmail(emailPayload);

    if (!isSpam) {
      await sendEmail({
        to: teamRouting.to,
        cc: teamRouting.cc,
        bcc: teamRouting.bcc,
        subject: adminEmail.subject,
        replyTo: email && String(email).includes('@') ? email : undefined,
        html: adminEmail.html,
      });

      if (!body?.skipAutoReply && email && String(email).includes('@')) {
        const clientEmail = buildClientConfirmationEmail(emailPayload);
        await sendEmail({
          to: email,
          bcc: 'clickme.tostart@gmail.com',
          subject: clientEmail.subject,
          replyTo: 'list@davisgarnettsells.com',
          html: clientEmail.html,
        });
      }
    } else {
      console.warn(`Spam detected — suppressing outbound email for: ${fullName} <${email}>`);
    }

    // --- CLOUD INBOX CAPTURE (Upstash Redis `dg:threads`) ---
    try {
      const threads = await kv_getThreads();
      const plainSummary = [
        `Category: ${category.crmLabel}`,
        `Topic: ${cleanTopic}`,
        `Client: ${fullName} (${email || 'No email'} | ${phone || 'No phone'})`,
        customFieldsText ? `Details:\n${customFieldsText}` : '',
        finalMessage ? `Message:\n${finalMessage}` : '',
      ]
        .filter(Boolean)
        .join('\n\n');

      const snippet = plainSummary.substring(0, 110).replace(/\n/g, ' ') + '...';
      const now = new Date();

      threads.unshift({
        id: Date.now().toString(),
        snippet,
        subject: isSpam ? `[SPAM?] ${adminEmail.subject}` : adminEmail.subject,
        from: `${fullName} <${email || fromEmail}>`,
        date: now.toLocaleDateString(),
        category: category.crmLabel,
        isSpam,
        messages: [
          {
            id: Date.now().toString(),
            from: `${fullName} <${email || fromEmail}>`,
            text: plainSummary,
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: false,
          },
        ],
      });

      await kv_setThreads(threads);
    } catch (err) {
      console.error('Failed to save to inbox threads:', err);
    }

    return NextResponse.json({ message: 'Success', category: category.crmLabel }, { status: 200 });
  } catch (error) {
    console.error('Contact API handler error:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
