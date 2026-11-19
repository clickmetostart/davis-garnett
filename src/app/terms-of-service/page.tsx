import Link from "next/link";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Service & MLS IDX Use | Davis & Garnett",
  description:
    "Website terms of service, Stellar MLS IDX non-commercial use rules, SMS consent terms, and Florida brokerage disclosures for Davis & Garnett.",
  path: "/terms-of-service",
  image: "/davis-garnett-hero.png",
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <ProposalNav />

      <section className="pt-36 pb-16 px-6 sm:px-8 bg-[#050505] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Legal &amp; MLS IDX Compliance
          </span>
          <h1 className="font-aiveritas text-4xl md:text-5xl text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/75 text-base font-light max-w-2xl leading-relaxed">
            Rules governing the use of <strong>davisgarnettsells.com</strong>, MLS IDX listing data, calculators, and advisory resources provided by Davis &amp; Garnett at Align Right Realty Carrollwood.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-[#111]/80 text-base leading-relaxed">
          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              1. Informational &amp; Personal Use
            </h2>
            <p>
              All property listings, market reports, neighborhood guides, and financial calculators (mortgage, CDD, NNN commercial rent, cap rate, seller net proceeds, and 1031 exchange timelines) are provided strictly for personal, non-commercial research. Figures are estimates only and should be verified with your lender, CPA, title company, or real estate attorney before closing.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              2. MLS IDX Data &amp; Accuracy Notice
            </h2>
            <p>
              Listing and market statistics displayed on this site are deemed reliable but are not guaranteed and remain subject to prior sale, price change, or withdrawal without notice. IDX data may not be copied, scraped, redistributed, or used for any commercial purpose outside evaluating a potential purchase, sale, or lease with Davis &amp; Garnett and Align Right Realty Carrollwood (Broker License BK3401606).
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              3. Agency Relationship &amp; No Automatic Representation
            </h2>
            <p>
              Browsing this website or submitting a contact form does not establish a formal brokerage or fiduciary agency relationship. Representation in Florida begins only upon a mutually signed listing agreement, buyer representation agreement, or commercial advisory agreement with Mark Davis (BK3209459) or Rachael Garnett (SL3378601) through Align Right Realty Carrollwood.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              4. Communications &amp; SMS Opt-In
            </h2>
            <p>
              By submitting your contact information and opting in, you authorize Davis &amp; Garnett to respond via email, phone, or text message regarding your real estate inquiry. You may opt out at any time by replying STOP or contacting our office. Please review our{" "}
              <Link href="/privacy-policy" className="text-[#9A7D3A] font-semibold underline hover:text-[#111]">
                Privacy Policy
              </Link>{" "}
              for full data handling details.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              5. Florida Governing Law &amp; Contact
            </h2>
            <p>
              These terms are governed by the laws of the State of Florida. Questions may be directed to Align Right Realty Carrollwood, 3903 Northdale Blvd Suite 115W, Tampa, FL 33624, or by calling <strong>(813) 374-6050</strong>.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

