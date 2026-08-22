import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Agreement | ClickMe Platform",
  description: "Finalize your project scope and proceed to secure checkout.",
  openGraph: {
    images: ["/davis-garnett-real-combo.png"],
  },
};

export default function AgreementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
