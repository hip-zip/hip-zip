/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "/public",
});

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  // output: "export",
  trailingSlash: true,
  env: {
    supabaseUrl: process.env.supabaseUrl,
    supabaseKey: process.env.supabaseKey,
  },
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: "",
      },
    ],
  },
};

// module.exports = isProduction ? withPWA(nextConfig) : nextConfig;
module.exports = isProduction ? withPWA(nextConfig) : nextConfig;
