/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'bandmate-api.example.com'],
  },
  eslint: {
    dirs: ['src'],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
