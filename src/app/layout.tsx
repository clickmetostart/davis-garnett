import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import AmbientBackground from "@/components/AmbientBackground";
import "./globals.css";

// Premium, fat serif for large titles
const playfair = Playfair_Display({
  variable: "--font-serif",
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
      <body className={`${playfair.variable} ${dmSans.variable} antialiased bg-black text-white`}>
        <AmbientBackground />
        <main className="w-full relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
