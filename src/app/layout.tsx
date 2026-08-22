import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

// Modern, sleek geometric sans-serif for massive display/heading text
const outfit = Outfit({
  variable: "--font-serif", // Keeping the variable name same to avoid refactoring every class, but it's now a modern sans
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
      <body className={`${outfit.variable} ${dmSans.variable} antialiased bg-black text-white overflow-x-hidden max-w-[100vw]`}>
        {children}
      </body>
    </html>
  );
}
