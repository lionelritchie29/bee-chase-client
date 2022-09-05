/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  disable: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  generateBuildId: async () => {
    return 'beechase';
  },
};

module.exports = nextConfig;
