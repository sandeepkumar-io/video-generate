import type {NextConfig} from "next";

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
  }
};

export default nextConfig;
