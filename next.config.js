/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Facebook CDN hosts used by your page photos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-phx1-1.xx.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent-lax3-2.xx.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
