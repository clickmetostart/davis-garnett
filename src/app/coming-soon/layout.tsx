import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Davis & Garnett Platform",
  description: "The digital architecture for Davis & Garnett is currently being assembled.",
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
