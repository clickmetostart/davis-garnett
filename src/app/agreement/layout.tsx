import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Agreement | ClickMe Platform",
  description: "Finalize your project scope and proceed to secure checkout.",
};

export default function AgreementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
