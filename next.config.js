/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Covers all Facebook/Instagram CDN clusters
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fna.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lookaside.facebook.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
