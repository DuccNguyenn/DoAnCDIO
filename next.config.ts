import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // hoặc cao hơn nếu cần
    },
  },
};

export default nextConfig;
