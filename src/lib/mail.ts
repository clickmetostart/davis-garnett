import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface SendEmailOptions {
  to: string | string[];
  cc?: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
  attachments?: EmailAttachment[];
}

export interface EmailTemplateOptions {
  heading: string;
  subheading?: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

/**
 * Wraps email body HTML in a clean, Gmail-safe Davis & Garnett branded layout
 * with the ClickMe on-behalf-of-Davis-&-Garnett delivery footer.
 */
export function wrapDavisGarnettEmail({
  heading,
  subheading,
  bodyHtml,
  ctaLabel,
  ctaUrl,
}: EmailTemplateOptions): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.davisgarnettsells.com';
  const safeCtaUrl = ctaUrl || siteUrl;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
      <div style="background:#0A1628;padding:28px 32px;text-align:center;border-bottom:3px solid #D4AF37;">
        <div style="font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#D4AF37;font-weight:700;margin-bottom:6px;">
          Davis &amp; Garnett Commercial / Residential Advisors
        </div>
        <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;line-height:1.3;">
          ${heading}
        </h1>
        ${
          subheading
            ? `<p style="color:rgba(255,255,255,0.78);margin:8px 0 0 0;font-size:13px;">${subheading}</p>`
            : ''
        }
      </div>

      <div style="padding:28px 32px;color:#1f2937;font-size:14px;line-height:1.6;">
        ${bodyHtml}
        ${
          ctaLabel
            ? `<div style="text-align:center;margin-top:24px;">
                 <a href="${safeCtaUrl}" style="display:inline-block;background:#0A1628;color:#D4AF37;text-decoration:none;padding:11px 24px;border-radius:6px;font-weight:700;font-size:13px;border:1px solid #D4AF37;">
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
          Sent via ClickMe Automated Systems on behalf of Davis &amp; Garnett Advisors.
        </div>
      </div>
    </div>
  `.trim();
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
  subject,
  html,
  replyTo,
  fromName = 'Davis & Garnett Advisors',
  attachments,
}: SendEmailOptions): Promise<{ ok: boolean; mocked?: boolean; messageId?: string; error?: string }> {
  const user = process.env.GMAIL_USER;
  const recipients = Array.isArray(to) ? to.join(', ') : to;

  const transporter = await createTransporter();

  if (!transporter || !user) {
    console.warn('\n--- MAIL ROUTING WARNING ---');
    console.warn('Gmail OAuth credentials are NOT configured in environment variables.');
    console.warn(`Would have sent to: ${recipients}`);
    console.warn(`Subject: ${subject}`);
    console.warn('---------------------------\n');
    return { ok: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      cc,
      subject,
      html,
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

