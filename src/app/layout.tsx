import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import AmbientBackground from "@/components/AmbientBackground";
import DragScrollProvider from "@/components/DragScrollProvider";
import "./globals.css";

// Modern, sleek geometric sans-serif for the proposal display/heading text
const outfit = Outfit({
  variable: "--font-serif", // Keeping the variable name same to avoid refactoring the proposal
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Clean, precise sans-serif for body, labels, UI
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Editorial luxury serif option for card/box titles
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// High-contrast classical serif option for card/box titles
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.davisgarnettsells.com"),
  title: "Davis & Garnett | Tampa Bay Residential & Commercial Real Estate Advisors",
  description:
    "Mark Davis and Rachael Garnett are Commercial and Residential Real Estate Advisors with Align Right Realty Carrollwood, serving Tampa, St. Petersburg, Carrollwood, Wesley Chapel, and Clearwater.",
  openGraph: {
    siteName: "Davis & Garnett Real Estate Advisors",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
        width: 1200,
        height: 630,
        alt: "Davis & Garnett Commercial and Residential Real Estate Advisors in Tampa Bay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Davis & Garnett | Commercial & Residential Real Estate Advisors",
    description:
      "Serving homebuyers, sellers, 55+ communities, and commercial investors across Greater Tampa Bay.",
    images: ["/davis-garnett-real-estate-advisors-cover-image-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${dmSans.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-black text-white`} suppressHydrationWarning>
        <AmbientBackground />
        <DragScrollProvider />
        <main className="w-full relative flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
