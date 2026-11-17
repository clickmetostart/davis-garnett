import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Mark Davis & Rachael Garnett | Tampa Bay Realtors",
  description:
    "Reach Mark Davis (941-737-4127) and Rachael Garnett (727-808-3344) at Align Right Realty Carrollwood, 3903 Northdale Blvd Suite 115W, Tampa, FL 33624.",
  path: "/contact",
  image: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

