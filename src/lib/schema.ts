/**
 * lib/schema.ts
 * Shared Schema.org JSON-LD builder utility for ClickMe Template.
 * All structured data across the site is generated here for consistency.
 */

const BASE_URL = 'https://www.clickme.life';

// ─── Shared constants ─────────────────────────────────────────────────────────

export const LENDER_NAME = 'ClickMe Template';
export const LENDER_URL = BASE_URL;
export const ROB_NAME = 'Admin User';
export const ROB_NMLS = '';
export const PHONE = '';
export const EMAIL = 'clickme.tostart@gmail.com';
export const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '8446 Excelsior Dr Ste 2-RM',
  addressLocality: 'Madison',
  addressRegion: 'WI',
  postalCode: '53717',
  addressCountry: 'US',
};
export const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 43.0731,
  longitude: -89.4012,
};
export const AREA_SERVED = [
  'Wisconsin', 'Illinois', 'Florida', 'Texas', 'Colorado',
  'Minnesota', 'Iowa', 'Michigan', 'North Dakota', 'South Dakota', 'Washington',
];
export const SAME_AS = [
  'https://www.facebook.com/ClickMehomeloans',
  'https://www.linkedin.com/in/robmillerprovisor',
  'https://www.youtube.com/@ClickMehomeloans',
];

// ─── MortgageBroker (site-wide / layout) ─────────────────────────────────────

export function buildMortgageBrokerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MortgageBroker'],
    '@id': `${BASE_URL}/#organization`,
    name: LENDER_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo-header.jpg`,
    image: `${BASE_URL}/rob-miller.jpg`,
    description:
      'Expert mortgage lender serving Madison, WI and surrounding areas. Specializing in FHA, VA, conventional, jumbo, USDA, and WHEDA home loans.',
    telephone: PHONE,
    email: EMAIL,
    address: ADDRESS,
    geo: GEO,
    areaServed: AREA_SERVED,
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    founder: {
      '@type': 'Person',
      name: ROB_NAME,
      jobTitle: 'Branch Manager & Senior Loan Officer',
      identifier: ROB_NMLS,
      url: `${BASE_URL}/about-rob`,
      image: `${BASE_URL}/rob-miller.jpg`,
      telephone: PHONE,
      email: EMAIL,
      sameAs: ['https://www.linkedin.com/in/robmillerprovisor'],
    },
    sameAs: SAME_AS,
    hasMap: 'https://maps.google.com/?q=8446+Excelsior+Dr+Ste+2-RM+Madison+WI+53717',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Mortgage Loan',
  };
}

// ─── WebPage ──────────────────────────────────────────────────────────────────

export function buildWebPageSchema({
  name,
  description,
  url,
  breadcrumbItems,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbItems?: Array<{ name: string; item: string }>;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
  };

  if (breadcrumbItems && breadcrumbItems.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.item,
      })),
    };
  }

  return schema;
}

// ─── LoanOrCredit (loan product pages) ───────────────────────────────────────

export function buildLoanSchema({
  name,
  description,
  url,
  loanType,
  feesAndCommissionsSpecification,
  requiredCollateral,
  amount,
}: {
  name: string;
  description: string;
  url: string;
  loanType: string;
  feesAndCommissionsSpecification?: string;
  requiredCollateral?: string;
  amount?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name,
    description,
    url,
    loanType,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: AREA_SERVED,
    currency: 'USD',
    ...(feesAndCommissionsSpecification && { feesAndCommissionsSpecification }),
    ...(requiredCollateral && { requiredCollateral }),
    ...(amount && { amount }),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────

export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ─── Article (blog posts / guides / webinars) ─────────────────────────────────

export function buildArticleSchema({
  headline,
  description,
  url,
  datePublished,
  image,
  isGuide = false,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
  isGuide?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': isGuide ? 'HowTo' : 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: ROB_NAME,
      url: `${BASE_URL}/about-rob`,
      identifier: ROB_NMLS,
    },
    publisher: {
      '@type': 'Organization',
      name: LENDER_NAME,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo-header.jpg` },
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
      },
    }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// ─── Person (ClickMe Admin bio page) ────────────────────────────────────────────

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: ROB_NAME,
    url: `${BASE_URL}/about-rob`,
    image: `${BASE_URL}/rob-miller.jpg`,
    jobTitle: 'Branch Manager & Senior Loan Officer',
    description:
      'ClickMe Admin is a Branch Manager and Senior Loan Officer at ProVisor, Inc. with 20+ years of mortgage experience. Licensed in 11 states. NMLS #239865.',
    telephone: PHONE,
    email: EMAIL,
    identifier: ROB_NMLS,
    worksFor: {
      '@type': 'MortgageBroker',
      name: LENDER_NAME,
      url: BASE_URL,
    },
    address: ADDRESS,
    sameAs: [
      'https://www.linkedin.com/in/robmillerprovisor',
      'https://www.facebook.com/ClickMehomeloans',
    ],
    knowsAbout: [
      'FHA Loans', 'VA Loans', 'Conventional Loans', 'WHEDA Loans',
      'USDA Loans', 'Jumbo Loans', 'Mortgage Planning', 'Refinancing',
    ],
  };
}

// ─── CollectionPage (knowledge hub) ──────────────────────────────────────────

export function buildCollectionPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ClickMe Template',
    url: `${BASE_URL}/contact`,
    description:
      'Contact ClickMe Admin and the ClickMe Template team. Licensed in 11 states. Call 608-227-2002 or email rob@clickme.life.',
    mainEntity: {
      '@type': 'MortgageBroker',
      '@id': `${BASE_URL}/#organization`,
      name: LENDER_NAME,
      telephone: PHONE,
      email: EMAIL,
      address: ADDRESS,
    },
  };
}

// ─── AggregateRating (reviews page) ──────────────────────────────────────────

export function buildReviewsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MortgageBroker'],
    '@id': `${BASE_URL}/#organization`,
    name: LENDER_NAME,
    url: BASE_URL,
    image: `${BASE_URL}/logo-header.jpg`,
    telephone: PHONE,
    address: ADDRESS,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '60',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

// ─── WebApplication (calculator pages) ───────────────────────────────────────

export function buildWebAppSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: { '@id': `${BASE_URL}/#organization` },
  };
}

// ─── LocalBusiness (state location pages) ────────────────────────────────────

export function buildLocationSchema({
  stateName,
  stateSlug,
  description,
}: {
  stateName: string;
  stateSlug: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MortgageBroker',
    name: `${LENDER_NAME} — ${stateName}`,
    description,
    url: `${BASE_URL}/locations/${stateSlug}`,
    telephone: PHONE,
    email: EMAIL,
    address: ADDRESS,
    geo: GEO,
    areaServed: {
      '@type': 'State',
      name: stateName,
      containedInPlace: { '@type': 'Country', name: 'United States' },
    },
    parentOrganization: { '@id': `${BASE_URL}/#organization` },
    sameAs: SAME_AS,
  };
}

// ─── VideoObject ─────────────────────────────────────────────────────────────

function cleanAndEncodeUrl(url: string): string {
  let fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  // Normalize casing mismatch from '/Real Estate/' to '/real estate/'
  fullUrl = fullUrl.replace(/\/Real Estate\//gi, '/real estate/');
  return encodeURI(fullUrl);
}

export function buildVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
}) {
  const encodedContentUrl = cleanAndEncodeUrl(contentUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: cleanAndEncodeUrl(thumbnailUrl),
    uploadDate,
    contentUrl: encodedContentUrl,
    embedUrl: encodedContentUrl,
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

// ─── JSON-LD helper — renders a <script> tag string (for server components) ──

export function jsonLdScript(schema: unknown): string {
  return JSON.stringify(schema);
}
