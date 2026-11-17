import { NextResponse } from 'next/server';
import { INQUIRY_CATEGORIES, InquiryCategoryKey } from '@/lib/inquiries';
import {
  buildAdminInquiryEmail,
  buildClientConfirmationEmail,
  resolveTeamRecipients,
  escapeHtml,
} from '@/lib/mail';

const SAMPLE_BY_CATEGORY: Record<
  InquiryCategoryKey,
  { topic: string; source: string; message: string }
> = {
  commercial: {
    topic: 'Commercial / Mixed-Use Acquisition',
    source: 'Property Details (126-ridgewood-ave-brandon)',
    message:
      'Interested in cap rate history, lease expirations, and SBA 504 financing options for our medical office expansion.',
  },
  showing: {
    topic: 'Private Showing Request — 6100 Bahama Shores Dr S',
    source: 'Property Details (6100-bahama-shores-dr-s-st-petersburg)',
    message:
      'We are flying into Tampa this Thursday and would love a private tour at 2:00 PM with dock and seawall details.',
  },
  consultation: {
    topic: 'Selling a Tampa Bay Home & Buying Next',
    source: 'Contact Us Page (/contact)',
    message:
      'Looking to sell our Carrollwood home this spring and move closer to Water Street. Would appreciate a valuation walkthrough.',
  },
  developments: {
    topic: 'Valencia Ridge (Wesley Chapel) — 55+ Community Info',
    source: 'Featured Developments (/developments)',
    message:
      'Comparing single-story floor plans, monthly HOA/CDD fees, and build timelines for a move later this year.',
  },
  land: {
    topic: '770 Old Stokes Rd (79.54 Acres) — Agricultural / Land Tour',
    source: 'Property Details (770-old-stokes-rd-frostproof)',
    message:
      'Can you share survey boundaries, zoning allowance, and current Greenbelt tax classification?',
  },
  partner: {
    topic: 'Apply to Become a Vetted Strategic Partner: Environmental Inspectors',
    source: 'Strategic Partners (/about/strategic-partners)',
    message:
      'Our Tampa Bay firm handles Phase I & Phase II Environmental Site Assessments and septic evaluations across Hillsborough & Pasco.',
  },
  outreach: {
    topic: 'Local School Sponsorship & Volunteer Day Inquiry',
    source: 'Community Outreach (/about/community-outreach-giving)',
    message:
      'Reaching out from our Northdale PTA regarding upcoming teacher appreciation and youth sports sponsorship opportunities.',
  },
  general: {
    topic: 'General Real Estate Question — Tampa Bay Market',
    source: 'Contact Us Page (/contact)',
    message:
      'Relocating from Ohio in early summer and would love an introductory phone call with Mark and Rachael.',
  },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get('advisor') || 'team'; // 'team' | 'mark' | 'rachael'

  const assignedAdvisor =
    tier === 'mark'
      ? 'Mark Davis'
      : tier === 'rachael'
      ? 'Rachael Garnett'
      : 'Both Principals (Mark Davis & Rachael Garnett)';

  const routing = resolveTeamRecipients(assignedAdvisor);

  const previews = (Object.keys(INQUIRY_CATEGORIES) as InquiryCategoryKey[]).map((key) => {
    const category = INQUIRY_CATEGORIES[key];
    const sample = SAMPLE_BY_CATEGORY[key];
    const customFieldsHtml = `
      <tr>
        <td style="padding:8px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;">Requested Advisor</td>
        <td style="padding:8px 12px;font-weight:600;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6;">${escapeHtml(assignedAdvisor)}</td>
      </tr>`;

    const payload = {
      category,
      topic: sample.topic,
      name: 'Nicky Sample',
      firstName: 'Nicky',
      lastName: 'Sample',
      email: 'nicky@example.com',
      phone: '(813) 555-0148',
      method: 'Phone or Email',
      source: sample.source,
      message: sample.message,
      assignedAdvisor,
      customFieldsHtml,
    };

    const admin = buildAdminInquiryEmail(payload);
    const client = buildClientConfirmationEmail(payload);

    return {
      key,
      crmLabel: category.crmLabel,
      color: category.color,
      adminBadge: category.adminBadge,
      adminSubject: admin.subject,
      adminHtml: admin.html,
      clientSubject: client.subject,
      clientHtml: client.html,
    };
  });

  return NextResponse.json({
    advisorTier: tier,
    assignedAdvisor,
    routing: {
      to: Array.isArray(routing.to) ? routing.to.join(', ') : routing.to,
      cc: Array.isArray(routing.cc) ? routing.cc.join(', ') : routing.cc,
      bcc: Array.isArray(routing.bcc) ? routing.bcc.join(', ') : routing.bcc,
    },
    previews,
  });
}
