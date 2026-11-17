import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.zillowstatic.com",
        pathname: "/fp/**",
      },
      {
        protocol: "https",
        hostname: "cdn.lofty.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/listings", destination: "/properties", permanent: true },
      { source: "/mark", destination: "/about/mark-davis", permanent: true },
      { source: "/davis", destination: "/about/mark-davis", permanent: true },
      { source: "/rachael", destination: "/about/rachael-garnett", permanent: true },
      { source: "/garnett", destination: "/about/rachael-garnett", permanent: true },
      { source: "/about/contact", destination: "/contact", permanent: true },
      { source: "/locations/st-pete", destination: "/knowledge-hub/areas/st-petersburg", permanent: true },
      {
        source: "/about/align-right-realty-carrollwood/coverage",
        destination: "/align-right-carrollwood-coverage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
