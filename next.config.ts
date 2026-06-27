import type {NextConfig} from "next";
import fs from "fs";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb"
    }
  },
  serverExternalPackages: [
    "@remotion/bundler",
    "@remotion/renderer",
    "@rspack/core",
    "@rspack/binding"
  ],
  images: {
    remotePatterns: []
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader"
    });
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 50
  },
  // Ensure remotion folder is available in build
  async redirects() {
    return [];
  }
};

export default nextConfig;
