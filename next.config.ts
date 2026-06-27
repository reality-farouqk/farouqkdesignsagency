import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {},
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
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
