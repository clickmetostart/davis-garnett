import { NextResponse } from 'next/server';
import { sendEmail, wrapDavisGarnettEmail } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      to,
      cc,
      subject,
      html,
      text,
      heading,
      subheading,
      replyTo,
      rawHtml = false,
      ctaLabel,
      ctaUrl,
    } = body;

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and html or text' },
        { status: 400 }
      );
    }

    const innerHtml =
      html ||
      `<p style="margin:0;white-space:pre-wrap;">${String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</p>`;

    const finalHtml = rawHtml
      ? innerHtml
      : wrapDavisGarnettEmail({
          heading: heading || subject,
          subheading,
          bodyHtml: innerHtml,
          ctaLabel,
          ctaUrl,
        });

    const result = await sendEmail({
      to,
      cc,
      subject,
      html: finalHtml,
      replyTo: replyTo || 'list@davisgarnettsells.com',
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mocked: Boolean(result.mocked),
      messageId: result.messageId || null,
    });
  } catch (error: any) {
    console.error('/api/email/send error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

