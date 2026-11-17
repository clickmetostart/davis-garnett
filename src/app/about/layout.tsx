import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Davis & Garnett | Tampa Bay Real Estate Advisors",
  description:
    "Meet Mark Davis and Rachael Garnett, Commercial and Residential Advisors at Align Right Realty Carrollwood serving buyers and sellers across Tampa Bay.",
  path: "/about",
  image: "/davis-garnett-real-estate-advisors-sitting-down-together.png",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

