/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ],
  },
}

module.exports = nextConfig;