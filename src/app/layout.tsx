import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

// Elegant serif for all display/heading text — replaces Georgia from their Canva site
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Clean, precise sans-serif for body, labels, UI
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ClickMe × Davis & Garnett | A Partnership Proposal",
  description: "A strategic proposal for Davis & Garnett Commercial & Residential Advisors — Tampa Bay's premier real estate duo — to dominate AI-powered search and build lasting digital authority.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
