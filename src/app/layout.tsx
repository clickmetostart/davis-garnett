import type { Metadata } from "next";
import localFont from "next/font/local";
import AmbientBackground from "@/components/AmbientBackground";
import DragScrollProvider from "@/components/DragScrollProvider";
import { OFFICE_GBP_URL, SITE_NAME, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";
import "./globals.css";

// Modern, sleek geometric sans-serif for the proposal display/heading text
const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  variable: "--font-serif", // Keeping the variable name same to avoid refactoring the proposal
  weight: "100 900",
  display: "swap",
});

// Clean, precise sans-serif for body, labels, UI
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
});

// Editorial luxury serif option for card/box titles
const playfair = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  display: "swap",
});

// High-contrast classical serif option for card/box titles
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.davisgarnettsells.com"),
  title: "Davis & Garnett | Tampa Bay Real Estate Advisors",
  description:
    "Mark Davis and Rachael Garnett are Commercial and Residential Advisors at Align Right Realty Carrollwood serving Tampa, St. Pete, and Carrollwood.",
  openGraph: {
    siteName: "Davis & Garnett Real Estate Advisors",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
        width: 1200,
        height: 630,
        alt: "Davis & Garnett Commercial and Residential Real Estate Advisors in Tampa Bay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davis & Garnett | Commercial & Residential Real Estate Advisors",
    description:
      "Serving homebuyers, sellers, 55+ communities, and commercial investors across Greater Tampa Bay.",
    images: ["/davis-garnett-real-estate-advisors-cover-image-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Commercial, land, and residential real estate advisors at Align Right Realty Carrollwood serving Greater Tampa Bay and Central Florida.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search-mls?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_URL}/#organization`,
        name: "Davis & Garnett — Align Right Realty Carrollwood",
        url: SITE_URL,
        image: `${SITE_URL}/davis-garnett-real-estate-advisors-cover-image-2.jpg`,
        telephone: "+1-727-808-3344",
        email: "list@davisgarnettsells.com",
        hasMap: OFFICE_GBP_URL,
        sameAs: TEAM_SAME_AS,
        parentOrganization: {
          "@type": "RealEstateAgent",
          name: "Align Right Realty Carrollwood",
          identifier: "BK3401606",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "3903 Northdale Blvd Suite 115W",
          addressLocality: "Tampa",
          addressRegion: "FL",
          postalCode: "33624",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.0811,
          longitude: -82.5023,
        },
        areaServed: [
          "Tampa, FL",
          "Carrollwood, FL",
          "St. Petersburg, FL",
          "Clearwater, FL",
          "Wesley Chapel, FL",
          "Land O' Lakes, FL",
          "Brandon, FL",
          "Lutz, FL",
          "Sarasota, FL",
        ],
        member: [
          {
            "@type": "Person",
            "@id": `${SITE_URL}/about/mark-davis#person`,
            name: "Mark Davis",
            jobTitle: "Commercial & Residential Advisor",
            identifier: "FL License BK3209459",
            telephone: "+1-941-737-4127",
            url: `${SITE_URL}/about/mark-davis`,
          },
          {
            "@type": "Person",
            "@id": `${SITE_URL}/about/rachael-garnett#person`,
            name: "Rachael Garnett",
            jobTitle: "Commercial & Residential Advisor",
            identifier: "FL License SL3378601",
            telephone: "+1-727-808-3344",
            url: `${SITE_URL}/about/rachael-garnett`,
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${dmSans.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-black text-white`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
        />
        <AmbientBackground />
        <DragScrollProvider />
        <main className="w-full relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
