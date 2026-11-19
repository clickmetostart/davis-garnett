import Link from "next/link";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fair Housing & Equal Opportunity | Davis & Garnett",
  description:
    "Davis & Garnett and Align Right Realty Carrollwood's commitment to the Federal Fair Housing Act, Florida Fair Housing Act, and Equal Housing Opportunity.",
  path: "/fair-housing",
  image: "/davis-garnett-hero.png",
});

export default function FairHousingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fair Housing & Equal Opportunity", path: "/fair-housing" },
        ])}
      />
      <ProposalNav />

      <section className="pt-36 pb-16 px-6 sm:px-8 bg-[#050505] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Equal Housing Opportunity
          </span>
          <h1 className="font-aiveritas text-4xl md:text-5xl text-white mb-4">
            Fair Housing Statement
          </h1>
          <p className="text-white/75 text-base font-light max-w-2xl leading-relaxed">
            Our commitment to fair, respectful, and equal housing and commercial real estate opportunity across Tampa Bay and the State of Florida.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-[#111]/80 text-base leading-relaxed">
          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Federal &amp; Florida Fair Housing Pledge
            </h2>
            <p>
              Davis &amp; Garnett and Align Right Realty Carrollwood (Broker License BK3401606) fully support the principles of the Federal Fair Housing Act (Title VIII of the Civil Rights Act of 1968), the Florida Fair Housing Act, and the National Association of REALTORS® Code of Ethics.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Equal Service Without Discrimination
            </h2>
            <p>
              All residential and commercial properties presented on <strong>davisgarnettsells.com</strong> are offered on an equal opportunity basis. We do not discriminate—and strictly oppose discrimination—based on race, color, religion, sex, handicap, disability, familial status, national origin, sexual orientation, or gender identity.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Report a Fair Housing Concern
            </h2>
            <p>
              If you believe you have experienced any housing discrimination or have questions about fair housing protections in Hillsborough, Pinellas, Pasco, Polk, or Marion County, please{" "}
              <Link href="/contact" className="text-[#9A7D3A] font-semibold underline hover:text-[#111]">
                contact our team directly
              </Link>{" "}
              or call Align Right Realty Carrollwood at <strong>(813) 374-6050</strong>.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

