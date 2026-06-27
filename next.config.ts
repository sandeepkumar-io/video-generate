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
  webpack: (config, {isServer}) => {
    // Handle .node files
    config.module.rules.push({
      test: /\.node$/,
      use: "node-loader"
    });

    // For server-side code, mark remotion as external to avoid bundling issues
    if (isServer) {
      config.externals = config.externals || {};
      if (typeof config.externals === "object") {
        config.externals["./remotion"] = "./remotion";
        config.externals["../remotion"] = "../remotion";
      }
    }

    return config;
  },
  // Output configuration for serverless
  output: process.env.VERCEL ? undefined : "standalone"
};

export default nextConfig;
