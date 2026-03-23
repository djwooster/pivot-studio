import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/web-apps", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
