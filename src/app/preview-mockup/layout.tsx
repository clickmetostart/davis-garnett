import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Davis & Garnett | The Tampa Standard",
  description: "Tampa Bay's premier real estate group. Combining commercial and residential power to deliver an elevated advisory experience.",
  openGraph: {
    images: ["/davis-garnett-real-combo.png"],
  },
};

export default function MockupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
