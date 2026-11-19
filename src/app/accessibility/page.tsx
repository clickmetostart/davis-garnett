import Link from "next/link";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Accessibility Statement | Davis & Garnett",
  description:
    "Website accessibility commitment and direct assistance options for Davis & Garnett Real Estate Advisors at Align Right Realty Carrollwood.",
  path: "/accessibility",
  image: "/davis-garnett-hero.png",
});

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Accessibility Statement", path: "/accessibility" },
        ])}
      />
      <ProposalNav />

      <section className="pt-36 pb-16 px-6 sm:px-8 bg-[#050505] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Digital Access &amp; Support
          </span>
          <h1 className="font-aiveritas text-4xl md:text-5xl text-white mb-4">
            Accessibility Statement
          </h1>
          <p className="text-white/75 text-base font-light max-w-2xl leading-relaxed">
            Davis &amp; Garnett is committed to making our Tampa Bay real estate listings, neighborhood guides, and tools usable for every visitor.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-[#111]/80 text-base leading-relaxed">
          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Our Commitment to Web Accessibility
            </h2>
            <p>
              We work continuously to align <strong>davisgarnettsells.com</strong> with the Web Content Accessibility Guidelines (WCAG 2.1 Level AA), including readable typography, keyboard navigation, clear contrast ratios, and descriptive image text across desktop, tablet, and mobile devices.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Need Assistance With a Listing or Document?
            </h2>
            <p>
              If you have difficulty viewing any property dossier, PDF playbook, or interactive calculator—or would like property details provided in an alternative format—please{" "}
              <Link href="/contact" className="text-[#9A7D3A] font-semibold underline hover:text-[#111]">
                reach out via our Contact page
              </Link>{" "}
              or call Mark Davis (<strong>941-737-4127</strong>), Rachael Garnett (<strong>727-808-3344</strong>), or our Carrollwood office at <strong>(813) 374-6050</strong>.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

