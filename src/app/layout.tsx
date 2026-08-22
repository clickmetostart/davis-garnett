import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClickMe x Davis & Garnett",
  description: "A strategic partnership proposal for Davis & Garnett to build authority, dominate AI search, and join the ClickMe network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased relative min-h-screen`}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
