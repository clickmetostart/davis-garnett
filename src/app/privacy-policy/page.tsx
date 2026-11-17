import Link from "next/link";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Davis & Garnett Commercial / Residential Advisors",
  description:
    "How Davis & Garnett and ClickMe collect, use, and protect your contact details, email requests, and SMS consent preferences.",
  path: "/privacy-policy",
  image: "/davis-garnett-hero.png",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      <section className="pt-36 pb-16 px-8 bg-[#050505] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Legal &amp; Client Trust
          </span>
          <h1 className="font-aiveritas text-4xl md:text-5xl text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/75 text-base font-light max-w-2xl leading-relaxed">
            Plain-English rules explaining how Davis &amp; Garnett Commercial / Residential Advisors (affiliated with Align Right Realty Carrollwood) handle and protect your information.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-[#111]/80 text-base leading-relaxed">
          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you fill out a contact form, request property information, or download a real estate guide on <strong>davisgarnettsells.com</strong>, we collect only the details you choose to share—such as your name, email address, phone number, and property interests.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              2. How We Use Your Details
            </h2>
            <p>
              We use your information only to answer your real estate questions, send guides or listings you asked for, and connect you with Mark Davis, Rachael Garnett, or our vetted local service partners when you ask for an introduction.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#faf7ee] border border-[#D4AF37]/30">
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              3. Strictly No Sale of Phone, SMS, or Email Data
            </h2>
            <p>
              Mobile information, including SMS opt-in data and consent, <strong>will not be shared with third parties or affiliates for marketing purposes</strong>. We never sell or rent client contact lists to outside lead brokers.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              4. Automated Email &amp; Platform Delivery
            </h2>
            <p>
              Confirmation emails and requested property resources are delivered through ClickMe Automated Systems on behalf of Davis &amp; Garnett Advisors (<span className="font-medium text-[#111]">clickme.tostart@gmail.com</span>). You can reply directly or ask to stop messages at any time.
            </p>
          </div>

          <div>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              5. Questions or Removal Requests
            </h2>
            <p>
              To update or remove your contact details, please reach out through our{" "}
              <Link href="/contact" className="text-[#9A7D3A] font-semibold underline hover:text-[#111]">
                Contact Page
              </Link>{" "}
              or call our Carrollwood office at <strong>(813) 374-6050</strong> (3903 Northdale Blvd Suite 115W, Tampa, FL 33624).
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

