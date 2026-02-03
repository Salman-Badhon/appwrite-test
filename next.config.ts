import NextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  eslint: {
    dirs: [
      'pages',
      'app',
      'components',
      'lib',
      'examples',
      'buildable-sections',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
