import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Align Right Realty Carrollwood | Davis & Garnett Brokerage Office",
  description:
    "Located at 3903 Northdale Blvd Suite 115W in Tampa, Align Right Realty Carrollwood powers Davis & Garnett's residential and commercial real estate services across Florida.",
  path: "/about/align-right-realty-carrollwood",
  image: "/davis-garnett-hero.png",
});

export default function AlignRightOfficeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

