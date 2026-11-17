import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import type { InquiryCategoryConfig } from '@/lib/inquiries';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface SendEmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
  attachments?: EmailAttachment[];
  isPreview?: boolean;
}

export interface TeamRecipientRouting {
  to: string | string[];
  cc: string | string[];
  bcc: string[];
}

const TEAM_BCC_EMAILS = [
  'clickme.tostart@gmail.com',
  'msdavis118@gmail.com',
  'rachaellgarnett@gmail.com',
];

/**
 * Routes admin notifications across Rachael and Mark's brand emails (without
 * duplicating via the list@ alias) and BCCs their working @gmail addresses + ClickMe.
 */
export function resolveTeamRecipients(assignedAdvisor?: string): TeamRecipientRouting {
  const overrideTo = process.env.NOTIFY_EMAIL_OVERRIDE;
  if (overrideTo) {
    return {
      to: overrideTo,
      cc: [],
      bcc: ['clickme.tostart@gmail.com'],
    };
  }

  const hint = (assignedAdvisor || '').toLowerCase();
  const hasMark = hint.includes('mark');
  const hasRachael = hint.includes('rachael');
  const isBoth = hint.includes('both') || (hasMark && hasRachael) || (!hasMark && !hasRachael);

  if (isBoth) {
    return {
      to: ['rachael@davisgarnettsells.com', 'mark@davisgarnettsells.com'],
      cc: [],
      bcc: TEAM_BCC_EMAILS,
    };
  }

  if (hasMark) {
    return {
      to: 'mark@davisgarnettsells.com',
      cc: ['rachael@davisgarnettsells.com'],
      bcc: TEAM_BCC_EMAILS,
    };
  }

  return {
    to: 'rachael@davisgarnettsells.com',
    cc: ['mark@davisgarnettsells.com'],
    bcc: TEAM_BCC_EMAILS,
  };
}

export interface EmailTemplateOptions {
  heading: string;
  subheading?: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
  headerBg?: string;
  borderAccent?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Shared Gmail-safe HTML shell used by both Admin and Client emails.
 */
export function wrapDavisGarnettEmail({
  heading,
  subheading,
  bodyHtml,
  ctaLabel,
  ctaUrl,
  headerBg = '#0A1628',
  borderAccent = '#D4AF37',
  badgeText = 'Davis & Garnett Commercial / Residential Advisors',
  badgeBg,
  badgeColor = '#D4AF37',
}: EmailTemplateOptions): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davisgarnettsells.com';
  const safeCtaUrl = ctaUrl || siteUrl;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
      <div style="background:${headerBg};padding:28px 32px;text-align:center;border-bottom:4px solid ${borderAccent};">
        <div style="margin-bottom:8px;">
          ${
            badgeBg
              ? `<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${badgeBg};color:${badgeColor};font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${badgeText}</span>`
              : `<span style="font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${badgeColor};font-weight:700;">${badgeText}</span>`
          }
        </div>
        <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;line-height:1.3;">
          ${heading}
        </h1>
        ${
          subheading
            ? `<p style="color:rgba(255,255,255,0.88);margin:8px 0 0 0;font-size:13.5px;font-weight:500;">${subheading}</p>`
            : ''
        }
      </div>

      <div style="padding:28px 32px;color:#1f2937;font-size:14px;line-height:1.6;">
        ${bodyHtml}
        ${
          ctaLabel
            ? `<div style="text-align:center;margin-top:24px;">
                 <a href="${safeCtaUrl}" style="display:inline-block;background:${headerBg};color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-weight:700;font-size:13px;border:1px solid ${borderAccent};">
                   ${ctaLabel}
                 </a>
               </div>`
            : ''
        }
      </div>

      <div style="padding:18px 28px;text-align:center;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:11.5px;line-height:1.5;">
        <div style="font-weight:700;color:#0A1628;">
          Davis &amp; Garnett Commercial / Residential Advisors · Align Right Realty Carrollwood
        </div>
        <div>3903 Northdale Blvd Suite 115W, Tampa, FL 33624 · davisgarnettsells.com</div>
        <div style="margin-top:6px;color:#9ca3af;font-size:11px;">
          Automated delivery by ClickMe on behalf of Davis &amp; Garnett Advisors.
        </div>
      </div>
    </div>
  `.trim();
}

export interface InquiryEmailPayload {
  category: InquiryCategoryConfig;
  topic: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  method?: string;
  source?: string;
  message?: string;
  assignedAdvisor?: string;
  customFieldsHtml?: string;
}

/**
 * Builds the color-coded Admin Notification email matching the CRM category badge.
 */
export function buildAdminInquiryEmail(payload: InquiryEmailPayload) {
  const { category, topic, name, email, phone, method, source, message, customFieldsHtml = '' } =
    payload;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davisgarnettsells.com';

  const subject = `[${category.crmLabel}] ${topic} — ${name}`;

  const bodyHtml = `
    <div style="margin-bottom:18px;padding:12px 14px;border-radius:8px;background:${category.accentBg};border:1px solid ${category.color}40;">
      <span style="font-size:12px;color:#374151;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">Inquiry Category:</span>
      <span style="display:inline-block;margin-left:8px;padding:4px 12px;border-radius:999px;background:${category.color};color:#ffffff;font-size:11.5px;font-weight:700;">
        ${escapeHtml(category.crmLabel)}
      </span>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr style="background:#f9fafb;">
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;width:38%;border-bottom:1px solid #f3f4f6;">Client Name</td>
        <td style="padding:9px 12px;font-weight:700;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Email</td>
        <td style="padding:9px 12px;font-weight:600;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(email || 'Not provided')}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Phone</td>
        <td style="padding:9px 12px;font-weight:600;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(phone || 'Not provided')}</td>
      </tr>
      <tr>
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Inquiry Topic</td>
        <td style="padding:9px 12px;font-weight:600;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(topic)}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Preferred Contact</td>
        <td style="padding:9px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(method || 'Email or Phone')}</td>
      </tr>
      <tr>
        <td style="padding:9px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Page</td>
        <td style="padding:9px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${escapeHtml(source || 'davisgarnettsells.com')}</td>
      </tr>
      ${customFieldsHtml}
    </table>

    ${
      message
        ? `<div style="background:#f9fafb;border-left:4px solid ${category.color};padding:14px 18px;border-radius:4px;">
             <div style="font-size:11px;color:${category.color};text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:6px;">Client Message</div>
             <p style="margin:0;color:#111827;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
           </div>`
        : ''
    }
  `;

  const html = wrapDavisGarnettEmail({
    heading: category.adminHeading,
    subheading: escapeHtml(topic),
    bodyHtml,
    ctaLabel: 'Open Client in Portal →',
    ctaUrl: `${siteUrl}/clickme/crm`,
    headerBg: '#0A1628',
    borderAccent: category.color,
    badgeText: category.adminBadge,
    badgeBg: category.color,
    badgeColor: '#ffffff',
  });

  return { subject, html };
}

/**
 * Builds the warm, zero-tech-speak Client Confirmation email.
 */
export function buildClientConfirmationEmail(payload: InquiryEmailPayload) {
  const { category, topic, firstName, name, message, phone, assignedAdvisor } = payload;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davisgarnettsells.com';
  const greetingName = escapeHtml(firstName || name.split(' ')[0] || 'there');

  const advisorHint = (assignedAdvisor || '').toLowerCase();
  const isMarkOnly = advisorHint.includes('mark') && !advisorHint.includes('rachael') && !advisorHint.includes('both');
  const isRachaelOnly = advisorHint.includes('rachael') && !advisorHint.includes('mark') && !advisorHint.includes('both');
  const teamAddressing = isMarkOnly
    ? '<strong>Mark Davis</strong>'
    : isRachaelOnly
    ? '<strong>Rachael Garnett</strong>'
    : '<strong>Mark Davis</strong> and <strong>Rachael Garnett</strong>';

  const subject = `${category.clientHeading} — Davis & Garnett Advisors`;

  const bodyHtml = `
    <p style="margin:0 0 14px 0;">Hi ${greetingName},</p>
    <p style="margin:0 0 14px 0;">
      Thank you for reaching out to ${teamAddressing} regarding <strong>${escapeHtml(topic)}</strong>.
    </p>
    <p style="margin:0 0 14px 0;">
      We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
    </p>
    ${
      message
        ? `<div style="margin:18px 0;padding:14px 18px;background:#f9fafb;border-left:4px solid #0A1628;border-radius:4px;">
             <div style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#4b5563;font-weight:700;margin-bottom:6px;">
               What You Shared With Us
             </div>
             <p style="margin:0;color:#111827;font-size:13.5px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</p>
             ${
               phone && phone !== 'N/A'
                 ? `<div style="margin-top:8px;font-size:12px;color:#6b7280;">Callback Number Provided: <strong style="color:#111827;">${escapeHtml(phone)}</strong></div>`
                 : ''
             }
           </div>`
        : ''
    }
    <div style="margin:20px 0;padding:16px 18px;background:#faf7ee;border-left:4px solid #D4AF37;border-radius:4px;">
      <div style="font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#9A7D3A;font-weight:700;margin-bottom:6px;">
        Need to reach us sooner?
      </div>
      <div style="font-size:13.5px;color:#111827;line-height:1.6;">
        <strong>Mark Davis, REALTOR®:</strong> 941-737-4127<br />
        <strong>Rachael Garnett, REALTOR®:</strong> 727-808-3344
      </div>
    </div>
    <p style="margin:0;">
      In the meantime, feel free to browse our Tampa Bay properties, featured communities, and neighborhood guides anytime.
    </p>
  `;

  const html = wrapDavisGarnettEmail({
    heading: category.clientHeading,
    subheading: escapeHtml(topic),
    bodyHtml,
    ctaLabel: 'Explore davisgarnettsells.com',
    ctaUrl: siteUrl,
    headerBg: '#0A1628',
    borderAccent: '#D4AF37',
    badgeText: 'Davis & Garnett Commercial / Residential Advisors',
    badgeColor: '#D4AF37',
  });

  return { subject, html };
}

async function createTransporter() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  const user = process.env.GMAIL_USER;

  if (!clientId || !clientSecret || !refreshToken || !user) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { token: accessToken } = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken: accessToken as string,
    },
  });
}

export async function sendEmail({
  to,
  cc,
  bcc,
  subject,
  html,
  replyTo,
  fromName = 'Davis & Garnett Advisors',
  attachments,
  isPreview = false,
}: SendEmailOptions): Promise<{ ok: boolean; mocked?: boolean; messageId?: string; error?: string }> {
  const user = process.env.GMAIL_USER;
  const recipients = Array.isArray(to) ? to.join(', ') : to;

  const isNonProdOrOverride =
    Boolean(process.env.NOTIFY_EMAIL_OVERRIDE) ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV !== 'production';
  const flaggedAsPreview = isPreview || isNonProdOrOverride || /^\s*\[?PREVIEW\b/i.test(subject);

  const finalSubject =
    flaggedAsPreview && !/^\s*\[?PREVIEW\b/i.test(subject)
      ? `[PREVIEW] ${subject}`
      : subject;

  const previewBanner = flaggedAsPreview
    ? `<div style="max-width:620px;margin:0 auto 12px auto;padding:10px 16px;background:#fef3c7;border:2px solid #d97706;border-radius:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#92400e;text-align:center;">PREVIEW EMAIL &bull; TEST / NON-PRODUCTION SEND</div>`
    : '';
  const finalHtml = `${previewBanner}${html}`;

  const transporter = await createTransporter();

  if (!transporter || !user) {
    console.warn('\n--- MAIL ROUTING WARNING ---');
    console.warn('Gmail OAuth credentials are NOT configured in environment variables.');
    console.warn(`Would have sent to: ${recipients}`);
    console.warn(`Subject: ${finalSubject}`);
    console.warn('---------------------------\n');
    return { ok: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      cc,
      bcc,
      subject: finalSubject,
      html: finalHtml,
      replyTo,
      attachments: attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    });

    console.log(`Email sent via Gmail OAuth2 (${user}) -> ${recipients}: ${info.messageId}`);
    return { ok: true, mocked: false, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending email via Gmail API OAuth2:', error);
    return { ok: false, error: error?.message || 'Unknown email error' };
  }
}
