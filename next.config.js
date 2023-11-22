/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  env: {
    supabaseUrl: process.env.supabaseUrl,
    supabaseKey: process.env.supabaseKey,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
