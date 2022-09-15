/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }),
);

module.exports = nextConfig;
