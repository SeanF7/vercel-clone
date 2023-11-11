/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "avatar.vercel.sh", "assets.vercel.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
