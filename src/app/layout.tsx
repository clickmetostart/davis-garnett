import type { Metadata } from "next";
import localFont from "next/font/local";
import AmbientBackground from "@/components/AmbientBackground";
import DragScrollProvider from "@/components/DragScrollProvider";
import "./globals.css";

// Modern, sleek geometric sans-serif for the proposal display/heading text
const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  variable: "--font-serif", // Keeping the variable name same to avoid refactoring the proposal
  weight: "100 900",
  display: "swap",
});

// Clean, precise sans-serif for body, labels, UI
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
});

// Editorial luxury serif option for card/box titles
const playfair = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  display: "swap",
});

// High-contrast classical serif option for card/box titles
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-latin.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.davisgarnettsells.com"),
  title: "Davis & Garnett | Tampa Bay Real Estate Advisors",
  description:
    "Mark Davis and Rachael Garnett are Commercial and Residential Advisors at Align Right Realty Carrollwood serving Tampa, St. Pete, and Carrollwood.",
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
