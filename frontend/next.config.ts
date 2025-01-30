import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
        port: "8000"
      },
      {
        protocol: 'https',
        hostname: 'https://clash.rajthombare.xyz',
        port: "",
      }
    ]
  },
  reactStrictMode: false
};

export default nextConfig;
