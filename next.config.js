/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Legacy pages have existing lint errors; the pilot component is linted separately in CI.
  eslint: {ignoreDuringBuilds: true},
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['localhost', 'meilleurscashback.com'],
  },
  poweredByHeader: false,
  output: 'standalone',
};

module.exports = nextConfig;
