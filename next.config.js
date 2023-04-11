/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "bit.ly", "res.cloudinary.com", "firebasestorage.googleapis.com", "tailwindui.com"],
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.plugins.push(new DuplicatePackageCheckerPlugin());
  //   return config;
  // },
};

// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
