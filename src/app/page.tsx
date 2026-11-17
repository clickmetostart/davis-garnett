import HomePageClient from "@/components/HomePageClient";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Davis & Garnett | Tampa Bay Residential & Commercial Real Estate Advisors",
  description:
    "Work directly with Mark Davis and Rachael Garnett at Align Right Realty Carrollwood for residential homes, waterfront estates, 55+ communities, land, and commercial real estate across Tampa Bay.",
  path: "/",
  image: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
});

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Davis & Garnett Commercial & Residential Advisors",
    url: SITE_URL,
    image: `${SITE_URL}/davis-garnett-real-estate-advisors-cover-image-2.jpg`,
    telephone: "+1-727-808-3344",
    email: "list@davisgarnettsells.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3903 Northdale Blvd Suite 115W",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33624",
      addressCountry: "US",
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
    ],
    member: [
      {
        "@type": "Person",
        name: "Mark Davis",
        jobTitle: "Commercial & Residential Advisor",
        url: `${SITE_URL}/about/mark-davis`,
      },
      {
        "@type": "Person",
        name: "Rachael Garnett",
        jobTitle: "Commercial & Residential Advisor",
        url: `${SITE_URL}/about/rachael-garnett`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}

