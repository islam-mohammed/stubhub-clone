/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
