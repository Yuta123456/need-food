const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  reactStrictMode: true,
};
module.exports = withPWA(nextConfig);
