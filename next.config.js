const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'freesvg.org',
      'image.tmdb.org',
      'upload.wikimedia.org',
      'eazel-net.s3.us-west-1.amazonaws.com',
      'd28btnt2z9x7nc.cloudfront.net',
    ],
    formats: ['image/webp'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
