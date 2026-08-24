import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display } from "next/font/google";
import AmbientBackground from "@/components/AmbientBackground";
import "./globals.css";

// Modern, sleek geometric sans-serif for the proposal display/heading text
const outfit = Outfit({
  variable: "--font-serif", // Keeping the variable name same to avoid refactoring the proposal
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Premium, fat serif exclusively for the client's live brand mockup
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  openGraph: {
    images: ["/davis-garnett-real-combo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${playfair.variable} ${dmSans.variable} antialiased bg-black text-white`}>
        <AmbientBackground />
        <main className="w-full relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
