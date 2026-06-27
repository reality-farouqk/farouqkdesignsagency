import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  webpack: (config) => {
    const ignored = Array.isArray(config.watchOptions?.ignored)
      ? config.watchOptions.ignored
      : [];
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [...ignored, path.resolve(__dirname, "studio")],
    };
    return config;
  },
};

export default nextConfig;
