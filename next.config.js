/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'remotion'];
    return config;
  },
};

module.exports = nextConfig;
