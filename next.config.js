/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['freesvg.org', 'image.tmdb.org', 'upload.wikimedia.org'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
