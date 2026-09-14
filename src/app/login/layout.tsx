import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Davis & Garnett | Client Workspace",
  description: "Secure digital environment and staging workspace for Davis & Garnett. Authenticate to access live previews and dashboard tools.",
  openGraph: {
    images: ["/dg-temp-login-seo-opengraph.jpg"],
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
