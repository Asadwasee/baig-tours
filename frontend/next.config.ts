/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.unsplash.com/**'),
    ],
  },
};

module.exports = nextConfig;